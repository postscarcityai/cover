"use client"

import Link from "next/link"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

export default function FinessePage() {
  return (
    <div className="min-h-screen">
      

      <SubpageHero
        eyebrow="Case Study"
        title="Finesse Plastic Surgery"
        description="Dr. Justin West, board-certified plastic surgeon in Orange County. Breast augmentation, breast lift, body contouring. Elegant without being cold."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
          { label: "Finesse" },
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
              Full Practice Website
            </h3>
            <p className="leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Built on Cover. Patient resources, detailed procedure pages,
              consultation booking, and a treatment planner — all designed to
              feel premium and approachable at the same time.
            </p>
          </div>
          <div>
            <h3
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
            >
              HIPAA-Aware Infrastructure
            </h3>
            <p className="leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              42 CFR Part 2 SUD protections built into the architecture. Not
              just a checkbox — structurally compliant from the ground up.
            </p>
          </div>
          <div>
            <h3
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
            >
              Newsletter Integration
            </h3>
            <p className="leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Patient communication pipeline connected and ready. Stays in
              touch with the practice's audience without manual overhead.
            </p>
          </div>
          <div>
            <h3
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
            >
              Test Suite & Quality
            </h3>
            <p className="leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Full Vitest test suite. Lighthouse-optimized. Accessibility pass
              across every page. Zero regressions shipped.
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
            Most plastic surgery websites lean into one of two extremes —
            clinical sterility or lifestyle fluff. Finesse hits the middle:
            elegant, warm, technically rigorous. The site respects the patient's
            intelligence and the surgeon's expertise equally.
          </p>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            Under the hood, it is one of the most disciplined builds we have
            shipped. HIPAA-aware architecture, 42 CFR Part 2 protections, full
            accessibility audit, and a test suite that catches regressions
            before they reach production.
          </p>
        </div>
      </SubpageSection>

      <SubpageSection
        background="default"
        eyebrow="Results"
        sectionNumber="03"
        title="Impact"
      >
        <blockquote
          className="border-l-4 pl-6 py-4 max-w-2xl"
          style={{ borderColor: "var(--accent)" }}
        >
          <p
            className="text-xl italic mb-3"
            style={{ color: "var(--fg)" }}
          >
            &ldquo;We have seen a sharp growth in consultations since we launched.&rdquo;
          </p>
          <cite
            className="text-sm not-italic"
            style={{ color: "var(--fg-muted)" }}
          >
            — Dr. Justin West
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
