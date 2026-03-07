"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { trackPhoneCallClick } from "@/lib/analytics"
import { trackScheduleConsultation } from "@/lib/analytics"
import { siteConfig } from "@/site.config"
import { themeClasses, typography } from "@/lib/theme-utils"

interface HeroSectionProps {
  className?: string
}

export function HeroSection({ className = "" }: HeroSectionProps) {
  const { scrollY } = useScroll()
  // Extended scroll range so hero continues animating until completely out of view
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.7])
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0])

  const handlePhoneClick = () => {
    trackPhoneCallClick('hero_section', 'call_button')
    window.location.href = `tel:${siteConfig.contact.phone}`
  }

  const handleScheduleClick = () => {
    trackScheduleConsultation('hero_section', 'cta_button')
    window.location.href = '/contact'
  }

  return (
    <section className={`relative h-screen flex items-center overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-white" />
      
      {/* Larger line art tucked in top left */}
      <svg 
        width="75%" 
        height="75%" 
        viewBox="0 0 558 344" 
        className="absolute top-0 left-0 opacity-20 pointer-events-none"
        preserveAspectRatio="xMinYMin meet"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-145 298.381C-126 231.272 -66.1533 177.445 -7.81602 143.796C75.4355 95.7769 174.883 68.6605 270.179 60.5579C347.788 53.9592 434.272 61.6085 504.316 98.7087C523.995 109.132 544.215 123.806 552.792 145.282C561.014 165.872 553.679 186.346 542.816 204.243C505.883 265.092 441.761 300.664 375.623 321.42C297.672 345.884 199.015 355.083 125.493 311.676C95.0271 293.689 82.0701 267.034 81.8812 231.741C81.5839 176.205 109.808 129.602 147.753 91.029C210.981 26.7534 291.736 -21.9008 375.211 -54.8029C431.045 -76.8103 489.099 -87.718 548.01 -97"
          stroke="var(--theme-primary)"
          strokeOpacity="0.4"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      
      <motion.div 
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 text-left max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-sm font-montserrat font-medium tracking-widest uppercase text-gray-600 mb-4"
        >
          {siteConfig.business.expertise.join(" • ")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className={`${typography.heroTitle} font-bold mb-6 leading-tight`}
          style={{ color: 'var(--theme-primary)' }}
        >
          {siteConfig.hero?.title || "Your Main Headline"}
          <span className="block" style={{ color: 'var(--theme-primary)' }}>{siteConfig.hero?.subtitle || "Your Secondary Headline"}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl mb-8 text-gray-600 font-light max-w-2xl"
        >
          {siteConfig.description}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            variant={null as any}
            size="lg"
            className="font-montserrat font-semibold text-lg px-8 py-4 tracking-wide uppercase rounded-full hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: 'var(--theme-primary)',
              color: 'var(--theme-primary-foreground)',
            }}
            onClick={handleScheduleClick}
          >
            {siteConfig.hero?.ctaPrimary || "Get Started"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant={null as any}
            size="lg"
            className="font-montserrat font-semibold text-lg px-8 py-4 tracking-wide uppercase rounded-full border-2 bg-white hover:opacity-90 transition-all"
            style={{
              borderColor: 'var(--theme-primary)',
              color: 'var(--theme-primary)',
            }}
            onClick={handlePhoneClick}
          >
            Call {siteConfig.contact.phoneDisplay}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
