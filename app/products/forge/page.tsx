"use client"

import Link from "next/link"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

export default function ForgePage() {
  return (
    <div className="min-h-screen">
      

      <SubpageHero
        title="Forge"
        description="AI image and video generation platform. An MCP server with 21 tools that plugs directly into AI coding agents."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Forge" },
        ]}
      />

      <main id="main-content">
        {/* What It Does */}
        <SubpageSection
          eyebrow="Overview"
          sectionNumber="01"
          title="What It Does"
          description="Forge is a Model Context Protocol server that gives AI agents the ability to generate, edit, and manage images and video. 21 tools across generation, upscaling, inpainting, background removal, and video creation."
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "MCP Native", detail: "Runs as an MCP server. Any AI coding agent — Claude, Cursor, Windsurf — can call it directly." },
              { label: "21 Tools", detail: "Image generation, editing, upscaling, inpainting, background removal, video creation, and more." },
              { label: "Multi-Provider", detail: "Supports multiple AI providers. Swap models without changing your workflow." },
              { label: "Batch Processing", detail: "Generate multiple variations in parallel. Queue jobs and retrieve results asynchronously." },
              { label: "Asset Management", detail: "Automatic file organization, metadata tracking, and output cataloging." },
              { label: "Video Generation", detail: "Create short-form video from text prompts or image inputs. Storyboard to render in one pipeline." },
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
          description="Creative production is often the missing piece in AI-assisted development workflows. You can generate code in seconds, but the moment you need a hero image, an icon set, or a product video, you leave your editor and shift into a separate tool."
        >
          <div className="max-w-3xl space-y-6">
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Forge keeps you in the flow. Your AI agent calls Forge the same way it calls any other tool — through MCP. Need a hero image for the landing page you just built? The agent generates it, places it, and keeps moving. No browser tabs, no manual uploads, no interruption.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Every image on every Cover site was generated through Forge. Every article illustration, every social media asset, every product shot. The entire creative pipeline runs through one interface.
            </p>
          </div>
        </SubpageSection>

        {/* Live Examples */}
        <SubpageSection
          eyebrow="In Production"
          sectionNumber="03"
          title="Live Examples"
          description="Forge is the engine behind all PostScarcity AI creative output."
        >
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { name: "Cover Site Imagery", description: "Every hero image, background, and visual asset across all Cover-powered client sites." },
              { name: "AMC Defense Law Articles", description: "Article illustrations and featured images for the legal blog content pipeline." },
              { name: "Creative Production Assets", description: "Social media graphics, presentation visuals, and brand collateral across all engagements." },
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
              Forge connects to{" "}
              <Link href="/services/creative" className="underline" style={{ color: "var(--accent)" }}>
                Creative Production
              </Link>{" "}
              — every visual asset in every engagement is generated through Forge. It is the image engine behind{" "}
              <Link href="/products/cover" className="underline" style={{ color: "var(--accent)" }}>
                Cover
              </Link>
              , providing all site imagery and article illustrations.
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
              Explore Forge
            </h2>
            <p className="text-lg mb-10 leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Add AI-powered creative production to your agent workflow. Or let us run Forge as part of a managed engagement.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/postscarcityai/forge"
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
