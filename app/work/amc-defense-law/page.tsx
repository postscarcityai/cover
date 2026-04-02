"use client"

import Link from "next/link"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

export default function AMCDefenseLawPage() {
  return (
    <div className="min-h-screen">
      

      <SubpageHero
        title="AMC Defense Law"
        description="Board-certified criminal defense attorney in South Florida. Federal noir aesthetic. A site that sounds like the attorney, not a legal directory."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
          { label: "AMC Defense Law" },
        ]}
      />

      <SubpageSection
        background="default"
        eyebrow="The Build"
        sectionNumber="01"
        title="What We Built"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
            >
              Full Marketing Site
            </h3>
            <p className="leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Built on Cover with a federal noir aesthetic. Dark, authoritative,
              intentional. Every page reads like the attorney speaks — direct,
              credible, and confident.
            </p>
          </div>
          <div>
            <h3
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
            >
              Justice Watch Blog
            </h3>
            <p className="leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              25+ published posts, each with AI-generated cinematic imagery and
              ElevenLabs audio narration. Not a content farm — a legal voice with
              production value.
            </p>
          </div>
          <div>
            <h3
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
            >
              Morning Intelligence Report
            </h3>
            <p className="leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Automated daily email pulling from DoJ and FBI feeds. The attorney
              gets a legal intelligence briefing before his day starts — every
              weekday, no manual effort.
            </p>
          </div>
          <div>
            <h3
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
            >
              GSC Optimization
            </h3>
            <p className="leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Google Search Console performance tracking and optimization,
              driving measurable gains in organic visibility and click-through
              rate.
            </p>
          </div>
        </div>
      </SubpageSection>

      <SubpageSection
        background="surface"
        eyebrow="The Difference"
        sectionNumber="02"
        title="What Makes It Different"
      >
        <div className="max-w-3xl">
          <p
            className="text-lg leading-relaxed mb-6"
            style={{ color: "var(--fg-muted)" }}
          >
            Most attorney websites sound like they were written by the same SEO
            agency. AMC Defense Law sounds like a real federal defense attorney.
            Every blog post has cinematic imagery and audio narration. The
            morning intelligence report means the attorney walks into the office
            already briefed on what matters.
          </p>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            This is not a template with a logo swap. It is a digital presence
            built around one attorney's voice, practice, and daily workflow.
          </p>
        </div>
      </SubpageSection>

      <SubpageSection
        background="default"
        eyebrow="Results"
        sectionNumber="03"
        title="By the Numbers"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          <div>
            <p
              className="text-4xl md:text-5xl font-light mb-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--accent)" }}
            >
              25+
            </p>
            <p className="text-sm uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>
              Blog Posts Published
            </p>
          </div>
          <div>
            <p
              className="text-4xl md:text-5xl font-light mb-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--accent)" }}
            >
              +16%
            </p>
            <p className="text-sm uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>
              GSC Click Increase
            </p>
          </div>
          <div>
            <p
              className="text-4xl md:text-5xl font-light mb-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--accent)" }}
            >
              5x/wk
            </p>
            <p className="text-sm uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>
              Morning Intel Delivered
            </p>
          </div>
        </div>

        <blockquote
          className="border-l-4 pl-6 py-4 max-w-2xl"
          style={{ borderColor: "var(--accent)" }}
        >
          <p
            className="text-xl italic mb-3"
            style={{ color: "var(--fg)" }}
          >
            &ldquo;People rave about the site, no one doesn&rsquo;t like it!&rdquo;
          </p>
          <cite
            className="text-sm not-italic"
            style={{ color: "var(--fg-muted)" }}
          >
            — Aaron, Attorney
          </cite>
        </blockquote>
      </SubpageSection>

      <SubpageSection background="accent">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:gap-3"
            style={{
              backgroundColor: "var(--accent-fg)",
              color: "var(--accent)",
            }}
          >
            <ArrowLeft size={16} /> All Projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:gap-3"
            style={{
              backgroundColor: "var(--accent-fg)",
              color: "var(--accent)",
            }}
          >
            Book a Call <ArrowRight size={16} />
          </Link>
        </div>
      </SubpageSection>

      <Footer />
    </div>
  )
}
