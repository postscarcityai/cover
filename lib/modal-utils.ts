"use client"

/**
 * Modal scroll locking.
 *
 * Under Lenis a lock is just `lenis.stop()` — it owns the scroll loop, so
 * telling it to stop is enough, and it restores the exact position on start()
 * without the scroll-jump that `position: fixed` body-lock tricks cause.
 *
 * `overflow: hidden` on <body> stays as the fallback for every case where the
 * scroller isn't running: the `smoothScroll` feature flag off,
 * prefers-reduced-motion, or a modal opened before the provider mounts.
 */

import { useEffect } from 'react'
import { getLenis } from '@/lib/smooth-scroll'

/**
 * Disable scrolling when a modal is open.
 * Call this when opening a modal.
 */
export function disableSmoothScroll() {
  if (typeof window === 'undefined') return

  getLenis()?.stop()

  // Fallback for when Lenis isn't running (flag off, reduced motion).
  document.body.style.overflow = 'hidden'

  // Kept for consumers and CSS that key off the open state.
  document.body.setAttribute('data-modal-open', 'true')
}

/**
 * Re-enable scrolling when a modal closes.
 * Call this when closing a modal.
 */
export function enableSmoothScroll() {
  if (typeof window === 'undefined') return

  // Empty string, not 'unset' — this restores whatever the stylesheet says
  // rather than hard-setting the CSS-wide `unset` keyword inline.
  document.body.style.overflow = ''
  document.body.removeAttribute('data-modal-open')

  getLenis()?.start()
}

/**
 * Hook for React components to lock scrolling while a modal is open.
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false)
 * useModalSmoothScroll(isOpen)
 * ```
 */
export function useModalSmoothScroll(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return

    disableSmoothScroll()
    return () => enableSmoothScroll()
  }, [isOpen])
}
