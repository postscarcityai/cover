import type { GoldPaintRuntimeOptions, GoldPaintShape } from "./types"

export interface GoldUniformVectors {
  q0: [number, number, number, number]
  q1: [number, number, number, number]
  q2: [number, number, number, number]
  q3: [number, number, number, number]
}

const ZERO4: GoldUniformVectors["q0"] = [0, 0, 0, 0]

export function shapeToUniformVectors(shape: GoldPaintShape): GoldUniformVectors {
  switch (shape.kind) {
    case "triangle":
      return {
        q0: [shape.a[0], shape.a[1], shape.b[0], shape.b[1]],
        q1: [shape.c[0], shape.c[1], shape.round ?? 0.055, 0],
        q2: ZERO4,
        q3: ZERO4,
      }
    case "circle":
      return {
        q0: [shape.center[0], shape.center[1], shape.radius, 0],
        q1: ZERO4,
        q2: ZERO4,
        q3: ZERO4,
      }
    case "rect":
      return {
        q0: [shape.center[0], shape.center[1], shape.halfExtents[0], shape.halfExtents[1]],
        q1: [shape.rotation ?? 0, shape.round ?? 0, 0, 0],
        q2: ZERO4,
        q3: ZERO4,
      }
    case "segment":
      return {
        q0: [shape.a[0], shape.a[1], shape.b[0], shape.b[1]],
        q1: [shape.thickness * 0.5, 0, 0, 0],
        q2: ZERO4,
        q3: ZERO4,
      }
    case "stripe":
      return {
        q0: [shape.direction[0], shape.direction[1], shape.period, shape.halfWidth],
        q1: [shape.phase ?? 0, 0, 0, 0],
        q2: ZERO4,
        q3: ZERO4,
      }
    case "metaball2":
      return {
        q0: [shape.c1[0], shape.c1[1], shape.r1, shape.c2[0]],
        q1: [shape.c2[1], shape.r2, shape.blend ?? 0.22, 0],
        q2: ZERO4,
        q3: ZERO4,
      }
    case "metaball3":
      return {
        q0: [shape.c1[0], shape.c1[1], shape.r1, shape.c2[0]],
        q1: [shape.c2[1], shape.r2, shape.c3[0], shape.c3[1]],
        q2: [shape.r3, shape.blend ?? 0.2, 0, 0],
        q3: ZERO4,
      }
    case "morphQuad":
      return {
        q0: [shape.center[0], shape.center[1], shape.halfExtents[0], shape.halfExtents[1]],
        q1: [shape.tilt ?? 0, shape.round ?? 0.055, shape.cycleSpeed ?? 0.088, 0],
        q2: ZERO4,
        q3: ZERO4,
      }
    case "repeatLattice":
      return {
        q0: [shape.period[0], shape.period[1], shape.motif[0], shape.motif[1]],
        q1: [
          shape.round ?? 0.04,
          shape.drift ?? 0.1,
          shape.stagger ?? 0.5,
          shape.rotation ?? 0,
        ],
        q2: [
          shape.dualLayer !== false ? 1 : 0,
          shape.dualBlend ?? 0.12,
          shape.dualMotifScale ?? 0.88,
          0,
        ],
        q3: ZERO4,
      }
    default: {
      const _e: never = shape
      return _e
    }
  }
}

export function mergeRuntimeDefaults(
  options: GoldPaintRuntimeOptions | undefined
): Required<GoldPaintRuntimeOptions> {
  return {
    posScale: options?.posScale ?? 4,
    posOffset: options?.posOffset ?? [0, 0],
    glowScale: options?.glowScale ?? 2.85,
    glowMin: options?.glowMin ?? 0.012,
    band: options?.band ?? [0.14, 0.028, 0.2],
    verticalFadeStrength: options?.verticalFadeStrength ?? 0,
  }
}
