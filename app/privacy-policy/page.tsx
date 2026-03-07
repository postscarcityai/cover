'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { siteConfig } from '@/site.config'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-[#2A2C53] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            Privacy Policy
          </h1>
          
          <p className="text-gray-600 mb-8">
            <strong>Effective Date:</strong> January 1, 2025<br/>
            <strong>Last Updated:</strong> October 16, 2025
          </p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">1. Introduction & Scope</h2>
              <p>
                {siteConfig.name} ("firm," "we," "our," or "us") is committed to protecting your privacy and ensuring you have a positive experience on our website and in our interactions with you. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information.
              </p>
              <p className="mt-4">
                This policy applies to information collected through our website, email communications, phone calls, in-person meetings, and any other channels through which you interact with our firm. Please read this policy carefully. If you do not agree with our policies and practices, please do not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">2.1 Information You Provide Directly</h3>
              <p>We collect information you voluntarily provide to us, including:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Contact Information:</strong> Name, email address, phone number, mailing address, and date of birth</li>
                <li><strong>Legal Information:</strong> Details about your legal matter, case information, charges, and circumstances</li>
                <li><strong>Financial Information:</strong> Payment information, billing address, and retainer agreements (processed securely)</li>
                <li><strong>Communication Records:</strong> Messages, emails, voicemails, and other correspondence with our firm</li>
                <li><strong>Document Information:</strong> Copies of identification, government documents, court papers, and other case materials</li>
                <li><strong>Emergency Contact Information:</strong> Names and contact details of family members or designated contacts</li>
                <li><strong>Newsletter Subscriptions:</strong> Email address for receiving case results and legal updates</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">2.2 Information Collected Automatically</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Usage Data:</strong> Pages visited, time spent on pages, links clicked, referral sources</li>
                <li><strong>Device Information:</strong> Browser type, operating system, device type, IP address</li>
                <li><strong>Cookie Data:</strong> Information collected through cookies and similar tracking technologies</li>
                <li><strong>Analytics Information:</strong> Aggregated data about website performance and user behavior</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">2.3 Third-Party Information</h3>
              <p>
                We may receive information about you from third parties, including law enforcement agencies, courts, opposing counsel, expert witnesses, and other parties involved in legal proceedings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect for the following purposes:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Providing legal services and representation in your case</li>
                <li>Communicating with you about your matter and legal representation</li>
                <li>Preparing legal documents, motions, and court filings</li>
                <li>Conducting legal research and case strategy development</li>
                <li>Billing and financial management</li>
                <li>Complying with court orders, legal obligations, and professional responsibility rules</li>
                <li>Protecting our firm's legal rights and interests</li>
                <li>Preventing fraud and enhancing website security</li>
                <li>Improving our website and services (with your consent)</li>
                <li>Sending newsletters and legal updates (with your consent)</li>
                <li>Responding to inquiries and requests for information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">4. Critical: Attorney-Client Privilege & Confidentiality</h2>
              <p className="font-semibold text-red-700 bg-red-50 p-4 rounded">
                ⚠️ IMPORTANT NOTICE: Information submitted through our website contact form, email, or initial phone consultations is NOT automatically protected by attorney-client privilege or attorney work product doctrine. Privilege only applies AFTER a formal attorney-client relationship is established through a signed engagement agreement and a retainer is received.
              </p>
              <p className="mt-4">
                Until an attorney-client relationship is formally established:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Your communications are NOT privileged and may be discoverable</li>
                <li>We may discuss your information with third parties as needed</li>
                <li>Your information is not protected as confidential</li>
                <li>We are not bound to represent you or keep information confidential</li>
              </ul>
              <p className="mt-4">
                Once a formal attorney-client relationship is established through a signed engagement agreement:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Communications become privileged under Florida and federal law</li>
                <li>Information is protected by attorney-client privilege and work product doctrine</li>
                <li>We maintain strict confidentiality obligations</li>
                <li>Information cannot be disclosed without your consent (with limited legal exceptions)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">5. Information Sharing & Disclosure</h2>
              
              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">5.1 General Sharing Practices</h3>
              <p>
                We do not sell, trade, rent, or otherwise transfer your personal information to third parties without your consent, except as required or permitted by law or professional regulations.
              </p>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">5.2 Mandatory Disclosures</h3>
              <p>We may disclose information without consent when required by:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Court orders, subpoenas, or legal process</li>
                <li>Law enforcement investigations</li>
                <li>Professional responsibility and ethical obligations</li>
                <li>Florida Statutes and federal laws</li>
                <li>Bar Association rules and regulations</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">5.3 Service Providers</h3>
              <p>
                We use third-party service providers to assist in operating our business, including website hosting, payment processing, cloud storage, and document management. These providers are contractually obligated to maintain confidentiality and use information only for purposes necessary to provide services to us.
              </p>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">5.4 Legal Proceedings</h3>
              <p>
                Information may be disclosed in connection with legal proceedings, including litigation, bankruptcy, or regulatory investigations. We may also disclose information to protect our firm's legal rights, prevent fraud, or respond to claims.
              </p>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">5.5 Case Team & Associates</h3>
              <p>
                Your information is shared with members of our legal team, paralegals, and associates as necessary to provide competent representation. We may consult with expert witnesses, investigators, and other professionals as your case requires.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">6. Data Security & Protection</h2>
              <p>
                We implement industry-standard technical, administrative, and physical security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Encrypted data transmission (SSL/TLS certificates)</li>
                <li>Secure server infrastructure and firewalls</li>
                <li>Access controls and password protections</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Secure file storage and document management systems</li>
                <li>Employee training on data protection and privacy</li>
                <li>Incident response procedures for data breaches</li>
              </ul>
              <p className="mt-4 font-semibold">
                However, no method of transmission over the internet or electronic storage is completely secure. We cannot guarantee absolute security of your information. You use our services at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">7. Data Retention</h2>
              <p>
                We retain personal information as long as necessary to provide legal services, comply with legal obligations, resolve disputes, and maintain business records. Specifically:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Client Files:</strong> Retained for 7 years after case closure (Florida Bar requirement) or as required by law</li>
                <li><strong>Financial Records:</strong> Retained for 7 years for tax and audit purposes</li>
                <li><strong>Communications:</strong> Retained during representation and for 7 years thereafter</li>
                <li><strong>Website Analytics:</strong> Retained for 24 months and then anonymized</li>
                <li><strong>Email Communications:</strong> Retained for 7 years or longer if case-related</li>
              </ul>
              <p className="mt-4">
                After the retention period, information is securely deleted or destroyed unless longer retention is required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">8. Your Rights & Choices</h2>
              
              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">8.1 Access & Correction</h3>
              <p>
                You have the right to request access to your personal information and request corrections to inaccurate data. Contact us using the information below to submit such requests.
              </p>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">8.2 Deletion Requests</h3>
              <p>
                You may request deletion of your personal information, except where we must retain it for legal, professional responsibility, or business purposes.
              </p>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">8.3 Marketing Communications</h3>
              <p>
                You may opt out of receiving promotional emails and newsletters at any time by clicking the "unsubscribe" link in any email or contacting us directly. Note: Even if you opt out of marketing, we will continue to send transactional communications related to your legal representation.
              </p>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">8.4 Cookie Preferences</h3>
              <p>
                You can adjust your browser settings to refuse cookies, though some website functionality may be limited.
              </p>

              <h3 className="text-xl font-semibold text-[#2A2C53] mt-4 mb-2">8.5 California & Other State Rights</h3>
              <p>
                If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA). If you reside in other states with privacy laws (Virginia, Colorado, etc.), those rights may also apply.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">9. Third-Party Links & Services</h2>
              <p>
                Our website may contain links to third-party websites and services that we do not control. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">10. International Data Transfers</h2>
              <p>
                If you access our website or services from outside the United States, please note that your information may be transferred to, stored in, and processed in the United States. By using our services, you consent to such transfers and processing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">11. Children's Privacy</h2>
              <p>
                Our website is not intended for children under 18. We do not knowingly collect personal information from children. If we become aware that a child has provided information, we will delete it promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">12. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy at any time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by posting the revised policy on our website and updating the "Last Updated" date. Your continued use of our services following such changes constitutes your acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">13. Compliance with Laws</h2>
              <p>
                We comply with applicable privacy laws, including:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Florida Information Protection Act of 2014</li>
                <li>California Consumer Privacy Act (CCPA)</li>
                <li>California Privacy Rights Act (CPRA)</li>
                <li>Virginia Consumer Data Protection Act (VCDPA)</li>
                <li>Colorado Privacy Act (CPA)</li>
                <li>Applicable state data breach notification laws</li>
                <li>Federal laws protecting sensitive information</li>
                <li>Florida Rules of Professional Conduct and Bar Association requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">14. Data Breach Notification</h2>
              <p>
                If we discover a data breach or unauthorized access to your information, we will notify you promptly in accordance with applicable laws. We maintain an incident response plan and will take all necessary steps to mitigate harm.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#2A2C53] mb-4">15. Contact Us</h2>
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mt-4 space-y-3">
                <p><strong>{siteConfig.name}</strong></p>
                <p><strong>Mailing Address:</strong><br/>{siteConfig.contact.address.street}<br/>{siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}</p>
                <p><strong>Phone:</strong> <a href={`tel:${siteConfig.contact.phone.replace(/[^\d]/g, '')}`} className="text-[#2A2C53] hover:underline">{siteConfig.contact.phone}</a></p>
                <p><strong>Email:</strong> <a href={`mailto:${siteConfig.contact.email}`} className="text-[#2A2C53] hover:underline">{siteConfig.contact.email}</a></p>
                <p><strong>Privacy Officer:</strong> Contact via email for privacy-specific concerns</p>
              </div>
            </section>

            <section className="bg-blue-50 p-4 rounded-lg mt-8">
              <p className="text-sm text-gray-600">
                <strong>Disclaimer:</strong> This Privacy Policy does not create any legal relationship between you and our firm until a formal attorney-client relationship is established. We reserve the right to modify this policy at any time. For the most current version, please visit this page regularly.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}