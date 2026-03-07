"use client"

import type { TestimonialsContent } from "@/app/data"

interface TestimonialsSectionProps {
  content: TestimonialsContent
  sectionNumber?: string
  className?: string
}

export function TestimonialsSection({ content, sectionNumber, className = "" }: TestimonialsSectionProps) {
  return (
    <section className={`py-24 md:py-40 ${className}`} style={{ backgroundColor: "var(--surface)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
        <div className="mb-20 max-w-2xl" data-reveal="fade-up">
          {content.eyebrow && (
            <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "var(--accent)" }}>
              {sectionNumber && <span className="mr-3 font-bold">{sectionNumber}</span>}
              {content.eyebrow}
            </p>
          )}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold" style={{ color: "var(--fg)" }}>
            {content.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8" data-reveal="stagger">
          {content.testimonials.map((t) => (
            <div
              key={t.author}
              className="p-8 rounded-lg border transition-all duration-500 hover:border-[var(--accent)] flex flex-col"
              style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}
            >
              <div className="text-5xl leading-none mb-6" style={{ color: "var(--accent)" }}>
                &ldquo;
              </div>
              <blockquote
                className="text-lg italic leading-relaxed mb-8 flex-grow"
                style={{ color: "var(--fg)" }}
              >
                {t.quote}
              </blockquote>
              <div className="flex items-center gap-3 mt-auto">
                {t.imageSrc ? (
                  <img src={t.imageSrc} alt={t.author} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <svg
                    className="w-10 h-10 rounded-full"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect width="40" height="40" rx="20" fill="var(--accent)" />
                    <text
                      x="20"
                      y="25"
                      textAnchor="middle"
                      fill="var(--accent-fg)"
                      fontSize="16"
                      fontWeight="bold"
                    >
                      {t.author.charAt(0)}
                    </text>
                  </svg>
                )}
                <div>
                  <p className="font-semibold text-sm" style={{ color: "var(--fg)" }}>{t.author}</p>
                  {(t.role || t.company) && (
                    <p className="text-xs" style={{ color: "var(--fg-muted)" }}>
                      {t.role}{t.role && t.company && ", "}{t.company}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
