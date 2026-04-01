"use client"

import { useEffect, useRef } from "react"

interface ScrambleEyebrowProps {
  children: React.ReactNode
  sectionNumber?: string
  className?: string
}

/**
 * Eyebrow text that scramble-reveals when it enters the viewport.
 * Falls back to instant display if ScrambleText isn't available.
 */
export function ScrambleEyebrow({ children, sectionNumber, className = "" }: ScrambleEyebrowProps) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let cleanup: (() => void) | null = null

    const init = async () => {
      try {
        const gsapModule = await import("gsap")
        const stModule = await import("gsap/ScrollTrigger")
        const scrambleModule = await import("gsap/ScrambleTextPlugin")

        const gsap = (gsapModule as any).default || gsapModule
        const ScrollTrigger = (stModule as any).default || stModule
        const ScrambleTextPlugin = (scrambleModule as any).default || scrambleModule
        gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin)

        // Store original text
        const originalText = el.textContent || ""

        // Start with scrambled/empty appearance
        gsap.set(el, { opacity: 0 })

        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(el, { opacity: 1, duration: 0.1 })
            gsap.to(el, {
              duration: 0.8,
              scrambleText: {
                text: originalText,
                chars: "01!<>-_\\/{}",
                speed: 0.4,
                revealDelay: 0.2,
              },
            })
          },
        })

        cleanup = () => { st.kill() }
      } catch {
        // Fallback: just show it
        if (el) el.style.opacity = "1"
      }
    }

    init()

    return () => { cleanup?.() }
  }, [])

  return (
    <p
      ref={ref}
      className={`text-xs tracking-[0.3em] uppercase mb-6 ${className}`}
      style={{ color: "var(--accent)" }}
    >
      {sectionNumber && <span className="mr-3 font-medium">{sectionNumber}</span>}
      {children}
    </p>
  )
}
