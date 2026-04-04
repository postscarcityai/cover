"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"
import { GoldEffectCanvas } from "@/components/gold-effect-canvas"
import { ProjectHeroCard } from "@/components/project-hero-card"

const projects = [
  {
    slug: "amc-defense-law",
    title: "AMC Defense Law",
    description:
      "Full marketing site, AI-powered legal blog with audio narration, and a morning intelligence report for a board-certified criminal defense attorney.",
    tag: "Legal / AI Content",
    heroImage: "/img/work/amc-defense-law/home-full.png",
    url: "https://amcdefenselaw.com",
  },
  {
    slug: "finesse",
    title: "Finesse Plastic Surgery",
    description:
      "Elegant practice website for a board-certified plastic surgeon. HIPAA-aware infrastructure, full accessibility pass, zero regressions shipped.",
    tag: "Healthcare / Web",
    heroImage: "/img/work/finesse/home-full.png",
    url: "https://finesseplasticsurgery.com",
  },
  {
    slug: "vibe-jam",
    title: "Vibe Jam",
    description:
      "Weekly AI creative workshops, image generation, music, video, and vibe coding. 60+ sessions and the community where PostScarcity AI crystallized.",
    tag: "Community / AI",
    heroImage: "/img/work/vibe-jam/home-full.png",
    url: "https://thevibejam.com",
  },
  {
    slug: "heathos-pulse",
    title: "Heathos Pulse",
    description:
      "Monthly healthcare newsletter. Word doc in, published site out, same day. Seven volumes and counting.",
    tag: "Newsletter",
    heroImage: "/img/work/heathos-pulse/home-full.png",
  },
]

export default function WorkPage() {
  return (
    <div className="min-h-screen">
      <SubpageHero
        title="Our Work"
        description="Big visuals, tight execution, and projects built to look sharp on first contact and hold up under the hood."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Work" },
        ]}
        background="white"
        backgroundSlot={<GoldEffectCanvas effect="prismFacets" className="pointer-events-none" />}
      />

      <section className="px-4 pb-20 pt-8 md:px-8 md:pb-28 md:pt-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-16 md:gap-24">
          {projects.map((project) => (
            <ProjectHeroCard key={project.slug} {...project} />
          ))}
        </div>
      </section>

      <SubpageSection
        background="accent"
        title="Something on your mind?"
        description="We're here when you're ready."
      >
        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:gap-3"
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
