"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

const featuredProjects = [
  {
    slug: "amc-defense-law",
    title: "AMC Defense Law",
    description:
      "Full marketing site, AI-powered legal blog with audio narration, and a morning intelligence report for a board-certified criminal defense attorney.",
    tag: "Legal / AI Content",
  },
  {
    slug: "finesse",
    title: "Finesse Plastic Surgery",
    description:
      "Elegant practice website for a board-certified plastic surgeon. HIPAA-aware infrastructure, full accessibility pass, zero regressions shipped.",
    tag: "Healthcare / Web",
  },
  {
    slug: "heathos-moon",
    title: "Heathos Moon",
    description:
      "National lead intelligence engine powered by local AI. 1,800+ leads enriched with zero cloud API cost. Runs on a Mac Mini.",
    tag: "AI Agents / Data",
  },
]

const supportingProjects = [
  {
    slug: "qualis",
    title: "Qualis",
    description:
      "Unified intelligence portal for a defense technology company. Three acquisitions, one dashboard. Details under NDA.",
    tag: "Defense Tech",
  },
  {
    slug: "heathos-pulse",
    title: "Heathos Pulse",
    description:
      "Monthly healthcare newsletter. Word doc in, published site out, same day. Seven volumes and counting.",
    tag: "Newsletter",
  },
  {
    slug: "vibe-jam",
    title: "Vibe Jam",
    description:
      "Weekly AI creative workshops — image gen, music, video, vibe coding. 60+ sessions. The community where PostScarcity AI crystallized.",
    tag: "Community / AI",
  },
]

function ProjectCard({
  slug,
  title,
  description,
  tag,
  featured = false,
}: {
  slug: string
  title: string
  description: string
  tag: string
  featured?: boolean
}) {
  return (
    <Link href={`/work/${slug}`} className="group block">
      <div
        className={`relative rounded-2xl border transition-all duration-300 group-hover:border-[var(--accent)] ${
          featured ? "p-8 md:p-10" : "p-6 md:p-8"
        }`}
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)",
        }}
      >
        <p
          className="text-xs tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--accent)" }}
        >
          {tag}
        </p>
        <h3
          className={`font-bold mb-3 ${featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}
          style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
        >
          {title}
        </h3>
        <p
          className="leading-relaxed mb-6"
          style={{ color: "var(--fg-muted)" }}
        >
          {description}
        </p>
        <span
          className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-3"
          style={{ color: "var(--accent)" }}
        >
          View Case Study <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  )
}

export default function WorkPage() {
  return (
    <div className="min-h-screen">
      

      <SubpageHero
        title="Our Work"
        description="Selected work. Every engagement is a partnership — here is what we have built together."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Work" },
        ]}
      />

      <SubpageSection
        background="default"
        eyebrow="Featured"
        sectionNumber="01"
        title="Featured Projects"
        description="Deep engagements where we built the full stack — sites, agents, content pipelines, and infrastructure."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} {...project} featured />
          ))}
        </div>
      </SubpageSection>

      <SubpageSection
        background="surface"
        eyebrow="More Work"
        sectionNumber="02"
        title="Supporting Projects"
        description="Focused builds, ongoing partnerships, and the community that started it all."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportingProjects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </SubpageSection>

      <SubpageSection
        background="accent"
        title="Something on your mind?"
        description="We're here when you're ready."
      >
        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:gap-3"
            style={{
              backgroundColor: "var(--accent-fg)",
              color: "var(--accent)",
            }}
          >
            Book a Call <ArrowRight size={20} />
          </Link>
        </div>
      </SubpageSection>

      <Footer />
    </div>
  )
}
