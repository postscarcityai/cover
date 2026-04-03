"use client"

import { useState } from "react"
import Image from "next/image"
import { CTALink } from "@/components/ui/cta-link"
import { HeroGoldSeamOverlay } from "@/components/hero-gold-seam-overlay"
import { PlaceholderImage } from "@/components/placeholder-image"
import type { ContentSectionContent } from "@/app/data"

interface ContentSectionProps {
  content: ContentSectionContent
  className?: string
  /** True when this block follows the hero — paints transparent gold across the seam. */
  seamGoldFromHero?: boolean
}

function ContentImage({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return <PlaceholderImage label={alt} />
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 55vw"
        onError={() => setFailed(true)}
      />
    </div>
  )
}

export function ContentSection({
  content,
  className = "",
  seamGoldFromHero = false,
}: ContentSectionProps) {
  return (
    <section
      className={`relative isolate py-24 md:py-40 ${className}`}
      style={{ backgroundColor: "var(--bg)" }}
    >
      {seamGoldFromHero && <HeroGoldSeamOverlay />}
      <div className="relative z-20 space-y-32 md:space-y-48">
        {content.blocks.map((block, blockIndex) => {
          const isFirst = blockIndex === 0

          // First block: full-width title that breaks the container
          if (isFirst) {
            return (
              <div key={block.title}>
                {/* Full-width title */}
                <div className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 mb-16" data-reveal="fade-up">
                  {block.eyebrow && (
                    <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "var(--accent)" }}>
                      {block.eyebrow}
                    </p>
                  )}
                  <h2
                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight"
                    style={{ color: "var(--fg)" }}
                  >
                    {block.title}
                  </h2>
                </div>

                {/* Content + Image in standard grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
                  <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-start">
                    <div data-reveal="fade-up">
                      <p className="text-base leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>
                        {block.description}
                      </p>
                      {block.paragraphs?.map((p, i) => (
                        <p key={i} className="text-base leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>
                          {p}
                        </p>
                      ))}
                      {block.ctaText && block.ctaHref && (
                        <div className="mt-8">
                          <CTALink href={block.ctaHref}>
                            {block.ctaText}
                          </CTALink>
                        </div>
                      )}
                    </div>
                    <div data-reveal="scale">
                      <ContentImage src={block.imageSrc} alt={block.imageAlt || block.title} />
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          // Remaining blocks: asymmetric with image bleed + sticky text
          const imageOnRight = !block.reverse
          return (
            <div key={block.title} className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
              <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
                {/* Text column — sticky on desktop */}
                <div
                  className={`md:col-span-5 ${imageOnRight ? "" : "md:order-2"}`}
                  data-reveal="fade-up"
                >
                  <div className="md:sticky md:top-32">
                    {block.eyebrow && (
                      <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "var(--accent)" }}>
                        {block.eyebrow}
                      </p>
                    )}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-tight" style={{ color: "var(--fg)" }}>
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
                      <div className="mt-8">
                        <CTALink href={block.ctaHref}>
                          {block.ctaText}
                        </CTALink>
                      </div>
                    )}
                  </div>
                </div>

                {/* Image column — wider, bleeds slightly */}
                <div
                  className={`md:col-span-7 ${imageOnRight ? "" : "md:order-1"} ${
                    imageOnRight ? "md:-mr-8 lg:-mr-16" : "md:-ml-8 lg:-ml-16"
                  }`}
                  data-reveal="scale"
                >
                  <ContentImage src={block.imageSrc} alt={block.imageAlt || block.title} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
