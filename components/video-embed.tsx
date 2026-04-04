type AspectRatio = "16/9" | "4/3"

interface VideoEmbedProps {
  src: string
  title: string
  aspectRatio?: AspectRatio
  caption?: string
}

function getEmbedUrl(src: string): string {
  try {
    const url = new URL(src)
    const host = url.hostname.replace(/^www\./, "")

    if (host === "youtube.com" || host === "m.youtube.com") {
      const videoId = url.searchParams.get("v")
      if (videoId) return `https://www.youtube.com/embed/${videoId}`

      const pathParts = url.pathname.split("/").filter(Boolean)
      const embeddedId = pathParts[0] === "embed" || pathParts[0] === "shorts"
        ? pathParts[1]
        : undefined

      if (embeddedId) return `https://www.youtube.com/embed/${embeddedId}`
    }

    if (host === "youtu.be") {
      const videoId = url.pathname.split("/").filter(Boolean)[0]
      if (videoId) return `https://www.youtube.com/embed/${videoId}`
    }

    if (host === "vimeo.com") {
      const videoId = url.pathname
        .split("/")
        .filter(Boolean)
        .findLast((part) => /^\d+$/.test(part))

      if (videoId) return `https://player.vimeo.com/video/${videoId}`
    }

    if (host === "player.vimeo.com" && url.pathname.startsWith("/video/")) {
      return src
    }
  } catch {
    return src
  }

  return src
}

export function VideoEmbed({
  src,
  title,
  aspectRatio = "16/9",
  caption,
}: VideoEmbedProps) {
  const embedUrl = getEmbedUrl(src)

  return (
    <figure className="space-y-4">
      <div
        className="overflow-hidden rounded-2xl border"
        style={{
          aspectRatio,
          backgroundColor: "var(--surface)",
          borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)",
        }}
      >
        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      {caption ? (
        <figcaption className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

export type { VideoEmbedProps }
