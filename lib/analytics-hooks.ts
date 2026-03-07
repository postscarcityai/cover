/**
 * React hooks for analytics tracking
 * Prevents double-firing and ensures clean event tracking
 */

import { useEffect, useRef } from 'react'
import { trackPageView, trackScrollDepth } from './analytics'

/**
 * Track page view once on component mount
 * Prevents double-firing with strict mode or re-renders
 */
export const usePageTracking = (
  pageName: string,
  pageCategory: string,
  pageType?: string
) => {
  const hasTracked = useRef(false)

  useEffect(() => {
    // Only fire once, even in React strict mode (development)
    if (!hasTracked.current) {
      trackPageView(pageName, pageCategory, pageType)
      hasTracked.current = true
    }
  }, [pageName, pageCategory, pageType])
}

/**
 * Track scroll depth milestones (25%, 50%, 75%, 100%)
 * Each milestone only fires once per session
 */
export const useScrollTracking = () => {
  const maxScrollReached = useRef(0)
  const milestones = useRef({
    '25': false,
    '50': false,
    '75': false,
    '100': false
  })

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const scrollPercentage = Math.round(
        (scrollTop / (documentHeight - windowHeight)) * 100
      )

      // Update max scroll
      if (scrollPercentage > maxScrollReached.current) {
        maxScrollReached.current = scrollPercentage
      }

      // Fire milestones only once in ascending order
      if (scrollPercentage >= 25 && !milestones.current['25']) {
        milestones.current['25'] = true
        trackScrollDepth(25)
      } else if (scrollPercentage >= 50 && !milestones.current['50']) {
        milestones.current['50'] = true
        trackScrollDepth(50)
      } else if (scrollPercentage >= 75 && !milestones.current['75']) {
        milestones.current['75'] = true
        trackScrollDepth(75)
      } else if (scrollPercentage >= 100 && !milestones.current['100']) {
        milestones.current['100'] = true
        trackScrollDepth(100)
      }
    }

    // Throttle scroll events to every 250ms
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [])
}

