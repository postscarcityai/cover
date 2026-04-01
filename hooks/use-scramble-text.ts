"use client"

import { useEffect, useRef, useCallback } from "react"

/**
 * Hook that scrambles text content of a ref element using GSAP ScrambleTextPlugin.
 * Returns a ref to attach to the element and a scrambleTo function.
 */
export function useScrambleText() {
  const ref = useRef<HTMLSpanElement>(null)
  const gsapRef = useRef<any>(null)
  const pluginLoaded = useRef(false)

  useEffect(() => {
    const load = async () => {
      try {
        const gsapModule = await import("gsap")
        const scrambleModule = await import("gsap/ScrambleTextPlugin")

        const gsap = (gsapModule as any).default || gsapModule
        const ScrambleTextPlugin = (scrambleModule as any).default || scrambleModule
        gsap.registerPlugin(ScrambleTextPlugin)

        gsapRef.current = gsap
        pluginLoaded.current = true
      } catch {}
    }
    load()
  }, [])

  const scrambleTo = useCallback((text: string) => {
    const el = ref.current
    if (!el || !gsapRef.current || !pluginLoaded.current) {
      // Fallback: just set text directly
      if (el) el.textContent = text
      return
    }

    gsapRef.current.to(el, {
      duration: 0.4,
      scrambleText: {
        text,
        chars: "01!<>-_\\/{}",
        speed: 0.6,
        revealDelay: 0.1,
      },
    })
  }, [])

  return { ref, scrambleTo }
}
