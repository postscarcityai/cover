"use client"

import React from "react"
import dynamic from "next/dynamic"
import { type HomepageSection } from "@/app/data"
import { HeroSection } from "@/components/sections/hero-section"
import { HeroGoldSeamOverlay } from "@/components/hero-gold-seam-overlay"
import { FeaturesSection } from "@/components/sections/features-section"
import { StatsSection } from "@/components/sections/stats-section"
import { ContentSection } from "@/components/sections/content-section"
import type {
  HeroContent,
  FeaturesContent,
  StatsContent,
  ContentSectionContent,
  TestimonialsContent,
  CTAContent,
  FAQContent,
} from "@/app/data"

const TestimonialsSection = dynamic(
  () =>
    import("@/components/sections/testimonials-section").then((mod) => ({
      default: mod.TestimonialsSection,
    })),
  {
    ssr: true,
    loading: () => (
      <div
        className="h-96 animate-pulse rounded-lg"
        style={{ backgroundColor: "var(--surface)" }}
        aria-hidden
      />
    ),
  }
)

const CTASection = dynamic(
  () =>
    import("@/components/sections/cta-section").then((mod) => ({
      default: mod.CTASection,
    })),
  {
    ssr: true,
    loading: () => (
      <div
        className="h-64 animate-pulse rounded-lg"
        style={{ backgroundColor: "var(--muted)" }}
        aria-hidden
      />
    ),
  }
)

const FAQSection = dynamic(
  () =>
    import("@/components/sections/faq-section").then((mod) => ({
      default: mod.FAQSection,
    })),
  {
    ssr: true,
    loading: () => (
      <div
        className="h-80 animate-pulse rounded-lg"
        style={{ backgroundColor: "var(--surface)" }}
        aria-hidden
      />
    ),
  }
)

interface SectionRendererProps {
  sections: HomepageSection[]
}

function getSectionNumber(sections: HomepageSection[], idx: number): string | undefined {
  let count = 0
  for (let i = 0; i <= idx; i++) {
    if (sections[i].numbered) count++
  }
  return sections[idx].numbered ? String(count).padStart(2, "0") : undefined
}

export function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <>
      {sections.map((section, index) => {
        const num = getSectionNumber(sections, index)

        const seamGoldFromHero =
          index > 0 && sections[index - 1]?.type === "hero"

        switch (section.type) {
          case "hero":
            return <HeroSection key={section.id} content={section.content as HeroContent} />
          case "features":
            return (
              <React.Fragment key={section.id}>
                {seamGoldFromHero && <HeroGoldSeamOverlay />}
                <FeaturesSection
                  content={section.content as FeaturesContent}
                  sectionNumber={num}
                />
              </React.Fragment>
            )
          case "stats":
            return <StatsSection key={section.id} content={section.content as StatsContent} />
          case "content":
            return (
              <React.Fragment key={section.id}>
                {seamGoldFromHero && <HeroGoldSeamOverlay />}
                <ContentSection
                  content={section.content as ContentSectionContent}
                />
              </React.Fragment>
            )
          case "testimonials":
            return <TestimonialsSection key={section.id} content={section.content as TestimonialsContent} sectionNumber={num} />
          case "cta":
            return <CTASection key={section.id} content={section.content as CTAContent} />
          case "faq":
            return <FAQSection key={section.id} content={section.content as FAQContent} sectionNumber={num} />
          default:
            return null
        }
      })}
    </>
  )
}
