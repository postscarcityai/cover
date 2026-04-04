import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"

interface ProjectHeroCardProps {
  slug: string
  title: string
  description: string
  tag: string
  heroImage: string
  url?: string
}

export function ProjectHeroCard({ slug, title, description, tag, heroImage, url }: ProjectHeroCardProps) {
  return (
    <article className="group w-full">
      <Link href={`/work/${slug}`} className="block overflow-hidden rounded-[2.25rem]">
        <div className="relative min-h-[60vh] overflow-hidden bg-black">
          <Image
            src={heroImage}
            alt={`${title} homepage screenshot`}
            fill
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="100vw"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(3, 4, 8, 0.92) 0%, rgba(3, 4, 8, 0.62) 28%, rgba(3, 4, 8, 0.18) 58%, rgba(3, 4, 8, 0.04) 100%)",
            }}
          />

          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-12">
            <div
              className="mb-4 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]"
              style={{
                backgroundColor: "color-mix(in srgb, var(--surface) 24%, transparent)",
                color: "var(--surface)",
                border: "1px solid color-mix(in srgb, var(--surface) 18%, transparent)",
                backdropFilter: "blur(12px)",
              }}
            >
              {tag}
            </div>

            <h2
              className="max-w-4xl text-4xl font-bold leading-[0.95] text-white md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {title}
            </h2>
          </div>
        </div>
      </Link>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-2 pt-6 md:px-4 md:pt-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
        <p className="max-w-3xl text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
          {description}
        </p>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 lg:flex-col lg:items-start">
          <Link
            href={`/work/${slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] transition-all duration-300 hover:gap-3"
            style={{ color: "var(--accent)" }}
          >
            View Case Study <ArrowRight size={16} />
          </Link>

          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] transition-opacity duration-300 hover:opacity-70"
              style={{ color: "var(--fg)" }}
            >
              Visit Site <ExternalLink size={16} />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}
