"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import { prefersReducedMotion, onReducedMotionChange } from "@/lib/scroll/capabilities"
import {
  SCRUB_TRIGGER_DEFAULTS,
  ScrollTrigger,
  initScrollTriggerConfig,
} from "@/lib/scroll/scroll-trigger-config"

export interface UseScrubProgressOptions {
  /**
   * Scroll distance the pin covers, as a ScrollTrigger `end` string.
   *
   * Keep this roughly 1:1 with real scroll distance. `+=300%` for a 6–12s clip
   * is about right; `+=1000%` is a hostage situation — the user is trapped
   * flicking at a section that will not release.
   */
  end?: string
  /** Smoothing applied by ScrollTrigger itself, in seconds. */
  scrub?: number | boolean
  /** Pin the trigger. Set false to drive progress without holding the section. */
  pin?: boolean
  /** Called on every update with 0..1. Must be cheap — write a number, nothing else. */
  onProgress?: (progress: number) => void
  /** Called with instantaneous scroll velocity, for velocity-reactive layers. */
  onVelocity?: (velocity: number) => void
  /**
   * Snap to these normalised positions when scrolling stops, so the section
   * rests on composed frames rather than wherever the user happened to let go.
   */
  snapTo?: number[]
}

export interface ScrubProgressState {
  /** Attach to the section that should pin. */
  containerRef: React.RefObject<HTMLDivElement>
  /** True when the pin is disabled and the section flows normally. */
  reduced: boolean
}

/**
 * Pins a section and reports normalised scroll progress through it.
 *
 * Uses `useGSAP()` rather than a bare `useEffect`: it auto-reverts everything
 * created inside its scope on unmount, which is what stops Next's App Router
 * navigation from leaving orphaned pins (and their `pinSpacing` divs) behind in
 * the DOM.
 *
 * Under `prefers-reduced-motion` no trigger is created at all. The consumer
 * sees `reduced: true`, renders its poster, and the section scrolls like any
 * other block.
 */
export function useScrubProgress({
  end = "+=300%",
  scrub = 0.6,
  pin = true,
  onProgress,
  onVelocity,
  snapTo,
}: UseScrubProgressOptions = {}): ScrubProgressState {
  const containerRef = useRef<HTMLDivElement>(null)
  const [reduced, setReduced] = useState(() => prefersReducedMotion())

  // Keep the latest callbacks in refs so changing them doesn't tear down and
  // rebuild the trigger (which would re-measure and jump the pin).
  const progressCb = useRef(onProgress)
  progressCb.current = onProgress
  const velocityCb = useRef(onVelocity)
  velocityCb.current = onVelocity

  useGSAP(
    () => {
      const unsubscribe = onReducedMotionChange(setReduced)
      if (reduced || !containerRef.current) return unsubscribe

      initScrollTriggerConfig()

      const trigger = ScrollTrigger.create({
        ...SCRUB_TRIGGER_DEFAULTS,
        trigger: containerRef.current,
        start: "top top",
        end,
        pin,
        scrub,
        ...(snapTo?.length
          ? { snap: { snapTo, duration: { min: 0.2, max: 0.6 }, ease: "power2.inOut" } }
          : {}),
        onUpdate: (self: any) => {
          progressCb.current?.(self.progress)
          velocityCb.current?.(self.getVelocity())
        },
      })

      return () => {
        trigger.kill()
        unsubscribe()
      }
    },
    { dependencies: [end, scrub, pin, reduced], scope: containerRef }
  )

  return { containerRef, reduced }
}
