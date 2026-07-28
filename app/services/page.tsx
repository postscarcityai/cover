import type { Metadata } from "next"
import ServicesClient from "./client"
import { servicesData } from "./data"
import { siteConfig } from "@/site.config"
import { pageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"

export const metadata: Metadata = pageMetadata({
  path: "/services",
  title: "Services",
  description: siteConfig.description,
})

export default function ServicesPage() {
  return (
    <>
      {/* Service Schemas (breadcrumb JSON-LD is emitted by SubpageHero) */}
      {servicesData.serviceSchema.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}

      <ServicesClient data={servicesData} />
    </>
  )
}
