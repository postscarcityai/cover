"use client"

import { useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"

export interface GalleryImage {
  category: string
  label: string
  slug: string
  prompt: string
  path: string
}

export interface GallerySection {
  id: string
  title: string
  blurb: string
  items: GalleryImage[]
}

export interface GalleryGroup {
  id: string
  title: string
  sections: GallerySection[]
  defaultOpen?: boolean
}

// Prefix for localStorage keys and the TSV download filename — override via
// the storagePrefix prop if a fork wants its own namespace.
const DEFAULT_PREFIX = "cover"

// Prompt text clamped to ~3 lines with a per-image expand toggle (not persisted).
function PromptText({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <p
        className={`text-xs leading-relaxed ${open ? "" : "line-clamp-3"}`}
        style={{ color: "var(--fg-muted)" }}
      >
        {text}
      </p>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mt-1 text-xs font-semibold"
        style={{ color: "var(--accent)" }}
      >
        {open ? "Show less" : "Show more"}
      </button>
    </>
  )
}

function sanitizeCell(v: string): string {
  return (v ?? "").replace(/[\t\r\n]+/g, " ").trim()
}

export function StyleGuideGallery({
  groups,
  storagePrefix = DEFAULT_PREFIX,
}: {
  groups: GalleryGroup[]
  storagePrefix?: string
}) {
  const COLLAPSE_KEY = `${storagePrefix}-styleguide-collapse-v1`
  const SELECT_KEY = `${storagePrefix}-styleguide-selected-v1`
  const [active, setActive] = useState<GalleryImage | null>(null)

  // Defaults: major groups CLOSED, image sets OPEN.
  const [groupOpen, setGroupOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(groups.map((g) => [g.id, g.defaultOpen ?? false])),
  )
  const [sectionOpen, setSectionOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(groups.flatMap((g) => g.sections.map((s) => [s.id, true]))),
  )
  // Selection state (persisted), keyed by image path.
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [hydrated, setHydrated] = useState(false)
  const [copied, setCopied] = useState(false)

  // Restore saved collapse + selection state after mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(COLLAPSE_KEY)
      if (raw) {
        const saved = JSON.parse(raw) as {
          groups?: Record<string, boolean>
          sections?: Record<string, boolean>
        }
        if (saved.groups) setGroupOpen((prev) => ({ ...prev, ...saved.groups }))
        if (saved.sections) setSectionOpen((prev) => ({ ...prev, ...saved.sections }))
      }
    } catch {
      /* ignore */
    }
    try {
      const rawSel = localStorage.getItem(SELECT_KEY)
      if (rawSel) setSelected(JSON.parse(rawSel) as Record<string, boolean>)
    } catch {
      /* ignore */
    }
    setHydrated(true)
  }, [])

  // Persist collapse state.
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(COLLAPSE_KEY, JSON.stringify({ groups: groupOpen, sections: sectionOpen }))
    } catch {
      /* ignore */
    }
  }, [groupOpen, sectionOpen, hydrated])

  // Persist selection state.
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(SELECT_KEY, JSON.stringify(selected))
    } catch {
      /* ignore */
    }
  }, [selected, hydrated])

  // Close the lightbox on Escape, and lock body scroll while it's open.
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null)
    }
    window.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [active])

  const toggleSelect = (path: string) =>
    setSelected((prev) => {
      const next = { ...prev }
      if (next[path]) delete next[path]
      else next[path] = true
      return next
    })

  const isSelected = (path: string) => !!selected[path]
  const countIn = (items: GalleryImage[]) => items.filter((i) => selected[i.path]).length
  const totalSelected = useMemo(
    () => Object.values(selected).filter(Boolean).length,
    [selected],
  )

  // Build TSV of the selected images, in display order.
  const buildTSV = () => {
    const header = ["Style", "Set", "Name", "Category", "File", "Prompt"]
    const rows: string[] = [header.join("\t")]
    for (const group of groups) {
      for (const sec of group.sections) {
        for (const item of sec.items) {
          if (!selected[item.path]) continue
          rows.push(
            [
              sanitizeCell(group.title),
              sanitizeCell(sec.title),
              sanitizeCell(item.label),
              sanitizeCell(item.category),
              sanitizeCell(item.path),
              sanitizeCell(item.prompt),
            ].join("\t"),
          )
        }
      }
    }
    return rows.join("\n")
  }

  const copyTSV = async () => {
    if (totalSelected === 0) return
    const tsv = buildTSV()
    try {
      await navigator.clipboard.writeText(tsv)
    } catch {
      // Fallback for non-secure contexts.
      const ta = document.createElement("textarea")
      ta.value = tsv
      ta.style.position = "fixed"
      ta.style.opacity = "0"
      document.body.appendChild(ta)
      ta.select()
      try {
        document.execCommand("copy")
      } catch {
        /* ignore */
      }
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const downloadTSV = () => {
    if (totalSelected === 0) return
    const blob = new Blob([buildTSV()], { type: "text/tab-separated-values;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${storagePrefix}-style-selections.tsv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearSelection = () => setSelected({})

  const btnBase =
    "text-sm font-semibold px-4 py-2 rounded-lg border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"

  const Chevron = ({ open }: { open: boolean }) => (
    <span
      aria-hidden
      className="inline-block transition-transform duration-200"
      style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
    >
      ▸
    </span>
  )

  return (
    <>
      {/* Sticky export toolbar */}
      <div
        className="sticky top-0 z-30 border-b px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-4"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--fg-muted)" }}>
            <strong style={{ color: "var(--fg)" }}>Make your picks.</strong> Click any image to
            enlarge; use the checkbox (top-left of each tile) to select the ones you like. Selected
            counts show on each set even when collapsed. When you&apos;re done, export your picks —
            the file includes the prompt for every selected image so we can iterate straight from
            your choices.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
              {totalSelected} selected
            </span>
            <button
              type="button"
              onClick={copyTSV}
              disabled={totalSelected === 0}
              className={btnBase}
              style={{ borderColor: "var(--border)", color: "var(--fg)", backgroundColor: "var(--bg)" }}
            >
              {copied ? "Copied!" : "Copy TSV"}
            </button>
            <button
              type="button"
              onClick={downloadTSV}
              disabled={totalSelected === 0}
              className={btnBase}
              style={{ borderColor: "transparent", color: "#fff", backgroundColor: "var(--accent)" }}
            >
              Download TSV
            </button>
            <button
              type="button"
              onClick={clearSelection}
              disabled={totalSelected === 0}
              className={btnBase}
              style={{ borderColor: "var(--border)", color: "var(--fg-muted)", backgroundColor: "transparent" }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {groups.map((group, groupIdx) => {
        if (group.sections.length === 0) return null
        const gOpen = groupOpen[group.id] ?? false
        const gSelected = group.sections.reduce((n, s) => n + countIn(s.items), 0)
        return (
          <div
            key={group.id}
            className="border-b"
            style={{
              borderColor: "var(--border)",
              backgroundColor: groupIdx % 2 === 0 ? "var(--bg)" : "var(--surface)",
            }}
          >
            <button
              type="button"
              aria-expanded={gOpen}
              onClick={() => setGroupOpen((p) => ({ ...p, [group.id]: !gOpen }))}
              className="w-full text-left cursor-pointer select-none px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-8 flex items-center gap-4"
            >
              <span className="text-lg" style={{ color: "var(--accent)" }}>
                <Chevron open={gOpen} />
              </span>
              <h2
                className="text-2xl md:text-3xl font-bold"
                style={{ fontFamily: "var(--font-heading)", color: "var(--fg)", letterSpacing: "-0.02em" }}
              >
                {group.title}
              </h2>
              <span className="text-sm" style={{ color: "var(--fg-muted)" }}>
                {group.sections.length} set{group.sections.length > 1 ? "s" : ""}
              </span>
              {gSelected > 0 && (
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ color: "#fff", backgroundColor: "var(--accent)" }}
                >
                  {gSelected} selected
                </span>
              )}
            </button>

            {gOpen && (
              <div className="pb-6">
                {group.sections.map((sec, secIdx) => {
                  const sOpen = sectionOpen[sec.id] ?? true
                  const sSelected = countIn(sec.items)
                  return (
                    <div key={sec.id}>
                      <button
                        type="button"
                        aria-expanded={sOpen}
                        onClick={() => setSectionOpen((p) => ({ ...p, [sec.id]: !sOpen }))}
                        className="w-full text-left cursor-pointer select-none px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-5 flex items-start gap-4"
                      >
                        <span className="mt-1" style={{ color: "var(--fg-muted)" }}>
                          <Chevron open={sOpen} />
                        </span>
                        <div className="max-w-3xl">
                          <p
                            className="text-xs tracking-[0.3em] uppercase mb-2 font-semibold flex items-center gap-3"
                            style={{ color: "var(--accent)" }}
                          >
                            <span>
                              {String(secIdx + 1).padStart(2, "0")} — {sec.items.length} option
                              {sec.items.length > 1 ? "s" : ""}
                            </span>
                            {sSelected > 0 && (
                              <span
                                className="normal-case tracking-normal px-2 py-0.5 rounded-full"
                                style={{ color: "#fff", backgroundColor: "var(--accent)" }}
                              >
                                {sSelected} selected
                              </span>
                            )}
                          </p>
                          <h3
                            className="text-xl md:text-2xl font-bold mb-2"
                            style={{ fontFamily: "var(--font-heading)", color: "var(--fg)", letterSpacing: "-0.02em" }}
                          >
                            {sec.title}
                          </h3>
                          <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                            {sec.blurb}
                          </p>
                        </div>
                      </button>

                      {sOpen && (
                        <div className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 pb-10 pt-2">
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {sec.items.map((item) => {
                              const sel = isSelected(item.path)
                              return (
                                <figure
                                  key={item.path}
                                  className="relative rounded-2xl overflow-hidden border"
                                  style={{
                                    borderColor: sel ? "var(--accent)" : "var(--border)",
                                    boxShadow: sel ? "0 0 0 2px var(--accent)" : "none",
                                    backgroundColor: "var(--bg)",
                                  }}
                                >
                                  <button
                                    type="button"
                                    onClick={() => setActive(item)}
                                    className="relative block w-full aspect-[4/3] cursor-zoom-in"
                                    aria-label={`Open ${item.label}`}
                                  >
                                    <Image
                                      src={item.path}
                                      alt={item.label}
                                      fill
                                      className="object-cover transition-opacity hover:opacity-90"
                                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => toggleSelect(item.path)}
                                    aria-pressed={sel}
                                    aria-label={sel ? `Deselect ${item.label}` : `Select ${item.label}`}
                                    className="absolute top-2 left-2 z-10 w-8 h-8 rounded-md flex items-center justify-center text-base font-bold border"
                                    style={{
                                      backgroundColor: sel ? "var(--accent)" : "rgba(255,255,255,0.85)",
                                      borderColor: sel ? "var(--accent)" : "var(--border)",
                                      color: sel ? "#fff" : "var(--fg-muted)",
                                    }}
                                  >
                                    {sel ? "✓" : ""}
                                  </button>
                                  <figcaption className="p-4">
                                    <div className="font-semibold mb-1" style={{ color: "var(--fg)" }}>
                                      {item.label}
                                    </div>
                                    <PromptText text={item.prompt} />
                                  </figcaption>
                                </figure>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}

      {active &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={active.label}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-8"
            style={{ backgroundColor: "rgba(8, 11, 20, 0.92)" }}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-4 right-5 text-3xl leading-none"
              style={{ color: "#fff" }}
            >
              ×
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.path}
              alt={active.label}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[78vh] max-w-[92vw] object-contain rounded-lg shadow-2xl cursor-default"
            />
            <div onClick={(e) => e.stopPropagation()} className="mt-4 flex items-center gap-4 cursor-default">
              <div className="font-semibold" style={{ color: "#fff" }}>
                {active.label}
              </div>
              <button
                type="button"
                onClick={() => toggleSelect(active.path)}
                className="text-sm font-semibold px-4 py-2 rounded-lg border"
                style={{
                  backgroundColor: isSelected(active.path) ? "var(--accent)" : "transparent",
                  borderColor: isSelected(active.path) ? "var(--accent)" : "rgba(255,255,255,0.4)",
                  color: "#fff",
                }}
              >
                {isSelected(active.path) ? "✓ Selected" : "Select"}
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
