/**
 * Site Configuration
 *
 * This is the central configuration file for your marketing site.
 * Update these values for each new client project.
 */

export const siteConfig = {
  // Theme Selection
  // Available themes: 'professional', 'modern', 'elegant', 'minimal', 'warm'
  // Or create your own custom theme in theme.config.ts
  theme: 'professional' as 'professional' | 'modern' | 'elegant' | 'minimal' | 'warm',

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
          url: "/img/og-image.png",
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
    cookieConsent: false,
    smoothScroll: false, // GSAP smooth scrolling (requires gsap package)
    navigationScrollHide: false // Hide navigation on scroll down, show on scroll up (requires smoothScroll)
  },

  // Analytics & Tracking (IDs set in .env.local)
  analytics: {
    googleAnalytics: true, // Enable GA4
    googleTagManager: false,
    facebookPixel: false,
    linkedInInsight: false
  },

  // Hero Section Configuration
  hero: {
    title: "Your Main Headline",
    subtitle: "Your Secondary Headline",
    ctaPrimary: "Get Started",
    ctaSecondary: "Call Now"
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

  // Legal Pages
  legal: {
    privacyPolicy: "/privacy-policy",
    termsOfService: "/terms-of-service",
    cookiePolicy: "/cookie-policy"
  },

  // Optional Page Configurations
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
