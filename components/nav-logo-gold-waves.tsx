"use client"

import { GoldDropCanvas } from "@/components/gold-drop-canvas"
import { NAV_LOGO_GOLD_DROP_CONFIG } from "@/lib/nav-logo-gold-config"
import { siteConfig } from "@/site.config"

type NavLogoGoldWavesProps = {
  /** Override site flag (e.g. Storybook). */
  enabled?: boolean
  className?: string
}

/**
 * Tight gold lines above the logo, drawn behind the wordmark (z-0 vs logo z-10).
 * Gated by `siteConfig.features.navLogoGoldWaves` unless `enabled` is passed.
 */
export function NavLogoGoldWaves({ enabled, className = "" }: NavLogoGoldWavesProps) {
  const on = enabled ?? siteConfig.features.navLogoGoldWaves
  if (!on) return null

  return (
    <div
      className={`pointer-events-none absolute left-0 right-0 z-0 h-10 -top-10 overflow-hidden ${className}`}
      aria-hidden
    >
      <GoldDropCanvas config={NAV_LOGO_GOLD_DROP_CONFIG} dprCap={2} />
    </div>
  )
}
