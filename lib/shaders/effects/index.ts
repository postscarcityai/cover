import { RING_RIPPLES_FRAGMENT } from "./ring-ripples"
import { CONSTELLATION_FRAGMENT } from "./constellation"
import { PRISM_FACETS_FRAGMENT } from "./prism-facets"
import { LIGHT_RAYS_FRAGMENT } from "./light-rays"
import { VORONOI_FRAGMENT } from "./voronoi"
import { AURORA_FRAGMENT } from "./aurora"
import { TESSELLATION_FRAGMENT } from "./tessellation"

export {
  RING_RIPPLES_FRAGMENT,
  CONSTELLATION_FRAGMENT,
  PRISM_FACETS_FRAGMENT,
  LIGHT_RAYS_FRAGMENT,
  VORONOI_FRAGMENT,
  AURORA_FRAGMENT,
  TESSELLATION_FRAGMENT,
}

export type GoldEffect =
  | "ringRipples"
  | "constellation"
  | "prismFacets"
  | "lightRays"
  | "voronoi"
  | "aurora"
  | "tessellation"

export function getFragmentSource(effect: GoldEffect): string {
  switch (effect) {
    case "ringRipples":
      return RING_RIPPLES_FRAGMENT
    case "constellation":
      return CONSTELLATION_FRAGMENT
    case "prismFacets":
      return PRISM_FACETS_FRAGMENT
    case "lightRays":
      return LIGHT_RAYS_FRAGMENT
    case "voronoi":
      return VORONOI_FRAGMENT
    case "aurora":
      return AURORA_FRAGMENT
    case "tessellation":
      return TESSELLATION_FRAGMENT
  }
}
