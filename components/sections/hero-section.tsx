"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { FillButton } from "@/components/ui/fill-button"
import { CTALink } from "@/components/ui/cta-link"
import { GoldDropCanvas } from "@/components/gold-drop-canvas"
import { HeroDotField } from "@/components/hero-dot-field"
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
        background:
          "linear-gradient(145deg, var(--hero-shell-a) 0%, var(--hero-shell-b) 42%, var(--hero-shell-c) 100%)",
      }}
    >
      {/* Opaque pale + gold — paints over the CSS gradient; must sit under the dot layer */}
      <GoldDropCanvas className="pointer-events-none z-[1]" />
      {/* Dot field above WebGL (shader is fully opaque; dots underneath would be invisible) */}
      <HeroDotField className="pointer-events-none z-[2]" />

      <div className="relative z-10 w-full min-w-0 max-w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 pt-32 md:pt-40 pb-16 md:pb-24">
        <h1
          data-reveal="chars"
          className="font-heading font-light max-w-full text-balance break-words text-5xl leading-[0.95] tracking-[-0.02em] sm:max-w-[min(100%,48rem)] sm:text-6xl md:max-w-[min(100%,52rem)] md:text-7xl md:mb-7 lg:max-w-[min(100%,56rem)] lg:text-8xl xl:text-9xl mb-6 sm:mb-7"
          style={{ color: "var(--hero-ink-deep)" }}
        >
          {content.title}
        </h1>

        {content.subtitle && (
          <p
            data-reveal="fade-up"
            className="mb-10 w-full max-w-full text-pretty break-words text-base font-light leading-[1.55] tracking-[0.01em] sm:mb-12 sm:max-w-2xl sm:text-lg sm:leading-[1.5] md:max-w-3xl md:text-xl md:leading-relaxed"
            style={{ color: "var(--hero-ink-mid)" }}
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
            style={{ color: "var(--hero-ink-muted)" }}
          >
            {content.trustText}
          </p>
        )}
      </div>
    </section>
  )
}
