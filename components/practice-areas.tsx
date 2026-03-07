"use client"

import { motion } from "framer-motion"
import { Shield, Briefcase, Heart, Target, Gavel, Users, Car, Home } from 'lucide-react'
import { siteConfig } from "@/site.config"
import { themeClasses, typography } from "@/lib/theme-utils"

interface ServiceArea {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

interface PracticeAreasProps {
  className?: string
}

export function PracticeAreas({ className = "" }: PracticeAreasProps) {
  // Service areas from config - customize for each client
  const serviceAreas: ServiceArea[] = siteConfig.services || [
    {
      title: "Service Area 1",
      description: "Description of your first service area and what makes it valuable to clients.",
      icon: Briefcase
    },
    {
      title: "Service Area 2",
      description: "Description of your second service area and the benefits you provide.",
      icon: Heart
    },
    {
      title: "Service Area 3",
      description: "Description of your third service area and your expertise in this field.",
      icon: Shield
    },
    {
      title: "Service Area 4",
      description: "Description of your fourth service area and why clients choose you.",
      icon: Target
    },
    {
      title: "Service Area 5",
      description: "Description of your fifth service area and the value you deliver.",
      icon: Gavel
    },
    {
      title: "Service Area 6",
      description: "Description of your sixth service area and your competitive advantage.",
      icon: Users
    },
    {
      title: "Service Area 7",
      description: "Description of your seventh service area and the results you achieve.",
      icon: Car
    },
    {
      title: "Service Area 8",
      description: "Description of your eighth service area and what sets you apart.",
      icon: Home
    }
  ]

  return (
    <section id="practice-areas" className={`py-20 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className={`${typography.sectionTitle} font-bold mb-4`}
            style={{ color: 'var(--theme-primary)' }}
          >
            {siteConfig.servicesSection?.title || "What We Do"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {siteConfig.servicesSection?.description || "Explore our comprehensive range of services designed to meet your needs."}
          </p>
        </motion.div>

        {/* Service Areas Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="relative bg-white border-4 group cursor-pointer overflow-hidden"
              style={{ borderColor: 'var(--theme-primary)' }}
            >
              {/* Graphic novel-style corner accent */}
              <div
                className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] group-hover:opacity-80 transition-opacity duration-300"
                style={{ borderTopColor: 'var(--theme-primary)' }}
              />

              {/* Main content area */}
              <div className="p-8 relative z-10">
                {/* Icon with graphic novel styling */}
                <div className="relative mb-6">
                  <div
                    className="w-16 h-16 flex items-center justify-center group-hover:opacity-90 transition-opacity duration-300"
                    style={{ backgroundColor: 'var(--theme-primary)' }}
                  >
                    <area.icon
                      className="h-8 w-8"
                      style={{ color: 'var(--theme-primary-foreground)' }}
                    />
                  </div>
                  {/* Shadow effect */}
                  <div className="absolute top-2 left-2 w-16 h-16 bg-gray-300 -z-10" />
                </div>

                <h3
                  className="text-xl font-bold mb-4 group-hover:opacity-80 transition-opacity duration-300 leading-tight"
                  style={{ color: 'var(--theme-primary)' }}
                >
                  {area.title}
                </h3>

                <p className="text-gray-700 leading-relaxed text-sm font-medium">
                  {area.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 w-full h-1 group-hover:opacity-90 transition-opacity duration-300"
                style={{ backgroundColor: 'var(--theme-primary)' }}
              />

              {/* Subtle dot pattern overlay - using CSS variable */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, var(--theme-primary) 1px, transparent 0)`,
                  backgroundSize: '20px 20px'
                }}
              />
            </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
