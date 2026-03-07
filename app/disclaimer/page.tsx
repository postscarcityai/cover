'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { siteConfig } from '@/site.config'

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-[#2A2C53] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            Website Disclaimer
          </h1>

          <p className="text-gray-600 mb-8">
            <strong>Effective Date:</strong> {siteConfig.disclaimer?.effectiveDate || "January 1, 2025"}<br/>
            <strong>Last Updated:</strong> {siteConfig.disclaimer?.lastUpdated || "January 1, 2025"}
          </p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <p className="text-yellow-800 font-medium">
                  <strong>IMPORTANT NOTICE.</strong> {siteConfig.disclaimer?.notice || "The information provided on this website is for general informational purposes only and should not be construed as professional advice. Consult with a qualified professional for specific guidance related to your situation."}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">General Disclaimer</h2>
              <p>
                {siteConfig.disclaimer?.general || `This website is designed for general information only. The information presented at this site should not be construed as professional advice. ${siteConfig.name} makes no representations or warranties regarding the accuracy, completeness, or suitability of the information provided.`}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">Results May Vary</h2>
              <p>
                {siteConfig.disclaimer?.results || `Results and outcomes depend upon a variety of factors unique to each situation. Past performance does not guarantee future results. The information on this website is not intended to create any guarantees or promises about specific outcomes.`}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">Professional Services</h2>
              <p>
                {siteConfig.disclaimer?.professionalServices || `${siteConfig.name} provides professional services in ${siteConfig.business.expertise.join(", ").toLowerCase()}. We maintain professional standards and comply with all applicable regulations in the jurisdictions where we operate.`}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">Service Areas</h2>
              <p>
                {siteConfig.disclaimer?.serviceAreas || `${siteConfig.name} serves clients in ${siteConfig.business.serviceAreas.join(", ")}. Services may be subject to geographic limitations and local regulations.`}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">Testimonials and Reviews</h2>
              <p>
                {siteConfig.disclaimer?.testimonials || "Any testimonials or reviews displayed on this website represent the experience of individual clients and should not be considered as a guarantee that similar results can be obtained for others. Every situation is different, and outcomes depend on specific circumstances."}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">Contact Information</h2>
              <p>
                For questions about this disclaimer or our services, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="font-medium">{siteConfig.name}</p>
                <p>Email: <a href={`mailto:${siteConfig.contact.email}`} className="text-[#2A2C53] hover:underline">{siteConfig.contact.email}</a></p>
                <p>Phone: <a href={`tel:${siteConfig.contact.phone}`} className="text-[#2A2C53] hover:underline">{siteConfig.contact.phoneDisplay}</a></p>
                <p className="mt-2 text-sm text-gray-600">
                  Service Areas: {siteConfig.business.serviceAreas.join(", ")}
                </p>
              </div>
            </section>

            {siteConfig.disclaimer?.additionalSections && siteConfig.disclaimer.additionalSections.map((section: any, index: number) => (
              <section key={index}>
                <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">{section.title}</h2>
                <p>{section.content}</p>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
