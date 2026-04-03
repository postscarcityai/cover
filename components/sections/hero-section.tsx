"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { FillButton } from "@/components/ui/fill-button"
import { CTALink } from "@/components/ui/cta-link"
import { GoldDropCanvas } from "@/components/gold-drop-canvas"
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
      data-nav-theme="light"
      className={`relative flex max-w-full items-end ${className}`}
      style={{
        background: `linear-gradient(145deg, #F2F5FB 0%, #EDF1F9 42%, #E8EDF7 100%)`,
      }}
    >
      {/* Back layer: pale field + gold (opaque). Front seam layer lives on Features. */}
      <GoldDropCanvas className="pointer-events-none z-0" />

      <div className="relative z-10 w-full min-w-0 max-w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 pt-32 md:pt-40 pb-16 md:pb-24">
        <h1
          data-reveal="chars"
          className="font-heading font-light max-w-full text-balance break-words text-4xl leading-[0.95] tracking-[-0.02em] sm:max-w-[min(100%,48rem)] sm:text-5xl md:max-w-[min(100%,52rem)] md:text-6xl md:mb-7 lg:max-w-[min(100%,56rem)] lg:text-7xl xl:text-8xl mb-6 sm:mb-7"
          style={{ color: "#0E1C2F" }}
        >
          {content.title}
        </h1>

        {content.subtitle && (
          <p
            data-reveal="fade-up"
            className="mb-10 w-full max-w-full text-pretty break-words text-base font-light leading-[1.55] tracking-[0.01em] sm:mb-12 sm:max-w-2xl sm:text-lg sm:leading-[1.5] md:max-w-3xl md:text-xl md:leading-relaxed"
            style={{ color: "#3D4F6B" }}
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
            style={{ color: "#7B8BA5" }}
          >
            {content.trustText}
          </p>
        )}
      </div>
    </section>
  )
}
