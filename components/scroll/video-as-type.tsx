"use client"

import { ScrubVideo, type ScrubVideoSources } from "@/components/scroll/scrub-video"

export interface VideoAsTypeProps {
  sources: ScrubVideoSources
  alt: string
  text: string
  /**
   * "knockout" punches the text out of a solid plate so footage shows through
   * the letterforms. "blend" lays the text over the footage with a blend mode.
   */
  mode?: "knockout" | "blend"
  className?: string
}

/**
 * Pattern 06 — video-as-type.
 *
 * Reads as high-craft and costs almost nothing.
 *
 * `knockout` uses `mix-blend-mode: screen` on black text over a white plate,
 * which punches the letterforms through to the footage below. This is
 * deliberately preferred over `background-clip: text` with a video background:
 * that approach requires painting video frames into a canvas and using it as a
 * background image, which doubles the per-frame work for the same result.
 *
 * The text is rendered as real, selectable text in both modes and carries an
 * accessible label — a blend mode is a paint effect, not a content change, so
 * screen readers and find-in-page still see the words.
 */
export function VideoAsType({
  sources,
  alt,
  text,
  mode = "knockout",
  className = "",
}: VideoAsTypeProps) {
  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      <ScrubVideo sources={sources} alt={alt} enhance={false} />

      {mode === "knockout" ? (
        <div
          className="absolute inset-0 flex items-center justify-center bg-white"
          style={{ mixBlendMode: "screen" }}
        >
          <span className="px-6 text-center text-[clamp(2.5rem,12vw,10rem)] font-bold leading-none tracking-tight text-black">
            {text}
          </span>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="px-6 text-center text-[clamp(2.5rem,12vw,10rem)] font-bold leading-none tracking-tight text-white"
            style={{ mixBlendMode: "difference" }}
          >
            {text}
          </span>
        </div>
      )}
    </div>
  )
}
