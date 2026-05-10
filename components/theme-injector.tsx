import { resolveTokens } from "@/theme.config"
import { siteConfig } from "@/site.config"

export function ThemeInjector() {
  const t = resolveTokens(siteConfig.colors)

  const css = `
    :root {
      --bg: ${t.background};
      --surface: ${t.surface};
      --surface-warm: ${t.surfaceWarm};
      --muted: ${t.muted};
      --border: ${t.border};
      --fg: ${t.foreground};
      --ink: ${t.ink};
      --fg-muted: ${t.mutedForeground};
      --mute: ${t.mute};
      --accent: ${t.accent};
      --accent-fg: ${t.accentForeground};
      --accent-ink: ${t.accentInk};
      --trust: ${t.trust};
      --font-heading: ${t.fontHeading};
      --font-body: ${t.fontBody};
      --radius: 0.5rem;
      --radius-pill: 9999px;
    }

    body {
      font-family: var(--font-body);
      background-color: var(--bg);
      color: var(--ink);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-heading);
      font-weight: 400;
      letter-spacing: -0.03em;
      color: var(--ink);
    }

    ::selection {
      background-color: var(--accent);
      color: var(--accent-ink);
    }
  `

  return (
    <style
      id="design-tokens"
      dangerouslySetInnerHTML={{ __html: css }}
    />
  )
}
