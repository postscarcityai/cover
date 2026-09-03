/**
 * Strategy C — WebCodecs `VideoDecoder` → `VideoFrame` → canvas.
 *
 * Frame-exact scrubbing, forwards and backwards, at any resolution. This is a
 * progressive enhancement layered on top of strategy A and is never shipped
 * alone: Firefox for Android has no support, and iOS Low Power Mode throttles
 * or disables the path at runtime with no warning.
 *
 * Three things make or break this file:
 *
 *  1. **Every `VideoFrame` must be `close()`d.** They hold GPU memory that GC
 *     does not reclaim. A 1280px window of 150 frames is ~220MB of RGBA — leak
 *     a few of those and the tab dies. Eviction here is unconditional.
 *  2. **Seeking backwards means finding a keyframe.** Delta frames only encode
 *     differences, so decoding must restart from the nearest preceding sync
 *     sample. That index is binary-searched, not scanned.
 *  3. **Required buffer size is a direct function of keyframe density.** The
 *     `keyint=5` encode from `scripts/encode-scrub-video.mjs` is what keeps the
 *     catch-up decode after a backwards seek down to a handful of frames.
 *
 * WebCodecs types are declared locally rather than relying on the DOM lib,
 * which does not carry them in every TypeScript version this template supports.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

interface DecodedFrame {
  /** Presentation timestamp, microseconds. */
  timestamp: number
  frame: any // VideoFrame
}

interface SampleMeta {
  timestamp: number // microseconds
  duration: number // microseconds
  isKey: boolean
  data: Uint8Array
}

export interface FrameDecoderOptions {
  /**
   * How many decoded frames to retain around the playhead. Each frame is
   * width × height × 4 bytes of GPU memory, so this is the memory dial.
   */
  windowSize?: number
}

export interface FrameDecoder {
  readonly duration: number // seconds
  readonly width: number
  readonly height: number
  /**
   * Decode (if needed) and return the frame nearest `timeSec`. The returned
   * frame is owned by the decoder — draw it, never close it.
   */
  frameAt(timeSec: number): Promise<any | null>
  close(): void
}

/**
 * Build a frame decoder for an MP4 URL.
 *
 * Throws if WebCodecs is unavailable, the demuxer can't be loaded, or the file
 * has no decodable video track. Every caller is expected to catch and fall
 * back to strategy A.
 */
export async function createFrameDecoder(
  url: string,
  { windowSize = 24 }: FrameDecoderOptions = {}
): Promise<FrameDecoder> {
  const VideoDecoderCtor = (globalThis as any).VideoDecoder
  const EncodedVideoChunkCtor = (globalThis as any).EncodedVideoChunk
  if (!VideoDecoderCtor || !EncodedVideoChunkCtor) {
    throw new Error("WebCodecs unavailable")
  }

  // mp4box is dynamically imported so it never reaches the initial bundle,
  // and so a missing/broken demuxer degrades to strategy A rather than
  // breaking the page.
  const mp4boxModule: any = await import("mp4box")
  const MP4Box = mp4boxModule.default ?? mp4boxModule

  const response = await fetch(url)
  if (!response.ok) throw new Error(`scrub video fetch failed: ${response.status}`)
  const buffer = await response.arrayBuffer()

  const file = MP4Box.createFile()
  const samples: SampleMeta[] = []

  const { track, timescale } = await new Promise<{ track: any; timescale: number }>(
    (resolve, reject) => {
      file.onError = (e: unknown) => reject(new Error(String(e)))
      file.onReady = (info: any) => {
        const videoTrack = info.videoTracks?.[0]
        if (!videoTrack) {
          reject(new Error("no video track"))
          return
        }
        resolve({ track: videoTrack, timescale: videoTrack.timescale })
      }
      const tagged = buffer as ArrayBuffer & { fileStart?: number }
      tagged.fileStart = 0
      file.appendBuffer(tagged)
      file.flush()
    }
  )

  // Pull every sample's bytes and sync-sample flag up front. For a 6–12s
  // 1280px clip this is a few MB — the same bytes strategy A would stream.
  await new Promise<void>((resolve) => {
    file.onSamples = (_id: number, _user: unknown, sampleList: any[]) => {
      for (const s of sampleList) {
        samples.push({
          timestamp: (s.cts / s.timescale) * 1_000_000,
          duration: (s.duration / s.timescale) * 1_000_000,
          isKey: Boolean(s.is_sync),
          data: s.data,
        })
      }
      resolve()
    }
    file.setExtractionOptions(track.id, null, { nbSamples: track.nb_samples })
    file.start()
  })

  if (!samples.length) throw new Error("no samples extracted")
  samples.sort((a, b) => a.timestamp - b.timestamp)

  const description = getCodecDescription(MP4Box, file, track.id)
  const config: any = {
    codec: track.codec,
    codedWidth: track.track_width,
    codedHeight: track.track_height,
    ...(description ? { description } : {}),
    // Prefer GPU-backed frames; they're what we're drawing to canvas anyway.
    hardwareAcceleration: "prefer-hardware",
    optimizeForLatency: true,
  }

  const { supported } = await VideoDecoderCtor.isConfigSupported(config)
  if (!supported) throw new Error(`codec not supported: ${track.codec}`)

  const cache = new Map<number, DecodedFrame>()
  let closed = false
  let decoder: any = null

  const evictOutside = (centerUs: number) => {
    if (cache.size <= windowSize) return
    // Keep the `windowSize` frames nearest the playhead; close the rest.
    const byDistance = [...cache.values()].sort(
      (a, b) => Math.abs(a.timestamp - centerUs) - Math.abs(b.timestamp - centerUs)
    )
    for (const entry of byDistance.slice(windowSize)) {
      entry.frame.close()
      cache.delete(entry.timestamp)
    }
  }

  const resetDecoder = () => {
    if (decoder) {
      try {
        decoder.close()
      } catch {
        /* already closed */
      }
    }
    decoder = new VideoDecoderCtor({
      output: (frame: any) => {
        if (closed) {
          frame.close()
          return
        }
        const existing = cache.get(frame.timestamp)
        if (existing) {
          // Duplicate decode of a frame we already hold — drop the new one
          // rather than orphaning the old.
          frame.close()
          return
        }
        cache.set(frame.timestamp, { timestamp: frame.timestamp, frame })
      },
      error: () => {
        /* surfaced to the caller via the frameAt() fallback path */
      },
    })
    decoder.configure(config)
  }

  resetDecoder()

  const durationSec = (() => {
    const last = samples[samples.length - 1]
    return (last.timestamp + last.duration) / 1_000_000
  })()

  /** Index of the last sample whose timestamp is <= `us`. Binary search. */
  const sampleIndexAt = (us: number): number => {
    let lo = 0
    let hi = samples.length - 1
    let best = 0
    while (lo <= hi) {
      const mid = (lo + hi) >> 1
      if (samples[mid].timestamp <= us) {
        best = mid
        lo = mid + 1
      } else {
        hi = mid - 1
      }
    }
    return best
  }

  /** Nearest sync sample at or before `index`. */
  const keyframeIndexAt = (index: number): number => {
    for (let i = index; i >= 0; i--) {
      if (samples[i].isKey) return i
    }
    return 0
  }

  let decodedUpTo = -1 // index of the last sample fed to the decoder

  const decodeRange = async (fromIndex: number, toIndex: number) => {
    for (let i = fromIndex; i <= toIndex; i++) {
      const s = samples[i]
      decoder.decode(
        new EncodedVideoChunkCtor({
          type: s.isKey ? "key" : "delta",
          timestamp: s.timestamp,
          duration: s.duration,
          data: s.data,
        })
      )
    }
    decodedUpTo = toIndex
    // flush() resolves once every queued chunk has produced its frame.
    await decoder.flush()
  }

  return {
    duration: durationSec,
    width: track.track_width,
    height: track.track_height,

    async frameAt(timeSec: number) {
      if (closed) return null
      const us = Math.max(0, timeSec) * 1_000_000
      const index = sampleIndexAt(us)
      const wanted = samples[index]

      const hit = cache.get(wanted.timestamp)
      if (hit) {
        evictOutside(wanted.timestamp)
        return hit.frame
      }

      const keyIndex = keyframeIndexAt(index)

      // Continue forward from where we are if the target is ahead of the
      // decoder and no keyframe boundary was skipped; otherwise restart from
      // the keyframe. This is what keeps forward scrubbing cheap.
      const canContinue = decodedUpTo >= 0 && index > decodedUpTo && keyIndex <= decodedUpTo
      if (!canContinue) {
        resetDecoder()
        decodedUpTo = -1
      }

      const from = canContinue ? decodedUpTo + 1 : keyIndex
      try {
        await decodeRange(from, index)
      } catch {
        return null
      }

      evictOutside(wanted.timestamp)
      return cache.get(wanted.timestamp)?.frame ?? null
    },

    close() {
      closed = true
      for (const entry of cache.values()) entry.frame.close()
      cache.clear()
      try {
        decoder?.close()
      } catch {
        /* already closed */
      }
      decoder = null
    },
  }
}

/**
 * H.264/H.265 need their parameter-set box (`avcC` / `hvcC`) passed to
 * `configure()` as `description`, or the decoder rejects every chunk with no
 * useful error. mp4box exposes it only through the raw box tree, and it has to
 * be serialised through mp4box's own big-endian DataStream.
 *
 * Returning null here is not benign for H.264 — the caller's
 * `isConfigSupported` check will pass and every decode will then fail — so the
 * VP8/VP9/AV1 case (which legitimately needs no description) is the only one
 * that should reach the null path.
 */
function getCodecDescription(MP4Box: any, file: any, trackId: number): Uint8Array | null {
  const DataStream = MP4Box.DataStream
  if (!DataStream) return null

  const trak = file.getTrackById(trackId)
  const entries = trak?.mdia?.minf?.stbl?.stsd?.entries ?? []

  for (const entry of entries) {
    const box = entry.avcC ?? entry.hvcC ?? entry.vpcC ?? entry.av1C
    if (!box) continue
    // vpcC/av1C are not passed as `description`; the codec string carries
    // everything those decoders need.
    if (!entry.avcC && !entry.hvcC) return null

    const stream = new DataStream(undefined, 0, DataStream.BIG_ENDIAN)
    box.write(stream)
    // Strip the 8-byte box header (4-byte size + 4-byte type).
    return new Uint8Array(stream.buffer, 8)
  }
  return null
}
