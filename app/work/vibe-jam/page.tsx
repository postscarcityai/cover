"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import { Footer } from "@/components/footer"
import { ScreenshotGallery } from "@/components/screenshot-gallery"
import { ScreenshotShowcase } from "@/components/screenshot-showcase"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

export default function VibeJamPage() {
  return (
    <div className="min-h-screen">
      <SubpageHero
        title="Vibe Jam"
        description="A content-led community platform that combines a sharp public brand, a genuinely strong editorial engine, and the internal systems needed to run events, membership, and distribution from one codebase."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
          { label: "Vibe Jam" },
        ]}
      >
        <Link
          href="https://thevibejam.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:gap-3"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--accent-fg)",
          }}
        >
          Visit thevibejam.com <ExternalLink size={16} />
        </Link>
      </SubpageHero>

      <SubpageSection
        background="default"
        eyebrow="Home Page"
        sectionNumber="01"
        title="A homepage that makes the whole brand legible fast"
        description="The front page does not read like a course catalog or a generic AI startup. It feels editorial, opinionated, and alive, while still pushing people toward the next clear action."
      >
        <div className="space-y-10">
          <ScreenshotShowcase
            src="/img/work/vibe-jam/home-full.png"
            alt="Vibe Jam homepage"
            variant="browser-frame"
            priority
            caption="The homepage blends neo-print art direction, strong typography, and clear conversion paths into events, knowledge, and the broader Vibe Jam ecosystem."
          />

          <div className="max-w-3xl space-y-5 text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            <p>
              Vibe Jam started as a workshop brand, but the site evolved into something broader: a public-facing publication, a community entry point, and an operating layer for the business behind it.
            </p>
            <p>
              The design does a lot of strategic work. It gives the brand a point of view, avoids AI-template sludge, and makes the offer feel human before anyone reads a line of copy.
            </p>
          </div>
        </div>
      </SubpageSection>

      <SubpageSection
        background="surface"
        eyebrow="The Blog"
        sectionNumber="02"
        title="This blog deserves its own callout"
        description="Chris was right to flag it. The writing is clear, specific, and useful. It teaches without performing expertise, and it ties directly into the Vibe Jam funnel."
      >
        <div className="space-y-12">
          <ScreenshotGallery
            images={[
              {
                src: "/img/work/vibe-jam/blog-listing.png",
                alt: "Vibe Jam blog listing page",
                caption: "The index feels like an editorial property, not a placeholder blog bolted onto a marketing site.",
              },
              {
                src: "/img/work/vibe-jam/blog-post.png",
                alt: "Vibe Jam blog post page",
                caption: "Posts break down technical ideas in plain English and turn abstract AI concepts into practical next steps.",
              },
            ]}
            variant="grid"
            columns={2}
          />

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5 text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              <p>
                The topics are strong because they stay anchored to real questions: what vibe coding is, how MCP works, how trust boundaries actually matter, and what building with AI looks like when it leaves the hype layer.
              </p>
              <p>
                The tone is the win. Short sentences. High conviction. Low jargon. It sounds like someone who has actually built the thing and can explain it without hiding behind buzzwords.
              </p>
              <p>
                Under the hood, the content system is serious too. Rich metadata, structured article pages, internal distribution hooks, and branded visuals turn the blog into a real editorial engine.
              </p>
            </div>

            <div
              className="rounded-[1.5rem] border p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)",
              }}
            >
              <p className="mb-4 text-xs uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
                Why It Works
              </p>
              <ul className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                <li>Clear explanations of technical ideas in plain English</li>
                <li>Smart topic mix across workflows, tools, and real builds</li>
                <li>Strong visual system that makes the content feel published</li>
                <li>Distribution-ready structure behind the scenes</li>
              </ul>
            </div>
          </div>
        </div>
      </SubpageSection>

      <SubpageSection
        background="default"
        eyebrow="Knowledge Base"
        sectionNumber="03"
        title="The blog also functions as a branded knowledge library"
        description="Vibe Jam frames its content as Knowledge instead of a disposable feed. That shift gives the site more authority and makes the same content work harder over time."
      >
        <div className="space-y-12">
          <ScreenshotGallery
            images={[
              {
                src: "/img/work/vibe-jam/knowledge-listing.png",
                alt: "Vibe Jam knowledge listing page",
                caption: "The knowledge hub presents the content as a searchable resource library instead of a chronological stream.",
              },
              {
                src: "/img/work/vibe-jam/knowledge-article.png",
                alt: "Vibe Jam knowledge article page",
                caption: "Individual articles feel like part tutorial, part publication, and part evergreen authority layer.",
              },
            ]}
            variant="grid"
            columns={2}
          />

          <div className="max-w-3xl space-y-5 text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            <p>
              This is a sharp positioning move. The content is still file-based MDX under the hood, but the user experience reframes it as an editorial library people can return to.
            </p>
            <p>
              That gives the site more depth. It is not just posting into the void. It is building a reusable body of teaching, examples, and practical explanations that compound over time.
            </p>
          </div>
        </div>
      </SubpageSection>

      <SubpageSection
        background="surface"
        eyebrow="Events & Community"
        sectionNumber="04"
        title="A simple public events layer backed by a real community rhythm"
        description="On the surface, the site keeps the offer clean. In the product itself, you can see the structure of an active community with recurring sessions, event logic, and a lightweight member layer."
      >
        <div className="space-y-12">
          <ScreenshotShowcase
            src="/img/work/vibe-jam/events.png"
            alt="Vibe Jam events page"
            variant="contained"
            caption="The events layer stays focused publicly, while the broader platform supports a richer recurring-session system behind the scenes."
          />

          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] items-start">
            <div className="space-y-5 text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              <p>
                Vibe Jam is not trying to be a chaotic social network. It is a curated community business with a clear conversion center, a member path, and structured ways for people to come back.
              </p>
              <p>
                The underlying system supports more than a single landing page. There is recurring event state, session history, email reminders, and a real record of how the community has been run over time.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["60+", "Sessions hosted"],
                ["4", "Creative disciplines"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[1.5rem] border p-6"
                  style={{
                    backgroundColor: "var(--bg)",
                    borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)",
                  }}
                >
                  <p className="mb-2 text-4xl font-light" style={{ fontFamily: "var(--font-heading)", color: "var(--accent)" }}>
                    {value}
                  </p>
                  <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--fg-muted)" }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SubpageSection>

      <SubpageSection
        background="default"
        eyebrow="Platform Features"
        sectionNumber="05"
        title="Behind the public brand is a serious operator stack"
        description="The site looks simple on purpose. The repo tells a bigger story: member auth, admin tooling, custom email flows, social distribution, and the systems needed to run the brand day to day."
      >
        <div className="space-y-12">
          <ScreenshotGallery
            images={[
              {
                src: "/img/work/vibe-jam/about.png",
                alt: "Vibe Jam about page",
                caption: "Brand pages keep the same authored visual identity while explaining the offer with clarity.",
              },
              {
                src: "/img/work/vibe-jam/how-it-works.png",
                alt: "Vibe Jam how it works page",
                caption: "The offer is packaged simply on the surface, while the product underneath handles much more.",
              },
            ]}
            variant="grid"
            columns={2}
          />

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-5 text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              <p>
                The membership layer is real. Vibe Jam uses magic-link auth, user profiles, and custom onboarding email flows rather than a fake login shell.
              </p>
              <p>
                The admin side is where the engineering weight shows up. There are tools for content operations, social publishing, email history, calendar planning, and connection management across channels.
              </p>
              <p>
                That combination is what makes this portfolio piece interesting. It is a brand site, a content engine, and an internal dashboard living in one product surface.
              </p>
            </div>

            <div
              className="rounded-[1.5rem] border p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)",
              }}
            >
              <p className="mb-4 text-xs uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
                Under The Hood
              </p>
              <ul className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                <li>Magic-link auth and member profile handling</li>
                <li>Admin dashboard for content, social, and email ops</li>
                <li>Connection management for publishing channels</li>
                <li>Custom email delivery and distribution workflows</li>
              </ul>
            </div>
          </div>
        </div>
      </SubpageSection>

      <SubpageSection
        background="surface"
        eyebrow="By the Numbers"
        sectionNumber="06"
        title="Real activity, not placeholder metrics"
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-3xl">
          <div>
            <p className="mb-2 text-4xl font-light md:text-5xl" style={{ fontFamily: "var(--font-heading)", color: "var(--accent)" }}>
              60+
            </p>
            <p className="text-sm uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>
              Sessions Hosted
            </p>
          </div>
          <div>
            <p className="mb-2 text-4xl font-light md:text-5xl" style={{ fontFamily: "var(--font-heading)", color: "var(--accent)" }}>
              4
            </p>
            <p className="text-sm uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>
              Creative Disciplines
            </p>
          </div>
        </div>
      </SubpageSection>

      <SubpageSection background="accent">
        <div className="space-y-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-[0.3em]" style={{ color: "var(--accent-fg)", opacity: 0.8 }}>
              Live Project
            </p>
            <h2 className="mb-6 text-4xl font-light md:text-5xl" style={{ fontFamily: "var(--font-heading)", color: "var(--accent-fg)" }}>
              Visit the live site and see how Vibe Jam blends editorial content, community entry points, and internal operator tooling into one coherent product.
            </h2>
            <Link
              href="https://thevibejam.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg font-medium"
              style={{ color: "var(--accent-fg)" }}
            >
              thevibejam.com <ExternalLink size={18} />
            </Link>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all duration-300 hover:gap-3"
              style={{ backgroundColor: "var(--accent-fg)", color: "var(--accent)" }}
            >
              <ArrowLeft size={16} /> All Projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all duration-300 hover:gap-3"
              style={{ backgroundColor: "var(--accent-fg)", color: "var(--accent)" }}
            >
              Book a Call <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </SubpageSection>

      <Footer />
    </div>
  )
}
