"use client"

import { GoldDropCanvas } from "@/components/gold-drop-canvas"

/**
 * Second gold layer: transparent WebGL so ribbons sit on top of the section
 * boundary while var(--bg) shows through. Pairs with the opaque hero canvas.
 */
/** Match hero defaults for motion; band centered on seam; scale up for short wide canvas. */
const SEAM_OVERLAY_CONFIG = {
  opaqueBackground: false as const,
  intensity: 0.9,
  speed: 1.0,
  /* Div is vertically centered on the seam (-translate-y-1/2); pack ribbons at canvas midline */
  ribbonBandCenter: 0.0,
  ribbonBandHalfHeight: 0.06,
  geometryScale: 4.6,
  waveHorizontalScale: 0.34,
}

export function HeroGoldSeamOverlay() {
  return (
    <div
      className="pointer-events-none absolute left-0 right-0 top-0 z-[15] h-[11rem] max-h-[32vh] -translate-y-1/2"
      aria-hidden
    >
      <GoldDropCanvas config={SEAM_OVERLAY_CONFIG} />
    </div>
  )
}
