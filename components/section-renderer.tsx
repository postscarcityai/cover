"use client"

import dynamic from "next/dynamic"
import { Fragment } from "react"
import { type HomepageSection } from "@/app/data"
import { Hero2ColSection } from "@/components/sections/hero-2col-section"
import { CardGridSection } from "@/components/sections/card-grid-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { StatsSection } from "@/components/sections/stats-section"
import { ContentSection } from "@/components/sections/content-section"
import { PullQuoteSection } from "@/components/sections/pull-quote-section"
import { StatementSection } from "@/components/sections/statement-section"
import { SectionBackdrop } from "@/components/section-backdrop"
import type {
  HeroContent,
  CardGridContent,
  FeaturesContent,
  StatsContent,
  ContentSectionContent,
  TestimonialsContent,
  CTAContent,
  FAQContent,
  CarouselContent,
  PullQuoteContent,
  StatementContent,
  NumberedStepsContent,
  FitCheckContent,
  SourcesContent,
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

const CarouselSection = dynamic(
  () =>
    import("@/components/sections/carousel-section").then((mod) => ({
      default: mod.CarouselSection,
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

const NumberedStepsSection = dynamic(
  () =>
    import("@/components/sections/numbered-steps-section").then((mod) => ({
      default: mod.NumberedStepsSection,
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

const FitCheckSection = dynamic(
  () =>
    import("@/components/sections/fit-check-section").then((mod) => ({
      default: mod.FitCheckSection,
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

const SourcesSection = dynamic(
  () =>
    import("@/components/sections/sources-section").then((mod) => ({
      default: mod.SourcesSection,
    })),
  {
    ssr: true,
    loading: () => (
      <div
        className="h-40 animate-pulse rounded-lg"
        style={{ backgroundColor: "var(--surface)" }}
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

        const node = (() => {
          switch (section.type) {
            case "hero":
              return <Hero2ColSection content={section.content as HeroContent} />
            case "card-grid":
              return <CardGridSection content={section.content as CardGridContent} />
            case "features":
              return <FeaturesSection content={section.content as FeaturesContent} sectionNumber={num} />
            case "stats":
              return <StatsSection content={section.content as StatsContent} />
            case "content":
              return <ContentSection content={section.content as ContentSectionContent} />
            case "testimonials":
              return <TestimonialsSection content={section.content as TestimonialsContent} sectionNumber={num} />
            case "cta":
              return <CTASection content={section.content as CTAContent} />
            case "faq":
              return <FAQSection content={section.content as FAQContent} sectionNumber={num} />
            case "carousel":
              return <CarouselSection content={section.content as CarouselContent} />
            case "pull-quote":
              return <PullQuoteSection content={section.content as PullQuoteContent} />
            case "statement":
              return <StatementSection content={section.content as StatementContent} />
            case "numbered-steps":
              return <NumberedStepsSection content={section.content as NumberedStepsContent} />
            case "fit-check":
              return <FitCheckSection content={section.content as FitCheckContent} />
            case "sources":
              return <SourcesSection content={section.content as SourcesContent} />
            default:
              return null
          }
        })()

        if (!node) return null

        // Optional masked background image behind the section. Only visible
        // when the section's own background is transparent/surface — sections
        // that paint a solid fill will occlude it.
        return section.backdrop ? (
          <SectionBackdrop key={section.id} as="div" {...section.backdrop}>
            {node}
          </SectionBackdrop>
        ) : (
          <Fragment key={section.id}>{node}</Fragment>
        )
      })}
    </>
  )
}
