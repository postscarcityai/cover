import { PullQuote } from "@/components/pull-quote"
import type { PullQuoteContent } from "@/app/data"

interface PullQuoteSectionProps {
  content: PullQuoteContent
  className?: string
}

/** Single pull-quote band — a PullQuote card in a standard section container. */
export function PullQuoteSection({ content, className = "" }: PullQuoteSectionProps) {
  return (
    <section className={`py-12 md:py-16 ${className}`}>
      <div className="container">
        <div className="max-w-4xl mx-auto" data-reveal="fade-up">
          <PullQuote
            body={content.quote}
            eyebrow={content.eyebrow}
            attribution={content.attribution}
          />
        </div>
      </div>
    </section>
  )
}
