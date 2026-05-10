"use client"

import {
  Shield, Target, Zap, Users, BarChart, Globe,
  Star, Heart, Award, Briefcase, type LucideIcon,
} from "lucide-react"
import type { FeaturesContent } from "@/app/data"

const iconMap: Record<string, LucideIcon> = {
  Shield, Target, Zap, Users, BarChart, Globe, Star, Heart, Award, Briefcase,
}

interface FeaturesSectionProps {
  content: FeaturesContent
  sectionNumber?: string
  className?: string
}

export function FeaturesSection({ content, sectionNumber, className = "" }: FeaturesSectionProps) {
  return (
    <section className={`py-24 md:py-32 ${className}`} style={{ backgroundColor: "var(--bg)" }}>
      <div className="container">
        <div className="mb-16 max-w-3xl" data-reveal="fade-up">
          {content.eyebrow && (
            <p className="text-xs tracking-[0.18em] uppercase mb-5 font-semibold" style={{ color: "var(--mute)" }}>
              {sectionNumber && <span className="mr-3">{sectionNumber}</span>}
              {content.eyebrow}
            </p>
          )}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-display-tight leading-[1.05] mb-6" style={{ color: "var(--ink)" }}>
            {content.title}
          </h2>
          {content.description && (
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--mute)" }}>
              {content.description}
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" data-reveal="stagger">
          {content.features.map((feature, index) => {
            const Icon = feature.icon ? iconMap[feature.icon] : null
            const number = String(index + 1).padStart(2, "0")

            return (
              <div
                key={feature.title}
                className="group p-8 rounded-3xl transition-colors duration-300"
                style={{
                  backgroundColor: "var(--surface)",
                }}
              >
                <div className="flex items-center justify-between mb-8">
                  {Icon ? (
                    <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--bg)" }}>
                      <Icon className="w-5 h-5" style={{ color: "var(--ink)" }} />
                    </div>
                  ) : null}
                  <span className="text-sm font-medium tabular-nums" style={{ color: "var(--mute)" }}>
                    {number}
                  </span>
                </div>
                <h3 className="text-2xl font-normal tracking-display-snug leading-[1.15] mb-3" style={{ color: "var(--ink)" }}>
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "var(--mute)" }}>
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
