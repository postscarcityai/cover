"use client"

import { useCallback, useRef, useState } from "react"
import { ScrubVideo, type ScrubVideoHandle, type ScrubVideoSources } from "@/components/scroll/scrub-video"
import { useScrubProgress } from "@/components/scroll/use-scrub-progress"

export interface StoryBeat {
  /** Normalised position through the pin where this beat is fully visible. */
  at: number
  title: string
  body?: string
}

export interface ScrubStorySectionProps {
  sources: ScrubVideoSources
  alt: string
  beats: StoryBeat[]
  end?: string
  scrim?: number
  className?: string
}

/**
 * Pinned scrub with sequenced copy — the narrative variant of pattern 01,
 * combined with pattern 10's beat snapping.
 *
 * Copy beats cross-fade as the footage scrubs, and the section snaps to each
 * beat's position when scrolling stops so it always rests on a composed frame
 * with its caption fully in.
 *
 * Beat opacity is computed in React state rather than by animating each node
 * with GSAP. There are only a handful of beats and one state write per frame
 * is cheaper than a tween per beat; the video decode is where the frame budget
 * actually goes.
 */
export function ScrubStorySection({
  sources,
  alt,
  beats,
  end = "+=400%",
  scrim = 0.45,
  className = "",
}: ScrubStorySectionProps) {
  const videoRef = useRef<ScrubVideoHandle>(null)
  const [active, setActive] = useState(0)

  const handleProgress = useCallback(
    (progress: number) => {
      videoRef.current?.setProgress(progress)

      // Nearest beat wins. Cheap enough to run per frame for <10 beats.
      let nearest = 0
      let bestDistance = Infinity
      beats.forEach((beat, i) => {
        const d = Math.abs(beat.at - progress)
        if (d < bestDistance) {
          bestDistance = d
          nearest = i
        }
      })
      setActive((prev) => (prev === nearest ? prev : nearest))
    },
    [beats]
  )

  const { containerRef, reduced } = useScrubProgress({
    end,
    onProgress: handleProgress,
    snapTo: beats.map((b) => b.at),
  })

  // Reduced motion: no pin, no scrub — every beat is shown as a plain
  // sequential list beneath the poster.
  if (reduced) {
    return (
      <section ref={containerRef} className={`w-full ${className}`}>
        <div className="relative h-[60dvh] w-full">
          <ScrubVideo sources={sources} alt={alt} posterOnly />
        </div>
        <div className="mx-auto max-w-2xl space-y-8 px-6 py-12">
          {beats.map((beat, i) => (
            <div key={i}>
              <h3 className="text-2xl font-semibold tracking-tight">{beat.title}</h3>
              {beat.body && <p className="mt-2 leading-relaxed opacity-80">{beat.body}</p>}
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: "100dvh" }}
    >
      <div className="absolute inset-0">
        <ScrubVideo ref={videoRef} sources={sources} alt={alt} />
        <div className="absolute inset-0" style={{ backgroundColor: `rgb(0 0 0 / ${scrim})` }} aria-hidden />
      </div>

      <div className="relative flex h-full items-center">
        {/* grid so every beat shares one cell and cross-fades in place */}
        <div className="mx-auto grid w-full max-w-3xl px-6">
          {beats.map((beat, i) => (
            <div
              key={i}
              className="col-start-1 row-start-1 transition-opacity duration-500"
              style={{
                // All beats occupy the same grid cell so they cross-fade in
                // place rather than reflowing the section.
                gridArea: "1 / 1",
                opacity: i === active ? 1 : 0,
              }}
              aria-hidden={i !== active}
            >
              <h3 className="text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight tracking-tight text-white">
                {beat.title}
              </h3>
              {beat.body && (
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">{beat.body}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
