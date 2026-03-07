export interface CoreValue {
  iconName: 'Scale' | 'Target' | 'Shield'
  title: string
  description: string
}

export interface OurFirmData {
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
    title: string
    subtitle: string
    location: string
  }
  stats: {
    experience: {
      label: string
      value: string
      subtext: string
    }
    jurisdictions: {
      label: string
      value: string
      subtext: string
    }
  }
  introduction: string
  mission: {
    heading: string
    paragraphs: string[]
    quote: string
  }
  coreValues: CoreValue[]
  practiceAreas: string[]
  stateLicenses: string[]
  federalJurisdictions: string[]
  cta: {
    heading: string
    paragraphs: string[]
    quote: string
    buttonText: string
  }
}

import { siteConfig } from "@/site.config"

export const ourFirmData: OurFirmData = {
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
        "name": "About Us",
        "item": `${siteConfig.url}/about`
      }
    ]
  },
  hero: {
    title: siteConfig.about?.heroTitle || `About ${siteConfig.name}`,
    subtitle: "Our Firm",
    location: siteConfig.about?.heroLocation || `in ${siteConfig.contact.address.city}, ${siteConfig.contact.address.state}`
  },
  stats: {
    experience: {
      label: "Experience",
      value: siteConfig.about?.stats?.experience?.value || "10+ Years",
      subtext: siteConfig.about?.stats?.experience?.subtext || "In Business"
    },
    jurisdictions: {
      label: siteConfig.about?.stats?.coverage?.label || "Coverage",
      value: siteConfig.about?.stats?.coverage?.value || "Nationwide",
      subtext: siteConfig.about?.stats?.coverage?.subtext || "Service Areas"
    }
  },
  introduction: siteConfig.about?.introduction || `At ${siteConfig.name}, we are committed to providing exceptional service to individuals and businesses. Our team brings years of experience and expertise to every project. Whether you're looking for professional services or expert guidance, we have the knowledge and dedication to meet your needs and exceed your expectations.`,
  mission: siteConfig.about?.mission || {
    heading: "Our Mission and Commitment",
    paragraphs: [
      `At ${siteConfig.name}, we don't just deliver services—we build partnerships that drive success. Our mission is to provide exceptional value through expertise, dedication, and personalized attention.`,
      "We understand that every client's needs are unique. That's why we take the time to understand your goals and develop customized solutions that deliver real results."
    ],
    quote: "Your success is our success. We're committed to going above and beyond to help you achieve your goals."
  },
  coreValues: siteConfig.about?.coreValues || [
    {
      iconName: 'Scale',
      title: "Commitment to Excellence",
      description: "We maintain the highest standards in everything we do, ensuring quality and professionalism in every interaction."
    },
    {
      iconName: 'Target',
      title: "Client-Focused Approach",
      description: "You're not just another client—you're our priority. We provide personalized attention and tailored solutions for your unique situation."
    },
    {
      iconName: 'Shield',
      title: "Trusted Partnership",
      description: "We build lasting relationships based on trust, transparency, and results. Your success is our success."
    }
  ],
  practiceAreas: siteConfig.business.expertise,
  stateLicenses: siteConfig.serviceLocations?.states?.map(s => s.name) || siteConfig.business.serviceAreas,
  federalJurisdictions: siteConfig.serviceLocations?.points?.map(p => p.name) || [],
  cta: siteConfig.about?.cta || {
    heading: "Ready to Get Started?",
    paragraphs: [
      `When you need professional service you can trust, ${siteConfig.name} is here to help. Our team brings experience, dedication, and proven results to every client relationship.`,
    ],
    quote: "Don't wait. Contact us today to discuss how we can help you achieve your goals.",
    buttonText: "Schedule a Consultation"
  }
}
