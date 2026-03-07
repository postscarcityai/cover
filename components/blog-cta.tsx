"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/magnetic-button"
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
  title = "Ready to Get Started?",
  description = "Take the next step. Our team is here to help you navigate the path forward with confidence.",
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
    <section
      className={`py-24 md:py-40 ${className}`}
      style={{ background: 'linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 text-center">
        <div data-reveal="fade-up">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--fg)' }}
          >
            {title}
          </h2>
          <p
            className="text-lg md:text-xl mb-12 leading-relaxed max-w-3xl mx-auto"
            style={{ color: 'var(--fg-muted)' }}
          >
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton>
              <Button 
                variant={null as any}
                size="lg"
                className="font-semibold text-base px-10 py-5 tracking-wide uppercase rounded-full transition-all hover:scale-105"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-fg)' }}
                onClick={handleScheduleClick}
              >
                {buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button
                variant={null as any}
                size="lg"
                className="font-semibold text-base px-10 py-5 tracking-wide uppercase rounded-full border transition-all hover:scale-105"
                style={{ borderColor: 'var(--border)', color: 'var(--fg-muted)', backgroundColor: 'transparent' }}
                onClick={handlePhoneClick}
              >
                Call {siteConfig.contact.phoneDisplay}
              </Button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}