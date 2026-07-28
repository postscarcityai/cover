// Approximate US state grid layout. Rows/cols correspond to a tilemap where each
// state gets a uniform-size cell. Coordinates picked so neighboring states cluster
// reasonably. AK/HI are corners; DC sits beside MD; New England stacks on the
// right-hand column so no two states share a cell.
type Coord = [number, number]

const STATE_LAYOUT: Record<string, { name: string; pos: Coord }> = {
  AK: { name: "Alaska", pos: [0, 0] },
  ME: { name: "Maine", pos: [0, 11] },
  VT: { name: "Vermont", pos: [1, 10] },
  NH: { name: "New Hampshire", pos: [1, 11] },
  WA: { name: "Washington", pos: [1, 1] },
  ID: { name: "Idaho", pos: [1, 2] },
  MT: { name: "Montana", pos: [1, 3] },
  ND: { name: "North Dakota", pos: [1, 4] },
  MN: { name: "Minnesota", pos: [1, 5] },
  IL: { name: "Illinois", pos: [1, 6] },
  WI: { name: "Wisconsin", pos: [1, 6.5] },
  MI: { name: "Michigan", pos: [1, 7] },
  NY: { name: "New York", pos: [1, 8] },
  MA: { name: "Massachusetts", pos: [2, 11] },
  OR: { name: "Oregon", pos: [2, 1] },
  UT: { name: "Utah", pos: [2, 2] },
  WY: { name: "Wyoming", pos: [2, 3] },
  SD: { name: "South Dakota", pos: [2, 4] },
  IA: { name: "Iowa", pos: [2, 5] },
  IN: { name: "Indiana", pos: [2, 6] },
  OH: { name: "Ohio", pos: [2, 7] },
  PA: { name: "Pennsylvania", pos: [2, 8] },
  NJ: { name: "New Jersey", pos: [2, 9] },
  CT: { name: "Connecticut", pos: [3, 10] },
  RI: { name: "Rhode Island", pos: [3, 11] },
  CA: { name: "California", pos: [3, 1] },
  NV: { name: "Nevada", pos: [3, 2] },
  CO: { name: "Colorado", pos: [3, 3] },
  NE: { name: "Nebraska", pos: [3, 4] },
  MO: { name: "Missouri", pos: [3, 5] },
  KY: { name: "Kentucky", pos: [3, 6] },
  WV: { name: "West Virginia", pos: [3, 7] },
  VA: { name: "Virginia", pos: [3, 8] },
  MD: { name: "Maryland", pos: [3, 9] },
  DE: { name: "Delaware", pos: [3, 9.5] },
  AZ: { name: "Arizona", pos: [4, 2] },
  NM: { name: "New Mexico", pos: [4, 3] },
  KS: { name: "Kansas", pos: [4, 4] },
  AR: { name: "Arkansas", pos: [4, 5] },
  TN: { name: "Tennessee", pos: [4, 6] },
  NC: { name: "North Carolina", pos: [4, 7] },
  SC: { name: "South Carolina", pos: [4, 8] },
  DC: { name: "DC", pos: [4, 9] },
  HI: { name: "Hawaii", pos: [5, 1] },
  OK: { name: "Oklahoma", pos: [5, 3] },
  LA: { name: "Louisiana", pos: [5, 4] },
  MS: { name: "Mississippi", pos: [5, 5] },
  AL: { name: "Alabama", pos: [5, 6] },
  GA: { name: "Georgia", pos: [5, 7] },
  TX: { name: "Texas", pos: [6, 3] },
  FL: { name: "Florida", pos: [6, 7] },
}

interface UsTileMapProps {
  /** State codes that are active/covered. Wins over `inactive`. */
  active?: string[]
  /** State codes that are NOT active. Use when most states are active. */
  inactive?: string[]
  eyebrow?: string
  /** Heading; `{count}` is replaced with the active-state count. */
  title?: string
  activeLabel?: string
  inactiveLabel?: string
  /** Optional footnote under the map (e.g. what to do in inactive states). */
  footnote?: string
  /** Accessible label for the SVG. */
  ariaLabel?: string
  className?: string
}

/** Pure-SVG US tile cartogram — "where we operate" style availability maps. */
export function UsTileMap({
  active,
  inactive,
  eyebrow = "Availability",
  title = "Available in {count} states + DC.",
  activeLabel = "Available",
  inactiveLabel = "Not available",
  footnote,
  ariaLabel = "US state availability map",
  className = "",
}: UsTileMapProps) {
  const allCodes = Object.keys(STATE_LAYOUT)
  const activeSet = new Set(active?.map((c) => c.toUpperCase()))
  const inactiveSet = new Set(inactive?.map((c) => c.toUpperCase()))

  const isActive = (code: string) => {
    if (active && active.length > 0) return activeSet.has(code)
    if (inactive && inactive.length > 0) return !inactiveSet.has(code)
    return true
  }

  const activeCount = allCodes.filter(isActive).length

  const cellSize = 38
  const gap = 4
  const rows = 7
  const cols = 12
  const w = cols * (cellSize + gap)
  const h = rows * (cellSize + gap)

  return (
    <div
      className={`rounded-2xl border p-6 md:p-8 ${className}`}
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
    >
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <div
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-2"
            style={{ color: "var(--accent)" }}
          >
            {eyebrow}
          </div>
          <h3
            className="text-xl md:text-2xl"
            style={{ fontFamily: "var(--font-heading)", color: "var(--fg)", letterSpacing: "-0.01em" }}
          >
            {title.replace("{count}", String(activeCount))}
          </h3>
        </div>
        <ul className="flex items-center gap-4 text-xs" style={{ color: "var(--fg-muted)" }}>
          <li className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ backgroundColor: "var(--accent)" }}
            />
            {activeLabel}
          </li>
          <li className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ backgroundColor: "color-mix(in srgb, var(--fg) 8%, transparent)" }}
            />
            {inactiveLabel}
          </li>
        </ul>
      </div>

      <div className="overflow-x-auto -mx-2 px-2">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="w-full h-auto"
          style={{ maxWidth: "100%" }}
          role="img"
          aria-label={ariaLabel}
        >
          {allCodes.map((code) => {
            const { pos } = STATE_LAYOUT[code]
            const [row, col] = pos
            const x = col * (cellSize + gap)
            const y = row * (cellSize + gap)
            const on = isActive(code)
            return (
              <g key={code}>
                <rect
                  x={x}
                  y={y}
                  width={cellSize}
                  height={cellSize}
                  rx={6}
                  fill={on ? "var(--accent)" : "color-mix(in srgb, var(--fg) 8%, transparent)"}
                >
                  <title>
                    {STATE_LAYOUT[code].name}, {on ? activeLabel : inactiveLabel}
                  </title>
                </rect>
                <text
                  x={x + cellSize / 2}
                  y={y + cellSize / 2 + 4}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={600}
                  fill={on ? "var(--accent-fg)" : "var(--fg)"}
                  opacity={on ? 1 : 0.5}
                  style={{ pointerEvents: "none" }}
                >
                  {code}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {footnote && (
        <p className="mt-5 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
          {footnote}
        </p>
      )}
    </div>
  )
}
