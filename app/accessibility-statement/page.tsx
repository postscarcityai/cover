import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"
import { siteConfig } from "@/site.config"
import { getAccessibilityStatementData } from "./data"

export const metadata: Metadata = {
  title: `Accessibility Statement | ${siteConfig.name}`,
  description: `Our commitment to web accessibility and ensuring our website is accessible to people with disabilities.`,
  keywords: [
    ...siteConfig.seo.keywords,
    "accessibility statement",
    "ADA compliance",
    "WCAG",
    "web accessibility",
  ],
  alternates: {
    canonical: `${siteConfig.url}/accessibility-statement`,
  },
  robots: { index: true, follow: true },
}

const sectionHeadingStyle = {
  fontFamily: "var(--font-heading)",
  color: "var(--accent)",
}

function ContactItemsList({ items }: { items: readonly ("phone" | "email")[] }) {
  return (
    <ul className="list-disc pl-6 space-y-2">
      {items.includes("phone") && (
        <li>
          Phone:{" "}
          <Link
            href={`tel:${siteConfig.contact.phone.replace(/[^\d]/g, "")}`}
            className="underline hover:opacity-80 transition-opacity"
            style={{ color: "var(--accent)" }}
          >
            {siteConfig.contact.phoneDisplay}
          </Link>
        </li>
      )}
      {items.includes("email") && (
        <li>
          Email:{" "}
          <Link
            href={`mailto:${siteConfig.contact.email}`}
            className="underline hover:opacity-80 transition-opacity"
            style={{ color: "var(--accent)" }}
          >
            {siteConfig.contact.email}
          </Link>
        </li>
      )}
    </ul>
  )
}

export default function AccessibilityStatementPage() {
  const data = getAccessibilityStatementData()

  return (
    <div className="min-h-screen">
      
      <SubpageHero
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        size="compact"
        breadcrumbs={data.hero.breadcrumbs}
      />
      <main id="main-content">
        <SubpageSection maxWidth="narrow">
          <div
            className="prose prose-lg max-w-none space-y-6"
            style={{ fontFamily: "var(--font-body)", color: "var(--fg)" }}
          >
            <p>
              <strong>{siteConfig.name}</strong>
              {data.intro.replace(siteConfig.name, "").trimStart()}
            </p>

            {data.sections.map((section, i) => (
              <div key={i}>
                <h2
                  className="text-2xl font-bold mt-10 mb-4"
                  style={sectionHeadingStyle}
                >
                  {section.title}
                </h2>
                {section.content && <p>{section.content}</p>}
                {section.listItems && (
                  <ul className="list-disc pl-6 space-y-2">
                    {section.listItems.map((item, j) => (
                      <li key={j}>
                        {item.includes("prefers-reduced-motion") ? (
                          <>
                            {item.replace("prefers-reduced-motion", "").trimEnd()}{" "}
                            <code
                              className="rounded px-1.5 py-0.5"
                              style={{ backgroundColor: "var(--surface)" }}
                            >
                              prefers-reduced-motion
                            </code>
                          </>
                        ) : (
                          item
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                {section.contactItems && (
                  <ContactItemsList items={section.contactItems} />
                )}
              </div>
            ))}
          </div>
        </SubpageSection>
      </main>
      <Footer />
    </div>
  )
}
