"use client"

import Link from "next/link"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

export default function ReconPage() {
  return (
    <div className="min-h-screen">
      

      <SubpageHero
        eyebrow="Product"
        title="Recon"
        description="Lead intelligence engine. Scrapes public sources, enriches contact data, scores and ranks prospects. Local AI inference supported."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Recon" },
        ]}
      />

      <main id="main-content">
        {/* What It Does */}
        <SubpageSection
          eyebrow="Overview"
          sectionNumber="01"
          title="What It Does"
          description="Recon scrapes publicly available data sources, enriches raw contact information into structured profiles, and scores prospects using configurable criteria. It supports local AI inference via Ollama with Qwen2.5-7B for on-device processing."
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Public Source Scraping", detail: "Collects data from publicly accessible directories, listings, and databases. No paid data brokers required." },
              { label: "Contact Enrichment", detail: "Turns raw names and domains into structured profiles with emails, phone numbers, roles, and company data." },
              { label: "Lead Scoring", detail: "Configurable scoring model ranks prospects by fit, intent signals, and engagement likelihood." },
              { label: "Local AI Inference", detail: "Run enrichment and scoring models locally with Ollama and Qwen2.5-7B. No data leaves your machine." },
              { label: "Pipeline Export", detail: "Push scored leads directly into Close or export as CSV for any CRM. Clean, structured, ready to work." },
              { label: "Scheduling", detail: "Run scraping and enrichment jobs on a schedule. Fresh data without manual intervention." },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-none p-6 border"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
              >
                <h3
                  className="text-sm font-bold tracking-wider uppercase mb-2"
                  style={{ color: "var(--accent)" }}
                >
                  {item.label}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </SubpageSection>

        {/* Problem It Solves */}
        <SubpageSection
          background="surface"
          eyebrow="Why It Exists"
          sectionNumber="02"
          title="The Problem"
          description="Recon gives you direct access to the same public data that lead intelligence platforms resell at a premium. Your data, your infrastructure, your terms."
        >
          <div className="max-w-3xl space-y-6">
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Recon goes straight to the source. It scrapes public data directly, enriches it using local AI models, and gives you full control over the pipeline. Your data stays on your infrastructure. Your scoring model reflects your actual ideal client profile, not a generic algorithm.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Local inference with Ollama means sensitive prospect data never leaves your machine. Qwen2.5-7B handles enrichment and scoring at production quality on consumer hardware. No API costs, no rate limits, no vendor lock-in.
            </p>
          </div>
        </SubpageSection>

        {/* Live Examples */}
        <SubpageSection
          eyebrow="In Production"
          sectionNumber="03"
          title="Live Examples"
          description="Recon powers the lead generation infrastructure for PostScarcity AI and its clients."
        >
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { name: "Moon (Heathos)", description: "Automated prospect discovery and enrichment for the Heathos media platform. Identifies potential partners, advertisers, and collaborators from public data." },
              { name: "PostScarcity AI Prospecting", description: "The foundation of PostScarcity AI's own lead pipeline. Recon identifies, scores, and ranks potential clients before any outreach begins." },
            ].map((example) => (
              <div
                key={example.name}
                className="rounded-none p-6 border"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
              >
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
                >
                  {example.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                  {example.description}
                </p>
              </div>
            ))}
          </div>
        </SubpageSection>

        {/* Connected To */}
        <SubpageSection
          background="surface"
          eyebrow="Connections"
          sectionNumber="04"
          title="Part of the Stack"
        >
          <div className="max-w-3xl space-y-4">
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Recon connects to{" "}
              <Link href="/services/build" className="underline" style={{ color: "var(--accent)" }}>
                Build
              </Link>{" "}
              — custom AI infrastructure engagements that need lead intelligence or data enrichment pipelines. Recon is also the foundation of Moon, the lead engine built for{" "}
              <Link href="/work" className="underline" style={{ color: "var(--accent)" }}>
                Heathos
              </Link>
              .
            </p>
          </div>
        </SubpageSection>

        {/* CTA */}
        <SubpageSection background="gradient">
          <div className="text-center max-w-2xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-light mb-6"
              style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
            >
              Your Pipeline, Your Terms
            </h2>
            <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Run Recon on your own infrastructure with local AI inference. Or let us build and manage a lead intelligence pipeline for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/postscarcityai/recon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold tracking-wider uppercase border transition-all hover:scale-105"
                style={{ borderColor: "var(--border)", color: "var(--fg)" }}
              >
                GitHub
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold tracking-wider uppercase transition-all hover:scale-105"
                style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
              >
                Have Us Deploy This
              </Link>
            </div>
          </div>
        </SubpageSection>
      </main>

      <Footer />
    </div>
  )
}
