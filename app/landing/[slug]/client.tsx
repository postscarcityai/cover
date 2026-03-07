"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { usePageTracking, useScrollTracking } from "@/lib/analytics-hooks"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"
import { MagneticButton } from "@/components/magnetic-button"
import { ConsultationForm } from "@/components/consultation-form"
import type { LandingPageConfig } from "./data"

interface LandingPageClientProps {
  landingPage: LandingPageConfig
  searchParams: Record<string, string | undefined>
}

export default function LandingPageClient({ landingPage, searchParams }: LandingPageClientProps) {
  usePageTracking(landingPage.meta.title, "landing", landingPage.slug)
  useScrollTracking()

  const { hero, sections } = landingPage

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <Navigation />

      <main id="main-content">
        <SubpageHero
          title={hero.title}
          description={hero.subtitle}
          align="center"
          size="compact"
        >
          <MagneticButton>
            <Link
              href={hero.ctaHref}
              className="inline-flex items-center px-8 py-4 font-semibold text-sm uppercase tracking-wide rounded-full transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--accent-fg)",
              }}
            >
              {hero.ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </MagneticButton>
        </SubpageHero>

        {sections.map((section, index) => {
          if (section.type === "features" && section.features) {
            return (
              <SubpageSection
                key={index}
                background="surface"
                title={section.title}
              >
                <div className="grid md:grid-cols-3 gap-8" data-reveal="stagger">
                  {section.features.map((feature, i) => (
                    <div
                      key={i}
                      className="p-8 rounded-2xl"
                      style={{
                        backgroundColor: "var(--surface)",
                        borderColor: "var(--border)",
                        borderWidth: "1px",
                      }}
                    >
                      <CheckCircle
                        className="h-8 w-8 mb-4"
                        style={{ color: "var(--accent)" }}
                      />
                      <h3
                        className="text-xl font-bold mb-2"
                        style={{
                          fontFamily: "var(--font-heading)",
                          color: "var(--fg)",
                        }}
                      >
                        {feature.title}
                      </h3>
                      <p style={{ color: "var(--fg-muted)" }}>
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </SubpageSection>
            )
          }

          if (section.type === "cta") {
            return (
              <SubpageSection key={index} background="accent">
                <div className="max-w-4xl mx-auto text-center">
                  {section.title && (
                    <h2
                      className="text-3xl md:text-4xl font-bold mb-6"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--accent-fg)",
                      }}
                    >
                      {section.title}
                    </h2>
                  )}
                  {section.content && (
                    <p
                      className="text-xl mb-8"
                      style={{ color: "var(--accent-fg)", opacity: 0.9 }}
                    >
                      {section.content}
                    </p>
                  )}
                  {section.ctaText && section.ctaHref && (
                    <div data-reveal="fade-up">
                      <MagneticButton>
                        <Link
                          href={section.ctaHref}
                          className="inline-flex items-center px-8 py-4 font-semibold text-sm uppercase tracking-wide rounded-full transition-opacity hover:opacity-90"
                          style={{
                            backgroundColor: "var(--accent-fg)",
                            color: "var(--accent)",
                          }}
                        >
                          {section.ctaText}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </MagneticButton>
                    </div>
                  )}
                </div>
              </SubpageSection>
            )
          }

          if (section.type === "text") {
            return (
              <SubpageSection key={index} title={section.title}>
                {section.content && (
                  <p
                    className="text-lg leading-relaxed max-w-3xl"
                    style={{ color: "var(--fg-muted)" }}
                    data-reveal="fade-up"
                  >
                    {section.content}
                  </p>
                )}
              </SubpageSection>
            )
          }

          if (section.type === "consultation") {
            return (
              <SubpageSection
                key={index}
                background="surface"
                title={section.title}
                description={section.description}
              >
                <div data-reveal="fade-up">
                  <ConsultationForm
                    title={section.formTitle}
                    description={section.formDescription}
                    buttonText={section.formButtonText}
                  />
                </div>
              </SubpageSection>
            )
          }

          return null
        })}
      </main>

      <Footer />
    </div>
  )
}
