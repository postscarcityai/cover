"use client"

import type { CSSProperties } from "react"
import { MagneticButton } from "@/components/magnetic-button"
import { FillButton } from "@/components/ui/fill-button"
import { CTALink } from "@/components/ui/cta-link"
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

  const scopedTheme = {
    "--fg": "var(--cta-band-fg)",
    "--fg-muted": "var(--cta-band-fg-muted)",
    "--bg": "var(--cta-band-bg)",
  } as CSSProperties

  return (
    <section
      className={`relative py-24 md:py-40 overflow-hidden border-t border-b ${className}`}
      style={{ backgroundColor: "var(--cta-band-bg)", borderColor: "color-mix(in srgb, var(--cta-band-fg) 12%, transparent)" }}
    >
      <div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24"
        style={scopedTheme}
      >
        <h2
          data-reveal="words"
          className="text-4xl md:text-5xl lg:text-7xl font-light mb-8 font-heading"
          style={{ color: "var(--fg)" }}
        >
          {content.title}
        </h2>
        {content.description && (
          <p
            data-reveal="fade-up"
            className="text-lg md:text-xl mb-12 max-w-2xl leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            {content.description}
          </p>
        )}
        <div data-reveal="fade-up" className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <MagneticButton>
            <FillButton onClick={handlePrimaryClick}>
              {content.ctaText}
            </FillButton>
          </MagneticButton>
          {content.secondaryCtaText && content.secondaryCtaHref && (
            <CTALink onClick={handleSecondaryClick} muted>
              {content.secondaryCtaText}
            </CTALink>
          )}
        </div>
      </div>
    </section>
  )
}
