"use client"

import { GoldPaintCanvas, type GoldPaintCanvasProps } from "@/components/gold-paint/gold-paint-canvas"

export { GoldPaintCanvas, type GoldPaintCanvasProps }

/** @deprecated Prefer `GoldPaintCanvas` with `preset="heroTriangle"`. */
export function HeroShader({ className = "" }: { className?: string }) {
  return <GoldPaintCanvas preset="heroTriangle" className={className} />
}
