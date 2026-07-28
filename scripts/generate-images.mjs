/**
 * Style-guide image generator (fal.ai).
 *
 * Usage:
 *   FAL_KEY=xxx node scripts/generate-images.mjs            # generate everything missing
 *   FAL_KEY=xxx node scripts/generate-images.mjs --only=hero
 *   FAL_KEY=xxx node scripts/generate-images.mjs --slug=hero-01-black-woman
 *   FAL_KEY=xxx node scripts/generate-images.mjs --smoke    # one cheap test image only
 *   FAL_KEY=xxx node scripts/generate-images.mjs --force    # re-generate even if file exists
 *
 * Reads FAL_KEY from the environment or .env.local. Writes JPEGs to
 * public/img/style-guide/<category>/<slug>.jpg and a manifest.json that the
 * /style-guide review page reads.
 *
 * ── ARCHITECTURE ───────────────────────────────────────────────────────
 * This file is the ENGINE. Brand knobs (color words, overlay pattern,
 * casting) and the subject catalog live in scripts/image-style.config.mjs —
 * a fork re-skins there and never edits this file.
 *
 * Prompts are assembled from named CLAUSES so every register derives from
 * one source of truth (no frozen literals, no fragile string .replace).
 * Two registers exist: prismatic duotone PEOPLE on a dark field, and flat
 * 2D GLASS icons on white. Repeating background patterns are NOT drawn by
 * the model (it can't make a regular lattice) — images generate on a clean
 * field and scripts/pattern-overlay.mjs bakes the pattern in afterward.
 * Model is locked to Nano Banana 2 — never flux.
 */
import { fal } from "@fal-ai/client"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"
import { compositePattern, FADE_EVEN } from "./pattern-overlay.mjs"
import { IMAGE_STYLE, SUBJECTS } from "./image-style.config.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "..")
const OUT_DIR = join(ROOT, "public", "img", "style-guide")

// ---- load FAL_KEY from .env.local if not already in env ----
if (!process.env.FAL_KEY) {
  try {
    const env = readFileSync(join(ROOT, ".env.local"), "utf8")
    const m = env.match(/^\s*FAL_KEY\s*=\s*(.+)\s*$/m)
    if (m) process.env.FAL_KEY = m[1].trim().replace(/^["']|["']$/g, "")
  } catch {}
}
if (!process.env.FAL_KEY) {
  console.error("Missing FAL_KEY. Add it to .env.local or pass FAL_KEY=...")
  process.exit(1)
}
fal.config({ credentials: process.env.FAL_KEY })

const { photo, icon, casting } = IMAGE_STYLE

// ── PHOTO CLAUSES — the prismatic duotone people register ────────────────
// Compose registers by joining clauses; never patch prompts with .replace.

const HERO_FRAME =
  "a premium editorial brand-campaign hero banner, wide 16:9 cinematic crop, art-directed and intentional, magazine-cover production value"

const RENDER_DUOTONE = `the subject rendered as a refined MONOTONE / DUOTONE portrait in a palette of ${photo.paletteWords} — tonal and sculpted by light, NOT a flat posterization and NOT a hard cutout`

// Stricter variant for the hero rotation: absolutely no natural skin tones.
const RENDER_DUOTONE_STRICT = `the subject rendered as a refined MONOTONE / DUOTONE portrait in a palette of ${photo.paletteWords} — tonal and sculpted by light, strictly a DESATURATED TWO-TONE duotone with NO natural skin tones and NO full color, NOT a flat posterization and NOT a hard cutout`

const DISSOLVE =
  "the figure emerges from the darkness and DISSOLVES softly back into the background, with feathered, melting edges and the lower body fading into shadow, integrated into the field rather than pasted on — no white outline, no sticker edge, no halo border"

const FACE_IS_HERO =
  "the face is the brightest, sharpest point — clearly lit, in focus, a genuine warm smile and a catch-light in the eyes, authentic and candid, not a stiff stock pose"

const COMPOSE_RIGHT_THIRD = `composed strongly off-center with the subject anchored to the RIGHT third and a wide expanse of deep, even, near-black ${photo.fieldWords} negative space on the LEFT reserved for a white headline, framed from the chest or waist up bleeding off the bottom edge, grounded and confident, generous breathing room`

// Homepage hero rotation: closer to center, FULL head and torso in frame
// (the hero renders bg-top, so the head must never crop at the top edge).
const COMPOSE_CENTERED_FULL = `composed CENTERED-LEANING — the subject placed just right of the middle of the frame, close to center and NOT pushed to the right third — with open, even, darker ${photo.fieldWords} negative space on the LEFT reserved for a white headline; framed to show the FULL HEAD AND TORSO, from comfortable headroom ABOVE the head down to the waist, the ENTIRE head in frame and NOT cropped at the top, head, shoulders and torso all clearly visible, grounded and confident, generous breathing room`

const COMPOSE_CENTERED_BG =
  "composed CENTERED and immersive, framed from the chest up; kept deliberately dark and even overall so a dark overlay and centered white text reads cleanly on top"

// The model always draws a CLEAN field — patterns are composited afterward
// by scripts/pattern-overlay.mjs (see file header).
const FIELD_CLEAN =
  "set against a deep slate-grey and dark navy field carrying NO mesh, NO grid, NO pattern and NO texture — a clean, smooth field — and a soft VOLUMETRIC back-glow behind the subject that separates them by light rather than by line"

const PRISM_LIGHT = `the whole scene kissed by PRISMATIC LIGHTING focused on ${photo.prismWords} — a soft refracted spectrum dispersing from a single light source, delicate chromatic-aberration glints, and a restrained TOUCH of IRIDESCENT oil-slick sheen (${photo.sheenWords}) that freshens without overwhelming`

const FINISH_CINEMATIC =
  "finished with a cinematic color grade, gentle highlight halation and bloom, a fine tasteful film grain, and shallow atmospheric depth, tactile and dimensional"

const NEGATIVES =
  "restrained and premium, NOT neon, NOT garish, NOT busy, NOT cartoony, NOT sci-fi, no cosmos, no planets, no stars, no duplicated or phantom figures, no extra people, the negative space kept dark and clear, no text, no logos, no watermark"

const join_ = (...clauses) => clauses.filter(Boolean).join("; ")

// ── PHOTO REGISTERS ──────────────────────────────────────────────────────

/** Right-anchored editorial hero (subpage heroes; left space for headline). */
const heroRight = (cast) =>
  `${cast}, three-quarter view with a warm genuine smile, set against a clean, smooth ${photo.fieldWords} field with no mesh and no pattern, ${join_(
    HERO_FRAME, RENDER_DUOTONE, DISSOLVE, FACE_IS_HERO, COMPOSE_RIGHT_THIRD,
    FIELD_CLEAN, PRISM_LIGHT, FINISH_CINEMATIC, casting, NEGATIVES,
  )}`

/** Homepage hero rotation: centered-leaning, full head + torso, strict duotone. */
const heroCentered = (cast) =>
  `${cast}, three-quarter view with a warm genuine smile, set against a clean, smooth ${photo.fieldWords} field with no mesh and no pattern, ${join_(
    HERO_FRAME, RENDER_DUOTONE_STRICT, DISSOLVE, FACE_IS_HERO, COMPOSE_CENTERED_FULL,
    FIELD_CLEAN, PRISM_LIGHT, FINISH_CINEMATIC, casting, NEGATIVES,
  )}`

/** Centered single subject for a full-bleed section background under text. */
const bgCentered = (cast) =>
  `${cast}, ${join_(
    RENDER_DUOTONE, DISSOLVE, COMPOSE_CENTERED_BG, FIELD_CLEAN, PRISM_LIGHT,
    FINISH_CINEMATIC, NEGATIVES,
  )}`

/** Exactly two people, centered, for a closing-CTA background. */
const coupleCentered = (cast) =>
  `${cast}, exactly two people standing close together and no one else, ${join_(
    RENDER_DUOTONE, DISSOLVE, COMPOSE_CENTERED_BG, FIELD_CLEAN, PRISM_LIGHT,
    FINISH_CINEMATIC, NEGATIVES,
  )}`

/** Square (1:1) portrait accent for in-card use. */
const portraitSquare = (cast) =>
  `${cast}, head and shoulders, composed CENTERED in a square frame with generous breathing room, ${join_(
    RENDER_DUOTONE, DISSOLVE, FACE_IS_HERO, FIELD_CLEAN, PRISM_LIGHT,
    FINISH_CINEMATIC, NEGATIVES,
  )}`

/** Abstract field — no people — for faint full-section backdrops. */
const abstractField = () =>
  `a deep slate-grey and dark navy field, clean and smooth with NO mesh, NO grid and NO pattern, washed by soft prismatic ${photo.prismWords.toLowerCase()} light and a faint iridescent oil-slick sheen, with a soft volumetric glow, very low contrast, smooth and even, atmospheric and understated, no bright hotspots, no harsh highlights, no focal point, no subject, no people, no figures, no objects, premium and restrained, full-bleed wallpaper, cinematic color grade, fine soft film grain, dark throughout, not neon, not busy, no cosmos, no text, no logos, no watermark`

/** Dark text-safe gradient wash (no pattern, no subject). */
const darkWash = (description) =>
  `${description}, smooth and even, deep dark navy and slate-grey only, a smooth subtle gradient, soft and dreamy, very low contrast, even and muted, atmospheric and understated, no bright hotspots, no harsh highlights, no glow, no focal point, no subject, no people, no figures, no objects, no shapes that compete with text, designed as a calm dark background for white HTML text to sit on top and stay perfectly readable, faint soft film grain, premium and restrained, full-bleed wallpaper, dark throughout, not bright, not neon, not busy, not light, no text, no logos, no watermark`

// ── ICON CLAUSES — the flat 2D glass register ────────────────────────────

const ICON_FLAT_2D =
  "rendered as a clean, modern FLAT 2D icon with a translucent frosted-GLASS look (glassmorphism) — strictly FRONT-FACING and FLAT, NO 3D, NO perspective, NO dimensional render, NO cast shadow, simple confident rounded geometric forms"

const ICON_FILL = `the silhouette filled with a mostly SOLID, even fill of ${icon.fillWords} — only a gentle, subtle gradient (NOT a strong multi-color gradient), a soft frosted transparency and a thin bright highlight along one edge, with only a faint trace of iridescence`

const ICON_COMPOSE = "ONE icon CENTERED with generous empty space around it"

const ICON_BG_OFFWHITE =
  "set against a CLEAN, BRIGHT, NEARLY-WHITE background — a soft cool off-white, even and minimal, NOT dark, NOT navy, NOT a tile"

const ICON_BG_PURE_WHITE =
  "set against a PURE SOLID WHITE #ffffff background — flat pure white, even and minimal, NOT off-white, NOT grey, NOT dark, NOT navy, NOT a tile"

const ICON_NEGATIVES =
  "crisp, premium and refined like a high-end glassmorphism UI icon; NOT a 3D clay render, NOT photorealistic, NOT a sticker with a solid white outline border, NOT cartoony, NOT neon, no busy detail, no cosmos, no text, no logos, no watermark"

/** Style-guide exploration icon (soft off-white bg, faint glow allowed). */
const glassIcon = (subject) =>
  `${subject}, ${join_(ICON_FLAT_2D, `${ICON_FILL}, a faint inner glow`, ICON_COMPOSE, ICON_BG_OFFWHITE, ICON_NEGATIVES)}`

/** Production icon: NO glow, pure #ffffff bg — sits flush on white cards. */
const glassIconProd = (subject) =>
  `${subject}, ${join_(ICON_FLAT_2D, `${ICON_FILL}, NO glow and NO halo`, ICON_COMPOSE, ICON_BG_PURE_WHITE, ICON_NEGATIVES)}`

// ── CATALOG — assembled from SUBJECTS (image-style.config.mjs) ───────────

const SAMPLE_REGISTERS = {
  heroRight,
  bgCentered,
  portrait: portraitSquare,
}

/** @type {{category:string,label:string,slug:string,prompt:string,aspect?:string,resolution?:string,featured?:boolean,patternOverlay?:string|null,overlayOpts?:object}[]} */
export const PROMPTS = [
  // Homepage hero rotation (lib/hero-images.ts) — one per overlay pattern.
  ...SUBJECTS.hero.map(([slug, label, cast, pattern]) => ({
    category: "hero", label, slug, aspect: "16:9", resolution: "2K",
    prompt: heroCentered(cast),
    patternOverlay: pattern,
    overlayOpts: { fade: [[0.0, 0.4], [0.5, 0.65], [1.0, 0.9]] },
  })),

  // Register samples for /style-guide review.
  ...SUBJECTS.samples.map(([slug, label, register, cast, pattern]) => ({
    category: "samples", label, slug,
    aspect: register === "portrait" ? "1:1" : "16:9",
    resolution: register === "portrait" ? "1K" : "2K",
    prompt: SAMPLE_REGISTERS[register](cast),
    patternOverlay: pattern,
    ...(register === "bgCentered" ? { overlayOpts: { fade: FADE_EVEN } } : {}),
  })),

  // Flat 2D glass icons (production recipe).
  ...SUBJECTS.icons.map(([slug, label, subject]) => ({
    category: "icons", label, slug, aspect: "1:1", resolution: "1K",
    prompt: glassIconProd(subject),
  })),

  // Dark text-safe backgrounds.
  ...SUBJECTS.backgrounds.map(([slug, label, description]) => ({
    category: "bg-dark", label, slug, aspect: "16:9", resolution: "2K",
    prompt: darkWash(description),
  })),

  // Full-section backdrops (components/section-backdrop.tsx demos).
  ...SUBJECTS.backdrops.map(([slug, label, kind, cast, pattern]) => ({
    category: "backdrops", label, slug, aspect: "16:9", resolution: kind === "field" ? "1K" : "2K",
    prompt: kind === "couple" ? coupleCentered(cast) : abstractField(),
    patternOverlay: pattern,
    overlayOpts: { fade: FADE_EVEN },
    // The abstract field has no subject to cut out.
    ...(kind === "field" ? { noSubjectMask: true } : {}),
  })),
]

const DEFAULT_MODEL = "fal-ai/nano-banana-2"
const DEFAULT_ASPECT = "4:3"
const DEFAULT_RESOLUTION = "1K"

const args = process.argv.slice(2)
const force = args.includes("--force")
const smoke = args.includes("--smoke")
const only = (args.find((a) => a.startsWith("--only=")) || "").split("=")[1]
const slugFilter = (args.find((a) => a.startsWith("--slug=")) || "").split("=")[1]

async function falImage(item) {
  const result = await fal.subscribe(item.model || DEFAULT_MODEL, {
    input: {
      prompt: item.prompt,
      num_images: 1,
      aspect_ratio: item.aspect || DEFAULT_ASPECT,
      resolution: item.resolution || DEFAULT_RESOLUTION,
      output_format: "jpeg",
    },
    logs: false,
  })
  const url = result?.data?.images?.[0]?.url
  if (!url) throw new Error("no image url returned")
  return Buffer.from(await (await fetch(url)).arrayBuffer())
}

// Subject cutout (background removal) → greyscale alpha mask (white = subject).
// Used to keep the composited pattern strictly in the background, off the person.
async function subjectMask(baseBuf) {
  const url = await fal.storage.upload(new Blob([baseBuf], { type: "image/jpeg" }))
  const res = await fal.subscribe("fal-ai/birefnet/v2", { input: { image_url: url }, logs: false })
  const outUrl = res?.data?.image?.url
  if (!outUrl) throw new Error("birefnet: no image url returned")
  const cut = Buffer.from(await (await fetch(outUrl)).arrayBuffer())
  return sharp(cut).extractChannel(3).png().toBuffer()
}

async function generateOne(item) {
  const dir = join(OUT_DIR, item.category)
  mkdirSync(dir, { recursive: true })
  const file = join(dir, `${item.slug}.jpg`)
  const result = { ...item, path: `/img/style-guide/${item.category}/${item.slug}.jpg` }

  // Pattern-overlay items: cache the clean (pattern-free) base from the model,
  // then bake in the perfect pattern. With the base cached, re-running WITHOUT
  // --force recomposites the pattern for free (no image generation) — tune away.
  if (item.patternOverlay) {
    const baseFile = join(dir, `${item.slug}.base.jpg`)
    const maskFile = join(dir, `${item.slug}.mask.png`)
    let baseBuf
    let freshBase = false
    if (existsSync(baseFile) && !force) {
      baseBuf = readFileSync(baseFile)
      console.log(`  base (cached): ${item.category}/${item.slug}`)
    } else {
      process.stdout.write(`  gen: ${item.category}/${item.slug} (clean base) ... `)
      baseBuf = await falImage(item)
      writeFileSync(baseFile, baseBuf)
      freshBase = true
      console.log("ok")
    }
    // Subject cutout — regenerate when the base is new (or forced/missing),
    // otherwise reuse so pattern tuning stays free of any generation calls.
    let maskBuf = null
    if (!item.noSubjectMask) {
      if (existsSync(maskFile) && !force && !freshBase) {
        maskBuf = readFileSync(maskFile)
        console.log(`  mask (cached): ${item.category}/${item.slug}`)
      } else {
        process.stdout.write(`  cutout: ${item.category}/${item.slug} ... `)
        maskBuf = await subjectMask(baseBuf)
        writeFileSync(maskFile, maskBuf)
        console.log("ok")
      }
    }
    process.stdout.write(`  pattern(${item.patternOverlay}): ${item.category}/${item.slug} ... `)
    writeFileSync(
      file,
      await compositePattern(baseBuf, {
        pattern: item.patternOverlay,
        ...(maskBuf ? { subjectMask: maskBuf } : {}),
        ...item.overlayOpts,
      }),
    )
    console.log("ok")
    return result
  }

  if (existsSync(file) && !force) {
    console.log(`  skip (exists): ${item.category}/${item.slug}`)
    return result
  }
  process.stdout.write(`  gen: ${item.category}/${item.slug} ... `)
  writeFileSync(file, await falImage(item))
  console.log("ok")
  return result
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true })

  if (smoke) {
    console.log("Smoke test: generating one image to verify FAL_KEY ...")
    await generateOne({
      category: "samples", label: "Smoke test", slug: "_smoke-test",
      aspect: "1:1", resolution: "1K",
      prompt: glassIconProd(SUBJECTS.icons[0][2]),
    })
    console.log("FAL_KEY works.")
    return
  }

  let list = PROMPTS
  if (only) list = list.filter((p) => p.category === only)
  if (slugFilter) list = list.filter((p) => p.slug === slugFilter)

  console.log(`Generating ${list.length} image(s) -> ${OUT_DIR}`)
  for (const item of list) {
    try {
      await generateOne(item)
    } catch (e) {
      console.error(`  FAILED ${item.slug}: ${e.message}`)
    }
  }

  // Rewrite manifest.json from the catalog (the /style-guide page reads this).
  const manifestPath = join(OUT_DIR, "manifest.json")
  const full = PROMPTS.map((p) => ({
    category: p.category,
    label: p.label,
    slug: p.slug,
    prompt: p.prompt,
    featured: Boolean(p.featured),
    path: `/img/style-guide/${p.category}/${p.slug}.jpg`,
    exists: existsSync(join(OUT_DIR, p.category, `${p.slug}.jpg`)),
  }))
  writeFileSync(manifestPath, JSON.stringify(full, null, 2))
  console.log(`Wrote manifest: ${manifestPath}`)
}

// Only generate when run directly (so the catalog can be imported for tooling).
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => {
    console.error(e)
    process.exit(1)
  })
}
