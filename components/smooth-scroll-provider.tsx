"use client"

import { useEffect, useState, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { ReactLenis, useLenis } from "lenis/react"
import { setLenis } from "@/lib/smooth-scroll"

/**
 * Lenis smooth scrolling.
 *
 * Lenis interpolates the real document scroll position rather than
 * translating a fixed wrapper, so this component renders no DOM of its own.
 * There is no `#smooth-wrapper` / `#smooth-content` pair, and no transform to
 * create a containing block — which means `position: fixed` descendants
 * (the nav), `window.scrollY`, anchor links, find-in-page, keyboard paging
 * and tab-to-offscreen-element all keep working natively.
 */
interface SmoothScrollProviderProps {
  children: ReactNode
  /**
   * Interpolation factor applied per frame. Lower = more momentum / more
   * float; 1 is effectively native. Useful range is roughly 0.05–0.2.
   */
  lerp?: number
}

export function SmoothScrollProvider({
  children,
  lerp = 0.1,
}: SmoothScrollProviderProps) {
  const [reducedMotion, setReducedMotion] = useState(false)

  // Honour prefers-reduced-motion, and keep honouring it if the setting is
  // flipped while the page is open. Starting at `false` matches the server
  // render; ReactLenis emits no markup either way, so the correction on mount
  // can't cause a hydration mismatch.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReducedMotion(query.matches)
    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [])

  return (
    <ReactLenis
      root
      options={{
        lerp,
        smoothWheel: !reducedMotion,
        // Touch is left alone on purpose. Native iOS/Android momentum and
        // rubber-banding are better than anything we can interpolate, and
        // smoothing them costs the platform physics while feeling laggy
        // under the finger. This is also Lenis's own default.
        syncTouch: false,
      }}
    >
      <LenisBridge />
      {children}
    </ReactLenis>
  )
}

/**
 * Wires the live Lenis instance into the rest of the app.
 *
 * This has to be a child of <ReactLenis>, not the provider itself. ReactLenis
 * holds its instance in `useState` and only exposes it after the effect that
 * constructs it has run, so a parent reading `ref.current.lenis` during its
 * own first effect gets `undefined` — permanently, if it captures the value.
 * `useLenis()` subscribes to the store instead and re-runs when the instance
 * actually appears.
 */
function LenisBridge() {
  const lenis = useLenis()
  const pathname = usePathname()

  // Publish for the few consumers that need to *command* the scroller —
  // modal locking, programmatic scrollTo. See lib/smooth-scroll.ts.
  useEffect(() => {
    setLenis(lenis ?? null)
    return () => setLenis(null)
  }, [lenis])

  // Keep ScrollTrigger in step with Lenis.
  //
  // ScrollTrigger is live in components/scroll-reveal.tsx and
  // lib/engagement-tracker.ts. Lenis fires `scroll` synchronously right after
  // it applies each frame's position, so updating ScrollTrigger from that
  // event guarantees it reads a fresh scroll position in the same frame
  // rather than one frame stale.
  //
  // The alternative recipe — autoRaf:false plus gsap.ticker.add(lenis.raf) —
  // additionally unifies GSAP's tween loop with Lenis's. It is deliberately
  // NOT used here: it makes the page's ability to scroll at all depend on an
  // async import resolving, so a slow or failed GSAP chunk leaves the wheel
  // dead. Correct ordering is what actually matters, and the scroll listener
  // already provides it.
  //
  // lagSmoothing(0) stops GSAP from clamping large frame deltas, which would
  // otherwise let the two drift apart after a stall.
  useEffect(() => {
    if (!lenis) return

    let cancelled = false
    let detach: (() => void) | null = null

    void (async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")
        if (cancelled) return

        gsap.registerPlugin(ScrollTrigger)
        lenis.on("scroll", ScrollTrigger.update)
        gsap.ticker.lagSmoothing(0)

        detach = () => {
          lenis.off("scroll", ScrollTrigger.update)
          gsap.ticker.lagSmoothing(500, 33) // GSAP's defaults
        }
      } catch {
        // GSAP missing or chunk failed to load. Scrolling is unaffected —
        // Lenis drives its own rAF loop — so there is nothing to recover.
        console.warn("[smooth-scroll] GSAP unavailable; ScrollTrigger not synced")
      }
    })()

    return () => {
      cancelled = true
      detach?.()
    }
  }, [lenis])

  // Land at the top on route change. Skipped when the URL carries a hash so
  // that deep links like /services#pricing still reach their target, and
  // `immediate` so the new page doesn't animate a full-height scroll.
  useEffect(() => {
    if (!lenis) return
    if (window.location.hash) return
    lenis.scrollTo(0, { immediate: true })
  }, [lenis, pathname])

  return null
}
