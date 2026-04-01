"use client"

import { SectionRenderer } from "@/components/section-renderer"
import { usePageTracking, useScrollTracking } from "@/lib/analytics-hooks"
import { Footer } from "@/components/footer"
import { siteConfig } from "@/site.config"
import { homepageSections } from "@/app/data"

export default function HomePageClient() {
  usePageTracking("Homepage", "landing", "homepage")
  useScrollTracking()

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
    ],
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Scroll progress bar */}
      <div className="scroll-progress" />
      <main id="main-content">
        <SectionRenderer sections={homepageSections} />
      </main>
      <Footer />
    </div>
  )
}
