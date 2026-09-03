/**
 * The scrub engine — strategy A (`<video>` + `currentTime`).
 *
 * The single rule that makes this feel good: **never write `currentTime` from
 * a scroll handler.** ScrollTrigger's `onUpdate` can fire many times per
 * frame, and each assignment queues a seek the browser then has to coalesce.
 * The result is a video that lurches and a scroll thread doing decode work.
 *
 * Instead the scroll handler does the cheapest possible thing — write one
 * number — and a rAF loop eases the real `currentTime` toward it. That also
 * gives scrubbing its weight for free: the footage trails the cursor slightly
 * and settles, rather than being rigidly welded to scroll position.
 */

export interface ScrubEngineOptions {
  /** Per-frame easing toward the target time. Lower = heavier / more trail. */
  lerp?: number
  /**
   * Seconds of error below which we stop writing. Guards against a permanent
   * dribble of sub-perceptual seeks that keep the decoder awake and burn
   * battery once the user has stopped scrolling.
   */
  epsilon?: number
}

export interface ScrubEngine {
  /** Called from the scroll handler. Cheap by design: one assignment. */
  setProgress(progress: number): void
  /** Jump with no easing — route changes, reduced-motion, initial paint. */
  snapTo(progress: number): void
  destroy(): void
}

export function createScrubEngine(
  video: HTMLVideoElement,
  { lerp = 0.12, epsilon = 0.001 }: ScrubEngineOptions = {}
): ScrubEngine {
  let target = 0
  let current = 0
  let frame = 0
  let destroyed = false

  const duration = () => {
    const d = video.duration
    // Duration is NaN until metadata lands, and Infinity for streams.
    return Number.isFinite(d) && d > 0 ? d : 0
  }

  const tick = () => {
    if (destroyed) return
    frame = requestAnimationFrame(tick)

    const total = duration()
    if (!total) return

    current += (target - current) * lerp

    // readyState >= 2 (HAVE_CURRENT_DATA) means there is a frame to show.
    // Writing before that is discarded and can reset the load.
    if (video.readyState < 2) return

    // Skip while a seek is already in flight. The browser would coalesce
    // anyway, but not queuing the write keeps the main thread clear.
    if (video.seeking) return

    if (Math.abs(current - video.currentTime) > epsilon) {
      video.currentTime = current
    }
  }

  frame = requestAnimationFrame(tick)

  return {
    setProgress(progress: number) {
      target = clamp01(progress) * duration()
    },
    snapTo(progress: number) {
      const total = duration()
      target = clamp01(progress) * total
      current = target
      if (video.readyState >= 1 && total) {
        try {
          video.currentTime = current
        } catch {
          // Seeking before the element is ready throws in some browsers;
          // the rAF loop will land it on the next frame regardless.
        }
      }
    },
    destroy() {
      destroyed = true
      cancelAnimationFrame(frame)
    },
  }
}

function clamp01(n: number): number {
  return n < 0 ? 0 : n > 1 ? 1 : n
}
