"use client"

import Link from "next/link"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

export default function VibeJamPage() {
  return (
    <div className="min-h-screen">
      

      <SubpageHero
        eyebrow="Case Study"
        title="Vibe Jam"
        description="Weekly AI creative workshops. Images, music, video, vibe coding. Where PostScarcity AI crystallized as a company."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
          { label: "Vibe Jam" },
        ]}
      />

      <SubpageSection
        background="default"
        eyebrow="The Story"
        sectionNumber="01"
        title="What We Built"
      >
        <div className="max-w-3xl">
          <p
            className="text-lg leading-relaxed mb-6"
            style={{ color: "var(--fg-muted)" }}
          >
            Vibe Jam started as weekly AI creative workshops — hands-on sessions
            covering image generation, AI music, video production, and vibe
            coding. 60+ sessions later, it became something bigger than a class.
          </p>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            A community that went from &ldquo;I have heard of Midjourney&rdquo;
            to shipping real creative work. People who had never touched a
            generative tool were producing images, composing music, editing
            video, and writing code — all within weeks.
          </p>
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
            Most AI workshops are demos. Vibe Jam is a production floor.
            Participants do not watch someone else use the tools — they build
            things in real time, get feedback, iterate, and ship.
          </p>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            This is where PostScarcity AI as a company came into focus. The
            workshops proved the thesis: AI creative tools are not toys. Given
            the right environment and guidance, anyone can produce professional-grade
            work.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <p
              className="text-4xl md:text-5xl font-light mb-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--accent)" }}
            >
              60+
            </p>
            <p className="text-sm uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>
              Sessions Held
            </p>
          </div>
          <div>
            <p
              className="text-4xl md:text-5xl font-light mb-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--accent)" }}
            >
              4
            </p>
            <p className="text-sm uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>
              Creative Disciplines
            </p>
          </div>
        </div>
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
