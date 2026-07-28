"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { usePageTracking, useScrollTracking } from "@/lib/analytics-hooks"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SectionRenderer } from "@/components/section-renderer"
import { MagneticButton } from "@/components/magnetic-button"
import { ConsultationForm } from "@/components/consultation-form"
import type {
  HomepageSection,
  FeaturesContent,
  CTAContent,
  ContentSectionContent,
} from "@/app/data"
import type { LandingPageConfig } from "./data"

interface LandingPageClientProps {
  landingPage: LandingPageConfig
  searchParams: Record<string, string | undefined>
}

type LandingSection = LandingPageConfig["sections"][number]

export default function LandingPageClient({ landingPage, searchParams }: LandingPageClientProps) {
  usePageTracking(landingPage.meta.title, "landing", landingPage.slug)
  useScrollTracking()

  const { hero, sections } = landingPage

  // Map the landing authoring shape onto the shared homepage section system.
  const rendererSections: HomepageSection[] = []
  const consultationSections: LandingSection[] = []

  sections.forEach((section, index) => {
    if (section.type === "features" && section.features) {
      rendererSections.push({
        id: `landing-features-${index}`,
        type: "features",
        content: {
          title: section.title ?? "",
          features: section.features.map((feature) => ({
            title: feature.title,
            description: feature.description,
          })),
        } satisfies FeaturesContent,
      })
    } else if (section.type === "cta") {
      rendererSections.push({
        id: `landing-cta-${index}`,
        type: "cta",
        content: {
          title: section.title ?? "",
          description: section.content,
          ctaText: section.ctaText ?? "Get Started",
          ctaHref: section.ctaHref ?? "/contact",
        } satisfies CTAContent,
      })
    } else if (section.type === "text") {
      rendererSections.push({
        id: `landing-text-${index}`,
        type: "content",
        content: {
          blocks: [
            {
              title: section.title ?? "",
              description: section.content ?? "",
            },
          ],
        } satisfies ContentSectionContent,
      })
    } else if (section.type === "consultation") {
      consultationSections.push(section)
    }
  })

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>

      <main id="main-content">
        <SubpageHero
          title={hero.title}
          description={hero.subtitle}
          align="center"
          size="compact"
        >
          <MagneticButton>
            <Link
              href={hero.ctaHref}
              className="inline-flex items-center px-8 py-4 font-semibold text-sm uppercase tracking-wide rounded-full transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--accent-fg)",
              }}
            >
              {hero.ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </MagneticButton>
        </SubpageHero>

        <SectionRenderer sections={rendererSections} />

        {consultationSections.map((section, index) => (
          <section key={`consultation-${index}`} className="container py-24 md:py-32">
            <div data-reveal="fade-up">
              <ConsultationForm
                title={section.formTitle ?? section.title}
                description={section.formDescription ?? section.description}
                buttonText={section.formButtonText}
              />
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  )
}
