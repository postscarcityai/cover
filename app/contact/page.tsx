import type { Metadata } from "next"
import ContactClient from "./client"
import { contactData } from "./data"
import { siteConfig } from "@/site.config"
import { pageMetadata } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
import { faqPageSchema } from "@/lib/schema"

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  title: "Contact Us",
  description: `Contact ${siteConfig.name} for consultation. Available at ${siteConfig.contact.phoneDisplay}. Located in ${siteConfig.contact.address.city}, ${siteConfig.contact.address.state}.`,
})

export default function ContactPage() {
  // FAQPage schema - customize per client
  const faqSchema = faqPageSchema([
    {
      question: "How can I contact you?",
      answer: `You can reach ${siteConfig.name} by phone at ${siteConfig.contact.phoneDisplay}, email at ${siteConfig.contact.email}, or visit us at our office in ${siteConfig.contact.address.city}, ${siteConfig.contact.address.state}.`,
    },
    {
      question: "What areas do you serve?",
      answer: `${siteConfig.name} serves clients in ${siteConfig.business.serviceAreas.join(", ")} and surrounding areas.`,
    },
    {
      question: "What services do you offer?",
      answer: `We specialize in ${siteConfig.business.expertise.join(", ")}. Contact us for a consultation to discuss your specific needs.`,
    },
  ])

  return (
    <>
      {/* BreadcrumbList Schema */}
      <JsonLd data={contactData.breadcrumbSchema} />
      
      {/* FAQPage Schema */}
      <JsonLd data={faqSchema} />
      
      <ContactClient data={contactData} />
    </>
  )
}
