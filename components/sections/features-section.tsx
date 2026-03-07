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
    <section className={`py-24 md:py-40 ${className}`} style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="mb-20 max-w-2xl" data-reveal="fade-up">
          {content.eyebrow && (
            <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "var(--accent)" }}>
              {sectionNumber && <span className="mr-3 font-bold">{sectionNumber}</span>}
              {content.eyebrow}
            </p>
          )}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: "var(--fg)" }}>
            {content.title}
          </h2>
          {content.description && (
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              {content.description}
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-reveal="stagger">
          {content.features.map((feature, index) => {
            const Icon = feature.icon ? iconMap[feature.icon] : null
            const number = String(index + 1).padStart(2, "0")

            return (
              <div
                key={feature.title}
                className="group p-8 rounded-lg border transition-all duration-500 hover:border-[var(--accent)]"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  {Icon ? (
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)" }}
                    >
                      <Icon className="w-6 h-6" style={{ color: "var(--accent)" }} />
                    </div>
                  ) : null}
                  <span
                    className="text-3xl font-bold"
                    style={{ color: "color-mix(in srgb, var(--accent) 30%, transparent)" }}
                  >
                    {number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--fg)" }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
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
