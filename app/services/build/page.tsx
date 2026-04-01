"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

const whatCounts = [
  "Custom web applications",
  "Agentic pipelines and automation systems",
  "Intelligence portals and dashboards",
  "API integrations and middleware",
  "Data processing workflows",
  "Internal tools and admin panels",
]

const recentBuilds = [
  {
    name: "Moon",
    description: "Lead engine that captures, scores, and routes inbound leads through automated follow-up sequences.",
  },
  {
    name: "Qualis",
    description: "Intelligence portal that aggregates industry data, runs analysis, and delivers actionable reports.",
  },
  {
    name: "AMC Morning Intel",
    description: "Automated legal research system that compiles overnight developments into structured morning briefings.",
  },
]

export default function BuildPage() {
  return (
    <div className="min-h-screen">
      

      <SubpageHero
        eyebrow="Custom Work"
        title="Build & Deploy"
        description="You need something that doesn't exist yet. An app, a pipeline, an intelligence portal. We scope it, build it, deliver it — then stay involved for 30 days."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Build & Deploy" },
        ]}
      />

      <main id="main-content">
        <SubpageSection
          eyebrow="What Counts"
          sectionNumber="01"
          title="Beyond Standard Deployments"
          description="Anything that goes beyond a marketing site or off-the-shelf product. Custom workflows, agentic pipelines, dashboards, API integrations."
        >
          <div className="grid md:grid-cols-2 gap-4" data-reveal="stagger">
            {whatCounts.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 p-4 rounded-lg border"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
              >
                <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" style={{ color: "var(--accent)" }} />
                <span className="text-sm leading-relaxed" style={{ color: "var(--fg)" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </SubpageSection>

        <SubpageSection
          background="surface"
          eyebrow="Recent Builds"
          sectionNumber="02"
          title="These Aren't Websites"
          description="They're operational systems. Here's what we've shipped recently."
        >
          <div className="grid md:grid-cols-3 gap-6" data-reveal="stagger">
            {recentBuilds.map((build) => (
              <div
                key={build.name}
                className="p-8 rounded-none border"
                style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
              >
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
                >
                  {build.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                  {build.description}
                </p>
              </div>
            ))}
          </div>
        </SubpageSection>

        <SubpageSection
          eyebrow="How It Works"
          sectionNumber="03"
          title="Scope, Build, Ship"
        >
          <div className="max-w-3xl" data-reveal="fade-up">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)", color: "var(--accent)" }}
                >
                  1
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2" style={{ color: "var(--fg)" }}>Scoping Conversation</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                    We talk through what you need, define the requirements, and give you a fixed quote and timeline. No surprises.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)", color: "var(--accent)" }}
                >
                  2
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2" style={{ color: "var(--fg)" }}>Build Sprint</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                    We build it. You get progress updates. We iterate based on your feedback until it&apos;s right.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)", color: "var(--accent)" }}
                >
                  3
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2" style={{ color: "var(--fg)" }}>Ship + 30-Day Support</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                    We deploy to production and stay involved for 30 days to handle bugs, tweaks, and questions. Then it&apos;s yours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SubpageSection>

        <SubpageSection
          background="surface"
          eyebrow="Pricing"
          sectionNumber="04"
          title="Starts at $5K"
        >
          <div className="max-w-3xl" data-reveal="fade-up">
            <p className="text-lg leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>
              Most builds land between $8K and $15K depending on complexity. You get a fixed quote after the scoping conversation — no hourly billing, no scope creep surprises.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Every build includes 30 days of post-launch support.
            </p>
          </div>
        </SubpageSection>

        <SubpageSection background="gradient">
          <div className="text-center max-w-3xl mx-auto" data-reveal="fade-up">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-8"
              style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
            >
              Describe What You Need
            </h2>
            <p className="text-lg md:text-xl mb-12 leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Share what you&apos;re envisioning. We&apos;ll walk through how we&apos;d approach it, what it costs, and what the timeline looks like.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-semibold text-base px-10 py-4 tracking-wide uppercase transition-all"
              style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
            >
              Book a Call
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </SubpageSection>
      </main>

      <Footer />
    </div>
  )
}
