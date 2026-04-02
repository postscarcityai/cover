"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

const formats = [
  {
    name: "1-on-1 Session",
    price: "$500",
    description: "Focused, hands-on training tailored to your specific workflow and goals. Walk away with something built.",
  },
  {
    name: "Team Workshop (up to 10)",
    price: "$2,000",
    description: "Half-day or full-day workshop for your team. Everyone participates, everyone builds. No spectators.",
  },
  {
    name: "Custom Curriculum",
    price: "$5K+",
    description: "Multi-session training program designed around your team's stack, workflows, and goals. Ongoing support included.",
  },
]

const topics = [
  "Prompt engineering for real work",
  "AI workflow design and automation",
  "Tool selection and evaluation",
  "Building with OpenClaw",
  "Local model setup and usage",
  "AI-augmented content production",
  "Agentic system design",
  "Integration patterns and best practices",
]

export default function TrainingPage() {
  return (
    <div className="min-h-screen">
      

      <SubpageHero
        title="AI Training"
        description="Hands-on sessions where your team leaves with something built — not a certificate, not a slide deck. Everyone walks away with real skills and a working project."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "AI Training" },
        ]}
      />

      <main id="main-content">
        <SubpageSection
          eyebrow="Our Approach"
          sectionNumber="01"
          title="No Slides. Make Something."
          description="We don't lecture. We work alongside your team, making real things with real tools."
        >
          <div className="max-w-3xl" data-reveal="fade-up">
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
              Every session is hands-on. We pick a real workflow from your business, break it down, and rebuild it with AI tools. By the end, your team has something they can use the next day — not just notes from a presentation.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              This is where Vibe Jam started. Over 60 sessions delivered. The format works because it&apos;s grounded in real work, not theory.
            </p>
          </div>
        </SubpageSection>

        <SubpageSection
          background="surface"
          eyebrow="Formats"
          sectionNumber="02"
          title="Pick Your Format"
        >
          <div className="grid md:grid-cols-3 gap-6" data-reveal="stagger">
            {formats.map((format) => (
              <div
                key={format.name}
                className="p-8 rounded-none border"
                style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
              >
                <span
                  className="text-xs tracking-[0.3em] uppercase font-bold"
                  style={{ color: "var(--accent)" }}
                >
                  {format.price}
                </span>
                <h3
                  className="text-2xl font-bold mt-2 mb-4"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
                >
                  {format.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                  {format.description}
                </p>
              </div>
            ))}
          </div>
        </SubpageSection>

        <SubpageSection
          eyebrow="What We Cover"
          sectionNumber="03"
          title="Topics"
          description="Sessions are customized to your team, but here's what we typically work through."
        >
          <div className="grid md:grid-cols-2 gap-4" data-reveal="stagger">
            {topics.map((topic) => (
              <div
                key={topic}
                className="flex items-start gap-3 p-4 rounded-lg border"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
              >
                <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" style={{ color: "var(--accent)" }} />
                <span className="text-sm leading-relaxed" style={{ color: "var(--fg)" }}>
                  {topic}
                </span>
              </div>
            ))}
          </div>
        </SubpageSection>

        <SubpageSection
          background="surface"
          eyebrow="Who It's For"
          sectionNumber="04"
          title="Teams Ready to Grow"
        >
          <div className="max-w-3xl" data-reveal="fade-up">
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
              Founders who want to understand what&apos;s possible. Teams ready to adopt AI tools thoughtfully. Companies that want every employee to be more capable, not just the technical ones.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Training is often the entry point for larger engagements. Once teams see what&apos;s possible in a session, they want the infrastructure to support it. That&apos;s where OpenClaw and transformation come in.
            </p>
          </div>
        </SubpageSection>

        <SubpageSection background="gradient">
          <div className="text-center max-w-3xl mx-auto" data-reveal="fade-up">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-8"
              style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
            >
              Book a Call
            </h2>
            <p className="text-lg md:text-xl mb-12 leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Tell us about your team and what you&apos;d like to explore. We&apos;ll shape a session around what matters to you.
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
