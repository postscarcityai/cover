"use client"

import { SubpageHero } from "@/components/subpage-hero"
import { SectionRenderer } from "@/components/section-renderer"
import { Footer } from "@/components/footer"
import { usePageTracking } from "@/lib/analytics-hooks"
import type { TeamMemberData } from "./data"
import type {
  HomepageSection,
  ContentSectionContent,
  StatsContent,
  FeaturesContent,
  CardGridContent,
  PullQuoteContent,
  CTAContent,
} from "@/app/data"

export default function TeamMemberClient({ data }: { data: TeamMemberData }) {
  usePageTracking(`${data.person.name} - Team`, "about", "team_member")

  // Small credential cards: certifications first, licenses as backfill.
  const credentialCards = [
    ...data.credentials.certifications,
    ...data.credentials.licenses,
  ].slice(0, 3)

  const sections: HomepageSection[] = [
    {
      id: "overview",
      type: "content",
      content: {
        blocks: [
          {
            eyebrow: "Professional overview",
            title: data.overview.title,
            description: data.overview.description,
            paragraphs: data.overview.paragraphs,
            imageSrc: data.overview.portraitSrc,
            imageAlt: data.overview.portraitAlt,
          },
          {
            eyebrow: "Beyond the practice",
            title: data.leadership.title,
            description: data.leadership.description,
            paragraphs: data.leadership.paragraphs,
            reverse: true,
          },
        ],
      } satisfies ContentSectionContent,
    },
    {
      id: "stats",
      type: "stats",
      content: {
        stats: data.stats,
      } satisfies StatsContent,
    },
    {
      id: "highlights",
      type: "features",
      numbered: true,
      content: {
        eyebrow: "What you can expect",
        title: "How the work gets done",
        features: data.highlights.map((h) => ({
          icon: h.icon,
          title: h.title,
          description: h.description,
        })),
      } satisfies FeaturesContent,
    },
    {
      id: "credentials",
      type: "card-grid",
      content: {
        eyebrow: "Credentials",
        title: data.credentials.title,
        featured: [
          {
            title: `Licensed across\n${data.credentials.licenses.length}+ regions`,
            ctaText: "Start a conversation",
            ctaHref: "/contact",
            bg: "var(--surface-warm)",
            textColor: "dark",
          },
          {
            title: "Certified and\ncontinually trained",
            ctaText: "About the team",
            ctaHref: "/about",
            bg: "var(--ink)",
            textColor: "light",
          },
        ],
        grid: credentialCards.map((title, i) => ({
          title,
          bg: i === 2 ? "var(--accent)" : "var(--surface-warm)",
        })),
      } satisfies CardGridContent,
    },
    {
      id: "quote",
      type: "pull-quote",
      content: {
        quote: data.quote,
        attribution: data.person.name,
      } satisfies PullQuoteContent,
    },
    {
      id: "cta",
      type: "cta",
      content: {
        title: data.cta.title,
        description: data.cta.description,
        ctaText: data.cta.buttonText,
        ctaHref: "/contact",
        secondaryCtaText: "Learn more about us",
        secondaryCtaHref: "/about",
      } satisfies CTAContent,
    },
  ]

  return (
    <div className="min-h-screen">
      <SubpageHero
        eyebrow={data.person.title}
        title={data.person.name}
        description={data.person.intro}
        breadcrumbs={[{ label: "About Us", href: "/about" }, { label: data.person.name }]}
      />
      <main id="main-content">
        <SectionRenderer sections={sections} />
      </main>
      <Footer />
    </div>
  )
}
