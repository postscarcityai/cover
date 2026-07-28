"use client"

import { Phone } from "lucide-react"
import { Footer } from "@/components/footer"
import { ContactConversionForm } from "@/components/contact-conversion-form"
import { PullQuote } from "@/components/pull-quote"
import { trackPhoneCallClick, trackScheduleConsultation } from "@/lib/analytics"
import { usePageTracking, useScrollTracking } from "@/lib/analytics-hooks"
import { siteConfig } from "@/site.config"
import type { ContactData } from "./data"

interface Props {
  data: ContactData
}

const DEFAULT_TRUST_BULLETS = [
  "24-hour response",
  "100% confidential",
  "No obligation",
]

export default function ContactClient({ data }: Props) {
  const { disclaimer } = data

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
        {/* Split conversion hero — copy left, form card right. Shares the
            subpage hero's radial wash, container geometry, and type voice. */}
        <section
          className="relative flex flex-col justify-center pt-32 md:pt-40 pb-16 md:pb-24"
          style={{ backgroundColor: "var(--bg)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 40%, color-mix(in srgb, var(--accent) 6%, transparent), transparent)",
            }}
            aria-hidden
          />

          <div className="relative z-10 container w-full">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              <div data-reveal="fade-up" className="order-2 lg:order-1">
                <nav aria-label="Breadcrumb" className="mb-8">
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
                  className="font-display text-5xl sm:text-6xl md:text-7xl font-normal leading-[0.95] tracking-display-tight mb-6"
                  style={{ color: "var(--fg)" }}
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
                  <a
                    href={phoneHref}
                    onClick={handleCallClick}
                    className="inline-flex items-center gap-2 px-6 h-12 font-semibold text-sm rounded-pill border transition-colors hover:border-[var(--accent)]"
                    style={{
                      backgroundColor: "var(--surface)",
                      color: "var(--accent)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <Phone className="h-4 w-4" />
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </div>
              </div>

              <div data-reveal="fade-up" className="order-1 lg:order-2">
                <div
                  className="rounded-3xl p-6 md:p-8 border max-w-md mx-auto lg:mx-0 lg:ml-auto"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <ContactConversionForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {testimonialQuote && (
          <section className="py-16 md:py-24" style={{ backgroundColor: "var(--surface)" }}>
            <div className="container">
              <div className="max-w-3xl mx-auto" data-reveal="fade-up">
                <PullQuote
                  eyebrow="What clients say"
                  body={testimonialQuote}
                  attribution={
                    testimonialAuthor
                      ? `${testimonialAuthor}${testimonialRole ? `, ${testimonialRole}` : ""}`
                      : undefined
                  }
                />
              </div>
            </div>
          </section>
        )}

        <section className="py-12 md:py-16" style={{ backgroundColor: "var(--bg)" }}>
          <div className="container">
            <details className="group max-w-3xl mx-auto">
              <summary
                className="text-xs font-semibold uppercase tracking-[0.18em] cursor-pointer flex items-center gap-2 [&::-webkit-details-marker]:hidden"
                style={{ color: "var(--fg-muted)" }}
              >
                <span className="transition-transform group-open:rotate-90">›</span>
                {disclaimer.title}
              </summary>
              <div className="mt-4 space-y-2">
                {disclaimer.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--fg-muted)", opacity: 0.8 }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </details>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
