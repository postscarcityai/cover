"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, CheckCircle, MapPin, Scale, Users, Award, BookOpen, Phone } from "lucide-react"
import { usePageTracking, useScrollTracking } from "@/lib/analytics-hooks"
import { siteConfig } from "@/site.config"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/magnetic-button"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"
import { TaglineDivider } from "@/components/tagline-divider"
import { PlaceholderImage } from "@/components/placeholder-image"
import type { TeamMemberData } from "./data"

interface Props {
  data: TeamMemberData
}

export default function TeamMemberClient({ data }: Props) {
  usePageTracking(
    `${siteConfig.business.founder.name} - Team`,
    "about",
    "team_member"
  )
  useScrollTracking()

  const { hero, overview, highlights, expertise, credentials, leadership, cta } = data
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      

      <section
        className="relative min-h-[60vh] flex items-end overflow-hidden"
        id="main-content"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 40%, color-mix(in srgb, var(--accent) 6%, transparent), transparent)",
          }}
        />
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 pb-16 md:pb-24 pt-32 md:pt-40 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-5" data-reveal="scale">
              {hero.imageSrc && !imgFailed ? (
                <div className="aspect-[4/5] rounded-lg overflow-hidden">
                  <Image
                    src={hero.imageSrc}
                    alt={hero.imageAlt}
                    width={600}
                    height={750}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
                    onError={() => setImgFailed(true)}
                  />
                </div>
              ) : (
                <PlaceholderImage label={hero.imageAlt || "Team Member"} aspectRatio="4/5" />
              )}
            </div>

            <div className="lg:col-span-7">
              <p
                data-reveal="fade-up"
                className="text-xs tracking-[0.3em] uppercase mb-6"
                style={{ color: "var(--accent)" }}
              >
                {hero.label}
              </p>
              <h1
                data-reveal="words"
                className="text-4xl sm:text-5xl md:text-6xl font-light leading-[0.95] tracking-tight mb-4"
                style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
              >
                {hero.name}
              </h1>
              <p
                data-reveal="fade-up"
                className="text-xl md:text-2xl font-light mb-8"
                style={{ color: "var(--fg-muted)" }}
              >
                {hero.title}
              </p>

              <div data-reveal="fade-up" className="flex flex-wrap gap-8 mb-8">
                <div className="flex flex-col">
                  <span className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "var(--accent)" }}>
                    {hero.stats.experience.label}
                  </span>
                  <span className="text-2xl font-bold" style={{ color: "var(--fg)" }}>
                    {hero.stats.experience.value}
                  </span>
                </div>
                <div className="w-px opacity-20" style={{ backgroundColor: "var(--fg)" }} />
                <div className="flex flex-col">
                  <span className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "var(--accent)" }}>
                    {hero.stats.jurisdictions.label}
                  </span>
                  <span className="text-2xl font-bold" style={{ color: "var(--fg)" }}>
                    {hero.stats.jurisdictions.value}
                  </span>
                </div>
              </div>

              <div data-reveal="fade-up">
                <MagneticButton>
                  <Button
                    variant={null as any}
                    size="lg"
                    className="font-semibold tracking-wide uppercase transition-all"
                    style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
                    onClick={() => (window.location.href = "/contact")}
                  >
                    Schedule Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main>
        <SubpageSection background="surface" title={overview.sectionTitle}>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div data-reveal="fade-up">
              {overview.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-base leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div data-reveal="fade-up">
              <h3 className="text-sm tracking-[0.2em] uppercase mb-6" style={{ color: "var(--accent)" }}>
                Key Highlights
              </h3>
              <div className="space-y-3">
                {highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                    <span className="text-sm" style={{ color: "var(--fg-muted)" }}>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SubpageSection>

        <SubpageSection title={expertise.sectionTitle}>
          <div
            data-reveal="fade-up"
            className="p-8 rounded-lg"
            style={{ backgroundColor: "var(--surface)" }}
          >
            {expertise.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed mb-6 last:mb-0" style={{ color: "var(--fg-muted)" }}>
                {paragraph}
              </p>
            ))}
          </div>
        </SubpageSection>

        <TaglineDivider text="Credentials" />

        <SubpageSection
          background="accent"
          title={credentials.sectionTitle}
          description={credentials.description}
        >
          <div className="grid lg:grid-cols-2 gap-16">
            <div data-reveal="fade-up">
              <h3 className="text-2xl font-bold mb-8" style={{ color: "var(--accent-fg)" }}>
                Professional Licenses
              </h3>
              <div className="space-y-3">
                {credentials.licenses.map((license) => (
                  <div
                    key={license}
                    className="flex items-center gap-3 p-4 rounded-lg"
                    style={{ backgroundColor: "color-mix(in srgb, var(--accent-fg) 10%, transparent)" }}
                  >
                    <MapPin className="h-5 w-5 flex-shrink-0" style={{ color: "var(--accent-fg)" }} />
                    <span className="font-medium" style={{ color: "var(--accent-fg)" }}>{license}</span>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal="fade-up">
              <h3 className="text-2xl font-bold mb-8" style={{ color: "var(--accent-fg)" }}>
                Certifications & Training
              </h3>
              <div
                className="space-y-2 max-h-80 overflow-y-auto p-4 rounded-lg"
                style={{ backgroundColor: "color-mix(in srgb, var(--accent-fg) 5%, transparent)" }}
              >
                {credentials.certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-3 py-2">
                    <Scale className="h-4 w-4 flex-shrink-0 opacity-80" style={{ color: "var(--accent-fg)" }} />
                    <span className="text-sm opacity-90" style={{ color: "var(--accent-fg)" }}>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {credentials.note && (
            <div
              data-reveal="fade-up"
              className="mt-12 p-6 rounded-lg max-w-4xl mx-auto text-center"
              style={{ backgroundColor: "color-mix(in srgb, var(--accent-fg) 10%, transparent)" }}
            >
              <p className="text-sm italic opacity-90" style={{ color: "var(--accent-fg)" }}>
                <strong>Note:</strong> {credentials.note}
              </p>
            </div>
          )}
        </SubpageSection>

        <SubpageSection title={leadership.sectionTitle}>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div data-reveal="fade-up">
              {leadership.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-base leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div data-reveal="fade-up">
              <div className="p-8 rounded-lg" style={{ backgroundColor: "var(--surface)" }}>
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-14 h-14 flex items-center justify-center rounded-full"
                    style={{ backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)" }}
                  >
                    <Users className="h-7 w-7" style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: "var(--fg)" }}>{leadership.highlights.title}</h3>
                    <p className="text-sm" style={{ color: "var(--fg-muted)" }}>{leadership.highlights.subtitle}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {leadership.highlights.items.map((item, index) => {
                    const icons = [Award, BookOpen, Users]
                    const Icon = icons[index] || Award
                    return (
                      <div key={item} className="flex items-start gap-3">
                        <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
                        <span className="text-sm" style={{ color: "var(--fg-muted)" }}>{item}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </SubpageSection>

        <SubpageSection background="gradient">
          <div className="text-center max-w-4xl mx-auto" data-reveal="fade-up">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-8"
              style={{ fontFamily: "var(--font-heading)", color: "var(--fg)" }}
            >
              {cta.title}
            </h2>
            {cta.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>
                {paragraph.includes("<strong>") ? (
                  <span dangerouslySetInnerHTML={{ __html: paragraph }} />
                ) : (
                  paragraph
                )}
              </p>
            ))}
            <blockquote
              className="p-8 text-lg italic rounded-lg mb-12"
              style={{ backgroundColor: "var(--surface)", color: "var(--fg)" }}
            >
              &ldquo;{cta.quote}&rdquo;
            </blockquote>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <MagneticButton>
                <Button
                  variant={null as any}
                  size="lg"
                  className="font-semibold text-base px-10 py-5 tracking-wide uppercase transition-all"
                  style={{ backgroundColor: "var(--accent)", color: "var(--accent-fg)" }}
                  onClick={() => (window.location.href = "/contact")}
                >
                  {cta.buttonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </MagneticButton>
              <div className="flex items-center gap-2" style={{ color: "var(--accent)" }}>
                <Phone className="h-5 w-5" />
                <span className="font-semibold">{cta.phoneNumber}</span>
              </div>
            </div>
          </div>
        </SubpageSection>
      </main>

      <Footer />
    </div>
  )
}
