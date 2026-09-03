"use client"

import { useRef, type ReactNode } from "react"
import { useGSAP } from "@gsap/react"
import { prefersReducedMotion } from "@/lib/scroll/capabilities"
import {
  SCRUB_TRIGGER_DEFAULTS,
  gsap,
  initScrollTriggerConfig,
} from "@/lib/scroll/scroll-trigger-config"

export interface DepthLayer {
  content: ReactNode
  /**
   * Scrub smoothing for this layer. Different values across layers is what
   * creates the depth read: 0.3 / 0.8 / 1.4 is a good starting set.
   */
  scrub: number
  /** Vertical travel in percent of the layer's height. Negative moves up. */
  travel: number
}

export interface DepthParallaxProps {
  layers: DepthLayer[]
  className?: string
}

/**
 * Pattern 09 — depth parallax.
 *
 * Two or three layers moving at different `scrub` values. Over a scrubbed clip
 * this reads as camera depth rather than as a parallax effect, which is the
 * point — it should be felt, not noticed.
 *
 * Each layer gets its own trigger because `scrub` is per-trigger; you cannot
 * vary it inside a single timeline. That is the whole mechanism.
 */
export function DepthParallax({ layers, className = "" }: DepthParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !containerRef.current) return

      initScrollTriggerConfig()

      const nodes = containerRef.current.querySelectorAll("[data-depth-layer]")
      const tweens = Array.from(nodes).map((node, i) => {
        const layer = layers[i]
        if (!layer) return null
        return gsap.to(node, {
          yPercent: layer.travel,
          ease: "none",
          scrollTrigger: {
            ...SCRUB_TRIGGER_DEFAULTS,
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: layer.scrub,
          },
        })
      })

      return () => {
        tweens.forEach((t) => {
          t?.scrollTrigger?.kill()
          t?.kill()
        })
      }
    },
    { dependencies: [layers.length], scope: containerRef }
  )

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {layers.map((layer, i) => (
        <div
          key={i}
          data-depth-layer
          className="absolute inset-0 will-change-transform"
          style={{ zIndex: i }}
        >
          {layer.content}
        </div>
      ))}
    </div>
  )
}
