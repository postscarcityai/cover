"use client"

import { useEffect, useRef } from "react"

/**
 * Custom cursor — small dot that follows the mouse with GSAP quickTo.
 * Scales up and adds a ring on hover over interactive elements.
 * Desktop only (pointer: fine).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only on devices with a fine pointer (no touch)
    if (!window.matchMedia("(pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let cleanup: (() => void) | null = null

    const init = async () => {
      try {
        const gsapModule = await import("gsap")
        const gsap = (gsapModule as any).default || gsapModule

        // quickTo for buttery smooth 60fps tracking
        const xDot = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power2.out" })
        const yDot = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power2.out" })
        const xRing = gsap.quickTo(ring, "x", { duration: 0.3, ease: "power2.out" })
        const yRing = gsap.quickTo(ring, "y", { duration: 0.3, ease: "power2.out" })

        const handleMouseMove = (e: MouseEvent) => {
          xDot(e.clientX)
          yDot(e.clientY)
          xRing(e.clientX)
          yRing(e.clientY)
        }

        const handleMouseEnterInteractive = () => {
          gsap.to(dot, { scale: 0.5, opacity: 0.5, duration: 0.3, ease: "power2.out" })
          gsap.to(ring, { scale: 1.5, opacity: 1, duration: 0.3, ease: "power2.out" })
        }

        const handleMouseLeaveInteractive = () => {
          gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" })
          gsap.to(ring, { scale: 1, opacity: 0, duration: 0.3, ease: "power2.out" })
        }

        const handleMouseEnterDocument = () => {
          gsap.to(dot, { opacity: 1, duration: 0.3 })
        }

        const handleMouseLeaveDocument = () => {
          gsap.to(dot, { opacity: 0, duration: 0.3 })
          gsap.to(ring, { opacity: 0, duration: 0.3 })
        }

        // Observe interactive elements
        const attachListeners = () => {
          const interactives = document.querySelectorAll("a, button, [data-cursor], input, textarea, select")
          interactives.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnterInteractive)
            el.addEventListener("mouseleave", handleMouseLeaveInteractive)
          })
          return interactives
        }

        let interactives = attachListeners()

        // Re-attach on DOM changes (route transitions etc.)
        const observer = new MutationObserver(() => {
          // Detach old
          interactives.forEach((el) => {
            el.removeEventListener("mouseenter", handleMouseEnterInteractive)
            el.removeEventListener("mouseleave", handleMouseLeaveInteractive)
          })
          // Attach new
          interactives = attachListeners()
        })
        observer.observe(document.body, { childList: true, subtree: true })

        window.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseenter", handleMouseEnterDocument)
        document.addEventListener("mouseleave", handleMouseLeaveDocument)

        // Hide native cursor globally
        const style = document.createElement("style")
        style.id = "custom-cursor-hide"
        style.textContent = "*, *::before, *::after { cursor: none !important; }"
        document.head.appendChild(style)

        cleanup = () => {
          window.removeEventListener("mousemove", handleMouseMove)
          document.removeEventListener("mouseenter", handleMouseEnterDocument)
          document.removeEventListener("mouseleave", handleMouseLeaveDocument)
          interactives.forEach((el) => {
            el.removeEventListener("mouseenter", handleMouseEnterInteractive)
            el.removeEventListener("mouseleave", handleMouseLeaveInteractive)
          })
          observer.disconnect()
          style.remove()
        }
      } catch {}
    }

    init()

    return () => { cleanup?.() }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          borderRadius: "50%",
          backgroundColor: "var(--fg)",
          opacity: 0,
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          borderRadius: "50%",
          border: "1px solid var(--fg)",
          opacity: 0,
          willChange: "transform",
        }}
      />
    </>
  )
}
