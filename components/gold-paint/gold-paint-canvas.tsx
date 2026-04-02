"use client"

import { useEffect, useRef, useState } from "react"
import { useGoldWebGL } from "@/lib/shaders/gold/use-gold-webgl"
import type { GoldPaintPreset, GoldPaintRuntimeOptions, GoldPaintShape } from "@/lib/shaders/gold/types"
import { GOLD_PAINT_PRESETS } from "@/lib/shaders/gold/types"

export type GoldPaintCanvasProps = {
  className?: string
  dprCap?: number
  powerPreference?: "default" | "low-power" | "high-performance"
} & (
  | { preset: GoldPaintPreset; shape?: undefined; options?: GoldPaintRuntimeOptions }
  | { preset?: undefined; shape: GoldPaintShape; options?: GoldPaintRuntimeOptions }
)

export function GoldPaintCanvas(props: GoldPaintCanvasProps) {
  const { className = "", dprCap, powerPreference } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // useState + useEffect (not useSyncExternalStore): server and first client paint must
  // both see `false` so hydration matches; users with reduced motion update after mount.
  const [reducedMotion, setReducedMotion] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  let shape: GoldPaintShape
  let runtime: GoldPaintRuntimeOptions | undefined

  if ("preset" in props && props.preset) {
    const entry = GOLD_PAINT_PRESETS[props.preset]
    shape = entry.shape
    runtime = { ...entry.options, ...props.options }
  } else if ("shape" in props && props.shape) {
    shape = props.shape
    runtime = props.options
  } else {
    shape = GOLD_PAINT_PRESETS.heroTriangle.shape
    runtime = GOLD_PAINT_PRESETS.heroTriangle.options
    if (process.env.NODE_ENV === "development") {
      console.warn("GoldPaintCanvas: pass `preset` or `shape`. Falling back to heroTriangle.")
    }
  }

  useGoldWebGL(canvasRef, {
    shape,
    runtime,
    reducedMotion,
    dprCap,
    powerPreference,
  })

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 block size-full ${className}`}
      aria-hidden
    />
  )
}
