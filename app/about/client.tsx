"use client"

import { SubpageHero } from "@/components/subpage-hero"
import { SectionRenderer } from "@/components/section-renderer"
import { Footer } from "@/components/footer"
import { usePageTracking } from "@/lib/analytics-hooks"
import type { OurFirmData } from "./data"
import type {
  HomepageSection,
  StatementContent,
  ContentSectionContent,
  FeaturesContent,
  CardGridContent,
  StatsContent,
  CTAContent,
} from "@/app/data"

// Core-value icon names from data map onto the features-section icon set.
const ICON_ALIASES: Record<string, string> = { Scale: "Award" }

export default function OurFirmClient({ data }: { data: OurFirmData }) {
  usePageTracking("About", "content", "about")

  const sections: HomepageSection[] = [
    {
      id: "mission-statement",
      type: "statement",
      content: {
        eyebrow: "Our mission",
        statement: data.mission.quote,
        detail: data.introduction,
      } satisfies StatementContent,
    },
    {
      id: "mission",
      type: "content",
      content: {
        blocks: [
          {
            eyebrow: "Who we are",
            title: data.mission.heading,
            description: data.mission.paragraphs[0],
            paragraphs: data.mission.paragraphs.slice(1),
            imageSrc: "/img/style-guide/samples/sample-portrait.jpg",
            imageAlt: "The team at work",
          },
        ],
      } satisfies ContentSectionContent,
    },
    {
      id: "values",
      type: "features",
      numbered: true,
      content: {
        eyebrow: "What we stand for",
        title: "The values behind the work",
        features: data.coreValues.map((v) => ({
          icon: ICON_ALIASES[v.iconName] ?? v.iconName,
          title: v.title,
          description: v.description,
        })),
      } satisfies FeaturesContent,
    },
    {
      id: "expertise",
      type: "card-grid",
      content: {
        eyebrow: "Where we can help",
        title: "Built around what you need",
        featured: [
          {
            title: "Explore our\nservices",
            ctaText: "See services",
            ctaHref: "/services",
            bg: "var(--surface-warm)",
            textColor: "dark",
          },
          {
            title: "See the results\nwe deliver",
            ctaText: "View results",
            ctaHref: "/achievements",
            bg: "var(--ink)",
            textColor: "light",
          },
        ],
        grid: data.practiceAreas.slice(0, 3).map((area, i) => ({
          title: area,
          href: "/services",
          bg: i === 2 ? "var(--accent)" : "var(--surface-warm)",
        })),
      } satisfies CardGridContent,
    },
    {
      id: "stats",
      type: "stats",
      content: {
        stats: [
          { value: data.stats.experience.value, label: data.stats.experience.subtext },
          { value: data.stats.jurisdictions.value, label: data.stats.jurisdictions.subtext },
          { value: String(data.practiceAreas.length), label: "Core Specialties", suffix: "+" },
        ],
      } satisfies StatsContent,
    },
    {
      id: "cta",
      type: "cta",
      content: {
        title: data.cta.heading,
        description: data.cta.paragraphs[0],
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
        eyebrow={data.hero.subtitle}
        title={data.hero.title}
        description={data.hero.location}
        breadcrumbs={[{ label: "About Us" }]}
        backgroundImage="/img/style-guide/samples/sample-hero-right.jpg"
      />
      <main id="main-content">
        <SectionRenderer sections={sections} />
      </main>
      <Footer />
    </div>
  )
}
