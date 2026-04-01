"use client"

import { Star, Award, Shield, CheckCircle } from "lucide-react"
import { siteConfig } from "@/site.config"

interface CredibilityBadgeProps {
  className?: string
  align?: 'center' | 'left'
}

/**
 * Credibility Badge Component
 *
 * Configurable trust signals. Customize via site.config.ts credibility section.
 * Displays stats, credentials, and review platform ratings.
 */
export function CredibilityBadge({ className = "", align = 'center' }: CredibilityBadgeProps) {
  const cred = siteConfig.credibility

  if (!cred) {
    return null
  }

  return (
    <div className={`flex flex-col ${align === 'left' ? 'items-start' : 'items-center'} gap-4 text-sm ${className}`}>
      {/* Stats Row */}
      {cred.stats && cred.stats.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-6">
          {cred.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="font-bold text-lg" style={{ color: 'var(--accent)' }}>
                {stat.value}
              </p>
              <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Credentials */}
      {cred.credentials && cred.credentials.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {cred.credentials.map((credential, index) => (
            <div key={index} className="flex items-center gap-1.5" style={{ color: 'var(--fg-muted)' }}>
              <CheckCircle className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              <span className="text-sm">{credential}</span>
            </div>
          ))}
        </div>
      )}

      {/* Review Platforms */}
      {cred.reviews && cred.reviews.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-4">
          {cred.reviews.map((review, index) => (
            <a
              key={index}
              href={review.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              aria-label={`${review.rating} stars on ${review.platform} with ${review.count} reviews`}
            >
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold" style={{ color: 'var(--fg)' }}>{review.rating}</span>
              <span className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                {review.platform} ({review.count})
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
