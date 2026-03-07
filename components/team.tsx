"use client"

import { motion, useScroll, useTransform } from "framer-motion"

interface LawyerTeamProps {
  className?: string
}

export function LawyerTeam({ className = "" }: LawyerTeamProps) {
  const { scrollY } = useScroll()

  // Extended scroll range with downward movement and fade out
  const lawyer1X = useTransform(scrollY, [0, 600], [0, -40])
  const lawyer1Y = useTransform(scrollY, [0, 600], [0, 60])
  const lawyer2X = useTransform(scrollY, [0, 600], [0, -35])
  const lawyer2Y = useTransform(scrollY, [0, 600], [0, 70])
  const lawyer3X = useTransform(scrollY, [0, 600], [0, -20])
  const lawyer3Y = useTransform(scrollY, [0, 600], [0, 50])
  const lawyer4X = useTransform(scrollY, [0, 600], [0, 20])
  const lawyer4Y = useTransform(scrollY, [0, 600], [0, 55])
  const lawyerCenterY = useTransform(scrollY, [0, 600], [0, 45])
  const lawyer6X = useTransform(scrollY, [0, 600], [0, 35])
  const lawyer6Y = useTransform(scrollY, [0, 600], [0, 65])
  const lawyer7X = useTransform(scrollY, [0, 600], [0, 30])
  const lawyer7Y = useTransform(scrollY, [0, 600], [0, 58])

  // Fade out effect matching the hero text
  const teamOpacity = useTransform(scrollY, [0, 600], [1, 0])

  const lawyers = [
    {
      src: "/img/lawyer-1.png",
      alt: "Defense attorney",
      height: "h-36",
      x: lawyer1X,
      y: lawyer1Y,
      zIndex: "z-10" // Outermost layer
    },
    {
      src: "/img/lawyer-2.png",
      alt: "Defense attorney", 
      height: "h-40",
      x: lawyer2X,
      y: lawyer2Y,
      zIndex: "z-20" // Second layer
    },
    {
      src: "/img/lawyer-3.png",
      alt: "Defense attorney",
      height: "h-44",
      x: lawyer3X,
      y: lawyer3Y,
      zIndex: "z-30" // Third layer
    },
    {
      src: "/img/lawyer-center.png",
      alt: "Principal attorney",
      height: "h-48",
      x: useTransform(scrollY, [0, 600], [0, 0]), // Center stays centered horizontally
      y: lawyerCenterY,
      zIndex: "z-50", // Highest - always on top
      isCenter: true
    },
    {
      src: "/img/lawyer-4.png",
      alt: "Defense attorney",
      height: "h-44",
      x: lawyer4X, 
      y: lawyer4Y,
      zIndex: "z-30" // Third layer (mirror of lawyer-3)
    },
    {
      src: "/img/lawyer-6.png",
      alt: "Defense attorney",
      height: "h-40",
      x: lawyer6X,
      y: lawyer6Y,
      zIndex: "z-20" // Second layer (mirror of lawyer-2)
    },
    {
      src: "/img/lawyer-7.png",
      alt: "Defense attorney",
      height: "h-36",
      x: lawyer7X,
      y: lawyer7Y,
      zIndex: "z-10" // Outermost layer (mirror of lawyer-1)
    }
  ]

  return (
    <motion.div 
      className={`absolute bottom-0 right-8 flex items-end justify-center ${className}`}
      style={{ opacity: teamOpacity }}
      role="img"
      aria-label="Team of attorneys arranged in formation with principal attorney prominently positioned at center, representing comprehensive legal expertise and layered defense strategy"
    >
      {lawyers.map((lawyer, index) => (
        <motion.img
          key={lawyer.src}
          src={lawyer.src}
          alt={lawyer.alt}
          className={`${lawyer.height} w-auto -mr-6 ${lawyer.zIndex}`}
          style={{ 
            x: lawyer.x, 
            y: lawyer.y
          }}
          initial={{ 
            y: 20 // Start with bottom bleed
          }}
          aria-hidden="true"
        />
      ))}
    </motion.div>
  )
}
