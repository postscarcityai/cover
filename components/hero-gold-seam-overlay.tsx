"use client"

import { GoldDropCanvas } from "@/components/gold-drop-canvas"

/**
 * Front gold layer: transparent WebGL, centered on the seam between
 * hero and the following section.
 *
 * Rendered as a zero-height relative wrapper *between* sections so it
 * lives outside both stacking contexts, paints above both, and scrolls
 * naturally with the page — no portal, no JS scroll tracking needed.
 */
const SEAM_OVERLAY_CONFIG = {
  opaqueBackground: false as const,
  intensity: 0.9,
  speed: 1.0,
  ribbonBandCenter: 0.0,
  ribbonBandHalfHeight: 0.06,
  geometryScale: 4.6,
  waveHorizontalScale: 0.34,
}

/** ~11rem — keep in sync with Tailwind h-[11rem] on canvas host */
const OVERLAY_HEIGHT_PX = 176

export function HeroGoldSeamOverlay() {
  return (
    <div
      className="pointer-events-none relative z-[52] h-0 w-full overflow-visible"
      aria-hidden
    >
      <div
        className="absolute left-0 right-0"
        style={{
          top: -(OVERLAY_HEIGHT_PX / 2),
          height: OVERLAY_HEIGHT_PX,
        }}
      >
        <GoldDropCanvas config={SEAM_OVERLAY_CONFIG} />
      </div>
    </div>
  )
}
