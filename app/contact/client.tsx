"use client"

import { motion } from "framer-motion"
import { Phone, Mail, ArrowRight, MessageCircle } from 'lucide-react'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { trackPhoneCallClick, trackScheduleConsultation } from "@/lib/analytics"
import { usePageTracking, useScrollTracking } from "@/lib/analytics-hooks"
import { siteConfig } from "@/site.config"
import type { ContactData } from "./data"

interface Props {
  data: ContactData
}

export default function ContactClient({ data }: Props) {
  const { hero, emergency, contactMethods: contactMethodsData, sectionTitle, map, cta, disclaimer } = data

  // Track page view once on mount
  usePageTracking('Contact', 'contact', 'contact_page')
  
  // Track scroll depth milestones
  useScrollTracking()

  // Helper function to get href for different contact methods
  const getContactHref = (method: typeof contactMethodsData[0]) => {
    switch (method.type) {
      case 'phone':
        return `tel:${method.action.replace(/[^\d]/g, '')}`
      case 'whatsapp':
        // Use main phone number for WhatsApp in international format
        const phoneNumber = siteConfig.contact.phone.replace(/[^\d]/g, '')
        const message = encodeURIComponent(`Hi, I'd like to get in touch with ${siteConfig.name}.`)
        return `https://wa.me/${phoneNumber}?text=${message}`
      case 'email':
        return `mailto:${method.action}`
      default:
        return '#'
    }
  }

  const handlePhoneClick = () => {
    trackPhoneCallClick('contact_page', 'emergency_cell_button')
  }

  const handleScheduleClick = () => {
    trackScheduleConsultation('contact_page', 'emergency_cta')
  }

  // Map contact methods data to include icons and styling
  const contactMethods = contactMethodsData.map(method => ({
    icon: method.type === 'phone' ? Phone : method.type === 'whatsapp' ? MessageCircle : Mail,
    title: method.title,
    subtitle: method.subtitle,
    description: method.description,
    action: method.action,
    href: getContactHref(method),
    type: method.type,
    isPrimary: method.isPrimary,
    isWhatsApp: method.type === 'whatsapp'
  }))

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <main id="main-content">
        {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8"
            >
              <div className="text-sm font-montserrat font-medium tracking-widest uppercase text-gray-500 mb-6">
                {hero.label}
              </div>
              <h1
                className="text-6xl md:text-8xl font-bold leading-none mb-8"
                style={{ color: 'var(--theme-primary)' }}
              >
                {hero.title[0]}
                <span className="block">{hero.title[1]}</span>
              </h1>
              <div className="text-3xl md:text-4xl font-light text-gray-600 mb-8 leading-tight">
                {hero.subtitle}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4 space-y-6"
            >
              <div className="bg-red-50 p-6 border-l-4 border-red-500">
                <div className="text-sm font-montserrat font-semibold uppercase tracking-wide text-red-700 mb-2">
                  {emergency.label}
                </div>
                <div className="text-2xl font-bold text-red-700">{emergency.title}</div>
                <div className="text-sm text-red-600">{emergency.subtitle}</div>
              </div>
              

              <a
                href={`tel:${siteConfig.contact.phone.replace(/[^\d]/g, '')}`}
                onClick={handlePhoneClick}
                className="inline-flex items-center justify-center w-full px-6 py-3 font-montserrat font-semibold tracking-wide uppercase rounded-none transition-opacity duration-200 hover:opacity-90"
                style={{
                  backgroundColor: 'var(--theme-primary)',
                  color: 'var(--theme-primary-foreground)',
                }}
              >
                Call Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: 'var(--theme-primary)' }}
            >
              {sectionTitle}
            </h2>
            <div
              className="w-24 h-1 mx-auto"
              style={{ backgroundColor: 'var(--theme-primary)' }}
            ></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {contactMethods.map((method, index) => {
              const handleMethodClick = () => {
                if (method.type === 'phone') {
                  trackPhoneCallClick('contact_page', `${method.type}_button`)
                }
              }

              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative bg-white p-8 rounded-lg shadow-lg border-t-4 hover:shadow-xl transition-shadow duration-300"
                  style={{
                    borderTopColor: method.isWhatsApp ? '#10b981' : method.isPrimary ? 'var(--theme-primary)' : '#d1d5db'
                  }}
                >
                  {method.isPrimary && (
                    <div
                      className="absolute -top-3 left-6 px-4 py-1 text-sm font-semibold rounded"
                      style={{
                        backgroundColor: 'var(--theme-primary)',
                        color: 'var(--theme-primary-foreground)',
                      }}
                    >
                      RECOMMENDED
                    </div>
                  )}

                  <div className="flex items-center mb-4">
                    <div
                      className="w-12 h-12 flex items-center justify-center rounded-lg mr-4"
                      style={{
                        backgroundColor: method.isWhatsApp ? '#10b981' : method.isPrimary ? 'var(--theme-primary)' : '#f3f4f6'
                      }}
                    >
                      <method.icon
                        className="h-6 w-6"
                        style={{
                          color: method.isWhatsApp || method.isPrimary ? '#ffffff' : '#4b5563'
                        }}
                      />
                    </div>
                    <div>
                      <h3
                        className="text-xl font-bold"
                        style={{ color: 'var(--theme-primary)' }}
                      >
                        {method.title}
                      </h3>
                      <div className="text-sm text-gray-500 font-medium">{method.subtitle}</div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {method.description}
                  </p>

                  <a
                    href={method.href}
                    onClick={handleMethodClick}
                    target={method.isWhatsApp ? '_blank' : undefined}
                    rel={method.isWhatsApp ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-semibold tracking-wide uppercase rounded-none transition-opacity duration-200 hover:opacity-90"
                    style={
                      method.isPrimary
                        ? {
                            backgroundColor: 'var(--theme-primary)',
                            color: 'var(--theme-primary-foreground)',
                          }
                        : method.isWhatsApp
                        ? {
                            border: '2px solid #10b981',
                            color: '#059669',
                            backgroundColor: 'transparent',
                          }
                        : {
                            border: '2px solid var(--theme-primary)',
                            color: 'var(--theme-primary)',
                            backgroundColor: 'transparent',
                          }
                    }
                  >
                    {method.action}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-6 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">
              {disclaimer.title}
            </h3>
            <div className="space-y-2">
              {disclaimer.content.map((paragraph, index) => (
                <p key={index} className="text-xs text-gray-500 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Office Information & Map */}
      <section className="py-0 bg-white">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <iframe
              src={map.embedUrl}
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={map.title}
              tabIndex={-1}
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section
        className="py-20"
        style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-primary-foreground)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              {cta.title}
            </h2>
            <p className="text-xl mb-8 leading-relaxed opacity-90">
              {cta.description}
            </p>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/[^\d]/g, '')}`}
              onClick={handleScheduleClick}
              className="inline-flex items-center justify-center font-semibold font-montserrat tracking-wide uppercase px-8 py-4 rounded-none transition-opacity duration-200 hover:opacity-90"
              style={{
                backgroundColor: 'var(--theme-primary-foreground)',
                color: 'var(--theme-primary)',
              }}
            >
              {cta.buttonText}
            </a>
          </motion.div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  )
}
