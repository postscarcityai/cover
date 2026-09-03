"use client"

import { useRef, type ReactNode } from "react"
import { useGSAP } from "@gsap/react"
import { prefersReducedMotion } from "@/lib/scroll/capabilities"
import {
  SCRUB_TRIGGER_DEFAULTS,
  gsap,
  initScrollTriggerConfig,
} from "@/lib/scroll/scroll-trigger-config"

export interface HorizontalPanelsProps {
  panels: ReactNode[]
  className?: string
}

/**
 * Pattern 05 — horizontal panels.
 *
 * Pins the section and tweens a flex row on x. Good for process and timeline
 * beats.
 *
 * Two non-obvious requirements:
 *
 *  1. **The container tween must be `ease: "none"`.** Any easing here and
 *     nested triggers driven by `containerAnimation` compute their positions
 *     against a non-linear mapping, so they fire at visibly wrong moments.
 *     This is the single most common way this pattern breaks.
 *  2. The tween is returned so children can register their own triggers with
 *     `containerAnimation`, keyed to horizontal position rather than scroll.
 *
 * Under reduced motion the row falls back to a normal horizontally-scrollable
 * region — the content stays reachable, it just isn't choreographed.
 */
export function HorizontalPanels({ panels, className = "" }: HorizontalPanelsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !containerRef.current || !rowRef.current) return

      initScrollTriggerConfig()

      const row = rowRef.current
      const distance = () => row.scrollWidth - window.innerWidth

      const tween = gsap.to(row, {
        x: () => -distance(),
        // Non-negotiable — see above.
        ease: "none",
        scrollTrigger: {
          ...SCRUB_TRIGGER_DEFAULTS,
          trigger: containerRef.current,
          start: "top top",
          // Pin length tracks the actual horizontal distance, so the gesture
          // maps roughly 1:1 to scroll rather than scrolljacking.
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={rowRef} className="flex" style={{ width: "max-content" }}>
        {panels.map((panel, i) => (
          <div key={i} className="w-screen shrink-0">
            {panel}
          </div>
        ))}
      </div>
    </div>
  )
}
