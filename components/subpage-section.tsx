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

// Inside the shared `container`: "wide" fills it (edges align with the
// homepage sections), "narrow" is a centered prose column.
const widthClasses: Record<SectionWidth, string> = {
  narrow: "max-w-4xl mx-auto",
  wide: "max-w-none",
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
      className={`py-24 md:py-32 ${className}`}
      style={bgStyles[background]}
    >
      {/* `container` matches the homepage sections, so subpage content edges
          line up with the DTC sections at every breakpoint. maxWidth narrows
          the inner column without changing the shared gutter geometry. */}
      <div className="container">
        <div className={widthClasses[maxWidth]}>
        {(eyebrow || title || description) && (
          <div className="mb-16 md:mb-20 max-w-2xl" data-reveal="fade-up">
            {eyebrow && (
              <p
                className="text-xs tracking-[0.18em] uppercase font-semibold mb-6"
                style={{ color: accentColor }}
              >
                {sectionNumber && (
                  <span className="mr-3 font-bold">{sectionNumber}</span>
                )}
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-display-tight leading-[1.05] mb-6"
                style={{ color: fgColor }}
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
      </div>
    </section>
  )
}
