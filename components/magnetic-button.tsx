"use client"

import { useRef, useCallback, type ReactNode } from "react"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const gsapRef = useRef<any>(null)

  const loadGsap = useCallback(async () => {
    if (gsapRef.current) return gsapRef.current
    try {
      const mod = await import("gsap")
      gsapRef.current = (mod as any).default || mod
      return gsapRef.current
    } catch {
      return null
    }
  }, [])

  const handleMouseMove = useCallback(
    async (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const gsap = await loadGsap()
      if (!gsap) return

      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) * strength
      const y = (e.clientY - rect.top - rect.height / 2) * strength

      gsap.to(el, { x, y, duration: 0.4, ease: "power2.out" })
    },
    [strength, loadGsap]
  )

  const handleMouseLeave = useCallback(async () => {
    const el = ref.current
    if (!el) return
    const gsap = await loadGsap()
    if (!gsap) return

    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" })
  }, [loadGsap])

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
