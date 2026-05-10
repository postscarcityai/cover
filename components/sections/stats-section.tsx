"use client"

import type { StatsContent } from "@/app/data"

interface StatsSectionProps {
  content: StatsContent
  className?: string
}

export function StatsSection({ content, className = "" }: StatsSectionProps) {
  return (
    <section
      className={`py-20 md:py-24 ${className}`}
      style={{ backgroundColor: "var(--accent)" }}
    >
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {content.stats.map((stat) => (
            <div key={stat.label} className="text-left" data-reveal="fade-up">
              <div
                className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-display-tight leading-[0.95] mb-3"
                style={{ color: "var(--accent-ink)" }}
              >
                {stat.value}
                {stat.suffix && (
                  <span className="text-3xl md:text-4xl font-normal opacity-80">{stat.suffix}</span>
                )}
              </div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--accent-ink)", opacity: 0.7 }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
