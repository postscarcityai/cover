"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { ScreenshotGallery } from "@/components/screenshot-gallery"
import { ScreenshotShowcase } from "@/components/screenshot-showcase"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

const stats = [
  ["7", "volumes published"],
  ["Same day", "turnaround from source doc to published issue"],
  ["Monthly", "cadence maintained across the publication run"],
] as const

export default function HeathosPulsePage() {
  return (
    <div className="min-h-screen">
      <SubpageHero
        title="Heathos Pulse"
        description="A monthly web publication that turns routine health insurance updates into a polished editorial product, with a repeatable pipeline that moves from Word doc to live issue the same day."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
          { label: "Heathos Pulse" },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          {stats.map(([value, label]) => (
            <div
              key={label}
              className="rounded-full border px-4 py-3 backdrop-blur-sm"
              style={{
                backgroundColor: "color-mix(in srgb, var(--surface) 72%, transparent)",
                borderColor: "color-mix(in srgb, var(--fg) 12%, transparent)",
              }}
            >
              <p className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                {value}
              </p>
              <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--fg-muted)" }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </SubpageHero>

      <SubpageSection
        background="default"
        eyebrow="Volume Showcase"
        sectionNumber="01"
        title="Seven volumes, one system that never feels canned"
        description="A horizontal issue gallery shows the real story: the structure stays steady, while the art direction, palette, and cover treatment shift from volume to volume."
      >
        <div className="space-y-10">
          <ScreenshotGallery
            variant="scroll"
            images={[
              {
                src: "/img/work/heathos-pulse/vol7-april.png",
                alt: "Heathos Pulse volume 7 April issue",
                caption: "Volume 7 carries the publication forward with a spring palette, refined layout, and the same clean reading flow.",
              },
              {
                src: "/img/work/heathos-pulse/vol6-march.png",
                alt: "Heathos Pulse volume 6 March issue",
                caption: "Volume 6 proves the framework can repeat month after month without flattening into a template.",
              },
              {
                src: "/img/work/heathos-pulse/vol-older.png",
                alt: "Earlier Heathos Pulse issues",
                caption: "Older issues make the cadence visible. This was designed as an ongoing publication system, not a one-time launch piece.",
              },
            ]}
          />

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5 text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              <p>
                Heathos Pulse is a web-first monthly newsletter for the health insurance ecosystem. Each issue brings together executive messaging,
                agent updates, market changes, event highlights, and practical resources inside a reading experience that feels closer to a lightweight magazine than a PDF archive.
              </p>
              <p>
                That matters because recurring business content usually gets treated like overhead. Here, it became a product: something structured,
                branded, readable, and worth revisiting every month.
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
                What This Shows
              </p>
              <ul className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                <li>Web-first editorial presentation</li>
                <li>Repeatable monthly issue framework</li>
                <li>Thematic variation without redesigning from scratch</li>
                <li>Information design for dense partner updates</li>
              </ul>
            </div>
          </div>
        </div>
      </SubpageSection>

      <SubpageSection
        background="surface"
        eyebrow="Design System"
        sectionNumber="02"
        title="Each issue gets its own color identity"
        description="The framework stays recognizable, but every volume can shift its palette, mood, and header treatment so the publication feels alive instead of locked into one rigid shell."
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <ScreenshotShowcase
            src="/img/work/heathos-pulse/issue-header-closeup.jpg"
            alt="Close-up of the Heathos Pulse issue header design"
            variant="contained"
            caption="The issue header carries volume, timing, branding, and color direction in a single system that can flex month to month."
          />

          <div className="space-y-5 text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            <p>
              The strongest visual move in Heathos Pulse is the per-issue theming. April does not borrow March&apos;s color language, and older volumes do not look trapped in the same wrapper.
              Every release gets its own color identity, which gives the publication freshness without throwing away familiarity.
            </p>
            <p>
              Underneath that variation is a stable design system: cover-style hero, modular sections, navigable issue structure, and strong mobile reading support.
              Readers get consistency. The brand gets room to change tone and visual emphasis from one issue to the next.
            </p>
          </div>
        </div>
      </SubpageSection>

      <SubpageSection
        background="default"
        eyebrow="The Pipeline"
        sectionNumber="03"
        title="Word doc in, published issue out"
        description="The production workflow is the real engine here: source content comes in as a document, gets mapped into the issue system, and ships the same day with zero friction for the client team."
      >
        <div className="grid gap-8 lg:grid-cols-2 text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
          <div className="space-y-5">
            <p>
              The monthly workflow starts outside the app. Editorial source content lands as a Word document, then gets translated into a structured issue with themed visuals,
              clear section hierarchy, navigation, resource links, and any companion pages needed for that month.
            </p>
            <p>
              That makes Heathos Pulse more than a polished interface. It is a repeatable publishing system, built so the team can go from Word doc to live issue in the same day without back-and-forth or formatting churn.
            </p>
          </div>

          <div
            className="rounded-[1.5rem] border p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)",
            }}
          >
            <p className="mb-4 text-xs uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
              Workflow
            </p>
            <ol className="list-decimal space-y-3 pl-4 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              <li>Monthly content arrives as a Word doc</li>
              <li>The issue structure gets populated section by section</li>
              <li>That month&apos;s theme colors and cover treatment are applied</li>
              <li>The full issue is published the same day</li>
            </ol>
          </div>
        </div>
      </SubpageSection>

      <SubpageSection
        background="surface"
        eyebrow="Home Page"
        sectionNumber="04"
        title="The archive has a front door"
        description="The homepage frames Heathos Pulse as a living publication, not a pile of attachments, making the whole system easier to browse and easier to trust."
      >
        <div className="space-y-10">
          <ScreenshotShowcase
            src="/img/work/heathos-pulse/home-full.png"
            alt="Heathos Pulse home page"
            variant="browser-frame"
            priority
            caption="The homepage turns the issue archive into a proper publication surface, with continuity across all seven volumes."
          />

          <div className="max-w-3xl text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            <p>
              That top-level experience does real work. Instead of forcing readers to hunt through email chains or download static PDFs, the site gives the newsletter a recognizable home,
              a stronger sense of continuity, and a better path back into past issues.
            </p>
          </div>
        </div>
      </SubpageSection>

      <SubpageSection
        background="default"
        eyebrow="Stats"
        sectionNumber="05"
        title="A monthly system built to keep shipping"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map(([value, label]) => (
            <div
              key={label}
              className="rounded-[1.5rem] border p-6 shadow-[0_16px_40px_rgba(0,0,0,0.05)]"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)",
              }}
            >
              <p className="mb-2 text-4xl font-light md:text-5xl" style={{ fontFamily: "var(--font-heading)", color: "var(--accent)" }}>
                {value}
              </p>
              <p className="text-sm uppercase tracking-[0.2em]" style={{ color: "var(--fg-muted)" }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </SubpageSection>

      <SubpageSection background="accent">
        <div className="space-y-8">
          <div className="max-w-3xl">
            <p
              className="mb-4 text-xs uppercase tracking-[0.3em]"
              style={{ color: "var(--accent-fg)", opacity: 0.8 }}
            >
              Editorial Systems
            </p>
            <h2
              className="mb-6 text-4xl font-light md:text-5xl"
              style={{ fontFamily: "var(--font-heading)", color: "var(--accent-fg)" }}
            >
              If your recurring content deserves more than a PDF dump, let&apos;s build the system behind it.
            </h2>
          </div>

          <div className="flex items-start gap-4 sm:flex-row flex-col">
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
