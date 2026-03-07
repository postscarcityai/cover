"use client"

import { ArrowRight, CheckCircle, Phone, Scale, Gavel, Shield, Zap, Globe, FileText, AlertTriangle, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/magnetic-button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"
import { ConsultationForm } from "@/components/consultation-form"
import { TaglineDivider } from "@/components/tagline-divider"
import { usePageTracking, useScrollTracking } from "@/lib/analytics-hooks"
import type { PracticeAreasData } from "./data"

interface Props {
  data: PracticeAreasData
}

const iconComponents: Record<string, any> = {
  ArrowRight, CheckCircle, Phone, Scale, Gavel, Shield, Zap, Globe, FileText, AlertTriangle, Users,
}

export default function PracticeAreasClient({ data }: Props) {
  const { hero, stats, primaryServices, secondaryServices, additionalInfo } = data

  usePageTracking("Services", "service", "services")
  useScrollTracking()

  return (
    <div className="min-h-screen">
      <Navigation />

      <SubpageHero
        eyebrow="Our Services"
        title={Array.isArray(hero.title) ? hero.title.join(" ") : hero.title}
        description={hero.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      >
        <div className="flex flex-wrap gap-8 mt-4">
          <div className="flex flex-col">
            <span className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "var(--accent)" }}>
              {stats.primary.label}
            </span>
            <span className="text-3xl font-bold" style={{ color: "var(--fg)" }}>
              {stats.primary.value}
            </span>
            <span className="text-sm" style={{ color: "var(--fg-muted)" }}>{stats.primary.subtext}</span>
          </div>
          <div className="w-px opacity-20" style={{ backgroundColor: "var(--fg)" }} />
          <div className="flex flex-col">
            <span className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "var(--accent)" }}>
              {stats.secondary.label}
            </span>
            <span className="text-3xl font-bold" style={{ color: "var(--fg)" }}>
              {stats.secondary.value}
            </span>
            <span className="text-sm" style={{ color: "var(--fg-muted)" }}>{stats.secondary.subtext}</span>
          </div>
        </div>
      </SubpageHero>

      <main id="main-content">
        <SubpageSection
          eyebrow="What We Do"
          title="Core Services"
          description={primaryServices.introduction}
        >
          <blockquote
            data-reveal="fade-up"
            className="p-8 border-l-4 text-lg italic leading-relaxed mb-16"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--accent)", color: "var(--fg)" }}
          >
            &ldquo;{primaryServices.quote}&rdquo;
          </blockquote>

          <div className="space-y-24" data-reveal="stagger">
            {primaryServices.sections.map((section, sectionIndex) => {
              const Icon = iconComponents[section.icon] || Scale
              const number = String(sectionIndex + 1).padStart(2, "0")
              const isReversed = sectionIndex % 2 === 1

              return (
                <div
                  key={section.title}
                  className={`grid md:grid-cols-2 gap-16 md:gap-20 items-start`}
                >
                  <div className={isReversed ? "md:order-2" : ""}>
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-14 h-14 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)" }}
                      >
                        <Icon className="h-7 w-7" style={{ color: "var(--accent)" }} />
                      </div>
                      <span
                        className="text-4xl font-bold"
                        style={{ color: "color-mix(in srgb, var(--accent) 30%, transparent)" }}
                      >
                        {number}
                      </span>
                    </div>
                    <h3
                      className="text-3xl md:text-4xl font-bold mb-4"
                      style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
                    >
                      {section.title}
                    </h3>
                    <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                      {section.description}
                    </p>
                  </div>

                  <div className={isReversed ? "md:order-1" : ""}>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {section.areas.map((area) => (
                        <div
                          key={area}
                          className="flex items-center gap-3 p-4 border rounded-lg transition-all duration-300 hover:border-[var(--accent)]"
                          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                        >
                          <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: "var(--accent)" }} />
                          <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </SubpageSection>

        <TaglineDivider text="Additional Services" />

        <SubpageSection
          background="surface"
          eyebrow="Expanded Offerings"
          title="Additional Services"
          description={secondaryServices.introduction}
        >
          <blockquote
            data-reveal="fade-up"
            className="p-8 border-l-4 text-lg italic leading-relaxed mb-16"
            style={{ backgroundColor: "var(--muted)", borderColor: "var(--accent)", color: "var(--fg)" }}
          >
            &ldquo;{secondaryServices.quote}&rdquo;
          </blockquote>

          <div className="space-y-24" data-reveal="stagger">
            {secondaryServices.sections.map((section, sectionIndex) => {
              const Icon = iconComponents[section.icon] || Users
              const number = String(sectionIndex + 1).padStart(2, "0")
              const isReversed = sectionIndex % 2 === 1

              return (
                <div
                  key={section.title}
                  className="grid md:grid-cols-2 gap-16 md:gap-20 items-start"
                >
                  <div className={isReversed ? "md:order-2" : ""}>
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-14 h-14 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)" }}
                      >
                        <Icon className="h-7 w-7" style={{ color: "var(--accent)" }} />
                      </div>
                      <span
                        className="text-4xl font-bold"
                        style={{ color: "color-mix(in srgb, var(--accent) 30%, transparent)" }}
                      >
                        {number}
                      </span>
                    </div>
                    <h3
                      className="text-3xl md:text-4xl font-bold mb-4"
                      style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
                    >
                      {section.title}
                    </h3>
                    <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                      {section.description}
                    </p>
                  </div>

                  <div className={isReversed ? "md:order-1" : ""}>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {section.areas.map((area) => (
                        <div
                          key={area}
                          className="flex items-center gap-3 p-4 border rounded-lg transition-all duration-300 hover:border-[var(--accent)]"
                          style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}
                        >
                          <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: "var(--accent)" }} />
                          <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </SubpageSection>

        <SubpageSection background="surface">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div data-reveal="fade-up">
              <ConsultationForm
                title="Ready to Discuss Your Needs?"
                description="Tell us about your project and we'll connect you with the right expert."
              />
            </div>
            <div data-reveal="fade-up">
              <h3
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
              >
                {additionalInfo.title}
              </h3>
              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--fg-muted)" }}>
                {additionalInfo.description}
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {additionalInfo.areas.map((area) => (
                  <div
                    key={area}
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{ backgroundColor: "var(--muted)" }}
                  >
                    <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: "var(--accent)" }} />
                    <span className="text-sm" style={{ color: "var(--fg)" }}>{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SubpageSection>

        <SubpageSection background="gradient">
          <div className="text-center max-w-4xl mx-auto" data-reveal="fade-up">
            <h2
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8"
              style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
            >
              Let&apos;s Work Together
            </h2>
            <p className="text-lg md:text-xl mb-12 leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Take the first step toward achieving your goals. Our team is ready to help.
            </p>
            <MagneticButton>
              <Button
                variant={null as any}
                size="lg"
                className="font-semibold text-base px-10 py-5 tracking-wide uppercase rounded-full transition-all hover:scale-105"
                style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
                onClick={() => (window.location.href = "/contact")}
              >
                Contact Us Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </MagneticButton>
          </div>
        </SubpageSection>
      </main>

      <Footer />
    </div>
  )
}
