/**
 * Minimal design-token helpers.
 * Components should use CSS variables directly (var(--accent), etc.)
 * These are convenience shortcuts for inline styles only.
 */

export const tokens = {
  bg: "var(--bg)",
  surface: "var(--surface)",
  muted: "var(--muted)",
  border: "var(--border)",
  fg: "var(--fg)",
  fgMuted: "var(--fg-muted)",
  accent: "var(--accent)",
  accentFg: "var(--accent-fg)",
} as const
