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
      title: siteConfig.hero?.title || "Your Main Headline",
      subtitle: siteConfig.hero?.subtitle || "Your Secondary Headline",
      description: siteConfig.description,
      ctaPrimaryText: siteConfig.hero?.ctaPrimary || "Get Started",
      ctaPrimaryHref: "/contact",
      ctaSecondaryText: siteConfig.hero?.ctaSecondary || "Learn More",
      ctaSecondaryHref: "/about",
      trustText: "Trusted by businesses nationwide",
    } satisfies HeroContent,
  },
  {
    id: "stats",
    type: "stats",
    content: {
      stats: [
        { value: "500", label: "Clients Served", suffix: "+" },
        { value: "98", label: "Satisfaction Rate", suffix: "%" },
        { value: "15", label: "Years Experience", suffix: "+" },
        { value: "24/7", label: "Support Available" },
      ],
    } satisfies StatsContent,
  },
  {
    id: "features",
    type: "features",
    numbered: true,
    content: {
      eyebrow: "What We Offer",
      title: "Services Designed for Your Success",
      description:
        "Comprehensive solutions tailored to meet your unique needs.",
      features: [
        {
          icon: "Shield",
          title: "Expert Guidance",
          description:
            "Strategic advice to help you navigate complex challenges with confidence.",
        },
        {
          icon: "Target",
          title: "Results-Driven Approach",
          description:
            "Measurable outcomes that make a real difference for your business.",
        },
        {
          icon: "Zap",
          title: "Fast Turnaround",
          description:
            "Quality results delivered efficiently, because your time matters.",
        },
        {
          icon: "Users",
          title: "Dedicated Support",
          description:
            "Personalized attention from a team that genuinely cares about your success.",
        },
        {
          icon: "BarChart",
          title: "Data-Driven Insights",
          description:
            "Informed decisions backed by thorough analysis and industry expertise.",
        },
        {
          icon: "Globe",
          title: "Nationwide Reach",
          description:
            "Localized knowledge and broad capabilities across the country.",
        },
      ],
    } satisfies FeaturesContent,
  },
  {
    id: "content",
    type: "content",
    content: {
      blocks: [
        {
          eyebrow: "Our Story",
          title: "Committed to Excellence Since Day One",
          description:
            "We believe in building lasting relationships through transparency, dedication, and exceptional service.",
          paragraphs: [
            "Every client deserves a team that listens, understands, and delivers. That's been our philosophy since we opened our doors.",
          ],
          imageAlt: "Our team at work",
          ctaText: "About Us",
          ctaHref: "/about",
        },
        {
          eyebrow: "Our Process",
          title: "A Streamlined Experience",
          description:
            "We've refined our process to ensure every engagement is smooth, efficient, and effective.",
          imageAlt: "Our streamlined process",
          reverse: true,
        },
      ],
    } satisfies ContentSectionContent,
  },
  {
    id: "testimonials",
    type: "testimonials",
    content: {
      eyebrow: "Testimonials",
      title: "What Our Clients Say",
      testimonials: [
        {
          quote:
            "Working with this team was a game-changer for our business. Their expertise and dedication exceeded our expectations.",
          author: "Sarah Johnson",
          role: "CEO",
          company: "Acme Corp",
        },
        {
          quote:
            "The level of professionalism and attention to detail is unmatched. I couldn't recommend them more highly.",
          author: "Michael Chen",
          role: "Director of Operations",
          company: "TechStart Inc",
        },
        {
          quote:
            "They took the time to understand our unique situation and delivered results that truly made a difference.",
          author: "Emily Rodriguez",
          role: "Founder",
          company: "GreenLeaf Solutions",
        },
      ],
    } satisfies TestimonialsContent,
  },
  {
    id: "cta",
    type: "cta",
    content: {
      title: "Ready to Get Started?",
      description:
        "Take the first step today. Schedule a free consultation and discover how we can help you achieve your goals.",
      ctaText: siteConfig.cta?.primary?.text || "Get Started",
      ctaHref: siteConfig.cta?.primary?.href || "/contact",
      secondaryCtaText: siteConfig.cta?.secondary?.text || "Learn More",
      secondaryCtaHref: siteConfig.cta?.secondary?.href || "/about",
    } satisfies CTAContent,
  },
  {
    id: "faq",
    type: "faq",
    content: {
      eyebrow: "FAQ",
      title: "Frequently Asked Questions",
      description: "Get answers to the questions we hear most often.",
      faqs: [
        {
          question: "What services do you offer?",
          answer:
            "We offer a comprehensive range of services designed to meet your specific needs. Contact us for a detailed consultation.",
        },
        {
          question: "How do I get started?",
          answer:
            "Simply reach out through our contact form or give us a call, and we'll schedule a free consultation.",
        },
        {
          question: "What areas do you serve?",
          answer:
            "We proudly serve clients across multiple states. Check our service areas page for complete coverage details.",
        },
        {
          question: "How long does the process take?",
          answer:
            "Timelines vary depending on your situation. During our initial consultation, we'll provide a realistic timeline.",
        },
        {
          question: "Do you offer free consultations?",
          answer:
            "Yes! We offer complimentary initial consultations to understand your needs and discuss how we can help.",
        },
      ],
    } satisfies FAQContent,
  },
]
