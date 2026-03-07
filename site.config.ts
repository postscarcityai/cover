/**
 * Site Configuration
 *
 * Central configuration file for your marketing site.
 * Update these values for each new client project.
 */

import type { DesignTokens } from "@/theme.config"

export const siteConfig = {
  // Color overrides (see theme.config.ts for defaults)
  // Only set the tokens you want to change per client
  colors: {
    accent: "#1a6b52",
  } as Partial<DesignTokens>,

  // Basic Site Information
  name: "Your Company Name",
  description: "Your company tagline or brief description",
  url: "https://yoursite.com",

  // Contact Information
  contact: {
    phone: "+1 (555) 123-4567",
    phoneDisplay: "(555) 123-4567",
    email: "contact@yoursite.com",
    address: {
      street: "123 Main Street",
      city: "Your City",
      state: "ST",
      zip: "12345",
      country: "United States"
    }
  },

  // Business Information (for Schema.org)
  business: {
    type: "Organization", // Organization, LocalBusiness, ProfessionalService, etc.
    foundedYear: "2024",
    founder: {
      name: "Founder Name",
      title: "CEO & Founder"
    },
    employees: "1-10",
    // Service areas (states, regions, or "Nationwide")
    serviceAreas: [
      "California",
      "New York",
      "Texas",
      // Add more as needed
    ],
    // What your business specializes in
    expertise: [
      "Service Area 1",
      "Service Area 2",
      "Service Area 3",
    ],
    // Payment methods accepted
    paymentMethods: [
      "Credit Card",
      "Debit Card",
      "Wire Transfer",
      "Check"
    ],
    // Operating hours (24/7 or specific hours)
    openingHours: {
      enabled: true,
      is24_7: false,
      // If not 24/7, specify hours:
      schedule: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 5:00 PM",
        saturday: "Closed",
        sunday: "Closed"
      }
    },
    // Geographic coordinates for local SEO
    coordinates: {
      latitude: "40.7128",
      longitude: "-74.0060"
    }
  },

  // Social Media Links
  social: {
    twitter: "https://twitter.com/yourcompany",
    linkedin: "https://linkedin.com/company/yourcompany",
    facebook: "https://facebook.com/yourcompany",
    instagram: "https://instagram.com/yourcompany",
    youtube: "https://youtube.com/@yourcompany"
  },

  // Navigation Menu Items
  // Supports optional submenu structure for dropdown navigation
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    // Example with submenu (uncomment to use):
    // {
    //   label: "About",
    //   href: "/about",
    //   submenu: [
    //     {
    //       label: "Meet the Team",
    //       items: [
    //         { label: "Team Member 1", href: "/about/team-member-1" },
    //         { label: "Team Member 2", href: "/about/team-member-2" }
    //       ]
    //     },
    //     {
    //       label: "Our Practice",
    //       items: [
    //         { label: "Our Office", href: "/about/office" },
    //         { label: "History", href: "/about/history" }
    //       ]
    //     }
    //   ]
    // }
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
    title: "Blog", // or "News", "Articles", "Insights", etc.
    basePath: "/blog", // URL path for blog
    author: "Company Name", // Default author name
    postsPerPage: 10,
    categories: [
      "Industry News",
      "How-To Guides",
      "Case Studies",
      "Company Updates"
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
    defaultTitle: "Your Company Name - Your Tagline",
    titleTemplate: "%s | Your Company Name",
    keywords: [
      "keyword 1",
      "keyword 2",
      "keyword 3",
      "keyword 4",
      "keyword 5"
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "Your Company Name",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Your Company Name"
        }
      ]
    },
    twitter: {
      handle: "@yourcompany",
      site: "@yourcompany",
      cardType: "summary_large_image"
    }
  },

  // Features - Toggle site features on/off
  features: {
    blog: true,
    newsletter: true,
    audioNarration: true, // Blog post audio narration
    whatsapp: false,
    liveChat: false,
    cookieConsent: true,
    exitIntentPopup: true,
    floatingCTA: true,
    smoothScroll: true,
    navigationScrollHide: true
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
    title: "Your Main Headline",
    subtitle: "Your Secondary Headline",
    ctaPrimary: "Get Started",
    ctaSecondary: "Learn More"
  },

  // Services Section Configuration
  servicesSection: {
    title: "What We Do",
    description: "Explore our comprehensive range of services designed to meet your needs."
  },

  // Achievements Section Configuration
  achievementsSection: {
    title: "Our Track Record",
    description: "Recent achievements and milestones that demonstrate our commitment to excellence"
  },

  // Commitment Section Configuration
  commitment: {
    title: "Our Commitment to Excellence",
    description: "We're dedicated to delivering exceptional results and building lasting relationships with every client we serve.",
    ctaText: "Get Started"
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
      text: "Get Started",
      href: "/contact"
    },
    secondary: {
      text: "Learn More",
      href: "/about"
    },
    phone: {
      text: "Call Now",
      enabled: true
    }
  },

  // Consent & TCPA Notices
  // These are used across all forms. Variables like {companyName}, {phone}, and {emailDomain}
  // are interpolated at runtime by the getConsentText() helper below.
  consent: {
    emailDomain: "@yoursite.com",
    // Full TCPA checkbox notice (contact forms with explicit checkbox) — California-compliant
    tcpaFull: 'I consent to receive calls, texts, and emails from {companyName} and partners at my contact info, including automated messages. Not required for service. Message and data rates may apply. Reply STOP to opt out or contact {phone}.',
    // Shorter inline notice (consultation / quick forms without a checkbox)
    tcpaShort: 'By submitting, you consent to contact via phone, text, and email. Not required for service. Rates may apply.',
    // Newsletter-specific consent
    newsletter: 'I consent to receive email updates from {companyName}. Unsubscribe anytime.',
    // Contact page disclaimer paragraphs
    contactDisclaimer: [
      'Contacting {companyName} does not create a business relationship.',
      'You consent to calls, texts, and emails. Not required for service. Rates may apply. Reply STOP to opt out or contact {phone}. Information submitted may not be confidential until a formal agreement exists.'
    ]
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

  about: undefined as {
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

export function getContactDisclaimer(): string[] {
  return siteConfig.consent.contactDisclaimer.map(interpolateConsent)
}
