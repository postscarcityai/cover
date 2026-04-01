"use client"

import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CTALinkProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
  muted?: boolean
}

export function CTALink({ children, onClick, href, className, muted = false }: CTALinkProps) {
  const handleClick = () => {
    if (onClick) onClick()
    else if (href) window.location.href = href
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group relative inline-flex items-center gap-3 text-base font-medium tracking-wide transition-colors duration-300",
        className
      )}
      style={{ color: muted ? "var(--fg-muted)" : "var(--fg)" }}
    >
      <span className="relative">
        {children}
        <span
          className="absolute left-0 bottom-0 h-[1px] w-0 transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:w-full"
          style={{ backgroundColor: muted ? "var(--fg-muted)" : "var(--fg)" }}
        />
      </span>
      <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-2" />
    </button>
  )
}
