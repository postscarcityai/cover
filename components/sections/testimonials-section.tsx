"use client"

import { useEffect, useRef } from "react"
import { ScrambleEyebrow } from "@/components/scramble-eyebrow"
import type { TestimonialsContent } from "@/app/data"

interface TestimonialsSectionProps {
  content: TestimonialsContent
  sectionNumber?: string
  className?: string
}

export function TestimonialsSection({ content, sectionNumber, className = "" }: TestimonialsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    // Only horizontal scroll on desktop
    const isDesktop = window.innerWidth >= 1024
    if (!isDesktop) return

    let cleanup: (() => void) | null = null

    const init = async () => {
      try {
        const gsapModule = await import("gsap")
        const stModule = await import("gsap/ScrollTrigger")

        const gsap = (gsapModule as any).default || gsapModule
        const ScrollTrigger = (stModule as any).default || stModule
        gsap.registerPlugin(ScrollTrigger)

        // Calculate how far to scroll
        const trackWidth = track.scrollWidth
        const viewportWidth = window.innerWidth
        const distance = trackWidth - viewportWidth + 80 // 80px padding

        const tween = gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${distance}`,
            invalidateOnRefresh: true,
          },
        })

        cleanup = () => {
          tween.kill()
          ScrollTrigger.getAll().forEach((t: any) => {
            if (t.trigger === section) t.kill()
          })
        }
      } catch {}
    }

    init()

    return () => { cleanup?.() }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`py-24 md:py-40 overflow-hidden ${className}`}
      style={{ backgroundColor: "var(--surface)" }}
    >
      {/* Header — always visible */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 mb-16">
        <div className="max-w-2xl" data-reveal="fade-up">
          {content.eyebrow && (
            <ScrambleEyebrow sectionNumber={sectionNumber}>
              {content.eyebrow}
            </ScrambleEyebrow>
          )}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light" style={{ color: "var(--fg)" }}>
            {content.title}
          </h2>
        </div>
      </div>

      {/* Horizontal scroll track (desktop) / stacked grid (mobile) */}
      <div
        ref={trackRef}
        className="flex lg:flex-nowrap flex-wrap gap-6 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24"
      >
        {content.testimonials.map((t) => (
          <div
            key={t.author}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[420px] lg:min-w-[420px] flex-shrink-0 p-8 lg:p-10 border transition-all duration-500 hover:border-[var(--accent)] flex flex-col"
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
                    fontWeight="500"
                  >
                    {t.author.charAt(0)}
                  </text>
                </svg>
              )}
              <div>
                <p className="font-medium text-sm" style={{ color: "var(--fg)" }}>{t.author}</p>
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
    </section>
  )
}
