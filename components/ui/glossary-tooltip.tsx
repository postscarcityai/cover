"use client"

import { useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ArrowRight, HelpCircle } from "lucide-react"
import Link from "next/link"
import glossaryData from "@/lib/glossary.json"

type GlossaryEntry = {
  term: string
  short: string
  definition?: string
  aliases?: string[]
}

const GLOSSARY: Record<string, GlossaryEntry> = glossaryData as Record<string, GlossaryEntry>

interface GlossaryTooltipProps {
  /**
   * Slug of the glossary entry (e.g. "sla", "churn").
   * Must match a key in lib/glossary.json.
   */
  term: string
  /** Optional "learn more" link shown inside the card (e.g. a glossary page). */
  moreHref?: string
  /** Label for the moreHref link. */
  moreLabel?: string
  /**
   * Children render as the underlined trigger text. If omitted, the
   * component falls back to the entry's `term` field.
   */
  children?: React.ReactNode
  className?: string
}

/**
 * Plain-English glossary tooltip wrapper. Hover, focus, or tap the underlined
 * term to see a floating card with the short definition plus an optional link
 * to the full entry. The card renders in a portal, so it is never clipped by
 * `overflow-hidden` ancestors.
 */
export function GlossaryTooltip({
  term,
  moreHref,
  moreLabel = "Learn more",
  children,
  className = "",
}: GlossaryTooltipProps) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
  const tooltipId = useId()
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const cardRef = useRef<HTMLSpanElement>(null)

  const entry = GLOSSARY[term] as GlossaryEntry | undefined

  // Dismiss on Escape (keyboard accessibility).
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  // Click-outside to dismiss (touch-friendly). The card lives in a portal, so
  // check both the trigger wrapper and the card itself.
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node
      if (
        wrapperRef.current && !wrapperRef.current.contains(t) &&
        cardRef.current && !cardRef.current.contains(t)
      ) {
        setOpen(false)
      }
    }
    window.addEventListener("mousedown", onClick)
    return () => window.removeEventListener("mousedown", onClick)
  }, [open])

  // Anchor the portal card under the trigger; track scroll/resize while open.
  useEffect(() => {
    if (!open) {
      setPos(null)
      return
    }
    const measure = () => {
      const rect = wrapperRef.current?.getBoundingClientRect()
      if (!rect) return
      const cardWidth = 288 // w-72
      const left = Math.min(rect.left, window.innerWidth - cardWidth - 8)
      setPos({ top: rect.bottom + 8, left: Math.max(8, left) })
    }
    measure()
    window.addEventListener("resize", measure)
    window.addEventListener("scroll", measure, { passive: true, capture: true })
    return () => {
      window.removeEventListener("resize", measure)
      window.removeEventListener("scroll", measure, { capture: true })
    }
  }, [open])

  // If the glossary entry doesn't exist, render the children plainly — a
  // forgiving fallback so a typo doesn't blow up the page render.
  // (After the hooks: hook order must not depend on the data.)
  if (!entry) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[GlossaryTooltip] Unknown glossary term: "${term}"`)
    }
    return <span className={className}>{children ?? term}</span>
  }

  return (
    <span
      ref={wrapperRef}
      className={`relative inline ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-describedby={open ? tooltipId : undefined}
        aria-expanded={open}
        className="inline-flex items-baseline gap-0.5 underline decoration-dotted decoration-1 underline-offset-2 cursor-help focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-1 rounded-sm"
        style={{ color: "inherit" }}
      >
        <span>{children ?? entry.term}</span>
        <HelpCircle
          className="h-3 w-3 opacity-50"
          aria-hidden
          style={{ color: "var(--fg-muted)" }}
        />
      </button>

      {open && pos &&
        createPortal(
          <span
            ref={cardRef}
            role="tooltip"
            id={tooltipId}
            className="fixed z-50 w-72 rounded-2xl border shadow-xl text-sm normal-case font-normal motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 motion-safe:duration-150"
            style={{
              top: pos.top,
              left: pos.left,
              backgroundColor: "var(--bg)",
              borderColor: "var(--border)",
              color: "var(--fg)",
            }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <span className="block p-4">
              <span
                className="block text-xs uppercase tracking-[0.15em] font-semibold mb-1.5"
                style={{ color: "var(--fg-muted)" }}
              >
                {entry.term}
              </span>
              <span className="block leading-relaxed" style={{ color: "var(--fg)" }}>
                {entry.short}
              </span>
              {moreHref && (
                <span className="block mt-3">
                  <Link
                    href={moreHref}
                    className="inline-flex items-center gap-1 text-xs font-medium hover:underline"
                    style={{ color: "var(--accent)" }}
                  >
                    {moreLabel}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </span>
              )}
            </span>
          </span>,
          document.body,
        )}
    </span>
  )
}
