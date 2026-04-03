"use client"

import { useEffect, useRef, useState } from "react"
import { useGoldDropWebGL } from "@/lib/shaders/gold-drop/use-gold-drop-webgl"
import { DEFAULT_CONFIG } from "@/lib/shaders/gold-drop/types"
import type { GoldDropConfig } from "@/lib/shaders/gold-drop/types"

interface GoldDropCanvasProps {
  config?: Partial<GoldDropConfig>
  className?: string
  dprCap?: number
}

export function GoldDropCanvas({
  config: overrides,
  className = "",
  dprCap = 2,
}: GoldDropCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [reducedMotion, setReducedMotion] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const config: GoldDropConfig = { ...DEFAULT_CONFIG, ...overrides }

  useGoldDropWebGL(canvasRef, { config, reducedMotion, dprCap })

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 block size-full bg-transparent ${className}`}
      aria-hidden
    />
  )
}
