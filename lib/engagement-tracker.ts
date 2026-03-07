"use client"

import { useEffect, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'

export type TriggerType = 'exit_intent' | 'scroll_depth' | 'time_fallback' | null

export const POPUP_ENABLED = false

export const TRIGGER_THRESHOLDS = {
  EXIT_INTENT_ENABLED: true,
  SCROLL_DEPTH_PERCENT: 0.6,
  SCROLL_MIN_TIME_MS: 10000,
  SCROLL_MIN_DISTANCE_PX: 400,
  FALLBACK_TIME_MS: 20000,
  FALLBACK_MIN_PAGES: 2,
  SUPPRESSION_HOURS: 24,
}

const STORAGE_KEYS = {
  POPUP_SHOWN_SESSION: 'cover_popup_shown_session',
  POPUP_DISMISSED_AT: 'cover_popup_dismissed_at',
  POPUP_CONVERTED: 'cover_popup_converted',
  SESSION_START: 'cover_session_start',
  PAGES_VISITED: 'cover_pages_visited',
}

const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 768px)').matches ||
         window.matchMedia('(pointer: coarse)').matches
}

export const wasPopupShownThisSession = (): boolean => {
  if (typeof window === 'undefined') return true
  try { return sessionStorage.getItem(STORAGE_KEYS.POPUP_SHOWN_SESSION) === 'true' }
  catch { return true }
}

export const markPopupAsShown = (): void => {
  if (typeof window === 'undefined') return
  try { sessionStorage.setItem(STORAGE_KEYS.POPUP_SHOWN_SESSION, 'true') }
  catch { /* storage disabled */ }
}

export const isWithinSuppressionWindow = (): boolean => {
  if (typeof window === 'undefined') return true
  try {
    const dismissedAt = localStorage.getItem(STORAGE_KEYS.POPUP_DISMISSED_AT)
    if (!dismissedAt) return false
    const hoursSince = (Date.now() - Number(dismissedAt)) / (1000 * 60 * 60)
    return hoursSince < TRIGGER_THRESHOLDS.SUPPRESSION_HOURS
  } catch { return false }
}

export const markPopupAsDismissed = (): void => {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(STORAGE_KEYS.POPUP_DISMISSED_AT, Date.now().toString()) }
  catch { /* storage disabled */ }
}

export const hasUserConverted = (): boolean => {
  if (typeof window === 'undefined') return false
  try { return localStorage.getItem(STORAGE_KEYS.POPUP_CONVERTED) === 'true' }
  catch { return false }
}

export const markUserAsConverted = (): void => {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(STORAGE_KEYS.POPUP_CONVERTED, 'true') }
  catch { /* storage disabled */ }
}

const getSessionStartTime = (): number => {
  if (typeof window === 'undefined') return Date.now()
  try {
    const stored = sessionStorage.getItem(STORAGE_KEYS.SESSION_START)
    if (stored) return Number(stored)
    const now = Date.now()
    sessionStorage.setItem(STORAGE_KEYS.SESSION_START, now.toString())
    return now
  } catch { return Date.now() }
}

export const getTimeOnSite = (): number => Date.now() - getSessionStartTime()

const trackPageVisit = (pathname: string): number => {
  if (typeof window === 'undefined') return 1
  try {
    const stored = sessionStorage.getItem(STORAGE_KEYS.PAGES_VISITED)
    const pages: string[] = stored ? JSON.parse(stored) : []
    if (!pages.includes(pathname)) {
      pages.push(pathname)
      sessionStorage.setItem(STORAGE_KEYS.PAGES_VISITED, JSON.stringify(pages))
    }
    return pages.length
  } catch { return 1 }
}

export const getPagesVisited = (): number => {
  if (typeof window === 'undefined') return 0
  try {
    const stored = sessionStorage.getItem(STORAGE_KEYS.PAGES_VISITED)
    const pages: string[] = stored ? JSON.parse(stored) : []
    return pages.length
  } catch { return 0 }
}

export const canShowPopup = (): boolean => {
  if (wasPopupShownThisSession()) return false
  if (isWithinSuppressionWindow()) return false
  if (hasUserConverted()) return false
  return true
}

export const getEngagementData = () => ({
  timeOnSite: getTimeOnSite(),
  pagesVisited: getPagesVisited(),
  isMobile: isMobileDevice(),
})

export function useEngagementTracker(onTrigger?: (triggerType: TriggerType) => void) {
  const pathname = usePathname()
  const hasTriggeredRef = useRef(false)
  const pageLoadTimeRef = useRef(Date.now())
  const rafIdRef = useRef<number | null>(null)

  const triggerPopup = useCallback((type: TriggerType) => {
    if (!POPUP_ENABLED) return
    if (hasTriggeredRef.current || !canShowPopup()) return
    hasTriggeredRef.current = true
    markPopupAsShown()
    onTrigger?.(type)
  }, [onTrigger])

  useEffect(() => {
    pageLoadTimeRef.current = Date.now()
    trackPageVisit(pathname)
  }, [pathname])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (isMobileDevice()) return
    if (!TRIGGER_THRESHOLDS.EXIT_INTENT_ENABLED) return

    const enableTimeout = setTimeout(() => {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) triggerPopup('exit_intent')
      }
      document.addEventListener('mouseleave', handleMouseLeave)
      return () => document.removeEventListener('mouseleave', handleMouseLeave)
    }, 3000)

    return () => clearTimeout(enableTimeout)
  }, [triggerPopup])

  useEffect(() => {
    if (typeof window === 'undefined') return

    let ticking = false

    const checkScrollTrigger = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollPercent = (scrollY + viewportHeight) / documentHeight
      const timeOnPage = Date.now() - pageLoadTimeRef.current

      if (
        scrollPercent >= TRIGGER_THRESHOLDS.SCROLL_DEPTH_PERCENT &&
        timeOnPage >= TRIGGER_THRESHOLDS.SCROLL_MIN_TIME_MS &&
        scrollY >= TRIGGER_THRESHOLDS.SCROLL_MIN_DISTANCE_PX
      ) {
        triggerPopup('scroll_depth')
      }
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        rafIdRef.current = requestAnimationFrame(() => {
          checkScrollTrigger()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [triggerPopup])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const fallbackTimeout = setTimeout(() => {
      const timeOnSite = getTimeOnSite()
      const pagesVisited = getPagesVisited()
      if (timeOnSite >= TRIGGER_THRESHOLDS.FALLBACK_TIME_MS && pagesVisited >= TRIGGER_THRESHOLDS.FALLBACK_MIN_PAGES) {
        triggerPopup('time_fallback')
      }
    }, TRIGGER_THRESHOLDS.FALLBACK_TIME_MS)

    return () => clearTimeout(fallbackTimeout)
  }, [triggerPopup])

  return { getEngagementData, canShowPopup }
}
