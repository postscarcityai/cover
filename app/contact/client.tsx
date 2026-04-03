"use client"

import { Phone } from "lucide-react"
import { MagneticButton } from "@/components/magnetic-button"
import { Footer } from "@/components/footer"
import { ContactConversionForm } from "@/components/contact-conversion-form"
import { GoldEffectCanvas } from "@/components/gold-effect-canvas"
import { trackPhoneCallClick, trackScheduleConsultation } from "@/lib/analytics"
import { usePageTracking, useScrollTracking } from "@/lib/analytics-hooks"
import { siteConfig } from "@/site.config"

const DEFAULT_TRUST_BULLETS = [
  "24-hour response",
  "100% confidential",
  "No obligation",
]

export default function ContactClient() {
  usePageTracking("Contact", "contact", "contact_page")
  useScrollTracking()

  const config = siteConfig.contactPage
  const headline = config?.conversionHeadline ?? "Get Your Free Consultation"
  const subhead =
    config?.conversionSubhead ??
    "Tell us about your situation. We'll respond within 24 hours—no pressure, no obligation."
  const trustBullets = config?.trustBullets ?? DEFAULT_TRUST_BULLETS
  const testimonialQuote = config?.testimonialQuote
  const testimonialAuthor = config?.testimonialAuthor
  const testimonialRole = config?.testimonialRole

  const handleCallClick = () => {
    trackPhoneCallClick("contact_page", "hero_call_cta")
    trackScheduleConsultation("contact_page", "hero_call_cta")
  }

  const phoneHref = `tel:${siteConfig.contact.phone.replace(/[^\d]/g, "")}`

  return (
    <div className="min-h-screen">
      

      <main id="main-content">
        <section
          className="relative min-h-[100dvh] flex flex-col justify-center py-24 md:py-32 overflow-hidden"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <GoldEffectCanvas effect="voronoi" className="pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 w-full">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              <div data-reveal="fade-up" className="order-2 lg:order-1">
                <nav
                  aria-label="Breadcrumb"
                  className="mb-8"
                >
                  <ol className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase">
                    <li>
                      <a
                        href="/"
                        className="transition-opacity hover:opacity-100"
                        style={{ color: "var(--fg-muted)", opacity: 0.6 }}
                      >
                        Home
                      </a>
                    </li>
                    <li style={{ color: "var(--fg-muted)", opacity: 0.4 }}>/</li>
                    <li style={{ color: "var(--accent)" }}>Contact</li>
                  </ol>
                </nav>

                <h1
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light leading-[1.05] tracking-tight mb-6"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--fg)",
                    fontWeight: 300,
                  }}
                >
                  {headline}
                </h1>

                <p
                  className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {subhead}
                </p>

                <div className="flex flex-wrap gap-6 mb-10">
                  {trustBullets.map((bullet) => (
                    <div
                      key={bullet}
                      className="flex items-center gap-2"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "var(--accent)" }}
                      />
                      <span className="text-sm font-medium">{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <span className="text-sm" style={{ color: "var(--fg-muted)" }}>
                    Prefer to talk?
                  </span>
                  <MagneticButton>
                    <a
                      href={phoneHref}
                      onClick={handleCallClick}
                      className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm rounded-none transition-all hover:scale-[1.02]"
                      style={{
                        backgroundColor: "var(--surface)",
                        color: "var(--accent)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <Phone className="h-4 w-4" />
                      {siteConfig.contact.phoneDisplay}
                    </a>
                  </MagneticButton>
                </div>
              </div>

              <div data-reveal="fade-up" className="order-1 lg:order-2">
                <div
                  className="rounded-2xl p-6 md:p-8 border max-w-md mx-auto lg:mx-0 lg:ml-auto"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                    boxShadow: "0 25px 50px -12px color-mix(in srgb, var(--fg) 8%, transparent)",
                  }}
                >
                  <ContactConversionForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {testimonialQuote && (
          <section
            className="py-20 md:py-28"
            style={{ backgroundColor: "var(--surface)" }}
          >
            <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 text-center" data-reveal="fade-up">
              <blockquote
                className="text-2xl md:text-3xl font-light leading-relaxed italic mb-6"
                style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
              >
                &ldquo;{testimonialQuote}&rdquo;
              </blockquote>
              {testimonialAuthor && (
                <footer>
                  <cite className="font-normal not-italic" style={{ color: "var(--fg)" }}>
                    {testimonialAuthor}
                  </cite>
                  {testimonialRole && (
                    <span className="block text-sm mt-1" style={{ color: "var(--fg-muted)" }}>
                      {testimonialRole}
                    </span>
                  )}
                </footer>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
