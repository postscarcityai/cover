"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

/**
 * GSAP ScrollSmoother — Premium Smooth Scrolling
 *
 * Uses the official GSAP ScrollSmoother plugin for momentum-based scrolling
 * with built-in parallax via data-speed attributes.
 *
 * Add data-speed="0.5" (slower) or data-speed="1.5" (faster) to any element
 * for automatic parallax effects.
 *
 * Automatically disables on mobile/touch devices.
 */
interface ScrollSmootherConfig {
  smooth?: number
  speed?: number
  ease?: string
  normalizeScroll?: boolean
  effects?: boolean
}

export function ScrollSmoother(config: ScrollSmootherConfig = {}) {
  const {
    smooth = 1,
    speed = 1,
    normalizeScroll = true,
    effects = true,
  } = config

  const pathname = usePathname()
  const smootherRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Disable on mobile/touch devices
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isSmallScreen = window.innerWidth < 1024
    const isMobile = isMobileDevice || (isSmallScreen && 'ontouchstart' in window)

    if (isMobile) return

    let cleanup: (() => void) | null = null

    const init = async () => {
      try {
        const gsapModule = await import("gsap")
        const ScrollTriggerModule = await import("gsap/ScrollTrigger")
        const ScrollSmootherModule = await import("gsap/ScrollSmoother")

        const gsap = gsapModule.default || gsapModule
        const ScrollTrigger = ScrollTriggerModule.default || ScrollTriggerModule
        const ScrollSmootherPlugin = ScrollSmootherModule.default || ScrollSmootherModule

        gsap.registerPlugin(ScrollTrigger, ScrollSmootherPlugin)

        // Create ScrollSmoother instance
        const smoother = ScrollSmootherPlugin.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth,
          speed,
          normalizeScroll,
          effects,
          smoothTouch: false,
        })

        smootherRef.current = smoother

        // Expose reset for route changes
        ;(window as any).__resetSmoothScroll = () => {
          smoother.scrollTo(0, false)
          ScrollTrigger.refresh()
        }

        // Poll scroll position on animation frame for smooth event dispatch
        let lastScrollY = 0
        let rafId: number
        const dispatchScrollEvents = () => {
          if (!smootherRef.current) return
          const currentY = smootherRef.current.scrollTop()
          if (Math.abs(currentY - lastScrollY) > 0.5) {
            lastScrollY = currentY
            window.dispatchEvent(new CustomEvent("smoothscroll", {
              detail: { scrollY: currentY }
            }))
          }
          rafId = requestAnimationFrame(dispatchScrollEvents)
        }
        rafId = requestAnimationFrame(dispatchScrollEvents)

        cleanup = () => {
          cancelAnimationFrame(rafId)
          smoother.kill()
          smootherRef.current = null
          ScrollTrigger.getAll().forEach((t: any) => t.kill())
        }
      } catch (error) {
        console.warn("ScrollSmoother: Failed to initialize", error)
      }
    }

    const timer = setTimeout(init, 100)

    return () => {
      clearTimeout(timer)
      cleanup?.()
    }
  }, [smooth, speed, normalizeScroll, effects])

  // Reset scroll on route change
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).__resetSmoothScroll) {
      (window as any).__resetSmoothScroll()
    }
  }, [pathname])

  return null
}
