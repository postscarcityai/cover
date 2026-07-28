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
 * Default preset: "Periwinkle" — built around the brand indigo #5A6DF3,
 * matching the generated blue imagery (see docs/brand-guides/image-style-guide.md).
 * Cool off-white surfaces, cool charcoal ink, deep-indigo trust.
 * One typeface (Inter Tight) used for both display and body.
 *
 * Accent contrast (WCAG AA):
 *   accent #5A6DF3 vs white → 4.3:1 (UI elements 3:1 ✓, large/bold text 3:1 ✓;
 *   for small body text on accent, prefer the trust indigo #2e3a9f → 9.6:1)
 */
export const defaultTokens: DesignTokens = {
  background: "#ffffff",
  surface: "#f4f5fa",
  surfaceWarm: "#e9ecf9",
  muted: "rgba(23, 25, 33, 0.05)",
  border: "rgba(23, 25, 33, 0.12)",

  foreground: "#171921",
  ink: "#171921",
  mutedForeground: "#63666f",
  mute: "#63666f",

  accent: "#5A6DF3",
  accentForeground: "#ffffff",
  accentInk: "#ffffff",

  trust: "#2e3a9f",

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
