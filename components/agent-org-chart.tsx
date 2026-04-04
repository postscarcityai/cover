"use client"

import { useEffect, useState, useCallback } from "react"

/* ------------------------------------------------------------------ */
/*  Agent definitions                                                   */
/* ------------------------------------------------------------------ */

interface Agent {
  id: string
  label: string
  icon: string
  role: string
  x: number   // percentage position
  y: number
}

const agents: Agent[] = [
  { id: "orchestrator", label: "Orchestrator", icon: "⚡", role: "Routes tasks", x: 50, y: 8 },
  { id: "leads",   label: "Lead Gen",    icon: "🎯", role: "Scans & enriches",  x: 16, y: 40 },
  { id: "content", label: "Content",     icon: "✏️", role: "Writes & publishes", x: 50, y: 40 },
  { id: "intel",   label: "Intel",       icon: "🔍", role: "Research & briefs",  x: 84, y: 40 },
  { id: "ops",     label: "Ops",         icon: "⚙️", role: "CRM & workflows",   x: 28, y: 75 },
  { id: "deploy",  label: "Deploy",      icon: "🚀", role: "Ships & monitors",  x: 72, y: 75 },
]

/* ------------------------------------------------------------------ */
/*  Task flow definitions (from → to)                                  */
/* ------------------------------------------------------------------ */

interface TaskFlow {
  from: string
  to: string
  label: string
}

const taskFlows: TaskFlow[] = [
  { from: "orchestrator", to: "leads",   label: "scan Miami med-spas" },
  { from: "orchestrator", to: "content", label: "draft blog post" },
  { from: "orchestrator", to: "intel",   label: "competitor report" },
  { from: "leads",        to: "ops",     label: "138 leads → CRM" },
  { from: "content",      to: "deploy",  label: "publish to site" },
  { from: "intel",        to: "orchestrator", label: "brief ready" },
  { from: "orchestrator", to: "deploy",  label: "push landing page" },
  { from: "ops",          to: "orchestrator", label: "pipeline update" },
  { from: "deploy",       to: "orchestrator", label: "deploy complete" },
  { from: "orchestrator", to: "leads",   label: "enrich Austin contacts" },
  { from: "leads",        to: "content", label: "case study data" },
  { from: "content",      to: "orchestrator", label: "draft review" },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AgentOrgChart() {
  const [activeFlow, setActiveFlow] = useState(-1)
  const [prevFlows, setPrevFlows] = useState<number[]>([])

  const advance = useCallback(() => {
    setActiveFlow((prev) => {
      const next = (prev + 1) % taskFlows.length
      setPrevFlows((pf) => {
        const updated = [...pf, prev].filter((v) => v >= 0)
        return updated.slice(-2) // keep last 2 as fading trails
      })
      return next
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(advance, 1200) // first task
    const interval = setInterval(advance, 2400)
    return () => { clearTimeout(timer); clearInterval(interval) }
  }, [advance])

  const getAgent = (id: string) => agents.find((a) => a.id === id)!

  return (
    <div className="aoc-wrap">
      <svg className="aoc-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Static connection lines */}
        {[
          ["orchestrator", "leads"],
          ["orchestrator", "content"],
          ["orchestrator", "intel"],
          ["leads", "ops"],
          ["content", "deploy"],
          ["intel", "deploy"],
          ["ops", "orchestrator"],
          ["deploy", "orchestrator"],
        ].map(([fromId, toId]) => {
          const from = getAgent(fromId)
          const to = getAgent(toId)
          return (
            <line
              key={`${fromId}-${toId}`}
              x1={from.x} y1={from.y}
              x2={to.x} y2={to.y}
              className="aoc-line"
            />
          )
        })}
      </svg>

      {/* Animated task packets */}
      {activeFlow >= 0 && (
        <TaskPacket
          key={`active-${activeFlow}`}
          flow={taskFlows[activeFlow]}
          state="active"
        />
      )}
      {prevFlows.map((idx, i) => (
        <TaskPacket
          key={`trail-${idx}-${i}`}
          flow={taskFlows[idx]}
          state="fading"
        />
      ))}

      {/* Agent nodes */}
      {agents.map((agent) => {
        const isSource = activeFlow >= 0 && taskFlows[activeFlow].from === agent.id
        const isTarget = activeFlow >= 0 && taskFlows[activeFlow].to === agent.id
        return (
          <div
            key={agent.id}
            className={`aoc-node ${isSource ? "aoc-node--source" : ""} ${isTarget ? "aoc-node--target" : ""}`}
            style={{ left: `${agent.x}%`, top: `${agent.y}%` }}
          >
            <span className="aoc-node-icon">{agent.icon}</span>
            <span className="aoc-node-label">{agent.label}</span>
            <span className="aoc-node-role">{agent.role}</span>
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Task packet (animated dot moving between agents)                   */
/* ------------------------------------------------------------------ */

function TaskPacket({ flow, state }: { flow: TaskFlow; state: "active" | "fading" }) {
  const from = agents.find((a) => a.id === flow.from)!
  const to = agents.find((a) => a.id === flow.to)!

  return (
    <div
      className={`aoc-packet ${state === "fading" ? "aoc-packet--fade" : ""}`}
      style={{
        "--from-x": `${from.x}%`,
        "--from-y": `${from.y}%`,
        "--to-x": `${to.x}%`,
        "--to-y": `${to.y}%`,
      } as React.CSSProperties}
    >
      <span className="aoc-packet-label">{flow.label}</span>
    </div>
  )
}
