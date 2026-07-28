import { LINES } from "@/components/page-kit"

export interface DonutSegment {
  label: string
  value: number
  hint?: string
  /** Override the auto-assigned color. */
  color?: string
}

interface DonutChartProps {
  /** Segments; values are shown as given (any consistent unit). */
  segments: DonutSegment[]
  eyebrow?: string
  title?: string
  subtitle?: string
  /** Big label in the donut's center (e.g. "$1", "100%"). */
  centerLabel?: string
  /** Small caption under the center label. */
  centerCaption?: string
  /** Suffix rendered after each value in the legend (e.g. "¢", "%"). */
  valueSuffix?: string
  className?: string
}

// Auto colors: full accent for the first segment, then progressively lighter
// accent mixes so the chart reads as one system without a config.
const AUTO_COLORS = [
  "var(--accent)",
  "color-mix(in srgb, var(--accent) 45%, transparent)",
  "color-mix(in srgb, var(--accent) 20%, transparent)",
  ...LINES.slice(1),
]

/** Pure-SVG donut chart with a legend; no charting library. */
export function DonutChart({
  segments,
  eyebrow,
  title,
  subtitle,
  centerLabel,
  centerCaption,
  valueSuffix = "",
  className = "",
}: DonutChartProps) {
  const total = segments.reduce((s, x) => s + x.value, 0)
  const radius = 70
  const circ = 2 * Math.PI * radius

  let offset = 0
  const arcs = segments.map((s, i) => {
    const length = (s.value / total) * circ
    const arc = { ...s, length, offset, color: s.color ?? AUTO_COLORS[i % AUTO_COLORS.length] }
    offset += length
    return arc
  })

  return (
    <div
      className={`rounded-2xl border p-6 md:p-8 ${className}`}
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
    >
      {eyebrow && (
        <div
          className="text-xs font-semibold uppercase tracking-[0.2em] mb-2"
          style={{ color: "var(--accent)" }}
        >
          {eyebrow}
        </div>
      )}
      {title && (
        <h3
          className="text-xl md:text-2xl mb-2"
          style={{ fontFamily: "var(--font-heading)", color: "var(--fg)", letterSpacing: "-0.01em" }}
        >
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="text-sm leading-relaxed max-w-xl mb-8" style={{ color: "var(--fg-muted)" }}>
          {subtitle}
        </p>
      )}

      <div className="grid sm:grid-cols-[180px_1fr] gap-6 items-center">
        <div className="relative w-[180px] h-[180px] mx-auto sm:mx-0">
          <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
            <circle
              cx={100}
              cy={100}
              r={radius}
              fill="none"
              stroke="color-mix(in srgb, var(--fg) 6%, transparent)"
              strokeWidth={28}
            />
            {arcs.map((a, i) => (
              <circle
                key={i}
                cx={100}
                cy={100}
                r={radius}
                fill="none"
                stroke={a.color}
                strokeWidth={28}
                strokeDasharray={`${a.length} ${circ - a.length}`}
                strokeDashoffset={-a.offset}
                strokeLinecap="butt"
              />
            ))}
          </svg>
          {(centerLabel || centerCaption) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {centerLabel && (
                <div className="text-3xl font-bold" style={{ color: "var(--fg)" }}>
                  {centerLabel}
                </div>
              )}
              {centerCaption && (
                <div
                  className="text-[10px] tracking-[0.15em] uppercase font-semibold"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {centerCaption}
                </div>
              )}
            </div>
          )}
        </div>

        <ul className="space-y-3">
          {arcs.map((a) => (
            <li key={a.label} className="flex items-start gap-3">
              <span
                className="inline-block w-3 h-3 rounded-sm mt-1.5 flex-shrink-0"
                style={{ backgroundColor: a.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                    {a.label}
                  </span>
                  <span className="text-sm font-bold tabular-nums" style={{ color: "var(--fg)" }}>
                    {a.value}
                    {valueSuffix}
                  </span>
                </div>
                {a.hint && (
                  <p className="text-xs leading-relaxed mt-0.5" style={{ color: "var(--fg-muted)" }}>
                    {a.hint}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
