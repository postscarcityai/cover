#!/usr/bin/env node
/**
 * Encode a source clip into the full scrub-video asset set.
 *
 *   node scripts/encode-scrub-video.mjs input.mov [--out public/video] [--name hero]
 *
 * Produces, from one master:
 *
 *   <name>.scrub.mp4         1280px H.264, keyframe every 5   — desktop baseline
 *   <name>.scrub.webm        1280px VP9,   keyframe every 2   — Firefox
 *   <name>.mobile.scrub.mp4   640px H.264, keyframe every 5
 *   <name>.mobile.scrub.webm  640px VP9,   keyframe every 2
 *   <name>.poster.webp        first frame                     — the LCP element
 *
 * ---------------------------------------------------------------------------
 * Why keyframe density is the whole game
 *
 * A keyframe (I-frame) is a full image; delta frames store only differences.
 * Most browsers do NOT reconstruct deltas while seeking — they jump to the
 * nearest keyframe. Default encodes place one every ~100 frames, which is
 * exactly why naive scrub video looks like a slideshow: the playhead lands
 * between keyframes and snaps back to the last one.
 *
 * Empirical per-browser requirements:
 *   Safari desktop  most forgiving, reconstructs deltas on the fly
 *   Chrome / Edge   keyframe every ~5 frames
 *   Firefox         keyframe every ~2 frames, and struggles with MP4 — ship WebM
 *   iOS Safari      fine, but memory-constrained — keep resolution down
 *
 * The cost is real: every-frame keyframes run ~5x a normal encode's file size,
 * every-5 about 2.5-3x. That is the trade being made deliberately.
 * ---------------------------------------------------------------------------
 */

import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, rmSync, statSync } from "node:fs"
import { basename, extname, join } from "node:path"

const NON_NEGOTIABLE = {
  // moov atom first. Without it the browser cannot seek until the entire file
  // has downloaded — which defeats the whole feature.
  faststart: ["-movflags", "+faststart"],
  // Safari will not decode 4:4:4.
  pixfmt: ["-pix_fmt", "yuv420p"],
  // Audio is dead weight and drags in autoplay policies we don't need.
  noaudio: ["-an"],
}

function parseArgs(argv) {
  const [input] = argv.filter((a) => !a.startsWith("--"))
  if (!input) {
    console.error("usage: node scripts/encode-scrub-video.mjs <input> [--out DIR] [--name NAME] [--fps N] [--width N]")
    process.exit(1)
  }
  const flag = (name, fallback) => {
    const i = argv.indexOf(`--${name}`)
    return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback
  }
  return {
    input,
    out: flag("out", "public/video"),
    name: flag("name", basename(input, extname(input))),
    // 24-30fps is the band. Higher just multiplies keyframes.
    fps: Number(flag("fps", 30)),
    // Resolution discipline: this is a background behind a scrim. 1280 cuts
    // decode cost ~2.25x versus 1080p and nobody is pixel-peeping it.
    width: Number(flag("width", 1280)),
    mobileWidth: Number(flag("mobile-width", 640)),
  }
}

function run(args, label) {
  process.stdout.write(`  ${label} ... `)
  try {
    execFileSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...args], {
      stdio: ["ignore", "ignore", "pipe"],
    })
    console.log("ok")
  } catch (err) {
    console.log("FAILED")
    console.error(String(err.stderr ?? err.message))
    process.exit(1)
  }
}

function h264(input, output, width, fps) {
  return [
    "-i", input,
    "-vf", `scale=${width}:-2,fps=${fps}`,
    "-c:v", "libx264",
    "-crf", "24",
    "-preset", "slow",
    // scenecut=0 matters: without it x264 inserts its own keyframes at scene
    // changes and the density becomes non-uniform, so scrub smoothness varies
    // unpredictably across the clip.
    "-x264-params", "keyint=5:min-keyint=5:scenecut=0",
    ...NON_NEGOTIABLE.pixfmt,
    ...NON_NEGOTIABLE.faststart,
    ...NON_NEGOTIABLE.noaudio,
    output,
  ]
}

function vp9(input, output, width, fps) {
  return [
    "-i", input,
    "-vf", `scale=${width}:-2,fps=${fps}`,
    "-c:v", "libvpx-vp9",
    "-crf", "32",
    "-b:v", "0",
    // -g 2 — Firefox wants a keyframe every ~2 frames.
    "-g", "2",
    ...NON_NEGOTIABLE.noaudio,
    output,
  ]
}

/**
 * Poster extraction.
 *
 * This image is the LCP element on any page using a scrub hero — the video is
 * always the enhancement — so it is worth getting right rather than skipping.
 *
 * ffmpeg is only used to pull the frame, because `-c:v libwebp` is a build
 * option and plenty of ffmpeg installs (including Homebrew's default) lack it.
 * sharp does the WebP encode instead; it is already a devDependency of this
 * template for the image pipeline, so this adds nothing to install.
 */
async function writePoster(input, output, width) {
  process.stdout.write(`  poster webp   ${width}px ... `)
  const tmpPng = join(out, ".poster-frame.png")
  try {
    execFileSync(
      "ffmpeg",
      ["-y", "-hide_banner", "-loglevel", "error", "-i", input, "-vf", `scale=${width}:-2`, "-vframes", "1", tmpPng],
      { stdio: ["ignore", "ignore", "pipe"] }
    )
    const { default: sharp } = await import("sharp")
    await sharp(tmpPng).webp({ quality: 72 }).toFile(output)
    rmSync(tmpPng, { force: true })

    const kb = statSync(output).size / 1024
    console.log(`ok (${kb.toFixed(0)}KB)`)
    if (kb > 80) {
      console.log(`    ! over the 80KB poster budget — lower --width or the quality`)
    }
  } catch (err) {
    rmSync(tmpPng, { force: true })
    console.log("FAILED")
    console.error(String(err.stderr ?? err.message))
    process.exit(1)
  }
}

const { input, out, name, fps, width, mobileWidth } = parseArgs(process.argv.slice(2))

if (!existsSync(input)) {
  console.error(`input not found: ${input}`)
  process.exit(1)
}
mkdirSync(out, { recursive: true })

const p = (suffix) => join(out, `${name}.${suffix}`)

console.log(`\nEncoding ${input} -> ${out}/${name}.*\n`)

run(h264(input, p("scrub.mp4"), width, fps), `desktop mp4   ${width}px keyint=5`)
run(vp9(input, p("scrub.webm"), width, fps), `desktop webm  ${width}px g=2`)
run(h264(input, p("mobile.scrub.mp4"), mobileWidth, fps), `mobile mp4    ${mobileWidth}px keyint=5`)
run(vp9(input, p("mobile.scrub.webm"), mobileWidth, fps), `mobile webm   ${mobileWidth}px g=2`)
await writePoster(input, p("poster.webp"), width)

/** Filesystem path -> the URL the browser will request. */
function webPath(suffix) {
  const full = join(out, `${name}.${suffix}`)
  const stripped = full.startsWith("public/") ? full.slice("public/".length) : full
  return `/${stripped}`
}

console.log(`
Done. Wire it up:

  <ScrubHeroSection
    sources={{
      mp4:        "${webPath("scrub.mp4")}",
      webm:       "${webPath("scrub.webm")}",
      mp4Mobile:  "${webPath("mobile.scrub.mp4")}",
      webmMobile: "${webPath("mobile.scrub.webm")}",
      poster:     "${webPath("poster.webp")}",
    }}
    alt="..."
    headline="..."
  />

Budget check: poster <=80KB, desktop clip <=4MB, mobile clip <=1.5MB.
`)
