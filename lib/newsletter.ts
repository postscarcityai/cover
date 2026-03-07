/**
 * Newsletter subscription utilities
 * Handles email subscriptions with GDPR/CCPA compliance
 */

export interface NewsletterSubscription {
  email: string
  consent: boolean
  gdprConsent?: boolean
  marketingConsent?: boolean
  source?: string
  referrerUrl?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

export interface SubscriptionResponse {
  success: boolean
  message: string
  code: string
  status?: string
  subscriptionId?: string
  error?: string
}

/**
 * Subscribe to newsletter with compliance tracking
 */
export async function subscribeToNewsletter(
  subscription: NewsletterSubscription
): Promise<SubscriptionResponse> {
  try {
    // Get UTM parameters from URL if not provided
    const urlParams = new URLSearchParams(window.location.search)
    const utmData = {
      utmSource: subscription.utmSource || urlParams.get('utm_source') || undefined,
      utmMedium: subscription.utmMedium || urlParams.get('utm_medium') || undefined,
      utmCampaign: subscription.utmCampaign || urlParams.get('utm_campaign') || undefined,
    }

    const requestData = {
      ...subscription,
      ...utmData,
      referrerUrl: subscription.referrerUrl || document.referrer || window.location.href,
    }

    const response = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: result.error || 'Subscription failed',
        code: result.code || 'UNKNOWN_ERROR',
        error: result.error
      }
    }

    return result

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
      code: 'NETWORK_ERROR',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  return emailRegex.test(email.trim())
}

/**
 * Get user's geographic location for GDPR compliance
 */
export async function getUserLocation(): Promise<{ isEU: boolean; country?: string }> {
  try {
    // This is a simple check - in production, you might want to use a more robust service
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    
    const euCountries = [
      'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
      'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
      'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'
    ]
    
    return {
      isEU: euCountries.includes(data.country_code),
      country: data.country_name
    }
  } catch (error) {
    console.error('Location detection error:', error)
    // Default to requiring GDPR compliance if we can't detect
    return { isEU: true }
  }
}

/**
 * Check if user is in California for CCPA compliance
 */
export async function isCaliforniaUser(): Promise<boolean> {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    return data.region_code === 'CA' && data.country_code === 'US'
  } catch (error) {
    console.error('California detection error:', error)
    return false
  }
}

/**
 * Generate compliance text based on user location
 */
export async function getComplianceText(): Promise<{
  consentText: string
  privacyNotice: string
  requiresGDPR: boolean
  requiresCCPA: boolean
}> {
  const [location, isCalifornia] = await Promise.all([
    getUserLocation(),
    isCaliforniaUser()
  ])

  const consentText = "I consent to receive email updates and newsletters."
  const privacyNotice = "No spam. Unsubscribe anytime."

  return {
    consentText,
    privacyNotice,
    requiresGDPR: location.isEU,
    requiresCCPA: isCalifornia
  }
}

/**
 * Track newsletter interaction events
 */
export function trackNewsletterEvent(event: string, data?: Record<string, any>) {
  // Integration point for analytics (Google Analytics, Mixpanel, etc.)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event, {
      event_category: 'Newsletter',
      ...data
    })
  }

  // Console log for development
  console.log('Newsletter event:', event, data)
}

/**
 * Show success message with proper styling
 */
export function showSuccessMessage(message: string, container?: HTMLElement) {
  if (!container) return

  const successDiv = document.createElement('div')
  successDiv.className = 'bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md mb-4'
  successDiv.innerHTML = `
    <div class="flex items-center">
      <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
      </svg>
      <span>${message}</span>
    </div>
  `
  
  container.insertBefore(successDiv, container.firstChild)
  
  // Remove after 5 seconds
  setTimeout(() => {
    if (successDiv.parentNode) {
      successDiv.parentNode.removeChild(successDiv)
    }
  }, 5000)
}

/**
 * Show error message with proper styling
 */
export function showErrorMessage(message: string, container?: HTMLElement) {
  if (!container) return

  const errorDiv = document.createElement('div')
  errorDiv.className = 'bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md mb-4'
  errorDiv.innerHTML = `
    <div class="flex items-center">
      <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
      </svg>
      <span>${message}</span>
    </div>
  `
  
  container.insertBefore(errorDiv, container.firstChild)
  
  // Remove after 7 seconds
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.parentNode.removeChild(errorDiv)
    }
  }, 7000)
}
