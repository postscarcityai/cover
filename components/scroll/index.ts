/**
 * Scroll-video system — public surface.
 *
 * Nothing here should end up in the initial bundle. Import these through
 * `next/dynamic` from page/section code, the way `section-renderer.tsx`
 * already does for its heavier sections.
 */

export { ScrubVideo } from "./scrub-video"
export type { ScrubVideoHandle, ScrubVideoProps, ScrubVideoSources } from "./scrub-video"

export { useScrubProgress } from "./use-scrub-progress"
export type { UseScrubProgressOptions, ScrubProgressState } from "./use-scrub-progress"

// Pattern catalog
export { StickyStack } from "./sticky-stack" // 03
export { ClipReveal } from "./clip-reveal" // 02 + 07
export { HorizontalPanels } from "./horizontal-panels" // 05
export { VelocityLayers } from "./velocity-layers" // 08
export { DepthParallax } from "./depth-parallax" // 09
export { FixedVideoUnderlay } from "./fixed-video-underlay" // 04
export { VideoAsType } from "./video-as-type" // 06

export type { StickyStackProps } from "./sticky-stack"
export type { ClipRevealProps } from "./clip-reveal"
export type { HorizontalPanelsProps } from "./horizontal-panels"
export type { VelocityLayersProps } from "./velocity-layers"
export type { DepthParallaxProps, DepthLayer } from "./depth-parallax"
export type { FixedVideoUnderlayProps } from "./fixed-video-underlay"
export type { VideoAsTypeProps } from "./video-as-type"
