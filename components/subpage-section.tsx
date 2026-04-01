"use client"

type SectionBackground = "default" | "surface" | "accent" | "gradient"
type SectionWidth = "narrow" | "wide" | "full"

interface SubpageSectionProps {
  background?: SectionBackground
  maxWidth?: SectionWidth
  eyebrow?: string
  sectionNumber?: string
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  id?: string
}

const bgStyles: Record<SectionBackground, React.CSSProperties> = {
  default: { backgroundColor: "var(--bg)" },
  surface: { backgroundColor: "var(--surface)" },
  accent: { backgroundColor: "var(--accent)" },
  gradient: {
    background: "linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%)",
  },
}

const widthClasses: Record<SectionWidth, string> = {
  narrow: "max-w-4xl",
  wide: "max-w-7xl",
  full: "max-w-none",
}

export function SubpageSection({
  background = "default",
  maxWidth = "wide",
  eyebrow,
  sectionNumber,
  title,
  description,
  children,
  className = "",
  id,
}: SubpageSectionProps) {
  const isAccent = background === "accent"
  const fgColor = isAccent ? "var(--accent-fg)" : "var(--fg)"
  const fgMutedColor = isAccent ? "var(--accent-fg)" : "var(--fg-muted)"
  const accentColor = isAccent ? "var(--accent-fg)" : "var(--accent)"

  return (
    <section
      id={id}
      className={`py-24 md:py-40 ${className}`}
      style={bgStyles[background]}
    >
      <div
        className={`${widthClasses[maxWidth]} mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24`}
      >
        {(eyebrow || title || description) && (
          <div className="mb-20 max-w-2xl" data-reveal="fade-up">
            {eyebrow && (
              <p
                className="text-xs tracking-[0.3em] uppercase mb-6"
                style={{ color: accentColor }}
              >
                {sectionNumber && (
                  <span className="mr-3 font-medium">{sectionNumber}</span>
                )}
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-light mb-6"
                style={{ fontFamily: "var(--font-heading)", color: fgColor }}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className="text-lg leading-relaxed"
                style={{ color: fgMutedColor, opacity: isAccent ? 0.8 : 1 }}
              >
                {description}
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  )
}
