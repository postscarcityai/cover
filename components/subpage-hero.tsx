"use client"

interface Breadcrumb {
  label: string
  href?: string
}

interface SubpageHeroProps {
  title: string
  description?: string
  backgroundImage?: string
  breadcrumbs?: Breadcrumb[]
  size?: "default" | "compact"
  align?: "left" | "center"
  children?: React.ReactNode
  className?: string
  /** `white` uses the theme paper color (`--background`), usually pure white in light mode. */
  background?: "theme" | "white"
  /** Render a shader canvas or other element behind the text layer. */
  backgroundSlot?: React.ReactNode
}

export function SubpageHero({
  title,
  description,
  backgroundImage,
  breadcrumbs,
  size = "default",
  align = "left",
  children,
  className = "",
  background = "theme",
  backgroundSlot,
}: SubpageHeroProps) {
  const minHeight =
    size === "compact"
      ? "min-h-[40vh]"
      : "min-h-[60vh]"
  const textAlign = align === "center" ? "text-center items-center" : "items-start"
  const isPaper = background === "white"

  return (
    <section
      className={`relative ${minHeight} flex items-end overflow-hidden ${className}`}
      style={{
        backgroundColor: isPaper ? "hsl(var(--background))" : "var(--bg)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isPaper
            ? "radial-gradient(ellipse 55% 45% at 88% 32%, color-mix(in srgb, var(--accent) 5%, transparent), transparent)"
            : "radial-gradient(ellipse 80% 60% at 50% 40%, color-mix(in srgb, var(--accent) 6%, transparent), transparent)",
        }}
      />

      {backgroundImage && (
        <div
          data-reveal="parallax"
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {backgroundSlot}

      <div
        className={`relative z-10 w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 pb-16 md:pb-24 pt-32 md:pt-40 max-w-7xl flex flex-col ${textAlign}`}
      >
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-8"
            data-reveal="fade-up"
          >
            <ol
              className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase px-4 py-2 rounded-full w-fit"
              style={{ backgroundColor: "color-mix(in srgb, var(--bg-inverse) 20%, transparent)" }}
            >
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {i > 0 && (
                    <span style={{ color: "var(--fg-muted)", opacity: 0.4 }}>/</span>
                  )}
                  {crumb.href ? (
                    <a
                      href={crumb.href}
                      className="transition-colors hover:opacity-100"
                      style={{ color: "var(--fg-muted)", opacity: 0.6 }}
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span style={{ color: "var(--accent)" }}>{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <h1
          data-reveal="words"
          className="text-5xl sm:text-6xl md:text-7xl font-light leading-[0.95] tracking-tight mb-8"
          style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
        >
          {title}
        </h1>

        {description && (
          <p
            data-reveal="fade-up"
            className={`text-lg md:text-xl leading-relaxed ${align === "center" ? "max-w-3xl" : "max-w-2xl"}`}
            style={{ color: "var(--fg-muted)" }}
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
