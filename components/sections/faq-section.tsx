"use client"

import { FAQAccordion } from "@/components/faq-accordion"
import type { FAQContent } from "@/app/data"

interface FAQSectionProps {
  content: FAQContent
  sectionNumber?: string
  className?: string
}

export function FAQSection({ content, sectionNumber, className = "" }: FAQSectionProps) {
  return (
    <section className={`py-24 md:py-40 ${className}`} style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="mb-16" data-reveal="fade-up">
          {content.eyebrow && (
            <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "var(--accent)" }}>
              {sectionNumber && <span className="mr-3 font-bold">{sectionNumber}</span>}
              {content.eyebrow}
            </p>
          )}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: "var(--fg)" }}>
            {content.title}
          </h2>
          {content.description && (
            <p className="text-lg max-w-xl" style={{ color: "var(--fg-muted)" }}>
              {content.description}
            </p>
          )}
        </div>
        <div data-reveal="stagger">
          <FAQAccordion faqs={content.faqs} />
        </div>
      </div>
    </section>
  )
}
