"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PlaceholderImage } from "@/components/placeholder-image"
import type { ContentSectionContent } from "@/app/data"

interface ContentSectionProps {
  content: ContentSectionContent
  className?: string
}

function ContentImage({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return <PlaceholderImage label={alt} />
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        onError={() => setFailed(true)}
      />
    </div>
  )
}

export function ContentSection({ content, className = "" }: ContentSectionProps) {
  return (
    <section className={`py-24 md:py-40 ${className}`} style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 space-y-32 md:space-y-40">
        {content.blocks.map((block) => (
          <div
            key={block.title}
            className="grid md:grid-cols-2 gap-16 md:gap-20 items-center"
          >
            <div className={block.reverse ? "md:order-2" : ""} data-reveal="fade-up">
              {block.eyebrow && (
                <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "var(--accent)" }}>
                  {block.eyebrow}
                </p>
              )}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight" style={{ color: "var(--fg)" }}>
                {block.title}
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>
                {block.description}
              </p>
              {block.paragraphs?.map((p, i) => (
                <p key={i} className="text-base leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>
                  {p}
                </p>
              ))}
              {block.ctaText && block.ctaHref && (
                <Button
                  variant={null as any}
                  size="lg"
                  className="mt-6 font-semibold tracking-wider uppercase rounded-full transition-all hover:scale-105"
                  style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
                  onClick={() => (window.location.href = block.ctaHref!)}
                >
                  {block.ctaText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>

            <div className={block.reverse ? "md:order-1" : ""} data-reveal="scale">
              <ContentImage src={block.imageSrc} alt={block.imageAlt || block.title} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
