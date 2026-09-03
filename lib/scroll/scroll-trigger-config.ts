/**
 * One-time global ScrollTrigger setup for the scroll-video system.
 *
 * Everything here is a fix for a specific failure mode documented in
 * docs/research/scroll-scrub-video.md §5.
 *
 * gsap and ScrollTrigger are imported *statically*, deliberately. An earlier
 * revision loaded them with `await import("gsap")` to keep them out of the
 * bundle — but every consumer of this module is already behind a
 * `dynamic(..., { ssr: false })` boundary, so the code splitting was redundant,
 * and in a production build the dynamic specifiers resolved to a different
 * module instance than the one `@gsap/react`'s `useGSAP` holds. Two gsap
 * instances means the plugin is registered on one and used through the other,
 * which fails only in the production bundle and with an unreadable minified
 * error. One static import, one instance.
 */

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

let initialised = false

export function initScrollTriggerConfig(): void {
  if (initialised || typeof window === "undefined") return
  initialised = true

  gsap.registerPlugin(ScrollTrigger)

  ScrollTrigger.config({
    // The mobile address bar showing/hiding resizes the viewport, which makes
    // ScrollTrigger recalculate and pinned sections visibly jump. Ignoring the
    // resize is the lesser evil: the alternative is a pin that lurches every
    // time the user flicks. Design so a ~60px viewport change doesn't matter
    // and use `dvh` units rather than fighting this.
    ignoreMobileResize: true,
  })

  // Fonts land *after* ScrollTrigger computes start/end, so a pinned section
  // measured against fallback metrics ends up with the wrong scroll range —
  // the pin releases early or late by exactly the reflow delta.
  if (typeof document !== "undefined" && document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh())
  }
}

/**
 * Defaults every scrub trigger in this system should carry.
 *
 * - `anticipatePin: 1` — kills the one-frame flash of unpinned content when
 *   the user arrives at a pin at speed.
 * - `invalidateOnRefresh` — recompute cached start values on resize instead of
 *   scaling stale ones.
 * - `fastScrollEnd` — force a scrub timeline to complete when the user rockets
 *   past, rather than leaving it stranded mid-animation.
 */
export const SCRUB_TRIGGER_DEFAULTS = {
  anticipatePin: 1,
  invalidateOnRefresh: true,
  fastScrollEnd: true,
} as const

export { gsap, ScrollTrigger }
