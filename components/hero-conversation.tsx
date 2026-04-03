"use client"

import { useEffect, useState, useCallback } from "react"

/* ------------------------------------------------------------------ */
/*  Conversation data — longer threads                                 */
/* ------------------------------------------------------------------ */

interface ToolCall {
  name: string
  result?: string
}

interface Message {
  role: "user" | "ai"
  text?: string
  toolCall?: ToolCall
  delay: number
}

interface Conversation {
  messages: Message[]
}

const conversations: Conversation[] = [
  {
    messages: [
      { role: "user", text: "How many users signed up last night?", delay: 0 },
      { role: "ai", toolCall: { name: "query_signups", result: "47 new users" }, delay: 1200 },
      { role: "ai", text: "47 new signups — 32% above your 7-day average. Biggest spike from the LinkedIn campaign around 11 PM.", delay: 2400 },
      { role: "user", text: "Nice. Where are they coming from geographically?", delay: 4200 },
      { role: "ai", toolCall: { name: "geo_breakdown", result: "12 regions mapped" }, delay: 5200 },
      { role: "ai", text: "Top three: Miami (14), Austin (8), and NYC (6). The rest are scattered across 9 other metros. Want me to push this to the dashboard?", delay: 6400 },
      { role: "user", text: "Yes, and flag anyone from Austin for the outbound team.", delay: 8000 },
      { role: "ai", toolCall: { name: "tag_leads", result: "8 contacts flagged" }, delay: 9000 },
      { role: "ai", text: "Done. Tagged all 8 Austin signups and notified the outbound channel in Slack.", delay: 10000 },
    ],
  },
  {
    messages: [
      { role: "user", text: "Draft a follow-up email for the Heathos proposal.", delay: 0 },
      { role: "ai", toolCall: { name: "read_proposal", result: "Heathos SOW v2 loaded" }, delay: 1200 },
      { role: "ai", toolCall: { name: "draft_email", result: "Email drafted" }, delay: 2200 },
      { role: "ai", text: "Done — referenced the SOW timeline and their Q3 budget. Send it or drop it in drafts?", delay: 3200 },
      { role: "user", text: "Drop it in drafts. Also pull their last 3 emails so I can skim the tone.", delay: 4800 },
      { role: "ai", toolCall: { name: "search_email", result: "3 threads found" }, delay: 5800 },
      { role: "ai", text: "Found three threads from the last month. Matt's been casual and direct — short paragraphs, first-name basis, no formalities. I matched that tone in the draft.", delay: 7000 },
      { role: "user", text: "Perfect. Schedule it for 8 AM tomorrow.", delay: 8600 },
      { role: "ai", toolCall: { name: "schedule_send", result: "Queued for 8:00 AM" }, delay: 9400 },
      { role: "ai", text: "Scheduled. You'll get a confirmation ping when it sends.", delay: 10200 },
    ],
  },
  {
    messages: [
      { role: "user", text: "What's our pipeline looking like this month?", delay: 0 },
      { role: "ai", toolCall: { name: "crm_pipeline_report", result: "$184K across 12 deals" }, delay: 1200 },
      { role: "ai", text: "$184K across 12 active deals. Three in final negotiation — Apex, Meridian, and that SaaS startup from last week's intro.", delay: 2400 },
      { role: "user", text: "What's the probability on Apex closing this month?", delay: 4000 },
      { role: "ai", toolCall: { name: "deal_analysis", result: "Apex: 78% confidence" }, delay: 5000 },
      { role: "ai", text: "78% — they've signed the MSA, just waiting on procurement to release the PO. Their fiscal year ends April 30 so timing is on our side.", delay: 6200 },
      { role: "user", text: "Good. Move Meridian to next month, they're dragging.", delay: 7800 },
      { role: "ai", toolCall: { name: "update_deal", result: "Meridian → May pipeline" }, delay: 8600 },
      { role: "ai", text: "Moved. That puts this month's weighted pipeline at $152K with higher confidence. I'll update the forecast deck.", delay: 9600 },
    ],
  },
  {
    messages: [
      { role: "user", text: "Scan Miami for leads in med-spa and wellness.", delay: 0 },
      { role: "ai", toolCall: { name: "recon_scan", result: "138 prospects found" }, delay: 1400 },
      { role: "ai", toolCall: { name: "enrich_contacts", result: "84 contacts enriched" }, delay: 2600 },
      { role: "ai", text: "138 prospects, 84 fully enriched with emails and decision-maker names. Top 20 scored and ready in your CRM.", delay: 3600 },
      { role: "user", text: "How many have websites that look like they need help?", delay: 5200 },
      { role: "ai", toolCall: { name: "site_audit", result: "31 sites audited" }, delay: 6400 },
      { role: "ai", text: "31 have outdated or underperforming sites — no mobile optimization, slow load times, or missing booking flows. I ranked them by revenue potential.", delay: 7600 },
      { role: "user", text: "Send the top 10 to my inbox as a briefing.", delay: 9000 },
      { role: "ai", toolCall: { name: "compose_briefing", result: "Briefing sent" }, delay: 9800 },
      { role: "ai", text: "Sent. Each entry has the owner name, site screenshot, and a one-line pitch angle tailored to their gaps.", delay: 10800 },
    ],
  },
  {
    messages: [
      { role: "user", text: "Summarise yesterday's client calls.", delay: 0 },
      { role: "ai", toolCall: { name: "fetch_transcripts", result: "3 call transcripts" }, delay: 1200 },
      { role: "ai", text: "Three calls: Apex wants to accelerate launch by 2 weeks. Meridian asked for a case-study deck. Finesse approved the new landing page.", delay: 2400 },
      { role: "user", text: "Generate that case study deck for Meridian. Use the Finesse project as the example.", delay: 4000 },
      { role: "ai", toolCall: { name: "load_project", result: "Finesse data loaded" }, delay: 5000 },
      { role: "ai", toolCall: { name: "generate_deck", result: "12-slide deck created" }, delay: 6400 },
      { role: "ai", text: "12-slide deck ready — covers the problem, our approach, the build timeline, and results. I used the consultation growth stat as the hero metric.", delay: 7600 },
      { role: "user", text: "Add a slide about the Vitest deployment pipeline. That'll resonate with their CTO.", delay: 9000 },
      { role: "ai", toolCall: { name: "add_slide", result: "Slide 8 inserted" }, delay: 9800 },
      { role: "ai", text: "Added as slide 8 with a diagram of the CI/CD flow. Want me to send the deck to Meridian's team or stage it for your review first?", delay: 10800 },
    ],
  },
]

const MAX_VISIBLE = 4

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function HeroConversation() {
  const [convoIndex] = useState(() =>
    Math.floor(Math.random() * conversations.length)
  )
  const convo = conversations[convoIndex]
  const [appeared, setAppeared] = useState<number[]>([])

  const addMessage = useCallback((idx: number) => {
    setAppeared((prev) => {
      if (prev.includes(idx)) return prev
      return [...prev, idx]
    })
  }, [])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    convo.messages.forEach((msg, i) => {
      timers.push(setTimeout(() => addMessage(i), msg.delay + 800))
    })
    return () => timers.forEach(clearTimeout)
  }, [convo, addMessage])

  const activeIndices = appeared.slice(-MAX_VISIBLE)
  const fadingIndices = appeared.slice(0, Math.max(0, appeared.length - MAX_VISIBLE))

  return (
    <div className="hc-wrap">
      <div className="hc-messages">
        {convo.messages.map((msg, i) => {
          const hasAppeared = appeared.includes(i)
          const isFading = fadingIndices.includes(i)
          const isActive = activeIndices.includes(i)
          if (!hasAppeared) return null

          const stateClass = isFading
            ? "hc-row--exit"
            : isActive
              ? "hc-row--enter"
              : ""

          return (
            <div
              key={i}
              className={`hc-row hc-row--${msg.role} ${stateClass}`}
            >
              {/* Avatar */}
              <div className={`hc-avatar hc-avatar--${msg.role}`}>
                {msg.role === "user" ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                )}
              </div>

              {/* Content */}
              <div className={`hc-content hc-content--${msg.role}`}>
                {msg.toolCall && (
                  <div className="hc-tool">
                    <svg className="hc-tool-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                    <span className="hc-tool-name">{msg.toolCall.name}</span>
                    {msg.toolCall.result && (
                      <span className="hc-tool-result">{msg.toolCall.result}</span>
                    )}
                  </div>
                )}
                {msg.text && (
                  <div className={`hc-bubble hc-bubble--${msg.role}`}>
                    {msg.text}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
