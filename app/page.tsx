import type { Metadata } from "next"
import { siteConfig } from "@/site.config"
import HomePageClient from "./client"

export const metadata: Metadata = {
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.description,
  keywords: siteConfig.seo.keywords,
  alternates: {
    canonical: siteConfig.url
  },
  openGraph: {
    title: siteConfig.seo.openGraph.siteName,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.seo.openGraph.siteName,
    type: siteConfig.seo.openGraph.type as "website",
    images: siteConfig.seo.openGraph.images
  },
  twitter: {
    card: siteConfig.seo.twitter.cardType as "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.description,
    images: siteConfig.seo.openGraph.images.map(img => img.url),
  }
}

export default function HomePage() {
  return <HomePageClient />
}
