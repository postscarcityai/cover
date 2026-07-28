import { Lightbulb } from "lucide-react"
import type { StatementContent } from "@/app/data"

interface StatementSectionProps {
  content: StatementContent
  className?: string
}

/**
 * Single-statement band: icon-in-circle + tiny uppercase eyebrow + a large
 * heading-font statement + an optional follow-up detail line. The "one thing
 * you should know" pattern.
 */
export function StatementSection({ content, className = "" }: StatementSectionProps) {
  return (
    <section
      className={`border-y ${className}`}
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div className="container py-10 md:py-12">
        <div className="grid lg:grid-cols-[auto_1fr] gap-6 items-start max-w-4xl" data-reveal="fade-up">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "color-mix(in srgb, var(--accent) 12%, transparent)" }}
          >
            <Lightbulb className="h-5 w-5" style={{ color: "var(--accent)" }} />
          </div>
          <div>
            {content.eyebrow && (
              <h2
                className="text-xs uppercase tracking-[0.2em] font-semibold mb-3"
                style={{ color: "var(--fg-muted)" }}
              >
                {content.eyebrow}
              </h2>
            )}
            <p
              className="font-display text-lg md:text-xl leading-snug tracking-display-snug"
              style={{ color: "var(--fg)" }}
            >
              {content.statement}
            </p>
            {content.detail && (
              <p className="mt-4 text-sm leading-relaxed max-w-2xl" style={{ color: "var(--fg-muted)" }}>
                {content.detail}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
