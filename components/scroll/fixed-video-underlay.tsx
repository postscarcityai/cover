"use client"

import { type ReactNode } from "react"
import { ScrubVideo, type ScrubVideoSources } from "@/components/scroll/scrub-video"

export interface FixedVideoUnderlayProps {
  sources: ScrubVideoSources
  alt: string
  children: ReactNode
  /** 0..1. How hard the scrim dims the footage under the copy. */
  scrim?: number
  className?: string
}

/**
 * Pattern 04 — fixed video, sections scroll over it.
 *
 * The cheapest immersive effect available, and fully accessible: the video sits
 * fixed at z-0 behind a scrim while ordinary content scrolls above it. No pin,
 * no scrub, no ScrollTrigger, no scroll listener at all.
 *
 * Note this is the one pattern here that does *not* scrub — the video is
 * static scenery. If it also needs to respond to scroll, compose it with
 * `useScrubProgress` from the parent section instead of reaching inside.
 *
 * `position: fixed` is safe here only because Lenis leaves the document
 * untransformed. Under the template's old transform-based smoother a fixed
 * child resolved against the transformed ancestor instead of the viewport,
 * which is the bug class that made this pattern impossible before.
 */
export function FixedVideoUnderlay({
  sources,
  alt,
  children,
  scrim = 0.55,
  className = "",
}: FixedVideoUnderlayProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="fixed inset-0 -z-10"
        // dvh, not vh: on mobile the address bar show/hide changes vh and the
        // backdrop would resize under the content every time.
        style={{ height: "100dvh" }}
        aria-hidden
      >
        <ScrubVideo sources={sources} alt={alt} enhance={false} />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgb(0 0 0 / ${scrim})` }}
        />
      </div>
      {children}
    </div>
  )
}
