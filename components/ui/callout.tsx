import { AlertTriangle, Info, CheckCircle2 } from "lucide-react"
import type { ReactNode } from "react"

export type CalloutVariant = "warning" | "info" | "success"

interface CalloutProps {
  variant?: CalloutVariant
  title?: string
  children: ReactNode
  className?: string
}

// Danger/success fall back to sensible reds/greens; themes can override by
// defining --danger / --success (e.g. in components/theme-injector.tsx).
const VARIANT_STYLES: Record<
  CalloutVariant,
  { bg: string; border: string; icon: typeof AlertTriangle; iconColor: string; titleColor: string }
> = {
  warning: {
    bg: "color-mix(in srgb, var(--danger, #dc2626) 8%, transparent)",
    border: "color-mix(in srgb, var(--danger, #dc2626) 35%, transparent)",
    icon: AlertTriangle,
    iconColor: "var(--danger, #dc2626)",
    titleColor: "color-mix(in srgb, var(--danger, #dc2626) 80%, black)",
  },
  info: {
    bg: "color-mix(in srgb, var(--accent) 8%, transparent)",
    border: "color-mix(in srgb, var(--accent) 30%, transparent)",
    icon: Info,
    iconColor: "var(--accent)",
    titleColor: "var(--accent)",
  },
  success: {
    bg: "color-mix(in srgb, var(--success, #16a34a) 8%, transparent)",
    border: "color-mix(in srgb, var(--success, #16a34a) 35%, transparent)",
    icon: CheckCircle2,
    iconColor: "var(--success, #16a34a)",
    titleColor: "color-mix(in srgb, var(--success, #16a34a) 80%, black)",
  },
}

/**
 * Prominent callout for disclaimers, warnings, and confirmations. The
 * `warning` variant is deliberately loud — bright color, warning icon,
 * larger text — so it cannot be missed.
 */
export function Callout({ variant = "info", title, children, className = "" }: CalloutProps) {
  const v = VARIANT_STYLES[variant]
  const Icon = v.icon
  return (
    <div
      role={variant === "warning" ? "alert" : "note"}
      className={`rounded-2xl border-2 px-5 py-4 md:px-6 md:py-5 ${className}`}
      style={{ backgroundColor: v.bg, borderColor: v.border }}
    >
      <div className="flex items-start gap-3 md:gap-4">
        <Icon
          className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0 mt-0.5"
          style={{ color: v.iconColor }}
          aria-hidden
        />
        <div className="text-sm md:text-base leading-relaxed" style={{ color: "var(--fg)" }}>
          {title && (
            <div
              className="font-semibold mb-1 text-base md:text-lg"
              style={{ color: v.titleColor }}
            >
              {title}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
