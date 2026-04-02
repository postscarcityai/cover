"use client"

import { ArrowRight, Scale, CheckCircle, Calendar, MapPin, Gavel, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/magnetic-button"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"
import { TaglineDivider } from "@/components/tagline-divider"
import { usePageTracking, useScrollTracking } from "@/lib/analytics-hooks"
import type { ResultsData } from "./data"

interface Props {
  data: ResultsData
}

export default function ResultsClient({ data }: Props) {
  const { hero, stats, featuredResults, additionalResults, testimonial, cta } = data

  usePageTracking("Results", "social_proof", "results_page")
  useScrollTracking()

  const statBoxes = [
    { icon: Scale, ...stats.federal },
    { icon: Gavel, ...stats.state },
    { icon: Shield, ...stats.postConviction },
  ]

  return (
    <div className="min-h-screen">
      

      <SubpageHero
        title={hero.title}
        description={hero.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Results" },
        ]}
      >
        <p
          className="text-base leading-relaxed max-w-2xl mt-4"
          style={{ color: "var(--fg-muted)" }}
        >
          {hero.description}
        </p>
      </SubpageHero>

      <main id="main-content">
        <SubpageSection>
          <div className="grid md:grid-cols-3 gap-6" data-reveal="stagger">
            {statBoxes.map((stat) => (
              <div
                key={stat.label}
                className="p-8 rounded-lg border transition-all duration-500 hover:border-[var(--accent)]"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)" }}
                  >
                    <stat.icon className="h-5 w-5" style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--accent)" }}>
                      {stat.label}
                    </p>
                    <p className="text-lg font-bold" style={{ color: "var(--fg)" }}>{stat.title}</p>
                  </div>
                </div>
                <ul className="text-sm space-y-1" style={{ color: "var(--fg-muted)" }}>
                  {stat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span style={{ color: "var(--accent)" }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SubpageSection>

        <TaglineDivider text="Featured Results" />

        <SubpageSection background="surface">
          <div className="space-y-24">
            {featuredResults.map((result, index) => (
              <div key={result.id} id={result.id} className="scroll-mt-24">
                <div
                  data-reveal="fade-up"
                  className="grid lg:grid-cols-2 gap-16 items-start"
                >
                  <div>
                    <div
                      className="p-8 rounded-lg border"
                      style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <Gavel className="h-5 w-5" style={{ color: "var(--accent)" }} />
                        <h3
                          className="text-2xl font-bold"
                          style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
                        >
                          {result.title}
                        </h3>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div>
                          <span className="font-semibold text-sm" style={{ color: "var(--fg)" }}>Charge: </span>
                          <span className="text-sm" style={{ color: "var(--fg-muted)" }}>{result.charge}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" style={{ color: "var(--fg-muted)" }} />
                          <span className="text-sm" style={{ color: "var(--fg-muted)" }}>{result.jurisdiction}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" style={{ color: "var(--fg-muted)" }} />
                          <span className="text-sm" style={{ color: "var(--fg-muted)" }}>{result.date}</span>
                        </div>
                      </div>

                      <div
                        className="p-4 rounded-lg border-l-4 mb-4"
                        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                      >
                        <div className="font-semibold text-sm mb-1" style={{ color: "var(--fg-muted)" }}>
                          Worst Case Scenario:
                        </div>
                        <div className="text-sm" style={{ color: "var(--fg-muted)" }}>{result.worstCase}</div>
                      </div>

                      <div
                        className="p-4 rounded-lg border-l-4"
                        style={{ backgroundColor: "var(--surface)", borderColor: "var(--accent)" }}
                      >
                        <div className="font-semibold text-sm mb-1" style={{ color: "var(--accent)" }}>
                          Actual Results:
                        </div>
                        <div className="text-sm font-medium" style={{ color: "var(--accent)" }}>
                          {result.actualResults}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm tracking-[0.2em] uppercase mb-3" style={{ color: "var(--accent)" }}>
                        Arrested For
                      </h4>
                      <p className="leading-relaxed" style={{ color: "var(--fg)" }}>{result.arrestedFor}</p>
                    </div>

                    <div>
                      <h4 className="text-sm tracking-[0.2em] uppercase mb-3" style={{ color: "var(--accent)" }}>
                        What Was Done
                      </h4>
                      <p className="leading-relaxed" style={{ color: "var(--fg)" }}>{result.whatWasDone}</p>
                    </div>

                    <div
                      className="p-6 rounded-lg"
                      style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
                    >
                      <h4 className="text-sm tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Unique Approach
                      </h4>
                      <p className="leading-relaxed opacity-90">{result.uniqueApproach}</p>
                    </div>
                  </div>
                </div>

                {index < featuredResults.length - 1 && (
                  <div className="flex items-center justify-center my-16">
                    <div
                      className="w-full max-w-2xl h-px opacity-20"
                      style={{ backgroundColor: "var(--fg)" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </SubpageSection>

        <SubpageSection
          eyebrow="Track Record"
          title="More Successful Outcomes"
          description="A comprehensive view of our track record across federal and state courts"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-reveal="stagger">
            {additionalResults.map((result) => (
              <div
                key={result.title}
                className="group p-6 rounded-lg border transition-all duration-500 hover:border-[var(--accent)]"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold mb-1" style={{ color: "var(--fg)" }}>{result.title}</h3>
                    <p className="text-sm" style={{ color: "var(--fg-muted)" }}>{result.charge}</p>
                  </div>
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)", color: "var(--accent)" }}
                  >
                    {result.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 flex-shrink-0" style={{ color: "var(--accent)" }} />
                  <span className="text-sm font-medium" style={{ color: "var(--accent)" }}>{result.result}</span>
                </div>
              </div>
            ))}
          </div>
        </SubpageSection>

        <SubpageSection background="surface">
          <div className="max-w-4xl mx-auto text-center" data-reveal="fade-up">
            <div
              className="p-12 rounded-lg"
              style={{ backgroundColor: "var(--muted)" }}
            >
              <div
                className="text-6xl leading-none mb-6"
                style={{ color: "var(--accent)" }}
              >
                &ldquo;
              </div>
              <blockquote
                className="text-2xl md:text-3xl font-light leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
              >
                {testimonial.quote}
              </blockquote>
              <div className="font-medium" style={{ color: "var(--fg)" }}>
                {testimonial.author}
              </div>
              <div className="text-sm" style={{ color: "var(--fg-muted)" }}>
                {testimonial.title}
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
              {cta.title}
            </h2>
            <p className="text-lg md:text-xl mb-12 leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              {cta.description}
            </p>
            <MagneticButton>
              <Button
                variant={null as any}
                size="lg"
                className="font-semibold text-base px-10 py-5 tracking-wide uppercase transition-all"
                style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
                onClick={() => (window.location.href = "/contact")}
              >
                {cta.buttonText}
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
