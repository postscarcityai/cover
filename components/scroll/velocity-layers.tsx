"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, type ReactNode } from "react"
import { useGSAP } from "@gsap/react"
import { prefersReducedMotion } from "@/lib/scroll/capabilities"
import { ScrollTrigger, gsap, initScrollTriggerConfig } from "@/lib/scroll/scroll-trigger-config"

export interface VelocityLayersProps {
  children: ReactNode
  /** Max skew in degrees at full velocity. */
  maxSkew?: number
  /** Max blur in px at full velocity. 0 disables blur (it is the expensive one). */
  maxBlur?: number
  className?: string
}

/**
 * Pattern 08 — velocity-reactive layers.
 *
 * Reads scroll velocity and drives a skew (and optionally a blur) that settles
 * back to zero when motion stops. Subtle, and it's the thing that makes a page
 * feel physically real rather than like a document being repositioned.
 *
 * Blur defaults to off. A non-zero `filter: blur()` on a large element forces
 * an offscreen composite every frame, which on top of a decoding video is the
 * first thing to blow the frame budget. Turn it on only over small elements.
 */
export function VelocityLayers({
  children,
  maxSkew = 6,
  maxBlur = 0,
  className = "",
}: VelocityLayersProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !containerRef.current) return

      initScrollTriggerConfig()
      const el = containerRef.current

      // quickTo returns an interpolated setter, far cheaper than creating a
      // tween per scroll event, and it eases back to rest on its own.
      const quickSkew = gsap.quickTo(el, "skewY", { duration: 0.5, ease: "power3.out" })

      // quickTo interpolates numbers, so blur is driven through a numeric
      // proxy and composed into a filter string on update. Tweening the
      // `filter` property directly would mean parsing and rebuilding a string
      // every frame.
      const blurProxy = { v: 0 }
      const quickBlur =
        maxBlur > 0
          ? gsap.quickTo(blurProxy, "v", {
              duration: 0.5,
              ease: "power3.out",
              onUpdate: () => {
                el.style.filter = blurProxy.v > 0.01 ? `blur(${blurProxy.v}px)` : ""
              },
            })
          : null

      let settle = 0

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self: any) => {
          // Velocity is px/sec and routinely hits four figures; clamp before
          // mapping it to a visual.
          const norm = Math.max(-1, Math.min(1, self.getVelocity() / 2500))
          quickSkew(norm * maxSkew)
          if (quickBlur) quickBlur(Math.abs(norm) * maxBlur)

          // A fast flick stops producing updates while still skewed, so the
          // element would stay stranded at its last value. Schedule a return
          // to rest after the updates stop.
          window.clearTimeout(settle)
          settle = window.setTimeout(() => {
            quickSkew(0)
            if (quickBlur) quickBlur(0)
          }, 120)
        },
      })

      return () => {
        window.clearTimeout(settle)
        trigger.kill()
      }
    },
    { dependencies: [maxSkew, maxBlur], scope: containerRef }
  )

  return (
    <div ref={containerRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  )
}
