"use client"

import { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, Copy, Check } from 'lucide-react'
import { Logo } from '@/components/logo'
import { trackPhoneCallClick, trackCopyToClipboard, trackWhatsAppClick } from '@/lib/analytics'
import { siteConfig } from '@/site.config'

interface FooterProps {
  className?: string
}

export function Footer({ className = "" }: FooterProps) {
  const [showToast, setShowToast] = useState(false)
  const [isEmailHovered, setIsEmailHovered] = useState(false)
  const [isPhoneHovered, setIsPhoneHovered] = useState(false)
  const [isAddressHovered, setIsAddressHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isEmailClicked, setIsEmailClicked] = useState(false)
  const [isPhoneClicked, setIsPhoneClicked] = useState(false)
  const [isAddressClicked, setIsAddressClicked] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleEmailClick = async () => {
    // Show checkmark immediately
    setIsEmailClicked(true)

    if (isMobile) {
      // On mobile, open default email client
      trackCopyToClipboard('email', siteConfig.contact.email)
      window.location.href = `mailto:${siteConfig.contact.email}`
      // Reset checkmark after delay
      setTimeout(() => setIsEmailClicked(false), 2000)
    } else {
      // On desktop, copy to clipboard
      try {
        await navigator.clipboard.writeText(siteConfig.contact.email)
        trackCopyToClipboard('email', siteConfig.contact.email)
        setToastMessage('Email copied!')
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
        // Reset checkmark after delay
        setTimeout(() => setIsEmailClicked(false), 2000)
      } catch (err) {
        console.error('Failed to copy email:', err)
        setIsEmailClicked(false)
      }
    }
  }

  const handlePhoneClick = async () => {
    // Show checkmark immediately
    setIsPhoneClicked(true)

    if (isMobile) {
      // Track phone call on mobile
      trackPhoneCallClick('footer', 'phone_contact_button')
      // On mobile, open phone dialer
      window.location.href = `tel:${siteConfig.contact.phone}`
      // Reset checkmark after delay
      setTimeout(() => setIsPhoneClicked(false), 2000)
    } else {
      // On desktop, copy to clipboard
      try {
        await navigator.clipboard.writeText(siteConfig.contact.phoneDisplay)
        trackCopyToClipboard('phone', siteConfig.contact.phoneDisplay)
        setToastMessage('Phone number copied!')
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
        // Reset checkmark after delay
        setTimeout(() => setIsPhoneClicked(false), 2000)
      } catch (err) {
        console.error('Failed to copy phone:', err)
        setIsPhoneClicked(false)
      }
    }
  }

  const handleAddressClick = async () => {
    // Show checkmark immediately
    setIsAddressClicked(true)

    const address = `${siteConfig.contact.address.street}, ${siteConfig.contact.address.city}, ${siteConfig.contact.address.state} ${siteConfig.contact.address.zip}`

    if (isMobile) {
      // On mobile, open maps app
      const encodedAddress = encodeURIComponent(address)
      window.location.href = `https://maps.google.com/?q=${encodedAddress}`
      // Reset checkmark after delay
      setTimeout(() => setIsAddressClicked(false), 2000)
    } else {
      // On desktop, copy to clipboard
      try {
        await navigator.clipboard.writeText(address)
        trackCopyToClipboard('address', address)
        setToastMessage('Address copied!')
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
        // Reset checkmark after delay
        setTimeout(() => setIsAddressClicked(false), 2000)
      } catch (err) {
        console.error('Failed to copy address:', err)
        setIsAddressClicked(false)
      }
    }
  }

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('footer')
  }


  const resourceLinks = siteConfig.navigation.filter(item => item.href !== '/contact')

  const legalLinks = [
    { href: siteConfig.legal.privacyPolicy, label: "Privacy Policy" },
    { href: siteConfig.legal.termsOfService, label: "Terms of Service" }
  ]

  return (
    <footer
      id="footer"
      className={`py-16 ${className}`}
      style={{ backgroundColor: 'var(--theme-primary)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Logo variant="white" className="h-6 w-auto" />
            </div>
            <p
              className="mb-6 max-w-md opacity-90"
              style={{ color: 'var(--theme-primary-foreground)' }}
            >
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3
              className="font-semibold mb-4"
              style={{ color: 'var(--theme-primary-foreground)' }}
            >
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                {isAddressClicked ? (
                  <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                ) : !isMobile && isAddressHovered ? (
                  <Copy className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--theme-primary-foreground)' }} />
                ) : (
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--theme-primary-foreground)' }} />
                )}
                <button
                  onClick={handleAddressClick}
                  onMouseEnter={() => !isMobile && !isAddressClicked && setIsAddressHovered(true)}
                  onMouseLeave={() => !isMobile && setIsAddressHovered(false)}
                  className="text-sm transition-colors cursor-pointer text-left opacity-90 hover:opacity-100"
                  style={{ color: 'var(--theme-primary-foreground)' }}
                  title={isMobile ? "Open in maps" : "Click to copy address"}
                >
                  <div>{siteConfig.contact.address.street}</div>
                  <div>{siteConfig.contact.address.city}, {siteConfig.contact.address.state} {siteConfig.contact.address.zip}</div>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                {isPhoneClicked ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : !isMobile && isPhoneHovered ? (
                  <Copy className="h-4 w-4" style={{ color: 'var(--theme-primary-foreground)' }} />
                ) : (
                  <Phone className="h-4 w-4" style={{ color: 'var(--theme-primary-foreground)' }} />
                )}
                <button
                  onClick={handlePhoneClick}
                  onMouseEnter={() => !isMobile && !isPhoneClicked && setIsPhoneHovered(true)}
                  onMouseLeave={() => !isMobile && setIsPhoneHovered(false)}
                  className="text-sm transition-colors cursor-pointer opacity-90 hover:opacity-100"
                  style={{ color: 'var(--theme-primary-foreground)' }}
                  title={isMobile ? "Call phone number" : "Click to copy phone number"}
                >
                  {siteConfig.contact.phoneDisplay}
                </button>
              </div>

              <div className="flex items-center space-x-2">
                {isEmailClicked ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : !isMobile && isEmailHovered ? (
                  <Copy className="h-4 w-4" style={{ color: 'var(--theme-primary-foreground)' }} />
                ) : (
                  <Mail className="h-4 w-4" style={{ color: 'var(--theme-primary-foreground)' }} />
                )}
                <button
                  onClick={handleEmailClick}
                  onMouseEnter={() => !isMobile && !isEmailClicked && setIsEmailHovered(true)}
                  onMouseLeave={() => !isMobile && setIsEmailHovered(false)}
                  className="text-sm transition-colors cursor-pointer opacity-90 hover:opacity-100"
                  style={{ color: 'var(--theme-primary-foreground)' }}
                  title={isMobile ? "Send email" : "Click to copy email address"}
                >
                  {siteConfig.contact.email}
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3
              className="font-semibold mb-4"
              style={{ color: 'var(--theme-primary-foreground)' }}
            >
              Resources
            </h3>
            <ul className="space-y-2 text-sm opacity-90" style={{ color: 'var(--theme-primary-foreground)' }}>
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:opacity-100 transition-opacity">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center opacity-70"
          style={{ borderColor: 'var(--theme-primary-foreground)' }}
        >
          <p
            className="text-sm"
            style={{ color: 'var(--theme-primary-foreground)' }}
          >
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm hover:opacity-100 transition-opacity"
                style={{ color: 'var(--theme-primary-foreground)' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300">
          <div className="flex items-center space-x-2">
            {toastMessage.includes('Email') ? (
              <Mail className="h-4 w-4" />
            ) : toastMessage.includes('Phone') ? (
              <Phone className="h-4 w-4" />
            ) : (
              <MapPin className="h-4 w-4" />
            )}
            <div>
              <div className="font-medium">{toastMessage}</div>
              <div className="text-sm text-green-100">
                {toastMessage.includes('Email') 
                  ? 'Paste it into your email client to contact us'
                  : toastMessage.includes('Phone')
                  ? 'Paste it into your phone app or save to contacts'
                  : 'Paste it into your navigation app or save to contacts'
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
