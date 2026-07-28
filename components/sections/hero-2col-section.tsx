"use client"

import { useEffect, useState } from "react"
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
  const segments = content.segments
  const hasSegments = !!segments?.length

  const bgImages = content.backgroundImages ?? []
  const hasBg = bgImages.length > 0

  // Slideshow: start on a random image (client-side, to avoid an SSR hydration
  // mismatch) and slowly crossfade through the set. Single image = static.
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (bgImages.length <= 1) return
    setActive(Math.floor(Math.random() * bgImages.length))
    const id = setInterval(() => {
      setActive((i) => (i + 1) % bgImages.length)
    }, 11000)
    return () => clearInterval(id)
  }, [bgImages.length])

  const headingColor = hasBg ? "text-white" : "text-ink"
  const bodyColor = hasBg ? "text-white/85" : "text-mute"

  return (
    <section
      data-hero-section
      className={`relative flex items-center overflow-hidden ${hasBg ? "h-[78vh] min-h-[560px] lg:min-h-[640px]" : "bg-bg"} ${className}`}
    >
      {hasBg && (
        <>
          {bgImages.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 bg-cover bg-right lg:bg-top ken-burns-zoom"
              style={{
                backgroundImage: `url(${src})`,
                opacity: i === active ? 1 : 0,
                transition: "opacity 5000ms ease-in-out",
              }}
              aria-hidden
            />
          ))}
          {/* Left-darkening scrim so the white headline stays legible over
              whatever image is set, while the right side stays clear. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(12,16,28,0.62) 0%, rgba(12,16,28,0.28) 45%, rgba(12,16,28,0) 75%)",
            }}
            aria-hidden
          />
        </>
      )}

      {/* Geometry mirrors the nav pill (max-w-7xl + matching insets) so the
          headline lines up with the logo and the buttons line up with the
          nav's CTA button. */}
      <div className={`${hasBg ? "relative z-10" : ""} w-full px-3 sm:px-4 pt-28 pb-16 lg:pt-32 lg:pb-20`}>
        <div className="max-w-7xl mx-auto pl-4 pr-2 sm:pl-6 sm:pr-3">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center">
            {/* Left: headline + CTAs */}
            <div>
              <h1
                className={`font-display ${headingColor} font-normal text-[40px] sm:text-[52px] lg:text-[64px] xl:text-[72px] leading-[1.05] tracking-display-tight`}
              >
                {content.title}
              </h1>

              {content.description && (
                <p className={`mt-6 text-base lg:text-lg ${bodyColor} leading-relaxed max-w-2xl`}>
                  {content.description}
                </p>
              )}

              {!hasSegments && (
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
              )}
            </div>

            {/* Right: segment links (when set) or trust signals */}
            {hasSegments ? (
              <div className="w-full lg:ml-auto lg:max-w-md">
                {content.segmentsLabel && (
                  <div
                    className={`text-xs font-semibold uppercase tracking-[0.2em] mb-4 ${
                      hasBg ? "text-white/80" : "text-mute"
                    }`}
                  >
                    {content.segmentsLabel}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {segments!.map((seg) => (
                    <a
                      key={seg.label}
                      href={seg.href}
                      className={`group flex items-center justify-center h-14 sm:h-16 rounded-full text-lg font-semibold tracking-tight shadow-lg ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-xl ${
                        hasBg
                          ? "bg-white/90 backdrop-blur-md text-ink hover:bg-white hover:text-[var(--accent)]"
                          : "bg-white text-ink hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]"
                      }`}
                    >
                      {seg.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <ul className="space-y-5 lg:pt-3">
                {signals.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-base">
                    <Check
                      className="h-5 w-5 mt-0.5 shrink-0"
                      style={{ color: hasBg ? "#ffffff" : "var(--trust)" }}
                      aria-hidden
                    />
                    <span className={hasBg ? "text-white" : "text-ink"}>
                      <strong
                        className="font-semibold"
                        style={{ color: hasBg ? "#ffffff" : "var(--trust)" }}
                      >
                        {s.lead}
                      </strong>{" "}
                      {s.detail}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
