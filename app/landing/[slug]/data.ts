import { siteConfig } from "@/site.config"

export interface LandingPageConfig {
  slug: string
  meta: {
    title: string
    description: string
    keywords: string[]
  }
  hero: {
    title: string
    subtitle: string
    ctaText: string
    ctaHref: string
  }
  sections: Array<{
    type: 'text' | 'features' | 'cta' | 'consultation'
    title?: string
    content?: string
    description?: string
    features?: Array<{ title: string; description: string }>
    ctaText?: string
    ctaHref?: string
    formTitle?: string
    formDescription?: string
    formButtonText?: string
  }>
}

/**
 * Define landing pages here. Each key is the URL slug.
 * Example: /landing/special-offer would use the 'special-offer' key.
 *
 * Add new landing pages by adding entries to this object.
 */
export const landingPageData: Record<string, LandingPageConfig> = {
  'example': {
    slug: 'example',
    meta: {
      title: `Special Offer | ${siteConfig.name}`,
      description: 'Take advantage of our limited-time offer.',
      keywords: [...siteConfig.seo.keywords, 'special offer', 'promotion'],
    },
    hero: {
      title: 'Limited Time Offer',
      subtitle: 'Get started today with an exclusive deal.',
      ctaText: 'Claim Your Offer',
      ctaHref: '/contact',
    },
    sections: [
      {
        type: 'features',
        title: 'Why Choose Us',
        features: [
          { title: 'Expert Team', description: 'Our experienced professionals deliver results.' },
          { title: 'Proven Track Record', description: 'Hundreds of satisfied clients.' },
          { title: 'Personalized Service', description: 'Tailored solutions for your needs.' },
        ],
      },
      {
        type: 'cta',
        title: 'Ready to Get Started?',
        content: 'Contact us today to take advantage of this offer.',
        ctaText: 'Get Started Now',
        ctaHref: '/contact',
      },
    ],
  },
}
