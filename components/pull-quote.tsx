import { Quote } from "lucide-react"

interface PullQuoteProps {
  /** The quote/proof text. */
  body: string
  /** Optional eyebrow like "Customer story" or "Data point". */
  eyebrow?: string
  /** Optional attribution line, e.g. "— Internal data, 2026". */
  attribution?: string
  className?: string
}

/** Single pull-quote card: quote-mark watermark, accent eyebrow, large
    heading-font quote on a softly tinted card. */
export function PullQuote({
  body,
  eyebrow = "Quote",
  attribution,
  className = "",
}: PullQuoteProps) {
  return (
    <div
      className={`relative rounded-2xl border p-6 md:p-8 ${className}`}
      style={{
        borderColor: "var(--border)",
        backgroundColor: "color-mix(in srgb, var(--accent) 4%, var(--bg))",
      }}
    >
      <Quote
        className="absolute top-5 right-5 h-8 w-8 opacity-20"
        style={{ color: "var(--accent)" }}
        aria-hidden
      />
      <div
        className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-4"
        style={{ color: "var(--accent)" }}
      >
        {eyebrow}
      </div>
      <p
        className="text-lg md:text-xl leading-snug max-w-3xl"
        style={{ color: "var(--fg)", fontFamily: "var(--font-heading)", letterSpacing: "-0.01em" }}
      >
        {body}
      </p>
      {attribution && (
        <p className="mt-4 text-xs tracking-wide" style={{ color: "var(--fg-muted)" }}>
          {attribution}
        </p>
      )}
    </div>
  )
}
