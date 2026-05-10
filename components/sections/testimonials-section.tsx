"use client"

import type { TestimonialsContent } from "@/app/data"

interface TestimonialsSectionProps {
  content: TestimonialsContent
  sectionNumber?: string
  className?: string
}

export function TestimonialsSection({ content, sectionNumber, className = "" }: TestimonialsSectionProps) {
  return (
    <section className={`py-24 md:py-32 ${className}`} style={{ backgroundColor: "var(--surface)" }}>
      <div className="container">
        <div className="mb-16 max-w-3xl" data-reveal="fade-up">
          {content.eyebrow && (
            <p className="text-xs tracking-[0.18em] uppercase mb-5 font-semibold" style={{ color: "var(--mute)" }}>
              {sectionNumber && <span className="mr-3">{sectionNumber}</span>}
              {content.eyebrow}
            </p>
          )}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-display-tight leading-[1.05]" style={{ color: "var(--ink)" }}>
            {content.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4" data-reveal="stagger">
          {content.testimonials.map((t) => (
            <div
              key={t.author}
              className="p-8 rounded-3xl flex flex-col"
              style={{ backgroundColor: "var(--bg)" }}
            >
              <blockquote
                className="text-xl leading-snug mb-8 flex-grow tracking-display-snug"
                style={{ color: "var(--ink)" }}
              >
                &ldquo;{t.quote}&rdquo;
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
                    <rect width="40" height="40" rx="20" fill="var(--surface-warm)" />
                    <text
                      x="20"
                      y="25"
                      textAnchor="middle"
                      fill="var(--ink)"
                      fontSize="16"
                      fontWeight="500"
                    >
                      {t.author.charAt(0)}
                    </text>
                  </svg>
                )}
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--ink)" }}>{t.author}</p>
                  {(t.role || t.company) && (
                    <p className="text-xs" style={{ color: "var(--mute)" }}>
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
