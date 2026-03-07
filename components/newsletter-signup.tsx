"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
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

  // Load compliance text based on user location
  useEffect(() => {
    getComplianceText().then(setComplianceText)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isLoading) return

    // Validation
    if (!email.trim()) {
      showErrorMessage("Please enter your email address.", containerRef.current)
      return
    }

    if (!isValidEmail(email)) {
      showErrorMessage("Please enter a valid email address.", containerRef.current)
      return
    }

    if (!consent) {
      showErrorMessage("Please consent to receive newsletter updates.", containerRef.current)
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
        showSuccessMessage(result.message, containerRef.current)
        
        // Extract email domain for analytics
        const emailDomain = email.trim().split('@')[1] || 'unknown'
        
        // Track newsletter signup
        trackNewsletterSignup(source, emailDomain)
        
        // Reset form
        setEmail("")
        setConsent(false)
      } else {
        showErrorMessage(result.message, containerRef.current)
      }
    } catch (error) {
      showErrorMessage("An unexpected error occurred. Please try again.", containerRef.current)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div ref={containerRef} className={`newsletter-signup ${className}`}>
      <div className="bg-gray-50 p-12 border border-gray-200">
        <h3 className="text-3xl font-bold text-[#2A2C53] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          {title}
        </h3>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          {/* Email Input */}
          <div className="flex items-stretch mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              disabled={isLoading}
              className="flex-1 h-12 px-4 text-gray-900 bg-white border border-gray-300 border-r-0 focus:ring-2 focus:ring-[#2A2C53] focus:border-[#2A2C53] focus:z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Email address for newsletter subscription"
            />
            <Button 
              type="submit"
              disabled={isLoading || !email.trim() || !consent}
              className="h-12 bg-[#2A2C53] text-white hover:bg-[#2A2C53]/90 font-montserrat font-semibold uppercase tracking-wide px-6 rounded-none border-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "..." : buttonText}
            </Button>
          </div>

          {/* Consent Checkbox */}
          <div className="text-left mb-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                disabled={isLoading}
                className="mt-1 h-4 w-4 text-[#2A2C53] focus:ring-[#2A2C53] border-gray-300 rounded disabled:opacity-50"
                aria-describedby="consent-description"
              />
              <span className="text-sm text-gray-700" id="consent-description">
                {complianceText.consentText}
              </span>
            </label>
          </div>

          {/* Privacy Notice */}
          <p className="text-sm text-gray-500">
            {complianceText.privacyNotice}
          </p>
        </form>
      </div>
    </div>
  )
}
