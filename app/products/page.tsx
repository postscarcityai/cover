"use client"

import Link from "next/link"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

const products = [
  {
    name: "Cover",
    emoji: "🌐",
    href: "/products/cover",
    github: "https://github.com/postscarcityai/cover",
    description:
      "Marketing site platform. Single config file, six themes, MDX blog, newsletter, analytics, GDPR compliance. Lighthouse 90+.",
    examples: ["AMC Defense Law", "Finesse Plastic Surgery", "Heathos On The Pulse", "Vibe Jam"],
  },
  {
    name: "Forge",
    emoji: "🔥",
    href: "/products/forge",
    github: "https://github.com/postscarcityai/forge",
    description:
      "AI image and video generation platform. MCP server with 21 tools that plugs directly into AI coding agents.",
    examples: ["All Cover site imagery", "AMC article illustrations", "Creative production assets"],
  },
  {
    name: "Close",
    emoji: "🤝",
    href: "/products/close",
    github: "https://github.com/postscarcityai/close",
    description:
      "Contract CRM. Track deals, generate MSA/SOW documents via Google Docs, manage the client pipeline. Lightweight by design.",
    examples: ["Every PostScarcity AI engagement"],
  },
  {
    name: "Recon",
    emoji: "🔍",
    href: "/products/recon",
    github: "https://github.com/postscarcityai/recon",
    description:
      "Lead intelligence engine. Scrapes public sources, enriches contact data, scores and ranks prospects. Supports local AI inference.",
    examples: ["Moon (Heathos)", "Prospect scoring pipelines"],
  },
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <SubpageHero
        title="Products"
        description="Four production-ready products, MIT licensed. Every tool PostScarcity AI uses to build for clients is open source. Clone them and build. Or let us deploy them for you."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products" },
        ]}
        background="white"
        goldAccent="productsLattice"
      />

      <main id="main-content">
        <SubpageSection
          eyebrow="The Stack"
          sectionNumber="01"
          title="What We Build With"
          description="Each product is proven in production across real client engagements. MIT licensed, well-documented, ready to fork."
        >
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product) => (
              <div
                key={product.name}
                className="group rounded-2xl p-8 border transition-all duration-300 hover:translate-y-[-2px]"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{product.emoji}</span>
                  <h3
                    className="text-2xl font-bold"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
                  >
                    {product.name}
                  </h3>
                </div>

                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {product.description}
                </p>

                <div className="mb-8">
                  <p
                    className="text-xs tracking-[0.2em] uppercase mb-3"
                    style={{ color: "var(--accent)" }}
                  >
                    Live Examples
                  </p>
                  <ul className="space-y-1">
                    {product.examples.map((ex) => (
                      <li
                        key={ex}
                        className="text-sm"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href={product.href}
                    className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold tracking-wider uppercase transition-all hover:scale-105"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--accent-fg)",
                    }}
                  >
                    Learn More
                  </Link>
                  <a
                    href={product.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold tracking-wider uppercase border transition-all hover:scale-105"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--fg-muted)",
                    }}
                  >
                    GitHub
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold tracking-wider uppercase transition-all hover:scale-105"
                    style={{
                      backgroundColor: "var(--surface)",
                      color: "var(--fg)",
                      border: "1px solid var(--accent)",
                    }}
                  >
                    Have Us Deploy This
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </SubpageSection>
      </main>

      <Footer />
    </div>
  )
}
