"use client"

import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema } from "@/lib/schema"

interface Breadcrumb {
  label: string
  href?: string
}

interface SubpageHeroProps {
  eyebrow?: string
  title: string
  description?: string
  /** Full-bleed background image; switches the hero to dark-field/white-text. */
  backgroundImage?: string
  breadcrumbs?: Breadcrumb[]
  size?: "default" | "compact"
  align?: "left" | "center"
  children?: React.ReactNode
  className?: string
  /** Extra classes for the <h1> — e.g. a max-width to tighten the wrap. */
  titleClassName?: string
}

export function SubpageHero({
  eyebrow,
  title,
  description,
  backgroundImage,
  breadcrumbs,
  size = "default",
  align = "left",
  children,
  className = "",
  titleClassName = "",
}: SubpageHeroProps) {
  const minHeight = size === "compact" ? "min-h-[40vh]" : "min-h-[60vh]"
  const textAlign = align === "center" ? "text-center items-center" : "items-start"
  const hasBgImage = !!backgroundImage

  return (
    <section
      className={`relative ${minHeight} flex items-end overflow-hidden ${className}`}
      style={{ backgroundColor: hasBgImage ? "var(--hero-dark, #10141f)" : "var(--bg)" }}
    >
      {hasBgImage ? (
        <div
          className="absolute inset-0 bg-cover bg-right lg:bg-center ken-burns-zoom"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden
        />
      ) : (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, color-mix(in srgb, var(--accent) 6%, transparent), transparent)",
          }}
          aria-hidden
        />
      )}

      <div
        className={`relative z-10 w-full container pb-16 md:pb-24 pt-32 md:pt-40 flex flex-col ${textAlign}`}
      >
        {/* Breadcrumb JSON-LD is emitted from the same data as the visible
            trail, so markup and structured data can never drift apart. */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <JsonLd data={breadcrumbSchema(breadcrumbs)} />
        )}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8" data-reveal="fade-up">
            <ol className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {i > 0 && (
                    <span
                      className={hasBgImage ? "text-white/40" : ""}
                      style={!hasBgImage ? { color: "var(--fg-muted)", opacity: 0.4 } : undefined}
                    >
                      /
                    </span>
                  )}
                  {crumb.href ? (
                    <a
                      href={crumb.href}
                      className={`transition-colors hover:opacity-100 ${hasBgImage ? "text-white/70" : ""}`}
                      style={!hasBgImage ? { color: "var(--fg-muted)", opacity: 0.6 } : undefined}
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span
                      className={hasBgImage ? "text-white" : ""}
                      style={!hasBgImage ? { color: "var(--accent)" } : undefined}
                    >
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <p
            data-reveal="fade-up"
            className={`text-xs tracking-[0.3em] uppercase mb-6 ${hasBgImage ? "text-white/90 font-semibold" : ""}`}
            style={!hasBgImage ? { color: "var(--accent)" } : undefined}
          >
            {eyebrow}
          </p>
        )}

        <h1
          data-reveal="words"
          className={`font-display text-5xl sm:text-6xl md:text-7xl font-normal leading-[0.95] tracking-display-tight mb-8 ${hasBgImage ? "text-white" : ""} ${titleClassName}`}
          style={{ color: hasBgImage ? undefined : "var(--fg)" }}
        >
          {title}
        </h1>

        {description && (
          <p
            data-reveal="fade-up"
            className={`text-lg md:text-xl leading-relaxed ${hasBgImage ? "text-white/85" : ""} ${align === "center" ? "max-w-3xl" : "max-w-2xl"}`}
            style={{ color: hasBgImage ? undefined : "var(--fg-muted)" }}
          >
            {description}
          </p>
        )}

        {children && (
          <div data-reveal="fade-up" className="mt-10 w-full">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
