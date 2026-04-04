"use client"

import { HeroDotField } from "@/components/hero-dot-field"

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

  return (
    <section
      className={`relative ${minHeight} flex items-end overflow-visible ${className}`}
      style={{
        background:
          "linear-gradient(145deg, var(--hero-shell-a) 0%, var(--hero-shell-b) 42%, var(--hero-shell-c) 100%)",
      }}
    >
      {/* Dot field — always present, sits under any shader/image overlays */}
      <HeroDotField className="pointer-events-none z-[1]" />

      {backgroundImage && (
        <div
          data-reveal="parallax"
          className="absolute inset-0 bg-cover bg-center opacity-15 z-[2]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Shader container — oversized so shapes bleed into the next section */}
      {backgroundSlot && (
        <div
          className="absolute inset-x-0 top-0 z-[2] pointer-events-none"
          style={{ height: "160%" }}
        >
          {backgroundSlot}
        </div>
      )}

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
          className="text-6xl sm:text-7xl md:text-8xl font-light leading-[0.95] tracking-tight mb-8"
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
