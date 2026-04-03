export interface DesignTokens {
  background: string
  surface: string
  muted: string
  border: string
  foreground: string
  mutedForeground: string
  accent: string
  accentForeground: string
  fontHeading: string
  fontBody: string
}

export const defaultTokens: DesignTokens = {
  background: "#0a0a0a",
  surface: "#141414",
  muted: "#1a1a1a",
  border: "#262626",
  foreground: "#fafafa",
  mutedForeground: "#888888",
  accent: "#1a6b52",
  accentForeground: "#ffffff",
  fontHeading: "var(--font-instrument-serif), Georgia, serif",
  fontBody:
    "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
}

export function resolveTokens(
  overrides?: Partial<DesignTokens>
): DesignTokens {
  return { ...defaultTokens, ...overrides }
}
