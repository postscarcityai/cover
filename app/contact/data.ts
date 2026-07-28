import { siteConfig, getContactDisclaimer } from "@/site.config"

// The visible headline/subhead/trust bullets come from siteConfig.contactPage
// (see client.tsx) — this file only carries what the page actually renders.
export interface ContactData {
  breadcrumbSchema: {
    "@context": string
    "@type": string
    itemListElement: Array<{
      "@type": string
      position: number
      name: string
      item: string
    }>
  }
  disclaimer: {
    title: string
    content: string[]
  }
}

export const contactData: ContactData = {
  breadcrumbSchema: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.url
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact",
        "item": `${siteConfig.url}/contact`
      }
    ]
  },
  disclaimer: {
    title: "Important Notice",
    content: getContactDisclaimer()
  }
}
