"use client"

import { Check } from "lucide-react"
import { PillButton } from "@/components/ui/pill-button"
import { trackScheduleConsultation } from "@/lib/analytics"
import type { HeroContent, TrustSignal } from "@/app/data"

interface Hero2ColSectionProps {
  content: HeroContent
  className?: string
}

const DEFAULT_SIGNALS: TrustSignal[] = [
  { lead: "Trusted by", detail: "businesses nationwide" },
  { lead: "Real results,", detail: "real timelines" },
  { lead: "Get started", detail: "100% online" },
]

export function Hero2ColSection({ content, className = "" }: Hero2ColSectionProps) {
  const handlePrimary = () => {
    trackScheduleConsultation("hero_section", "cta_button")
    window.location.href = content.ctaPrimaryHref
  }

  const handleSecondary = () => {
    if (content.ctaSecondaryHref) {
      window.location.href = content.ctaSecondaryHref
    }
  }

  const signals = content.trustSignals?.length ? content.trustSignals : DEFAULT_SIGNALS

  return (
    <section
      data-hero-section
      className={`bg-bg ${className}`}
    >
      <div className="container py-20 lg:py-28">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Left: headline + CTAs */}
          <div>
            <h1 className="font-display text-ink font-normal text-[40px] sm:text-[52px] lg:text-[64px] xl:text-[72px] leading-[1.05] tracking-display-tight">
              {content.title}
            </h1>

            {content.description && (
              <p className="mt-6 text-base lg:text-lg text-mute leading-relaxed max-w-2xl">
                {content.description}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <PillButton size="lg" variant="primary" onClick={handlePrimary}>
                {content.ctaPrimaryText}
              </PillButton>

              {content.ctaSecondaryText && (
                <PillButton size="lg" variant="secondary" onClick={handleSecondary}>
                  {content.ctaSecondaryText}
                </PillButton>
              )}
            </div>
          </div>

          {/* Right: trust signals */}
          <ul className="space-y-5 lg:pt-3">
            {signals.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-base">
                <Check
                  className="h-5 w-5 mt-0.5 shrink-0"
                  style={{ color: "var(--trust)" }}
                  aria-hidden
                />
                <span className="text-ink">
                  <strong className="font-semibold" style={{ color: "var(--trust)" }}>
                    {s.lead}
                  </strong>{" "}
                  {s.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
