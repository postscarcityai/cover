import { siteConfig } from "@/site.config"

export interface TeamMemberData {
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
    name: string
    title: string
    imageSrc: string
    imageAlt: string
    stats: {
      experience: {
        label: string
        value: string
      }
      jurisdictions: {
        label: string
        value: string
      }
    }
  }
  overview: {
    sectionTitle: string
    paragraphs: string[]
  }
  highlights: string[]
  expertise: {
    sectionTitle: string
    paragraphs: string[]
  }
  credentials: {
    sectionTitle: string
    description: string
    licenses: string[]
    certifications: string[]
    note: string
  }
  leadership: {
    sectionTitle: string
    paragraphs: string[]
    highlights: {
      title: string
      subtitle: string
      items: string[]
    }
  }
  cta: {
    title: string
    paragraphs: string[]
    quote: string
    buttonText: string
    phoneNumber: string
  }
}

export const teamMemberData: TeamMemberData = {
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
        "name": siteConfig.business.founder.name,
        "item": `${siteConfig.url}/team-member`
      }
    ]
  },
  hero: {
    label: siteConfig.business.founder.title || "Team Leader",
    name: siteConfig.business.founder.name || "Team Member Name",
    title: siteConfig.teamMember?.heroTitle || "Professional Title",
    imageSrc: siteConfig.teamMember?.imageSrc || "",
    imageAlt: siteConfig.teamMember?.imageAlt || `${siteConfig.business.founder.name} professional portrait`,
    stats: {
      experience: {
        label: "Experience",
        value: siteConfig.teamMember?.experience || "10+ Years"
      },
      jurisdictions: {
        label: siteConfig.teamMember?.statsLabel || "Service Areas",
        value: siteConfig.teamMember?.statsValue || `${siteConfig.business.serviceAreas.length}+ Regions`
      }
    }
  },
  overview: {
    sectionTitle: siteConfig.teamMember?.overviewTitle || "Professional Background",
    paragraphs: siteConfig.teamMember?.overviewParagraphs || [
      `${siteConfig.business.founder.name} is a recognized professional with extensive experience in ${siteConfig.business.expertise.join(", ").toLowerCase()}. With a commitment to excellence and client success, ${siteConfig.business.founder.name.split(" ")[0]} has built a reputation for delivering exceptional results.`,
      `Throughout their career, ${siteConfig.business.founder.name.split(" ")[0]} has worked with clients across ${siteConfig.business.serviceAreas.join(", ")}, providing strategic guidance and expert solutions tailored to each client's unique needs.`
    ]
  },
  highlights: siteConfig.teamMember?.highlights || [
    `Expertise in ${siteConfig.business.expertise[0]?.toLowerCase() || "core services"}`,
    `Experience across ${siteConfig.business.serviceAreas.length}+ service regions`,
    "Strategic client-focused approach",
    "Proven track record of success",
    "Industry-recognized professional"
  ],
  expertise: {
    sectionTitle: siteConfig.teamMember?.expertiseTitle || "Areas of Expertise",
    paragraphs: siteConfig.teamMember?.expertiseParagraphs || [
      `${siteConfig.business.founder.name}'s professional practice encompasses ${siteConfig.business.expertise.join(", ").toLowerCase()}, serving clients across multiple regions and industries.`,
      `With deep experience and a client-centered approach, ${siteConfig.business.founder.name.split(" ")[0]} provides comprehensive solutions that address complex challenges and deliver measurable results.`
    ]
  },
  credentials: {
    sectionTitle: siteConfig.teamMember?.credentialsTitle || "Credentials & Qualifications",
    description: siteConfig.teamMember?.credentialsDescription || `${siteConfig.business.founder.name} holds professional credentials and qualifications that demonstrate expertise and commitment to excellence in the field.`,
    licenses: siteConfig.teamMember?.licenses || siteConfig.business.serviceAreas,
    certifications: siteConfig.teamMember?.certifications || [
      "Professional Certification (Example)",
      "Industry Qualification (Example)",
      "Specialized Training (Example)"
    ],
    note: siteConfig.teamMember?.credentialsNote || `${siteConfig.business.founder.name} is available to serve clients across all service regions.`
  },
  leadership: {
    sectionTitle: siteConfig.teamMember?.leadershipTitle || "Leadership & Community",
    paragraphs: siteConfig.teamMember?.leadershipParagraphs || [
      `Beyond professional practice, ${siteConfig.business.founder.name} is actively involved in community initiatives and industry leadership roles.`,
      `As a resident of ${siteConfig.contact.address.city}, ${siteConfig.contact.address.state}, ${siteConfig.business.founder.name.split(" ")[0]} maintains strong connections with the local community and contributes to regional development.`
    ],
    highlights: {
      title: siteConfig.teamMember?.leadershipHighlightTitle || "Community Leader",
      subtitle: `${siteConfig.contact.address.city}, ${siteConfig.contact.address.state}`,
      items: siteConfig.teamMember?.leadershipHighlightItems || [
        "Industry Leadership Role",
        "Community Organization Involvement",
        "Professional Association Member"
      ]
    }
  },
  cta: {
    title: siteConfig.teamMember?.ctaTitle || "Experience & Expertise You Can Trust",
    paragraphs: siteConfig.teamMember?.ctaParagraphs || [
      `With extensive experience in ${siteConfig.business.expertise[0]?.toLowerCase() || "professional services"}, ${siteConfig.business.founder.name} provides strategic guidance and expert solutions for clients across ${siteConfig.business.serviceAreas[0]} and beyond.`
    ],
    quote: siteConfig.teamMember?.ctaQuote || "Delivering exceptional results through expertise and dedication.",
    buttonText: siteConfig.teamMember?.ctaButton || "Schedule Consultation",
    phoneNumber: siteConfig.contact.phoneDisplay
  }
}
