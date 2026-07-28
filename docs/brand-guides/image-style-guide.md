# Image Style Guide

> **Living guide — leave room to grow.** These registers are the strong
> default and the thing to keep coherent, not a cage. When a new exploration
> earns its place, promote it here; when a direction is retired, log it in §7
> with a date so it isn't accidentally reintroduced.

The template ships with a working image-generation pipeline (fal.ai) and a
committed demo catalog. Everything renders in two registers that share one
blue-family palette but read completely differently:

1. **Prismatic duotone people** — dark slate/navy fields, subjects sculpted by
   light, blue prismatic accents. For heroes and section backgrounds.
2. **Flat 2D glass icons** — near-solid cobalt/royal-blue glassmorphism on
   pure white. For cards, feature tiles, and chips.

## 1. Direction at a glance

- **Photos:** monotone/duotone portraits in slate grey, deep navy and azure
  blue. The figure dissolves into the field — edges by light, not by line. The
  face is the brightest, sharpest point. Prismatic blue lighting with a
  restrained iridescent sheen. Cinematic grade, halation, fine film grain.
- **Icons:** strictly flat and front-facing, near-solid cobalt/royal-blue fill,
  thin bright highlight edge, pure `#ffffff` background in production. No 3D,
  no sticker border, no glow.
- **Patterns:** repeating background patterns (hex, dots, waves) are **never
  drawn by the model** — it cannot draw a regular lattice. Images generate on
  a clean field and `scripts/pattern-overlay.mjs` composites a mathematically
  perfect SVG pattern afterward, masked off the subject and faded away from
  the headline zone.

## 2. Guardrails (all categories)

- **Composition:** heroes keep deep, even negative space for a white headline
  (left third for right-anchored heroes; generous headroom for the centered
  rotation — the homepage hero renders `bg-top`, so heads must never crop).
- **The face is the hero.** Clearly lit, in focus, catch-light in the eyes,
  genuine and candid — never a stiff stock pose.
- **One subject per image** (couples only in the explicit couple register).
  No duplicated or phantom figures.
- **Edges by light, not by line.** No cutout edges, white outlines, sticker
  borders, or halos.
- **Casting reflects the general United States population**, spread across
  race, age, and gender *across the set* — every people prompt carries the
  casting clause from `IMAGE_STYLE.casting`.
- **Restraint.** Not neon, not garish, not busy, not sci-fi. Never: cosmos,
  planets, stars, orbits, constellations, aurora swirls.

## 3. Photo registers

All defined as clause compositions in `scripts/generate-images.mjs`:

| Register | Use | Composition |
|---|---|---|
| `heroRight` | Subpage heroes | Subject anchored right third, dark left for headline |
| `heroCentered` | Homepage hero rotation | Centered-leaning, FULL head + torso, strict duotone |
| `bgCentered` | Full-bleed section bg | Centered, deliberately dark/even for white text overlay |
| `coupleCentered` | Closing CTA | Exactly two people, centered, dark/even |
| `portraitSquare` | In-card accents | 1:1 head-and-shoulders |
| `abstractField` | Faint section backdrops | No people, low contrast |
| `darkWash` | Text-safe washes | Gradient only, no pattern, no subject |

## 4. Iconography

Two variants of the flat 2D glass recipe:

- `glassIcon` — exploration: soft off-white background, faint inner glow.
- `glassIconProd` — production: **no glow**, pure `#ffffff` background so the
  icon sits flush on white cards. Use this for anything that ships.

Keep one bold symbol per icon, centered, generous empty space.

## 5. Pattern overlay

`scripts/pattern-overlay.mjs` bakes a perfect repeating pattern over the clean
base image:

- **Patterns:** `hex` (honeycomb lattice), `dots` (staggered dot grid),
  `waves` (stacked sine lines). Add a shape by adding one generator to
  `PATTERNS` — the masking/compositing machinery is shared.
- **Masking:** a birefnet subject cutout keeps the pattern strictly in the
  background, dilated so it pulls clear of the person; a directional fade
  keeps the headline zone clean (use `FADE_EVEN` for centered subjects).
- **Cheap iteration:** the clean base (`.base.jpg`) and mask (`.mask.png`)
  are cached next to the output. Re-running **without** `--force`
  re-composites the pattern with zero generation calls — tune freely.

## 6. Production & generation

- **Model:** locked to `fal-ai/nano-banana-2` (text-to-image) — never flux.
  Subject cutouts use `fal-ai/birefnet/v2`.
- **Key:** `FAL_KEY` in `.env.local` (see `.env.example`).
- **Commands:**

  ```bash
  npm run images                       # generate everything missing
  npm run images -- --smoke            # one cheap test image
  npm run images -- --only=icons       # one category
  npm run images -- --slug=icon-shield # one image
  npm run images -- --force            # regenerate even if files exist
  ```

- **Output:** `public/img/style-guide/<category>/<slug>.jpg` plus
  `manifest.json` (inlines every prompt), reviewed at `/style-guide`
  (noindex). Reviewers select picks and export a TSV that includes each
  image's prompt, so selections round-trip straight back into iteration.
- The catalog (`PROMPTS`) is importable without side effects for tooling.

## 7. Retired styles

Log retired directions here with a date and "do not reintroduce". The
template starts with none; the upstream fork history (plannix) retired:
aurora/cosmic fields, 3D clay objects, flat-sticker icons, 3D-glass icons,
model-drawn mesh patterns, and strong-gradient icon fills — all superseded by
the registers above.

## 8. Re-skinning for a fork

Everything brand-specific lives in `scripts/image-style.config.mjs`:

| Knob | What it controls |
|---|---|
| `IMAGE_STYLE.photo.paletteWords` | Duotone palette clause in every people prompt |
| `IMAGE_STYLE.photo.prismWords` | The prismatic light color ("BLUE and AZURE") |
| `IMAGE_STYLE.photo.sheenWords` | The iridescent-sheen parenthetical |
| `IMAGE_STYLE.photo.fieldWords` | Negative-space field color words |
| `IMAGE_STYLE.icon.fillWords` | Icon fill color words |
| `IMAGE_STYLE.overlay` | Default pattern, stroke hex, opacity |
| `IMAGE_STYLE.casting` | Casting guardrail clause |
| `SUBJECTS` | The entire demo catalog (slugs, labels, subjects) |

Color knobs are natural-language **words**, not hex — the model reads words.
The composition clauses are deliberately *not* knobs: the whole system (hero
scrim, headline zones, overlay fades) assumes them; edit the clause constants
in `scripts/generate-images.mjs` only if you know what you're changing.

To re-skin: edit the words, delete `public/img/style-guide/`, run
`npm run images`, review at `/style-guide`, iterate. Expect one or two tuning
passes on the color words — strong hues over-saturate easily; the "NOT neon"
negatives do real work.
