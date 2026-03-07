import type { Metadata } from "next"
import ResultsClient from "./client"
import { resultsData } from "./data"
import { siteConfig } from "@/site.config"

export const metadata: Metadata = {
  title: `${siteConfig.achievementsSection.title} - ${siteConfig.name}`,
  description: siteConfig.achievementsSection.description,
  keywords: siteConfig.seo.keywords,
  alternates: {
    canonical: `${siteConfig.url}/achievements`
  },
  openGraph: {
    title: `${siteConfig.achievementsSection.title} - ${siteConfig.name}`,
    description: siteConfig.achievementsSection.description,
    url: `${siteConfig.url}/achievements`,
    siteName: siteConfig.name,
    type: "website",
    images: siteConfig.seo.openGraph.images
  },
  twitter: {
    card: siteConfig.seo.twitter.cardType as "summary_large_image",
    title: `${siteConfig.achievementsSection.title} - ${siteConfig.name}`,
    description: siteConfig.achievementsSection.description,
    images: siteConfig.seo.openGraph.images.map(img => img.url),
  }
}

export default function ResultsPage() {
  return (
    <>
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(resultsData.breadcrumbSchema)
        }}
      />
      
      <ResultsClient data={resultsData} />
    </>
  )
}
