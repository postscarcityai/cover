import type { Metadata } from "next"
import ResultsClient from "./client"
import { resultsData } from "./data"
import { siteConfig } from "@/site.config"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  path: "/achievements",
  title: siteConfig.achievementsSection.title,
  description: siteConfig.achievementsSection.description,
})

export default function ResultsPage() {
  return <ResultsClient data={resultsData} />
}
