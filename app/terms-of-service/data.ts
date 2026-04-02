import { siteConfig } from "@/site.config"

export interface TermsSection {
  id: string
  title: string
  notice?: string
  paragraphs: string[]
  paragraphsAfterList?: string[]
  listItems?: string[]
  subsections?: Array<{ title: string; content?: string; listItems?: string[] }>
}

export interface TermsOfServiceData {
  effectiveDate: string
  lastUpdated: string
  hero: { title: string; breadcrumbs: Array<{ label: string; href?: string }> }
  importantNotice: { title: string; content: string }
  sections: TermsSection[]
  contactSection: { title: string; intro: string }
}

export function getTermsOfServiceData(): TermsOfServiceData {
  return {
    effectiveDate: "January 1, 2025",
    lastUpdated: "January 1, 2025",
    hero: {
      title: "Terms of Service",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Terms of Service" }],
    },
    importantNotice: {
      title: "Important Notice",
      content:
        "Please read these Terms of Service carefully before using our website or services. By accessing or using our website, you agree to be bound by these terms. If you do not agree, please do not use our website.",
    },
    sections: [
      {
        id: "acceptance",
        title: "1. Acceptance of Terms",
        paragraphs: [
          `By accessing, browsing, or using the website of ${siteConfig.name} ("website," "our website," or "site"), you agree to be bound by all terms, conditions, and notices contained in this Terms of Service agreement ("Agreement").`,
          "If you do not agree to these terms, you should not access or use our website or services. Your continued use of our website constitutes your acceptance of these terms and any modifications we make to them.",
        ],
      },
      {
        id: "description",
        title: "2. Description of Services",
        paragraphs: [
          `${siteConfig.name} provides information about our services, expertise, and offerings through this website. The content on our website is intended for general informational purposes and may not reflect the most current developments or availability.`,
          "We reserve the right to modify, suspend, or discontinue any aspect of our website or services at any time without prior notice.",
        ],
      },
      {
        id: "no-relationship",
        title: "3. No Professional Relationship",
        paragraphs: [
          `Use of this website does not create a professional service relationship between you and ${siteConfig.name}. A professional relationship is only established through a formal, signed agreement between you and our organization.`,
          "Information provided on this website should not be considered professional advice specific to your situation. We recommend consulting directly with our team for personalized guidance.",
        ],
      },
      {
        id: "user-accounts",
        title: "4. User Accounts & Communications",
        paragraphs: [
          "When you submit information through our contact forms, newsletter signups, or other communication channels, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of any account credentials.",
          `By providing your contact information, you consent to receive communications from ${siteConfig.name} related to your inquiry. You may opt out of marketing communications at any time.`,
        ],
      },
      {
        id: "conditions",
        title: "5. Conditions of Use",
        subsections: [
          {
            title: "5.1 License Grant",
            content:
              "We grant you a limited, non-exclusive, non-transferable license to access and use this website for personal, non-commercial purposes. This license does not include the right to:",
            listItems: [
              "Copy, reproduce, or distribute website content without permission",
              "Modify or create derivative works from website content",
              "Use website content for commercial purposes or public display",
              "Reverse engineer, decompile, or attempt to discover source code",
              "Remove or alter any copyright, trademark, or proprietary notices",
              "Create automated scripts or bots to access our website",
            ],
          },
          {
            title: "5.2 Prohibited Activities",
            content: "You agree not to:",
            listItems: [
              "Use our website for any illegal purpose or in violation of applicable laws",
              "Transmit viruses, malware, or any code of a destructive nature",
              "Engage in unauthorized access to our website or systems",
              "Interfere with the operation or performance of our website",
              "Impersonate any person or entity or misrepresent your affiliation",
              "Transmit spam, unsolicited messages, or promotional material",
              "Submit false information or engage in fraudulent activity",
            ],
          },
        ],
        paragraphs: [],
      },
      {
        id: "disclaimer-warranties",
        title: "6. Disclaimer of Warranties",
        notice: 'This website and all content are provided "as is" without warranty of any kind.',
        paragraphs: [
          `${siteConfig.name} makes no warranties, express or implied, regarding:`,
        ],
        listItems: [
          "Merchantability or fitness for a particular purpose",
          "Accuracy, completeness, timeliness, or reliability of content",
          "Security, availability, or uninterrupted operation of the website",
          "Absence of viruses, malware, or other harmful components",
          "That website functions will meet your requirements or expectations",
        ],
        paragraphsAfterList: [
          "We disclaim all other warranties to the fullest extent permitted by law. Some jurisdictions do not allow disclaimers of implied warranties, so some of these disclaimers may not apply to you.",
        ],
      },
      {
        id: "limitation",
        title: "7. Limitation of Liability",
        notice: "Limitation of Liability and Damages",
        paragraphs: [
          `To the fullest extent permitted by law, ${siteConfig.name} shall not be liable for:`,
        ],
        listItems: [
          "Indirect, incidental, special, consequential, or punitive damages",
          "Loss of profits, revenue, data, business opportunities, or goodwill",
          "Damages arising from unauthorized access to your information",
          "Damages arising from your use or inability to use this website",
          "Damages arising from delays or interruptions in website availability",
        ],
        paragraphsAfterList: [
          "Some jurisdictions do not allow exclusion of consequential damages, so this limitation may not apply fully to you.",
        ],
      },
      {
        id: "intellectual-property",
        title: "8. Intellectual Property",
        paragraphs: [
          `All content on this website, including text, graphics, logos, images, audio, video, and software, is the exclusive property of ${siteConfig.name} or our content providers. All content is protected by applicable copyright, trademark, and intellectual property laws.`,
          "You may view and print copies of website content for personal, non-commercial use only. Any other use of our intellectual property without express written consent is strictly prohibited.",
          `"${siteConfig.name}" and all associated logos are trademarks of ${siteConfig.name}. You may not use these trademarks without our prior written consent.`,
        ],
      },
      {
        id: "third-party-links",
        title: "9. Third-Party Links",
        paragraphs: [
          "Our website may contain links to third-party websites and resources. We do not control, endorse, or guarantee the accuracy of these external resources. Your access to third-party websites is governed by their own terms and conditions.",
          "We are not responsible for the availability, accuracy, or content of third-party websites, or for any damages arising from your use of them.",
        ],
      },
      {
        id: "privacy",
        title: "10. Privacy & Data",
        paragraphs: [
          'Your use of our website is also governed by our <a href="/privacy-policy" class="underline" style="color: var(--accent)">Privacy Policy</a>, which describes how we collect, use, and protect your personal information. By using our website, you consent to the practices described in our Privacy Policy.',
        ],
      },
      {
        id: "indemnification",
        title: "11. Indemnification",
        paragraphs: [
          `You agree to indemnify, defend, and hold harmless ${siteConfig.name} and its affiliates from any claims, damages, losses, costs, and expenses arising from:`,
        ],
        listItems: [
          "Your use of our website or services",
          "Breach of these Terms of Service",
          "Violation of applicable laws or regulations",
          "Violation of third-party rights",
          "Any content you submit or provide to us",
        ],
      },
      {
        id: "governing-law",
        title: "12. Governing Law & Disputes",
        paragraphs: [
          `These Terms of Service are governed by and construed in accordance with the laws of the state in which ${siteConfig.name} is headquartered, without regard to conflict of law provisions.`,
          "Before initiating any formal proceedings, we encourage you to contact us to attempt to resolve any disputes informally. Any disputes that cannot be resolved informally shall be subject to the exclusive jurisdiction of the courts in the jurisdiction where our firm maintains its principal place of business.",
        ],
      },
      {
        id: "changes",
        title: "13. Changes to These Terms",
        paragraphs: [
          "We reserve the right to modify these Terms of Service at any time. Modifications become effective upon posting to our website. Your continued use of our website following any modifications constitutes your acceptance of the updated terms. We encourage you to review these terms periodically.",
        ],
      },
      {
        id: "severability",
        title: "14. Severability",
        paragraphs: [
          "If any provision of these Terms of Service is found to be invalid or unenforceable, that provision shall be severed, and the remaining provisions shall remain in full force and effect.",
        ],
      },
      {
        id: "termination",
        title: "15. Termination",
        paragraphs: [
          "We may terminate your access to our website at any time and for any reason, with or without notice. Upon termination, your right to use the website immediately ceases. Provisions relating to intellectual property, liability limitations, warranties, and governing law survive termination.",
        ],
      },
      {
        id: "entire-agreement",
        title: "16. Entire Agreement",
        paragraphs: [
          `These Terms of Service, together with our Privacy Policy, constitute the entire agreement between you and ${siteConfig.name} regarding your use of our website. These terms supersede all prior agreements and understandings regarding the subject matter.`,
        ],
      },
    ],
    contactSection: {
      title: "17. Contact Information",
      intro: "If you have questions about these Terms of Service, please contact us:",
    },
  }
}
