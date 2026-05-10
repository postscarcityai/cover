"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { PillButton } from "@/components/ui/pill-button"
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
    <section className={`py-24 md:py-32 ${className}`} style={{ backgroundColor: "var(--bg)" }}>
      <div className="container space-y-24 md:space-y-32">
        {content.blocks.map((block) => (
          <div
            key={block.title}
            className="grid md:grid-cols-2 gap-12 md:gap-16 items-center"
          >
            <div className={block.reverse ? "md:order-2" : ""} data-reveal="fade-up">
              {block.eyebrow && (
                <p className="text-xs tracking-[0.18em] uppercase mb-5 font-semibold" style={{ color: "var(--mute)" }}>
                  {block.eyebrow}
                </p>
              )}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-display-tight leading-[1.05] mb-6" style={{ color: "var(--ink)" }}>
                {block.title}
              </h2>
              <p className="text-lg leading-relaxed mb-4" style={{ color: "var(--mute)" }}>
                {block.description}
              </p>
              {block.paragraphs?.map((p, i) => (
                <p key={i} className="text-base leading-relaxed mb-4" style={{ color: "var(--mute)" }}>
                  {p}
                </p>
              ))}
              {block.ctaText && block.ctaHref && (
                <PillButton
                  size="lg"
                  variant="primary"
                  className="mt-6"
                  onClick={() => (window.location.href = block.ctaHref!)}
                >
                  {block.ctaText}
                  <ArrowRight className="h-4 w-4" />
                </PillButton>
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
