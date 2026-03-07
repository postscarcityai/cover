import { resolveTokens } from "@/theme.config"
import { siteConfig } from "@/site.config"

export function ThemeInjector() {
  const t = resolveTokens(siteConfig.colors)

  const css = `
    :root {
      --bg: ${t.background};
      --surface: ${t.surface};
      --muted: ${t.muted};
      --border: ${t.border};
      --fg: ${t.foreground};
      --fg-muted: ${t.mutedForeground};
      --accent: ${t.accent};
      --accent-fg: ${t.accentForeground};
      --font-heading: ${t.fontHeading};
      --font-body: ${t.fontBody};
      --radius: 0.5rem;
    }

    body {
      font-family: var(--font-body);
      background-color: var(--bg);
      color: var(--fg);
    }

    h1, h2, h3, h4, h5, h6 { font-family: var(--font-heading); }

    ::selection {
      background-color: var(--accent);
      color: var(--accent-fg);
    }
  `

  return (
    <style
      id="design-tokens"
      dangerouslySetInnerHTML={{ __html: css }}
    />
  )
}
