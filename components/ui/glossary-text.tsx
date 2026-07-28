import { Fragment, type ReactNode } from "react"
import { GlossaryTooltip } from "./glossary-tooltip"
import glossaryData from "@/lib/glossary.json"

type GlossaryEntry = { term: string; short: string; definition?: string; aliases?: string[] }
const GLOSSARY = glossaryData as Record<string, GlossaryEntry>

/**
 * [matchText, slug] pairs sorted LONGEST-FIRST, so multi-word terms win over
 * their substrings at a shared start. Aliases (e.g. "SLA") come from each
 * entry's `aliases` array in lib/glossary.json.
 */
const MATCHERS: { text: string; slug: string }[] = []
for (const [slug, entry] of Object.entries(GLOSSARY)) {
  MATCHERS.push({ text: entry.term, slug })
  for (const alias of entry.aliases ?? []) MATCHERS.push({ text: alias, slug })
}
MATCHERS.sort((a, b) => b.text.length - a.text.length)

const SLUG_BY_TEXT = new Map(MATCHERS.map((m) => [m.text.toLowerCase(), m.slug]))
const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

// \b(term|term|…)s?\b — whole-word, case-insensitive, optional plural. Kept as a
// SOURCE string (not a shared RegExp): a `g`-flag regex carries mutable
// lastIndex, and React's concurrent rendering interleaves wrapString calls — a
// shared instance corrupts mid-iteration. Each call builds its own below.
const PATTERN_SOURCE =
  MATCHERS.length > 0 ? `\\b(${MATCHERS.map((m) => escapeRegExp(m.text)).join("|")})(s?)\\b` : null

/** Split one string into text + <GlossaryTooltip> nodes (every occurrence). */
function wrapString(text: string, keyPrefix: string): ReactNode[] {
  if (!PATTERN_SOURCE) return [text]
  const pattern = new RegExp(PATTERN_SOURCE, "gi") // fresh per call — concurrency-safe
  const out: ReactNode[] = []
  let last = 0
  let i = 0
  let m: RegExpExecArray | null
  while ((m = pattern.exec(text)) !== null) {
    const slug = SLUG_BY_TEXT.get(m[1].toLowerCase())
    if (!slug) continue // unmatched stays plain text via the next slice
    if (m.index > last) out.push(text.slice(last, m.index))
    out.push(
      <GlossaryTooltip key={`${keyPrefix}-${i}`} term={slug}>
        {m[0]}
      </GlossaryTooltip>,
    )
    last = m.index + m[0].length
    i++
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

function process(node: ReactNode, keyPrefix: string): ReactNode {
  if (typeof node === "string") return wrapString(node, keyPrefix)
  if (Array.isArray(node)) {
    return node.map((child, idx) => (
      <Fragment key={idx}>{process(child, `${keyPrefix}-${idx}`)}</Fragment>
    ))
  }
  return node // numbers, elements, null — passed through untouched
}

/**
 * Auto-wraps glossary terms in its text children with a hover tooltip
 * (glossary-tooltip.tsx). EVERY occurrence is wrapped. Only plain string text
 * is processed — nested elements (links, <strong>, …) pass through untouched,
 * so it's safe to drop around mixed body copy. With an empty glossary it's a
 * pass-through no-op.
 *
 * Use around BODY / PROSE copy only — not headings, buttons, nav, or labels.
 */
export function GlossaryText({ children }: { children: ReactNode }) {
  return <>{process(children, "gt")}</>
}
