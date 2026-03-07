"use client"

import { motion } from "framer-motion"
import { CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { siteConfig } from "@/site.config"
import { themeClasses, typography } from "@/lib/theme-utils"

interface Achievement {
  id: string
  title: string
  shortDescription: string
}

interface ResultsTickerProps {
  className?: string
}

export function ResultsTicker({ className = "" }: ResultsTickerProps) {
  const router = useRouter()

  // Achievements from config - customize for each client
  const results: Achievement[] = siteConfig.achievements || [
    {
      id: "achievement-1",
      title: "Achievement 1: Brief description of what was accomplished",
      shortDescription: ""
    },
    {
      id: "achievement-2",
      title: "Achievement 2: Notable outcome or milestone reached",
      shortDescription: ""
    },
    {
      id: "achievement-3",
      title: "Achievement 3: Significant result for a client",
      shortDescription: ""
    },
    {
      id: "achievement-4",
      title: "Achievement 4: Important project completion",
      shortDescription: ""
    },
    {
      id: "achievement-5",
      title: "Achievement 5: Measurable success story",
      shortDescription: ""
    },
    {
      id: "achievement-6",
      title: "Achievement 6: Client satisfaction highlight",
      shortDescription: ""
    },
    {
      id: "achievement-7",
      title: "Achievement 7: Industry recognition or award",
      shortDescription: ""
    },
    {
      id: "achievement-8",
      title: "Achievement 8: Strategic partnership or growth",
      shortDescription: ""
    }
  ]

  const handleResultClick = (resultId: string) => {
    router.push(`/results`)
    // Start at top and then scroll to element with proper offset
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
      setTimeout(() => {
        const element = document.getElementById(resultId)
        if (element) {
          const elementPosition = element.offsetTop
          const offsetPosition = elementPosition - 120 // Account for navigation height
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
    }, 50)
  }

  return (
    <section
      id="results"
      className={`py-16 overflow-hidden ${className}`}
      style={{ backgroundColor: 'var(--theme-primary)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`${typography.sectionTitle} font-bold text-center mb-4`}
          style={{ color: 'var(--theme-primary-foreground)' }}
        >
          {siteConfig.achievementsSection?.title || "Our Track Record"}
        </motion.h2>
        <p
          className="text-center text-lg opacity-90"
          style={{ color: 'var(--theme-primary-foreground)' }}
        >
          {siteConfig.achievementsSection?.description || "Recent achievements and milestones that demonstrate our commitment to excellence"}
        </p>
      </div>

      <div className="relative">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex space-x-8 whitespace-nowrap"
        >
          {[...results, ...results].map((result, index) => (
            <motion.div
              key={`${result.id}-${index}`}
              whileHover={{ scale: 1.05, y: -2 }}
              onClick={() => handleResultClick(result.id)}
              className="flex items-center space-x-4 bg-white/10 hover:bg-white/20 px-6 py-4 rounded-lg cursor-pointer transition-all duration-300 border border-white/20 hover:border-white/40"
            >
              <CheckCircle
                className="h-6 w-6 flex-shrink-0"
                style={{ color: 'var(--theme-primary-foreground)' }}
              />
              <span
                className="font-medium"
                style={{ color: 'var(--theme-primary-foreground)' }}
              >
                {result.title}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
