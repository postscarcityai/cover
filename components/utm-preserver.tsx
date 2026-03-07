'use client'

import { useEffect } from 'react'
import { saveUTMParams } from '@/lib/utm-utils'

/**
 * UTM Parameter Preserver Component
 * Runs on every page load to capture and preserve UTM parameters
 * This ensures GA4 accurately attributes conversions to the correct traffic source
 * even when users navigate to different pages before converting
 */
export function UTMPreserver() {
  useEffect(() => {
    // Capture UTM params on mount (once per page load)
    saveUTMParams()
  }, [])

  // This component renders nothing - it's just for side effects
  return null
}
