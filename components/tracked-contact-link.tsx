"use client"

import { trackPhoneCallClick, trackCopyToClipboard } from "@/lib/analytics"

interface TrackedContactLinkProps {
  type: 'phone' | 'email'
  href: string
  source: string
  children: React.ReactNode
  className?: string
}

export function TrackedContactLink({ type, href, source, children, className }: TrackedContactLinkProps) {
  const handleClick = () => {
    if (type === 'phone') {
      trackPhoneCallClick(source, 'contact_info_link')
    } else if (type === 'email') {
      trackCopyToClipboard('email', href.replace('mailto:', ''))
    }
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
