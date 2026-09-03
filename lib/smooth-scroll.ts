/**
 * Live Lenis registry.
 *
 * `components/smooth-scroll-provider.tsx` publishes the active Lenis instance
 * here on mount and clears it on unmount. Consumers read it synchronously and
 * fall back to native scrolling when it is null — which is the case on the
 * server, before the provider mounts, when the `smoothScroll` feature flag is
 * off, and under prefers-reduced-motion.
 *
 * Note that unlike a transform-based smoother, Lenis interpolates the *real*
 * document scroll position. `window.scrollY`, the native `scroll` event,
 * anchor links, find-in-page, keyboard paging and focus scrolling all stay
 * accurate on their own. So code that only needs to *read* scroll position
 * should use `window.scrollY` directly and never touch this registry — it
 * exists only for the handful of places that need to *command* the scroller,
 * i.e. modal locking and programmatic scrollTo.
 */

/** The subset of the Lenis API this app relies on. */
export interface LenisInstance {
  stop(): void
  start(): void
  scrollTo(
    target: string | number | HTMLElement,
    options?: Record<string, unknown>
  ): void
}

let instance: LenisInstance | null = null

export function setLenis(lenis: LenisInstance | null) {
  instance = lenis
}

export function getLenis(): LenisInstance | null {
  return instance
}
