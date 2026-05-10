export interface DesignTokens {
  // Surfaces
  background: string       // page bg
  surface: string          // section bg (subtle off-white)
  surfaceWarm: string      // card warm bg (cream)
  muted: string            // very subtle gray fill
  border: string

  // Ink (text + brand black)
  foreground: string       // body text + brand "black" (NOT pure black — charcoal)
  ink: string              // alias of foreground for clarity at call sites
  mutedForeground: string  // captions, footnotes
  mute: string             // alias of mutedForeground

  // Accent (the one bright brand color, used sparingly)
  accent: string           // CTA bg, announcement bar, eyebrow
  accentForeground: string // text on top of accent
  accentInk: string        // alias of accentForeground

  // Trust (deep accent reserved for trust signals — checkmarks, "guaranteed" copy)
  trust: string

  // Typography
  fontHeading: string      // display type
  fontBody: string         // body type
}

/**
 * Default preset: "Clinical" — modeled on ro.co.
 * Clean light palette, charcoal ink, electric-yellow accent, deep-green trust.
 * One typeface (Inter Tight) used for both display and body.
 */
export const defaultTokens: DesignTokens = {
  background: "#ffffff",
  surface: "#f7f4f1",
  surfaceWarm: "#eee9e4",
  muted: "rgba(26, 26, 26, 0.05)",
  border: "rgba(26, 26, 26, 0.12)",

  foreground: "#1a1a1a",
  ink: "#1a1a1a",
  mutedForeground: "#666666",
  mute: "#666666",

  accent: "#f8ffa1",
  accentForeground: "#1a1a1a",
  accentInk: "#1a1a1a",

  trust: "#0d7744",

  fontHeading: "var(--font-display-source), system-ui, sans-serif",
  fontBody: "var(--font-body-source), system-ui, sans-serif",
}

/**
 * Alternate preset: "Warm" — modeled on hims.com.
 * Cream surfaces, warm gold accent, dark-brown ink for accent text.
 * Apply via siteConfig.colors override:
 *   colors: warmPreset
 */
export const warmPreset: Partial<DesignTokens> = {
  surface: "#fbf8f5",
  surfaceWarm: "#f5ede2",
  accent: "#ffc671",
  accentForeground: "#453421",
  accentInk: "#453421",
}

export function resolveTokens(
  overrides?: Partial<DesignTokens>
): DesignTokens {
  return { ...defaultTokens, ...overrides }
}
