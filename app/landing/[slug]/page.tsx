import type { Metadata } from "next"
import { notFound } from "next/navigation"
import LandingPageClient from "./client"
import { landingPageData } from "./data"

interface LandingPageProps {
  params: { slug: string }
  searchParams: {
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
    utm_term?: string
    utm_content?: string
  }
}

export async function generateMetadata({ params }: LandingPageProps): Promise<Metadata> {
  const landingPage = landingPageData[params.slug]

  if (!landingPage) {
    return { title: "Page Not Found" }
  }

  return {
    title: landingPage.meta.title,
    description: landingPage.meta.description,
    keywords: landingPage.meta.keywords,
    robots: { index: false, follow: false },
  }
}

export default function LandingPage({ params, searchParams }: LandingPageProps) {
  const landingPage = landingPageData[params.slug]

  if (!landingPage) {
    notFound()
  }

  return <LandingPageClient landingPage={landingPage} searchParams={searchParams} />
}
