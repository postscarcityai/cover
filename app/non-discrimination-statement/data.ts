import { siteConfig } from "@/site.config"

export interface NonDiscriminationData {
  hero: { eyebrow: string; title: string; breadcrumbs: Array<{ label: string; href?: string }> }
  intro: string
  sections: Array<{
    title: string
    content: string
    listItems?: string[]
    contactItems?: readonly ("phone" | "email" | "mail")[]
  }>
}

export function getNonDiscriminationData(): NonDiscriminationData {
  return {
    hero: {
      eyebrow: "Legal",
      title: "Non-Discrimination Statement",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Non-Discrimination Statement" }],
    },
    intro: `${siteConfig.name} is committed to providing equal access and opportunity in all of its services, programs, and activities. We do not discriminate on the basis of race, color, national origin, age, disability, sex, sexual orientation, gender identity, religion, veteran status, or any other characteristic protected by applicable law.`,
    sections: [
      {
        title: "Our Commitment",
        content:
          "We are dedicated to creating an inclusive environment where all clients, partners, and visitors are treated with dignity and respect. This commitment extends to all aspects of our operations including:",
        listItems: [
          "Service delivery and client interactions",
          "Employment practices and hiring",
          "Website accessibility and digital communications",
          "Physical office access and accommodations",
        ],
      },
      {
        title: "Language Assistance",
        content:
          "If you need language assistance services, please contact us. We will make every reasonable effort to provide services in your preferred language or arrange for interpretation.",
      },
      {
        title: "Disability Accommodations",
        content:
          "If you require accommodations due to a disability, please let us know. We are committed to providing reasonable accommodations to ensure equal access to our services.",
      },
      {
        title: "Filing a Complaint",
        content: "If you believe you have been discriminated against, you may file a complaint by contacting us:",
        contactItems: ["phone", "email", "mail"] as const,
      },
    ],
  }
}
