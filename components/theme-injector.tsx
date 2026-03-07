/**
 * Theme Injector Component
 *
 * Server-side component that injects theme CSS variables into the document
 * This prevents FOUC (Flash of Unstyled Content) by rendering theme variables during SSR
 */

import { getTheme } from '@/theme.config'
import { siteConfig } from '@/site.config'

export function ThemeInjector() {
  const theme = getTheme(siteConfig.theme)
  
  const themeStyles = `
    :root {
      --theme-primary: ${theme.colors.primary};
      --theme-primary-foreground: ${theme.colors.primaryForeground};
      --theme-secondary: ${theme.colors.secondary};
      --theme-secondary-foreground: ${theme.colors.secondaryForeground};
      --theme-accent: ${theme.colors.accent};
      --theme-accent-foreground: ${theme.colors.accentForeground};
      --theme-background: ${theme.colors.background};
      --theme-foreground: ${theme.colors.foreground};
      --theme-muted: ${theme.colors.muted};
      --theme-muted-foreground: ${theme.colors.mutedForeground};
      --theme-border: ${theme.colors.border};
      --theme-input: ${theme.colors.input};
      --theme-ring: ${theme.colors.ring};

      --theme-font-heading: ${theme.typography.heading};
      --theme-font-subheading: ${theme.typography.subheading};
      --theme-font-body: ${theme.typography.body};
      --theme-font-body-size: ${theme.typography.bodySize};
    }

    /* Default body font */
    body {
      font-family: var(--theme-font-body), system-ui, sans-serif;
    }

    h1, h2 {
      font-family: ${theme.typography.heading};
      ${siteConfig.theme === 'elegant' ? 'text-transform: uppercase;' : ''}
    }

    h3, h4, h5, h6 {
      font-family: ${theme.typography.subheading};
    }

    /* Button font consistency */
    button,
    .btn,
    a[role="button"] {
      font-family: var(--theme-font-body), sans-serif;
    }

    /* Utility classes for eyebrow/subheader text */
    .eyebrow,
    .subheader {
      font-family: var(--theme-font-body), sans-serif;
    }
  `

  return (
    <style
      id="custom-theme-vars"
      dangerouslySetInnerHTML={{ __html: themeStyles }}
    />
  )
}
