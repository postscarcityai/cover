"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type PillVariant = "primary" | "secondary" | "accent" | "ghost"
type PillSize = "sm" | "md" | "lg"

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PillVariant
  size?: PillSize
  asLink?: boolean
  href?: string
}

const sizeStyles: Record<PillSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-12 px-7 text-base",
}

const variantStyles: Record<PillVariant, string> = {
  // Charcoal pill — default primary CTA (ro pattern)
  primary:
    "bg-ink text-white hover:bg-ink/90 active:bg-ink/80 transition-colors",
  // White pill with thin charcoal border — secondary CTA
  secondary:
    "bg-white text-ink border border-ink/15 hover:bg-ink/[0.03] active:bg-ink/[0.06] transition-colors",
  // Brand-color pill — the "moment" CTA (hims gold / ro yellow)
  accent:
    "bg-accent text-accent-ink hover:opacity-90 active:opacity-80 transition-opacity",
  // Subtle pill for in-card actions
  ghost:
    "bg-ink/[0.06] text-ink hover:bg-ink/[0.10] active:bg-ink/[0.14] transition-colors",
}

export const PillButton = React.forwardRef<
  HTMLButtonElement,
  PillButtonProps
>(({ className, variant = "primary", size = "md", asLink, href, children, ...props }, ref) => {
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill font-medium tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  const cls = cn(base, sizeStyles[size], variantStyles[variant], className)

  if (asLink && href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    )
  }

  return (
    <button ref={ref} className={cls} {...props}>
      {children}
    </button>
  )
})
PillButton.displayName = "PillButton"
