"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

const included = [
  "Cover platform deployment and configuration",
  "Choice of 6 production-ready themes",
  "Blog and articles system with MDX support",
  "AI-generated imagery via Forge",
  "Newsletter integration",
  "Analytics setup",
  "SEO baseline configuration",
  "Lighthouse 90+ performance guarantee",
  "30-day post-launch support",
]

export default function SitePage() {
  return (
    <div className="min-h-screen">
      

      <SubpageHero
        eyebrow="Quick Win"
        title="Marketing Site"
        description="A considered marketing site, not a template someone cloned and forgot about. Built on Cover — our production-ready platform — configured for your business and live in one week."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Marketing Site" },
        ]}
      />

      <main id="main-content">
        <SubpageSection
          eyebrow="The Offer"
          sectionNumber="01"
          title="One Week. Settled."
          description="Most businesses know they need a better site. They just don't want to spend three months getting there."
        >
          <div className="max-w-3xl" data-reveal="fade-up">
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
              When built on Cover, it takes a week. We handle the deployment, theming, content structure, imagery, and SEO setup. You review, we refine, it goes live. The site speaks for itself — and it starts working for you the day it launches.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              This is the clearest first step for most clients. Simple to understand, straightforward to deliver. And once the site is live, it becomes the foundation for everything else — lead capture, content, credibility.
            </p>
          </div>
        </SubpageSection>

        <SubpageSection
          background="surface"
          eyebrow="What's Included"
          sectionNumber="02"
          title="Everything You Need to Launch"
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
          eyebrow="Why Cover"
          sectionNumber="03"
          title="Built on a Real Platform"
          description="Cover isn't a page builder. It's a production-grade marketing site framework built for performance."
        >
          <div className="max-w-3xl" data-reveal="fade-up">
            <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
              Next.js under the hood. Six curated themes designed for real businesses. MDX-powered blog for content that matters. Forge integration for AI-generated imagery that actually looks good. Analytics baked in from day one.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Every site ships with a Lighthouse score of 90 or higher. That&apos;s not a target — it&apos;s a guarantee.
            </p>
          </div>
        </SubpageSection>

        <SubpageSection
          background="surface"
          eyebrow="Who It's For"
          sectionNumber="04"
          title="Businesses Ready for Something Better"
        >
          <div className="max-w-3xl" data-reveal="fade-up">
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              You&apos;re launching something, pivoting, or your current site no longer reflects who you are. You need something real — something you can point people to with confidence. This is it.
            </p>
          </div>
        </SubpageSection>

        <SubpageSection
          eyebrow="Pricing"
          sectionNumber="05"
          title="$2K. One Week. Settled."
        >
          <div className="max-w-md" data-reveal="fade-up">
            <div
              className="p-8 rounded-none border"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
            >
              <span className="text-xs tracking-[0.3em] uppercase font-bold" style={{ color: "var(--accent)" }}>
                Fixed Price
              </span>
              <p className="text-4xl font-bold mt-2" style={{ color: "var(--fg)" }}>$2,000</p>
              <p className="text-sm mt-2 mb-4" style={{ color: "var(--fg-muted)" }}>
                Includes setup, theming, content, imagery, and 30-day support.
              </p>
              <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
                Live in one week. No ongoing fees unless you want managed hosting.
              </p>
            </div>
          </div>
        </SubpageSection>

        <SubpageSection background="gradient">
          <div className="text-center max-w-3xl mx-auto" data-reveal="fade-up">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-8"
              style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
            >
              Let&apos;s Build Something
            </h2>
            <p className="text-lg md:text-xl mb-12 leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              A week from now, you could have a site that quietly does its job — and does it well.
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
