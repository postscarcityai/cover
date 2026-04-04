"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import { Footer } from "@/components/footer"
import { ScreenshotGallery } from "@/components/screenshot-gallery"
import { ScreenshotShowcase } from "@/components/screenshot-showcase"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

export default function AMCDefenseLawPage() {
  return (
    <div className="min-h-screen">
      <SubpageHero
        title="AMC Defense Law"
        description="A criminal-defense site rebuilt as a search-driven authority engine: federal noir art direction, attorney-led voice, a dominant Justice Watch publication, and a content system built to stay current."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
          { label: "AMC Defense Law" },
        ]}
      >
        <div className="flex flex-wrap gap-4">
          <Link
            href="https://amcdefenselaw.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all duration-300 hover:gap-3"
            style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
          >
            Visit Live Site <ExternalLink size={16} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border px-6 py-3 font-semibold transition-all duration-300 hover:gap-3"
            style={{
              borderColor: "color-mix(in srgb, var(--fg) 14%, transparent)",
              color: "var(--fg)",
              backgroundColor: "color-mix(in srgb, var(--surface) 88%, transparent)",
            }}
          >
            Build Something Like This <ArrowRight size={16} />
          </Link>
        </div>
      </SubpageHero>

      <SubpageSection
        background="default"
        eyebrow="Site Showcase"
        sectionNumber="01"
        title="Federal noir, carried through the whole system"
        description="AMC Defense Law does not look like a recycled legal template. It feels cinematic, specific, and built around one attorney's point of view."
      >
        <div className="space-y-10">
          <ScreenshotShowcase
            src="/img/work/amc-defense-law/home-full.png"
            alt="AMC Defense Law homepage"
            variant="browser-frame"
            priority
            caption="The homepage sets the tone fast: deep navy, serif headlines, warm gold actions, and a visual atmosphere closer to a legal thriller than a law-firm brochure."
          />

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5 text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              <p>
                The design system leans into a federal noir aesthetic. Regal navy anchors the interface, gold CTAs pull attention without breaking tone,
                and the typography mix gives the whole site weight. It feels premium, cinematic, and still readable.
              </p>
              <p>
                That visual restraint matters because the site carries a lot of content: practice pages, case results, consultation flows, and editorial posts.
                The design keeps all of it coherent while making the firm look sharper, more established, and more memorable than the usual criminal-defense build.
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
                Design Markers
              </p>
              <ul className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                <li>Federal noir visual identity</li>
                <li>Playfair Display + Montserrat typography system</li>
                <li>Custom AI-assisted imagery with cinematic mood</li>
                <li>Conversion paths that still respect the brand tone</li>
              </ul>
            </div>
          </div>
        </div>
      </SubpageSection>

      <SubpageSection
        background="surface"
        eyebrow="Justice Watch"
        sectionNumber="02"
        title="Justice Watch is the star of the whole build"
        description="This is the feature that turns AMC from a firm site into a real publishing platform."
      >
        <div className="space-y-12">
          <div
            className="rounded-[2rem] border p-6 md:p-8 lg:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.10)]"
            style={{
              background:
                "linear-gradient(145deg, color-mix(in srgb, var(--surface) 88%, black 12%) 0%, color-mix(in srgb, var(--surface) 92%, var(--accent) 8%) 100%)",
              borderColor: "color-mix(in srgb, var(--fg) 12%, transparent)",
            }}
          >
            <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
                  Editorial Engine
                </p>
                <h3
                  className="text-3xl font-light md:text-5xl"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
                >
                  Long-form legal analysis, cinematic visuals, and built-in narration.
                </h3>
                <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                  Justice Watch is a custom publication inside the site. It gives AMC a place to publish timely legal commentary,
                  connect practice areas to current events, and build search authority with content that feels editorial instead of generic.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:min-w-[420px]">
                {[
                  ["25+", "Published posts"],
                  ["AI", "Cinematic imagery"],
                  ["11Labs", "Audio narration"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-[1.5rem] border p-5"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--bg) 80%, transparent)",
                      borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)",
                    }}
                  >
                    <p className="mb-2 text-3xl font-light" style={{ fontFamily: "var(--font-heading)", color: "var(--accent)" }}>
                      {value}
                    </p>
                    <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--fg-muted)" }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <ScreenshotGallery
              images={[
                {
                  src: "/img/work/amc-defense-law/justice-watch-listing.png",
                  alt: "AMC Defense Law Justice Watch listing page",
                  caption: "The listing page presents the publication like a dedicated editorial property, not a tacked-on blog.",
                },
                {
                  src: "/img/work/amc-defense-law/justice-watch-post.png",
                  alt: "AMC Defense Law Justice Watch article page",
                  caption: "Each article layers analysis, custom components, related legal context, and a polished reading experience.",
                },
              ]}
              variant="grid"
              columns={2}
            />

            <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <ScreenshotShowcase
                src="/img/work/amc-defense-law/audio-player-closeup.png"
                alt="AMC Defense Law Justice Watch audio player"
                variant="contained"
                caption="The audio layer makes long-form legal content easier to consume. Readers can listen through multi-part narration instead of treating each post like a wall of text."
              />

              <div className="space-y-5 text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                <div
                  className="inline-flex items-center rounded-full px-4 py-2 text-xs uppercase tracking-[0.25em]"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--accent) 14%, transparent)",
                    color: "var(--accent)",
                  }}
                >
                  Audio narration callout
                </div>
                <p>
                  The narration feature is the part most law-firm sites do not have. Justice Watch posts are designed to work as readable articles,
                  but also as spoken briefings. That gives the content a second format without creating a second production pipeline.
                </p>
                <p>
                  Combined with AI-generated cinematic imagery, the whole section feels more like an owned media brand than a standard legal blog.
                  It is the clearest proof that AMC was built as a living authority platform, not just a brochure with a few posts attached.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SubpageSection>

      <SubpageSection
        background="default"
        eyebrow="Morning Intelligence Report"
        sectionNumber="03"
        title="A 5x/week briefing rhythm built around staying current"
        description="The site supports more than static marketing pages. It supports an ongoing DOJ and FBI briefing cadence around federal enforcement."
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5 text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            <p>
              AMC's Morning Intelligence Report frames the firm as actively plugged into the federal landscape. The reporting rhythm centers on DOJ and FBI developments,
              new enforcement actions, and timely analysis delivered five times a week.
            </p>
            <p>
              That matters because it gives the site a steady flow of current material to work with. The portfolio story is not just that content exists.
              It is that the whole platform was shaped to support recurring briefings, fast commentary, and a stronger search presence over time.
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
              What the cadence does
            </p>
            <ul className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              <li>Turns current enforcement news into repeatable firm visibility</li>
              <li>Keeps legal commentary tied to real developments, not evergreen filler</li>
              <li>Supports a 5x/week publishing and briefing rhythm</li>
              <li>Reinforces AMC as an active voice in federal criminal defense</li>
            </ul>
          </div>
        </div>
      </SubpageSection>

      <SubpageSection
        background="surface"
        eyebrow="Site Tour"
        sectionNumber="04"
        title="The rest of the platform stays just as sharp"
        description="Practice area pages, firm credibility, and consultation flow all hold the same visual confidence and editorial discipline."
      >
        <ScreenshotGallery
          images={[
            {
              src: "/img/work/amc-defense-law/practice-areas.png",
              alt: "AMC Defense Law practice areas listing page",
              caption: "The practice area index organizes a broad defense footprint without turning into a cluttered directory.",
            },
            {
              src: "/img/work/amc-defense-law/practice-area-detail.jpg",
              alt: "AMC Defense Law practice area detail page",
              caption: "Service pages combine legal substance, authority signals, FAQs, and internal links to related analysis.",
            },
            {
              src: "/img/work/amc-defense-law/our-firm.jpg",
              alt: "AMC Defense Law our firm page",
              caption: "Firm pages build trust without dropping the editorial tone that makes the brand feel distinct.",
            },
            {
              src: "/img/work/amc-defense-law/free-consultation.jpg",
              alt: "AMC Defense Law free consultation page",
              caption: "The consultation flow is structured like a real intake system, guiding visitors instead of dumping them into a bare form.",
            },
          ]}
          variant="grid"
          columns={2}
        />
      </SubpageSection>

      <SubpageSection
        background="default"
        eyebrow="By the Numbers"
        sectionNumber="05"
        title="The system translated into measurable traction"
      >
        <div className="mb-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <p
              className="mb-2 text-4xl font-light md:text-5xl"
              style={{ fontFamily: "var(--font-heading)", color: "var(--accent)" }}
            >
              25+
            </p>
            <p className="text-sm uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>
              Blog Posts Published
            </p>
          </div>
          <div>
            <p
              className="mb-2 text-4xl font-light md:text-5xl"
              style={{ fontFamily: "var(--font-heading)", color: "var(--accent)" }}
            >
              +16%
            </p>
            <p className="text-sm uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>
              GSC Click Increase
            </p>
          </div>
          <div>
            <p
              className="mb-2 text-4xl font-light md:text-5xl"
              style={{ fontFamily: "var(--font-heading)", color: "var(--accent)" }}
            >
              5x/wk
            </p>
            <p className="text-sm uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>
              Morning Intel Delivered
            </p>
          </div>
        </div>
      </SubpageSection>

      <SubpageSection
        background="surface"
        eyebrow="Client Signal"
        sectionNumber="06"
        title="The reaction was simple"
      >
        <blockquote
          className="max-w-2xl border-l-4 py-4 pl-6"
          style={{ borderColor: "var(--accent)" }}
        >
          <p className="mb-3 text-xl italic" style={{ color: "var(--fg)" }}>
            &ldquo;People rave about the site, no one doesn&rsquo;t like it!&rdquo;
          </p>
          <cite className="text-sm not-italic" style={{ color: "var(--fg-muted)" }}>
            Aaron, Attorney
          </cite>
        </blockquote>
      </SubpageSection>

      <SubpageSection background="accent">
        <div className="space-y-8">
          <div className="max-w-3xl">
            <p
              className="mb-4 text-xs uppercase tracking-[0.3em]"
              style={{ color: "var(--accent-fg)", opacity: 0.8 }}
            >
              Live Project
            </p>
            <h2
              className="mb-6 text-4xl font-light md:text-5xl"
              style={{ fontFamily: "var(--font-heading)", color: "var(--accent-fg)" }}
            >
              Visit the live site, then picture your own category with this much point of view.
            </h2>
            <Link
              href="https://amcdefenselaw.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg font-medium"
              style={{ color: "var(--accent-fg)" }}
            >
              amcdefenselaw.com <ExternalLink size={18} />
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
