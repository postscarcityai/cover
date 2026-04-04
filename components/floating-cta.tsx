"use client"

import { useState, useEffect } from "react"
import { Phone, X, MessageCircle, Mail } from "lucide-react"
import { trackPhoneCallClick, trackWhatsAppClick, trackScheduleConsultation } from "@/lib/analytics"
import { siteConfig } from "@/site.config"

export function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [currentIcon, setCurrentIcon] = useState<'phone' | 'message'>('phone')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || isOpen) return

    const interval = setInterval(() => {
      setCurrentIcon(prev => (prev === 'phone' ? 'message' : 'phone'))
    }, 12000)

    return () => clearInterval(interval)
  }, [isMounted, isOpen])

  const handlePhoneClick = () => {
    trackPhoneCallClick('floating_cta', 'phone_button')
  }

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('floating_cta')
  }

  const handleEmailClick = () => {
    trackScheduleConsultation('floating_cta', 'email_button')
  }

  const phoneNumber = siteConfig.contact.phone.replace(/[^\d]/g, '')
  const whatsAppUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(`Hi, I'd like to get in touch with ${siteConfig.name}.`)}`

  if (!isMounted) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expandable menu */}
      <div
        className="absolute bottom-16 right-0 w-72 rounded-lg shadow-2xl border overflow-hidden transition-all duration-200 ease-out origin-bottom-right"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        <div
          className="px-5 py-4"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          <h3
            className="text-white font-semibold text-lg"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Get In Touch
          </h3>
          <p className="text-white/70 text-sm mt-0.5">
            {siteConfig.business.openingHours?.is24_7 ? "Available 24/7" : "We're here to help"}
          </p>
        </div>

        <div className="p-4 space-y-3">
          <a
            href={`tel:${phoneNumber}`}
            onClick={handlePhoneClick}
            className="flex items-center gap-4 p-3 rounded-lg group transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: 'var(--muted)' }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-sm" style={{ color: 'var(--accent)' }}>
                Call Us
              </div>
              <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                {siteConfig.contact.phoneDisplay}
              </div>
            </div>
          </a>

          <a
            href={`mailto:${siteConfig.contact.email}`}
            onClick={handleEmailClick}
            className="flex items-center gap-4 p-3 rounded-lg group transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: 'var(--muted)' }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-sm" style={{ color: 'var(--accent)' }}>
                Email Us
              </div>
              <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                {siteConfig.contact.email}
              </div>
            </div>
          </a>

          {siteConfig.features.whatsapp && (
            <a
              href={whatsAppUrl}
              onClick={handleWhatsAppClick}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-3 rounded-lg group transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: 'var(--muted)' }}
            >
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm text-green-700">WhatsApp</div>
                <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>Message us directly</div>
              </div>
            </a>
          )}
        </div>
      </div>

      {/* Main button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          backgroundColor: isOpen ? 'var(--fg-muted)' : 'var(--accent)',
        }}
        aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
      >
        <span
          className="transition-all duration-150"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : currentIcon === 'phone' ? (
            <Phone className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </span>
      </button>

      {!isOpen && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
        </span>
      )}
    </div>
  )
}
