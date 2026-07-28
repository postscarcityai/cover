"use client"

import Link from "next/link"
import { useRef } from "react"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { LINES } from "@/components/page-kit"
import type { CarouselContent } from "@/app/data"

interface CarouselSectionProps {
  content: CarouselContent
  className?: string
}

/**
 * Horizontal snap-scroll card carousel. The title block sits to the left
 * (sticky on desktop) and the cards scroll horizontally beside it, bleeding
 * off the right viewport edge. Scroll-snap settles every release on the
 * nearest card; arrows step one card. Each card carries a rotating on-brand
 * accent line (LINES from page-kit).
 */
export function CarouselSection({ content, className = "" }: CarouselSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>("[data-card]")
    const step = card ? card.offsetWidth + 16 : track.clientWidth * 0.8
    track.scrollBy({ left: dir * step, behavior: "smooth" })
  }

  const CardInner = ({ card, line }: { card: CarouselContent["cards"][number]; line: string }) => (
    <>
      <div className="flex flex-col flex-1 p-6">
        <h3
          className="text-xl font-bold mb-2"
          style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
        >
          {card.title}
        </h3>
        <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "var(--fg-muted)" }}>
          {card.description}
        </p>
        {card.href && (
          <span
            className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-medium"
            style={{ color: "var(--accent)" }}
          >
            Explore
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        )}
      </div>
      {/* On-brand accent line — grows on hover */}
      <div className="h-1 group-hover:h-1.5 transition-all" style={{ background: line }} />
    </>
  )

  return (
    <section className={`py-24 md:py-32 ${className}`}>
      <div className="container">
        <div className="lg:flex lg:items-start lg:gap-10">
          {/* Title block — sticky on desktop so the cards scroll past it */}
          <div className="lg:w-[34%] lg:shrink-0 lg:sticky lg:top-32 mb-10 lg:mb-0 z-10">
            {content.eyebrow && (
              <p
                className="text-xs tracking-[0.18em] uppercase mb-4 font-semibold"
                style={{ color: "var(--accent)" }}
              >
                {content.eyebrow}
              </p>
            )}
            <h2
              className="font-display text-4xl md:text-5xl font-normal tracking-display-tight leading-[1.05] mb-4"
              style={{ color: "var(--fg)" }}
            >
              {content.title}
            </h2>
            {content.description && (
              <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--fg-muted)" }}>
                {content.description}
              </p>
            )}

            {/* Arrows (left) and "see all" (right) share one row on desktop.
                Arrows are hidden on touch-first mobile where you simply swipe. */}
            <div className="hidden lg:flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollByCard(-1)}
                  aria-label="Previous"
                  className="grid place-items-center h-12 w-12 rounded-full border transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  style={{ borderColor: "var(--border)", color: "var(--fg)" }}
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByCard(1)}
                  aria-label="Next"
                  className="grid place-items-center h-12 w-12 rounded-full border transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  style={{ borderColor: "var(--border)", color: "var(--fg)" }}
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
              {content.seeAllHref && (
                <Link
                  href={content.seeAllHref}
                  className="inline-flex items-center gap-1 text-sm font-medium hover:underline whitespace-nowrap"
                  style={{ color: "var(--accent)" }}
                >
                  {content.seeAllText ?? "See all"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Scroll viewport — on desktop the right margin pulls the track to
              the viewport edge so the row bleeds off-screen right; the left
              stays aligned with the content. */}
          <div className="min-w-0 flex-1 -mx-6 md:-mx-10 lg:ml-0 lg:mr-[calc(50%-50vw)]">
            <div
              ref={trackRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 md:px-10 lg:pl-0 lg:pr-16 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {content.cards.map((card, i) => {
                const line = LINES[i % LINES.length]
                const cardClass =
                  "group snap-start shrink-0 w-[min(78vw,320px)] flex flex-col rounded-2xl border overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5"
                const cardStyle = {
                  borderColor: "var(--border)",
                  backgroundColor: `color-mix(in srgb, ${line} 5%, var(--surface))`,
                }
                return card.href ? (
                  <Link key={i} data-card href={card.href} className={cardClass} style={cardStyle}>
                    <CardInner card={card} line={line} />
                  </Link>
                ) : (
                  <div key={i} data-card className={cardClass} style={cardStyle}>
                    <CardInner card={card} line={line} />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile "see all" — the desktop link lives on the arrows row above */}
          {content.seeAllHref && (
            <Link
              href={content.seeAllHref}
              className="lg:hidden mt-10 inline-flex items-center gap-1 text-sm font-medium hover:underline"
              style={{ color: "var(--accent)" }}
            >
              {content.seeAllText ?? "See all"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
