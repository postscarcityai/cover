import type { Metadata } from "next"
import BecomeAClientClient from "./client"
import { siteConfig } from "@/site.config"

export const metadata: Metadata = {
  title: `Become a Client — ${siteConfig.name}`,
  description: `Start a relationship with ${siteConfig.name}. Share your goals and we'll follow up quickly.`,
  alternates: {
    canonical: `${siteConfig.url}/become-a-client`,
  },
  openGraph: {
    title: `Become a Client — ${siteConfig.name}`,
    description: `Tell us what you're building. We'll route you to the right person.`,
    url: `${siteConfig.url}/become-a-client`,
    siteName: siteConfig.seo.openGraph.siteName,
    type: "website",
    images: siteConfig.seo.openGraph.images,
  },
}

export default function BecomeAClientPage() {
  return <BecomeAClientClient />
}
