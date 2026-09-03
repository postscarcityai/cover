# Scroll-Scrubbed Video

**Variant branch:** `variant/scroll-video` (branched from `variant/lenis-smooth-scroll`)
**Flag:** `features.scrollVideo`
**Demo:** `/scroll-video`
**Research:** [../research/scroll-scrub-video.md](../research/scroll-scrub-video.md)

## The premise

**Scrubbing is not playback.** A scrubbed video is viewed at arbitrary speed,
often reversed, often stepped one frame at a time. Two things that are
invisible during normal 30fps playback become glaring:

1. **Inter-frame decode cost.** The browser jumps to the nearest keyframe.
   Sparse keyframes turn a smooth scrub into a slideshow.
2. **AI temporal flicker.** Generated footage that morphs looks fine forwards
   at speed. Scrub it backwards and it falls apart.

Everything below follows from those two facts.

## Prerequisite: the scroll engine

This branch sits on `variant/lenis-smooth-scroll` and **will not work on
`main`**. Cover's original `scroll-smoother.tsx` puts the document in
`position: fixed; overflow: hidden` and moves a transform instead, which means:

- `document.documentElement.scrollHeight` is `0` on desktop
- any ScrollTrigger on the window scroller has **zero scroll range**
- `position: fixed` children resolve against the transformed ancestor

A scrubbed video on top of that is not survivable. See
[LENIS-SMOOTH-SCROLL.md](LENIS-SMOOTH-SCROLL.md).

## Rendering strategies

| | Strategy | Status |
|---|---|---|
| **A** | `<video>` + `currentTime` | **Baseline — always mounts** |
| B | Canvas image sequence | Not implemented (see below) |
| **C** | WebCodecs → canvas | Enhancement, feature-detected |

**Ship A. Feature-detect into C. Never ship C alone.**

`ScrubVideo` mounts A unconditionally and layers C on top only after two gates
pass: the element can actually play inline (iOS Low Power Mode fails here), and
`VideoDecoder.isConfigSupported()` returns true for the real codec. The canvas
is painted *over* the live `<video>`, never instead of it, so a mid-session
decoder failure reveals a working element rather than a hole.

**Strategy B is deliberately absent.** 300 frames × 100KB = 30MB. It is only
viable at ≤150 frames, ≤1440px, AVIF/WebP q60–70 — and only for graphic or flat
visuals, since photography compresses badly as stills. If you need it, it is a
narrow special case, not a general path.

### The rule that makes A feel good

**Never write `currentTime` from a scroll handler.** ScrollTrigger's `onUpdate`
fires many times per frame and each assignment queues a seek. Instead the
handler writes one number and a rAF loop eases the real `currentTime` toward
it — `lib/scroll/scrub-engine.ts`. That also gives the scrub its weight: the
footage trails slightly and settles.

### The rule that keeps C from OOMing the tab

**Every `VideoFrame` must be `close()`d.** They hold GPU memory that GC does not
reclaim; a 1280px 150-frame window is ~220MB of RGBA. `webcodecs-decoder.ts`
evicts unconditionally around a sliding window, binary-searches the keyframe
index when seeking backwards, and closes everything on teardown.

## Encoding

```bash
pnpm encode:scrub input.mov --out public/video --name hero
```

Produces desktop MP4/WebM, 640px mobile variants, and the WebP poster.

**Keyframe density is the whole game.** Defaults put one keyframe every ~100
frames, which is exactly why naive scrub video looks like a slideshow.

| Browser | Needs |
|---|---|
| Safari desktop | Most forgiving — reconstructs deltas on the fly |
| Chrome / Edge | keyframe every ~5 frames |
| Firefox | keyframe every ~2 frames, and struggles with MP4 — ship WebM |
| iOS Safari | Fine, but memory-constrained — keep resolution down |

The cost: every-frame keyframes ≈ 5× file size; every-5 ≈ 2.5–3×.

Non-negotiable flags, all enforced by the script:

- `-movflags +faststart` — moov atom first, or nothing seeks until the whole file lands
- `-pix_fmt yuv420p` — Safari won't decode 4:4:4
- `scenecut=0` — otherwise x264 inserts its own keyframes and density goes non-uniform
- `-an` — audio is dead weight and blocks autoplay policies you don't need

**Resolution discipline:** 1280px, 24–30fps. It's a background behind a scrim;
decode cost drops ~2.25× vs 1080p.

> The script uses `sharp` for the WebP poster rather than ffmpeg's `libwebp`,
> which is a build option many ffmpeg installs (including Homebrew's) lack.

## Pattern catalog

| # | Pattern | Component | Mechanism |
|---|---|---|---|
| 01 | Pinned scrub hero | `ScrubHeroSection` | pin + `+=300%` → currentTime |
| 02 | Expanding portal | `ClipReveal mode="portal"` | `clip-path: inset()` |
| 03 | Sticky card stack | `StickyStack` | **native sticky, zero JS** |
| 04 | Fixed video underneath | `FixedVideoUnderlay` | `position: fixed` + scrim, no trigger |
| 05 | Horizontal panels | `HorizontalPanels` | pin + x tween, `containerAnimation` |
| 06 | Video-as-type | `VideoAsType` | `mix-blend-mode` |
| 07 | Mask wipe | `ClipReveal mode="wipe"` | `clip-path` closing |
| 08 | Velocity-reactive | `VelocityLayers` | `getVelocity()` → `quickTo` skew |
| 09 | Depth parallax | `DepthParallax` | layers at scrub 0.3 / 0.8 / 1.4 |
| 10 | Beat snapping | `beats` prop on the sections | `snap.snapTo` |

**Sticky vs. pin:** use native `position: sticky` whenever the element just
needs to hold still (03, 04). No refresh cost, no spacer div, no interaction
with Lenis. Reach for `pin: true` only when you need `pinSpacing`, an exact
range, or `containerAnimation`.

**Horizontal panels:** the container tween **must** be `ease: "none"`. Any
easing and nested `containerAnimation` triggers fire at visibly wrong moments.
This is the most common way that pattern breaks.

## Gotchas, and where each is handled

| Gotcha | Handled in |
|---|---|
| iOS autoplay — `muted playsinline preload="metadata"`, no audio, poster mandatory | `scrub-video.tsx` |
| iOS Low Power Mode disables WebCodecs | `capabilities.ts` → `canPlayInline()` gate |
| Mobile address bar resizes viewport, pins jump | `ScrollTrigger.config({ ignoreMobileResize: true })` + `dvh` everywhere |
| Fonts land after ScrollTrigger init → wrong start/end | `document.fonts.ready` → `refresh()` |
| Route changes leave orphaned pins | `useGSAP()` scope auto-revert |
| `position: fixed` in a transformed ancestor | Lenis avoids the bug class entirely |
| `prefers-reduced-motion` | No trigger created; poster renders, section flows |
| Don't scrolljack | `end: "+=300%"` default; `+=1000%` is a hostage situation |

## Performance budget

- **The poster is the LCP element. Always.** Video is the enhancement.
- Poster ≤80KB (the script warns past it), desktop clip ≤4MB, mobile ≤1.5MB.
- Total JS delta for the scroll system ≤35KB gzip.
- Every scroll component is `dynamic()` with `ssr: false` — none of it belongs
  in the initial bundle. See `app/scroll-video/page.tsx`.
- Watch INP: the scroll handler writes a number and nothing else. All work
  happens in the rAF loop.

## Sourcing the footage

Not covered here — see research §7 for the art direction rules. The short
version: **camera motion only, subject static**, no cuts, constant velocity
(ease comes from ScrollTrigger, not the footage), 6–12s, compose a dark
low-detail region for the scrim, generate above delivery res and downscale.

## Demo asset

`public/video/demo.*` is an ffmpeg `testsrc` pattern, not real footage — it
exists so the pipeline is verifiable without shipping a large binary. Replace
it with `pnpm encode:scrub` output.
