import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"
import { siteConfig } from "@/site.config"
import { getTermsOfServiceData } from "./data"

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: `Terms of Service for ${siteConfig.name}. Please read these terms carefully before using our website.`,
  keywords: [...siteConfig.seo.keywords, "terms of service", "terms and conditions"],
  alternates: {
    canonical: `${siteConfig.url}/terms-of-service`,
  },
  robots: { index: true, follow: true },
}

const sectionHeadingStyle = {
  fontFamily: "var(--font-heading)",
  color: "var(--accent)",
}

export default function TermsOfServicePage() {
  const data = getTermsOfServiceData()

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
          <div className="prose prose-lg max-w-none">
            <p className="mb-8" style={{ color: "var(--fg-muted)" }}>
              <strong>Effective Date:</strong> {data.effectiveDate}
              <br />
              <strong>Last Updated:</strong> {data.lastUpdated}
            </p>

            <div className="space-y-8 leading-relaxed" style={{ color: "var(--fg)" }}>
              <section>
                <div
                  className="border-l-4 p-4 rounded-r-lg"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--accent)",
                  }}
                >
                  <p className="font-semibold mb-2" style={{ color: "var(--fg)" }}>
                    {data.importantNotice.title}
                  </p>
                  <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
                    {data.importantNotice.content}
                  </p>
                </div>
              </section>

              {data.sections.map((section) => (
                <section key={section.id}>
                  <h2
                    className="text-2xl font-semibold mb-4"
                    style={sectionHeadingStyle}
                  >
                    {section.title}
                  </h2>

                  {section.notice && (
                    <div
                      className="border-l-4 p-3 rounded-r-lg mb-4"
                      style={{
                        backgroundColor: "var(--surface)",
                        borderColor: "var(--accent)",
                      }}
                    >
                      <p className="font-semibold text-sm" style={{ color: "var(--fg)" }}>
                        {section.notice}
                      </p>
                    </div>
                  )}

                  {section.paragraphs.map((p, i) => (
                    <p key={i} className={i > 0 ? "mt-4" : ""}>
                      {p.includes("<a ") ? (
                        <span dangerouslySetInnerHTML={{ __html: p }} />
                      ) : (
                        p
                      )}
                    </p>
                  ))}

                  {section.subsections?.map(
                    (sub, i) =>
                      sub.title && (
                        <div key={i} className="mt-4">
                          <h3
                            className="text-xl font-semibold mt-4 mb-2"
                            style={sectionHeadingStyle}
                          >
                            {sub.title}
                          </h3>
                          {sub.content && <p>{sub.content}</p>}
                          {sub.listItems && (
                            <ul className="list-disc ml-6 space-y-2 mt-2">
                              {sub.listItems.map((item, j) => (
                                <li key={j}>{item}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )
                  )}

                  {section.listItems && section.listItems.length > 0 && (
                    <ul className="list-disc ml-6 space-y-2 mt-2">
                      {section.listItems.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {section.paragraphsAfterList?.map((p, i) => (
                    <p key={i} className="mt-4">
                      {p}
                    </p>
                  ))}
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
                  className="p-6 rounded-lg mt-4 space-y-3"
                  style={{ backgroundColor: "var(--surface)" }}
                >
                  <p>
                    <strong>{siteConfig.name}</strong>
                  </p>
                  <p>
                    {siteConfig.contact.address.street}
                    <br />
                    {siteConfig.contact.address.city}, {siteConfig.contact.address.state}{" "}
                    {siteConfig.contact.address.zip}
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
                </div>
              </section>
            </div>
          </div>
        </SubpageSection>
      </main>
      <Footer />
    </div>
  )
}
