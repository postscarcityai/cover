/**
 * Pattern overlay compositor.
 *
 * A generative model cannot draw a mathematically regular pattern (hex
 * lattice, dot grid, wave lines), so we generate the image on a CLEAN,
 * pattern-free field and bake the pattern in here instead — a true SVG tiling
 * that is pixel-perfect every time.
 *
 * The pattern is masked two ways so it reads as part of the artwork, not a
 * sticker:
 *   1. by the SUBJECT cutout — the pattern stays strictly in the background
 *      and pulls clear of the person (falls back to a darkness map).
 *   2. by a directional FADE — kept clear over the negative space reserved
 *      for the headline, strongest behind the subject.
 *
 * Patterns are pluggable: PATTERNS maps a name to an SVG-element generator.
 * Add a new shape by adding one entry — the masking/compositing machinery is
 * shared. Defaults come from IMAGE_STYLE.overlay (scripts/image-style.config.mjs);
 * re-running the generator without --force re-composites for free.
 */
import sharp from "sharp"
import { IMAGE_STYLE } from "./image-style.config.mjs"

export const OVERLAY = {
  pattern: IMAGE_STYLE.overlay.pattern, // key into PATTERNS
  cellDiv: 120, // pattern cell radius = round(width / cellDiv). Higher = smaller, tighter.
  stroke: IMAGE_STYLE.overlay.stroke,
  strokeWidth: 1.1,
  opacity: IMAGE_STYLE.overlay.opacity, // overall strength (0..1)
  growDiv: 150, // subject grow/feather radius = round(width / growDiv); lower = wider clean margin
  growGain: 3.0, // >1 dilates the silhouette so the pattern pulls clear of the person
  blur: 220, // fallback darkness-mask softness (only when no subjectMask is supplied)
  // directional visibility of the pattern (x fraction, 0..1 strength);
  // default keeps the left headline zone clear, strongest behind the subject.
  fade: [
    [0.0, 0.0],
    [0.32, 0.0],
    [0.62, 0.6],
    [1.0, 0.9],
  ],
}

/** Even fade for centered subjects (no headline zone to protect). */
export const FADE_EVEN = [
  [0.0, 0.85],
  [0.5, 0.6],
  [1.0, 0.85],
]

// ── Pattern generators ────────────────────────────────────────────────────
// Each returns SVG element markup covering W×H, drawn in white; the alpha
// channel of the render becomes the pattern mask. R is the cell radius.

// A single <path> tiling perfect flat-top hexagons.
function hexPattern(W, H, R, strokeWidth) {
  const dx = R * 1.5
  const dy = R * Math.sqrt(3)
  const verts = []
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i)
    verts.push([Math.cos(a) * R, Math.sin(a) * R])
  }
  let d = ""
  let col = 0
  for (let x = -2 * R; x <= W + 2 * R; x += dx, col++) {
    const offY = col % 2 ? dy / 2 : 0
    for (let y = -2 * R + offY; y <= H + 2 * R; y += dy) {
      const p = verts.map(([vx, vy]) => `${(x + vx).toFixed(2)},${(y + vy).toFixed(2)}`)
      d += `M${p[0]}L${p.slice(1).join("L")}Z`
    }
  }
  return `<path d="${d}" fill="none" stroke="#ffffff" stroke-width="${strokeWidth}"/>`
}

// A staggered grid of small filled dots on the same lattice spacing.
function dotsPattern(W, H, R) {
  const dx = R * 1.5
  const dy = R * Math.sqrt(3)
  const r = Math.max(0.8, R * 0.16)
  let els = ""
  let col = 0
  for (let x = -2 * R; x <= W + 2 * R; x += dx, col++) {
    const offY = col % 2 ? dy / 2 : 0
    for (let y = -2 * R + offY; y <= H + 2 * R; y += dy) {
      els += `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${r.toFixed(2)}" fill="#ffffff"/>`
    }
  }
  return els
}

// Horizontal sine wave lines stacked down the frame.
function wavesPattern(W, H, R, strokeWidth) {
  const wavelength = R * 6
  const amplitude = R * 0.55
  const spacing = R * Math.sqrt(3)
  const step = wavelength / 16
  let els = ""
  for (let y = -spacing; y <= H + spacing; y += spacing) {
    let d = ""
    for (let x = -wavelength; x <= W + wavelength; x += step) {
      const yy = y + Math.sin((x / wavelength) * Math.PI * 2) * amplitude
      d += d ? `L${x.toFixed(2)},${yy.toFixed(2)}` : `M${x.toFixed(2)},${yy.toFixed(2)}`
    }
    els += `<path d="${d}" fill="none" stroke="#ffffff" stroke-width="${strokeWidth}"/>`
  }
  return els
}

export const PATTERNS = {
  hex: hexPattern,
  dots: dotsPattern,
  waves: wavesPattern,
}

function hexToRgb(hex) {
  const h = hex.replace("#", "")
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

/**
 * Composite a perfect repeating pattern onto a clean (pattern-free) base JPEG
 * buffer. Returns a JPEG buffer. Pass a partial `opts` to override OVERLAY
 * defaults; `opts.pattern` picks the shape, `opts.subjectMask` (greyscale
 * alpha, white = subject) keeps the pattern off the person.
 */
export async function compositePattern(baseBuf, opts = {}) {
  const cfg = { ...OVERLAY, ...opts }
  const draw = PATTERNS[cfg.pattern]
  if (!draw) throw new Error(`unknown overlay pattern "${cfg.pattern}" — add it to PATTERNS`)

  const meta = await sharp(baseBuf).metadata()
  const W = meta.width
  const H = meta.height
  const R = Math.max(8, Math.round(W / cfg.cellDiv))

  // 1. Pattern layer (transparent bg) → alpha = where the marks are.
  const patternSvg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${draw(
    W,
    H,
    R,
    cfg.strokeWidth,
  )}</svg>`
  const patternAlpha = await sharp(Buffer.from(patternSvg)).extractChannel(3).png().toBuffer()

  // 2. Coverage map — where the pattern is allowed (white = show). Prefer a
  //    TRUE subject cutout; fall back to a luminance darkness map.
  let coverage
  if (opts.subjectMask) {
    coverage = await sharp(opts.subjectMask)
      .resize(W, H)
      .greyscale()
      .blur(Math.max(1, Math.round(W / cfg.growDiv)))
      .linear(cfg.growGain, 0)
      .negate()
      .png()
      .toBuffer()
  } else {
    coverage = await sharp(baseBuf)
      .greyscale()
      .negate()
      .blur(Math.max(1, Math.round(W / cfg.blur)))
      .png()
      .toBuffer()
  }

  // 3. Directional fade — keep the headline space clear.
  const stops = cfg.fade
    .map(([o, v]) => {
      const c = Math.round(v * 255)
      return `<stop offset="${o}" stop-color="rgb(${c},${c},${c})"/>`
    })
    .join("")
  const fadeSvg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0">${stops}</linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/></svg>`
  const fadeMap = await sharp(Buffer.from(fadeSvg)).greyscale().png().toBuffer()

  // 4. Final alpha = patternAlpha × coverage × fadeMap × opacity.
  const alpha = await sharp(patternAlpha)
    .composite([
      { input: coverage, blend: "multiply" },
      { input: fadeMap, blend: "multiply" },
    ])
    .linear(cfg.opacity, 0)
    .toColourspace("b-w")
    .png()
    .toBuffer()

  // 5. Tint a solid color image with that alpha, composite over the base.
  const { r, g, b } = hexToRgb(cfg.stroke)
  const patternLayer = await sharp({
    create: { width: W, height: H, channels: 3, background: { r, g, b } },
  })
    .joinChannel(alpha)
    .png()
    .toBuffer()

  return sharp(baseBuf)
    .composite([{ input: patternLayer, blend: "over" }])
    .jpeg({ quality: 90 })
    .toBuffer()
}
