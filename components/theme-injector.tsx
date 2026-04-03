import { defaultTokens, resolveTokens } from "@/theme.config"
import { siteConfig } from "@/site.config"

export function ThemeInjector() {
  const t = resolveTokens(siteConfig.colors)
  const cta = defaultTokens
  const hs = siteConfig.heroShell

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
      /* Dark CTA band (matches default token palette; independent of light page theme) */
      --cta-band-bg: ${cta.background};
      --cta-band-fg: ${cta.foreground};
      --cta-band-fg-muted: ${cta.mutedForeground};
      /* Home hero shell (pale field + ink hierarchy + dot texture) */
      --hero-shell-a: ${hs.gradientA};
      --hero-shell-b: ${hs.gradientB};
      --hero-shell-c: ${hs.gradientC};
      --hero-ink-deep: ${hs.inkDeep};
      --hero-ink-mid: ${hs.inkMid};
      --hero-ink-muted: ${hs.inkMuted};
      /* Fallback-friendly: ink + alpha (color-mix + transparent is inconsistent in some engines) */
      --hero-dot-fg: color-mix(in srgb, var(--hero-ink-mid) ${hs.dotInkMixPercent}%, #ffffff);
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
