import { siteConfig } from "@/site.config"

export interface TeamMemberData {
  person: {
    name: string
    title: string
    intro: string
  }
  overview: {
    title: string
    description: string
    paragraphs: string[]
    portraitSrc: string
    portraitAlt: string
  }
  leadership: {
    title: string
    description: string
    paragraphs: string[]
  }
  stats: Array<{ value: string; label: string; suffix?: string }>
  highlights: Array<{ icon: string; title: string; description: string }>
  credentials: {
    title: string
    licenses: string[]
    certifications: string[]
  }
  quote: string
  cta: {
    title: string
    description: string
    buttonText: string
  }
}

const founderName = siteConfig.business.founder.name || "Team Member Name"
const founderFirst = founderName.split(" ")[0]

const overviewParagraphs = siteConfig.teamMember?.overviewParagraphs || [
  `${founderName} is a recognized professional with extensive experience in ${siteConfig.business.expertise.join(", ").toLowerCase()}. With a commitment to excellence and client success, ${founderFirst} has built a reputation for delivering exceptional results.`,
  `Throughout their career, ${founderFirst} has worked with clients across ${siteConfig.business.serviceAreas.join(", ")}, providing strategic guidance and expert solutions tailored to each client's unique needs.`,
]

const leadershipParagraphs = siteConfig.teamMember?.leadershipParagraphs || [
  `Beyond professional practice, ${founderName} is actively involved in community initiatives and industry leadership roles.`,
  `As a resident of ${siteConfig.contact.address.city}, ${siteConfig.contact.address.state}, ${founderFirst} maintains strong connections with the local community and contributes to regional development.`,
]

export const teamMemberData: TeamMemberData = {
  person: {
    name: founderName,
    title: siteConfig.business.founder.title || "Team Leader",
    intro:
      siteConfig.teamMember?.personDescription ||
      `${siteConfig.teamMember?.heroTitle || "Professional"} serving clients across ${siteConfig.business.serviceAreas.join(", ")}.`,
  },
  overview: {
    title: siteConfig.teamMember?.overviewTitle || "Professional Background",
    description: overviewParagraphs[0],
    paragraphs: overviewParagraphs.slice(1),
    portraitSrc: siteConfig.teamMember?.imageSrc || "/img/style-guide/samples/sample-portrait.jpg",
    portraitAlt: siteConfig.teamMember?.imageAlt || `${founderName} professional portrait`,
  },
  leadership: {
    title: siteConfig.teamMember?.leadershipTitle || "Leadership & Community",
    description: leadershipParagraphs[0],
    paragraphs: leadershipParagraphs.slice(1),
  },
  stats: [
    {
      value: siteConfig.teamMember?.experience || "10+",
      label: "Years of Experience",
    },
    {
      value: siteConfig.teamMember?.statsValue || `${siteConfig.business.serviceAreas.length}+`,
      label: siteConfig.teamMember?.statsLabel || "Service Regions",
    },
    {
      value: String(siteConfig.business.expertise.length),
      label: "Areas of Expertise",
      suffix: "+",
    },
  ],
  highlights: [
    {
      icon: "Target",
      title: "Strategic Approach",
      description:
        "Every engagement starts with your goals. Solutions are shaped around outcomes, not templates, so the work stays focused on what matters to you.",
    },
    {
      icon: "Users",
      title: "Client Partnership",
      description:
        "Direct, responsive communication and a working relationship built on trust, transparency, and shared accountability for results.",
    },
    {
      icon: "Award",
      title: "Recognized Expertise",
      description: `Deep experience across ${siteConfig.business.expertise.join(", ").toLowerCase()}, backed by ongoing professional development and industry involvement.`,
    },
  ],
  credentials: {
    title: siteConfig.teamMember?.credentialsTitle || "Credentials & Qualifications",
    licenses: siteConfig.teamMember?.licenses || siteConfig.business.serviceAreas,
    certifications: siteConfig.teamMember?.certifications || [
      "Professional Certification (Example)",
      "Industry Qualification (Example)",
      "Specialized Training (Example)",
    ],
  },
  quote:
    siteConfig.teamMember?.ctaQuote ||
    "Delivering exceptional results through expertise and dedication.",
  cta: {
    title: siteConfig.teamMember?.ctaTitle || "Experience & Expertise You Can Trust",
    description:
      siteConfig.teamMember?.ctaParagraphs?.[0] ||
      `With extensive experience in ${siteConfig.business.expertise[0]?.toLowerCase() || "professional services"}, ${founderName} provides strategic guidance and expert solutions for clients across ${siteConfig.business.serviceAreas[0]} and beyond.`,
    buttonText: siteConfig.teamMember?.ctaButton || "Schedule Consultation",
  },
}
