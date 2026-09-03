"use client"

import { useRef, type ReactNode } from "react"
import { useGSAP } from "@gsap/react"
import { prefersReducedMotion } from "@/lib/scroll/capabilities"
import {
  SCRUB_TRIGGER_DEFAULTS,
  gsap,
  initScrollTriggerConfig,
} from "@/lib/scroll/scroll-trigger-config"

export interface ClipRevealProps {
  children: ReactNode
  /** Inset in px at rest, before the reveal opens it to full bleed. */
  inset?: number
  /** Corner radius in px at rest. */
  radius?: number
  /** "portal" opens inward→full bleed. "wipe" closes full bleed→open, revealing what's under. */
  mode?: "portal" | "wipe"
  className?: string
}

/**
 * Patterns 02 and 07 — the expanding video portal, and the mask wipe.
 *
 * A card sitting mid-page grows to full bleed as you scroll ("portal"), or a
 * full-bleed section closes to reveal the next one underneath ("wipe") so the
 * video *becomes* the transition rather than just ending.
 *
 * Animates `clip-path` and never `width`/`height`. Clip-path is
 * compositor-friendly — width/height would relayout the subtree on every
 * single frame of the scrub, which with a decoding video inside is exactly the
 * budget you cannot afford.
 */
export function ClipReveal({
  children,
  inset = 120,
  radius = 24,
  mode = "portal",
  className = "",
}: ClipRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !containerRef.current || !targetRef.current) return

      initScrollTriggerConfig()

      const closed = `inset(${inset}px round ${radius}px)`
      const open = "inset(0px round 0px)"

      const tween = gsap.fromTo(
        targetRef.current,
        { clipPath: mode === "portal" ? closed : open },
        {
          clipPath: mode === "portal" ? open : closed,
          ease: "none",
          scrollTrigger: {
            ...SCRUB_TRIGGER_DEFAULTS,
            trigger: containerRef.current,
            start: mode === "portal" ? "top bottom" : "top top",
            end: mode === "portal" ? "top top" : "bottom top",
            scrub: 0.6,
          },
        }
      )

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    },
    { dependencies: [inset, radius, mode], scope: containerRef }
  )

  return (
    <div ref={containerRef} className={className}>
      <div ref={targetRef} className="h-full w-full will-change-[clip-path]">
        {children}
      </div>
    </div>
  )
}
