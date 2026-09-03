import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"
import { siteConfig } from "@/site.config"

/**
 * Pattern catalog demo.
 *
 * Every scroll component is dynamically imported with `ssr: false`. They all
 * touch `window`/`matchMedia` on mount and none of them should land in the
 * initial bundle — the budget for the whole scroll system is ~35KB gzip
 * (Lenis ~3KB + ScrollTrigger ~12KB + glue), and it should only be paid on
 * pages that actually use it.
 */

export const metadata: Metadata = {
  title: "Scroll video pattern catalog",
  robots: { index: false, follow: false },
}

const SOURCES = {
  mp4: "/video/demo.scrub.mp4",
  webm: "/video/demo.scrub.webm",
  mp4Mobile: "/video/demo.mobile.scrub.mp4",
  webmMobile: "/video/demo.mobile.scrub.webm",
  poster: "/video/demo.poster.webp",
}

const ScrubHeroSection = dynamic(
  () => import("@/components/sections/scrub-hero-section").then((m) => m.ScrubHeroSection),
  { ssr: false }
)
const ScrubStorySection = dynamic(
  () => import("@/components/sections/scrub-story-section").then((m) => m.ScrubStorySection),
  { ssr: false }
)
const ClipReveal = dynamic(
  () => import("@/components/scroll/clip-reveal").then((m) => m.ClipReveal),
  { ssr: false }
)
const StickyStack = dynamic(
  () => import("@/components/scroll/sticky-stack").then((m) => m.StickyStack),
  { ssr: false }
)
const HorizontalPanels = dynamic(
  () => import("@/components/scroll/horizontal-panels").then((m) => m.HorizontalPanels),
  { ssr: false }
)
const VelocityLayers = dynamic(
  () => import("@/components/scroll/velocity-layers").then((m) => m.VelocityLayers),
  { ssr: false }
)
const VideoAsType = dynamic(
  () => import("@/components/scroll/video-as-type").then((m) => m.VideoAsType),
  { ssr: false }
)
const ScrubVideo = dynamic(
  () => import("@/components/scroll/scrub-video").then((m) => m.ScrubVideo),
  { ssr: false }
)

function Label({ n, title }: { n: string; title: string }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-50">{n}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight">{title}</h2>
    </div>
  )
}

export default function ScrollVideoDemoPage() {
  // The template contract: one flag turns the whole system off.
  if (!siteConfig.features.scrollVideo) notFound()

  return (
    <main data-scroll-video-demo>
      <Label n="01" title="Pinned scrub hero" />
      <ScrubHeroSection
        sources={SOURCES}
        alt="Demo scrub footage"
        eyebrow="Pattern 01"
        headline="The canonical move"
        subhead="Full-bleed pin, +=300%, scroll progress mapped onto currentTime."
        beats={[0, 0.5, 1]}
      />

      <Label n="02" title="Expanding portal (clip-path)" />
      <div className="h-[60vh]">
        <ClipReveal inset={120} radius={24} mode="portal" className="h-full">
          <ScrubVideo sources={SOURCES} alt="Demo scrub footage" enhance={false} />
        </ClipReveal>
      </div>

      <Label n="03" title="Sticky card stack" />
      <StickyStack className="mx-auto max-w-3xl px-6 pb-[50vh]">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="mb-6 rounded-2xl p-10 shadow-lg"
            style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <p className="font-mono text-xs opacity-50">CARD {i + 1}</p>
            <h3 className="mt-2 text-2xl font-semibold">Native sticky, zero pin overhead</h3>
          </div>
        ))}
      </StickyStack>

      <Label n="05" title="Horizontal panels" />
      <HorizontalPanels
        panels={[0, 1, 2].map((i) => (
          <div key={i} className="flex h-[70vh] items-center justify-center">
            <span className="text-6xl font-bold opacity-30">PANEL {i + 1}</span>
          </div>
        ))}
      />

      <Label n="06" title="Video as type" />
      <VideoAsType
        sources={SOURCES}
        alt="Demo scrub footage"
        text="THROUGH"
        mode="knockout"
        className="h-[70vh]"
      />

      <Label n="08" title="Velocity-reactive layers" />
      <VelocityLayers maxSkew={6} className="mx-auto max-w-3xl px-6 pb-24">
        <p className="text-4xl font-bold leading-tight">
          Scroll fast and this block skews, then settles back to rest.
        </p>
      </VelocityLayers>

      <Label n="01b" title="Pinned scrub with sequenced copy" />
      <ScrubStorySection
        sources={SOURCES}
        alt="Demo scrub footage"
        beats={[
          { at: 0, title: "First beat", body: "Copy cross-fades as the footage scrubs." },
          { at: 0.5, title: "Second beat", body: "Snapping rests the section on composed frames." },
          { at: 1, title: "Third beat", body: "Then it releases the pin and hands off." },
        ]}
      />

      <div className="h-[50vh]" />
    </main>
  )
}
