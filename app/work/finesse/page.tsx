"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import { Footer } from "@/components/footer"
import { ScreenshotGallery } from "@/components/screenshot-gallery"
import { ScreenshotShowcase } from "@/components/screenshot-showcase"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

export default function FinessePage() {
  return (
    <div className="min-h-screen">
      <SubpageHero
        title="Finesse Plastic Surgery"
        description="A plastic surgery site built to feel cinematic on the surface and rigorous underneath: motion-led storytelling, guided intake, and real compliance depth for a medical practice."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
          { label: "Finesse" },
        ]}
      >
        <Link
          href="https://finesseplasticsurgery.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300 hover:gap-3"
          style={{
            borderColor: "color-mix(in srgb, var(--fg) 12%, transparent)",
            color: "var(--fg)",
            backgroundColor: "color-mix(in srgb, var(--bg) 72%, transparent)",
          }}
        >
          Visit finesseplasticsurgery.com <ExternalLink size={16} />
        </Link>
      </SubpageHero>

      <SubpageSection
        background="default"
        eyebrow="Home Page Showcase"
        sectionNumber="01"
        title="Motion sells the experience before the copy does"
        description="The homepage is the best place to start because the strongest thing here is not a static layout. It is the animation system running through the hero, transitions, and scroll behavior."
      >
        <div className="space-y-10">
          <ScreenshotShowcase
            src="/img/work/finesse/home-full.png"
            alt="Finesse Plastic Surgery homepage"
            variant="browser-frame"
            priority
            caption="A homepage designed to feel calm, premium, and alive, even though a screenshot can only catch one frozen moment."
          />

          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-5 text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              <p>
                Screenshots flatten the best part of this build. On the live site, the homepage opens with a full-viewport video treatment,
                oversized typography, and scroll-linked motion that shifts scale, opacity, and blur as the page settles into the rest of the experience.
              </p>
              <p>
                There is also a film-inspired slider system with Ken Burns motion, grain, vignette, scan lines, and a subtle flicker treatment.
                That kind of thing can feel cheesy fast. Here it feels restrained. The animation gives the brand atmosphere and pace without turning the page into a gimmick.
              </p>
              <p>
                That is the real trick of the site: it feels editorial and luxurious up front, then hands patients clear procedure paths and consultation options underneath.
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
                Motion System
              </p>
              <ul className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                <li>Full-viewport video hero on desktop and mobile</li>
                <li>Scroll-linked scale, opacity, and blur</li>
                <li>Film-slider treatment with grain and vignette</li>
                <li>Reduced-motion handling and mobile fallbacks</li>
              </ul>
            </div>
          </div>
        </div>
      </SubpageSection>

      <SubpageSection
        background="surface"
        eyebrow="Procedure Pages"
        sectionNumber="02"
        title="A broad procedure library with one clear next step"
        description="The service architecture does real work here. Patients can browse a deep set of procedures without losing the thread back to consultation."
      >
        <div className="space-y-10">
          <ScreenshotGallery
            images={[
              {
                src: "/img/work/finesse/procedures-listing.jpg",
                alt: "Finesse procedures listing page",
                caption: "The procedure index keeps a large service footprint readable, premium, and easy to scan.",
              },
              {
                src: "/img/work/finesse/procedure-detail.jpg",
                alt: "Finesse procedure detail page",
                caption: "Detail pages educate, reassure, and route patients toward the planner instead of dumping them into a generic contact form.",
              },
            ]}
            variant="grid"
            columns={2}
          />

          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["15", "Procedure page directories"],
              ["1", "Guided treatment planner"],
              ["42", "Supporting blog files"],
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
                <p className="text-sm uppercase tracking-[0.2em]" style={{ color: "var(--fg-muted)" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SubpageSection>

      <SubpageSection
        background="default"
        eyebrow="Treatment Planner"
        sectionNumber="03"
        title="The feature that turns a brochure site into a product"
        description="The treatment planner is the strongest product story in the project: custom interaction, saved state, attribution capture, and a much better intake experience."
      >
        <div className="space-y-10">
          <ScreenshotShowcase
            src="/img/work/finesse/treatment-planner.jpg"
            alt="Finesse treatment planner"
            variant="contained"
            caption="A guided planner that helps patients map body areas, choose treatments, upload photos, and move into consultation with context attached."
          />

          <div className="grid gap-8 text-lg leading-relaxed lg:grid-cols-2" style={{ color: "var(--fg-muted)" }}>
            <div className="space-y-5">
              <p>
                This is not a dressed-up contact form. Patients move through a multi-step flow, interact with a body diagram,
                narrow treatments by body area, upload media, and save progress into the backend before they ever reach the finish line.
              </p>
              <p>
                The planner also captures the context that usually gets lost: session ID, landing page, referrer, UTM data, page views,
                time on site, and completion timing. That makes it useful for the practice and strong in a case study because the visual brand experience ties directly to lead quality.
              </p>
            </div>

            <div
              className="rounded-[1.5rem] border p-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)",
              }}
            >
              <p className="mb-4 text-xs uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
                Planner Features
              </p>
              <ul className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                <li>Multi-step guided intake flow</li>
                <li>Interactive body-area selection</li>
                <li>Treatment matching by anatomy</li>
                <li>Media upload and progress saves</li>
                <li>Thank-you routing on completion</li>
                <li>Attribution captured on first save</li>
              </ul>
            </div>
          </div>
        </div>
      </SubpageSection>

      <SubpageSection
        background="surface"
        eyebrow="HIPAA & Compliance"
        sectionNumber="04"
        title="Compliance depth is part of the feature set"
        description="A lot of healthcare sites look polished. Fewer are built with real privacy, consent, and records discipline inside the product itself."
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5 text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            <p>
              Finesse includes the legal and structural work most agencies skip in the pitch deck. The repo contains HIPAA-oriented privacy language,
              a Notice of Privacy Practices, explicit 42 CFR Part 2 references for protected records, TCPA consent handling, and database migrations shaped around audit-minded consent capture.
            </p>
            <p>
              Supabase Row Level Security is enabled on patient-related tables. That matters because the treatment planner and intake flow are not side demos.
              They sit inside a medical-practice context with actual patient data, real risk, and a need for disciplined architecture.
            </p>
          </div>

          <div
            className="rounded-[1.5rem] border p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
            style={{
              backgroundColor: "var(--bg)",
              borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)",
            }}
          >
            <p className="mb-4 text-xs uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
              Compliance Receipts
            </p>
            <ul className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              <li>42 CFR Part 2 language for protected records</li>
              <li>HIPAA-oriented privacy and notice pages</li>
              <li>TCPA consent fields and migrations</li>
              <li>Audit-minded consent schema design</li>
              <li>Supabase Row Level Security on patient tables</li>
            </ul>
          </div>
        </div>
      </SubpageSection>

      <SubpageSection
        background="default"
        eyebrow="Quality"
        sectionNumber="05"
        title="Luxury visuals, backed by testable quality"
        description="The front end is polished, but the repo story is just as much about accessibility, QA, and careful release discipline."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "98% accessibility status",
              body: "The accessibility audit lands at a conservative 98% compliant, with 10 of 10 axe-core pages passing clean and 8 of 8 Lighthouse checks showing zero violations.",
            },
            {
              title: "Vitest in the build",
              body: "Vitest runs as a prebuild gate, which is exactly what you want on a site with motion systems, custom intake logic, and medical-practice constraints.",
            },
            {
              title: "100% Lighthouse passes",
              body: "Lighthouse CI is part of the evidence trail here, not a one-time brag. The automated accessibility checks are documented and repeatable.",
            },
            {
              title: "Zero regression posture",
              body: "Gallery verification fixed 14 data discrepancies before launch, and the release story is full of validation work instead of hand-waving after the fact.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[1.5rem] border p-6 shadow-[0_16px_40px_rgba(0,0,0,0.05)]"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)",
              }}
            >
              <h3 className="mb-3 text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}>
                {item.title}
              </h3>
              <p className="leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </SubpageSection>

      <SubpageSection
        background="surface"
        eyebrow="Site Tour"
        sectionNumber="06"
        title="The supporting pages hold the same standard"
        description="The rest of the site keeps the visual system intact while carrying trust, education, and conversion through the whole experience."
      >
        <ScreenshotGallery
          images={[
            {
              src: "/img/work/finesse/dr-west.jpg",
              alt: "Finesse doctor profile page",
              caption: "The surgeon page feels personal and premium without dropping authority.",
            },
            {
              src: "/img/work/finesse/reviews.jpg",
              alt: "Finesse reviews page",
              caption: "Social proof is presented cleanly, with the same calm visual restraint as the rest of the site.",
            },
            {
              src: "/img/work/finesse/patient-resources.jpg",
              alt: "Finesse patient resources page",
              caption: "Patient support content is treated like part of the product, not buried admin copy.",
            },
            {
              src: "/img/work/finesse/contact.jpg",
              alt: "Finesse contact page",
              caption: "Even the consultation path keeps the brand language and structure intact.",
            },
          ]}
          variant="grid"
          columns={2}
        />
      </SubpageSection>

      <SubpageSection
        background="default"
        eyebrow="Client Signal"
        sectionNumber="07"
        title="The response was immediate"
      >
        <blockquote className="max-w-3xl border-l-4 py-4 pl-6" style={{ borderColor: "var(--accent)" }}>
          <p className="mb-3 text-2xl italic" style={{ color: "var(--fg)" }}>
            &ldquo;We have seen a sharp growth in consultations since we launched.&rdquo;
          </p>
          <cite className="text-sm not-italic" style={{ color: "var(--fg-muted)" }}>
            Dr. Justin West
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
              Visit the live site, then imagine your own category feeling this polished and this deliberate.
            </h2>
            <Link
              href="https://finesseplasticsurgery.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg font-medium"
              style={{ color: "var(--accent-fg)" }}
            >
              finesseplasticsurgery.com <ExternalLink size={18} />
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
