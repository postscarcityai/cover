import type { Metadata } from "next"
import PracticeAreasClient from "./client"
import { practiceAreasData } from "./data"
import { siteConfig } from "@/site.config"

export const metadata: Metadata = {
  title: `Services - ${siteConfig.name}`,
  description: siteConfig.description,
  keywords: siteConfig.seo.keywords,
  alternates: {
    canonical: `${siteConfig.url}/services`
  },
  openGraph: {
    title: `Services - ${siteConfig.name}`,
    description: siteConfig.description,
    url: `${siteConfig.url}/services`,
    siteName: siteConfig.seo.openGraph.siteName,
    type: "website",
    images: siteConfig.seo.openGraph.images
  },
  twitter: {
    card: siteConfig.seo.twitter.cardType as "summary_large_image",
    title: `Services - ${siteConfig.name}`,
    description: siteConfig.description,
    images: siteConfig.seo.openGraph.images.map(img => img.url),
  }
}

export default function PracticeAreasPage() {
  // Server-side: Prepare data and pass to client component
  return (
    <>
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(practiceAreasData.breadcrumbSchema)
        }}
      />
      
      {/* Service Schemas */}
      {practiceAreasData.serviceSchema.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
      
      <PracticeAreasClient data={practiceAreasData} />
    </>
  )
}
