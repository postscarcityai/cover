"use client"

import { siteConfig } from "@/site.config"

interface LogoProps {
  className?: string
  variant?: "primary" | "white"
  isHovered?: boolean
}

export function Logo({ className = "", variant = "primary", isHovered = false }: LogoProps) {
  const color = variant === "white" ? "#ffffff" : "var(--accent)"

  return (
    <svg
      width="140"
      height="36"
      viewBox="0 0 140 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`${siteConfig.name} logo`}
      style={{ transition: "all 0.3s ease-in-out" }}
    >
      <text
        x="0"
        y="26"
        fontFamily="var(--font-montserrat), system-ui, sans-serif"
        fontSize="22"
        fontWeight="800"
        letterSpacing="-0.02em"
        fill={color}
        style={{
          fill: color,
          opacity: isHovered ? 0.8 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        Logo Co.
      </text>
    </svg>
  )
}
