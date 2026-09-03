"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { createScrubEngine, type ScrubEngine } from "@/lib/scroll/scrub-engine"
import {
  canPlayInline,
  isCoarsePointer,
  isWebCodecsUsable,
} from "@/lib/scroll/capabilities"

export interface ScrubVideoSources {
  /** H.264 scrub master. Keyframe every 5 frames. */
  mp4: string
  /** VP9 scrub master. Firefox struggles with MP4 — give it this. */
  webm?: string
  /** 640px variant for coarse-pointer devices. */
  mp4Mobile?: string
  webmMobile?: string
  /**
   * Poster. This is the LCP element, always — the video is the enhancement.
   * Ship it ≤80KB as WebP/AVIF.
   */
  poster: string
}

export interface ScrubVideoProps {
  sources: ScrubVideoSources
  /** Accessible description of the footage. */
  alt: string
  className?: string
  /**
   * Opt into the WebCodecs → canvas path where available. Falls back silently
   * to the <video> element on any failure.
   */
  enhance?: boolean
  /** Easing applied to currentTime in the rAF loop. Lower = heavier trail. */
  lerp?: number
  /** Render the poster only and never load video (reduced motion). */
  posterOnly?: boolean
}

export interface ScrubVideoHandle {
  /** Drive the scrub. Cheap by contract — call from a scroll handler. */
  setProgress(progress: number): void
}

/**
 * A video that renders a frame for a scroll position.
 *
 * Strategy A (`<video>` + `currentTime`) is the baseline and always mounts.
 * When `enhance` is set and the browser can actually decode the file, a
 * WebCodecs decoder takes over and paints frames into a canvas layered on top —
 * frame-exact and cleanly reversible. Any failure at any point (no WebCodecs,
 * Low Power Mode, a codec the decoder rejects, a demux error) leaves the
 * `<video>` running and is invisible to the user.
 */
export const ScrubVideo = forwardRef<ScrubVideoHandle, ScrubVideoProps>(
  function ScrubVideo(
    { sources, alt, className = "", enhance = true, lerp = 0.12, posterOnly = false },
    ref
  ) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const engineRef = useRef<ScrubEngine | null>(null)
    const decoderRef = useRef<any>(null)
    const progressRef = useRef(0)
    const [usingCanvas, setUsingCanvas] = useState(false)

    // Strategy A. Always mounted, even when the canvas path wins, so that a
    // mid-session decoder failure has something to fall back to.
    useEffect(() => {
      if (posterOnly || !videoRef.current) return
      const engine = createScrubEngine(videoRef.current, { lerp })
      engineRef.current = engine
      return () => {
        engine.destroy()
        engineRef.current = null
      }
    }, [posterOnly, lerp])

    // Strategy C, opportunistically.
    useEffect(() => {
      if (posterOnly || !enhance) return
      let cancelled = false
      let raf = 0

      void (async () => {
        const video = videoRef.current
        if (!video) return

        // Two gates before we spend anything: the element must actually be
        // able to play inline (iOS Low Power Mode fails here), and the codec
        // must be genuinely decodable rather than merely present in the API.
        const playable = await canPlayInline(video)
        video.pause()
        if (!playable || cancelled) return
        if (!(await isWebCodecsUsable("avc1.42E01E")) || cancelled) return

        try {
          const { createFrameDecoder } = await import("@/lib/scroll/webcodecs-decoder")
          const src = isCoarsePointer() && sources.mp4Mobile ? sources.mp4Mobile : sources.mp4
          const decoder = await createFrameDecoder(src)
          if (cancelled) {
            decoder.close()
            return
          }
          decoderRef.current = decoder
          setUsingCanvas(true)

          const canvas = canvasRef.current
          const ctx = canvas?.getContext("2d")
          if (!canvas || !ctx) return
          canvas.width = decoder.width
          canvas.height = decoder.height

          let painting = false
          let lastPainted = -1

          const paint = async () => {
            if (cancelled) return
            raf = requestAnimationFrame(paint)
            const t = progressRef.current * decoder.duration
            // One decode in flight at a time; a scroll burst must not queue
            // dozens of overlapping seeks.
            if (painting || Math.abs(t - lastPainted) < 1 / 120) return
            painting = true
            try {
              const frame = await decoder.frameAt(t)
              if (frame && !cancelled) {
                ctx.drawImage(frame, 0, 0, canvas.width, canvas.height)
                lastPainted = t
              }
            } catch {
              // Decoder died mid-session — drop back to the <video>, which
              // has been running underneath the whole time.
              setUsingCanvas(false)
            } finally {
              painting = false
            }
          }
          raf = requestAnimationFrame(paint)
        } catch {
          // No WebCodecs path today. Strategy A is already handling it.
          setUsingCanvas(false)
        }
      })()

      return () => {
        cancelled = true
        cancelAnimationFrame(raf)
        decoderRef.current?.close()
        decoderRef.current = null
      }
    }, [enhance, posterOnly, sources.mp4, sources.mp4Mobile])

    useImperativeHandle(ref, () => ({
      setProgress(progress: number) {
        progressRef.current = progress
        engineRef.current?.setProgress(progress)
      },
    }))

    if (posterOnly) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={sources.poster}
          alt={alt}
          className={`h-full w-full object-cover ${className}`}
          fetchPriority="high"
        />
      )
    }

    return (
      <div className={`relative h-full w-full overflow-hidden ${className}`}>
        <video
          ref={videoRef}
          // iOS will not render inline without all three of these, and it will
          // not paint a first frame without the poster.
          muted
          playsInline
          preload="metadata"
          poster={sources.poster}
          aria-label={alt}
          className="h-full w-full object-cover"
          // Audio is stripped at encode time (-an). No controls: this element
          // is scenery driven by scroll, not a player.
          tabIndex={-1}
        >
          {sources.webmMobile && (
            <source src={sources.webmMobile} type="video/webm" media="(max-width: 768px)" />
          )}
          {sources.mp4Mobile && (
            <source src={sources.mp4Mobile} type="video/mp4" media="(max-width: 768px)" />
          )}
          {sources.webm && <source src={sources.webm} type="video/webm" />}
          <source src={sources.mp4} type="video/mp4" />
        </video>

        {/* Painted over the video, not instead of it — so a decoder failure
            reveals a live element rather than a hole. */}
        <canvas
          ref={canvasRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{ opacity: usingCanvas ? 1 : 0 }}
        />
      </div>
    )
  }
)
