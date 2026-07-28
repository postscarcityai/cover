import type { ReactNode } from "react"
import Image from "next/image"

/* ============================================================
   Shared layout primitives for hand-composed landing pages.
   One source of truth so custom pages stay visually identical
   to the section-renderer pages.
   ============================================================ */

/**
 * On-brand accent palette — derived from --accent (and --trust when the theme
 * defines it) via color-mix so card accent lines carry quiet variety and
 * track the theme.
 */
export const LINES = [
  "var(--accent)",
  "var(--trust, var(--ink))",
  "color-mix(in srgb, var(--accent) 55%, var(--trust, var(--ink)))",
  "color-mix(in srgb, var(--trust, var(--ink)) 70%, #ffffff)",
  "color-mix(in srgb, var(--accent) 70%, #ffffff)",
  "color-mix(in srgb, var(--accent) 50%, var(--trust, var(--ink)))",
] as const

/** Full-width section with a max-width container, standard padding, optional surface bg. */
export function Section({
  id,
  surface,
  className = "",
  children,
}: {
  id?: string
  surface?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={`py-24 md:py-32 ${className}`}
      style={surface ? { backgroundColor: "var(--surface)" } : undefined}
    >
      <div className="container">{children}</div>
    </section>
  )
}

/** Eyebrow (accent small-caps) + large h2 + optional intro paragraph. */
export function SectionTitle({
  eyebrow,
  title,
  intro,
  className = "",
}: {
  eyebrow?: string
  title: string
  intro?: string
  className?: string
}) {
  return (
    <div className={`max-w-3xl ${className}`} data-reveal="fade-up">
      {eyebrow && (
        <p
          className="text-xs tracking-[0.18em] uppercase mb-4 font-semibold"
          style={{ color: "var(--accent)" }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-display-tight leading-[1.05]"
        style={{ color: "var(--fg)" }}
      >
        {title}
      </h2>
      {intro && (
        <p className="text-lg leading-relaxed mt-5" style={{ color: "var(--fg-muted)" }}>
          {intro}
        </p>
      )}
    </div>
  )
}

/** Bordered tile with a tinted wash and a bottom accent line that grows on hover. */
export function AccentCard({
  line,
  className = "",
  children,
}: {
  line: string
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={`group flex flex-col rounded-2xl border overflow-hidden transition-all hover:shadow-lg hover:-translate-y-0.5 ${className}`}
      style={{
        borderColor: "var(--border)",
        backgroundColor: `color-mix(in srgb, ${line} 5%, var(--surface))`,
      }}
    >
      <div className="flex flex-col flex-1 p-6">{children}</div>
      <div className="h-1 group-hover:h-1.5 transition-all" style={{ background: line }} />
    </div>
  )
}

/** Card with a full-bleed icon on the left and a label on the right. Defaults
    to white so pure-#fff icon art (the production glass icons) blends
    seamlessly; override `background` for other art. */
export function IconRowCard({
  src,
  label,
  background = "#ffffff",
}: {
  src: string
  label: string
  background?: string
}) {
  return (
    <div
      className="flex items-stretch rounded-2xl border overflow-hidden"
      style={{ borderColor: "var(--border)", backgroundColor: background }}
    >
      <Image
        src={src}
        alt=""
        aria-hidden
        width={80}
        height={80}
        className="h-20 w-20 flex-shrink-0 object-contain"
      />
      <span
        className="flex items-center pl-2 pr-6 text-base font-bold leading-snug"
        style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
      >
        {label}
      </span>
    </div>
  )
}
