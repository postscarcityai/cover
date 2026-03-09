"use client"

import { useState, useEffect } from "react"
import { Phone, Mail, MapPin, Copy, Check } from "lucide-react"
import { Logo } from "@/components/logo"
import { TransitionLink } from "@/components/transition-link"
import { trackPhoneCallClick, trackCopyToClipboard } from "@/lib/analytics"
import { resetCookieConsent } from "@/components/cookie-consent"
import { siteConfig } from "@/site.config"

const socialIcons: Record<string, (props: { className?: string }) => JSX.Element> = {
  twitter: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  linkedin: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  facebook: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  instagram: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z" />
    </svg>
  ),
  youtube: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
}

interface FooterProps {
  className?: string
}

export function Footer({ className = "" }: FooterProps) {
  const [showToast, setShowToast] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [clickedField, setClickedField] = useState<string | null>(null)
  const [hoveredField, setHoveredField] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState("")

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(
        window.innerWidth < 768 ||
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      )
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const copyOrAction = async (
    field: string,
    text: string,
    mobileAction: () => void,
    trackFn: () => void,
    label: string
  ) => {
    setClickedField(field)
    trackFn()
    if (isMobile) {
      mobileAction()
      setTimeout(() => setClickedField(null), 2000)
    } else {
      try {
        await navigator.clipboard.writeText(text)
        setToastMessage(label)
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
        setTimeout(() => setClickedField(null), 2000)
      } catch {
        setClickedField(null)
      }
    }
  }

  const handleEmailClick = () =>
    copyOrAction(
      "email",
      siteConfig.contact.email,
      () => (window.location.href = `mailto:${siteConfig.contact.email}`),
      () => trackCopyToClipboard("email", siteConfig.contact.email),
      "Email copied!"
    )

  const handlePhoneClick = () =>
    copyOrAction(
      "phone",
      siteConfig.contact.phoneDisplay,
      () => {
        trackPhoneCallClick("footer", "phone_contact_button")
        window.location.href = `tel:${siteConfig.contact.phone}`
      },
      () => trackCopyToClipboard("phone", siteConfig.contact.phoneDisplay),
      "Phone copied!"
    )

  const handleAddressClick = () => {
    const addr = `${siteConfig.contact.address.street}, ${siteConfig.contact.address.city}, ${siteConfig.contact.address.state} ${siteConfig.contact.address.zip}`
    copyOrAction(
      "address",
      addr,
      () => (window.location.href = `https://maps.google.com/?q=${encodeURIComponent(addr)}`),
      () => trackCopyToClipboard("address", addr),
      "Address copied!"
    )
  }

  const ContactIcon = ({ field, DefaultIcon }: { field: string; DefaultIcon: any }) =>
    clickedField === field ? (
      <Check className="h-4 w-4 text-green-400" />
    ) : !isMobile && hoveredField === field ? (
      <Copy className="h-4 w-4" style={{ color: "var(--fg-muted)" }} />
    ) : (
      <DefaultIcon className="h-4 w-4" style={{ color: "var(--fg-muted)" }} />
    )

  const resourceLinks = siteConfig.navigation.filter((i) => i.href !== "/contact")
  const socialEntries = Object.entries(siteConfig.social).filter(([, url]) => url)

  const complianceLinks = [
    { href: siteConfig.legal.privacyPolicy, label: "Privacy" },
    { href: siteConfig.legal.termsOfService, label: "Terms" },
    siteConfig.legal.cookiePolicy ? { href: "#cookies", label: "Cookies", isCookieToggle: true } : null,
    siteConfig.legal.accessibilityStatement ? { href: siteConfig.legal.accessibilityStatement, label: "Accessibility" } : null,
    siteConfig.legal.nonDiscrimination ? { href: siteConfig.legal.nonDiscrimination, label: "Non-Discrimination" } : null,
  ].filter(Boolean) as { href: string; label: string; isCookieToggle?: boolean }[]

  return (
    <footer
      id="footer"
      className={`border-t ${className}`}
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
    >
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-16 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand + Social Icons */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="flex items-center mb-6">
              <Logo variant="white" className="h-8 w-auto" />
            </div>
            <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: "var(--fg-muted)" }}>
              {siteConfig.description}
            </p>
            {socialEntries.length > 0 && (
              <div className="flex items-center gap-5">
                {socialEntries.map(([platform, url]) => {
                  const Icon = socialIcons[platform]
                  return Icon ? (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-[var(--accent)]"
                      style={{ color: "var(--fg-muted)" }}
                      aria-label={platform}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ) : (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs uppercase tracking-wider transition-colors hover:text-[var(--accent)]"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      {platform}
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Resources */}
          <div className="lg:col-span-3">
            <h3 className="font-semibold text-xs tracking-[0.2em] uppercase mb-6" style={{ color: "var(--fg)" }}>
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <TransitionLink
                    href={link.href}
                    className="text-sm transition-colors hover:text-[var(--accent)]"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {link.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-5">
            <h3 className="font-semibold text-xs tracking-[0.2em] uppercase mb-6" style={{ color: "var(--fg)" }}>
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <ContactIcon field="address" DefaultIcon={MapPin} />
                <button
                  onClick={handleAddressClick}
                  onMouseEnter={() => !isMobile && clickedField !== "address" && setHoveredField("address")}
                  onMouseLeave={() => !isMobile && setHoveredField(null)}
                  className="text-sm text-left transition-colors"
                  style={{ color: "var(--fg-muted)" }}
                  title={isMobile ? "Open in maps" : "Click to copy address"}
                >
                  <div>{siteConfig.contact.address.street}</div>
                  <div>{siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}</div>
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <ContactIcon field="phone" DefaultIcon={Phone} />
                <button
                  onClick={handlePhoneClick}
                  onMouseEnter={() => !isMobile && clickedField !== "phone" && setHoveredField("phone")}
                  onMouseLeave={() => !isMobile && setHoveredField(null)}
                  className="text-sm transition-colors"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {siteConfig.contact.phoneDisplay}
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <ContactIcon field="email" DefaultIcon={Mail} />
                <button
                  onClick={handleEmailClick}
                  onMouseEnter={() => !isMobile && clickedField !== "email" && setHoveredField("email")}
                  onMouseLeave={() => !isMobile && setHoveredField(null)}
                  className="text-sm transition-colors"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {siteConfig.contact.email}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower footer -- compliance & copyright */}
      <div className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs" style={{ color: "var(--fg-muted)" }}>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          {complianceLinks.length > 0 && (
            <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Legal">
              {complianceLinks.map((link) =>
                link.isCookieToggle ? (
                  <button
                    key={link.label}
                    onClick={(e) => {
                      e.preventDefault()
                      resetCookieConsent()
                    }}
                    className="text-xs transition-colors hover:text-[var(--fg)]"
                    style={{ color: "var(--fg-muted)", background: "none", border: "none", padding: 0, cursor: "pointer" }}
                  >
                    {link.label}
                  </button>
                ) : (
                  <TransitionLink
                    key={link.label}
                    href={link.href}
                    className="text-xs transition-colors hover:text-[var(--fg)]"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {link.label}
                  </TransitionLink>
                )
              )}
            </nav>
          )}
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50" style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}>
          <div className="font-medium text-sm">{toastMessage}</div>
        </div>
      )}
    </footer>
  )
}
