import type { Metadata } from "next"
import ContactClient from "./client"
import { contactData } from "./data"
import { siteConfig } from "@/site.config"

export const metadata: Metadata = {
  title: `Contact Us - ${siteConfig.name}`,
  description: `Contact ${siteConfig.name} for consultation. Available at ${siteConfig.contact.phoneDisplay}. Located in ${siteConfig.contact.address.city}, ${siteConfig.contact.address.state}.`,
  keywords: siteConfig.seo.keywords,
  alternates: {
    canonical: `${siteConfig.url}/contact`
  },
  openGraph: {
    title: `Contact ${siteConfig.name}`,
    description: `Get in touch with ${siteConfig.name}. Call ${siteConfig.contact.phoneDisplay} or email ${siteConfig.contact.email}`,
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.seo.openGraph.siteName,
    type: "website",
    images: siteConfig.seo.openGraph.images
  },
  twitter: {
    card: siteConfig.seo.twitter.cardType as "summary_large_image",
    title: `Contact ${siteConfig.name}`,
    description: `Get in touch with ${siteConfig.name}. Call ${siteConfig.contact.phoneDisplay}`,
    images: siteConfig.seo.openGraph.images.map(img => img.url),
  }
}

export default function ContactPage() {
  // FAQPage schema - customize per client
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/contact#faq`,
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can I contact you?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `You can reach ${siteConfig.name} by phone at ${siteConfig.contact.phoneDisplay}, email at ${siteConfig.contact.email}, or visit us at our office in ${siteConfig.contact.address.city}, ${siteConfig.contact.address.state}.`
        }
      },
      {
        "@type": "Question",
        "name": "What areas do you serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${siteConfig.name} serves clients in ${siteConfig.business.serviceAreas.join(", ")} and surrounding areas.`
        }
      },
      {
        "@type": "Question",
        "name": "What services do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `We specialize in ${siteConfig.business.expertise.join(", ")}. Contact us for a consultation to discuss your specific needs.`
        }
      }
    ]
  };

  return (
    <>
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactData.breadcrumbSchema)
        }}
      />
      
      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      
      <ContactClient />
    </>
  )
}
