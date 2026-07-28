import { ExternalLink } from "lucide-react"
import type { SourcesContent } from "@/app/data"

interface SourcesSectionProps {
  content: SourcesContent
  className?: string
}

/** Sources + compliance band: external links with icons + a small disclaimer.
    Any regulated-industry site wants this at the bottom of content pages. */
export function SourcesSection({ content, className = "" }: SourcesSectionProps) {
  return (
    <section className={`py-12 ${className}`}>
      <div className="container">
        <div className="max-w-4xl mx-auto">
        <h3
          className="text-xs uppercase tracking-[0.2em] font-semibold mb-4"
          style={{ color: "var(--fg-muted)" }}
        >
          {content.title ?? "Sources"}
        </h3>
        <ul className="space-y-2">
          {content.sources.map((s, i) => (
            <li key={i}>
              {s.href ? (
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-[var(--accent)]"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {s.label}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <span className="text-sm" style={{ color: "var(--fg-muted)" }}>
                  {s.label}
                </span>
              )}
            </li>
          ))}
        </ul>
        {content.disclaimer && (
          <p
            className="mt-8 pt-6 border-t text-xs leading-relaxed max-w-3xl"
            style={{ color: "var(--fg-muted)", borderColor: "var(--border)" }}
          >
            {content.disclaimer}
          </p>
        )}
        </div>
      </div>
    </section>
  )
}
