"use client"

import { useEffect, useRef } from "react"
import {
  dotFieldGlyphBrightness,
  generateDotField,
} from "@/lib/hero-dot-field"

interface HeroDotFieldProps {
  className?: string
}

const CHAR_WIDTH = 6
const CHAR_HEIGHT = 10

const TARGET_FPS = 24
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS

const DPR_CAP = 2

/** All glyphs used by the dot field — pre-render once into an atlas. */
const GLYPHS = ["·", "•", "◦", "-", "○", "░"] as const

function parseRgbFromComputed(el: Element | null): [number, number, number] {
  if (!el) return [61, 79, 107]
  const rgb = getComputedStyle(el).color
  const m = rgb.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
  if (!m) return [61, 79, 107]
  return [Number(m[1]), Number(m[2]), Number(m[3])]
}

/**
 * Build a tiny offscreen canvas with every glyph pre-rendered at several
 * alpha levels so the hot loop can use drawImage() instead of fillText().
 *
 * Atlas layout: columns = glyphs, rows = alpha buckets (0–7).
 */
const ALPHA_BUCKETS = 8

function buildGlyphAtlas(
  r: number,
  g: number,
  b: number,
  dpr: number,
): { canvas: OffscreenCanvas | HTMLCanvasElement; cellW: number; cellH: number } {
  const cellW = Math.ceil(CHAR_WIDTH * dpr)
  const cellH = Math.ceil(CHAR_HEIGHT * dpr)
  const atlasW = GLYPHS.length * cellW
  const atlasH = ALPHA_BUCKETS * cellH

  const useOffscreen = typeof OffscreenCanvas !== "undefined"
  const atlas = useOffscreen
    ? new OffscreenCanvas(atlasW, atlasH)
    : document.createElement("canvas")

  if (!useOffscreen) {
    ;(atlas as HTMLCanvasElement).width = atlasW
    ;(atlas as HTMLCanvasElement).height = atlasH
  }

  const ctx = atlas.getContext("2d") as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  if (!ctx) return { canvas: atlas, cellW, cellH }

  ctx.font = `${CHAR_HEIGHT * dpr}px "Courier New", Courier, monospace`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  for (let gi = 0; gi < GLYPHS.length; gi++) {
    const ch = GLYPHS[gi]
    for (let ai = 0; ai < ALPHA_BUCKETS; ai++) {
      const alpha = (ai + 1) / ALPHA_BUCKETS * 0.4 // max alpha 0.4
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
      ctx.fillText(ch, gi * cellW + cellW / 2, ai * cellH + cellH / 2)
    }
  }

  return { canvas: atlas, cellW, cellH }
}

/** Map glyph char to atlas column index */
const GLYPH_INDEX: Record<string, number> = {}
GLYPHS.forEach((ch, i) => { GLYPH_INDEX[ch] = i })

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

    // Track dimensions — only resize on actual change
    let currentW = 0
    let currentH = 0
    let cols = 0
    let rows = 0
    let dpr = Math.min(DPR_CAP, window.devicePixelRatio || 1)

    // Build glyph atlas (rebuilt on color/resize change)
    const [r, g, b] = parseRgbFromComputed(probe)
    let atlas = buildGlyphAtlas(r, g, b, dpr)

    const resize = () => {
      const rect = el.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      if (w < 1 || h < 1) return

      // Skip if nothing changed
      if (Math.abs(w - currentW) < 1 && Math.abs(h - currentH) < 1) return

      currentW = w
      currentH = h
      cols = Math.max(1, Math.floor(w / CHAR_WIDTH))
      rows = Math.max(1, Math.floor(h / CHAR_HEIGHT))
      const bufW = cols * CHAR_WIDTH
      const bufH = rows * CHAR_HEIGHT

      dpr = Math.min(DPR_CAP, window.devicePixelRatio || 1)
      canvas.width = Math.max(1, Math.round(bufW * dpr))
      canvas.height = Math.max(1, Math.round(bufH * dpr))
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      // Rebuild atlas at new DPR
      atlas = buildGlyphAtlas(r, g, b, dpr)
    }

    resize()

    const paint = (frame: number) => {
      if (cols < 1 || rows < 1) return

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const grid = generateDotField(cols, rows, frame)
      const pulse = mq.matches
        ? 1
        : Math.sin(frame * 0.008) * 0.025 + 0.975

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ch = grid[row][col]
          if (ch === " ") continue

          const gi = GLYPH_INDEX[ch]
          if (gi === undefined) continue

          const weight = dotFieldGlyphBrightness(ch) * pulse
          const pipe =
            Math.sin(col * 0.11 + row * 0.073 + frame * 0.015) * 0.04 + 1
          const alpha = Math.min(0.4, (0.065 + weight * 0.38) * pipe)

          // Map alpha to bucket index
          const ai = Math.min(
            ALPHA_BUCKETS - 1,
            Math.max(0, Math.round((alpha / 0.4) * (ALPHA_BUCKETS - 1)))
          )

          ctx.drawImage(
            atlas.canvas,
            gi * atlas.cellW,
            ai * atlas.cellH,
            atlas.cellW,
            atlas.cellH,
            col * CHAR_WIDTH * dpr,
            row * CHAR_HEIGHT * dpr,
            atlas.cellW,
            atlas.cellH,
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
      resize()
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
