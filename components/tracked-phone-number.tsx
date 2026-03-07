"use client"

import { useEffect, useRef, useCallback } from "react"
import { trackEvent } from "@/lib/analytics"

interface TrackedPhoneNumberProps {
  source: string
  children: React.ReactNode
}

const viewedSources = new Set<string>()

export function TrackedPhoneNumber({ source, children }: TrackedPhoneNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !viewedSources.has(source)) {
        viewedSources.add(source)
        trackEvent('phone_number_viewed', { source })
      }
    })
  }, [source])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    })

    observer.observe(element)
    return () => observer.disconnect()
  }, [handleIntersection])

  return <span ref={ref}>{children}</span>
}
