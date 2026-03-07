/**
 * Theme Utility Functions
 *
 * Helper functions to use theme values in components
 */

import { siteConfig } from '@/site.config'
import { getTheme } from '@/theme.config'

// Get the active theme based on site config
export const theme = getTheme(siteConfig.theme)

/**
 * Theme-aware class name helpers
 * Use these instead of hardcoded Tailwind classes for themeable components
 */

export const themeClasses = {
  // Background colors
  bgPrimary: '!bg-[var(--theme-primary)]',
  bgSecondary: '!bg-[var(--theme-secondary)]',
  bgAccent: '!bg-[var(--theme-accent)]',
  bgMuted: '!bg-[var(--theme-muted)]',

  // Text colors
  textPrimary: '!text-[var(--theme-primary)]',
  textPrimaryFg: '!text-[var(--theme-primary-foreground)]',
  textSecondary: '!text-[var(--theme-secondary)]',
  textSecondaryFg: '!text-[var(--theme-secondary-foreground)]',
  textAccent: '!text-[var(--theme-accent)]',
  textAccentFg: '!text-[var(--theme-accent-foreground)]',
  textMuted: '!text-[var(--theme-muted)]',
  textMutedFg: '!text-[var(--theme-muted-foreground)]',

  // Border colors
  borderPrimary: '!border-[var(--theme-primary)]',
  borderSecondary: '!border-[var(--theme-secondary)]',
  borderMuted: '!border-[var(--theme-border)]',

  // Typography (font families)
  fontHeading: 'font-[var(--theme-font-heading)]',
  fontSubheading: 'font-[var(--theme-font-subheading)]',
  fontBody: 'font-[var(--theme-font-body)]',

  // Button styles
  button: {
    primary: `${theme.borderRadius.button} !bg-[var(--theme-primary)] !text-[var(--theme-primary-foreground)] hover:opacity-90 transition-opacity`,
    secondary: `${theme.borderRadius.button} !bg-[var(--theme-secondary)] !text-[var(--theme-secondary-foreground)] hover:opacity-90 transition-opacity`,
    outline: `${theme.borderRadius.button} border-2 !border-[var(--theme-primary)] !bg-white !text-[var(--theme-primary)] hover:!bg-[var(--theme-primary)] hover:!text-[var(--theme-primary-foreground)] transition-colors`,
  },

  // Card styles
  card: `${theme.borderRadius.card} ${theme.effects.shadow} bg-white hover:${theme.effects.shadowHover} transition-shadow`,

  // Section spacing
  section: theme.spacing.section,
  container: `${theme.spacing.container} mx-auto px-4 sm:px-6 lg:px-8`,
  grid: theme.spacing.grid,
}

/**
 * Get inline styles for theme colors
 * Use when Tailwind classes won't work (e.g., in style attributes)
 */
export function getThemeStyles() {
  return {
    primary: { backgroundColor: theme.colors.primary, color: theme.colors.primaryForeground },
    secondary: { backgroundColor: theme.colors.secondary, color: theme.colors.secondaryForeground },
    accent: { backgroundColor: theme.colors.accent, color: theme.colors.accentForeground },
  }
}

/**
 * Typography size classes from theme
 */
export const typography = {
  heroTitle: theme.typography.heroTitle,
  sectionTitle: theme.typography.sectionTitle,
  cardTitle: theme.typography.cardTitle,
  bodySize: theme.typography.bodySize,
  small: theme.typography.small,
}
