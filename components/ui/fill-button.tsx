"use client"

import { cn } from "@/lib/utils"

interface FillButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
}

export function FillButton({ children, onClick, href, className }: FillButtonProps) {
  const handleClick = () => {
    if (onClick) onClick()
    else if (href) window.location.href = href
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden border px-8 py-4 text-base font-medium tracking-wide transition-colors duration-500",
        className
      )}
      style={{ borderColor: "var(--fg)", color: "var(--fg)" }}
    >
      <span
        className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100"
        style={{ backgroundColor: "var(--fg)" }}
      />
      <span className="relative z-10 transition-colors duration-500 group-hover:text-[var(--bg)]">
        {children}
      </span>
    </button>
  )
}
