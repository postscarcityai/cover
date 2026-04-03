"use client"

import { useEffect, useRef } from "react"
import {
  dotFieldGlyphBrightness,
  generateDotField,
} from "@/lib/hero-dot-field"

interface HeroDotFieldProps {
  className?: string
}

/** RetroASCII `RetroASCII.tsx`: CHAR_WIDTH / CHAR_HEIGHT */
const CHAR_WIDTH = 6
const CHAR_HEIGHT = 10

/** Slightly faster cadence than RetroASCII 30 — smoother perceived motion */
const TARGET_FPS = 48
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS

const DPR_CAP = 2

function parseRgbFromComputed(el: Element | null): [number, number, number] {
  if (!el) return [61, 79, 107]
  const rgb = getComputedStyle(el).color
  const m = rgb.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
  if (!m) return [61, 79, 107]
  return [Number(m[1]), Number(m[2]), Number(m[3])]
}

export function HeroDotField({ className = "" }: HeroDotFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const colorProbeRef = useRef<HTMLSpanElement>(null)
  const frameRef = useRef(0)
  const rafRef = useRef(0)
  const lastPaintRef = useRef(0)

  useEffect(() => {
    const el = containerRef.current
    const canvas = canvasRef.current
    const probe = colorProbeRef.current
    if (!el || !canvas) return

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const paint = (frame: number) => {
      const rect = el.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      if (w < 1 || h < 1) return

      const cols = Math.max(1, Math.floor(w / CHAR_WIDTH))
      const rows = Math.max(1, Math.floor(h / CHAR_HEIGHT))
      const bufW = cols * CHAR_WIDTH
      const bufH = rows * CHAR_HEIGHT

      const dpr = Math.min(DPR_CAP, typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1)

      canvas.width = Math.max(1, Math.round(bufW * dpr))
      canvas.height = Math.max(1, Math.round(bufH * dpr))
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale((dpr * w) / bufW, (dpr * h) / bufH)

      ctx.clearRect(0, 0, bufW, bufH)

      const grid = generateDotField(cols, rows, frame)
      const [r, g, b] = parseRgbFromComputed(probe)

      const pulse = mq.matches
        ? 1
        : Math.sin(frame * 0.007) * 0.055 + 0.945

      ctx.font = `${CHAR_HEIGHT}px "Courier New", Courier, monospace`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ch = grid[row][col]
          if (ch === " ") continue

          const weight = dotFieldGlyphBrightness(ch) * pulse
          // Diagonal “pipe” shimmer — non-sync frequencies feel non-deterministic
          const pipe =
            Math.sin(col * 0.11 + row * 0.073 + frame * 0.13) * 0.085 + 1
          const alpha = Math.min(
            0.4,
            (0.065 + weight * 0.38) * pipe
          )

          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
          ctx.fillText(
            ch,
            col * CHAR_WIDTH + CHAR_WIDTH / 2,
            row * CHAR_HEIGHT + CHAR_HEIGHT / 2
          )
        }
      }
    }

    const stopLoop = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
      lastPaintRef.current = 0
    }

    const startLoop = () => {
      stopLoop()
      lastPaintRef.current = 0

      const step = (currentTime: number) => {
        rafRef.current = requestAnimationFrame(step)

        if (
          lastPaintRef.current !== 0 &&
          currentTime - lastPaintRef.current < FRAME_INTERVAL_MS
        ) {
          return
        }

        const prev = lastPaintRef.current
        lastPaintRef.current = currentTime
        const deltaTime = prev > 0 ? (currentTime - prev) / 16.67 : 1

        frameRef.current += deltaTime
        paint(frameRef.current)
      }

      rafRef.current = requestAnimationFrame(step)
    }

    const syncMotionPreference = () => {
      stopLoop()
      frameRef.current = 0
      paint(0)
      if (!mq.matches) startLoop()
    }

    syncMotionPreference()
    mq.addEventListener("change", syncMotionPreference)

    const ro = new ResizeObserver(() => {
      if (mq.matches) paint(0)
      else paint(frameRef.current)
    })
    ro.observe(el)

    return () => {
      stopLoop()
      ro.disconnect()
      mq.removeEventListener("change", syncMotionPreference)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <span
        ref={colorProbeRef}
        className="pointer-events-none absolute left-0 top-0 text-[0px] opacity-0"
        style={{ color: "var(--hero-dot-fg)" }}
      >
        .
      </span>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 block h-full w-full bg-transparent"
      />
    </div>
  )
}
