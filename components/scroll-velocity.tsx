"use client"

import { useEffect } from "react"

/**
 * Applies a subtle skewY to #smooth-content proportional to scroll velocity.
 * Settles back to 0 when scrolling stops. Signature Locomotive-style effect.
 * Desktop only, respects reduced-motion.
 */
export function ScrollVelocitySkew() {
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (!window.matchMedia("(pointer: fine)").matches) return

    let cleanup: (() => void) | null = null

    const init = async () => {
      try {
        const gsapModule = await import("gsap")
        const gsap = (gsapModule as any).default || gsapModule

        const content = document.getElementById("main-content")
        if (!content) return

        let lastY = 0
        let currentSkew = 0
        let targetSkew = 0
        let rafId: number

        const handleScroll = (e: Event) => {
          const customEvent = e as CustomEvent<{ scrollY: number }>
          const currentY = customEvent.detail.scrollY
          const velocity = currentY - lastY
          lastY = currentY

          // Dead zone for slow scrolls, gentle max for fast
          const scaled = Math.abs(velocity) < 3 ? 0 : velocity * 0.02
          targetSkew = Math.max(-1.5, Math.min(1.5, scaled))
        }

        const tick = () => {
          // Lerp current toward target
          currentSkew += (targetSkew - currentSkew) * 0.1

          // Decay target toward 0
          targetSkew *= 0.95

          // Only apply if meaningful
          if (Math.abs(currentSkew) > 0.01) {
            gsap.set(content, { skewY: currentSkew })
          } else if (Math.abs(currentSkew) <= 0.01 && currentSkew !== 0) {
            currentSkew = 0
            gsap.set(content, { skewY: 0 })
          }

          rafId = requestAnimationFrame(tick)
        }

        // Also listen to native scroll for when ScrollSmoother isn't active
        const handleNativeScroll = () => {
          const currentY = window.scrollY
          const velocity = currentY - lastY
          lastY = currentY
          const nativeScaled = Math.abs(velocity) < 3 ? 0 : velocity * 0.02
          targetSkew = Math.max(-1.5, Math.min(1.5, nativeScaled))
        }

        window.addEventListener("smoothscroll", handleScroll)
        window.addEventListener("scroll", handleNativeScroll, { passive: true })
        rafId = requestAnimationFrame(tick)

        cleanup = () => {
          cancelAnimationFrame(rafId)
          window.removeEventListener("smoothscroll", handleScroll)
          window.removeEventListener("scroll", handleNativeScroll)
          if (content) gsap.set(content, { skewY: 0 })
        }
      } catch {}
    }

    // Slight delay to let ScrollSmoother initialize first
    const timer = setTimeout(init, 500)

    return () => {
      clearTimeout(timer)
      cleanup?.()
    }
  }, [])

  return null
}
