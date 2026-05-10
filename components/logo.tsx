"use client"

import { siteConfig } from "@/site.config"

interface LogoProps {
  className?: string
  variant?: "primary" | "white"
  isHovered?: boolean
}

/**
 * Brand wordmark — typographic, lowercase, tightly tracked.
 * Modeled on ro.co's "ro" and hims's "hims" — bare wordmark in the
 * display typeface, no SVG glyphs, just letters.
 *
 * The displayed text comes from `siteConfig.brand?.wordmark` (override
 * per project), falling back to "cover".
 */
export function Logo({ className = "", variant = "primary", isHovered = false }: LogoProps) {
  const color = variant === "white" ? "#ffffff" : "var(--ink)"
  // siteConfig is loosely typed at the brand layer; fall back to "cover".
  const wordmark =
    (siteConfig as { brand?: { wordmark?: string } }).brand?.wordmark ?? "cover"

  return (
    <span
      className={`font-display font-medium leading-none lowercase select-none ${className}`}
      aria-label={`${siteConfig.name} logo`}
      style={{
        color,
        fontSize: "26px",
        letterSpacing: "-0.05em",
        opacity: isHovered ? 0.8 : 1,
        transition: "opacity 0.2s ease-in-out",
      }}
    >
      {wordmark}
    </span>
  )
}
