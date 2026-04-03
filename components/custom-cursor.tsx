"use client"

import { useEffect, useRef } from "react"

const CURSOR_GOLD = "#C49A28"
const CURSOR_DARK = "var(--fg)"

/**
 * Custom cursor — small dot that follows the mouse with GSAP quickTo.
 * Scales up and adds a ring on hover over interactive elements.
 * Adapts color to the section underneath: gold on dark sections, dark on light.
 * Desktop only (pointer: fine).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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

        const xDot = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power2.out" })
        const yDot = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power2.out" })
        const xRing = gsap.quickTo(ring, "x", { duration: 0.3, ease: "power2.out" })
        const yRing = gsap.quickTo(ring, "y", { duration: 0.3, ease: "power2.out" })

        // Track current color state to avoid redundant GSAP calls
        let currentColor: "dark" | "gold" = "dark"

        const getThemeAtPoint = (x: number, y: number): "dark" | "gold" => {
          // Walk up the element tree from cursor position to find a data-nav-theme
          const el = document.elementFromPoint(x, y)
          if (!el) return "dark"
          const section = el.closest<HTMLElement>("[data-nav-theme]")
          return section?.dataset.navTheme === "dark" ? "gold" : "dark"
        }

        const applyColor = (theme: "dark" | "gold") => {
          if (theme === currentColor) return
          currentColor = theme
          const color = theme === "gold" ? CURSOR_GOLD : CURSOR_DARK
          gsap.to(dot, { backgroundColor: color, duration: 0.4, ease: "power2.out" })
          gsap.to(ring, { borderColor: color, duration: 0.4, ease: "power2.out" })
        }

        const handleMouseMove = (e: MouseEvent) => {
          xDot(e.clientX)
          yDot(e.clientY)
          xRing(e.clientX)
          yRing(e.clientY)
          applyColor(getThemeAtPoint(e.clientX, e.clientY))
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

        const attachListeners = () => {
          const interactives = document.querySelectorAll("a, button, [data-cursor], input, textarea, select")
          interactives.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnterInteractive)
            el.addEventListener("mouseleave", handleMouseLeaveInteractive)
          })
          return interactives
        }

        let interactives = attachListeners()

        const observer = new MutationObserver(() => {
          interactives.forEach((el) => {
            el.removeEventListener("mouseenter", handleMouseEnterInteractive)
            el.removeEventListener("mouseleave", handleMouseLeaveInteractive)
          })
          interactives = attachListeners()
        })
        observer.observe(document.body, { childList: true, subtree: true })

        window.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseenter", handleMouseEnterDocument)
        document.addEventListener("mouseleave", handleMouseLeaveDocument)

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
          backgroundColor: CURSOR_DARK,
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
          border: `1px solid ${CURSOR_DARK}`,
          opacity: 0,
          willChange: "transform",
        }}
      />
    </>
  )
}
