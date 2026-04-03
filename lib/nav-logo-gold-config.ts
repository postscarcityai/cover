/**
 * Gold ribbon accent behind / above the nav wordmark (GoldDropCanvas).
 *
 * **Disable**
 * - Set `siteConfig.features.navLogoGoldWaves` to `false`, or
 * - Remove `<NavLogoGoldWaves />` from `components/navigation.tsx`.
 *
 * **Tune** — ribbons, brightness, and motion for the small black header strip:
 */
import type { GoldDropConfig } from "@/lib/shaders/gold-drop/types"

export const NAV_LOGO_GOLD_DROP_CONFIG: Partial<GoldDropConfig> = {
  opaqueBackground: false,
  intensity: 0.58,
  speed: 0.72,
  ribbonBandCenter: -0.34,
  ribbonBandHalfHeight: 0.032,
  geometryScale: 2.4,
  waveHorizontalScale: 0.48,
}
