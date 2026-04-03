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

### Layer B — “Front” / seam (on the next section)

- **Transparent** output (`opaqueBackground: false`): fragment shader emits **`vec4(rgb, alpha)`** with **alpha only where gold exists**; everywhere else is clear. WebGL uses `alpha: true`, `premultipliedAlpha: false`, blending `SRC_ALPHA, ONE_MINUS_SRC_ALPHA`, and clears to **transparent** each frame.
- Mounted in a **narrow strip** that **straddles the boundary**:
  - Wrapper: `absolute left-0 right-0 top-0 -translate-y-1/2` with a fixed height (e.g. `h-[11rem] max-h-[32vh]`).
  - **`top: 0`** anchors to the **top** of the *following* section; **`-translate-y-1/2`** shifts half the strip **up** into the hero and half **down** into the next section — that is the **relief**: the same div literally crosses the line.

Implemented as `components/hero-gold-seam-overlay.tsx`, rendered from:

- `components/sections/content-section.tsx` when `seamGoldFromHero` is true  
- `components/sections/features-section.tsx` under the same flag  

`components/section-renderer.tsx` sets `seamGoldFromHero` when **`sections[index - 1]?.type === "hero"`** so the **actual** next section receives the overlay, whether it is `content` or `features`.

### Z-index / “above and below the line”

On the receiving section:

1. Section `backgroundColor: var(--bg)` (e.g. white).
2. Seam overlay at **`z-[15]`** — gold draws **on top of** that flat background in the overlap band.
3. Section content wrapper at **`z-[20]`** — copy and UI stay **above** the gold so text stays readable.

The **hero** content stays above its own canvas with `z-10`. Visually:

- **Below the line** (inside the next section): you see **white + transparent gold** composited on top → gold reads as **relief over** the thesis/features area.
- **Above the line** (still overlapping the hero): the **later** sibling section’s overlay paints **on top of** the hero’s bottom pixels (same stacking rule), so the **front** gold can reinforce the **back** gold for a denser, intentional **double pass** at the seam.

## Shader alignment (short wide seam canvas)

The seam strip is **much shorter and wider** than the hero canvas. The same math in normalized space yields **thinner ribbons** and **tighter waves** unless you compensate.

`GoldDropConfig` exposes:

| Field | Role |
|--------|------|
| `ribbonBandCenter` / `ribbonBandHalfHeight` | Vertical pack position. Hero: bottom (`~ -0.45`). Seam: **`0`** = centered in the strip (on the seam after `translate-y-1/2`). |
| `geometryScale` | Scales ribbon **width**, **glow**, and **wave amplitude** together so stroke weight matches the hero in **pixels**. |
| `waveHorizontalScale` | Scales horizontal phase in `sin(x * freq)` so **wavelength** across the viewport matches despite different **aspect ratios**. |

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

**Relief across the line** = one **opaque** layer for the hero world + one **transparent** layer on the **first section after hero**, positioned so its box is **half above and half below** the boundary, with **stacking** that keeps section ink above the gold. Matching **look** between layers is **uniform-driven geometry and horizontal phase**, not duplicate art files.
