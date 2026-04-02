"use client"

import { GoldPaintCanvas } from "@/components/gold-paint/gold-paint-canvas"
import { MagneticButton } from "@/components/magnetic-button"
import { FillButton } from "@/components/ui/fill-button"
import { CTALink } from "@/components/ui/cta-link"
import { trackScheduleConsultation } from "@/lib/analytics"
import type { HeroContent } from "@/app/data"

interface HeroSectionProps {
  content: HeroContent
  className?: string
}

export function HeroSection({ content, className = "" }: HeroSectionProps) {
  const handlePrimaryClick = () => {
    trackScheduleConsultation("hero_section", "cta_button")
    window.location.href = content.ctaPrimaryHref
  }

  const handleSecondaryClick = () => {
    if (content.ctaSecondaryHref) {
      window.location.href = content.ctaSecondaryHref
    }
  }

  return (
    <section
      data-hero-section
      className={`relative h-[100dvh] flex items-center overflow-hidden bg-background ${className}`}
    >
      {/* WebGL shader — full viewport behind content */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <GoldPaintCanvas preset="heroTriangle" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
        <h1
          data-reveal="chars"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1] tracking-tight mb-8 font-heading max-w-3xl"
          style={{ color: "#111827" }}
        >
          {content.title}
        </h1>

        {content.subtitle && (
          <p
            data-reveal="lines"
            className="text-base sm:text-lg md:text-xl font-light mb-12 max-w-3xl leading-relaxed"
            style={{ color: "#6B7280" }}
          >
            {content.subtitle}
          </p>
        )}

        <div
          data-reveal="fade-up"
          className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
        >
          <MagneticButton>
            <FillButton onClick={handlePrimaryClick}>
              {content.ctaPrimaryText}
            </FillButton>
          </MagneticButton>

          {content.ctaSecondaryText && (
            <CTALink onClick={handleSecondaryClick} muted>
              {content.ctaSecondaryText}
            </CTALink>
          )}
        </div>

        {content.trustText && (
          <p
            data-reveal="fade-in"
            className="mt-12 text-xs tracking-[0.25em] uppercase"
            style={{ color: "#6B7280", opacity: 0.5 }}
          >
            {content.trustText}
          </p>
        )}
      </div>
    </section>
  )
}
