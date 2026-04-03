# PostScarcity AI — Visual Style Guide

## Core Identity

**White, clean, abundant gold.**

PostScarcity AI's visual identity is built on a pristine white canvas with luminous gold as the signature accent. The aesthetic is fresh, modern, and luxurious — never dark, never muted. Gold represents abundance. White represents space and clarity.

---

## The Gold Ribbon System

Our signature visual element is **flowing gold ribbons** — smooth, sweeping curves of luminous gold rendered via WebGL shaders. These ribbons are the DNA of the PostScarcity visual language.

### Key Characteristics

- **Overlapping is the magic.** When ribbons cross and layer, they create moments of concentrated gold energy — brighter nodes where paths intersect. This is the effect to chase. More overlap = more visual richness.
- **Varied weight.** A mix of bold strokes and hairline accents creates depth and hierarchy. Some ribbons are bold and prominent, others are gossamer-thin whispers.
- **Continuous flow.** Ribbons move slowly and independently — each at its own speed, frequency, and phase. The movement should feel calm, confident, and hypnotic. Never frantic.
- **Compressed bands.** Ribbons are most effective when grouped into a concentrated zone rather than spread evenly. Dense clusters of gold with generous negative space is the formula.
- **Bright, luminous gold palette:**
  - Core gold: `rgb(242, 199, 56)` / `#F2C738`
  - Warm gold: `rgb(255, 230, 115)` / `#FFE673`
  - Glow gold: `rgb(255, 224, 107)` / `#FFE06B`
  - Never muted, dusty, or brown-shifted

### What to Avoid

- **Blob shapes** — no metaballs, organic blobs, or germ-like forms
- **Uniform clouds or noise washes** — too generic, no structure
- **Busy grid patterns** — messy, not clean
- **Dark or muted gold** — always keep gold bright and fresh
- **Spread-everywhere coverage** — concentrate the gold, leave lots of white breathing room

---

## Layout Principles

### Hero Sections

- **Top 2/3 to 4/5: clean white space** — this is where headlines and copy live
- **Bottom 1/5 to 1/3: concentrated gold ribbon band** — the visual anchor
- Ribbons fade at the edges (top, bottom, left) for soft transitions
- Right-side bias allows more gold on the right while keeping the left text column clean

### Subpage Heroes

- Ribbons can shift position (e.g., top band, side accent) but always stay concentrated
- The same ribbon language applies everywhere — consistency across pages

### Negative Space

- White space is not empty — it's intentional
- The gold ribbons earn their impact through contrast with the surrounding white
- At least 60-70% of any viewport should be white

---

## Animation Guidelines

- **Speed:** Slow and graceful. Ribbons should drift, not race.
- **Independence:** Each ribbon moves at its own pace. No synchronized motion.
- **Subtlety:** The effect should be noticed on second glance, not scream for attention. It rewards lingering.
- **Reduced motion:** Always respect `prefers-reduced-motion`. When reduced motion is active, display a static frame or no shader.

---

## Technical Reference

### Shader Architecture

The gold ribbon system lives at `lib/shaders/gold-drop/`:

| File | Purpose |
|------|---------|
| `fragment-shader.ts` | GLSL fragment shader — the visual logic |
| `vertex-shader.ts` | Fullscreen quad vertex shader |
| `types.ts` | Config interface + default preset |
| `use-gold-drop-webgl.ts` | React hook managing WebGL lifecycle |
| `index.ts` | Barrel exports |

### Canvas Component

`components/gold-drop-canvas.tsx` — drop-in client component. Accepts partial config overrides:

```tsx
<GoldDropCanvas
  config={{
    speed: 0.8,
    intensity: 0.95,
    rightBias: 0.3,
  }}
/>
```

### Configurable Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `noiseScale` | `2.0` | Scale of the noise field for shimmer |
| `speed` | `1.0` | Global animation speed multiplier |
| `intensity` | `0.9` | Gold opacity/strength (0–1) |
| `rightBias` | `0.4` | How much gold shifts to the right (0–1) |
| `topFade` | `0.5` | Fade strength at the top edge (0–1) |
| `bottomFade` | `0.3` | Fade strength at the bottom edge (0–1) |

### Creating New Presets

To adjust the ribbon band position, modify in `fragment-shader.ts`:

```glsl
float bandTop = -0.28;    // top of the ribbon zone (pos space, 0 = center)
float bandBottom = -0.50;  // bottom of the ribbon zone
```

To adjust ribbon density, change the `COUNT` constant.

To adjust ribbon size range, modify the `width` and `amp1`/`amp2` calculations.

---

## Color System Integration

The gold accent maps to the site's design token:

- **Site accent:** `#B8941F` — used for UI elements (buttons, links, borders)
- **Shader gold:** Brighter and more luminous than the UI accent — the shader golds are `#F2C738` range, deliberately more vibrant because they render on white and need to pop as light, not as UI chrome

---

## Versioning History

| Version | Concept | Status |
|---------|---------|--------|
| V1 | Gold metaball blobs | Rejected — looked biological |
| V2 | Flowing noise clouds | Rejected — too generic and muted |
| V3 | Golden caustics | Saved at `lib/shaders/gold-drop-v3-caustics/` — decent but not clean enough |
| V4 | Gold caustic grid with lines | Rejected — too messy |
| V5 | Two clean ribbons | Good direction but too sparse |
| V6 | Seven ribbons | Right language, needed more |
| V7 | 28 ribbons full spread | Too spread, needed compression |
| **V8** | **18 ribbons, bottom 1/5** | **Current — approved** |
