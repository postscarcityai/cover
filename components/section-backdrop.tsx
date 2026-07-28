import type { CSSProperties, ReactNode } from "react"

interface SectionBackdropProps {
  /** Optional id on the wrapper element — e.g. an in-page anchor target. */
  id?: string
  /** Background image to tint the section. Set opacity via `intensity`. */
  image?: string
  /** Opacity of the image overlay, 0–1. Defaults to 0.06 (a subtle wash). */
  intensity?: number
  /** Background color before the image. Defaults to var(--surface). */
  baseColor?: string
  /** Direction of the mask so the image fades toward one edge. */
  fade?: "top" | "bottom" | "center" | "right"
  /**
   * Wrapper element. Use "div" when the children already render their own
   * <section> (e.g. wrapping a section-renderer section) to avoid nested
   * section semantics; defaults to "section" for standalone use.
   */
  as?: "section" | "div"
  className?: string
  children: ReactNode
}

export function SectionBackdrop({
  id,
  image,
  intensity = 0.06,
  baseColor = "var(--surface)",
  fade = "center",
  as: Tag = "section",
  className = "",
  children,
}: SectionBackdropProps) {
  const maskByFade: Record<NonNullable<SectionBackdropProps["fade"]>, string> = {
    top: "linear-gradient(to bottom, black, transparent 70%)",
    bottom: "linear-gradient(to top, black, transparent 70%)",
    center: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent 80%)",
    right: "linear-gradient(to left, black, transparent 70%)",
  }

  const overlayStyle: CSSProperties = image
    ? {
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: intensity,
        WebkitMaskImage: maskByFade[fade],
        maskImage: maskByFade[fade],
      }
    : {}

  return (
    <Tag
      id={id}
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: baseColor }}
    >
      {image && <div aria-hidden className="absolute inset-0 pointer-events-none" style={overlayStyle} />}
      <div className="relative z-10">{children}</div>
    </Tag>
  )
}
