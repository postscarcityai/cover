/**
 * Image-style config — the single re-skin surface for the image pipeline.
 *
 * Everything a fork changes to re-brand the generated imagery lives here:
 * the color LANGUAGE fed into prompts (natural-language words, not hex — the
 * model reads words), the pattern-overlay defaults, and the demo subject
 * catalog. The engine (scripts/generate-images.mjs) never needs editing.
 *
 * The imagery palette is deliberately decoupled from the CSS theme
 * (theme.config.ts): site chrome stays light while the dark fields live
 * inside the artwork. Swap the words below, delete public/img/style-guide,
 * and re-run `npm run images` to re-skin.
 *
 * See docs/brand-guides/image-style-guide.md for the full art direction.
 */

export const IMAGE_STYLE = {
  photo: {
    /** Duotone palette clause for people imagery. */
    paletteWords: "slate grey, deep navy and azure blue",
    /** "PRISMATIC LIGHTING focused on ..." — the light color. */
    prismWords: "BLUE and AZURE",
    /** The iridescent-sheen parenthetical. */
    sheenWords: "blue-leaning, with the faintest whispers of cyan and teal",
    /** The dark negative-space field color words. */
    fieldWords: "slate-navy",
  },
  icon: {
    /** Near-solid fill of the flat 2D glass icons. */
    fillWords: "deep COBALT and royal BLUE with subtle sapphire undertones",
  },
  /**
   * Pattern-overlay defaults (scripts/pattern-overlay.mjs). The pattern is
   * composited AFTER generation — models can't draw a mathematically regular
   * lattice — so re-running without --force re-composites for free.
   * pattern: "hex" | "dots" | "waves" (or extend PATTERNS in the overlay).
   */
  overlay: {
    pattern: "hex",
    stroke: "#d8e4ff", // cool blue-white, sits in the prismatic light
    opacity: 0.5,
  },
  /** Casting guardrail appended to every people prompt. */
  casting:
    "casting reflects the demographic makeup of the general United States population, including people of color",
}

/**
 * Demo subject catalog. Generic DTC-business subjects that demo every
 * register without any industry coupling — replace wholesale for a real brand.
 * Tuple shapes are documented per group; the engine maps them into PROMPTS.
 */
export const SUBJECTS = {
  // Homepage hero rotation (lib/hero-images.ts): centered composition, full
  // head + torso. One entry per pattern to demo the whole overlay suite.
  // [slug, label, casting, pattern]
  hero: [
    ["hero-01-black-woman", "Hero — Black woman (30s)", "a happy, confident Black woman in her 30s", "hex"],
    ["hero-02-white-man", "Hero — white man (40s)", "a happy, confident white man in his 40s", "dots"],
    ["hero-03-latina-woman", "Hero — Latina woman (50s)", "a happy, confident Latina / Hispanic woman in her 50s", "waves"],
  ],

  // One sample per photo register for /style-guide review.
  // [slug, label, register, casting, pattern|null]
  samples: [
    ["sample-hero-right", "Right-anchored hero", "heroRight", "a happy, confident South Asian woman in her 40s", "hex"],
    ["sample-bg-centered", "Centered section background", "bgCentered", "a warm, trustworthy advisor in their 40s with a reassuring genuine smile", "dots"],
    ["sample-portrait", "Square portrait accent", "portrait", "a person in their 30s with a warm, curious, thoughtful expression", null],
  ],

  // Flat 2D glass icons (production recipe: no glow, pure white bg).
  // [slug, label, subject]
  icons: [
    ["icon-shield", "Shield + check — trust", "a rounded shield with a checkmark at its center, symbol of protection and trust"],
    ["icon-chart", "Chart — growth", "a simple bar chart with an upward trending arrow, symbol of growth and progress"],
    ["icon-calendar", "Calendar — scheduling", "a clean calendar page with a highlighted date, symbol of scheduling and planning"],
    ["icon-chat", "Chat — support", "a rounded speech bubble with three dots, symbol of conversation and support"],
    ["icon-lightbulb", "Lightbulb — clarity", "a single lightbulb, the moment a confusing idea suddenly becomes clear, symbol of insight"],
    ["icon-compass", "Compass — guidance", "a compass with its needle pointing the way forward, symbol of guidance and direction"],
    ["icon-rocket", "Rocket — launch", "a simple rounded rocket lifting off, symbol of launching something new"],
    ["icon-handshake", "Handshake — partnership", "two hands meeting in a firm friendly handshake, symbol of partnership and agreement"],
    ["icon-padlock", "Padlock — security", "a rounded closed padlock, symbol of security and privacy"],
    ["icon-medal", "Medal — quality", "a round medal with a ribbon and a star at its center, symbol of quality and achievement"],
  ],

  // Dark text-safe backgrounds — no subject, even enough for white text.
  // [slug, label, description]
  backgrounds: [
    ["bg-vertical", "Calm vertical wash", "a calm vertical wash from dark slate-grey at the top easing into deep navy at the bottom"],
    ["bg-drift", "Soft diagonal drift", "a soft diagonal gradient drifting from deep navy in one corner into dark slate-grey in the other"],
  ],

  // Full-section backdrops (components/section-backdrop.tsx demos).
  // [slug, label, kind, castingOrNull, pattern]
  backdrops: [
    ["backdrop-field", "Abstract field + waves", "field", null, "waves"],
    ["backdrop-closing-cta", "Closing CTA — couple", "couple", "a hopeful young couple of two different ethnicities standing close together and looking forward with quiet optimism", "hex"],
  ],
}
