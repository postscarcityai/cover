/**
 * Manifest of generated hero/backdrop imagery (scripts/generate-images.mjs).
 * Paths point at the committed style-guide output; slugs match the `hero` and
 * `backdrops` groups in scripts/image-style.config.mjs, so regenerating
 * overwrites in place — no rewiring needed.
 */

/** Homepage hero slideshow rotation (hero-2col-section backgroundImages). */
export const heroRotation = [
  "/img/style-guide/hero/hero-01-black-woman.jpg",
  "/img/style-guide/hero/hero-02-white-man.jpg",
  "/img/style-guide/hero/hero-03-latina-woman.jpg",
]

/** Full-section backdrops for components/section-backdrop.tsx. */
export const sectionBackdrops = {
  field: "/img/style-guide/backdrops/backdrop-field.jpg",
  closingCta: "/img/style-guide/backdrops/backdrop-closing-cta.jpg",
}

/** Dark text-safe washes. */
export const darkBackgrounds = {
  vertical: "/img/style-guide/bg-dark/bg-vertical.jpg",
  drift: "/img/style-guide/bg-dark/bg-drift.jpg",
}
