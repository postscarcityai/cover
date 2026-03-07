"use client"

import { ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/magnetic-button"
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
      className={`relative h-[100dvh] flex items-center overflow-hidden ${className}`}
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, color-mix(in srgb, var(--accent) 8%, transparent), transparent)",
        }}
      />

      {content.backgroundImages?.[0] && (
        <div
          data-reveal="parallax"
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${content.backgroundImages[0]})` }}
        />
      )}

      <div className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 max-w-5xl">
        <h1
          data-reveal="words"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] font-bold leading-[0.95] tracking-tight mb-8"
          style={{ color: "var(--fg)" }}
        >
          {content.title}
        </h1>

        {content.subtitle && (
          <p
            data-reveal="fade-up"
            className="text-xl sm:text-2xl md:text-3xl font-light mb-6"
            style={{ color: "var(--fg-muted)" }}
          >
            {content.subtitle}
          </p>
        )}

        <p
          data-reveal="fade-up"
          className="text-base md:text-lg mb-12 max-w-2xl leading-relaxed"
          style={{ color: "var(--fg-muted)" }}
        >
          {content.description}
        </p>

        <div
          data-reveal="fade-up"
          className="flex flex-col sm:flex-row gap-4 items-start"
        >
          <MagneticButton>
            <Button
              variant={null as any}
              size="lg"
              className="font-semibold text-base px-10 py-5 tracking-wide uppercase rounded-full transition-all hover:scale-105"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--accent-fg)",
              }}
              onClick={handlePrimaryClick}
            >
              {content.ctaPrimaryText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </MagneticButton>

          {content.ctaSecondaryText && (
            <MagneticButton>
              <Button
                variant={null as any}
                size="lg"
                className="font-semibold text-base px-10 py-5 tracking-wide uppercase rounded-full border transition-all hover:scale-105"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--fg-muted)",
                  backgroundColor: "transparent",
                }}
                onClick={handleSecondaryClick}
              >
                {content.ctaSecondaryText}
              </Button>
            </MagneticButton>
          )}
        </div>

        {content.trustText && (
          <p
            data-reveal="fade-in"
            className="mt-10 text-xs tracking-[0.25em] uppercase"
            style={{ color: "var(--fg-muted)", opacity: 0.5 }}
          >
            {content.trustText}
          </p>
        )}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown
          className="w-6 h-6 animate-bounce"
          style={{ color: "var(--fg-muted)", opacity: 0.4 }}
        />
      </div>
    </section>
  )
}
