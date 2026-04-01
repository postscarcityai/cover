import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"
import { siteConfig } from "@/site.config"
import { getPrivacyPolicyData } from "./data"

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Privacy Policy for ${siteConfig.name}. Learn how we collect, use, and protect your personal information.`,
  keywords: [...siteConfig.seo.keywords, "privacy policy", "data protection", "confidentiality"],
  alternates: {
    canonical: `${siteConfig.url}/privacy-policy`,
  },
  robots: { index: true, follow: true },
}

const sectionHeadingStyle = {
  fontFamily: "var(--font-heading)",
  color: "var(--accent)",
}

export default function PrivacyPolicyPage() {
  const data = getPrivacyPolicyData()

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
                      className="border-l-4 p-4 rounded-r-lg mb-4"
                      style={{
                        backgroundColor: "var(--surface)",
                        borderColor: "var(--accent)",
                      }}
                    >
                      <p className="font-semibold" style={{ color: "var(--fg)" }}>
                        ⚠️ {section.notice}
                      </p>
                    </div>
                  )}

                  {section.paragraphs.map((p, i) => (
                    <p key={i} className={i > 0 ? "mt-4" : ""}>
                      {p}
                    </p>
                  ))}

                  {section.subsections?.map((sub, i) => (
                    <div key={i} className="mt-4">
                      {sub.title && (
                        <h3
                          className="text-xl font-semibold mt-4 mb-2"
                          style={sectionHeadingStyle}
                        >
                          {sub.title}
                        </h3>
                      )}
                      {typeof sub.content === "string" && sub.content && (
                        <p>{sub.content}</p>
                      )}
                      {sub.listItems && (
                        <ul className="list-disc ml-6 space-y-2 mt-2">
                          {sub.listItems.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  {section.listItems && section.listItems.length > 0 && (
                    <ul className="list-disc ml-6 space-y-2 mt-2">
                      {section.listItems.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {section.paragraphsAfterList?.map((p, i) => (
                    <p
                      key={i}
                      className={`mt-4 ${typeof p === "object" && p.bold ? "font-semibold" : ""}`}
                    >
                      {typeof p === "object" ? p.text : p}
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
                    <strong>Mailing Address:</strong>
                    <br />
                    {siteConfig.contact.address.street}
                    <br />
                    {siteConfig.contact.address.city}, {siteConfig.contact.address.state}{" "}
                    {siteConfig.contact.address.zip}
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    <Link
                      href={`tel:${siteConfig.contact.phone.replace(/[^\d]/g, "")}`}
                      className="hover:underline"
                      style={{ color: "var(--accent)" }}
                    >
                      {siteConfig.contact.phone}
                    </Link>
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <Link
                      href={`mailto:${siteConfig.contact.email}`}
                      className="hover:underline"
                      style={{ color: "var(--accent)" }}
                    >
                      {siteConfig.contact.email}
                    </Link>
                  </p>
                  <p>
                    <strong>Privacy Officer:</strong> Contact via email for privacy-specific
                    concerns
                  </p>
                </div>
              </section>

              <section
                className="p-4 rounded-lg mt-8"
                style={{ backgroundColor: "var(--surface)" }}
              >
                <p className="text-sm" style={{ color: "var(--fg-muted)" }}>
                  <strong>Disclaimer:</strong> {data.contactSection.disclaimer}
                </p>
              </section>
            </div>
          </div>
        </SubpageSection>
      </main>
      <Footer />
    </div>
  )
}
