"use client"

import { SubpageHero } from "@/components/subpage-hero"
import { SectionRenderer } from "@/components/section-renderer"
import { Footer } from "@/components/footer"
import { usePageTracking } from "@/lib/analytics-hooks"
import type { ServicesData } from "./data"
import type {
  HomepageSection,
  PullQuoteContent,
  ContentSectionContent,
  CardGridContent,
  NumberedStepsContent,
  CTAContent,
} from "@/app/data"

export default function ServicesClient({ data }: { data: ServicesData }) {
  usePageTracking("Services", "service", "services")

  const [firstAdditional, secondAdditional, ...restAdditional] = data.additional.services

  const sections: HomepageSection[] = [
    {
      id: "services-quote",
      type: "pull-quote",
      content: {
        eyebrow: data.pullQuote.eyebrow,
        quote: data.pullQuote.quote,
      } satisfies PullQuoteContent,
    },
    {
      id: "core-services",
      type: "content",
      content: {
        blocks: data.primary.services.map((service, i) => ({
          eyebrow: `Core service ${String(i + 1).padStart(2, "0")}`,
          title: service.title,
          description: service.description,
          paragraphs: [`Includes ${service.areas.join(", ").toLowerCase()}.`],
          reverse: i % 2 === 1,
          ctaText: "Discuss your project",
          ctaHref: "/contact",
        })),
      } satisfies ContentSectionContent,
    },
    {
      id: "additional-services",
      type: "card-grid",
      content: {
        eyebrow: "Beyond the core",
        title: "Additional services",
        featured: [
          {
            title: firstAdditional?.title ?? "Consultation\nservices",
            ctaText: "Get started",
            ctaHref: "/contact",
            bg: "var(--surface-warm)",
            textColor: "dark",
          },
          {
            title: secondAdditional?.title ?? "Support\nservices",
            ctaText: "Get started",
            ctaHref: "/contact",
            bg: "var(--ink)",
            textColor: "light",
          },
        ],
        grid: [
          ...restAdditional.map((service) => ({
            title: service.title,
            href: "/contact",
            bg: "var(--surface-warm)",
          })),
          {
            title: data.additional.highlights[0] ?? "Customized service plans",
            href: "/contact",
            bg: "var(--surface-warm)",
          },
          {
            title: data.additional.highlights[2] ?? "Transparent pricing",
            href: "/contact",
            bg: "var(--accent)",
          },
        ],
      } satisfies CardGridContent,
    },
    {
      id: "how-we-work",
      type: "numbered-steps",
      content: {
        eyebrow: "How we work",
        title: data.howWeWork.title,
        description: data.howWeWork.description,
        steps: data.howWeWork.steps,
      } satisfies NumberedStepsContent,
    },
    {
      id: "cta",
      type: "cta",
      content: {
        title: data.cta.heading,
        description: data.cta.description,
        ctaText: data.cta.buttonText,
        ctaHref: "/contact",
      } satisfies CTAContent,
    },
  ]

  return (
    <div className="min-h-screen">
      <SubpageHero
        eyebrow="Our services"
        title={data.hero.title}
        description={data.hero.subtitle}
        breadcrumbs={[{ label: "Services" }]}
        backgroundImage="/img/style-guide/backdrops/backdrop-field.jpg"
      />
      <main id="main-content">
        <SectionRenderer sections={sections} />
      </main>
      <Footer />
    </div>
  )
}
