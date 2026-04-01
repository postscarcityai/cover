"use client"

import Link from "next/link"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

export default function CoverPage() {
  return (
    <div className="min-h-screen">
      

      <SubpageHero
        eyebrow="Product"
        title="Cover"
        description="The marketing site platform under every PostScarcity AI client site. One config file. Six themes. Ready in a day."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Cover" },
        ]}
      />

      <main id="main-content">
        {/* What It Does */}
        <SubpageSection
          eyebrow="Overview"
          sectionNumber="01"
          title="What It Does"
          description="Cover is a Next.js marketing site generator. You fill out a single config file and get a production-ready site with blog (MDX), newsletter integration, analytics, cookie consent, GDPR compliance, and Lighthouse scores above 90."
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Single Config", detail: "One file drives the entire site — copy, colors, nav, SEO, legal pages." },
              { label: "6 Themes", detail: "Dark, light, and four brand-tuned palettes. Swap in one line." },
              { label: "MDX Blog", detail: "Write posts in Markdown with React components. Categories, pagination, RSS." },
              { label: "Newsletter", detail: "Built-in email capture with consent management and source tracking." },
              { label: "Analytics", detail: "GA4, GTM, Facebook Pixel, LinkedIn Insight — toggle each with a boolean." },
              { label: "GDPR / CCPA", detail: "Cookie consent banner, privacy policy, terms of service, accessibility statement." },
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
          description="Most agencies rebuild the same marketing site scaffolding from scratch every engagement. Compliance pages get forgotten, performance gets sacrificed for speed, and clients end up locked into proprietary templates they can never leave."
        >
          <div className="max-w-3xl space-y-6">
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Cover replaces that cycle with something calmer. Every client site starts from the same proven foundation. The config-driven architecture means no code changes for most customizations — just data. And because it is MIT licensed, clients own their site forever.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Performance is not optional. Every Cover site ships with Lighthouse scores above 90 out of the box. Lazy loading, image optimization, semantic HTML, and accessible components are baked in, not bolted on.
            </p>
          </div>
        </SubpageSection>

        {/* Live Examples */}
        <SubpageSection
          eyebrow="In Production"
          sectionNumber="03"
          title="Live Examples"
          description="Cover powers every PostScarcity AI client site."
        >
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { name: "AMC Defense Law", description: "Criminal defense firm in South Florida. Full legal site with attorney profiles, practice areas, and blog." },
              { name: "Finesse Plastic Surgery", description: "Plastic surgery practice. Service catalog, before/after galleries, and consultation booking." },
              { name: "Heathos On The Pulse", description: "Hip-hop media platform. Blog-driven content with newsletter integration and social distribution." },
              { name: "Vibe Jam", description: "Music and culture brand. Event-focused site with dynamic content and artist profiles." },
            ].map((site) => (
              <div
                key={site.name}
                className="rounded-none p-6 border"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
              >
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
                >
                  {site.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                  {site.description}
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
              Cover connects to{" "}
              <Link href="/services/site" className="underline" style={{ color: "var(--accent)" }}>
                Site Build &amp; Launch
              </Link>{" "}
              — every client engagement that includes a marketing site runs on Cover. Imagery for Cover sites is generated by{" "}
              <Link href="/products/forge" className="underline" style={{ color: "var(--accent)" }}>
                Forge
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
              Get Started with Cover
            </h2>
            <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Clone the repo and launch a site in an afternoon. Or let us handle the deployment and customization for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/postscarcityai/cover"
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
