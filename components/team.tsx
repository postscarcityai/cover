"use client"

import { useEffect, useRef, useState } from "react"

interface LawyerTeamProps {
  className?: string
}

function PersonPlaceholder({ height, label }: { height: string; label: string }) {
  return (
    <div className={`${height} w-auto aspect-[3/5]`} aria-hidden="true">
      <svg
        viewBox="0 0 120 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label={label}
      >
        <rect width="120" height="200" rx="4" fill="var(--surface)" />
        <circle cx="60" cy="60" r="24" stroke="var(--border)" strokeWidth="1.5" fill="none" />
        <path
          d="M30 160 Q30 120 60 110 Q90 120 90 160"
          stroke="var(--border)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  )
}

export function LawyerTeam({ className = "" }: LawyerTeamProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY)
        rafRef.current = 0
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const clampedScroll = Math.min(scrollY, 600)
  const progress = clampedScroll / 600

  const lawyers = [
    { height: "h-36", yOffset: 60, zIndex: "z-10", label: "Team member" },
    { height: "h-40", yOffset: 70, zIndex: "z-20", label: "Team member" },
    { height: "h-44", yOffset: 50, zIndex: "z-30", label: "Team member" },
    { height: "h-48", yOffset: 45, zIndex: "z-50", label: "Principal team member" },
    { height: "h-44", yOffset: 55, zIndex: "z-30", label: "Team member" },
    { height: "h-40", yOffset: 65, zIndex: "z-20", label: "Team member" },
    { height: "h-36", yOffset: 58, zIndex: "z-10", label: "Team member" },
  ]

  return (
    <div
      ref={containerRef}
      className={`absolute bottom-0 right-8 flex items-end justify-center ${className}`}
      style={{ opacity: 1 - progress }}
      role="img"
      aria-label="Team of professionals arranged in formation"
    >
      {lawyers.map((lawyer, index) => (
        <div
          key={index}
          className={`${lawyer.zIndex} -mr-6`}
          style={{ transform: `translateY(${progress * lawyer.yOffset}px)` }}
        >
          <PersonPlaceholder height={lawyer.height} label={lawyer.label} />
        </div>
      ))}
    </div>
  )
}
