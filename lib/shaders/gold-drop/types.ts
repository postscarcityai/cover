export interface GoldDropConfig {
  /** Number of flowing noise layers (2–4 recommended). */
  layers: number
  /** Scale of the noise field (lower = larger, softer flows). */
  noiseScale: number
  /** Animation speed multiplier. */
  speed: number
  /** Gold intensity (0 = barely there, 1 = rich). */
  intensity: number
  /** Bias gold toward the right side (0 = even, 1 = strong right). */
  rightBias: number
  /** Fade strength toward top of viewport (0–1). */
  topFade: number
  /** Fade strength toward bottom of viewport (0–1). */
  bottomFade: number
  /**
   * When false, fragment outputs alpha only for gold (clear elsewhere).
   * Use for seam overlays so the next section’s background shows through.
   */
  opaqueBackground: boolean
  /** Normalized Y center of ribbon pack (-0.5 = canvas bottom … +0.5 = top). */
  ribbonBandCenter: number
  /** Half-height of ribbon pack in normalized Y space. */
  ribbonBandHalfHeight: number
  /** Multiplies ribbon width, glow, and wave amplitude (use >1 on short canvases). */
  geometryScale: number
  /** Scales horizontal phase so wave frequency matches across different aspect ratios. */
  waveHorizontalScale: number
}

export const DEFAULT_CONFIG: GoldDropConfig = {
  layers: 3,
  noiseScale: 2.0,
  speed: 1.0,
  intensity: 0.9,
  rightBias: 0.4,
  topFade: 0.5,
  bottomFade: 0.3,
  opaqueBackground: true,
  ribbonBandCenter: -0.45,
  ribbonBandHalfHeight: 0.05,
  geometryScale: 1.0,
  waveHorizontalScale: 1.0,
}
