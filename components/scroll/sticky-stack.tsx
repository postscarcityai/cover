"use client"

import { type ReactNode } from "react"

export interface StickyStackProps {
  children: ReactNode[]
  /** Distance from the top of the viewport the first card rests at. */
  topOffset?: number
  /** Extra offset per card, so the stack fans rather than perfectly overlaps. */
  stagger?: number
  className?: string
}

/**
 * Pattern 03 — sticky card stack.
 *
 * Cards pin one after another and fan slightly, scaling down and dimming as
 * the next arrives.
 *
 * Deliberately **native `position: sticky`, not a GSAP pin.** When an element
 * only needs to hold still, sticky has no refresh cost, injects no spacer div,
 * and doesn't interact with Lenis at all. Reach for `pin: true` only when you
 * need `pinSpacing`, an exact scroll range, or `containerAnimation`.
 *
 * The scale/dim is CSS driven off `--i` too, so this whole pattern costs zero
 * JavaScript.
 */
export function StickyStack({
  children,
  topOffset = 80,
  stagger = 12,
  className = "",
}: StickyStackProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <div
          key={i}
          className="sticky"
          style={
            {
              "--i": i,
              top: `calc(${topOffset}px + ${i} * ${stagger}px)`,
              // Cards further down the stack sit slightly smaller and darker,
              // which reads as depth without any scroll listener.
              transform: `scale(${1 - i * 0.02})`,
              transformOrigin: "top center",
            } as React.CSSProperties
          }
        >
          {child}
        </div>
      ))}
    </div>
  )
}
