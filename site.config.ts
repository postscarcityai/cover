/**
 * Site Configuration
 *
 * Central configuration file for your marketing site.
 * Update these values for each new client project.
 */

import type { DesignTokens } from "@/theme.config"

export const siteConfig = {
  // Color overrides (see theme.config.ts for defaults)
  colors: {
    background: "#FAFAFA",
    surface: "#FFFFFF",
    muted: "#F3F3F5",
    border: "#E2E2E8",
    foreground: "#111118",
    mutedForeground: "#6B6B80",
    accent: "#B8941F",
    accentForeground: "#FFFFFF",
    fontHeading: "var(--font-instrument-serif), Georgia, serif",
    fontBody:
      "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  } as Partial<DesignTokens>,

  // Basic Site Information
  name: "PostScarcity AI",
  description: "We build the AI infrastructure that separates leaders from everyone else. Autonomous agents. Self-hosted intelligence. Production systems that compound while your competitors are still evaluating vendors.",
  url: "https://postscarcity.ai",

  // Contact Information
  contact: {
    phone: "+1 (305) 555-0100",
    phoneDisplay: "(305) 555-0100",
    email: "chris@postscarcity.ai",
    address: {
      street: "",
      city: "Miami",
      state: "FL",
      zip: "33101",
      country: "United States"
    }
  },

  // Business Information (for Schema.org)
  business: {
    type: "ProfessionalService",
    foundedYear: "2024",
    founder: {
      name: "Chris Johnston",
      title: "Founder"
    },
    employees: "1-10",
    serviceAreas: [
      "Miami-Dade",
      "Broward",
      "Palm Beach",
      "South Florida",
    ],
    expertise: [
      "AI Infrastructure",
      "Agent Setup & Management",
      "Claude Cowork",
      "Marketing Sites",
      "Custom Product Builds",
      "AI Training & Workshops",
      "Creative Production",
    ],
    paymentMethods: [
      "Credit Card",
      "Wire Transfer",
      "Check"
    ],
    openingHours: {
      enabled: true,
      is24_7: false,
      schedule: {
        monday: "9:00 AM - 6:00 PM",
        tuesday: "9:00 AM - 6:00 PM",
        wednesday: "9:00 AM - 6:00 PM",
        thursday: "9:00 AM - 6:00 PM",
        friday: "9:00 AM - 6:00 PM",
        saturday: "Closed",
        sunday: "Closed"
      }
    },
    coordinates: {
      latitude: "25.7617",
      longitude: "-80.1918"
    }
  },

  // Social Media Links
  social: {
    twitter: "https://twitter.com/postscarcityai",
    linkedin: "https://linkedin.com/company/postscarcityai",
    facebook: "",
    instagram: "",
    youtube: ""
  },

  // Navigation Menu Items
  // Supports optional submenu structure for dropdown navigation
  navigation: [
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] as Array<{
    label: string
    href: string
    submenu?: Array<{
      label: string
      items: Array<{ label: string; href: string }>
    }>
  }>,

  // Blog Configuration
  blog: {
    title: "Articles",
    basePath: "/blog",
    author: "Chris Johnston",
    postsPerPage: 10,
    categories: [
      "AI Infrastructure",
      "Case Studies",
      "Claude Cowork",
      "Engineering",
      "Practice"
    ]
  },

  // Newsletter Configuration
  newsletter: {
    enabled: true,
    title: "Stay Updated",
    description: "Get the latest news and insights delivered to your inbox.",
    buttonText: "Subscribe",
    // Privacy/compliance text
    privacyText: "We respect your privacy. Unsubscribe at any time.",
    source: "website" // Where subscriptions are coming from
  },

  // SEO & Metadata
  seo: {
    defaultTitle: "PostScarcity AI — AI Infrastructure for Leaders.",
    titleTemplate: "%s | PostScarcity AI",
    keywords: [
      "AI infrastructure",
      "AI agents",
      "Claude Cowork",
      "self-hosted AI",
      "South Florida AI",
      "business automation",
      "AI systems",
      "marketing sites",
      "custom AI builds",
      "local AI inference"
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "PostScarcity AI",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "PostScarcity AI — AI Infrastructure for Leaders."
        }
      ]
    },
    twitter: {
      handle: "@postscarcityai",
      site: "@postscarcityai",
      cardType: "summary_large_image"
    }
  },

  // Features - Toggle site features on/off
  features: {
    blog: true,
    newsletter: true,
    audioNarration: false, // Blog post audio narration
    whatsapp: false,
    liveChat: false,
    cookieConsent: false,
    exitIntentPopup: false,
    floatingCTA: false,
    smoothScroll: true,
    navigationScrollHide: true,
    /** Gold ribbon WebGL accent above the nav wordmark (see NavLogoGoldWaves). */
    navLogoGoldWaves: true,
  },

  // Analytics & Tracking (IDs set in .env.local)
  analytics: {
    googleAnalytics: true, // Enable GA4
    googleTagManager: false,
    facebookPixel: false,
    linkedInInsight: false
  },

  // Announcement Banner (fixed bar at top of page)
  announcement: {
    enabled: false,
    text: "New: We've expanded our services. Check out what's new!",
    href: "/blog",
    dismissKey: "announcement-v1",
  } as {
    enabled: boolean
    text: string
    href?: string
    dismissKey: string
  },

  // Hero Section Configuration
  hero: {
    title: "Unlock Abundance",
    subtitle:
      "The companies that move first will own the next decade. We help you build the AI infrastructure ahead of the curve. Autonomous agents. Crafted Design. Always a human in the loop.",
    ctaPrimary: "Book a Call",
    ctaSecondary: "See the Work"
  },

  /** Home hero shell: gradient, typography ink, and dot-field tint (injected as CSS vars) */
  heroShell: {
    gradientA: "#F2F5FB",
    gradientB: "#EDF1F9",
    gradientC: "#E8EDF7",
    inkDeep: "#0E1C2F",
    inkMid: "#3D4F6B",
    inkMuted: "#7B8BA5",
    /** `color-mix` percent: hero ink mid vs white (see theme-injector `--hero-dot-fg`) */
    dotInkMixPercent: 28,
  },

  // Services Section Configuration
  servicesSection: {
    title: "What We Build",
    description: "AI systems that ship in weeks, not quarters. We scope, build, and deploy — then stay as long as the advantage demands it."
  },

  // Achievements Section Configuration
  achievementsSection: {
    title: "Shipped & Running",
    description: "Production systems generating real results for companies that moved early."
  },

  // Commitment Section Configuration
  commitment: {
    title: "How We Work",
    description: "Fast scope. Rapid build. Continuous edge. We don't do roadmaps that collect dust — we ship systems that compound.",
    ctaText: "Book a Call"
  },

  // Service Locations Configuration (for map component)
  serviceLocations: {
    title: "Our Service Areas",
    description: "We proudly serve clients across multiple regions.",
    subtitle: "Where We Serve",
    mapTitle: "Service Coverage Map",
    caption: "Available in select regions nationwide",
    states: [
      { name: "California", code: "CA" },
      { name: "Texas", code: "TX" },
      { name: "New York", code: "NY" },
      { name: "Florida", code: "FL" }
    ],
    points: [] // Optional: Add specific location markers like [{ name: "Office Name", coordinates: [lng, lat], state: "CA" }]
  },

  // Call-to-Action Settings
  cta: {
    primary: {
      text: "Book a Call",
      href: "/contact"
    },
    secondary: {
      text: "See the Work",
      href: "/work"
    },
    phone: {
      text: "Call Now",
      enabled: false
    }
  },

  // Consent & TCPA Notices
  // These are used across all forms. Variables like {companyName}, {phone}, and {emailDomain}
  // are interpolated at runtime by the getConsentText() helper below.
  consent: {
    emailDomain: "@postscarcity.ai",
    // Full TCPA checkbox notice (contact forms with explicit checkbox) — California-compliant
    tcpaFull: 'I consent to receive calls, texts, and emails from {companyName} and partners at my contact info, including automated messages. Not required for service. Message and data rates may apply. Reply STOP to opt out or contact {phone}.',
    // Shorter inline notice (consultation / quick forms without a checkbox)
    tcpaShort: 'By submitting, you consent to contact via phone, text, and email. Not required for service. Rates may apply.',
    // Newsletter-specific consent
    newsletter: 'I consent to receive email updates from {companyName}. Unsubscribe anytime.'
  },

  // Legal Pages
  legal: {
    privacyPolicy: "/privacy-policy",
    termsOfService: "/terms-of-service",
    cookiePolicy: "/cookie-policy",
    accessibilityStatement: "/accessibility-statement",
    nonDiscrimination: "/non-discrimination-statement"
  },

  // Optional Page Configurations
  contactPage: undefined as {
    conversionHeadline?: string
    conversionSubhead?: string
    trustBullets?: string[]
    testimonialQuote?: string
    testimonialAuthor?: string
    testimonialRole?: string
  } | undefined,

  servicesPage: undefined as {
    heroTitle?: string[]
    heroSubtitle?: string
    stat1Label?: string
    stat1Value?: string
    stat1Subtext?: string
    stat2Label?: string
    stat2Value?: string
    stat2Subtext?: string
    primaryIntro?: string
    primaryQuote?: string
    primarySections?: Array<{
      title: string
      description: string
      color: string
      icon: string
      areas: string[]
    }>
    secondaryIntro?: string
    secondaryQuote?: string
    secondarySections?: Array<{
      title: string
      description: string
      color: string
      icon: string
      areas: string[]
    }>
    additionalTitle?: string
    additionalDescription?: string
    additionalAreas?: string[]
  } | undefined,

  about: {
    description: "PostScarcity AI builds quiet infrastructure for businesses ready to operate with more space and less noise. Based in South Florida, serving everywhere.",
    heroTitle: "About PostScarcity AI",
    heroLocation: "in Miami, FL",
    introduction: "We named it PostScarcity because we believe you already have enough — enough ideas, enough ambition, enough work worth doing. What you don't have is the infrastructure to support it all. We build that infrastructure. AI agents, marketing sites, custom products, creative pipelines — quietly, on your hardware, under your control. So the repetitive parts run themselves and you can return your attention to the parts that actually need you.",
    stats: {
      experience: { value: "15+ Years", subtext: "Building Technology" },
      coverage: { label: "Service Area", value: "South Florida & Remote", subtext: "In-person or virtual, wherever you are" }
    },
    mission: {
      heading: "Our Approach",
      paragraphs: [
        "We're not here to add more tools to your stack. We're here to remove noise from your day. Every system we build — whether it's a Claude Cowork agent managing your inbox, a marketing site running on Cover, or a custom product we scope and ship — is designed to run quietly and stay out of your way.",
        "We believe the best infrastructure is the kind you forget about. It's just there, working, every morning when you open your laptop. Your data stays on your hardware. Your systems belong to you. We show up, build something that works, and stay involved as long as it makes sense.",
        "Every tool we've built is open source. Every system we deploy is yours. We don't rent you capability — we install it."
      ],
      quote: "The goal isn't more output. It's more space — for the work that actually matters."
    },
    coreValues: [
      {
        iconName: "Scale" as const,
        title: "Quiet Infrastructure",
        description: "We build systems that run without asking for your attention. Morning briefs before your day starts. Lead engines that surface prospects overnight. Content pipelines that deploy on their own. The best systems disappear into your routine."
      },
      {
        iconName: "Target" as const,
        title: "Yours Completely",
        description: "Your data stays on your hardware. Your systems belong to you — not a SaaS vendor. Self-hosted agents, local AI inference, zero cloud dependency. We install capability. We don't rent it."
      },
      {
        iconName: "Shield" as const,
        title: "Open Source, Open Handed",
        description: "Cover, Forge, Close, Recon — all MIT licensed. Clone them and build. Or let us deploy and manage them for you. Either way, nothing is locked behind a subscription. The tools are free. The craft is the service."
      }
    ],
    cta: {
      heading: "Start With a Conversation",
      paragraphs: [
        "Every engagement begins the same way. We listen. We learn your business, your tools, and where your time goes. No pitch deck. No urgency. Just honest questions about what you wish was already handled.",
      ],
      quote: "The goal isn't to automate people out of work — it's to automate the repetitive so the parts that matter get more attention, more energy, and more care.",
      buttonText: "Start a Conversation"
    }
  } as {
    description?: string
    heroTitle?: string
    heroLocation?: string
    introduction?: string
    stats?: {
      experience?: { value: string; subtext: string }
      coverage?: { label: string; value: string; subtext: string }
    }
    mission?: {
      heading: string
      paragraphs: string[]
      quote: string
    }
    coreValues?: Array<{
      iconName: 'Scale' | 'Target' | 'Shield'
      title: string
      description: string
    }>
    cta?: {
      heading: string
      paragraphs: string[]
      quote: string
      buttonText: string
    }
  } | undefined,

  teamMember: undefined as {
    metaDescription?: string
    keywords?: string[]
    personDescription?: string
    imageSrc?: string
    imageAlt?: string
    heroTitle?: string
    experience?: string
    statsLabel?: string
    statsValue?: string
    overviewTitle?: string
    overviewParagraphs?: string[]
    expertiseTitle?: string
    expertiseParagraphs?: string[]
    highlights?: string[]
    credentialsTitle?: string
    credentialsDescription?: string
    credentialsNote?: string
    licenses?: string[]
    certifications?: string[]
    leadershipTitle?: string
    leadershipParagraphs?: string[]
    leadershipHighlightTitle?: string
    leadershipHighlightItems?: string[]
    ctaTitle?: string
    ctaParagraphs?: string[]
    ctaQuote?: string
    ctaButton?: string
  } | undefined,

  // Credibility Badge Configuration (optional)
  credibility: undefined as {
    stats?: Array<{ value: string; label: string }>
    credentials?: string[]
    reviews?: Array<{
      platform: string
      rating: string
      count: string
      url: string
    }>
  } | undefined,

  disclaimer: undefined as {
    effectiveDate?: string
    lastUpdated?: string
    notice?: string
    general?: string
    results?: string
    professionalServices?: string
    serviceAreas?: string
    testimonials?: string
    additionalSections?: Array<{ title: string; content: string }>
  } | undefined
}

// Type export for TypeScript autocomplete
export type SiteConfig = typeof siteConfig

/**
 * Interpolates consent template strings with actual site config values.
 * Supported tokens: {companyName}, {phone}, {emailDomain}
 */
function interpolateConsent(template: string): string {
  return template
    .replace(/\{companyName\}/g, siteConfig.name)
    .replace(/\{phone\}/g, siteConfig.contact.phoneDisplay)
    .replace(/\{emailDomain\}/g, siteConfig.consent.emailDomain)
}

export function getConsentText(variant: 'tcpaFull' | 'tcpaShort' | 'newsletter'): string {
  return interpolateConsent(siteConfig.consent[variant])
}
