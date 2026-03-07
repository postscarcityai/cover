import Link from "next/link"
import { ArrowRight, Home, BookOpen, Briefcase, Users, Mail } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"
import { notFoundData } from "./not-found-data"

const iconMap = {
  Briefcase,
  Users,
  BookOpen,
  Mail,
} as const

export default function NotFound() {
  const { hero, section, navLinks } = notFoundData

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bg)" }}>
      <Navigation />

      <main className="flex-1" id="main-content">
        <SubpageHero
          eyebrow={hero.eyebrow}
          title={hero.title}
          description={hero.description}
          align={hero.align}
          size={hero.size}
        >
          <div className="flex flex-col sm:flex-row gap-4" data-reveal="fade-up">
            <Link
              href={hero.primaryCta.href}
              className="inline-flex items-center justify-center px-8 py-4 font-semibold text-sm uppercase tracking-wide rounded-full transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--accent-fg)",
              }}
            >
              <Home className="mr-2 h-5 w-5" />
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex items-center justify-center px-8 py-4 font-semibold text-sm uppercase tracking-wide rounded-full transition-all hover:opacity-90"
              style={{
                backgroundColor: "transparent",
                color: "var(--accent)",
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: "var(--accent)",
              }}
            >
              {hero.secondaryCta.label}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </SubpageHero>

        <SubpageSection background="default" eyebrow={section.eyebrow} maxWidth="wide">
          <div className="grid sm:grid-cols-2 gap-6" data-reveal="stagger">
            {navLinks.map(({ label, description, href, icon }) => {
              const IconComponent = iconMap[icon]
              return (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-start gap-4 p-6 rounded-2xl border transition-all duration-300 border-[var(--border)] hover:border-[var(--accent)]"
                  style={{
                    backgroundColor: "var(--surface)",
                  }}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0 rounded-full transition-colors"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--accent) 12%, transparent)",
                    }}
                  >
                    <IconComponent className="h-5 w-5" style={{ color: "var(--accent)" }} />
                  </div>
                  <div>
                    <p
                      className="text-base font-semibold leading-snug transition-colors"
                      style={{ color: "var(--fg)" }}
                    >
                      {label}
                    </p>
                    <p className="text-sm mt-1" style={{ color: "var(--fg-muted)" }}>
                      {description}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </SubpageSection>
      </main>

      <Footer />
    </div>
  )
}
