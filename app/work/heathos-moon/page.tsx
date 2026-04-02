"use client"

import Link from "next/link"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

export default function HeathosMoonPage() {
  return (
    <div className="min-h-screen">
      

      <SubpageHero
        title="Heathos Moon"
        description="National lead intelligence engine for independent insurance agencies. Local AI, zero cloud cost, nationwide coverage."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
          { label: "Heathos Moon" },
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
              Lead Intelligence Engine
            </h3>
            <p className="leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Scans every major metro, scrapes public data, runs enrichment
              through local AI, then scores and ranks prospects. By morning,
              new leads are in the queue.
            </p>
          </div>
          <div>
            <h3
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
            >
              Local AI Inference
            </h3>
            <p className="leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Powered by Qwen2.5-7B running locally. No cloud API calls, no
              per-request cost, no data leaving the building. Chunked recursive
              summarization architecture handles the volume.
            </p>
          </div>
          <div>
            <h3
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
            >
              Nationwide Coverage
            </h3>
            <p className="leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Not limited to a single market. The engine maps independent
              insurance agencies across the country, building a living database
              of prospects and their profiles.
            </p>
          </div>
          <div>
            <h3
              className="text-xl font-bold mb-4"
              style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
            >
              Runs on a Mac Mini
            </h3>
            <p className="leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              No GPU cluster required. The entire pipeline — scraping,
              enrichment, scoring — runs overnight on commodity hardware and
              delivers fresh leads by morning.
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
            Most lead generation tools charge per API call, send your data to
            third-party clouds, and give you the same lists everyone else gets.
            Moon runs locally, costs nothing per query, and builds proprietary
            intelligence that belongs to the client.
          </p>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            The chunked recursive summarization architecture means it can
            process massive volumes of unstructured public data and distill it
            into actionable prospect profiles — all without a single cloud AI
            call.
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
              1,800+
            </p>
            <p className="text-sm uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>
              Leads Enriched
            </p>
          </div>
          <div>
            <p
              className="text-4xl md:text-5xl font-light mb-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--accent)" }}
            >
              50 states
            </p>
            <p className="text-sm uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>
              Nationwide Coverage
            </p>
          </div>
          <div>
            <p
              className="text-4xl md:text-5xl font-light mb-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--accent)" }}
            >
              $0
            </p>
            <p className="text-sm uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>
              Cloud AI Cost
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
            &ldquo;The agent has mapped our known universe.&rdquo;
          </p>
          <cite
            className="text-sm not-italic"
            style={{ color: "var(--fg-muted)" }}
          >
            — Matt Paul, CEO, Heathos
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
