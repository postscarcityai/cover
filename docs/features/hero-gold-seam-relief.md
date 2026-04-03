# Hero gold seam and cross-section relief

This document describes how we paint **continuous gold ribbon art across the boundary** between the home hero and the next section, producing a **relief** effect: the motif reads as sitting **on top of the seam** while the hero field and the next section’s background remain distinct.

## The problem

1. **Paint order** — In normal document flow, the section *below* the hero paints **after** the hero. Anything drawn *inside* the hero (including a WebGL canvas) is clipped to the hero’s box unless you expand overflow, and even then the next section’s **opaque background** will cover pixels that extend past the hero’s layout edge.

2. **Opaque WebGL** — The hero `GoldDropCanvas` fills the quad with a **pale field plus gold**. If you stretch that canvas below the hero, you drag the **whole** shader background into the next section, not just the ribbons.

3. **Wrong target section** — On this site the block immediately after the hero is often **`content`**, not **`features`**. A seam overlay mounted only on `FeaturesSection` will **never run** for those pages.

## The technique: two layers + straddle

We use **two separate WebGL programs** (two canvases), both driven by the same fragment logic in `lib/shaders/gold-drop/` but with different **config**:

### Layer A — “Back” (inside the hero)

- **Opaque** output (`opaqueBackground: true`): full **pale blue‑grey field**, gold ribbons packed toward the **bottom** of the canvas (`ribbonBandCenter` / `ribbonBandHalfHeight` tuned for the tall hero).
- Lives in `components/sections/hero-section.tsx` as `GoldDropCanvas` covering the hero.

This establishes the **base** gold against the hero gradient. It stops visually at the hero’s bottom edge because the canvas is sized to the hero.

### Layer B — “Front” / seam (portaled)

- **Transparent** output (`opaqueBackground: false`): fragment shader emits **`vec4(rgb, alpha)`** with **alpha only where gold exists**; everywhere else is clear. WebGL uses `alpha: true`, `premultipliedAlpha: false`, blending `SRC_ALPHA, ONE_MINUS_SRC_ALPHA`, and clears to **transparent** each frame.
- **`createPortal(..., document.body)`** + **`position: fixed`** + **`z-[52]`** (below fixed nav `z-60`, above page content). This avoids **`#smooth-wrapper { overflow: hidden }`** on desktop, which was **clipping** in-flow overlays that extended past section boxes.
- **Position sync**: the following section passes **`anchorRef`** (its `<section>` ref). The overlay’s `top` is `getBoundingClientRect().top - height/2` so the strip stays **centered on the seam** while ScrollSmoother runs (rAF + scroll/resize observers).

Rendered from `components/hero-gold-seam-overlay.tsx` when `seamGoldFromHero` is true on:

- `components/sections/content-section.tsx`  
- `components/sections/features-section.tsx`  

`components/section-renderer.tsx` sets the flag when **`sections[index - 1]?.type === "hero"`**.

### Z-index / stacking

- **Front gold**: fixed **`z-[52]`** — draws **over** hero paint (including back gold and dot field) and **over** the next section’s background and copy wrapper (**`z-10`**), so the relief reads clearly across the boundary.
- **Nav** stays above at **`z-[60]`**.

### Back layer — hard matte (no rim softening)

Hero `GoldDropConfig` uses **`opaqueBgSoftRim: false`** (default). In the fragment shader, that **skips** the warm **bandProximity** tint and the **gold bleed** into the pale field so the opaque hero does not get a soft halo into the background — the back layer reads as a **clean cut** at the canvas edge. Set **`opaqueBgSoftRim: true`** if you want the old soft rim back.

## Shader alignment (short wide seam canvas)

The seam strip is **much shorter and wider** than the hero canvas. The same math in normalized space yields **thinner ribbons** and **tighter waves** unless you compensate.

`GoldDropConfig` exposes:

| Field | Role |
|--------|------|
| `ribbonBandCenter` / `ribbonBandHalfHeight` | Vertical pack position. Hero: bottom (`~ -0.45`). Seam: **`0`** = centered in the strip (on the seam after `translate-y-1/2`). |
| `geometryScale` | Scales ribbon **width**, **glow**, and **wave amplitude** together so stroke weight matches the hero in **pixels**. |
| `waveHorizontalScale` | Scales horizontal phase in `sin(x * freq)` so **wavelength** across the viewport matches despite different **aspect ratios**. |
| `opaqueBgSoftRim` | Opaque path only: warm rim + gold bleed near ribbons. Hero default **`false`** for a hard matte edge. |

Seam values are set in `components/hero-gold-seam-overlay.tsx` next to `SEAM_OVERLAY_CONFIG`.

## Operational notes

- **Hard refresh** after shader edits — the WebGL `useEffect` deps may not include the shader source string; a full reload guarantees recompile.
- **`prefers-reduced-motion: reduce`** — `GoldDropCanvas` skips WebGL; plan static or CSS fallback if you need strict a11y parity for the motif.

## Files to touch when extending

- `lib/shaders/gold-drop/fragment-shader.ts` — ribbon count, frequencies, colors.
- `lib/shaders/gold-drop/types.ts` — defaults for new uniforms.
- `lib/shaders/gold-drop/use-gold-drop-webgl.ts` — context options, blend, uniforms.
- `components/hero-gold-seam-overlay.tsx` — seam dimensions and `SEAM_OVERLAY_CONFIG`.
- `components/section-renderer.tsx` — which section types get `seamGoldFromHero`.

## Summary

**Relief across the line** = one **opaque** layer for the hero (hard matte optional) + one **transparent** layer **portaled to `body`**, **fixed** and tracked to the **top edge of the first section after hero**, with **stacking** so the front gold sits **above** hero and section content (except the nav). Matching **look** between layers is **uniform-driven geometry and horizontal phase**, not duplicate art files.
