"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/magnetic-button"
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
      className={`py-24 md:py-40 ${className}`}
      style={{
        background: "linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
        <h2
          data-reveal="words"
          className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8"
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
        <div data-reveal="fade-up" className="flex flex-col sm:flex-row gap-4 items-start">
          <MagneticButton>
            <Button
              variant={null as any}
              size="lg"
              className="font-semibold text-base px-10 py-5 tracking-wide uppercase rounded-full transition-all hover:scale-105"
              style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
              onClick={handlePrimaryClick}
            >
              {content.ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </MagneticButton>
          {content.secondaryCtaText && content.secondaryCtaHref && (
            <MagneticButton>
              <Button
                variant={null as any}
                size="lg"
                className="font-semibold text-base px-10 py-5 tracking-wide uppercase rounded-full border transition-all hover:scale-105"
                style={{ borderColor: "var(--border)", color: "var(--fg-muted)", backgroundColor: "transparent" }}
                onClick={handleSecondaryClick}
              >
                {content.secondaryCtaText}
              </Button>
            </MagneticButton>
          )}
        </div>
      </div>
    </section>
  )
}
