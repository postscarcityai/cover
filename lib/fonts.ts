import { Inter_Tight, Inter } from "next/font/google"

/**
 * Font Configuration
 *
 * `next/font/google` injects raw font-face vars at the root: `--font-display-source`
 * and `--font-body-source`. The design system (theme.config.ts) wraps those in
 * `--font-heading` / `--font-body` stacks with system fallbacks.
 *
 * The `-source` suffix avoids a circular reference where a token-emitted
 * `--font-body` would reference itself.
 *
 * Default: Inter Tight (display) + Inter (body).
 * Swap to Sofia Pro, Söhne, GT America, etc. by replacing the imports here.
 */

export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display-source",
  display: "swap",
})

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body-source",
  display: "swap",
})
