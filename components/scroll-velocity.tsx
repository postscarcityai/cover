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

        const handleScroll = () => {
          const currentY = window.scrollY
          const velocity = currentY - lastY
          lastY = currentY
          const scaled = Math.abs(velocity) < 3 ? 0 : velocity * 0.02
          targetSkew = Math.max(-1.5, Math.min(1.5, scaled))
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        rafId = requestAnimationFrame(tick)

        cleanup = () => {
          cancelAnimationFrame(rafId)
          window.removeEventListener("scroll", handleScroll)
          if (content) gsap.set(content, { skewY: 0 })
        }
      } catch {}
    }

    const timer = setTimeout(init, 100)

    return () => {
      clearTimeout(timer)
      cleanup?.()
    }
  }, [])

  return null
}
