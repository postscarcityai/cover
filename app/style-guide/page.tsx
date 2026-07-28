import type { Metadata } from "next"
import { readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { Footer } from "@/components/footer"
import { StyleGuideGallery, type GalleryGroup } from "@/components/style-guide-gallery"
import { SubpageHero } from "@/components/subpage-hero"
import { siteConfig } from "@/site.config"

export const metadata: Metadata = {
  title: "Style Guide",
  description: "Internal review page for the generated imagery direction and prompts.",
  robots: { index: false, follow: false },
}

interface ImageEntry {
  category: string
  label: string
  slug: string
  prompt: string
  path: string
  exists: boolean
  featured?: boolean
}

// One entry per catalog category (scripts/image-style.config.mjs). Categories
// with no generated images are hidden automatically.
const CATEGORIES: { id: string; title: string; blurb: string }[] = [
  {
    id: "hero",
    title: "Homepage hero rotation",
    blurb:
      "The primary look: duotone people separated by LIGHT (not a cutout edge) on a slate/navy field, prismatic blue accents, cinematic finish. Centered-leaning composition with full head and torso for the hero slideshow. Each demo hero carries a different composited overlay pattern — hex, dots, waves — from scripts/pattern-overlay.mjs.",
  },
  {
    id: "samples",
    title: "Photo registers",
    blurb:
      "One sample per register: the right-anchored editorial hero (text-safe left), the centered full-bleed section background (dark and even for white text on top), and the square portrait accent.",
  },
  {
    id: "icons",
    title: "Iconography — 2D glass",
    blurb:
      "The icon style: flat, front-facing 2D glass (glassmorphism) — a near-solid cobalt/royal-blue fill with a thin bright highlight edge, on pure white, no 3D, no sticker border. Production recipe: no glow, sits flush on white cards.",
  },
  {
    id: "bg-dark",
    title: "Dark text-safe backgrounds",
    blurb:
      "Backgrounds for live HTML text. Dark navy + slate grey, abstract and subtle — low contrast, even and quiet, no people or objects. White text stays readable anywhere.",
  },
  {
    id: "backdrops",
    title: "Section backdrops",
    blurb:
      "Full-section backdrop imagery for components/section-backdrop.tsx — an abstract patterned field and a centered closing-CTA scene.",
  },
]

function loadManifest(): ImageEntry[] {
  try {
    const raw = readFileSync(
      join(process.cwd(), "public", "img", "style-guide", "manifest.json"),
      "utf8",
    )
    return JSON.parse(raw) as ImageEntry[]
  } catch {
    return []
  }
}

export default function StyleGuidePage() {
  const manifest = loadManifest()
  const ready = manifest.filter((m) => m.exists)

  // Cache-bust each image by file mtime so regenerated art (same filename)
  // shows up immediately instead of a stale browser-cached version.
  const cacheBust = (items: ImageEntry[]) =>
    items.map((m) => {
      try {
        const mtime = Math.round(statSync(join(process.cwd(), "public", m.path)).mtimeMs)
        return { ...m, path: `${m.path}?v=${mtime}` }
      } catch {
        return m
      }
    })

  const sections = CATEGORIES.map((cat) => ({
    id: cat.id,
    title: cat.title,
    blurb: cat.blurb,
    items: cacheBust(ready.filter((m) => m.category === cat.id)),
  })).filter((s) => s.items.length > 0)

  const groups: GalleryGroup[] = [
    {
      id: "generated",
      title: "Generated imagery",
      sections,
      defaultOpen: true,
    },
  ]

  const heroImage = ready.find((m) => m.category === "hero")?.path

  return (
    <div className="min-h-screen">
      <SubpageHero
        eyebrow="Internal — Image Direction"
        title="Style guide"
        description="The generated imagery direction. Click any image to enlarge; select your picks and export them (with prompts) to iterate."
        breadcrumbs={[{ label: "Style Guide" }]}
        backgroundImage={heroImage}
      />

      <main id="main-content">
        {ready.length === 0 ? (
          <section className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-20">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg" style={{ color: "var(--fg-muted)" }}>
                No images generated yet. Run{" "}
                <code className="px-2 py-1 rounded" style={{ backgroundColor: "var(--surface)" }}>
                  npm run images
                </code>{" "}
                with a valid <code>FAL_KEY</code> in <code>.env.local</code>.
              </p>
            </div>
          </section>
        ) : (
          <StyleGuideGallery groups={groups} />
        )}
      </main>

      <Footer />
    </div>
  )
}
