"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface VintageHeroSliderProps {
  images: string[]
  height?: string
  autoPlayInterval?: number
  className?: string
  children?: React.ReactNode
}

export function VintageHeroSlider({ 
  images, 
  height = "h-[70vh]", 
  autoPlayInterval = 6000,
  className = "",
  children 
}: VintageHeroSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFlickering, setIsFlickering] = useState(false)
  const [flickerIntensity, setFlickerIntensity] = useState(0.8)
  const [isHeavyFlicker, setIsHeavyFlicker] = useState(false)
  const [projectionFlicker, setProjectionFlicker] = useState(1)

  // Ultra-smooth Ken Burns animation - images always larger than canvas
  const getKenBurnsVariants = () => {
    const direction = Math.random()
    const baseScale = 1.15 // Always start larger than canvas
    const intensity = baseScale + Math.random() * 0.15 // Scale between 1.15 and 1.3 (gentler)
    const panRange = 25 + Math.random() * 35 // Pan between 25-60px (smoother movement)
    
    // Different movement patterns - dramatic but ultra-smooth
    if (direction < 0.25) {
      // Dramatic drift from top-left to bottom-right
      return {
        initial: { scale: baseScale, x: -panRange/2, y: -panRange/2, rotate: 0 },
        animate: { 
          scale: intensity, 
          x: panRange/2, 
          y: panRange/2,
          rotate: (Math.random() - 0.5) * 0.15, // Ultra-subtle rotation
          transition: { 
            duration: (autoPlayInterval / 1000) * 1.2, // 20% longer for smoother movement
            ease: "linear" // Perfectly smooth linear scaling
          }
        }
      }
    } else if (direction < 0.5) {
      // Dramatic drift from top-right to bottom-left
      return {
        initial: { scale: baseScale, x: panRange/2, y: -panRange/2, rotate: 0 },
        animate: { 
          scale: intensity, 
          x: -panRange/2, 
          y: panRange/2,
          rotate: (Math.random() - 0.5) * 0.15, // Ultra-subtle rotation
          transition: { 
            duration: (autoPlayInterval / 1000) * 1.2, // 20% longer for smoother movement
            ease: "linear" // Perfectly smooth linear scaling
          }
        }
      }
    } else if (direction < 0.75) {
      // Dramatic center expansion with drift
      return {
        initial: { scale: baseScale, x: 0, y: 0, rotate: 0 },
        animate: { 
          scale: intensity, 
          x: (Math.random() - 0.5) * panRange * 0.8, 
          y: (Math.random() - 0.5) * panRange * 0.6,
          rotate: (Math.random() - 0.5) * 0.1, // Ultra-subtle rotation
          transition: { 
            duration: (autoPlayInterval / 1000) * 1.2, // 20% longer for smoother movement
            ease: "linear" // Perfectly smooth linear scaling
          }
        }
      }
    } else {
      // Dramatic diagonal sweep
      return {
        initial: { scale: baseScale, x: panRange/3, y: panRange/3, rotate: 0 },
        animate: { 
          scale: intensity, 
          x: -panRange/2, 
          y: -panRange/2,
          rotate: (Math.random() - 0.5) * 0.12, // Ultra-subtle rotation
          transition: { 
            duration: (autoPlayInterval / 1000) * 1.2, // 20% longer for smoother movement
            ease: "linear" // Perfectly smooth linear scaling
          }
        }
      }
    }
  }

  const kenBurnsVariants = {
    ...getKenBurnsVariants(),
    exit: { 
      scale: 1.18, // Gentler exit scale for smoother transition
      opacity: 0,
      filter: "brightness(1.02) contrast(0.98)",
      transition: { 
        duration: 2.0, // Even longer, ultra-smooth exit
        ease: "linear" // Perfectly smooth linear scaling for exit too
      }
    }
  }

  // Gentle film flicker effects - no harsh flashes
  const flickerEffect = useCallback(() => {
    setFlickerIntensity(0.1 + Math.random() * 0.25) // Much more subtle intensity (0.1 to 0.35)
    setIsFlickering(true)
    setTimeout(() => setIsFlickering(false), 60 + Math.random() * 80) // Shorter, gentler duration
  }, [])

  const heavyFlickerEffect = useCallback(() => {
    setIsHeavyFlicker(true)
    setTimeout(() => setIsHeavyFlicker(false), 120 + Math.random() * 180) // Shorter duration
  }, [])

  // Auto-advance slides
  useEffect(() => {
    if (images.length <= 1) return

    const interval = setInterval(() => {
      // Very rare flicker before transition
      if (Math.random() > 0.9) { // Only 10% chance
        flickerEffect()
      }
      if (Math.random() > 0.95) { // Only 5% chance
        heavyFlickerEffect()
      }
      
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [images.length, autoPlayInterval, flickerEffect, heavyFlickerEffect])

  // Very subtle and rare flicker intervals
  useEffect(() => {
    // Light flicker - very rare
    const lightFlicker = setInterval(() => {
      if (Math.random() > 0.95) { // Only 5% chance
        flickerEffect()
      }
    }, 8000 + Math.random() * 12000) // 8-20 seconds

    // Heavy flicker - extremely rare
    const heavyFlicker = setInterval(() => {
      if (Math.random() > 0.98) { // Only 2% chance
        heavyFlickerEffect()
      }
    }, 15000 + Math.random() * 25000) // 15-40 seconds

    // Remove burst flicker entirely - too aggressive

    return () => {
      clearInterval(lightFlicker)
      clearInterval(heavyFlicker)
    }
  }, [flickerEffect, heavyFlickerEffect])

  // Subtle projection flicker - constant subtle variations like a film projector
  useEffect(() => {
    const projectionInterval = setInterval(() => {
      // Even more subtle brightness variations (0.95 to 1.05)
      const newFlicker = 0.95 + Math.random() * 0.10
      setProjectionFlicker(newFlicker)
    }, 150 + Math.random() * 250) // Every 150-400ms (slower)

    return () => clearInterval(projectionInterval)
  }, [])

  if (!images.length) {
    return (
      <div className={`relative ${height} bg-gray-900 ${className}`}>
        {children}
      </div>
    )
  }

  return (
    <div 
      className={`relative ${height} overflow-hidden bg-black ${className}`}
      style={{
        filter: `brightness(${projectionFlicker})`,
        transition: 'filter 0.1s ease-out'
      }}
    >
      {/* Vintage Film Noise Overlay */}
      <div 
        className="absolute inset-0 z-20 opacity-15 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0),
            radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)
          `,
          backgroundSize: '3px 3px, 5px 5px',
          animation: 'filmNoise 0.2s infinite linear'
        }}
      />

      {/* Gentle Film Flicker Overlays - No Harsh Flashes */}
      <AnimatePresence>
        {isFlickering && (
          <>
            {/* Very subtle brightness variation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: flickerIntensity * 0.3 }} // Much more subtle
              exit={{ opacity: 0 }}
              transition={{ duration: 0.08 }}
              className="absolute inset-0 z-30 bg-yellow-50 mix-blend-overlay pointer-events-none"
            />
            {/* Gentle contrast shift */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: flickerIntensity * 0.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute inset-0 z-29 bg-gray-100 mix-blend-soft-light pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>

      {/* Gentle Heavy Flicker Effect */}
      <AnimatePresence>
        {isHeavyFlicker && (
          <>
            {/* Subtle brightness variation - never harsh */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.25, 0.1, 0.2, 0] }} // Much lower maximum
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, times: [0, 0.2, 0.5, 0.8, 1] }}
              className="absolute inset-0 z-31 bg-yellow-100 mix-blend-overlay pointer-events-none"
            />
            {/* Very gentle contrast shift */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.15, 0.05, 0.12, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, times: [0, 0.3, 0.6, 0.9, 1] }}
              className="absolute inset-0 z-31 bg-gray-800 mix-blend-multiply pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>

      {/* Vignette Effect */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            background: `
              radial-gradient(ellipse at center, 
                transparent 20%, 
                rgba(0,0,0,0.1) 50%, 
                rgba(0,0,0,0.3) 80%, 
                rgba(0,0,0,0.6) 100%
              )
            `
          }}
        />
      </div>

      {/* Image Slider with Enhanced Effects */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          variants={kenBurnsVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0"
          style={{
            filter: `
              sepia(0.3) 
              contrast(1.1) 
              brightness(0.95) 
              saturate(0.8)
              hue-rotate(${Math.sin(Date.now() / 10000) * 5}deg)
            `
          }}
        >
          <Image
            src={images[currentImageIndex]}
            alt={`Hero Image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            priority={currentImageIndex === 0}
            quality={95}
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
          />
          
          {/* Image grain overlay */}
          <div 
            className="absolute inset-0 opacity-25 mix-blend-overlay"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 1px, transparent 2px),
                radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 1px, transparent 2px),
                radial-gradient(circle at 40% 40%, rgba(0,0,0,0.1) 1px, transparent 2px)
              `,
              backgroundSize: '4px 4px, 6px 6px, 3px 3px',
              animation: 'filmNoise 0.15s infinite linear'
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Vintage Color Filters */}
      <div 
        className="absolute inset-0 z-10 mix-blend-multiply opacity-50 pointer-events-none"
        style={{
          background: `
            linear-gradient(45deg, rgba(139, 69, 19, 0.4), rgba(101, 67, 33, 0.3)),
            radial-gradient(ellipse at 30% 70%, rgba(160, 82, 45, 0.2), transparent 70%),
            radial-gradient(ellipse at 70% 30%, rgba(85, 85, 85, 0.1), transparent 60%)
          `
        }}
      />
      
      {/* Dust and scratches effect */}
      <div 
        className="absolute inset-0 z-15 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 98%, rgba(255,255,255,0.6) 99%, transparent 100%),
            linear-gradient(45deg, transparent 97%, rgba(0,0,0,0.4) 98%, transparent 99%),
            radial-gradient(circle at 15% 25%, rgba(0,0,0,0.3) 1px, transparent 2px),
            radial-gradient(circle at 85% 75%, rgba(255,255,255,0.2) 1px, transparent 2px)
          `,
          backgroundSize: '200px 100%, 150px 100%, 50px 50px, 80px 80px',
          animation: 'filmNoise 0.3s infinite linear'
        }}
      />

      {/* Scan Lines Effect */}
      <div 
        className="absolute inset-0 z-20 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
          animation: 'scanlines 0.1s infinite linear'
        }}
      />

      {/* Content Overlay */}
      {children && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          {children}
        </div>
      )}



      {/* Progress Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-110' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}


    </div>
  )
}

// Utility function to dynamically load images from a directory
// Template: Add your hero images to the specified directory and update this array
export function useHeroImages(directory: string): string[] {
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    // Template: Replace with your actual hero image paths
    // Example: [`${directory}/hero-1.jpg`, `${directory}/hero-2.jpg`]
    // If no images are provided, the slider will gracefully handle empty array
    const heroImages: string[] = []
    // const heroImages = [
    //   `${directory}/hero-1.jpg`,
    //   `${directory}/hero-2.jpg`,
    //   `${directory}/hero-3.jpg`
    // ]
    
    setImages(heroImages)
  }, [directory])

  return images
}
