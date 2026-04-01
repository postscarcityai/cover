"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { MagneticButton } from "@/components/magnetic-button"
import { subscribeToNewsletter, isValidEmail, getComplianceText, showSuccessMessage, showErrorMessage } from "@/lib/newsletter"
import { trackNewsletterSignup } from "@/lib/analytics"

interface NewsletterSignupProps {
  source?: string
  className?: string
  title?: string
  description?: string
  placeholder?: string
  buttonText?: string
}

export function NewsletterSignup({
  source = "newsletter",
  className = "",
  title = "Stay Informed",
  description = "Get our latest updates delivered to your inbox. Stay up to date with news, insights, and important developments.",
  placeholder = "Enter your email",
  buttonText = "Subscribe"
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [complianceText, setComplianceText] = useState({
    consentText: "I consent to receive email updates and newsletters.",
    privacyNotice: "No spam. Unsubscribe anytime.",
    requiresGDPR: false,
    requiresCCPA: false
  })
  
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getComplianceText().then(setComplianceText)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isLoading) return

    if (!email.trim()) {
      showErrorMessage("Please enter your email address.", containerRef.current ?? undefined)
      return
    }

    if (!isValidEmail(email)) {
      showErrorMessage("Please enter a valid email address.", containerRef.current ?? undefined)
      return
    }

    if (!consent) {
      showErrorMessage("Please consent to receive newsletter updates.", containerRef.current ?? undefined)
      return
    }

    setIsLoading(true)

    try {
      const result = await subscribeToNewsletter({
        email: email.trim(),
        consent: true,
        marketingConsent: consent,
        source
      })

      if (result.success) {
        showSuccessMessage(result.message, containerRef.current ?? undefined)
        const emailDomain = email.trim().split('@')[1] || 'unknown'
        trackNewsletterSignup(source, emailDomain)
        setEmail("")
        setConsent(false)
      } else {
        showErrorMessage(result.message, containerRef.current ?? undefined)
      }
    } catch (error) {
      showErrorMessage("An unexpected error occurred. Please try again.", containerRef.current ?? undefined)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div ref={containerRef} className={`newsletter-signup ${className}`}>
      <div
        className="px-8 py-10 md:px-14 md:py-14 rounded-xl border"
        style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}
      >
        <h3
          className="text-2xl md:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
        >
          {title}
        </h3>
        <p className="text-base md:text-lg mb-10 max-w-2xl leading-relaxed" style={{ color: "var(--fg-muted)" }}>
          {description}
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              disabled={isLoading}
              className="flex-1 h-12 bg-transparent border-b-2 px-1 pb-2 text-base transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                color: "var(--fg)",
                borderColor: "var(--border)",
              }}
              aria-label="Email address for newsletter subscription"
            />
            <MagneticButton>
              <button 
                type="submit"
                disabled={isLoading || !email.trim() || !consent}
                className="h-12 px-8 font-semibold text-sm uppercase tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center whitespace-nowrap"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--accent-fg)",
                }}
              >
                {isLoading ? "..." : buttonText}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </button>
            </MagneticButton>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              disabled={isLoading}
              className="h-4 w-4 rounded shrink-0 disabled:opacity-50"
              style={{ accentColor: "var(--accent)", borderColor: "var(--border)" }}
              aria-describedby="consent-description"
            />
            <span
              className="text-sm leading-snug"
              id="consent-description"
              style={{ color: "var(--fg-muted)" }}
            >
              {complianceText.consentText}
            </span>
          </label>

          <p className="text-xs" style={{ color: "var(--fg-muted)", opacity: 0.5 }}>
            {complianceText.privacyNotice}
          </p>
        </form>
      </div>
    </div>
  )
}
