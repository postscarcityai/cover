"use client"

import { ArrowRight } from "lucide-react"
import { PillButton } from "@/components/ui/pill-button"
import { trackScheduleConsultation } from "@/lib/analytics"
import type { CTAContent } from "@/app/data"

interface CTASectionProps {
  content: CTAContent
  className?: string
}

export function CTASection({ content, className = "" }: CTASectionProps) {
  const handlePrimaryClick = () => {
    trackScheduleConsultation("cta_section", "primary_cta")
    window.location.href = content.ctaHref
  }

  const handleSecondaryClick = () => {
    if (content.secondaryCtaHref) window.location.href = content.secondaryCtaHref
  }

  return (
    <section
      className={`py-24 md:py-32 ${className}`}
      style={{ backgroundColor: "var(--surface)" }}
    >
      <div className="container max-w-4xl">
        <h2
          data-reveal="words"
          className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-display-tight leading-[1.05] mb-6"
          style={{ color: "var(--ink)" }}
        >
          {content.title}
        </h2>
        {content.description && (
          <p
            data-reveal="fade-up"
            className="text-lg md:text-xl mb-10 max-w-2xl leading-relaxed"
            style={{ color: "var(--mute)" }}
          >
            {content.description}
          </p>
        )}
        <div data-reveal="fade-up" className="flex flex-col sm:flex-row gap-3 items-start">
          <PillButton size="lg" variant="primary" onClick={handlePrimaryClick}>
            {content.ctaText}
            <ArrowRight className="h-4 w-4" />
          </PillButton>
          {content.secondaryCtaText && content.secondaryCtaHref && (
            <PillButton size="lg" variant="secondary" onClick={handleSecondaryClick}>
              {content.secondaryCtaText}
            </PillButton>
          )}
        </div>
      </div>
    </section>
  )
}
