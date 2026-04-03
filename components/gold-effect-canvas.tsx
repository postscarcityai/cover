"use client"

import { useEffect, useRef, useState } from "react"
import { useEffectWebGL, DEFAULT_EFFECT_CONFIG } from "@/lib/shaders/use-effect-webgl"
import type { EffectConfig } from "@/lib/shaders/use-effect-webgl"
import { getFragmentSource } from "@/lib/shaders/effects"
import type { GoldEffect } from "@/lib/shaders/effects"

interface GoldEffectCanvasProps {
  effect: GoldEffect
  config?: Partial<EffectConfig>
  className?: string
  dprCap?: number
}

export function GoldEffectCanvas({
  effect,
  config: overrides,
  className = "",
  dprCap = 2,
}: GoldEffectCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [reducedMotion, setReducedMotion] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const config: EffectConfig = { ...DEFAULT_EFFECT_CONFIG, ...overrides }
  const fragmentSource = getFragmentSource(effect)

  useEffectWebGL(canvasRef, fragmentSource, config, reducedMotion, dprCap)

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 block size-full ${className}`}
      aria-hidden
    />
  )
}
