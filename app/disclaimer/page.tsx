import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"
import { siteConfig } from "@/site.config"
import { getDisclaimerData } from "./data"

export const metadata: Metadata = {
  title: `Disclaimer | ${siteConfig.name}`,
  description: `Website disclaimer for ${siteConfig.name}. Important information about the use of our website.`,
  keywords: [...siteConfig.seo.keywords, "disclaimer", "legal notice"],
  alternates: {
    canonical: `${siteConfig.url}/disclaimer`,
  },
  robots: { index: true, follow: true },
}

const sectionHeadingStyle = {
  fontFamily: "var(--font-heading)",
  color: "var(--accent)",
}

function ContactLinks() {
  return (
    <ul className="list-disc pl-6 space-y-2">
      <li>
        Phone:{" "}
        <Link
          href={`tel:${siteConfig.contact.phone.replace(/[^\d]/g, "")}`}
          className="hover:underline"
          style={{ color: "var(--accent)" }}
        >
          {siteConfig.contact.phoneDisplay}
        </Link>
      </li>
      <li>
        Email:{" "}
        <Link
          href={`mailto:${siteConfig.contact.email}`}
          className="hover:underline"
          style={{ color: "var(--accent)" }}
        >
          {siteConfig.contact.email}
        </Link>
      </li>
      <li>
        Mail: {siteConfig.contact.address.street}, {siteConfig.contact.address.city},{" "}
        {siteConfig.contact.address.state} {siteConfig.contact.address.zip}
      </li>
    </ul>
  )
}

export default function DisclaimerPage() {
  const data = getDisclaimerData()

  return (
    <div className="min-h-screen">
      
        <SubpageHero
        title={data.hero.title}
        size="compact"
        breadcrumbs={data.hero.breadcrumbs}
      />
      <main id="main-content">
        <SubpageSection maxWidth="narrow">
          <div className="prose prose-lg max-w-none">
            <p className="mb-8" style={{ color: "var(--fg-muted)" }}>
              <strong>Effective Date:</strong> {data.effectiveDate}
              <br />
              <strong>Last Updated:</strong> {data.lastUpdated}
            </p>

            <div className="space-y-8 leading-relaxed" style={{ color: "var(--fg)" }}>
              {data.sections.map((section) => (
                <section key={section.id}>
                  {section.isNotice ? (
                    <div
                      className="border-l-4 p-4 mb-6 rounded-r-lg"
                      style={{
                        backgroundColor: "var(--surface)",
                        borderColor: "var(--accent)",
                      }}
                    >
                      <p className="font-medium" style={{ color: "var(--fg)" }}>
                        <strong>{section.title}</strong> {section.content}
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2
                        className="text-2xl font-semibold mb-4"
                        style={sectionHeadingStyle}
                      >
                        {section.title}
                      </h2>
                      <p>{section.content}</p>
                    </>
                  )}
                </section>
              ))}

              {/* Contact Section */}
              <section>
                <h2
                  className="text-2xl font-semibold mb-4"
                  style={sectionHeadingStyle}
                >
                  {data.contactSection.title}
                </h2>
                <p>{data.contactSection.intro}</p>
                <div
                  className="p-4 rounded-lg mt-4"
                  style={{ backgroundColor: "var(--surface)" }}
                >
                  <p className="font-medium">{siteConfig.name}</p>
                  <p>
                    Email:{" "}
                    <Link
                      href={`mailto:${siteConfig.contact.email}`}
                      className="hover:underline"
                      style={{ color: "var(--accent)" }}
                    >
                      {siteConfig.contact.email}
                    </Link>
                  </p>
                  <p>
                    Phone:{" "}
                    <Link
                      href={`tel:${siteConfig.contact.phone.replace(/[^\d]/g, "")}`}
                      className="hover:underline"
                      style={{ color: "var(--accent)" }}
                    >
                      {siteConfig.contact.phoneDisplay}
                    </Link>
                  </p>
                  <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>
                    Service Areas: {siteConfig.business.serviceAreas.join(", ")}
                  </p>
                </div>
              </section>

              {data.additionalSections?.map((section, index) => (
                <section key={index}>
                  <h2
                    className="text-2xl font-semibold mb-4"
                    style={sectionHeadingStyle}
                  >
                    {section.title}
                  </h2>
                  <p>{section.content}</p>
                </section>
              ))}
            </div>
          </div>
        </SubpageSection>
      </main>
      <Footer />
    </div>
  )
}
