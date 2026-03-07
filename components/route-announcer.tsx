'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Announces route changes to screen readers for SPA navigation.
 * WCAG 2.1 Success Criterion 4.1.3: Status Messages (Level AA)
 */
export function RouteAnnouncer() {
  const pathname = usePathname()
  const previousPathname = useRef<string | null>(null)
  const announcementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (previousPathname.current === null) {
      previousPathname.current = pathname
      return
    }

    if (previousPathname.current === pathname) {
      return
    }

    const announcePageChange = () => {
      const pageTitle = document.title

      if (announcementRef.current) {
        announcementRef.current.textContent = `Navigated to ${pageTitle}`

        setTimeout(() => {
          if (announcementRef.current) {
            announcementRef.current.textContent = ''
          }
        }, 3000)
      }
    }

    setTimeout(announcePageChange, 100)
    previousPathname.current = pathname
  }, [pathname])

  return (
    <div
      ref={announcementRef}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    />
  )
}
