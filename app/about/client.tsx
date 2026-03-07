"use client"

import { ArrowRight, CheckCircle, MapPin, Scale, Target, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/magnetic-button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"
import { ConsultationForm } from "@/components/consultation-form"
import { TaglineDivider } from "@/components/tagline-divider"
import { usePageTracking, useScrollTracking } from "@/lib/analytics-hooks"
import type { OurFirmData } from "./data"

interface Props {
  data: OurFirmData
}

const iconMap: Record<string, typeof Scale> = { Scale, Target, Shield }

export default function OurFirmClient({ data }: Props) {
  const { hero, stats, introduction, mission, coreValues, practiceAreas, stateLicenses, federalJurisdictions, cta } = data

  usePageTracking("About", "about", "about_page")
  useScrollTracking()

  return (
    <div className="min-h-screen">
      <Navigation />

      <SubpageHero
        eyebrow={hero.subtitle}
        title={hero.title}
        description={hero.location}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      >
        <div className="flex flex-wrap gap-8 mt-4">
          <div className="flex flex-col">
            <span className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "var(--accent)" }}>
              {stats.experience.label}
            </span>
            <span className="text-3xl font-bold" style={{ color: "var(--fg)" }}>
              {stats.experience.value}
            </span>
            <span className="text-sm" style={{ color: "var(--fg-muted)" }}>
              {stats.experience.subtext}
            </span>
          </div>
          <div className="w-px opacity-20" style={{ backgroundColor: "var(--fg)" }} />
          <div className="flex flex-col">
            <span className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "var(--accent)" }}>
              {stats.jurisdictions.label}
            </span>
            <span className="text-3xl font-bold" style={{ color: "var(--fg)" }}>
              {stats.jurisdictions.value}
            </span>
            <span className="text-sm" style={{ color: "var(--fg-muted)" }}>
              {stats.jurisdictions.subtext}
            </span>
          </div>
        </div>
      </SubpageHero>

      <main id="main-content">
        <SubpageSection maxWidth="narrow">
          <p
            data-reveal="fade-up"
            className="text-xl md:text-2xl leading-relaxed"
            style={{ color: "var(--fg)" }}
          >
            {introduction}
          </p>
        </SubpageSection>

        <TaglineDivider text="Our Mission" />

        <SubpageSection
          background="surface"
          title={mission.heading}
          description={mission.paragraphs[0]}
        >
          <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-start">
            <div data-reveal="fade-up">
              {mission.paragraphs.slice(1).map((paragraph, index) => (
                <p key={index} className="text-base leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div data-reveal="fade-up">
              <blockquote
                className="p-8 text-lg italic leading-relaxed border-l-4"
                style={{
                  backgroundColor: "var(--muted)",
                  borderColor: "var(--accent)",
                  color: "var(--fg)",
                }}
              >
                &ldquo;{mission.quote}&rdquo;
              </blockquote>
            </div>
          </div>
        </SubpageSection>

        <SubpageSection
          eyebrow="What We Stand For"
          title="Our Core Values"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-reveal="stagger">
            {coreValues.map((value, index) => {
              const Icon = iconMap[value.iconName]
              const number = String(index + 1).padStart(2, "0")
              return (
                <div
                  key={value.title}
                  className="group p-8 rounded-lg border transition-all duration-500 hover:border-[var(--accent)]"
                  style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                >
                  <div className="flex items-center justify-between mb-6">
                    {Icon && (
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{ backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)" }}
                      >
                        <Icon className="w-6 h-6" style={{ color: "var(--accent)" }} />
                      </div>
                    )}
                    <span
                      className="text-3xl font-bold"
                      style={{ color: "color-mix(in srgb, var(--accent) 30%, transparent)" }}
                    >
                      {number}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--fg)" }}>
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </SubpageSection>

        <TaglineDivider text="Expertise" />

        <SubpageSection background="surface">
          <div className="grid lg:grid-cols-2 gap-16">
            <div data-reveal="fade-up">
              <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "var(--accent)" }}>
                Services
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold mb-8"
                style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
              >
                Our Services
              </h2>
              <div className="space-y-3">
                {practiceAreas.map((area) => (
                  <div
                    key={area}
                    className="flex items-center gap-4 p-4 border rounded-lg transition-all duration-300 hover:border-[var(--accent)]"
                    style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}
                  >
                    <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                    <span className="font-medium" style={{ color: "var(--fg)" }}>{area}</span>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal="fade-up">
              <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "var(--accent)" }}>
                Coverage
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold mb-8"
                style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
              >
                Where We Serve
              </h2>

              {stateLicenses.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm tracking-[0.2em] uppercase mb-4" style={{ color: "var(--fg-muted)" }}>
                    Primary Locations
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {stateLicenses.map((state) => (
                      <div
                        key={state}
                        className="flex items-center gap-3 p-3 rounded-lg"
                        style={{ backgroundColor: "var(--muted)" }}
                      >
                        <MapPin className="h-4 w-4" style={{ color: "var(--accent)" }} />
                        <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>{state}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {federalJurisdictions.length > 0 && (
                <div>
                  <h3 className="text-sm tracking-[0.2em] uppercase mb-4" style={{ color: "var(--fg-muted)" }}>
                    Additional Coverage
                  </h3>
                  <div
                    className="space-y-2 max-h-64 overflow-y-auto p-4 rounded-lg"
                    style={{ backgroundColor: "var(--muted)" }}
                  >
                    {federalJurisdictions.map((jurisdiction) => (
                      <div key={jurisdiction} className="flex items-center gap-3 py-1">
                        <CheckCircle className="h-3 w-3 flex-shrink-0" style={{ color: "var(--accent)" }} />
                        <span className="text-sm" style={{ color: "var(--fg-muted)" }}>{jurisdiction}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </SubpageSection>

        <SubpageSection background="surface">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div data-reveal="fade-up">
              <ConsultationForm />
            </div>
            <div data-reveal="fade-up" className="flex flex-col justify-center">
              <blockquote
                className="text-2xl md:text-3xl font-light leading-relaxed italic mb-8"
                style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
              >
                &ldquo;{cta.quote}&rdquo;
              </blockquote>
              {cta.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-base leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </SubpageSection>

        <SubpageSection background="gradient">
          <div className="text-center max-w-4xl mx-auto" data-reveal="fade-up">
            <h2
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8"
              style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
            >
              {cta.heading}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton>
                <Button
                  variant={null as any}
                  size="lg"
                  className="font-semibold text-base px-10 py-5 tracking-wide uppercase rounded-full transition-all hover:scale-105"
                  style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
                  onClick={() => (window.location.href = "/contact")}
                >
                  {cta.buttonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </MagneticButton>
            </div>
          </div>
        </SubpageSection>
      </main>

      <Footer />
    </div>
  )
}
