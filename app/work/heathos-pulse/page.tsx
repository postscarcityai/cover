"use client"

import Link from "next/link"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

export default function HeathosPulsePage() {
  return (
    <div className="min-h-screen">
      

      <SubpageHero
        eyebrow="Case Study"
        title="Heathos Pulse"
        description="Monthly healthcare newsletter for Heathos. Word doc in, published same day."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
          { label: "Heathos Pulse" },
        ]}
        size="compact"
      />

      <SubpageSection
        background="default"
        eyebrow="The Build"
        sectionNumber="01"
        title="What We Built"
      >
        <div className="max-w-3xl">
          <p
            className="text-lg leading-relaxed mb-6"
            style={{ color: "var(--fg-muted)" }}
          >
            A monthly healthcare newsletter built on Cover for Heathos. The
            workflow is simple: Matt Schenk sends a Word doc around the 24th of
            each month. We format, design, and publish it the same day.
          </p>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            Seven volumes live and counting. Clean design, consistent cadence,
            zero friction for the client.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <p
              className="text-4xl md:text-5xl font-light mb-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--accent)" }}
            >
              7
            </p>
            <p className="text-sm uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>
              Volumes Published
            </p>
          </div>
          <div>
            <p
              className="text-4xl md:text-5xl font-light mb-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--accent)" }}
            >
              Same Day
            </p>
            <p className="text-sm uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>
              Doc to Published
            </p>
          </div>
        </div>
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
