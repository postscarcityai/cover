import {
  SHAPE_CIRCLE,
  SHAPE_METABALL2,
  SHAPE_METABALL3,
  SHAPE_MORPH_QUAD,
  SHAPE_RECT,
  SHAPE_REPEAT_LATTICE,
  SHAPE_SEGMENT,
  SHAPE_STRIPE,
  SHAPE_TRIANGLE,
} from "./shape-kinds"

export type GoldPaintShape =
  | {
      kind: "triangle"
      a: readonly [number, number]
      b: readonly [number, number]
      c: readonly [number, number]
      round?: number
    }
  | {
      kind: "circle"
      center: readonly [number, number]
      radius: number
    }
  | {
      kind: "rect"
      center: readonly [number, number]
      halfExtents: readonly [number, number]
      rotation?: number
      round?: number
    }
  | {
      kind: "segment"
      a: readonly [number, number]
      b: readonly [number, number]
      thickness: number
    }
  | {
      kind: "stripe"
      direction: readonly [number, number]
      period: number
      halfWidth: number
      phase?: number
    }
  | {
      kind: "metaball2"
      c1: readonly [number, number]
      r1: number
      c2: readonly [number, number]
      r2: number
      blend?: number
    }
  | {
      kind: "metaball3"
      c1: readonly [number, number]
      r1: number
      c2: readonly [number, number]
      r2: number
      c3: readonly [number, number]
      r3: number
      blend?: number
    }
  | {
      kind: "morphQuad"
      center: readonly [number, number]
      halfExtents: readonly [number, number]
      /** Rotation in radians (0 = axis-aligned, straight up/down). */
      tilt?: number
      round?: number
      /** Full loop per ~1/speed seconds (default ~0.09 ≈ 11s). */
      cycleSpeed?: number
    }
  | {
      /** Infinite grid of rounded-rect motifs (all-over pattern). */
      kind: "repeatLattice"
      /** Cell size in `pos` space (smaller = denser). */
      period: readonly [number, number]
      /** Motif half-size as fraction of each cell half-axis (0–1). */
      motif: readonly [number, number]
      round?: number
      /** Wandering translation strength (0 = static). */
      drift?: number
      /** Brick offset: alternate rows shift by this fraction of `period.x`. */
      stagger?: number
      /** Whole lattice rotation (radians). */
      rotation?: number
      /** Second layer at half-cell offset + soft union (richer weave). */
      dualLayer?: boolean
      /** `smin` blend between layers; fraction of min(period). */
      dualBlend?: number
      /** Secondary motif scale vs primary (0–1). */
      dualMotifScale?: number
    }

export type GoldPaintPreset = "heroTriangle" | "subpagePolygon"

export interface GoldPaintRuntimeOptions {
  /** pos = posScale * uv + posOffset (uv from centered frag coords / width). */
  posScale?: number
  posOffset?: readonly [number, number]
  /** SDF → d mapping: d = max(1.0 + sdf * glowScale, glowMin). */
  glowScale?: number
  glowMin?: number
  /** Band mask smoothsteps: inner depth, edge center, outer fade (SDF units). */
  band?: readonly [number, number, number]
  /** 0 = off; 1 = full hero-style softening toward +y (open top). */
  verticalFadeStrength?: number
}

/** `x` = Gaussian rim sharpness in `exp(-sdf² * x)` (higher = tighter gold line). */
const defaultBand: readonly [number, number, number] = [34.0, 0, 0]

export const GOLD_PAINT_PRESETS: Record<
  GoldPaintPreset,
  { shape: GoldPaintShape; options?: GoldPaintRuntimeOptions }
> = {
  heroTriangle: {
    shape: {
      kind: "triangle",
      a: [0, -1.12],
      b: [-1.22, 0.62],
      c: [1.22, 0.62],
      round: 0.055,
    },
    options: {
      posScale: 4,
      glowScale: 2.85,
      band: defaultBand,
      verticalFadeStrength: 0.92,
    },
  },
  /** All-over lattice of gold motifs (staggered + dual weave + slow drift). */
  subpagePolygon: {
    shape: {
      kind: "repeatLattice",
      period: [0.36, 0.4],
      motif: [0.34, 0.34],
      round: 0.042,
      drift: 0.14,
      stagger: 0.5,
      rotation: 0.19635,
      dualLayer: true,
      dualBlend: 0.14,
      dualMotifScale: 0.86,
    },
    options: {
      posScale: 4.2,
      posOffset: [0.04, 0.03],
      glowScale: 2.75,
      band: [26.0, 0, 0],
      verticalFadeStrength: 0.38,
    },
  },
}

export function shapeKindForShape(shape: GoldPaintShape): number {
  switch (shape.kind) {
    case "triangle":
      return SHAPE_TRIANGLE
    case "circle":
      return SHAPE_CIRCLE
    case "rect":
      return SHAPE_RECT
    case "segment":
      return SHAPE_SEGMENT
    case "stripe":
      return SHAPE_STRIPE
    case "metaball2":
      return SHAPE_METABALL2
    case "metaball3":
      return SHAPE_METABALL3
    case "morphQuad":
      return SHAPE_MORPH_QUAD
    case "repeatLattice":
      return SHAPE_REPEAT_LATTICE
    default: {
      const _x: never = shape
      return _x
    }
  }
}
