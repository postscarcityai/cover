"use client"

import { createPortal } from "react-dom"
import {
  useCallback,
  useEffect,
  useState,
  type RefObject,
} from "react"
import { GoldDropCanvas } from "@/components/gold-drop-canvas"

/**
 * Front gold layer: transparent WebGL, centered on the section boundary.
 *
 * Portaled to document.body + position:fixed so it is NOT clipped by
 * #smooth-wrapper { overflow: hidden } and stacks above hero + section paint.
 * z-[52] is below the fixed nav (z-60) but above page content.
 */
const SEAM_OVERLAY_CONFIG = {
  opaqueBackground: false as const,
  intensity: 0.9,
  speed: 1.0,
  ribbonBandCenter: 0.0,
  ribbonBandHalfHeight: 0.06,
  geometryScale: 4.6,
  waveHorizontalScale: 0.34,
}

/** ~11rem — keep in sync with Tailwind h-[11rem] on canvas host */
const OVERLAY_HEIGHT_PX = 176

export function HeroGoldSeamOverlay({
  anchorRef,
}: {
  anchorRef: RefObject<HTMLElement | null>
}) {
  const [mounted, setMounted] = useState(false)
  const [topPx, setTopPx] = useState(0)

  const updatePosition = useCallback(() => {
    const el = anchorRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const next = r.top - OVERLAY_HEIGHT_PX / 2
    setTopPx((prev) => (Math.abs(prev - next) < 0.5 ? prev : next))
  }, [anchorRef])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    updatePosition()
    const el = anchorRef.current
    const ro = el ? new ResizeObserver(updatePosition) : null
    if (el && ro) ro.observe(el)

    const onScroll = () => updatePosition()
    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", onScroll, true)
    window.addEventListener("smoothscroll", onScroll as EventListener)

    // ScrollSmoother moves content with transforms; keep overlay pinned to the seam.
    let rafStopped = false
    const loop = () => {
      if (rafStopped) return
      updatePosition()
      requestAnimationFrame(loop)
    }
    const raf0 = requestAnimationFrame(loop)

    return () => {
      rafStopped = true
      cancelAnimationFrame(raf0)
      ro?.disconnect()
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", onScroll, true)
      window.removeEventListener("smoothscroll", onScroll as EventListener)
    }
  }, [mounted, anchorRef, updatePosition])

  if (!mounted || typeof document === "undefined") return null

  return createPortal(
    <div
      className="pointer-events-none fixed left-0 z-[52] w-screen max-w-[100vw]"
      style={{
        top: topPx,
        height: OVERLAY_HEIGHT_PX,
      }}
      aria-hidden
    >
      <GoldDropCanvas config={SEAM_OVERLAY_CONFIG} />
    </div>,
    document.body,
  )
}
