import type { NumberedStepsContent } from "@/app/data"

interface NumberedStepsSectionProps {
  content: NumberedStepsContent
  className?: string
}

/** Ordered grid of step cards with 01/02 mono counters. */
export function NumberedStepsSection({ content, className = "" }: NumberedStepsSectionProps) {
  return (
    <section className={`py-24 md:py-32 ${className}`}>
      <div className="container">
        <div className="max-w-2xl mb-12" data-reveal="fade-up">
          {content.eyebrow && (
            <p
              className="text-xs tracking-[0.18em] uppercase mb-4 font-semibold"
              style={{ color: "var(--accent)" }}
            >
              {content.eyebrow}
            </p>
          )}
          <h2
            className="font-display text-4xl md:text-5xl font-normal tracking-display-tight leading-[1.05] mb-4"
            style={{ color: "var(--fg)" }}
          >
            {content.title}
          </h2>
          {content.description && (
            <p className="text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              {content.description}
            </p>
          )}
        </div>
        <ol className="grid md:grid-cols-2 gap-6 md:gap-8" data-reveal="stagger">
          {content.steps.map((step, i) => (
            <li
              key={i}
              className="rounded-2xl border p-6 md:p-7"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
            >
              <div className="text-xs font-mono mb-3" style={{ color: "var(--accent)" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3
                className="font-display text-xl tracking-display-snug mb-3"
                style={{ color: "var(--fg)" }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
