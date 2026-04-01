"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

const included = [
  "Brand identity and visual direction",
  "Marketing sites built on Cover",
  "Pitch decks and investor materials",
  "AI-generated imagery via Forge",
  "Video production and editing",
  "Social media assets and templates",
  "Print-ready collateral",
  "Brand guidelines documentation",
]

export default function CreativePage() {
  return (
    <div className="min-h-screen">
      

      <SubpageHero
        eyebrow="Creative"
        title="Creative Production"
        description="Brand, design, video, and marketing sites — produced with AI and delivered with care."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Creative Production" },
        ]}
      />

      <main id="main-content">
        <SubpageSection
          eyebrow="The Approach"
          sectionNumber="01"
          title="AI-Amplified, Human-Directed"
          description="We use AI to support every stage of creative production — from concept to delivery — without sacrificing quality or taste."
        >
          <div className="max-w-3xl" data-reveal="fade-up">
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
              AI handles the heavy lifting: generating imagery, iterating on layouts, producing video cuts, building site prototypes. We handle the creative direction, quality control, and final polish. The result is production-quality work delivered with breathing room to spare.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              This isn&apos;t about replacing creative talent. It&apos;s about giving creative people more room to think. Every project has a human creative director making the calls. AI simply removes the busywork between idea and execution.
            </p>
          </div>
        </SubpageSection>

        <SubpageSection
          background="surface"
          eyebrow="What's Included"
          sectionNumber="02"
          title="Full Creative Stack"
        >
          <div className="grid md:grid-cols-2 gap-4" data-reveal="stagger">
            {included.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 p-4 rounded-lg border"
                style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
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
          eyebrow="Forge"
          sectionNumber="03"
          title="AI Imagery That Works"
          description="Forge is our AI image generation pipeline. It produces brand-consistent imagery at scale."
        >
          <div className="max-w-3xl" data-reveal="fade-up">
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
              Need hero images, product shots, team photos, or abstract backgrounds? Forge generates them in your brand style. No stock photos. No generic AI slop. Every image is art-directed and refined to match your visual identity.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Forge imagery is included in every marketing site we build on Cover. For standalone creative projects, it&apos;s available as part of the production package.
            </p>
          </div>
        </SubpageSection>

        <SubpageSection
          background="surface"
          eyebrow="Who It's For"
          sectionNumber="04"
          title="Brands That Value Craft"
        >
          <div className="max-w-3xl" data-reveal="fade-up">
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Startups shaping a brand from scratch. Companies rebranding and need everything to come together. Teams that need ongoing creative output without the overhead of a full agency retainer. If you care about how the work looks and feels, this is the service.
            </p>
          </div>
        </SubpageSection>

        <SubpageSection
          eyebrow="Pricing"
          sectionNumber="05"
          title="Starts at $2K"
        >
          <div className="max-w-3xl" data-reveal="fade-up">
            <p className="text-lg leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>
              Pricing varies by scope. A brand identity package starts at $2K. Full creative production with video and site build scales from there. We give you a fixed quote after understanding what you need.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              No hourly billing. No retainer lock-in. Project-based pricing with clear deliverables.
            </p>
          </div>
        </SubpageSection>

        <SubpageSection background="gradient">
          <div className="text-center max-w-3xl mx-auto" data-reveal="fade-up">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-8"
              style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
            >
              Let&apos;s Make Something
            </h2>
            <p className="text-lg md:text-xl mb-12 leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Share what you&apos;re envisioning. Brand, site, video, the works — we&apos;ll shape it together.
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
