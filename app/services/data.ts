import { siteConfig } from "@/site.config"

export interface ServicesData {
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
  serviceSchema: Array<{
    "@context": string
    "@type": string
    "@id": string
    serviceType: string
    provider: {
      "@id": string
    }
    areaServed: Array<{
      "@type": string
      name: string
    }>
    description: string
  }>
  hero: {
    title: string[]
    subtitle: string
  }
  stats: {
    primary: {
      label: string
      value: string
      subtext: string
    }
    secondary: {
      label: string
      value: string
      subtext: string
    }
  }
  primaryServices: {
    introduction: string
    quote: string
    sections: {
      title: string
      description: string
      color: string
      icon: string
      areas: string[]
    }[]
  }
  secondaryServices: {
    introduction: string
    quote: string
    sections: {
      title: string
      description: string
      color: string
      icon: string
      areas: string[]
    }[]
  }
  additionalInfo: {
    title: string
    description: string
    areas: string[]
  }
}

export const servicesData: ServicesData = {
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
        "name": "Services",
        "item": `${siteConfig.url}/services`
      }
    ]
  },
  serviceSchema: siteConfig.business.expertise.map((service, index) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/#service-${index}`,
    "serviceType": service,
    "provider": {
      "@id": siteConfig.url
    },
    "areaServed": siteConfig.business.serviceAreas.map(area => ({
      "@type": "State",
      "name": area
    })),
    "description": `Professional ${service.toLowerCase()} services provided by ${siteConfig.name}.`
  })),
  hero: {
    title: siteConfig.servicesPage?.heroTitle || ["Comprehensive", "Solutions"],
    subtitle: siteConfig.servicesPage?.heroSubtitle || "Expert Services Tailored to Your Needs"
  },
  stats: {
    primary: {
      label: siteConfig.servicesPage?.stat1Label || "Service Areas",
      value: siteConfig.servicesPage?.stat1Value || `${siteConfig.business.expertise.length}+`,
      subtext: siteConfig.servicesPage?.stat1Subtext || "Core Specialties"
    },
    secondary: {
      label: siteConfig.servicesPage?.stat2Label || "Locations",
      value: siteConfig.servicesPage?.stat2Value || `${siteConfig.business.serviceAreas.length}+`,
      subtext: siteConfig.servicesPage?.stat2Subtext || "Regions Served"
    }
  },
  primaryServices: {
    introduction: siteConfig.servicesPage?.primaryIntro || `${siteConfig.name} provides comprehensive professional services across ${siteConfig.business.expertise.join(", ").toLowerCase()}. Our expertise and dedication ensure exceptional results for every client.`,
    quote: siteConfig.servicesPage?.primaryQuote || "Excellence in every detail. Your success is our mission.",
    sections: siteConfig.servicesPage?.primarySections || [
      {
        title: siteConfig.business.expertise[0] || "Core Service 1",
        description: `Comprehensive solutions in ${siteConfig.business.expertise[0]?.toLowerCase() || "our primary service area"}. We deliver results through expertise, dedication, and attention to detail.`,
        color: "blue",
        icon: "Scale",
        areas: [
          "Strategic Planning",
          "Implementation",
          "Analysis & Optimization",
          "Ongoing Support",
          "Custom Solutions"
        ]
      },
      {
        title: siteConfig.business.expertise[1] || "Core Service 2",
        description: `Expert services in ${siteConfig.business.expertise[1]?.toLowerCase() || "our secondary service area"}. Our approach combines industry knowledge with innovative strategies.`,
        color: "purple",
        icon: "Zap",
        areas: [
          "Consultation",
          "Strategy Development",
          "Execution",
          "Quality Assurance",
          "Results Tracking"
        ]
      },
      {
        title: siteConfig.business.expertise[2] || "Core Service 3",
        description: `Specialized expertise in ${siteConfig.business.expertise[2]?.toLowerCase() || "our tertiary service area"}. We provide tailored solutions that meet your unique needs.`,
        color: "green",
        icon: "CheckCircle",
        areas: [
          "Assessment",
          "Planning",
          "Implementation",
          "Monitoring",
          "Optimization"
        ]
      }
    ]
  },
  secondaryServices: {
    introduction: siteConfig.servicesPage?.secondaryIntro || `We serve clients across ${siteConfig.business.serviceAreas.join(", ")} with the same level of dedication and expertise that has built our reputation for excellence.`,
    quote: siteConfig.servicesPage?.secondaryQuote || "Your success drives everything we do.",
    sections: siteConfig.servicesPage?.secondarySections || [
      {
        title: "Consultation Services",
        description: "Expert guidance and strategic advice to help you make informed decisions and achieve your goals.",
        color: "blue",
        icon: "Users",
        areas: [
          "Initial Assessment",
          "Strategic Planning",
          "Implementation Guidance",
          "Progress Review",
          "Ongoing Advisory"
        ]
      },
      {
        title: "Support Services",
        description: "Comprehensive support throughout your journey, ensuring you have the resources and assistance needed for success.",
        color: "orange",
        icon: "Shield",
        areas: [
          "Technical Support",
          "Customer Service",
          "Training & Education",
          "Documentation",
          "Emergency Assistance"
        ]
      },
      {
        title: "Specialized Solutions",
        description: "Custom-tailored services designed to address your specific challenges and opportunities.",
        color: "purple",
        icon: "Globe",
        areas: [
          "Custom Development",
          "Specialized Analysis",
          "Targeted Implementation",
          "Performance Optimization",
          "Results Measurement"
        ]
      }
    ]
  },
  additionalInfo: {
    title: siteConfig.servicesPage?.additionalTitle || "Getting Started",
    description: siteConfig.servicesPage?.additionalDescription || "Ready to work with us? Contact our team to discuss your needs and learn how we can help you achieve your goals.",
    areas: siteConfig.servicesPage?.additionalAreas || [
      "Free Initial Consultation",
      "Customized Service Plans",
      "Transparent Pricing",
      "Flexible Scheduling",
      "Dedicated Support"
    ]
  }
}

// Legacy export for backwards compatibility
export const practiceAreasData = servicesData
export type PracticeAreasData = ServicesData
