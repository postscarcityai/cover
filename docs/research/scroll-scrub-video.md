# Scroll-Scrubbed Video + Sticky Choreography — Build Research

Research date: 2026-09-03 · Target template: `postscarcityai/cover` (Next 14 App Router, GSAP 3.12, Tailwind, section-driven pages)

---

## 0. TL;DR — the stack I'd build

| Layer | Choice | Why |
|---|---|---|
| Scroll engine | **Lenis 1.3.x** (`lenis/react`) driven by `gsap.ticker` | Keeps native document scroll (accessibility, anchors, `position: sticky`, ScrollTrigger all keep working). Cover's current smoother does not — see §1. |
| Choreography | **GSAP ScrollTrigger** (pin + scrub) + native `position: sticky` where it suffices | All GSAP plugins are free since Apr 2025 (Webflow). Native sticky is cheaper and has no `pinSpacing` side effects. |
| Frame rendering | **`<video>` + `currentTime`** on an all-keyframe encode as the baseline; **WebCodecs → canvas** as progressive enhancement | Baseline works everywhere including iOS low-power mode; WebCodecs is frame-exact but has real failure modes. |
| Image sequence (canvas) | Only for short, must-be-perfect hero beats (≤150 frames) | Deterministic, but bytes explode fast. |
| Source footage | AI gen (Higgsfield / Runway / Veo / Kling), **camera-move-only**, 6–12s | Scrubbing exposes temporal instability that normal playback hides — see §7. |

The single most important insight: **scrubbing is not playback.** A scrubbed video is viewed at arbitrary, often reversed, often frame-stepped speed. Two things that are invisible at 30fps playback become glaring: (a) inter-frame decode cost, and (b) AI temporal flicker/morphing. Everything below follows from those two facts.

---

## 1. Blocker: cover's scroll engine has to go first

`components/scroll-smoother.tsx` is a hand-rolled wheel-hijacker, not GSAP's ScrollSmoother plugin. It is enabled by default (`site.config.ts:205` → `features.smoothScroll: true`) and wired in `app/layout.tsx:123`.

Verified in the browser (dev server, computed styles):

```
#smooth-wrapper  → position: fixed; overflow: hidden
document.documentElement.scrollHeight → 0
#smooth-content.scrollHeight          → 13740
```

**The document does not scroll on desktop.** All motion is a transform on `#smooth-content`. Consequences:

1. Any `ScrollTrigger` using the default (window) scroller has **zero scroll range** on desktop — `scroll-reveal.tsx`'s `initParallax` and `initScrollProgress` are effectively dead there. Reveals still fire because the batch triggers happen to evaluate at init.
2. `components/scroll-smoother.tsx:110` calls `ScrollTrigger.refresh()` inside a tween's `onUpdate`, and the RAF loop does `invalidate()` + `restart()` **every frame**. `refresh()` recalculates every trigger's start/end — this is a full layout pass per frame. Adding a scrubbed video on top of it is not survivable.
3. Only `wheel` is intercepted — keyboard (space/PgDn), scrollbar drag, and touch fall through to a document that can't scroll.
4. Mobile bails out entirely (`isMobile` early return), so desktop and mobile run two different scroll models.

**Action:** replace with Lenis (recommended) or the real GSAP `ScrollSmoother` plugin, and keep `features.smoothScroll` as the flag so the template contract doesn't change.

Lenis + ScrollTrigger wiring (the part everyone gets wrong — Lenis must drive GSAP's ticker or the two desync):

```tsx
// components/scroll/smooth-scroll-provider.tsx
"use client"
import { ReactLenis } from "lenis/react"
import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = (window as any).lenis
    if (!lenis) return
    lenis.on("scroll", ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(raf); lenis.off("scroll", ScrollTrigger.update) }
  }, [])

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, syncTouch: false }}>
      {children}
    </ReactLenis>
  )
}
```

`syncTouch: false` on purpose — smoothed touch scrolling feels wrong on iOS and costs you the platform's momentum physics. Let mobile scroll natively; ScrollTrigger still works.

Also worth adopting: `@gsap/react`'s `useGSAP()` hook for React-safe cleanup (auto-reverts on unmount, which matters a lot with pins in the App Router).

---

## 2. The three rendering strategies

### A. `<video>` + `currentTime` (baseline)

```ts
ScrollTrigger.create({
  trigger: section, start: "top top", end: "+=300%", pin: true, scrub: 0.6,
  onUpdate: (self) => { video.currentTime = self.progress * video.duration },
})
```

- **Pros:** 20 lines, streams progressively, no memory ceiling, works in every browser and in iOS low-power mode.
- **Cons:** seeking is *approximate* and its cost is entirely determined by keyframe density (§3). Firefox is the weak link.
- **Refinement:** don't set `currentTime` directly from `onUpdate`. Store a target and lerp toward it in a RAF loop — the browser coalesces seeks and it feels dramatically smoother:

```ts
let target = 0, current = 0
const tick = () => {
  current += (target - current) * 0.12
  if (Math.abs(target - current) > 0.001 && video.readyState >= 2) video.currentTime = current
  requestAnimationFrame(tick)
}
```

### B. Canvas image sequence (the Apple product-page method)

Preload N frames, `ctx.drawImage(frames[i])` on scroll progress. Frame-exact, no codec involved, trivially reversible.

- **Budget it hard:** 300 frames × 100KB = 30MB. Unshippable. Keep to **≤150 frames, ≤1440px wide, AVIF or WebP q60–70**, and it lands around 3–6MB.
- Use only where the beat is short and the visual is graphic/flat (product spins, logo builds, UI walkthroughs) — photographic footage compresses badly as stills.

### C. WebCodecs → `VideoFrame` → canvas (the 2026 method)

`VideoDecoder` decodes exactly the frames you need. Frame-exact scrubbing, forwards and backwards, at 4K if you want.

- **Support:** Chrome/Edge 94+, Safari 16.4+, Firefox 130+. Firefox for Android unsupported.
- **The catch:** buffer strategy is everything. Keep a sliding window of decoded frames around the playhead, `close()` frames you evict (`VideoFrame` holds GPU memory — leaking it will OOM a tab), and binary-search the keyframe index when seeking backwards. Required buffer size is a direct function of keyframe density, so §3 still applies.
- **iOS:** Low Power Mode can disable/throttle the path. You must have fallback A behind it.
- Reference implementations worth reading rather than depending on: `diffusionstudio/webcodecs-scroll-sync` (clean `FrameDecoder` + binary search + eviction), `benfoxall/scrub`, and `scrolly-video` (dkaoster) which ships all three strategies with automatic fallback — a good structural template even if you don't take the dependency.

**Recommendation:** ship A, feature-detect into C for the hero. Never ship C alone.

---

## 3. Encoding: the part that actually determines whether it feels good

A keyframe (I-frame) is a full image; delta frames only store differences. Most browsers **do not reconstruct delta frames while seeking** — they jump to the nearest keyframe. Default encodes put a keyframe every ~100 frames, which is why naive scrub video looks like a slideshow.

**Per-browser keyframe density (empirically established):**

| Browser | Needs |
|---|---|
| Safari (desktop) | Most forgiving — reconstructs deltas on the fly |
| Chrome / Edge | keyframe every ~5 frames |
| Firefox | keyframe every ~2 frames, and struggles with MP4 generally — ship WebM for it |
| iOS Safari | Good, but memory-constrained; keep resolution down |

**Cost:** every-frame keyframes ≈ **5× file size** vs. a normal encode. Every-5-frames is roughly 2.5–3×. That is the trade you are making.

**Recipes:**

```bash
# Scrub master — MP4/H.264, keyframe every 5 frames, web-optimized
ffmpeg -i input.mov \
  -vf "scale=1280:-2,fps=30" \
  -c:v libx264 -crf 24 -preset slow \
  -x264-params "keyint=5:min-keyint=5:scenecut=0" \
  -pix_fmt yuv420p -movflags +faststart -an out.scrub.mp4

# Firefox-friendly WebM/VP9, keyframe every 2 frames
ffmpeg -i input.mov \
  -vf "scale=1280:-2,fps=30" \
  -c:v libvpx-vp9 -crf 32 -b:v 0 -g 2 -an out.scrub.webm

# Absolute-smoothest (every frame is a keyframe) — only for very short beats
ffmpeg -i input.mov -c:v libx264 -crf 23 -g 1 -pix_fmt yuv420p -movflags +faststart -an out.allkey.mp4

# Poster (this is your LCP element — see §6)
ffmpeg -i input.mov -vframes 1 -q:v 2 poster.jpg && \
  cwebp -q 72 poster.jpg -o poster.webp
```

Non-negotiables: `-movflags +faststart` (moov atom first, or the browser can't seek until the whole file lands), `-pix_fmt yuv420p` (Safari won't decode 4:4:4), `-an` (audio is dead weight and blocks autoplay policies you don't need), and `scenecut=0` (otherwise x264 inserts its own keyframes and your density is non-uniform).

**Resolution discipline:** scrub at **1280px wide, 24–30fps**. It's a background behind a scrim and text — nobody's pixel-peeping, and you've just cut the decode cost ~2.25× vs 1080p. Ship a 640px variant for mobile via `<source media>`.

**Transparent overlay video** (if you want alpha-matted elements over the page): Safari needs **HEVC with alpha** in MP4/MOV; Chrome/Firefox need **VP9 with alpha** in WebM. Supply both and let the browser pick — Safari ignores WebM alpha and renders it on black. WebM-alpha support in Safari was announced in 2026 but hasn't landed.

---

## 4. The pattern catalog — sticky tricks worth stealing

Each of these is a section type that can plug into `components/section-renderer.tsx`.

1. **Pinned scrub hero** — pin a full-bleed video, `end: "+=300%"`, map progress → `currentTime`. Overlay copy that cross-fades on its own sub-timeline. The canonical move.
2. **Expanding video (clip-path portal)** — video starts as a small rounded card mid-page; on scroll it animates `clip-path: inset(Npx round R)` → `inset(0 round 0)` while scaling to fill the viewport, then starts scrubbing. Reverse it at the end to hand off to the next section. Animate `clip-path`, not `width/height` — it's compositor-friendly.
3. **Sticky card stack** — `position: sticky; top: calc(80px + var(--i) * 12px)` on each card, scaling down and dimming as the next one arrives. Pure CSS + one scrub tween. Zero pin overhead.
4. **Fixed video, sections scroll over it** — video is `position: fixed` at z-0 with a scrim; content sections scroll above with `backdrop-filter: blur()`. Cheapest "immersive" effect there is, and it's fully accessible.
5. **Horizontal panels** — pin a section, tween a flex row on x, and drive nested triggers with `containerAnimation` (the container tween **must** be `ease: "none"`). Great for process/timeline beats.
6. **Video-as-type** — text with `mix-blend-mode: difference` or `screen` over the footage, or `background-clip: text` with the video as a canvas-painted background. Reads as high-craft, costs almost nothing.
7. **Mask wipe transition** — the scrubbed hero ends by animating a `clip-path` circle/inset open to reveal the next section underneath, so the video *becomes* the transition instead of just ending.
8. **Velocity-reactive layers** — read `self.getVelocity()` and drive a skew/blur/chromatic offset that settles back to 0. Subtle, and it's the thing that makes a site feel physically real.
9. **Depth parallax** — 2–3 layers at different `scrub` values (0.3 / 0.8 / 1.4). Combined with a scrubbed video this reads as camera depth.
10. **Beat snapping** — `snap: { snapTo: "labels", duration: 0.4, ease: "power2.inOut" }` on a pinned timeline so the section rests on composed frames rather than anywhere the user happened to stop.

**GSAP pin vs. native sticky:** use native `position: sticky` whenever the element just needs to hold still (patterns 3, 4). Use `pin: true` when you need `pinSpacing`, an exact scroll range, or `containerAnimation`. Native sticky has no refresh cost, no spacer div, and no interaction with Lenis.

Useful ScrollTrigger config for this work: `anticipatePin: 1` (kills the flash of unpinned content at high scroll velocity), `invalidateOnRefresh: true` (recompute cached start values on resize), `fastScrollEnd` (force completion when the user rockets past), `pinType` (leave it alone unless nested scroller).

---

## 5. Gotchas that will cost you a day each

- **iOS autoplay:** `muted playsinline preload="metadata"` and no audio track, or it won't render inline. Poster is mandatory — iOS Safari doesn't paint the first frame otherwise.
- **iOS Low Power Mode** disables the WebCodecs path and throttles decode. Fallback is not optional.
- **Mobile address bar** show/hide resizes the viewport, ScrollTrigger recalculates, and pins jump. Mitigate with `ScrollTrigger.config({ ignoreMobileResize: true })` and/or `ScrollTrigger.normalizeScroll(true)` (which moves scrolling to the JS thread and stops the bar toggling). iOS portrait forces the toggle in recent versions and can't be fully worked around — design so a 60px viewport change doesn't matter, and use `dvh` not `vh`.
- **Fonts load after ScrollTrigger init** → wrong start/end. Call `ScrollTrigger.refresh()` in `document.fonts.ready`.
- **Next.js route changes** leave orphaned pins. `useGSAP()` handles revert; otherwise kill triggers on unmount.
- **`position: fixed` inside a transformed ancestor** becomes relative to that ancestor. Cover already documents this (`app/layout.tsx:132`) — it's why `<Navigation />` sits outside the wrapper. Lenis avoids the whole class of bug because it doesn't transform a wrapper.
- **`prefers-reduced-motion`:** hard requirement. Render the poster (or a mid-sequence frame), skip the pin entirely, let the section flow normally. Cover's `scroll-reveal.tsx` already has this pattern — match it.
- **Don't scrolljack.** Pin length should map roughly 1:1 to real scroll distance. `end: "+=300%"` for a 10s clip is about right; `+=1000%` is a hostage situation.
- **Memory:** never decode 4K into a frame buffer. 1280px @ 30fps, 150-frame window ≈ 220MB of raw RGBA if uncompressed — close your `VideoFrame`s.

---

## 6. Performance budget

- **The poster image is the LCP element. Always.** Video is progressive enhancement. `fetchpriority="high"`, `<link rel="preload" as="image">`, WebP/AVIF, never `loading="lazy"`.
- Video `preload="none"` until an IntersectionObserver activates it — otherwise it competes with the poster for bandwidth and tanks LCP.
- Budget: poster ≤80KB, hero scrub clip ≤4MB desktop / ≤1.5MB mobile, total page JS delta for the scroll system ≤35KB gzip (Lenis ~3KB + ScrollTrigger ~12KB + glue).
- Dynamic-import the scrub component; it should never be in the initial bundle.
- Watch INP: the scroll handler must do nothing but write a number. All work goes in the RAF loop.

---

## 7. Art-directing the AI footage (Higgsfield / Runway / Veo 3.1 / Kling 3.0 / Seedance 2.0)

Higgsfield is an aggregation layer over ~15 models rather than a model, and it has a purpose-built looping background generator; Runway is a single coherent model. The 2026 norm is multi-model, chosen per shot. But the model matters less than the brief, and the brief for scrub video is unusual:

**Rules for scrub-friendly generation:**

1. **Camera motion only, subject static.** A slow dolly-in, orbit, crane, or drift. Content that *morphs* (faces, hands, text, crowds) will reveal AI flicker the moment a user scrubs backwards. This is the #1 rule.
2. **No cuts, no shot changes.** One continuous take. A cut mid-scrub reads as a broken site.
3. **Linear, constant-velocity motion.** Ease is applied by ScrollTrigger, not baked into the footage. Baked ease + scroll ease = mush.
4. **Compose for the scrim.** You'll be laying text over it. Ask for a dark, low-detail region (usually lower-left or center) with the interest in the opposite third. Generate with generous headroom.
5. **Low-frequency detail.** Fog, liquid, cloth, light, macro textures, abstract geometry compress well and hide artifacts. Fine repeating texture (foliage, crowds, text) both balloons the bitrate and flickers.
6. **Loopable if it loops:** first frame ≈ last frame. Higgsfield's background generator does this natively; otherwise generate a push-in and mirror it, or crossfade the tail with the head in post.
7. **Duration 6–12s.** At 30fps that's 180–360 frames, which is the right amount of material for a 300% pin. Longer = wasted bytes; shorter = visible stepping.
8. **Generate above delivery res** (1080p+) and downscale to 1280px — downscaling averages away generation noise and buys you bitrate.
9. **Shoot two crops.** A 16:9 master and a 9:16 (or center-safe) mobile variant. `object-fit: cover` on a 16:9 clip in a portrait viewport throws away the composition.
10. **Grade in post.** A shared LUT + light grain across every clip is what makes a set of AI shots look like one film instead of five prompts. Grain also masks banding in flat gradients — which scrub video is full of.

**Prompt skeleton:**
> Slow continuous [dolly-in / orbit left / crane up] through [subject], locked exposure, no cuts, single take, constant speed, [cinematic lighting descriptor], shallow depth of field, dark negative space in the [left third / lower half], no text, no people, no camera shake, 10 seconds

---

## 8. Proposed shape on cover

```
components/scroll/
  smooth-scroll-provider.tsx   # Lenis + gsap.ticker; replaces scroll-smoother.tsx
  use-scrub-progress.ts        # ScrollTrigger pin → lerped 0..1, reduced-motion aware
  scrub-video.tsx              # strategy A + feature-detected C, poster, sources, a11y
  sticky-stack.tsx             # native sticky card stack
  clip-reveal.tsx              # expanding-video / mask-wipe primitive
  horizontal-panels.tsx        # pin + containerAnimation
components/sections/
  scrub-hero-section.tsx       # new section type
  scrub-story-section.tsx      # pinned beats with copy
scripts/
  encode-scrub-video.mjs       # ffmpeg pipeline: master → mp4/webm/poster/mobile variants
```

Config lives in `site.config.ts` next to the existing `features` block; sections register in `section-renderer.tsx` exactly like the current ones (dynamic-imported, since none of this should be in the initial bundle).

**Order of work:** (1) swap the scroll engine and verify existing reveals still fire, (2) build the encode script and generate one real clip, (3) `scrub-video.tsx` with strategy A only, (4) the pin/choreography primitives, (5) WebCodecs enhancement last.

---

## 9. Sources

- [ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) · [GSAP 3.13 release](https://gsap.com/blog/3-13/) · [Webflow makes GSAP 100% free](https://webflow.com/blog/gsap-becomes-free) · [normalizeScroll](https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.normalizeScroll()/)
- [Scrubbing videos using JavaScript — Muffin Man](https://muffinman.io/blog/scrubbing-videos-using-javascript/) (keyframe density per browser)
- [Smooth Scrubbing Web Video FFMPEG gist](https://gist.github.com/jeffpamer/f3134c5145238d0fd4752221b2d75eb7)
- [ScrollyVideo.js](https://scrollyvideo.js.org/) · [dkaoster/scrolly-video](https://github.com/dkaoster/scrolly-video) (three-strategy fallback)
- [diffusionstudio/webcodecs-scroll-sync](https://github.com/diffusionstudio/webcodecs-scroll-sync) · [benfoxall/scrub](https://github.com/benfoxall/scrub) · [WebCodecs — MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API) · [Video processing with WebCodecs — Chrome](https://developer.chrome.com/docs/web-platform/best-practices/webcodecs)
- [Apple-style scroll animations — CSS-Tricks](https://css-tricks.com/lets-make-one-of-those-fancy-scrolling-animations-used-on-apple-product-pages/)
- [Video with alpha transparency on the web — Jake Archibald](https://jakearchibald.com/2024/video-with-transparency/) · [Transparent videos for the web 2026 — Rotato](https://rotato.app/blog/transparent-videos-for-the-web)
- [The Hero Video Dilemma: video, LCP and posters](https://mintec.co/blog/video-lcp-hero-performance-2026/)
- [Next.js smooth scrolling with Lenis & GSAP (2026)](https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap)
- [Scroll-driven animation timelines — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines) · [Intro to CSS scroll-driven animations — Smashing](https://www.smashingmagazine.com/2024/12/introduction-css-scroll-driven-animations/)
- [Higgsfield AI background video generator](https://higgsfield.ai/ai-background-video-generator) · [Best AI video generators 2026](https://higgsfield.ai/blog/best-ai-video-generators-2026)
- [Expandable video block with GSAP — Bogdan Bendziukov](https://medium.com/@bogdanfromkyiv/expandable-video-block-with-gsap-6b4b4cea98c4) · [Awwwards: clip-path scroll animation with sticky layout](https://www.awwwards.com/inspiration/clip-path-scroll-animation-with-sticky-layout-balans-kitchen-1)
