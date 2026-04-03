"use client"

import { useRef } from "react"
import {
  Shield, Target, Zap, Users, BarChart, Globe,
  Star, Heart, Award, Briefcase, type LucideIcon,
} from "lucide-react"
import { HeroGoldSeamOverlay } from "@/components/hero-gold-seam-overlay"
import { ScrambleEyebrow } from "@/components/scramble-eyebrow"
import type { FeaturesContent } from "@/app/data"

const iconMap: Record<string, LucideIcon> = {
  Shield, Target, Zap, Users, BarChart, Globe, Star, Heart, Award, Briefcase,
}

interface FeaturesSectionProps {
  content: FeaturesContent
  sectionNumber?: string
  className?: string
  /** When true (hero is the section above), paint a transparent gold layer across the seam. */
  seamGoldFromHero?: boolean
}

export function FeaturesSection({
  content,
  sectionNumber,
  className = "",
  seamGoldFromHero = false,
}: FeaturesSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)

  return (
    <section
      ref={sectionRef}
      className={`relative isolate py-24 md:py-40 ${className}`}
      style={{ backgroundColor: "var(--bg)" }}
    >
      {seamGoldFromHero && <HeroGoldSeamOverlay anchorRef={sectionRef} />}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
        {/* Header */}
        <div className="mb-16 md:mb-24 max-w-3xl" data-reveal="fade-up">
          {content.eyebrow && (
            <ScrambleEyebrow sectionNumber={sectionNumber}>
              {content.eyebrow}
            </ScrambleEyebrow>
          )}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6" style={{ color: "var(--fg)" }}>
            {content.title}
          </h2>
          {content.description && (
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              {content.description}
            </p>
          )}
        </div>

        {/* Feature rows — clean horizontal layout */}
        <div className="space-y-0 border-t" style={{ borderColor: "var(--border)" }} data-reveal="stagger">
          {content.features.map((feature, index) => {
            const Icon = feature.icon ? iconMap[feature.icon] : null
            const number = String(index + 1).padStart(2, "0")

            return (
              <div
                key={feature.title}
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-b transition-colors duration-300"
                style={{ borderColor: "var(--border)" }}
              >
                {/* Number + Icon */}
                <div className="md:col-span-1 flex items-start gap-4 md:gap-0 md:flex-col md:items-start">
                  <span
                    className="text-xs font-medium tracking-wider tabular-nums"
                    style={{ color: "var(--fg-muted)", opacity: 0.4 }}
                  >
                    {number}
                  </span>
                  {Icon && (
                    <Icon
                      className="w-5 h-5 md:mt-3 transition-colors duration-300"
                      style={{ color: "var(--accent)" }}
                    />
                  )}
                </div>

                {/* Title */}
                <div className="md:col-span-4">
                  <h3 className="text-xl md:text-2xl font-medium" style={{ color: "var(--fg)" }}>
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="md:col-span-7">
                  <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
