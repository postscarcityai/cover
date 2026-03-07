"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { PracticeAreas } from "@/components/practice-areas"
import { ResultsTicker } from "@/components/results-ticker"
import { ClientCommitment } from "@/components/client-commitment"
import { usePageTracking, useScrollTracking } from "@/lib/analytics-hooks"
import { Footer } from "@/components/footer"
import { siteConfig } from "@/site.config"

// Lazy load below-fold components
const JurisdictionalReach = dynamic(() => import("@/components/jurisdictional-reach").then(mod => ({ default: mod.JurisdictionalReach })), {
  loading: () => <div className="h-96 bg-gradient-to-b from-gray-50 to-white animate-pulse" />,
  ssr: true
})

export default function HomePageClient() {
  // Track page view once on mount
  usePageTracking('Homepage', 'landing', 'homepage')

  // Track scroll depth milestones
  useScrollTracking()

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": siteConfig.url
    }]
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <ResultsTicker />
        <PracticeAreas />
        <JurisdictionalReach />
        <ClientCommitment />
      </main>
      <Footer />
    </div>
  )
}
