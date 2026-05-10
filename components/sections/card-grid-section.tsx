"use client"

import { ArrowRight } from "lucide-react"
import type { CardGridContent, BigCard, SmallCard } from "@/app/data"

interface CardGridSectionProps {
  content: CardGridContent
  className?: string
}

/**
 * Card-grid section — modeled on ro.co's homepage layout.
 * Two large featured cards (2-up) on top, optional row of small icon cards below.
 * Solid color blocks act as the placeholder when no imageSrc is provided.
 */
export function CardGridSection({ content, className = "" }: CardGridSectionProps) {
  const featured = content.featured ?? []
  const grid = content.grid ?? []

  return (
    <section className={`py-12 md:py-16 ${className}`} style={{ backgroundColor: "var(--bg)" }}>
      <div className="container">
        {(content.eyebrow || content.title) && (
          <div className="mb-10 max-w-3xl" data-reveal="fade-up">
            {content.eyebrow && (
              <p className="text-xs tracking-[0.18em] uppercase mb-5 font-semibold" style={{ color: "var(--mute)" }}>
                {content.eyebrow}
              </p>
            )}
            {content.title && (
              <h2 className="text-4xl md:text-5xl font-normal tracking-display-tight leading-[1.05]" style={{ color: "var(--ink)" }}>
                {content.title}
              </h2>
            )}
          </div>
        )}

        {/* Big featured cards */}
        {featured.length > 0 && (
          <div className="grid md:grid-cols-2 gap-3 mb-3" data-reveal="stagger">
            {featured.map((card, i) => (
              <BigCardTile key={i} card={card} />
            ))}
          </div>
        )}

        {/* Small grid cards */}
        {grid.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3" data-reveal="stagger">
            {grid.map((card, i) => (
              <SmallCardTile key={i} card={card} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* -------------------- Big card -------------------- */

function BigCardTile({ card }: { card: BigCard }) {
  const dark = card.textColor === "light"
  const fg = dark ? "#ffffff" : "var(--ink)"
  const bg = card.bg ?? "var(--surface-warm)"

  const onClick = card.ctaHref
    ? () => (window.location.href = card.ctaHref!)
    : undefined

  return (
    <div
      onClick={onClick}
      role={onClick ? "link" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className="group relative aspect-[16/11] sm:aspect-[3/2] lg:aspect-[16/11] rounded-3xl overflow-hidden p-8 lg:p-10 flex flex-col justify-between cursor-pointer transition-transform duration-300 hover:-translate-y-0.5"
      style={{
        backgroundColor: bg,
        backgroundImage: card.imageSrc ? `url(${card.imageSrc})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h3
        className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-display-snug leading-[1.1] max-w-[80%]"
        style={{ color: fg }}
      >
        {card.title}
      </h3>

      {card.ctaText && (
        <div className="self-end">
          <span
            className="inline-flex items-center gap-2 px-4 h-9 rounded-pill text-sm font-medium transition-opacity"
            style={{ backgroundColor: "var(--ink)", color: "#ffffff" }}
          >
            {card.ctaText}
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      )}
    </div>
  )
}

/* -------------------- Small card -------------------- */

function SmallCardTile({ card }: { card: SmallCard }) {
  const bg = card.bg ?? "var(--surface-warm)"
  const onClick = card.href
    ? () => (window.location.href = card.href!)
    : undefined

  return (
    <div
      onClick={onClick}
      role={onClick ? "link" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className="group rounded-3xl p-6 flex items-center gap-4 cursor-pointer transition-transform duration-300 hover:-translate-y-0.5"
      style={{ backgroundColor: bg }}
    >
      {/* Icon / image slot — placeholder is just a soft rounded square */}
      <div
        className="w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center overflow-hidden"
        style={{
          backgroundColor: card.iconBg ?? "var(--bg)",
          backgroundImage: card.iconSrc ? `url(${card.iconSrc})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* If no image, render an inline placeholder mark */}
        {!card.iconSrc && (
          <span className="text-base font-medium tracking-display-snug" style={{ color: "var(--ink)", opacity: 0.6 }}>
            ▢
          </span>
        )}
      </div>

      <h3 className="flex-1 text-lg md:text-xl font-normal tracking-display-snug leading-[1.2]" style={{ color: "var(--ink)" }}>
        {card.title}
      </h3>

      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:translate-x-0.5"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <ArrowRight className="h-4 w-4" style={{ color: "#ffffff" }} />
      </div>
    </div>
  )
}
