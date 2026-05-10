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
    <section className={`py-24 md:py-32 ${className}`} style={{ backgroundColor: "var(--bg)" }}>
      <div className="container max-w-3xl">
        <div className="mb-12" data-reveal="fade-up">
          {content.eyebrow && (
            <p className="text-xs tracking-[0.18em] uppercase mb-5 font-semibold" style={{ color: "var(--mute)" }}>
              {sectionNumber && <span className="mr-3">{sectionNumber}</span>}
              {content.eyebrow}
            </p>
          )}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-display-tight leading-[1.05] mb-5" style={{ color: "var(--ink)" }}>
            {content.title}
          </h2>
          {content.description && (
            <p className="text-lg max-w-xl" style={{ color: "var(--mute)" }}>
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
