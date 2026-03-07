"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { trackPhoneCallClick, trackScheduleConsultation } from "@/lib/analytics"
import { siteConfig } from "@/site.config"

interface BlogCTAProps {
  title?: string
  description?: string
  buttonText?: string
  buttonAction?: () => void
  className?: string
}

export function BlogCTA({ 
  title = "Need Legal Assistance?",
  description = "If you're facing criminal charges or under investigation, don't wait. Early intervention can make the difference in your case.",
  buttonText = "Schedule Consultation",
  buttonAction = () => window.location.href = '/contact',
  className = ""
}: BlogCTAProps) {
  const handlePhoneClick = () => {
    trackPhoneCallClick('blog_cta', 'call_button')
    window.location.href = `tel:${siteConfig.contact.phone.replace(/[^\d]/g, '')}`
  }

  const handleScheduleClick = () => {
    trackScheduleConsultation('blog_cta', 'schedule_button')
    if (buttonAction) buttonAction()
  }

  return (
    <section className={`py-20 bg-purple-accent-600 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            {title}
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-purple-accent-700 hover:bg-purple-accent-800 text-white font-semibold font-montserrat tracking-wide uppercase px-8 py-4 rounded-none"
              onClick={handleScheduleClick}
            >
              {buttonText}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white bg-transparent text-white hover:bg-white hover:text-purple-accent-600 font-montserrat font-semibold uppercase tracking-wide px-8 py-4 rounded-none"
              onClick={handlePhoneClick}
            >
              Call {siteConfig.contact.phone}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}