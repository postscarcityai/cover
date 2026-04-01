"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

const timeline = [
  {
    phase: "Month 1",
    title: "Audit & Foundation",
    items: [
      "Full operational audit — where AI fits, where it doesn't",
      "Identify the highest-leverage places to create space",
      "Deploy your first AI agent via Claude Cowork",
      "Baseline metrics established",
    ],
  },
  {
    phase: "Month 2-3",
    title: "First Systems Live",
    items: [
      "Priority workflows running quietly in the background",
      "Team oriented to new tools and rhythms",
      "Integration with existing systems (CRM, email, calendars)",
      "First tangible results visible",
    ],
  },
  {
    phase: "Month 4+",
    title: "Iteration & Expansion",
    items: [
      "Extend capability to secondary workflows",
      "Advanced agent skills deployed",
      "Cross-team rollout and training",
      "Refinement based on real data",
    ],
  },
  {
    phase: "Ongoing",
    title: "Management & Evolution",
    items: [
      "Quiet maintenance and updates",
      "New capability as the landscape shifts",
      "Thoughtful advisory on emerging tools",
      "Your infrastructure stays current without effort",
    ],
  },
]

export default function TransformPage() {
  return (
    <div className="min-h-screen">
      

      <SubpageHero
        eyebrow="Flagship Service"
        title="Company Transformation"
        description="Most AI projects fail because they chase novelty. Real transformation is quieter — rebuilding how work gets done, piece by piece, until AI is simply infrastructure."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Company Transformation" },
        ]}
      />

      <main id="main-content">
        <SubpageSection
          eyebrow="The Problem"
          sectionNumber="01"
          title="Experiments Don't Take Root"
          description="Most companies try AI by handing someone a ChatGPT login and hoping for the best. That's not transformation. That's a side project."
        >
          <div className="max-w-3xl" data-reveal="fade-up">
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
              Real transformation means rebuilding workflows so AI is woven into how your team operates every day. Quiet systems that run continuously, not tools someone remembers to open. Infrastructure that compounds over time.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              We do this by combining Claude Cowork agent orchestration, custom product builds, team training, and ongoing care into a single engagement. One partner. One system. Everything connected.
            </p>
          </div>
        </SubpageSection>

        <SubpageSection
          background="surface"
          eyebrow="How It Works"
          sectionNumber="02"
          title="The Timeline"
          description="Transformation isn't a one-time project. It's a phased unfolding that builds quietly."
        >
          <div className="grid md:grid-cols-2 gap-8" data-reveal="stagger">
            {timeline.map((phase) => (
              <div
                key={phase.phase}
                className="p-8 rounded-none border"
                style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
              >
                <span
                  className="text-xs tracking-[0.3em] uppercase font-bold"
                  style={{ color: "var(--accent)" }}
                >
                  {phase.phase}
                </span>
                <h3
                  className="text-2xl font-bold mt-2 mb-6"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
                >
                  {phase.title}
                </h3>
                <ul className="space-y-3">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 mt-1 flex-shrink-0" style={{ color: "var(--accent)" }} />
                      <span className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SubpageSection>

        <SubpageSection
          eyebrow="Who It's For"
          sectionNumber="03"
          title="For People Who Think in Systems"
          description="This isn't for companies looking to check an AI box. It's for people who want to reshape how their work actually feels."
        >
          <div className="max-w-3xl" data-reveal="fade-up">
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
              You already know AI matters. You&apos;ve probably tried a few tools. What you need is someone who can look at your entire operation, find the quiet leverage points, and install systems that actually run — not demos that collect dust.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              This is a partnership, not a project. We stay involved as long as it makes sense. Most clients stay for 6+ months because the space it creates keeps expanding.
            </p>
          </div>
        </SubpageSection>

        <SubpageSection
          background="surface"
          eyebrow="Pricing"
          sectionNumber="04"
          title="Custom. Starts With a Conversation."
        >
          <div className="max-w-3xl" data-reveal="fade-up">
            <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--fg-muted)" }}>
              Every company is different. We scope the engagement based on your team size, current infrastructure, and goals. The conversation is free, takes 30 minutes, and you&apos;ll leave with a clear picture of what we&apos;d build.
            </p>
          </div>
        </SubpageSection>

        <SubpageSection background="gradient">
          <div className="text-center max-w-3xl mx-auto" data-reveal="fade-up">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-8"
              style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
            >
              Ready to Begin?
            </h2>
            <p className="text-lg md:text-xl mb-12 leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              30 minutes. No pitch deck — just a conversation about what&apos;s possible.
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
