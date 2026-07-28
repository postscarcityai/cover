/**
 * Shared page-metadata builder. Collapses the ~20-line canonical + Open Graph
 * + Twitter block every page would otherwise repeat into one call:
 *
 *   export const metadata = pageMetadata({
 *     path: "/about",
 *     title: "About Us",
 *     description: "Who we are and what we do.",
 *   })
 *
 * Sitewide defaults (title template, default OG image, twitter card) live in
 * app/layout.tsx; this helper only sets what varies per page.
 */
import type { Metadata } from "next"
import { siteConfig } from "@/site.config"

export interface PageMetadataInput {
  /** Site-relative path, e.g. "/about". Used for the canonical + OG url. */
  path: string
  /** Page title. Passed through the layout's title template. */
  title: string
  description: string
  /** Extra keywords appended to the sitewide list. */
  keywords?: string[]
  /** Override the default OG image (site-relative or absolute URL). */
  image?: string
  /** Set false for pages that should not be indexed (e.g. gated landings). */
  index?: boolean
}

export function pageMetadata({
  path,
  title,
  description,
  keywords = [],
  image,
  index = true,
}: PageMetadataInput): Metadata {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`
  const images = image
    ? [{ url: image, width: 1200, height: 630, alt: title }]
    : siteConfig.seo.openGraph.images

  return {
    title,
    description,
    keywords: [...siteConfig.seo.keywords, ...keywords],
    alternates: { canonical: url },
    ...(index ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.seo.openGraph.siteName,
      type: "website",
      locale: siteConfig.seo.openGraph.locale,
      images,
    },
    twitter: {
      card: siteConfig.seo.twitter.cardType as "summary_large_image",
      site: siteConfig.seo.twitter.site,
      title,
      description,
      images: images.map((img) => img.url),
    },
  }
}
