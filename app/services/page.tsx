"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"
import { FillButton } from "@/components/ui/fill-button"

const services = [
  {
    title: "Company Transformation",
    price: "Custom",
    description: "Full AI evolution — infrastructure, operations, team. A phased partnership that compounds over time.",
    href: "/services/transform",
  },
  {
    title: "Agent Setup & Management",
    price: "$2K/mo",
    description: "Autonomous agents configured and running. We build the skills, wire the integrations, and keep it sharp.",
    href: "/services/openclaw",
  },
  {
    title: "Marketing Site",
    price: "$2K",
    description: "A production site on Cover, live in days. The fastest way to establish presence and start converting.",
    href: "/services/site",
  },
  {
    title: "Build & Deploy",
    price: "$5K",
    description: "Custom products, pipelines, dashboards, agentic systems. Scoped, built, and shipped in weeks.",
    href: "/services/build",
  },
  {
    title: "AI Training",
    price: "$500/session",
    description: "Hands-on workshops. No slides. Everyone leaves with something built and the confidence to keep going.",
    href: "/services/training",
  },
  {
    title: "Creative Production",
    price: "$2K+",
    description: "Brand, design, imagery, video — AI-amplified, human-directed, shipped at machine speed.",
    href: "/services/creative",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      

      <SubpageHero
        eyebrow="Services"
        title="What We Build"
        description="AI systems that ship in weeks, not quarters. We scope, build, and deploy — then stay as long as the advantage demands it."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />

      <main id="main-content">
        <SubpageSection
          eyebrow="Our Services"
          title="Pick Your Entry Point"
          description="Six ways in. Each one ships something real and opens the door to what comes next."
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-reveal="stagger">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group block p-8 border transition-all duration-300 hover:border-[var(--accent)]"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex items-baseline justify-between mb-4">
                  <h3
                    className="text-xl font-medium"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
                  >
                    {service.title}
                  </h3>
                  <span
                    className="text-sm font-medium tracking-wide"
                    style={{ color: "var(--accent)" }}
                  >
                    {service.price}
                  </span>
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
                  {service.description}
                </p>
                <span
                  className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3"
                  style={{ color: "var(--accent)" }}
                >
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </SubpageSection>

        <SubpageSection background="gradient">
          <div className="text-center max-w-3xl mx-auto" data-reveal="fade-up">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-8"
              style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
            >
              Not Sure Where to Start?
            </h2>
            <p className="text-lg md:text-xl mb-12 leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              That&apos;s what the first call is for. 30 minutes, no pitch deck, just honest questions.
            </p>
            <FillButton href="/contact">
              Book a Call
            </FillButton>
          </div>
        </SubpageSection>
      </main>

      <Footer />
    </div>
  )
}
