import { siteConfig } from "@/site.config"

export interface ServiceSection {
  title: string
  description: string
  areas: string[]
}

export interface ServicesData {
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
    title: string
    subtitle: string
  }
  pullQuote: {
    eyebrow: string
    quote: string
  }
  primary: {
    introduction: string
    services: ServiceSection[]
  }
  additional: {
    introduction: string
    services: ServiceSection[]
    highlights: string[]
  }
  howWeWork: {
    title: string
    description: string
    steps: { title: string; description: string }[]
  }
  cta: {
    heading: string
    description: string
    buttonText: string
  }
}

const config = siteConfig.servicesPage

export const servicesData: ServicesData = {
  serviceSchema: siteConfig.business.expertise.map((service, index) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/#service-${index}`,
    serviceType: service,
    provider: {
      "@id": siteConfig.url,
    },
    areaServed: siteConfig.business.serviceAreas.map((area) => ({
      "@type": "State",
      name: area,
    })),
    description: `Professional ${service.toLowerCase()} services provided by ${siteConfig.name}.`,
  })),
  hero: {
    title: (config?.heroTitle || ["Comprehensive", "Solutions"]).join(" "),
    subtitle: config?.heroSubtitle || "Expert services tailored to your needs",
  },
  pullQuote: {
    eyebrow: "What we do",
    quote: config?.primaryQuote || "Excellence in every detail. Your success is our mission.",
  },
  primary: {
    introduction:
      config?.primaryIntro ||
      `${siteConfig.name} provides comprehensive professional services across ${siteConfig.business.expertise.join(", ").toLowerCase()}. Our expertise and dedication ensure exceptional results for every client.`,
    services: (config?.primarySections || [
      {
        title: siteConfig.business.expertise[0] || "Core Service 1",
        description: `Comprehensive solutions in ${siteConfig.business.expertise[0]?.toLowerCase() || "our primary service area"}. We deliver results through expertise, dedication, and attention to detail.`,
        areas: [
          "Strategic Planning",
          "Implementation",
          "Analysis & Optimization",
          "Ongoing Support",
          "Custom Solutions",
        ],
      },
      {
        title: siteConfig.business.expertise[1] || "Core Service 2",
        description: `Expert services in ${siteConfig.business.expertise[1]?.toLowerCase() || "our secondary service area"}. Our approach combines industry knowledge with innovative strategies.`,
        areas: [
          "Consultation",
          "Strategy Development",
          "Execution",
          "Quality Assurance",
          "Results Tracking",
        ],
      },
      {
        title: siteConfig.business.expertise[2] || "Core Service 3",
        description: `Specialized expertise in ${siteConfig.business.expertise[2]?.toLowerCase() || "our tertiary service area"}. We provide tailored solutions that meet your unique needs.`,
        areas: ["Assessment", "Planning", "Implementation", "Monitoring", "Optimization"],
      },
    ]).map(({ title, description, areas }) => ({ title, description, areas })),
  },
  additional: {
    introduction:
      config?.secondaryIntro ||
      `We serve clients across ${siteConfig.business.serviceAreas.join(", ")} with the same level of dedication and expertise that has built our reputation for excellence.`,
    services: (config?.secondarySections || [
      {
        title: "Consultation Services",
        description:
          "Expert guidance and strategic advice to help you make informed decisions and achieve your goals.",
        areas: [
          "Initial Assessment",
          "Strategic Planning",
          "Implementation Guidance",
          "Progress Review",
          "Ongoing Advisory",
        ],
      },
      {
        title: "Support Services",
        description:
          "Comprehensive support throughout your journey, ensuring you have the resources and assistance needed for success.",
        areas: [
          "Technical Support",
          "Customer Service",
          "Training & Education",
          "Documentation",
          "Emergency Assistance",
        ],
      },
      {
        title: "Specialized Solutions",
        description:
          "Custom-tailored services designed to address your specific challenges and opportunities.",
        areas: [
          "Custom Development",
          "Specialized Analysis",
          "Targeted Implementation",
          "Performance Optimization",
          "Results Measurement",
        ],
      },
    ]).map(({ title, description, areas }) => ({ title, description, areas })),
    highlights: config?.additionalAreas || [
      "Free Initial Consultation",
      "Customized Service Plans",
      "Transparent Pricing",
      "Flexible Scheduling",
      "Dedicated Support",
    ],
  },
  howWeWork: {
    title: "A process built for clarity",
    description:
      "Every engagement follows the same simple rhythm, so you always know what happens next.",
    steps: [
      {
        title: "Discovery call",
        description:
          "We start with a conversation about where you are, where you want to be, and what's standing in the way.",
      },
      {
        title: "Plan & proposal",
        description:
          "You get a clear scope, timeline, and price — no surprises, no padding, no fine print.",
      },
      {
        title: "Execution",
        description:
          "We do the work with regular check-ins along the way, so you're never left wondering about progress.",
      },
      {
        title: "Review & iterate",
        description:
          "We measure results against the plan, refine what needs refining, and set up what comes next.",
      },
    ],
  },
  cta: {
    heading: config?.additionalTitle || "Let's work together",
    description:
      config?.additionalDescription ||
      "Ready to work with us? Contact our team to discuss your needs and learn how we can help you achieve your goals.",
    buttonText: "Contact us today",
  },
}
