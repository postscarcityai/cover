"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

const included = [
  "Full agent setup and configuration — OpenClaw, Claude Cowork, or custom (1 week)",
  "Custom skills and workflows shaped to how you actually work",
  "Gmail, Calendar, and email integrations",
  "Telegram and GitHub integrations",
  "Supabase and CRM connections",
  "OpenClaw Gateway — phone-based access to your agent",
  "Ongoing care: maintenance, tuning, and new skills as your needs evolve",
  "Dedicated support channel",
]

const integrations = [
  "Gmail",
  "Google Calendar",
  "Telegram",
  "GitHub",
  "Supabase",
  "CRMs (HubSpot, Salesforce, custom)",
  "Slack",
  "Custom APIs",
]

export default function OpenClawPage() {
  return (
    <div className="min-h-screen">
      

      <SubpageHero
        title="Agent Setup & Management"
        description="We install quiet, capable AI agents — OpenClaw, Claude Cowork, or custom setups — that handle the operational weight so you have room to think. We configure them, write the skills, and keep them tuned."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Agent Management" },
        ]}
      />

      <main id="main-content">
        <SubpageSection
          eyebrow="What This Is"
          sectionNumber="01"
          title="Installed Capability, Not Rented Software"
          description="These aren't chatbots. They're agent platforms — OpenClaw, Claude Cowork, and custom setups — that carry operational weight quietly and continuously."
        >
          <div className="max-w-3xl" data-reveal="fade-up">
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
              Your agent monitors your inbox, triages leads, prepares morning briefs, updates your CRM, manages scheduling, and runs the workflows you define. It works steadily in the background — not when someone remembers to prompt it.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              We handle the full arc: choosing the right agent platform for your situation, initial setup, writing the skills that power your workflows, connecting your tools, and maintaining the system month over month so it stays attuned to how your work actually flows.
            </p>
          </div>
        </SubpageSection>

        <SubpageSection
          background="surface"
          eyebrow="What's Included"
          sectionNumber="02"
          title="What We Set Up for You"
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
          eyebrow="Integrations"
          sectionNumber="03"
          title="Connects to Your Stack"
          description="Your agent connects to the tools you already use. If it has an API, we can bridge it."
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-reveal="stagger">
            {integrations.map((integration) => (
              <div
                key={integration}
                className="p-4 rounded-lg border text-center"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
              >
                <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>
                  {integration}
                </span>
              </div>
            ))}
          </div>
        </SubpageSection>

        <SubpageSection
          background="surface"
          eyebrow="Hardware Option"
          sectionNumber="04"
          title="Local AI Nodes"
          description="Need local inference? We offer pre-configured Mac Mini AI nodes that run models on your hardware."
        >
          <div className="max-w-3xl" data-reveal="fade-up">
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
              For clients who want faster inference, data privacy, or reduced API costs, we deploy dedicated hardware running local models. These nodes integrate directly with your agent setup.
            </p>
            <Link
              href="/hardware"
              className="inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3"
              style={{ color: "var(--accent)" }}
            >
              Learn about hardware options <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </SubpageSection>

        <SubpageSection
          eyebrow="Who It's For"
          sectionNumber="05"
          title="Founders, Operators, Small Teams"
          description="People who want an agent doing real operational work — not just answering questions."
        >
          <div className="max-w-3xl" data-reveal="fade-up">
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Most of our clients are founders and small teams who want more breathing room. Not more headcount, not more tools — just a well-crafted agent that carries the operational weight so they can stay focused on the work that matters.
            </p>
          </div>
        </SubpageSection>

        <SubpageSection
          background="surface"
          eyebrow="Pricing"
          sectionNumber="06"
          title="Starting at $1K Setup + $2K-$5K/mo"
        >
          <div className="max-w-3xl" data-reveal="fade-up">
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div
                className="p-6 rounded-none border"
                style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
              >
                <span className="text-xs tracking-[0.3em] uppercase font-bold" style={{ color: "var(--accent)" }}>
                  Setup
                </span>
                <p className="text-3xl font-bold mt-2" style={{ color: "var(--fg)" }}>$1,000</p>
                <p className="text-sm mt-1" style={{ color: "var(--fg-muted)" }}>One-time. Live in 1 week.</p>
              </div>
              <div
                className="p-6 rounded-none border"
                style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
              >
                <span className="text-xs tracking-[0.3em] uppercase font-bold" style={{ color: "var(--accent)" }}>
                  Monthly
                </span>
                <p className="text-3xl font-bold mt-2" style={{ color: "var(--fg)" }}>$2K - $5K</p>
                <p className="text-sm mt-1" style={{ color: "var(--fg-muted)" }}>Based on complexity and skill count.</p>
              </div>
            </div>
          </div>
        </SubpageSection>

        <SubpageSection background="gradient">
          <div className="text-center max-w-3xl mx-auto" data-reveal="fade-up">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-8"
              style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
            >
              More Room to Do Your Best Work
            </h2>
            <p className="text-lg md:text-xl mb-12 leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Tell us what&apos;s on your plate. We&apos;ll listen, map your workflows, and show you what an agent can quietly carry.
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
