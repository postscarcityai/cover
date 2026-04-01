"use client"

import Link from "next/link"
import { ArrowRight, ArrowLeft, Lock } from "lucide-react"
import { Footer } from "@/components/footer"
import { SubpageHero } from "@/components/subpage-hero"
import { SubpageSection } from "@/components/subpage-section"

export default function QualisPage() {
  return (
    <div className="min-h-screen">
      

      <SubpageHero
        eyebrow="Case Study"
        title="Qualis"
        description="Confidential. Defense technology. Three acquisitions. One unified intelligence portal."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Work", href: "/work" },
          { label: "Qualis" },
        ]}
        size="compact"
      />

      <SubpageSection
        background="default"
        eyebrow="Confidential"
        sectionNumber="01"
        title="Under NDA"
      >
        <div className="max-w-3xl">
          <div
            className="flex items-start gap-4 p-8 rounded-2xl border"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)",
            }}
          >
            <Lock
              size={24}
              className="flex-shrink-0 mt-1"
              style={{ color: "var(--accent)" }}
            />
            <div>
              <p
                className="text-lg leading-relaxed mb-4"
                style={{ color: "var(--fg-muted)" }}
              >
                Three acquired companies. One unified intelligence portal. Built
                for a high-stakes board meeting. The client has not stopped using
                it since.
              </p>
              <p
                className="text-lg leading-relaxed"
                style={{ color: "var(--fg-muted)" }}
              >
                Full details are available under NDA. If you are working in
                defense technology, government contracting, or private equity
                roll-ups — start a conversation.
              </p>
            </div>
          </div>
        </div>
      </SubpageSection>

      <SubpageSection background="accent">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:gap-3"
            style={{
              backgroundColor: "var(--accent-fg)",
              color: "var(--accent)",
            }}
          >
            <ArrowLeft size={16} /> All Projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:gap-3"
            style={{
              backgroundColor: "var(--accent-fg)",
              color: "var(--accent)",
            }}
          >
            Request Details Under NDA <ArrowRight size={16} />
          </Link>
        </div>
      </SubpageSection>

      <Footer />
    </div>
  )
}
