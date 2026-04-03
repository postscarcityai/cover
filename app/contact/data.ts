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
  hero: {
    label: string
    title: string[]
    subtitle: string
  }
  emergency: {
    label: string
    title: string
    subtitle: string
  }
  contactMethods: {
    title: string
    subtitle: string
    description: string
    action: string
    type: 'phone' | 'email' | 'whatsapp'
    isPrimary: boolean
  }[]
  sectionTitle: string
  map: {
    embedUrl: string
    title: string
  }
  cta: {
    title: string
    description: string
    buttonText: string
  }
}

import { siteConfig } from "@/site.config"

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
  hero: {
    label: `Contact ${siteConfig.name}`,
    title: siteConfig.contactPage?.conversionHeadline ? [siteConfig.contactPage.conversionHeadline] : ["Let's Connect.", "Get In Touch."],
    subtitle: siteConfig.contactPage?.conversionSubhead || "We're here to help with your needs"
  },
  emergency: {
    label: siteConfig.business.openingHours?.is24_7 ? "Available" : "Contact",
    title: siteConfig.business.openingHours?.is24_7 ? "24/7 Available" : "Ready to Help",
    subtitle: siteConfig.business.openingHours?.is24_7 ? "We're always here when you need us" : "Reach out during business hours"
  },
  contactMethods: [
    {
      title: "Main Phone",
      subtitle: "Primary Contact",
      description: `Call us directly at ${siteConfig.contact.phoneDisplay} for immediate assistance with your needs.`,
      action: siteConfig.contact.phoneDisplay,
      type: 'phone',
      isPrimary: true
    },
    {
      title: "Email Us",
      subtitle: "Written Inquiry",
      description: `Send us an email at ${siteConfig.contact.email} and we'll respond promptly.`,
      action: siteConfig.contact.email,
      type: 'email',
      isPrimary: false
    },
    ...(siteConfig.features.whatsapp ? [{
      title: "WhatsApp Connect",
      subtitle: "Instant Messaging",
      description: "Message us directly on WhatsApp for quick responses.",
      action: "WhatsApp Connect",
      type: 'whatsapp' as const,
      isPrimary: false
    }] : [])
  ],
  sectionTitle: "Choose Your Preferred Contact Method",
  map: {
    embedUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${siteConfig.business.coordinates.longitude}!3d${siteConfig.business.coordinates.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(siteConfig.contact.address.street)}!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus`,
    title: `${siteConfig.name} Office Location`
  },
  cta: {
    title: "Ready to Get Started?",
    description: "Contact us today to discuss how we can help with your needs.",
    buttonText: `Call ${siteConfig.contact.phoneDisplay} Now`
  }
}
