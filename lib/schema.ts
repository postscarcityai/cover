/**
 * schema.org JSON-LD builders. Rendered via <JsonLd> (components/json-ld.tsx).
 * The sitewide Organization schema lives in app/layout.tsx and blog-specific
 * schema in lib/blog-schema.ts; these cover the per-page rich-result types
 * (FAQ snippets, breadcrumb trails).
 */
import { siteConfig } from "@/site.config"

export interface SchemaFaq {
  question: string
  answer: string
}

export function faqPageSchema(faqs: SchemaFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }
}

export interface SchemaCrumb {
  label: string
  /** Site-relative href; omitted on the current page (last crumb). */
  href?: string
}

export function breadcrumbSchema(crumbs: SchemaCrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      ...crumbs.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: crumb.label,
        ...(crumb.href ? { item: `${siteConfig.url}${crumb.href}` } : {}),
      })),
    ],
  }
}
