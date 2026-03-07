"use client"

import type { StatsContent } from "@/app/data"

interface StatsSectionProps {
  content: StatsContent
  className?: string
}

export function StatsSection({ content, className = "" }: StatsSectionProps) {
  return (
    <section
      className={`py-20 md:py-28 ${className}`}
      style={{ backgroundColor: "var(--accent)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {content.stats.map((stat) => (
            <div key={stat.label} className="text-left" data-reveal="fade-up">
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2" style={{ color: "var(--accent-fg)" }}>
                {stat.value}
                {stat.suffix && <span className="text-3xl md:text-4xl opacity-80">{stat.suffix}</span>}
              </div>
              <p className="text-sm tracking-wider uppercase opacity-70" style={{ color: "var(--accent-fg)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
