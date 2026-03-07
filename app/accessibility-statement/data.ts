import { siteConfig } from "@/site.config"

export interface AccessibilityStatementData {
  hero: { eyebrow: string; title: string; breadcrumbs: Array<{ label: string; href?: string }> }
  intro: string
  sections: Array<{
    title: string
    content?: string
    listItems?: string[]
    contactItems?: readonly ("phone" | "email")[]
  }>
}

export function getAccessibilityStatementData(): AccessibilityStatementData {
  return {
    hero: {
      eyebrow: "Legal",
      title: "Accessibility Statement",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Accessibility Statement" }],
    },
    intro: `${siteConfig.name} is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.`,
    sections: [
      {
        title: "Conformance Status",
        content:
          "We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines explain how to make web content more accessible for people with disabilities and more user-friendly for everyone.",
      },
      {
        title: "Measures We Take",
        listItems: [
          "Skip navigation links to bypass repetitive content",
          "Semantic HTML structure with proper heading hierarchy",
          "ARIA labels and roles for interactive elements",
          "Keyboard-accessible navigation and controls",
          "Sufficient color contrast ratios for text and interactive elements",
          "Alternative text for all meaningful images",
          "Route announcements for screen readers during page navigation",
          'Respect for user motion preferences via prefers-reduced-motion',
          "Focus indicators on all interactive elements",
        ],
      },
      {
        title: "Compatibility",
        content:
          "This website is designed to be compatible with the following assistive technologies:",
        listItems: [
          "Screen readers (NVDA, JAWS, VoiceOver)",
          "Screen magnification software",
          "Speech recognition software",
          "Keyboard-only navigation",
        ],
      },
      {
        title: "Feedback",
        content:
          "We welcome your feedback on the accessibility of this website. If you encounter accessibility barriers, please let us know:",
        contactItems: ["phone", "email"] as const,
      },
      {
        title: "Response Time",
        content: "We try to respond to feedback within 2 business days.",
      },
      {
        title: "Technical Specifications",
        content:
          "This website relies on the following technologies to work with your browser and any assistive technologies or plugins installed on your computer:",
        listItems: ["HTML", "WAI-ARIA", "CSS", "JavaScript"],
      },
    ],
  }
}
