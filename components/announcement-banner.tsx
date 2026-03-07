"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { siteConfig } from "@/site.config"

export function AnnouncementBanner() {
  const config = siteConfig.announcement
  const [isDismissed, setIsDismissed] = useState(true)

  useEffect(() => {
    if (!config?.enabled) return
    const stored = localStorage.getItem(config.dismissKey || "announcement-dismissed")
    if (!stored) setIsDismissed(false)
  }, [config])

  useEffect(() => {
    const height = isDismissed ? 0 : 44
    document.documentElement.style.setProperty("--banner-height", `${height}px`)
    return () => {
      document.documentElement.style.setProperty("--banner-height", "0px")
    }
  }, [isDismissed])

  if (!config?.enabled || isDismissed) return null

  const handleDismiss = () => {
    setIsDismissed(true)
    localStorage.setItem(config.dismissKey || "announcement-dismissed", "true")
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center px-4 h-11"
      style={{ backgroundColor: "var(--accent)" }}
    >
      {config.href ? (
        <a
          href={config.href}
          className="text-sm text-center truncate max-w-[calc(100%-3rem)] transition-opacity hover:opacity-80"
          style={{ color: "var(--accent-fg)" }}
        >
          {config.text}
          <span className="ml-2 underline underline-offset-2">Learn more &rarr;</span>
        </a>
      ) : (
        <p
          className="text-sm text-center truncate max-w-[calc(100%-3rem)]"
          style={{ color: "var(--accent-fg)" }}
        >
          {config.text}
        </p>
      )}
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
        style={{ color: "var(--accent-fg)" }}
        aria-label="Dismiss announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
