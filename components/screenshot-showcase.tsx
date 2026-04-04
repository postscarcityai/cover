import Image from "next/image"

interface ScreenshotShowcaseProps {
  src: string
  alt: string
  caption?: string
  variant?: "full-bleed" | "contained" | "browser-frame"
  priority?: boolean
}

export function ScreenshotShowcase({
  src,
  alt,
  caption,
  variant = "contained",
  priority = false,
}: ScreenshotShowcaseProps) {
  const image = (
    <div className="relative overflow-hidden" style={{ backgroundColor: "var(--surface)" }}>
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      </div>
      {caption ? (
        <div className="border-t px-4 py-3 text-sm md:px-6" style={{ borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)", color: "var(--fg-muted)" }}>
          {caption}
        </div>
      ) : null}
    </div>
  )

  if (variant === "full-bleed") {
    return <div className="relative left-1/2 w-screen -translate-x-1/2">{image}</div>
  }

  if (variant === "browser-frame") {
    return (
      <div
        className="overflow-hidden rounded-[1.5rem] border shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "color-mix(in srgb, var(--fg) 12%, transparent)",
        }}
      >
        <div
          className="flex items-center gap-3 border-b px-4 py-3 text-sm"
          style={{
            borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)",
            color: "var(--fg-muted)",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div
            className="ml-2 flex-1 rounded-full px-3 py-1 text-xs md:text-sm"
            style={{ backgroundColor: "color-mix(in srgb, var(--fg) 4%, var(--surface))" }}
          >
            {src}
          </div>
        </div>
        {image}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
      {image}
    </div>
  )
}
