'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { siteConfig } from '@/site.config'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-[#2A2C53] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            Terms of Service
          </h1>
          
          <p className="text-gray-600 mb-8">
            <strong>Effective Date:</strong> January 1, 2025<br/>
            <strong>Last Updated:</strong> October 16, 2025
          </p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section className="bg-red-50 p-4 rounded-lg border-l-4 border-red-600">
              <p className="font-semibold text-red-700 mb-2">⚠️ CRITICAL LEGAL DISCLAIMERS</p>
              <p className="text-sm">
                Please read these Terms of Service carefully. They contain important legal disclaimers, liability limitations, and information about your legal rights. By accessing our website or contacting our firm, you acknowledge that you have read and agree to be bound by these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">1. Acceptance of Terms & Conditions</h2>
              <p>
                By accessing, browsing, or using the website of {siteConfig.name} ("website," "our website," or "site"), and by contacting our firm through any communication channel (email, phone, form submission, in-person), you affirmatively accept and agree to be bound by all terms, conditions, and notices contained or referenced in this Terms of Service agreement ("Agreement").
              </p>
              <p className="mt-4">
                If you do not agree to these terms and conditions, you should not access, use, or interact with our website or services in any manner. Your continued use of our website and services constitutes your acceptance of these terms and any modifications we make to them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">2. No Attorney-Client Relationship</h2>
              
              <p className="font-semibold text-red-700 bg-red-50 p-4 rounded mb-4">
                ⚠️ IMPORTANT: Use of this website or contact with our firm does NOT create an attorney-client relationship.
              </p>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">2.1 Website Use</h3>
              <p>
                Merely accessing, viewing, or using this website does not establish an attorney-client relationship between you and {siteConfig.name}, its attorneys, or any person associated with our firm.
              </p>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">2.2 Initial Consultations</h3>
              <p>
                Initial phone calls, email consultations, or informal discussions do not create an attorney-client relationship. An attorney-client relationship is formed ONLY when:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>You and our firm have signed a written engagement agreement</li>
                <li>The firm has agreed to represent you in writing</li>
                <li>We have received payment of a retainer fee</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">2.3 Confidentiality Before Representation</h3>
              <p>
                Unless and until a formal attorney-client relationship is established:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Information you provide is NOT privileged or confidential</li>
                <li>Information is NOT protected by attorney-client privilege</li>
                <li>Information may be disclosed to third parties</li>
                <li>We have no obligation to keep information confidential</li>
                <li>We are not obligated to represent you or pursue your case</li>
                <li>We may decline representation at any time without cause</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">2.4 Once Representation Begins</h3>
              <p>
                Once a formal attorney-client relationship is established through a signed engagement agreement and retainer:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Communications become privileged under Florida law and federal law</li>
                <li>Information is protected by attorney-client privilege and work product doctrine</li>
                <li>We maintain strict confidentiality obligations</li>
                <li>We cannot disclose information without your consent (except as required by law or ethics rules)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">3. General Legal Disclaimers</h2>
              
              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">3.1 Information for General Purposes Only</h3>
              <p>
                All information, content, materials, and resources on this website (including blog posts, case results, practice area descriptions, legal analysis, videos, and any other content) are provided for general informational purposes only. This information is NOT tailored to your specific situation or legal needs.
              </p>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">3.2 Not Legal Advice</h3>
              <p>
                NOTHING ON THIS WEBSITE CONSTITUTES LEGAL ADVICE FOR ANY INDIVIDUAL CASE OR SITUATION. Content on our website is not a substitute for personal legal advice from a licensed attorney who has reviewed your specific facts and circumstances.
              </p>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">3.3 Case Results Not Guarantees</h3>
              <p>
                Case results, testimonials, and examples on our website reflect specific facts and circumstances of particular cases. Past results do not guarantee or predict future outcomes. Every case is unique and depends on individual facts, applicable law, judicial discretion, and numerous other factors.
              </p>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">3.4 Accuracy of Information</h3>
              <p>
                While we strive to keep information on our website accurate, current, and complete, we do not warrant the accuracy, completeness, or timeliness of any information. Laws change frequently, and information may become outdated. We do not monitor all legal developments continuously.
              </p>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">3.5 Jurisdictional Limitations</h3>
              <p>
                Attorneys licensed with our firm are licensed to practice law in specific jurisdictions only. We do not provide legal services outside our licensed jurisdictions unless we maintain admission or seek reciprocal admission. The information on our website is based primarily on Florida law. Laws vary significantly by jurisdiction, and the application of law in your specific jurisdiction may differ substantially.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">4. Conditions of Use & Permitted Activities</h2>
              
              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">4.1 License Grant</h3>
              <p>
                We grant you a limited, non-exclusive, non-transferable license to access and use this website and its content for personal, non-commercial purposes only. This license does not include the right to:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Download, copy, print (except for personal use), or retain website content</li>
                <li>Modify or create derivative works from website content</li>
                <li>Use website content for any commercial purpose or public display</li>
                <li>Rent, lease, sell, or transfer any website content</li>
                <li>Reverse engineer, decompile, or attempt to discover source code</li>
                <li>Remove or alter any copyright, trademark, or other proprietary notices</li>
                <li>Create automated scripts or bots to access our website</li>
                <li>Scrape, crawl, or extract data from our website without permission</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">4.2 Permitted Use</h3>
              <p>
                Your use of this website is permitted solely for the purpose of exploring potential legal services, obtaining general legal information, and communicating with our firm regarding potential representation. Any use beyond these purposes is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">5. Prohibited Activities</h2>
              <p>You agree not to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Use our website for any illegal purpose or in violation of any applicable laws</li>
                <li>Transmit viruses, malware, or any code of destructive nature</li>
                <li>Engage in unauthorized access to our website or systems</li>
                <li>Attempt to circumvent security measures or gain unauthorized access</li>
                <li>Interfere with the operation or performance of our website</li>
                <li>Impersonate any person or entity or falsely state affiliation</li>
                <li>Transmit spam, unsolicited messages, or promotional material</li>
                <li>Harass, abuse, threaten, or defame any person</li>
                <li>Violate any person's intellectual property, privacy, or other rights</li>
                <li>Submit false information or engage in fraudulent activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">6. Disclaimer of Warranties</h2>
              
              <p className="font-semibold bg-gray-100 p-3 rounded mb-4">
                WE PROVIDE THIS WEBSITE AND ALL CONTENT "AS IS" WITHOUT WARRANTY OF ANY KIND.
              </p>

              <p>
                {siteConfig.name} and all persons and entities affiliated with our firm make NO warranties, express or implied, regarding:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Merchantability or fitness for a particular purpose</li>
                <li>Title, non-infringement, or freedom from third-party claims</li>
                <li>Accuracy, completeness, timeliness, or reliability of content</li>
                <li>Security, availability, or uninterrupted operation of the website</li>
                <li>Absence of viruses, malware, or other harmful components</li>
                <li>That website functions will meet your requirements or expectations</li>
              </ul>

              <p className="mt-4">
                We disclaim all other warranties, express or implied, to the fullest extent permitted by law. Some jurisdictions do not allow disclaimers of implied warranties, so some of these disclaimers may not apply to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">7. Limitations of Liability</h2>
              
              <p className="font-semibold bg-gray-100 p-3 rounded mb-4">
                LIMITATION OF LIABILITY AND DAMAGES
              </p>

              <p>
                TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL {siteConfig.name.toUpperCase()} OR ANY AFFILIATED PERSONS OR ENTITIES BE LIABLE FOR:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, business opportunities, or goodwill</li>
                <li>Damages arising from unauthorized access to your information</li>
                <li>Damages arising from your use or inability to use this website</li>
                <li>Damages arising from delays or interruptions in website availability</li>
                <li>Damages arising from errors, bugs, or technical defects</li>
                <li>Any other damages, even if we have been advised of the possibility</li>
              </ul>

              <p className="mt-4">
                Even if any remedy fails of its essential purpose, this limitation shall apply. Some jurisdictions do not allow exclusion of consequential damages, so this limitation may not apply fully to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">8. Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">8.1 Ownership</h3>
              <p>
                All content on this website, including text, graphics, logos, images, audio, video, code, and software, is the exclusive property of {siteConfig.name} or our content providers. All content is protected by U.S. and international copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">8.2 License Restrictions</h3>
              <p>
                You may view, print, and retain copies of website content for personal, non-commercial use only. Any other use of our intellectual property without our express written consent is strictly prohibited.
              </p>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">8.3 Trademarks</h3>
              <p>
                "{siteConfig.name}" and all associated logos and trademarks are trademarks of {siteConfig.name}. You may not use these trademarks without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">9. Third-Party Links & External Websites</h2>
              <p>
                Our website may contain links to third-party websites, resources, and external content. We do not control, endorse, monitor, or guarantee the accuracy or legality of these external resources.
              </p>
              <p className="mt-4">
                Your access to and use of third-party websites is governed by their own terms and conditions. We are not responsible for:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Availability, accuracy, or legality of third-party content</li>
                <li>Your interactions with third-party websites or services</li>
                <li>Damages or losses arising from third-party websites</li>
              </ul>
              <p className="mt-4">
                We recommend reviewing third-party privacy policies and terms before providing information to external websites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">10. Confidentiality & Communication</h2>
              
              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">10.1 Unencrypted Communication Risk</h3>
              <p>
                Email and internet communication are not secure. We cannot guarantee that emails or online communications will not be intercepted or accessed by unauthorized parties. Do not send sensitive information via unencrypted email or website forms unless you understand and accept the risks.
              </p>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">10.2 Before Attorney-Client Relationship</h3>
              <p>
                Before a formal attorney-client relationship is established, information you communicate to us via email, phone, or our website is not protected by attorney-client privilege or confidentiality. We may use this information to evaluate your potential case and determine whether to accept representation, but we are not bound by confidentiality unless we agree to represent you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">11. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless {siteConfig.name} and all affiliated persons and entities from any and all claims, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising from:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Your use of our website or services</li>
                <li>Breach of these Terms of Service</li>
                <li>Violation of applicable laws or regulations</li>
                <li>Violation of third-party rights (intellectual property, privacy, etc.)</li>
                <li>Any content you submit or provide to us</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">12. Dispute Resolution & Governing Law</h2>
              
              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">12.1 Governing Law</h3>
              <p>
                These Terms of Service are governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law provisions. Any dispute arising from these terms or our website shall be governed by Florida law.
              </p>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">12.2 Jurisdiction</h3>
              <p>
                You irrevocably submit to the exclusive jurisdiction of the state and federal courts located in Palm Beach County, Florida. You agree to waive any claim that these courts are an inconvenient forum.
              </p>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">12.3 Dispute Resolution Process</h3>
              <p>
                Before initiating any legal proceedings, we encourage you to contact us in writing to attempt to resolve any disputes informally. All disputes must be brought within one (1) year of when the cause of action arises or be waived forever.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">13. Severability</h2>
              <p>
                If any provision of these Terms of Service is found to be invalid or unenforceable, that provision shall be severed, and the remaining provisions shall remain in full force and effect to the maximum extent permitted by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">14. Entire Agreement</h2>
              <p>
                These Terms of Service, together with our Privacy Policy, constitute the entire agreement between you and {siteConfig.name} regarding your use of our website and any services we provide. These terms supersede all prior agreements, understandings, and negotiations regarding the subject matter.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">15. Amendments & Modifications</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Modifications become effective upon posting to our website. Your continued use of our website and services following any modifications constitutes your acceptance of the updated terms. We encourage you to review these terms periodically for updates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">16. Termination</h2>
              <p>
                We may terminate your access to our website at any time and for any reason, with or without notice. Upon termination, your right to use the website immediately ceases.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">17. Survival</h2>
              <p>
                The following provisions survive any termination: Intellectual Property Rights, Limitations of Liability, Disclaimer of Warranties, Governing Law, and any other provisions that by their nature are intended to survive.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">18. Contact Information</h2>
              <p>
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-4 space-y-3">
                <p><strong>{siteConfig.name}</strong></p>
                <p><strong>Mailing Address:</strong><br/>{siteConfig.contact.address.street}<br/>{siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}</p>
                <p><strong>Phone:</strong> <a href={`tel:${siteConfig.contact.phone.replace(/[^\d]/g, '')}`} className="text-[#2A2C53] hover:underline">{siteConfig.contact.phone}</a></p>
                <p><strong>Email:</strong> <a href={`mailto:${siteConfig.contact.email}`} className="text-[#2A2C53] hover:underline">{siteConfig.contact.email}</a></p>
              </div>
            </section>

            <section className="bg-yellow-50 p-4 rounded-lg mt-8 border-l-4 border-yellow-400">
              <p className="text-sm font-semibold text-gray-800">
                <strong>Acknowledgment:</strong> By accessing {siteConfig.name}'s website or contacting our firm, you acknowledge that you have read these Terms of Service, understand them, and agree to be bound by them. You also acknowledge that you understand the critical disclaimer that no attorney-client relationship is formed through website use or initial consultations.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}