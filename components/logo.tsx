"use client"

import { siteConfig } from "@/site.config"

interface LogoProps {
  className?: string
  variant?: 'primary' | 'white'
  isHovered?: boolean
}

export function Logo({ className = "", variant = 'primary', isHovered = false }: LogoProps) {
  // Get theme primary color for hover effect
  const defaultColor = variant === 'white' ? '#ffffff' : 'var(--theme-primary)'
  
  // Hover color - use a slightly muted version of theme primary
  // For white variant, keep white
  const hoverColor = variant === 'white' 
    ? '#ffffff' 
    : 'var(--theme-primary)' // Can be customized with CSS variable or specific color
  
  const fillColor = isHovered ? hoverColor : defaultColor

  return (
    <svg
      width="180"
      height="48"
      viewBox="0 0 180 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`${siteConfig.name} logo`}
      style={{
        transition: 'all 0.3s ease-in-out'
      }}
    >
      <text
        x="90"
        y="32"
        fontFamily="Arial, sans-serif"
        fontSize="20"
        fontWeight="700"
        fill={fillColor}
        textAnchor="middle"
        style={{ 
          fill: fillColor,
          transition: 'fill 0.3s ease-in-out'
        }}
      >
        YOUR LOGO
      </text>
    </svg>
  )
}
