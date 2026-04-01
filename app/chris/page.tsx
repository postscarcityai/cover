"use client"

import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"
import Link from "next/link"

export default function ChrisPage() {
  return (
    <div className="min-h-screen">
      
      <main id="main-content">
        <SubpageHero
          eyebrow="Founder"
          title="Meet Chris"
          description="Chris has been building with AI since before it was cool. Now he builds AI agents and infrastructure for businesses that want the real thing — not a chatbot, not a SaaS subscription. Hands-on, in-person, and obsessed with making it actually work."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Chris Johnston" },
          ]}
        />

        <SubpageSection
          eyebrow="Background"
          sectionNumber="01"
          title="15+ Years Building Technology"
        >
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                For over 15 years, Chris has built scalable, human-centered technologies at the
                intersection of creativity and machine learning. The skill isn&apos;t prompting — it&apos;s
                knowing what to build, having taste to know when it&apos;s wrong, and moving fast
                enough to find out.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                Previously a Product Director at a leading agency overseeing eight agile teams,
                Chris brings deep experience in scalable product systems, generative frameworks,
                and creative development.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                Today, he pioneers vibe coding — building software by directing AI agents in plain
                language, iterating fast, and shipping before you would have finished speccing it the
                old way. This approach powered projects like Moon (Heathos), Qualis Intelligence Portal,
                AMC Defense Law, and Finesse Plastic Surgery.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                His answers won&apos;t always be the ones you&apos;re looking for — expect wax on, wax off
                activities and brutally honest feedback. The goal is to ship faster today, build
                systems that compound tomorrow.
              </p>
            </div>
          </div>
        </SubpageSection>

        <SubpageSection
          background="surface"
          eyebrow="Philosophy"
          sectionNumber="02"
          title="The PostScarcity Thesis"
        >
          <div className="max-w-3xl space-y-6">
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              The goal isn&apos;t to automate people out of work — it&apos;s to automate the repetitive and
              routine so the parts that matter get more attention, energy, and care.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              AI compresses what used to require ten people into what one person can orchestrate.
              That&apos;s not a feature. That&apos;s a shift in how companies operate. We help businesses
              evolve — gradually, deliberately, in a way that actually sticks.
            </p>
            <blockquote
              className="border-l-4 pl-6 py-4 text-xl italic"
              style={{ borderColor: "var(--accent)", color: "var(--fg)" }}
            >
              &ldquo;We help companies do more with less — by building AI systems that work while you sleep.&rdquo;
            </blockquote>
          </div>
        </SubpageSection>

        <SubpageSection
          eyebrow="Expertise"
          sectionNumber="03"
          title="Specializations"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Generative AI Strategy",
              "Multi-Agent Systems",
              "Scalable Product Development",
              "Creative System Architecture",
              "AI-Integrated Community Building",
              "Human Factors Integration",
              "Vibe Coding",
              "Local AI Inference",
              "OpenClaw Orchestration",
            ].map((skill) => (
              <div
                key={skill}
                className="p-5 rounded-lg border"
                style={{
                  borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)",
                  backgroundColor: "var(--surface)",
                }}
              >
                <p className="font-medium" style={{ color: "var(--fg)" }}>
                  {skill}
                </p>
              </div>
            ))}
          </div>
        </SubpageSection>

        <SubpageSection background="accent">
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <h2
              className="text-3xl md:text-4xl font-light"
              style={{ fontFamily: "var(--font-heading)", color: "var(--accent-fg)" }}
            >
              Let&apos;s Talk
            </h2>
            <p style={{ color: "var(--accent-fg)", opacity: 0.8 }}>
              Whether you&apos;re ready to transform your operations or just want to understand
              what AI can do for your business — the conversation starts here.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{
                backgroundColor: "var(--accent-fg)",
                color: "var(--accent)",
              }}
            >
              Book a Call
            </Link>
          </div>
        </SubpageSection>
      </main>
      <Footer />
    </div>
  )
}
