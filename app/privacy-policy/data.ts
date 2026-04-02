import { siteConfig } from "@/site.config"

export interface PrivacyPolicySection {
  id: string
  title: string
  notice?: string
  paragraphs: string[]
  paragraphsAfterList?: Array<{ text: string; bold?: boolean }>
  subsections?: Array<{ title: string; content?: string | string[]; listItems?: string[] }>
  listItems?: string[]
}

export interface PrivacyPolicyData {
  effectiveDate: string
  lastUpdated: string
  hero: { title: string; breadcrumbs: Array<{ label: string; href?: string }> }
  sections: PrivacyPolicySection[]
  contactSection: {
    title: string
    intro: string
    disclaimer: string
  }
}

export function getPrivacyPolicyData(): PrivacyPolicyData {
  return {
    effectiveDate: "January 1, 2025",
    lastUpdated: "October 16, 2025",
    hero: {
      title: "Privacy Policy",
      breadcrumbs: [{ label: "Home", href: "/" }, { label: "Privacy Policy" }],
    },
    sections: [
      {
        id: "introduction",
        title: "1. Introduction & Scope",
        paragraphs: [
          `${siteConfig.name} ("firm," "we," "our," or "us") is committed to protecting your privacy and ensuring you have a positive experience on our website and in our interactions with you. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information.`,
          "This policy applies to information collected through our website, email communications, phone calls, in-person meetings, and any other channels through which you interact with our firm. Please read this policy carefully. If you do not agree with our policies and practices, please do not use our website or services.",
        ],
      },
      {
        id: "information-we-collect",
        title: "2. Information We Collect",
        subsections: [
          {
            title: "2.1 Information You Provide Directly",
            content: "We collect information you voluntarily provide to us, including:",
            listItems: [
              "Contact Information: Name, email address, phone number, mailing address, and date of birth",
              "Legal Information: Details about your legal matter, case information, charges, and circumstances",
              "Financial Information: Payment information, billing address, and retainer agreements (processed securely)",
              "Communication Records: Messages, emails, voicemails, and other correspondence with our firm",
              "Document Information: Copies of identification, government documents, court papers, and other case materials",
              "Emergency Contact Information: Names and contact details of family members or designated contacts",
              "Newsletter Subscriptions: Email address for receiving case results and legal updates",
            ],
          },
          {
            title: "2.2 Information Collected Automatically",
            content: "",
            listItems: [
              "Usage Data: Pages visited, time spent on pages, links clicked, referral sources",
              "Device Information: Browser type, operating system, device type, IP address",
              "Cookie Data: Information collected through cookies and similar tracking technologies",
              "Analytics Information: Aggregated data about website performance and user behavior",
            ],
          },
          {
            title: "2.3 Third-Party Information",
            content:
              "We may receive information about you from third parties, including law enforcement agencies, courts, opposing counsel, expert witnesses, and other parties involved in legal proceedings.",
          },
        ],
        paragraphs: [],
      },
      {
        id: "how-we-use",
        title: "3. How We Use Your Information",
        paragraphs: ["We use the information we collect for the following purposes:"],
        listItems: [
          "Providing legal services and representation in your case",
          "Communicating with you about your matter and legal representation",
          "Preparing legal documents, motions, and court filings",
          "Conducting legal research and case strategy development",
          "Billing and financial management",
          "Complying with court orders, legal obligations, and professional responsibility rules",
          "Protecting our firm's legal rights and interests",
          "Preventing fraud and enhancing website security",
          "Improving our website and services (with your consent)",
          "Sending newsletters and legal updates (with your consent)",
          "Responding to inquiries and requests for information",
        ],
      },
      {
        id: "attorney-client-privilege",
        title: "4. Critical: Attorney-Client Privilege & Confidentiality",
        notice:
          "IMPORTANT NOTICE: Information submitted through our website contact form, email, or initial phone consultations is NOT automatically protected by attorney-client privilege or attorney work product doctrine. Privilege only applies AFTER a formal attorney-client relationship is established through a signed engagement agreement and a retainer is received.",
        subsections: [
          {
            title: "Until an attorney-client relationship is formally established:",
            listItems: [
              "Your communications are NOT privileged and may be discoverable",
              "We may discuss your information with third parties as needed",
              "Your information is not protected as confidential",
              "We are not bound to represent you or keep information confidential",
            ],
          },
          {
            title: "Once a formal attorney-client relationship is established through a signed engagement agreement:",
            listItems: [
              "Communications become privileged under Florida and federal law",
              "Information is protected by attorney-client privilege and work product doctrine",
              "We maintain strict confidentiality obligations",
              "Information cannot be disclosed without your consent (with limited legal exceptions)",
            ],
          },
        ],
        paragraphs: [],
      },
      {
        id: "information-sharing",
        title: "5. Information Sharing & Disclosure",
        subsections: [
          {
            title: "5.1 General Sharing Practices",
            content:
              "We do not sell, trade, rent, or otherwise transfer your personal information to third parties without your consent, except as required or permitted by law or professional regulations.",
          },
          {
            title: "5.2 Mandatory Disclosures",
            content: "We may disclose information without consent when required by:",
            listItems: [
              "Court orders, subpoenas, or legal process",
              "Law enforcement investigations",
              "Professional responsibility and ethical obligations",
              "Florida Statutes and federal laws",
              "Bar Association rules and regulations",
            ],
          },
          {
            title: "5.3 Service Providers",
            content:
              "We use third-party service providers to assist in operating our business, including website hosting, payment processing, cloud storage, and document management. These providers are contractually obligated to maintain confidentiality and use information only for purposes necessary to provide services to us.",
          },
          {
            title: "5.4 Legal Proceedings",
            content:
              "Information may be disclosed in connection with legal proceedings, including litigation, bankruptcy, or regulatory investigations. We may also disclose information to protect our firm's legal rights, prevent fraud, or respond to claims.",
          },
          {
            title: "5.5 Case Team & Associates",
            content:
              "Your information is shared with members of our legal team, paralegals, and associates as necessary to provide competent representation. We may consult with expert witnesses, investigators, and other professionals as your case requires.",
          },
        ],
        paragraphs: [],
      },
      {
        id: "data-security",
        title: "6. Data Security & Protection",
        paragraphs: [
          "We implement industry-standard technical, administrative, and physical security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:",
        ],
        listItems: [
          "Encrypted data transmission (SSL/TLS certificates)",
          "Secure server infrastructure and firewalls",
          "Access controls and password protections",
          "Regular security audits and vulnerability assessments",
          "Secure file storage and document management systems",
          "Employee training on data protection and privacy",
          "Incident response procedures for data breaches",
        ],
        paragraphsAfterList: [
          {
            text: "However, no method of transmission over the internet or electronic storage is completely secure. We cannot guarantee absolute security of your information. You use our services at your own risk.",
            bold: true,
          },
        ],
      },
      {
        id: "data-retention",
        title: "7. Data Retention",
        paragraphs: [
          "We retain personal information as long as necessary to provide legal services, comply with legal obligations, resolve disputes, and maintain business records. Specifically:",
        ],
        listItems: [
          "Client Files: Retained for 7 years after case closure (Florida Bar requirement) or as required by law",
          "Financial Records: Retained for 7 years for tax and audit purposes",
          "Communications: Retained during representation and for 7 years thereafter",
          "Website Analytics: Retained for 24 months and then anonymized",
          "Email Communications: Retained for 7 years or longer if case-related",
        ],
        paragraphsAfterList: [
          {
            text: "After the retention period, information is securely deleted or destroyed unless longer retention is required by law.",
          },
        ],
      },
      {
        id: "your-rights",
        title: "8. Your Rights & Choices",
        subsections: [
          {
            title: "8.1 Access & Correction",
            content:
              "You have the right to request access to your personal information and request corrections to inaccurate data. Contact us using the information below to submit such requests.",
          },
          {
            title: "8.2 Deletion Requests",
            content:
              "You may request deletion of your personal information, except where we must retain it for legal, professional responsibility, or business purposes.",
          },
          {
            title: "8.3 Marketing Communications",
            content:
              'You may opt out of receiving promotional emails and newsletters at any time by clicking the "unsubscribe" link in any email or contacting us directly. Note: Even if you opt out of marketing, we will continue to send transactional communications related to your legal representation.',
          },
          {
            title: "8.4 Cookie Preferences",
            content:
              "You can adjust your browser settings to refuse cookies, though some website functionality may be limited.",
          },
          {
            title: "8.5 California & Other State Rights",
            content:
              "If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA). If you reside in other states with privacy laws (Virginia, Colorado, etc.), those rights may also apply.",
          },
        ],
        paragraphs: [],
      },
      {
        id: "third-party-links",
        title: "9. Third-Party Links & Services",
        paragraphs: [
          "Our website may contain links to third-party websites and services that we do not control. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any information.",
        ],
      },
      {
        id: "international-transfers",
        title: "10. International Data Transfers",
        paragraphs: [
          "If you access our website or services from outside the United States, please note that your information may be transferred to, stored in, and processed in the United States. By using our services, you consent to such transfers and processing.",
        ],
      },
      {
        id: "childrens-privacy",
        title: "11. Children's Privacy",
        paragraphs: [
          "Our website is not intended for children under 18. We do not knowingly collect personal information from children. If we become aware that a child has provided information, we will delete it promptly.",
        ],
      },
      {
        id: "changes",
        title: "12. Changes to This Privacy Policy",
        paragraphs: [
          'We may update this Privacy Policy at any time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by posting the revised policy on our website and updating the "Last Updated" date. Your continued use of our services following such changes constitutes your acceptance of the updated policy.',
        ],
      },
      {
        id: "compliance",
        title: "13. Compliance with Laws",
        paragraphs: ["We comply with applicable privacy laws, including:"],
        listItems: [
          "Florida Information Protection Act of 2014",
          "California Consumer Privacy Act (CCPA)",
          "California Privacy Rights Act (CPRA)",
          "Virginia Consumer Data Protection Act (VCDPA)",
          "Colorado Privacy Act (CPA)",
          "Applicable state data breach notification laws",
          "Federal laws protecting sensitive information",
          "Florida Rules of Professional Conduct and Bar Association requirements",
        ],
      },
      {
        id: "data-breach",
        title: "14. Data Breach Notification",
        paragraphs: [
          "If we discover a data breach or unauthorized access to your information, we will notify you promptly in accordance with applicable laws. We maintain an incident response plan and will take all necessary steps to mitigate harm.",
        ],
      },
    ],
    contactSection: {
      title: "15. Contact Us",
      intro:
        "If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:",
      disclaimer:
        "This Privacy Policy does not create any legal relationship between you and our firm until a formal attorney-client relationship is established. We reserve the right to modify this policy at any time. For the most current version, please visit this page regularly.",
    },
  }
}
