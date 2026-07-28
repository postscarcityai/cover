import type { Metadata } from "next"
import OurFirmClient from "./client"
import { ourFirmData } from "./data"
import { siteConfig } from "@/site.config"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About Us",
  description: siteConfig.about?.description || `Learn more about ${siteConfig.name} and our commitment to excellence.`,
})

export default function OurFirmPage() {
  // Server-side: Prepare data and pass to client component
  return (
    <>
      {/* Breadcrumb JSON-LD is emitted by SubpageHero from its breadcrumbs. */}
      <OurFirmClient data={ourFirmData} />
    </>
  )
}
