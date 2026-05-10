# DTC visual aesthetic — hims.com & ro.co

**Captured:** 2026-05-09 (desktop @ 1710×1073 viewport)
**Captured by:** computed-style extraction via Claude in Chrome MCP, supplemented by inline screenshots
**Pages:**
- hims.com — homepage (`/`) and weight-loss product page (`/weight-loss`)
- ro.co — homepage (`/`) and weight-loss product page (`/weight-loss/`)

> **Methodology note** — The OS-level Chrome resize commands didn't take during this session (window stayed at 1710px), so tablet (768) and mobile (375) viewport captures became a follow-up pass. Desktop is where the design system is most legible anyway, and these brands' breakpoint behavior is straightforward enough to extrapolate for the redesign. A separate "responsive rules" pass should be run before final implementation.

---

## TL;DR — five takeaways the redesign must respect

1. **Pill CTAs, not rounded buttons.** Both brands use `border-radius` between 48px and 100px (or `9999px`) for primary actions. Cover's default rounded-md style reads as "developer template"; this reads as "consumer brand." Adopt fully-rounded pills as the default.
2. **Display type is *big, light, tight*.** Hero headlines are 41–82px at **font-weight 400** (not 700) with letter-spacing in the **-3% to -7%** range. The visual weight comes from size + tight tracking, not bold. Cover's current display type is undersized and uses default Tailwind tracking — it reads as flat.
3. **Signature accent color, sparingly used.** Hims = warm gold `#FFC671`. Ro = electric yellow `#F8FFA1` + mint `#DBF6E8`. One bright color, dropped onto otherwise neutral surfaces. Cover's current themes try to be too coherent — losing the "pop" moment.
4. **Edge-to-edge sections with internal grids.** Both use `max-width: 1700+px` containers (essentially full-bleed on most monitors), with a tight inner grid. Cover's current `max-w-7xl` (1280px) is too narrow for this aesthetic.
5. **Two-column hero with a trust-signal column.** Both product pages put the headline + dual-CTA on the left and a 3-bullet trust list on the right (with checkmark/icon glyphs). This pattern carries the conversion. Cover should make this a first-class hero variant.

---

## Per-site analysis

### hims.com

**Brand voice in pixels:** warm, residential, photo-forward. Earth-tone palette (gold, sand, brown, cream) instead of clinical white-and-blue. Big tightly-set sans-serif headlines on warm photo backgrounds with gradient overlays. Product cards are full-bleed photographic with the headline lower-left over the image — magazine layout.

**Typography (sofia-pro, license: Adobe TypeKit `sofia-pro` / fallback `FontSofiaPro`):**

| Element | Size | Weight | Line-height | Letter-spacing | Color |
|---|---|---|---|---|---|
| Body `<p>` | 16px | 400 | 22.4px (1.40) | normal | `rgba(0,0,0,0.88)` |
| H1 home "The care you've always deserved" | 57px | 400 | 57px (1.00) | -3.56px (**-6.25%**) | `rgba(0,0,0,0.88)` |
| H2 home hero | 62px | 400 | 69.75px (1.13) | -3.72px (**-6.0%**) | white |
| H2 home secondary | 51px | 500 | 57.4px (1.13) | -3.13px (**-6.1%**) | white |
| H2 home tertiary | 43px | 500 | 48.4px (1.13) | -2.14px (**-5.0%**) | white |
| H2 product hero "Weight loss that works" | 82px | 400 | 79.5px (0.97) | -6.07px (**-7.4%**) | (uses `bg-clip:text` gradient) |
| H3 card overline | 20px | 500 | 18.2px (0.91) | -1.05px (**-5.25%**) | white |
| H3 card lead | 29px | 500 | 32.6px (1.13) | -1.74px (**-6.0%**) | white |

The pattern is unmistakable: **all display type is weight 400** (sometimes 500 for sub-display), **letter-spacing is consistently around -6%**, and **line-height collapses toward 1.0** as the size grows.

**CTAs:**

| Variant | Background | Text | Padding | Radius | Font size | Weight |
|---|---|---|---|---|---|---|
| Primary home "Get started" | `rgb(255,198,113)` warm gold | `rgb(69,52,33)` dark brown | `0 24px` (~14px tall via line-height) | **48px** | 14.5px | 400 |
| Primary product "See if I'm eligible" | white | `rgb(49,54,48)` near-black | `0 29px` | **100px** | 23px | 500 |
| Secondary "View details" | `rgba(0,0,0,0.06)` 6% black scrim | black 89% | `8px 24px` | **9999px** | 14px | 500 |
| Nav "Log in" pill | white | black | `4px 12-14px` | **48px** | 12px | 500 |

The "Get started" gold pill is the brand's signature button — on hims that color *is* the CTA.

**Containers / layout:**
- Sections have `max-width: 1728px`, **zero horizontal padding** (full-bleed at typical monitor widths), and use internal grid + image padding for breathing room.
- Two-column hero: headline left (~50%), large product/photography right.
- Card grid below: 4-up product nav cards (Have better sex / Regrow hair / Boost testosterone / Get a health check) with a subtle warm-cream background `rgb(251,248,245)`.

**Top palette (frequency-ranked from 800 visible elements):**

| Color | Role | Frequency |
|---|---|---|
| `#FFC671` (warm gold) | CTAs, accents, top announcement bar | 11 |
| `#FFFFFF` | Page bg, secondary surfaces | 9 |
| `rgba(255,255,255,0.11)` | Glass/overlay scrims on photo cards | 5 |
| `#41301B` (dark brown) | Card backgrounds (gradient endpoints) | 3 |
| `rgba(185,130,103,0.8)` | Warm transparent overlay | 3 |
| `#FBF8F5` (warm cream) | Subtle section backgrounds | 2 |

**Foreground frequencies:** white (359 occurrences — most text sits on dark/photo backgrounds), default browser link blue (123, mostly footer), black 88% (99). The site is **predominantly dark or photographic surface with light text**, inverted from a typical SaaS template.

---

### ro.co

**Brand voice in pixels:** clinical, calm, slightly playful. Neutral charcoal + cream + occasional electric-yellow or mint accent. Color-blocked cards (no photos inside the card itself) with a tiny dark pill CTA bottom-right. Where hims is "warm magazine," ro is "modern medical office."

**Typography (custom font "Ro Sans"):**

| Element | Size | Weight | Line-height | Letter-spacing | Color |
|---|---|---|---|---|---|
| Body `<p>` | 16px | 400 | 18.4px (**1.15** — tight) | normal | `#1A1A1A` |
| Hero headline "Healthier on Ro" (rendered as `<p>`, not h1) | 46px | 400 | 55px (1.20) | -1.38px (**-3.0%**) | `#1A1A1A` |
| H1 product "Get access to prescription weight loss medication online" | 41px | 400 | 49px (1.20) | -1.23px (**-3.0%**) | `#1A1A1A` |
| H2 product section | 36px | 400 | 43px (1.19) | -1.08px (**-3.0%**) | `#1A1A1A` |
| H2 eyebrow "Start losing weight in 5 simple steps" | 14px | 600 | 20px | -0.14px | `#1A1A1A` |
| H3 product card | 29px | 400 | 35px (1.21) | -0.87px (**-3.0%**) | `#1A1A1A` |
| H2 home card | 32px | 400 | 38px (1.19) | -0.96px (**-3.0%**) | white (on charcoal cards) |

Pattern: **even tighter weight discipline than hims** — almost everything is weight 400, including 41px H1s. Display tracking is uniformly **-3%**. Line-height ~1.20. Body is unusually tight at 1.15.

**CTAs:**

| Variant | Background | Text | Padding | Radius | Size | Weight |
|---|---|---|---|---|---|---|
| Primary product "Start your journey" | `#1A1A1A` charcoal | white | (height 44px) | **80px** | 16px | 400 |
| Secondary product "Start with free insurance check" | white (with thin charcoal border) | `#1A1A1A` | (height 44px) | **80px** | 16px | 400 |
| Card pill "Start now" (home cards) | `#1A1A1A` | white | `8px 16px` | **80px** | 13px | 400 |
| Trust-signal headline "See if you qualify" | inline link (no pill) | `#0D7744` deep green | — | — | 16px | 600 |

The two-button hero pair (filled charcoal + outlined white) is the canonical pattern — should be replicated as Cover's default hero CTA arrangement.

**Containers / layout:**
- `MainContainer` has `max-width: none` — fully fluid.
- Inner content widths: ~1145px sections (a centered ~67% column, with cards spanning narrower).
- Two-column hero: headline + dual-CTA on the left, **3 trust signals on the right** with deep-green icon glyphs (pencil/feather/checkmark).
- Below hero: a 3-up icon row in a cream-bg card; legal disclaimer immediately below.

**Top palette:**

| Color | Role | Frequency |
|---|---|---|
| `#1A1A1A` (charcoal — *not pure black*) | Brand black, CTAs, body text | 28 (home) / 14 (product) |
| `#FFFFFF` | Page bg | 16 / 29 |
| `#EEE9E4` (warm cream) | Card backgrounds | 10 / 4 |
| `rgba(26,26,26,0.05)` | Subtle gray fills | 9 / 9 |
| `#DBF6E8` (mint green) | Accent card bg | 6 / 6 |
| `#F8FFA1` (electric yellow) | Announcement bar bg, attention accent | 4 / 5 |
| `#F7F4F1` (off-white) | Secondary section bg | 4 |
| `#0D7744` (deep green) | Trust-signal text + icon glyphs | (FG: 18 / 21) |
| `#666666` (mid-gray) | Subtitle text, captions | (FG: 72 / 39) |

The signature is: **charcoal `#1A1A1A` instead of true black** (slightly softer), with a yellow + mint accent system that's bright but used in tiny areas.

---

## Cross-site comparison

### What both do (the DTC playbook)
- **Pill CTAs** with `border-radius` ≥ 48px (often `9999px`). Never `rounded-md` (8-12px).
- **Display weight 400 + tight tracking.** The "premium consumer brand" feel comes from this — bold-weight headlines feel "blogspot."
- **One custom typeface** loaded via `@font-face` (sofia-pro / Ro Sans). System fonts are immediately legible as cheap.
- **Two-column hero** with trust signals as a parallel column, not below the fold.
- **Edge-to-edge or near-fluid containers.** `max-width` is way past the 1280px Tailwind default.
- **One signature accent color** for the brand moment, sprinkled in tiny doses (CTA bg, announcement bar). Everything else is neutral.
- **Photography or color blocks at full card width.** No icon + text + CTA tile combos — that's SaaS.
- **Tight body line-height** (1.15–1.40). The Tailwind default of 1.5 reads as "documentation."

### What differentiates them

| | hims | ro |
|---|---|---|
| Tone | Warm, magazine, residential | Clinical, calm, modern medical |
| Hero scale | 57–82px | 41–46px |
| Letter-spacing | -6% to -7.4% | -3% |
| Brand black | `rgba(0,0,0,0.88)` (pure black at low opacity) | `#1A1A1A` (custom charcoal) |
| Accent | Single warm gold `#FFC671` | Triad: yellow `#F8FFA1` + mint `#DBF6E8` + deep green `#0D7744` |
| Card style | Full-bleed photo with gradient overlay + lower-left text | Color-blocked solid bg, headline upper-left, small pill bottom-right |
| Density | High visual density, lots happening per fold | Generous whitespace, one or two ideas per fold |
| Photography | Heavy — every section has a hero image | Sparse — mostly color blocks and icons |

**Choose-one decision** for Cover's redesign: hims's density is harder to template (every section needs a custom image asset). **Ro's color-block approach is more template-friendly** — a brand could swap the accent color and ship.

---

## Translation to Cover

Cover's design tokens live in `theme.config.ts` (which the user runs `pnpm run theme` against to switch) and `tailwind.config.ts`. The redesign needs to update both, plus update the section components in `components/sections/` to use the new patterns.

### Concrete recommendations by category

**1. Color tokens** — refactor the existing 5 theme presets so each one has:
- `surface` (page bg) — usually white or off-white
- `ink` (brand black) — **NOT pure black**. Use `#1A1A1A` for any "modern medical" theme; `rgba(0,0,0,0.88)` for any "warm magazine" theme.
- `accent` (the one-color brand moment) — currently themes don't single one out. They should — pick one bright color per theme and use it sparingly (CTA bg, eyebrow text, announcement bar).
- `accent-ink` — the readable text color on top of `accent` (e.g. dark brown on hims gold).
- `surface-warm` — a tinted off-white for card/section backgrounds (`#FBF8F5` for warm themes, `#EEE9E4` or `#F2F2F2` for cool themes).
- `mute` — mid-gray for captions/footnotes (`#666` works for both).
- (Optional) `trust` — accent color reserved for trust signals (deep green `#0D7744` works universally).

**2. Typography scale** — replace Cover's current type ramp with:

```ts
// theme.config.ts (suggested)
typography: {
  fontFamily: {
    display: '"Sofia Pro", "Inter", system-ui, sans-serif',
    body: '"Sofia Pro", "Inter", system-ui, sans-serif',
  },
  // Display: weight 400, tight tracking
  display: {
    h1: { size: '57px', weight: 400, lineHeight: '1.0',  letterSpacing: '-0.0625em' },  // -6.25%
    h2: { size: '46px', weight: 400, lineHeight: '1.13', letterSpacing: '-0.06em' },
    h3: { size: '32px', weight: 400, lineHeight: '1.20', letterSpacing: '-0.03em' },
    h4: { size: '24px', weight: 500, lineHeight: '1.20', letterSpacing: '-0.02em' },
  },
  // Body: weight 400, line-height 1.4 (warm) or 1.15 (clinical)
  body: {
    base:    { size: '16px', weight: 400, lineHeight: 1.4 },
    eyebrow: { size: '14px', weight: 600, lineHeight: 1.43, textTransform: 'uppercase', letterSpacing: '0.04em' },
    caption: { size: '14px', weight: 400, lineHeight: 1.43, color: 'mute' },
  },
}
```

If sticking with system fonts for license reasons, **Inter Tight** or **Geist** carries the same -6% feel better than default Inter.

**3. Container max-widths and section padding**

```ts
// tailwind.config.ts (suggested)
container: {
  center: true,
  screens: {
    sm:   '100%',   // edge-to-edge on mobile
    lg:   '1200px',
    xl:   '1440px',
    '2xl':'1728px', // hims's actual max-width
  },
  padding: { DEFAULT: '24px', md: '40px', lg: '64px' },
},
```

Cover currently uses `max-w-7xl` (1280px). Bump it to **1440–1728px** depending on theme. Section vertical padding should be **`py-24` to `py-32`** at desktop (currently many Cover sections are `py-16`).

**4. Button component baseline** — replace the existing variant set in `components/ui/button.tsx` (Radix-based) with:

```tsx
// Pill primary (default)
className="rounded-full px-7 h-12 text-base font-medium bg-ink text-white hover:opacity-90 transition"

// Pill secondary (outline)
className="rounded-full px-7 h-12 text-base font-medium bg-white text-ink border border-ink/15 hover:bg-ink/[0.03] transition"

// Pill accent (the brand-color CTA)
className="rounded-full px-7 h-12 text-base font-medium bg-accent text-accent-ink hover:opacity-90 transition"

// Pill ghost (small, for cards)
className="rounded-full px-4 h-9 text-sm font-medium bg-ink text-white"
```

Note: `rounded-full` not `rounded-md`. Height 44–48px (currently Cover ships 36–40px).

**5. Card component baseline** — Cover's section cards are currently rounded-lg with shadow. Replace with:

```tsx
// Color-blocked card (ro pattern — template-friendly)
className="rounded-3xl p-8 bg-surface-warm hover:bg-surface-warm/80 transition aspect-[4/3] flex flex-col justify-between"

// Photo card (hims pattern — needs image asset per card)
className="rounded-3xl overflow-hidden relative aspect-[4/3]"
// child: <img className="absolute inset-0 object-cover" />
// child: <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
// child: <div className="absolute bottom-6 left-6 text-white">…</div>
```

`rounded-3xl` (24px) feels right for cards. **Drop box-shadow entirely** — neither hims nor ro use shadows on content cards. The visual separation comes from the surface color contrast, not shadow.

**6. Hero pattern (new component to add)** — both sites converge on a `Hero2Col` pattern. Cover doesn't currently have this as a section variant. Recommended addition to `components/sections/`:

```tsx
<section className="container py-24">
  <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 items-start">
    <div>
      <h1 className="display-h1">{headline}</h1>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button variant="primary">{primaryCta}</Button>
        <Button variant="secondary">{secondaryCta}</Button>
      </div>
    </div>
    <ul className="space-y-5 lg:pt-3">
      {trustSignals.map(s => (
        <li className="flex items-start gap-3">
          <s.Icon className="h-5 w-5 text-trust" />
          <span><strong className="text-trust">{s.lead}</strong> {s.detail}</span>
        </li>
      ))}
    </ul>
  </div>
</section>
```

### Open questions (need a design call, not a code call)
- **Custom typeface licensing.** Sofia Pro (Adobe TypeKit, ~$10/mo) and bespoke fonts like Ro Sans aren't free. Options: (a) license one font and let theme presets vary other tokens, (b) use Geist/Inter Tight as a free stand-in and accept the slight loss of distinctiveness, (c) buy one type license per theme (Söhne for clinical, GT America for warm, etc.).
- **How many themes survive?** Cover currently ships 5 (Professional, Modern, Elegant, Minimal, Warm). Most of them feel "SaaS template" today. We could collapse to 2 well-executed presets ("Clinical" ≈ ro, "Warm" ≈ hims) and ship a third later. Fewer presets = more polish per preset.
- **Photography vs color blocks as the default.** Hims's photography-heavy approach makes the template harder for users to ship — they need a real photoshoot. Defaulting to ro's color-block approach means a user can swap the accent color and have a working site. **Recommend defaulting to color blocks**, with an opt-in "photo card" component variant.
- **Where does the accent color live in `theme.config.ts`?** Today themes have many colors of equal weight. The pattern observed says one color should be promoted to "the brand moment" and the rest demoted to neutrals.

---

## Captured screenshots (inline this session — see conversation transcript)

Screenshots were captured via `mcp__Claude_in_Chrome__computer.screenshot` and are attached inline in the research conversation. The local file save failed due to macOS Screen Recording permissions not being granted to the agent. To save permanent copies on disk, either grant Screen Recording permission to the agent runner or re-run with the user manually capturing each viewport.

| Site | Page | Viewport | Inline screenshot ID |
|---|---|---|---|
| hims.com | / (home) | 1710×1073 | ss_4848pjs75 |
| hims.com | /weight-loss | 1710×1073 | ss_7226jza65 |
| ro.co | / (home) | 1710×1073 | ss_97781x5zp |
| ro.co | /weight-loss | 1710×1073 | ss_6975y3kxx |

Tablet (768) and mobile (375) captures: deferred to a follow-up pass with proper viewport emulation (Chrome DevTools or remote rendering).

---

## What's next

The data above is enough to **start drafting the redesign**. Suggested sequence:
1. Pick the typography license decision (free Geist/Inter Tight vs. paid type) — blocks everything else.
2. Update `theme.config.ts` with the new token names (accent, accent-ink, ink, surface-warm, mute, trust) and migrate one theme as a reference (suggest "Modern" → "Clinical").
3. Update `tailwind.config.ts` containers + remove rounded-md defaults.
4. Refactor `components/ui/button.tsx` to the four pill variants.
5. Add the `Hero2Col` section component.
6. Apply to a representative page (the homepage) and review.

Estimated scope: 1–2 focused sessions for the token + base-component pass; an additional pass per page after.
