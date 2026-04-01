import { siteConfig } from "@/site.config"

export type SectionType =
  | "hero"
  | "features"
  | "stats"
  | "content"
  | "testimonials"
  | "cta"
  | "faq"

export interface HeroContent {
  title: string
  subtitle: string
  description: string
  ctaPrimaryText: string
  ctaPrimaryHref: string
  ctaSecondaryText?: string
  ctaSecondaryHref?: string
  trustText?: string
  backgroundImages?: string[]
}

export interface Feature {
  icon?: string
  title: string
  description: string
}

export interface FeaturesContent {
  eyebrow?: string
  title: string
  description?: string
  features: Feature[]
}

export interface Stat {
  value: string
  label: string
  suffix?: string
}

export interface StatsContent {
  eyebrow?: string
  title?: string
  stats: Stat[]
}

export interface ContentBlock {
  eyebrow?: string
  title: string
  description: string
  paragraphs?: string[]
  imageSrc?: string
  imageAlt?: string
  reverse?: boolean
  ctaText?: string
  ctaHref?: string
}

export interface ContentSectionContent {
  blocks: ContentBlock[]
}

export interface Testimonial {
  quote: string
  author: string
  role?: string
  company?: string
  imageSrc?: string
}

export interface TestimonialsContent {
  eyebrow?: string
  title: string
  testimonials: Testimonial[]
}

export interface CTAContent {
  title: string
  description?: string
  ctaText: string
  ctaHref: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQContent {
  eyebrow?: string
  title: string
  description?: string
  faqs: FAQItem[]
}

export type SectionContent =
  | HeroContent
  | FeaturesContent
  | StatsContent
  | ContentSectionContent
  | TestimonialsContent
  | CTAContent
  | FAQContent

export interface HomepageSection {
  id: string
  type: SectionType
  content: SectionContent
  numbered?: boolean
}

export const homepageSections: HomepageSection[] = [
  {
    id: "hero",
    type: "hero",
    content: {
      title: siteConfig.hero?.title || "The companies that move first will own the next decade.",
      subtitle: siteConfig.hero?.subtitle || "We build the AI infrastructure that separates leaders from everyone else.",
      description: siteConfig.description,
      ctaPrimaryText: siteConfig.hero?.ctaPrimary || "Book a Call",
      ctaPrimaryHref: "/contact",
      ctaSecondaryText: siteConfig.hero?.ctaSecondary || "See the Work",
      ctaSecondaryHref: "/work",
      trustText: "Autonomous agents. Self-hosted intelligence. Zero vendor lock-in.",
    } satisfies HeroContent,
  },
  {
    id: "what-we-do",
    type: "content",
    content: {
      blocks: [
        {
          eyebrow: "The Thesis",
          title: "AI Isn't a Feature. It's the New Operating System.",
          description:
            "Every company will run on AI agents within five years. The ones building that infrastructure now will have a compounding advantage that's nearly impossible to close. The ones waiting will be hiring consultants to catch up.",
          paragraphs: [
            "We build the systems that give you that head start. Autonomous agents that handle lead generation, client onboarding, content production, intelligence gathering, and operational workflows — running on hardware you own, trained on data you control.",
            "This isn't about saving time on email. It's about building an operational layer that gets smarter every week, scales without headcount, and belongs entirely to you.",
          ],
          imageAlt: "PostScarcity AI infrastructure",
          ctaText: "See What We Build",
          ctaHref: "/services",
        },
      ],
    } satisfies ContentSectionContent,
  },
  {
    id: "principles",
    type: "features",
    numbered: false,
    content: {
      eyebrow: "Why Us",
      title: "Built for the Long Game",
      description:
        "We don't build demos. We build production infrastructure that compounds over time — systems that get more valuable the longer they run.",
      features: [
        {
          icon: "Shield",
          title: "Self-Hosted. Self-Owned.",
          description:
            "Your AI runs on your hardware. Your data never touches a third-party cloud. When the vendor landscape shifts — and it will — you're insulated.",
        },
        {
          icon: "Zap",
          title: "Agents, Not Chatbots",
          description:
            "Systems that reason, decide, and execute across your entire stack. Email, CRM, Slack, GitHub, calendar — orchestrated without human prompting.",
        },
        {
          icon: "Target",
          title: "Compounding Returns",
          description:
            "Every workflow we automate feeds data back into your system. Your AI gets sharper every week. That's the moat your competitors can't buy off the shelf.",
        },
        {
          icon: "Users",
          title: "Ship Fast, Stay Sharp",
          description:
            "Production in weeks, not quarters. We scope, build, deploy, and iterate. No roadmaps gathering dust. No committees. Just velocity.",
        },
      ],
    } satisfies FeaturesContent,
  },
  {
    id: "tools",
    type: "features",
    numbered: false,
    content: {
      eyebrow: "Open Source Arsenal",
      title: "The Stack That Powers Everything",
      description:
        "Four production-grade tools, MIT licensed. Battle-tested across real engagements. Fork them. Deploy them. Or let us run them for you at scale.",
      features: [
        {
          icon: "Globe",
          title: "Cover",
          description:
            "High-performance marketing sites in days. Single config, infinite themes, built-in analytics. The foundation under every site we ship.",
        },
        {
          icon: "Zap",
          title: "Forge",
          description:
            "AI-native creative production. 21-tool MCP server wired directly into coding agents. Image, video, and asset generation at machine speed.",
        },
        {
          icon: "BarChart",
          title: "Close",
          description:
            "Contract CRM built for operators. Pipeline tracking, auto-generated MSA/SOW docs, deal intelligence. No enterprise bloat.",
        },
        {
          icon: "Target",
          title: "Recon",
          description:
            "Autonomous lead intelligence. Scans markets, enriches contacts, scores prospects — all on local AI inference. Zero cloud cost. Full data ownership.",
        },
      ],
    } satisfies FeaturesContent,
  },
  {
    id: "selected-work",
    type: "content",
    content: {
      blocks: [
        {
          eyebrow: "Case Study",
          title: "AMC Defense Law",
          description:
            "Full marketing site with AI-powered Justice Watch blog — generated imagery, audio narration, and a morning intelligence brief that pulls DoJ and FBI feeds before the attorney's first coffee.",
          imageAlt: "AMC Defense Law website",
          ctaText: "See the Build",
          ctaHref: "/work/amc-defense-law",
        },
        {
          eyebrow: "Case Study",
          title: "Finesse Plastic Surgery",
          description:
            "Premium practice site with consultation booking, patient resources, and a Vitest test suite gating every deploy. HIPAA-aware. Zero regressions shipped. Consultations up sharply since launch.",
          imageAlt: "Finesse Plastic Surgery website",
          reverse: true,
          ctaText: "See the Build",
          ctaHref: "/work/finesse",
        },
        {
          eyebrow: "Case Study",
          title: "Moon — Heathos Lead Intelligence",
          description:
            "A nationwide autonomous lead engine. Scans every major metro, enriches contacts through local AI inference, and delivers qualified prospects by morning. 1,800+ leads enriched. Zero cloud AI cost. The CEO said it \"mapped their known universe.\"",
          imageAlt: "Moon lead intelligence engine",
          ctaText: "See the Build",
          ctaHref: "/work/heathos-moon",
        },
      ],
    } satisfies ContentSectionContent,
  },
  {
    id: "testimonials",
    type: "testimonials",
    content: {
      eyebrow: "From the Field",
      title: "Early Movers",
      testimonials: [
        {
          quote:
            "The agent has mapped our known universe.",
          author: "Matt Paul",
          role: "CEO",
          company: "Heathos",
        },
        {
          quote:
            "People rave about the site, no one doesn't like it!",
          author: "Aaron",
          role: "Attorney",
          company: "AMC Defense Law",
        },
        {
          quote:
            "We have seen a sharp growth in consultations since we launched.",
          author: "Dr. Justin West",
          role: "Board-Certified Plastic Surgeon",
          company: "Finesse Plastic Surgery",
        },
      ],
    } satisfies TestimonialsContent,
  },
  {
    id: "cta",
    type: "cta",
    content: {
      title: "The window is open. Not for long.",
      description:
        "The AI infrastructure you build this year becomes the competitive moat you defend for the next ten. We're taking on a limited number of engagements. Let's talk about yours.",
      ctaText: "Book a Call",
      ctaHref: "/contact",
      secondaryCtaText: "See the Work",
      secondaryCtaHref: "/work",
    } satisfies CTAContent,
  },
  {
    id: "faq",
    type: "faq",
    content: {
      eyebrow: "FAQ",
      title: "Questions We Get",
      faqs: [
        {
          question: "What does PostScarcity AI actually build?",
          answer:
            "Production AI infrastructure — autonomous agents for lead generation, content production, intelligence gathering, client onboarding, and operational workflows. We also ship marketing sites, custom products, and creative production. Everything runs on our open-source stack (Cover, Forge, Close, Recon) paired with Claude Cowork for agent orchestration.",
        },
        {
          question: "What's Claude Cowork?",
          answer:
            "An AI agent orchestration layer that connects to your email, calendar, Slack, CRM, and other tools. It reasons, decides, and acts — handling real operational workflows without constant human prompting. We configure it, write the skills, and keep it running.",
        },
        {
          question: "How is this different from hiring an AI vendor?",
          answer:
            "Vendors rent you capability on their cloud. We install it on yours. Your data stays on your hardware. Your systems belong to you — no subscription cliffs, no vendor lock-in, no API rate limits. When the landscape shifts, you're insulated because you own the infrastructure.",
        },
        {
          question: "How fast can you ship?",
          answer:
            "Marketing sites in days. Agent systems in weeks. Full company transformation in 1-2 months. We scope fast, build fast, and iterate continuously. No six-month roadmaps.",
        },
        {
          question: "Do I need a technical team?",
          answer:
            "No. Our systems run without technical oversight. Your team learns to interact with the agents and adjust basic settings. Our care plan handles updates, monitoring, and optimization. Most clients treat it like electricity — it's just on.",
        },
        {
          question: "Is my data secure?",
          answer:
            "Self-hosted means your data never leaves your infrastructure. We configure sandboxing, firewall rules, and credential isolation on every engagement. No third-party vendor touches your business data.",
        },
        {
          question: "What does it cost?",
          answer:
            "Sites from $2K. Training from $500/session. Agent management from $2K/month. Custom builds from $5K. Full transformation is custom-scoped. We always scope before we quote.",
        },
        {
          question: "Are the tools really open source?",
          answer:
            "MIT licensed on GitHub. Fork them, deploy them, modify them. The tools are free. The expertise to deploy and orchestrate them at production scale — that's the service.",
        },
      ],
    } satisfies FAQContent,
  },
]
