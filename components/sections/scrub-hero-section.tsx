"use client"

import { useCallback, useRef } from "react"
import { ScrubVideo, type ScrubVideoHandle, type ScrubVideoSources } from "@/components/scroll/scrub-video"
import { useScrubProgress } from "@/components/scroll/use-scrub-progress"

export interface ScrubHeroSectionProps {
  sources: ScrubVideoSources
  alt: string
  eyebrow?: string
  headline: string
  subhead?: string
  /**
   * Scroll distance the pin covers. `+=300%` suits a 6–12s clip. Going much
   * beyond that stops reading as choreography and starts reading as a page
   * that won't let you leave.
   */
  end?: string
  /**
   * Pattern 10 — beat snapping. Normalised positions the section settles on
   * when scrolling stops, so it rests on composed frames rather than wherever
   * the user let go. `[0, 0.5, 1]` for a three-beat hero.
   */
  beats?: number[]
  /** 0..1 scrim over the footage, so overlaid copy stays legible. */
  scrim?: number
  className?: string
}

/**
 * Pattern 01 — the pinned scrub hero. The canonical move.
 *
 * Pins full-bleed footage and maps scroll progress onto `currentTime`, with
 * copy cross-fading on its own sub-timeline.
 *
 * The scroll handler here does exactly one thing: hand a number to the scrub
 * engine. All decode and paint work happens in that engine's rAF loop. This
 * matters for INP — anything heavier in the handler shows up directly as
 * interaction latency.
 *
 * Under reduced motion `useScrubProgress` creates no trigger at all, and this
 * renders as a normal-height section showing the poster.
 */
export function ScrubHeroSection({
  sources,
  alt,
  eyebrow,
  headline,
  subhead,
  end = "+=300%",
  beats,
  scrim = 0.4,
  className = "",
}: ScrubHeroSectionProps) {
  const videoRef = useRef<ScrubVideoHandle>(null)

  const handleProgress = useCallback((progress: number) => {
    videoRef.current?.setProgress(progress)
  }, [])

  const { containerRef, reduced } = useScrubProgress({
    end,
    onProgress: handleProgress,
    snapTo: beats,
  })

  return (
    <section
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      // dvh rather than vh: on mobile, vh is computed against the largest
      // viewport and the address bar toggling would resize a pinned section.
      style={{ height: reduced ? "auto" : "100dvh" }}
      aria-label={headline}
    >
      <div className="absolute inset-0" style={reduced ? { position: "relative", height: "70dvh" } : undefined}>
        <ScrubVideo ref={videoRef} sources={sources} alt={alt} posterOnly={reduced} />
        <div className="absolute inset-0" style={{ backgroundColor: `rgb(0 0 0 / ${scrim})` }} aria-hidden />
      </div>

      <div className="relative flex h-full flex-col justify-end p-6 pb-16 md:p-12 md:pb-24">
        {eyebrow && (
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/70">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-4xl text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-white">
          {headline}
        </h1>
        {subhead && (
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">{subhead}</p>
        )}
      </div>
    </section>
  )
}
