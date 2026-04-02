"use client"

import Link from "next/link"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

export default function ClosePage() {
  return (
    <div className="min-h-screen">
      

      <SubpageHero
        title="Close"
        description="Contract CRM built for agencies and professional services. Track deals, generate documents, manage the pipeline. Lightweight by design."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Close" },
        ]}
      />

      <main id="main-content">
        {/* What It Does */}
        <SubpageSection
          eyebrow="Overview"
          sectionNumber="01"
          title="What It Does"
          description="Close tracks every deal from first contact to signed contract. It generates MSA and SOW documents through Google Docs, manages pipeline stages, and gives you a clear view of where every engagement stands."
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Deal Tracking", detail: "Pipeline view with customizable stages. See every deal, its status, and next action at a glance." },
              { label: "Document Generation", detail: "Generate MSA and SOW documents via Google Docs templates. Fill in the deal data, get a polished contract." },
              { label: "Client Pipeline", detail: "Manage contacts, companies, and deal history in one place. No switching between five different tools." },
              { label: "Activity Log", detail: "Every email, call, and meeting logged against the deal. Full history, zero manual entry." },
              { label: "Revenue Forecasting", detail: "Weighted pipeline with probability scoring. Know what is closing this month and what is at risk." },
              { label: "Lightweight by Design", detail: "No enterprise bloat. Fast to set up, fast to use. Built for small teams that close real deals." },
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
          description="Close is a CRM that respects your time and your workflow. It is built for small teams and agencies — not enterprise sales organizations with 50-stage pipelines and quarterly business reviews."
        >
          <div className="max-w-3xl space-y-6">
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              You need to know who you are talking to, what the deal is worth, and where the contract stands. Close does exactly that and nothing more.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Document generation is the killer feature. Instead of manually assembling contracts in Google Docs, Close pulls deal data into templates and generates polished MSAs and SOWs automatically. The contract matches the deal because they come from the same source of truth.
            </p>
          </div>
        </SubpageSection>

        {/* Live Examples */}
        <SubpageSection
          eyebrow="In Production"
          sectionNumber="03"
          title="Live Examples"
          description="Close manages every PostScarcity AI client engagement."
        >
          <div className="max-w-3xl">
            <div
              className="rounded-none p-6 border"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
            >
              <h3
                className="text-lg font-bold mb-2"
                style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
              >
                Every PostScarcity AI Engagement
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                From initial prospect conversation through signed MSA to active project delivery. Close is the system of record for the entire client lifecycle.
              </p>
            </div>
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
              Close connects to{" "}
              <Link href="/services/transform" className="underline" style={{ color: "var(--accent)" }}>
                Transform
              </Link>{" "}
              — every engagement that involves process automation or operational tooling flows through Close for pipeline management and contract generation.
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
              Get Started with Close
            </h2>
            <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Replace your spreadsheet pipeline with a real CRM that generates contracts. Or let us set it up and customize it for your workflow.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/postscarcityai/close"
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
