import type { Metadata } from "next"
import OurFirmClient from "./client"
import { ourFirmData } from "./data"
import { siteConfig } from "@/site.config"

export const metadata: Metadata = {
  title: `About Us - ${siteConfig.name}`,
  description: siteConfig.about?.description || `Learn more about ${siteConfig.name} and our commitment to excellence.`,
  keywords: siteConfig.seo.keywords,
  alternates: {
    canonical: `${siteConfig.url}/about`
  },
  openGraph: {
    title: `About Us - ${siteConfig.name}`,
    description: siteConfig.about?.description || `Learn more about ${siteConfig.name} and our commitment to excellence.`,
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.seo.openGraph.siteName,
    type: "website",
    images: siteConfig.seo.openGraph.images
  },
  twitter: {
    card: siteConfig.seo.twitter.cardType as "summary_large_image",
    title: `About Us - ${siteConfig.name}`,
    description: siteConfig.about?.description || `Learn more about ${siteConfig.name} and our commitment to excellence.`,
    images: siteConfig.seo.openGraph.images.map(img => img.url),
  }
}

export default function OurFirmPage() {
  // Server-side: Prepare data and pass to client component
  return (
    <>
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ourFirmData.breadcrumbSchema)
        }}
      />
      
      <OurFirmClient data={ourFirmData} />
    </>
  )
}
