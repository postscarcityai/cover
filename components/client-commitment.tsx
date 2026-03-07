"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/site.config"
import { getTheme } from "@/theme.config"

interface ClientCommitmentProps {
  className?: string
}

export function ClientCommitment({ className = "" }: ClientCommitmentProps) {
  // Get theme typography directly to avoid hydration issues
  const theme = getTheme(siteConfig.theme)
  
  return (
    <section
      className={`py-16 md:py-20 ${className}`}
      style={{ backgroundColor: 'var(--theme-muted)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            className={`${theme.typography.sectionTitle} font-bold mb-8`}
            style={{ color: 'var(--theme-primary)' }}
            suppressHydrationWarning
          >
            {siteConfig.commitment?.title || "Our Commitment to Excellence"}
          </h2>
          <p
            className="text-xl mb-8 leading-relaxed"
            style={{ color: 'var(--theme-foreground)' }}
          >
            {siteConfig.commitment?.description || "We're dedicated to delivering exceptional results and building lasting relationships with every client we serve."}
          </p>
          <Button
            variant={null as any}
            size="lg"
            className="font-semibold font-montserrat tracking-wide uppercase px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: 'var(--theme-primary)',
              color: 'var(--theme-primary-foreground)',
            }}
            onClick={() => window.location.href = siteConfig.cta.primary.href}
          >
            {siteConfig.commitment?.ctaText || siteConfig.cta.primary.text}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
