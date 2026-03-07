"use client"

import { motion, useScroll, useTransform } from "framer-motion"

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
  const { scrollY } = useScroll()

  const lawyer1Y = useTransform(scrollY, [0, 600], [0, 60])
  const lawyer2Y = useTransform(scrollY, [0, 600], [0, 70])
  const lawyer3Y = useTransform(scrollY, [0, 600], [0, 50])
  const lawyer4Y = useTransform(scrollY, [0, 600], [0, 55])
  const lawyerCenterY = useTransform(scrollY, [0, 600], [0, 45])
  const lawyer6Y = useTransform(scrollY, [0, 600], [0, 65])
  const lawyer7Y = useTransform(scrollY, [0, 600], [0, 58])

  const teamOpacity = useTransform(scrollY, [0, 600], [1, 0])

  const lawyers = [
    { height: "h-36", y: lawyer1Y, zIndex: "z-10", label: "Team member" },
    { height: "h-40", y: lawyer2Y, zIndex: "z-20", label: "Team member" },
    { height: "h-44", y: lawyer3Y, zIndex: "z-30", label: "Team member" },
    { height: "h-48", y: lawyerCenterY, zIndex: "z-50", label: "Principal team member" },
    { height: "h-44", y: lawyer4Y, zIndex: "z-30", label: "Team member" },
    { height: "h-40", y: lawyer6Y, zIndex: "z-20", label: "Team member" },
    { height: "h-36", y: lawyer7Y, zIndex: "z-10", label: "Team member" },
  ]

  return (
    <motion.div
      className={`absolute bottom-0 right-8 flex items-end justify-center ${className}`}
      style={{ opacity: teamOpacity }}
      role="img"
      aria-label="Team of professionals arranged in formation"
    >
      {lawyers.map((lawyer, index) => (
        <motion.div
          key={index}
          className={`${lawyer.zIndex} -mr-6`}
          style={{ y: lawyer.y }}
        >
          <PersonPlaceholder height={lawyer.height} label={lawyer.label} />
        </motion.div>
      ))}
    </motion.div>
  )
}
