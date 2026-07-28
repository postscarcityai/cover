import { Check, X } from "lucide-react"
import type { FitCheckContent } from "@/app/data"

interface FitCheckSectionProps {
  content: FitCheckContent
  className?: string
}

/** Two-column "right if / wrong if" honesty section — check list vs X list. */
export function FitCheckSection({ content, className = "" }: FitCheckSectionProps) {
  return (
    <section
      className={`border-y py-24 md:py-32 ${className}`}
      style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
    >
      <div className="container">
        {(content.eyebrow || content.title) && (
          <div className="max-w-2xl mb-12" data-reveal="fade-up">
            {content.eyebrow && (
              <p
                className="text-xs tracking-[0.18em] uppercase mb-4 font-semibold"
                style={{ color: "var(--accent)" }}
              >
                {content.eyebrow}
              </p>
            )}
            {content.title && (
              <h2
                className="font-display text-4xl md:text-5xl font-normal tracking-display-tight leading-[1.05]"
                style={{ color: "var(--fg)" }}
              >
                {content.title}
              </h2>
            )}
          </div>
        )}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16" data-reveal="stagger">
          <div>
            <h3
              className="font-display text-2xl md:text-3xl tracking-display-snug mb-6"
              style={{ color: "var(--fg)" }}
            >
              {content.rightTitle}
            </h3>
            <ul className="space-y-3">
              {content.rightItems.map((line, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                  <span className="text-base leading-relaxed" style={{ color: "var(--fg)" }}>
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3
              className="font-display text-2xl md:text-3xl tracking-display-snug mb-6"
              style={{ color: "var(--fg)" }}
            >
              {content.wrongTitle}
            </h3>
            <ul className="space-y-3">
              {content.wrongItems.map((line, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: "var(--fg-muted)" }} />
                  <span className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
