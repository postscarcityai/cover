import Image from "next/image"

interface ScreenshotGalleryImage {
  src: string
  alt: string
  caption?: string
}

interface ScreenshotGalleryProps {
  images: ScreenshotGalleryImage[]
  variant?: "scroll" | "grid"
  columns?: 2 | 3
}

export function ScreenshotGallery({
  images,
  variant = "grid",
  columns = 2,
}: ScreenshotGalleryProps) {
  if (variant === "scroll") {
    return (
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-x-auto pb-4">
        <div className="flex gap-6 px-6 md:px-10 lg:px-16 snap-x snap-mandatory">
          {images.map((image) => (
            <figure
              key={image.src}
              className="min-w-[78vw] md:min-w-[60vw] snap-center overflow-hidden rounded-[1.5rem] border shadow-[0_24px_60px_rgba(0,0,0,0.10)]"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)",
              }}
            >
              <div className="relative aspect-[16/10] w-full">
                <Image src={image.src} alt={image.alt} fill className="object-cover object-top" sizes="(max-width: 768px) 78vw, 60vw" />
              </div>
              {image.caption ? <figcaption className="px-4 py-3 text-sm" style={{ color: "var(--fg-muted)" }}>{image.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 ${columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"} gap-6`}>
      {images.map((image) => (
        <figure
          key={image.src}
          className="overflow-hidden rounded-[1.5rem] border shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)",
          }}
        >
          <div className="relative aspect-[16/10] w-full">
            <Image src={image.src} alt={image.alt} fill className="object-cover object-top" sizes={columns === 3 ? "(max-width: 1024px) 100vw, 33vw" : "(max-width: 1024px) 100vw, 50vw"} />
          </div>
          {image.caption ? <figcaption className="px-4 py-3 text-sm" style={{ color: "var(--fg-muted)" }}>{image.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  )
}
