/**
 * Modal Utilities for Smooth Scroll Integration
 * 
 * When modals are open, smooth scrolling should be disabled to prevent
 * scroll conflicts. These utilities handle that automatically.
 */

/**
 * Disable smooth scroll when modal is open
 * Call this when opening a modal
 */
export function disableSmoothScroll() {
  if (typeof window === 'undefined') return
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden'
  
  // Add attribute to disable smooth scroller wheel events
  document.body.setAttribute('data-modal-open', 'true')
  
  // Prevent smooth wrapper from scrolling
  const smoothWrapper = document.getElementById('smooth-wrapper')
  if (smoothWrapper) {
    smoothWrapper.style.pointerEvents = 'none'
  }
}

/**
 * Re-enable smooth scroll when modal is closed
 * Call this when closing a modal
 */
export function enableSmoothScroll() {
  if (typeof window === 'undefined') return
  
  document.body.style.overflow = 'unset'
  document.body.removeAttribute('data-modal-open')
  
  const smoothWrapper = document.getElementById('smooth-wrapper')
  if (smoothWrapper) {
    smoothWrapper.style.pointerEvents = 'auto'
  }
}

/**
 * Hook for React components to manage modal state with smooth scroll
 * 
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false)
 * useModalSmoothScroll(isOpen)
 * ```
 */
export function useModalSmoothScroll(isOpen: boolean) {
  if (typeof window === 'undefined') return
  
  if (isOpen) {
    disableSmoothScroll()
  } else {
    enableSmoothScroll()
  }
  
  // Cleanup on unmount
  return () => {
    enableSmoothScroll()
  }
}

