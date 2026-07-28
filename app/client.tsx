"use client"

import { SectionRenderer } from "@/components/section-renderer"
import { usePageTracking, useScrollTracking } from "@/lib/analytics-hooks"
import { Footer } from "@/components/footer"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema"
import { homepageSections, type FAQContent } from "@/app/data"

export default function HomePageClient() {
  usePageTracking("Homepage", "landing", "homepage")
  useScrollTracking()

  // One FAQPage node per URL — emitted here, not inside the accordion.
  const faqSection = homepageSections.find((s) => s.type === "faq")
  const faqs = faqSection ? (faqSection.content as FAQContent).faqs : []

  return (
    <div className="min-h-screen">
      <JsonLd data={breadcrumbSchema([])} />
      {faqs.length > 0 && <JsonLd data={faqPageSchema(faqs)} />}
      {/* Scroll progress bar */}
      <div className="scroll-progress" />
      <main id="main-content">
        <SectionRenderer sections={homepageSections} />
      </main>
      <Footer />
    </div>
  )
}
