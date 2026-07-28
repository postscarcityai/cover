"use client"

import { SubpageHero } from "@/components/subpage-hero"
import { SectionRenderer } from "@/components/section-renderer"
import { Footer } from "@/components/footer"
import { usePageTracking } from "@/lib/analytics-hooks"
import type { ResultsData } from "./data"
import type {
  HomepageSection,
  StatsContent,
  StatementContent,
  ContentSectionContent,
  CardGridContent,
  TestimonialsContent,
  CTAContent,
} from "@/app/data"

export default function ResultsClient({ data }: { data: ResultsData }) {
  usePageTracking("Results", "social_proof", "results_page")

  const sections: HomepageSection[] = [
    {
      id: "results-stats",
      type: "stats",
      content: {
        stats: data.stats.map((s) => ({
          value: s.value,
          label: s.label,
          suffix: s.suffix,
        })),
      } satisfies StatsContent,
    },
    {
      id: "results-statement",
      type: "statement",
      content: {
        eyebrow: data.statement.eyebrow,
        statement: data.statement.statement,
        detail: data.statement.detail,
      } satisfies StatementContent,
    },
    {
      id: "featured-results",
      type: "content",
      content: {
        blocks: data.featuredResults.map((result, i) => ({
          eyebrow: result.category,
          title: result.title,
          description: result.description,
          paragraphs: result.paragraphs,
          reverse: i % 2 === 1,
        })),
      } satisfies ContentSectionContent,
    },
    {
      id: "more-outcomes",
      type: "card-grid",
      content: {
        eyebrow: data.moreOutcomes.eyebrow,
        title: data.moreOutcomes.title,
        featured: data.moreOutcomes.featured.map((card, i) => ({
          title: card.title,
          ctaText: card.ctaText,
          ctaHref: card.ctaHref,
          bg: i === 0 ? "var(--surface-warm)" : "var(--ink)",
          textColor: i === 0 ? ("dark" as const) : ("light" as const),
        })),
        grid: data.moreOutcomes.grid.map((card, i) => ({
          title: card.title,
          bg: i === data.moreOutcomes.grid.length - 1 ? "var(--accent)" : "var(--surface-warm)",
        })),
      } satisfies CardGridContent,
    },
    {
      id: "results-testimonial",
      type: "testimonials",
      content: {
        eyebrow: "In their words",
        title: "Why results come first",
        testimonials: [
          {
            quote: data.testimonial.quote,
            author: data.testimonial.author,
            role: data.testimonial.role,
          },
        ],
      } satisfies TestimonialsContent,
    },
    {
      id: "results-cta",
      type: "cta",
      content: {
        title: data.cta.title,
        description: data.cta.description,
        ctaText: data.cta.buttonText,
        ctaHref: "/contact",
        secondaryCtaText: "See our services",
        secondaryCtaHref: "/services",
      } satisfies CTAContent,
    },
  ]

  return (
    <div className="min-h-screen">
      <SubpageHero
        eyebrow="Proof, not promises"
        title={data.hero.title}
        description={data.hero.description}
        breadcrumbs={[{ label: "Results" }]}
        backgroundImage="/img/style-guide/bg-dark/bg-drift.jpg"
      />
      <main id="main-content">
        <SectionRenderer sections={sections} />
      </main>
      <Footer />
    </div>
  )
}
