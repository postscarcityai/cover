"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

/**
 * GSAP Smooth Scrolling with Momentum
 * 
 * Optional smooth scrolling component that provides momentum-based scrolling.
 * Automatically disables on mobile/touch devices for better performance.
 * 
 * To use: Wrap your content in the scroll wrapper structure in layout.tsx
 * 
 * @example
 * ```tsx
 * <ScrollSmoother 
 *   smooth={0.08}
 *   speed={1}
 *   ease="power2.out"
 *   normalizeScroll={true}
 *   effects={true}
 * />
 * ```
 */
interface ScrollSmootherConfig {
  smooth?: number
  speed?: number
  ease?: string
  normalizeScroll?: boolean
  effects?: boolean
}

export function ScrollSmoother(config: ScrollSmootherConfig = {}) {
  const {
    smooth = 0.1,      // Lerp amount - lower = more momentum
    speed = 1,         // Response speed multiplier
    ease = "power2.out", // Easing curve for momentum
    normalizeScroll = true,
    effects = true,
  } = config

  const pathname = usePathname()
  const gsapRef = useRef<any>(null)
  const scrollTriggerRef = useRef<any>(null)
  const cleanupRef = useRef<(() => void) | null>(null)
  const scrollStateRef = useRef<{ currentScroll: number; targetScroll: number } | null>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Disable smooth scroll on mobile/touch devices
    // More robust mobile detection that doesn't disable on desktop PCs with touchscreens
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isSmallScreen = window.innerWidth < 1024
    const isMobile = isMobileDevice || (isSmallScreen && 'ontouchstart' in window)
    
    if (isMobile) {
      // On mobile, just use native scrolling
      return
    }

    const initSmoothScroll = async () => {
      try {
        // Import GSAP and ScrollTrigger
        const gsapModule = await import("gsap")
        const ScrollTriggerModule = await import("gsap/ScrollTrigger")
        
        const gsap = gsapModule.default || gsapModule
        const ScrollTrigger = ScrollTriggerModule.default || ScrollTriggerModule
        
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger)
        
        // Store references for cleanup
        gsapRef.current = gsap
        scrollTriggerRef.current = ScrollTrigger
        
        // Get DOM elements
        const scrollContainer = document.getElementById('smooth-wrapper')
        const content = document.getElementById('smooth-content')
        
        if (!scrollContainer || !content) {
          return
        }

        // Set up container
        const viewportHeight = window.innerHeight
        scrollContainer.style.height = `${viewportHeight}px`
        scrollContainer.style.overflow = 'hidden'
        scrollContainer.style.position = 'fixed'
        scrollContainer.style.top = '0'
        scrollContainer.style.left = '0'
        scrollContainer.style.width = '100%'
        scrollContainer.style.zIndex = '0'
        
        // Set up content
        content.style.willChange = 'transform'
        
        // Debounced momentum scrolling variables
        let currentScroll = 0
        let targetScroll = 0
        let velocity = 0
        let isScrolling = false
        let scrollTimeout: NodeJS.Timeout | null = null
        
        // Store scroll state in ref for external access
        scrollStateRef.current = { currentScroll, targetScroll }
        
        // Create smooth scroll animation
        const smoothScrollTween = gsap.to(content, {
          y: () => -currentScroll,
          ease: "none",
          duration: 0.1,
          onUpdate: () => {
            ScrollTrigger.refresh()
          }
        })
        
        // Momentum update loop
        const updateScroll = () => {
          // Calculate distance to target
          const distance = targetScroll - currentScroll
          
          // Apply momentum with better smoothing
          if (Math.abs(distance) > 0.5) {
            // Smooth interpolation
            currentScroll += distance * 0.1
            
            // Update scroll state ref
            if (scrollStateRef.current) {
              scrollStateRef.current.currentScroll = currentScroll
              scrollStateRef.current.targetScroll = targetScroll
            }
            
            // Update animation
            smoothScrollTween.invalidate()
            smoothScrollTween.restart()
            
            // Dispatch custom scroll event for components that need real-time scroll position
            window.dispatchEvent(new CustomEvent('smoothscroll', { 
              detail: { scrollY: currentScroll } 
            }))
          }
          
          requestAnimationFrame(updateScroll)
        }
        
        // Function to reset scroll to top (exposed via window for route changes)
        (window as any).__resetSmoothScroll = () => {
          currentScroll = 0
          targetScroll = 0
          if (scrollStateRef.current) {
            scrollStateRef.current.currentScroll = 0
            scrollStateRef.current.targetScroll = 0
          }
          gsap.set(content, { y: 0 })
          ScrollTrigger.refresh()
        }
        
        // Start update loop
        requestAnimationFrame(updateScroll)
        
        // Debounced wheel handler
        const handleWheel = (e: WheelEvent) => {
          // Don't handle wheel events when modal is open
          if (document.body.hasAttribute('data-modal-open')) {
            return
          }
          
          // Allow horizontal scrolling/swiping for browser back/forward navigation
          // Only intercept vertical scrolling
          const isHorizontalSwipe = Math.abs(e.deltaX) > Math.abs(e.deltaY)
          
          if (isHorizontalSwipe) {
            // Let browser handle horizontal swipes (back/forward navigation)
            return
          }
          
          // Only prevent default for vertical scrolling
          e.preventDefault()
          
          // Clear existing timeout
          if (scrollTimeout) {
            clearTimeout(scrollTimeout)
          }
          
          // Simple scroll handling - scroll down = positive delta, scroll up = negative delta
          const delta = e.deltaY
          targetScroll = Math.max(0, Math.min(content.scrollHeight - viewportHeight, targetScroll + delta))
          
          // Set scrolling state
          isScrolling = true
          
          // Debounce scroll end
          scrollTimeout = setTimeout(() => {
            isScrolling = false
          }, 150)
          
        }
        
        // Add wheel listener
        window.addEventListener('wheel', handleWheel, { passive: false })
        
        // Add scroll progress indicator
        if (effects) {
          const progressBar = document.createElement('div')
          progressBar.id = 'scroll-progress'
          progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--accent, #2A2C53);
            z-index: 9999;
            transition: width 0.1s ease;
          `
          document.body.appendChild(progressBar)
          
          ScrollTrigger.create({
            trigger: content,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
              progressBar.style.width = `${self.progress * 100}%`
            }
          })
        }
        
        // Handle window resize
        const handleResize = () => {
          ScrollTrigger.refresh()
        }
        
        window.addEventListener('resize', handleResize)
        
        
        // Store cleanup function
        cleanupRef.current = () => {
          window.removeEventListener('resize', handleResize)
          window.removeEventListener('wheel', handleWheel)
          ScrollTrigger.getAll().forEach(trigger => trigger.kill())
          smoothScrollTween.kill()
          
          // Clear timeout
          if (scrollTimeout) {
            clearTimeout(scrollTimeout)
          }
          
          // Remove progress bar
          const progressBar = document.getElementById('scroll-progress')
          if (progressBar) {
            progressBar.remove()
          }
        }
        
      } catch (error) {
        // Silent error handling - GSAP may not be installed
        console.warn('GSAP ScrollSmoother: GSAP not installed. Install with: npm install gsap')
      }
    }

    // Initialize after DOM is ready
    const timer = setTimeout(initSmoothScroll, 100)
    
    return () => {
      clearTimeout(timer)
      if (cleanupRef.current) {
        cleanupRef.current()
      }
    }
  }, [smooth, speed, ease, normalizeScroll, effects])

  // Reset scroll to top on route change
  useEffect(() => {
    // Reset scroll position when pathname changes
    if (typeof window !== 'undefined' && (window as any).__resetSmoothScroll) {
      (window as any).__resetSmoothScroll()
    }
  }, [pathname])

  return null
}

