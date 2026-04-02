import { siteConfig } from "@/site.config"

export interface DisclaimerData {
  effectiveDate: string
  lastUpdated: string
  hero: { title: string; breadcrumbs: Array<{ label: string; href?: string }> }
  sections: Array<{
    id: string
    title: string
    content: string
    isNotice?: boolean
  }>
  contactSection: {
    title: string
    intro: string
  }
  additionalSections?: Array<{ title: string; content: string }>
}

export function getDisclaimerData(): DisclaimerData {
  const disclaimer = siteConfig.disclaimer
  const companyName = siteConfig.name
  const expertise = siteConfig.business.expertise.join(", ").toLowerCase()
  const serviceAreas = siteConfig.business.serviceAreas.join(", ")

  return {
    effectiveDate: disclaimer?.effectiveDate ?? "January 1, 2025",
    lastUpdated: disclaimer?.lastUpdated ?? "January 1, 2025",
    hero: {
      title: "Website Disclaimer",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Disclaimer" }],
    },
    sections: [
      {
        id: "notice",
        title: "IMPORTANT NOTICE.",
        content:
          disclaimer?.notice ??
          "The information provided on this website is for general informational purposes only and should not be construed as professional advice. Consult with a qualified professional for specific guidance related to your situation.",
        isNotice: true,
      },
      {
        id: "general",
        title: "General Disclaimer",
        content:
          disclaimer?.general ??
          `This website is designed for general information only. The information presented at this site should not be construed as professional advice. ${companyName} makes no representations or warranties regarding the accuracy, completeness, or suitability of the information provided.`,
      },
      {
        id: "results",
        title: "Results May Vary",
        content:
          disclaimer?.results ??
          "Results and outcomes depend upon a variety of factors unique to each situation. Past performance does not guarantee future results. The information on this website is not intended to create any guarantees or promises about specific outcomes.",
      },
      {
        id: "professional",
        title: "Professional Services",
        content:
          disclaimer?.professionalServices ??
          `${companyName} provides professional services in ${expertise}. We maintain professional standards and comply with all applicable regulations in the jurisdictions where we operate.`,
      },
      {
        id: "service-areas",
        title: "Service Areas",
        content:
          disclaimer?.serviceAreas ??
          `${companyName} serves clients in ${serviceAreas}. Services may be subject to geographic limitations and local regulations.`,
      },
      {
        id: "testimonials",
        title: "Testimonials and Reviews",
        content:
          disclaimer?.testimonials ??
          "Any testimonials or reviews displayed on this website represent the experience of individual clients and should not be considered as a guarantee that similar results can be obtained for others. Every situation is different, and outcomes depend on specific circumstances.",
      },
    ],
    contactSection: {
      title: "Contact Information",
      intro: "For questions about this disclaimer or our services, please contact us at:",
    },
    additionalSections: disclaimer?.additionalSections,
  }
}
