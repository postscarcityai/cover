"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Phone, ArrowRight, MessageCircle } from "lucide-react"
import { trackExitIntent, trackScheduleConsultation, trackPhoneCallClick, trackWhatsAppClick } from "@/lib/analytics"
import { siteConfig } from "@/site.config"

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [canShow, setCanShow] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth < 768 || 'ontouchstart' in window) return

    const alreadyShown = sessionStorage.getItem('exit_intent_shown')
    if (alreadyShown) {
      setHasShown(true)
      return
    }

    const enableTimer = setTimeout(() => {
      setCanShow(true)
    }, 10000)

    return () => clearTimeout(enableTimer)
  }, [])

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY > 50) return
    if (hasShown || !canShow) return

    setIsVisible(true)
    setHasShown(true)
    sessionStorage.setItem('exit_intent_shown', 'true')
    trackExitIntent()
  }, [hasShown, canShow])

  useEffect(() => {
    if (hasShown || !canShow) return

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [handleMouseLeave, hasShown, canShow])

  const handleClose = () => setIsVisible(false)

  const handleCTA = () => {
    trackScheduleConsultation('exit_intent', 'popup_cta')
    window.location.href = '/contact'
  }

  const handlePhone = () => {
    trackPhoneCallClick('exit_intent', 'popup_phone')
    window.location.href = `tel:${siteConfig.contact.phone.replace(/[^\d]/g, '')}`
  }

  const handleWhatsApp = () => {
    trackWhatsAppClick('exit_intent')
    const phoneNumber = siteConfig.contact.phone.replace(/[^\d]/g, '')
    const message = encodeURIComponent(`Hi, I'd like to get in touch with ${siteConfig.name}.`)
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] backdrop-blur-sm"
            style={{ backgroundColor: "color-mix(in srgb, var(--fg) 40%, transparent)" }}
            onClick={handleClose}
          />

          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-lg pointer-events-auto"
            >
              <div className="rounded-2xl shadow-2xl overflow-hidden relative" style={{ backgroundColor: 'var(--surface)' }}>
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 transition-colors z-10 hover:opacity-80"
                  style={{ color: 'var(--fg-muted)' }}
                  aria-label="Close popup"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="px-8 pt-8 pb-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-green-600 font-medium text-sm">We&apos;re Here to Help</span>
                  </div>

                  <h2
                    className="text-3xl font-bold pr-8 leading-tight"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent)' }}
                  >
                    Wait — Don&apos;t Leave Just Yet
                  </h2>
                  <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                    Have questions? We&apos;d love to help. Reach out and let&apos;s start a conversation about how we can work together.
                  </p>
                </div>

                <div className="px-8 pb-8 space-y-4">
                  <button
                    onClick={handleCTA}
                    className="w-full py-4 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: 'var(--accent-fg)',
                    }}
                  >
                    Get In Touch
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
                    <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>or call directly</span>
                    <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
                  </div>

                  <button
                    onClick={handlePhone}
                    className="w-full border-2 font-semibold py-4 rounded-xl text-base transition-all flex items-center justify-center"
                    style={{
                      borderColor: 'var(--accent)',
                      color: 'var(--accent)',
                    }}
                  >
                    <Phone className="mr-2 w-5 h-5" />
                    {siteConfig.contact.phoneDisplay}
                  </button>

                  {siteConfig.features.whatsapp && (
                    <>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
                        <span className="text-sm" style={{ color: 'var(--fg-muted)' }}>or message on WhatsApp</span>
                        <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
                      </div>

                      <button
                        onClick={handleWhatsApp}
                        className="w-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-4 rounded-xl text-base transition-all flex items-center justify-center"
                      >
                        <MessageCircle className="mr-2 w-5 h-5" />
                        Chat on WhatsApp
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
