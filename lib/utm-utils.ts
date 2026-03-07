/**
 * UTM Parameter Preservation Utility
 * Saves and retrieves UTM parameters across page navigation
 * This ensures accurate attribution in GA4 even when users navigate internally
 */

export interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
}

/**
 * Get UTM parameters from current URL or localStorage
 * Priority: URL params > localStorage > empty
 */
export function getUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {}

  const params = new URLSearchParams(window.location.search)
  
  return {
    utm_source: params.get('utm_source') || localStorage.getItem('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || localStorage.getItem('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || localStorage.getItem('utm_campaign') || undefined,
    utm_content: params.get('utm_content') || localStorage.getItem('utm_content') || undefined,
    utm_term: params.get('utm_term') || localStorage.getItem('utm_term') || undefined,
  }
}

/**
 * Save UTM parameters to localStorage if they exist in current URL
 * Called on page mount to capture incoming traffic attribution
 */
export function saveUTMParams(): void {
  if (typeof window === 'undefined') return

  const params = new URLSearchParams(window.location.search)
  
  // Only save if at least utm_source exists
  if (params.get('utm_source')) {
    localStorage.setItem('utm_source', params.get('utm_source') || '')
    localStorage.setItem('utm_medium', params.get('utm_medium') || 'organic')
    localStorage.setItem('utm_campaign', params.get('utm_campaign') || '')
    localStorage.setItem('utm_content', params.get('utm_content') || '')
    localStorage.setItem('utm_term', params.get('utm_term') || '')
  }
}

/**
 * Clear UTM parameters from localStorage
 * Call after successful conversion to reset for next visitor
 */
export function clearUTMParams(): void {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('utm_source')
  localStorage.removeItem('utm_medium')
  localStorage.removeItem('utm_campaign')
  localStorage.removeItem('utm_content')
  localStorage.removeItem('utm_term')
}

/**
 * Convert UTM params to URL query string
 * Useful for preserving params when navigating
 */
export function utmParamsToQueryString(params: UTMParams): string {
  const queryParams = new URLSearchParams()
  
  if (params.utm_source) queryParams.set('utm_source', params.utm_source)
  if (params.utm_medium) queryParams.set('utm_medium', params.utm_medium)
  if (params.utm_campaign) queryParams.set('utm_campaign', params.utm_campaign)
  if (params.utm_content) queryParams.set('utm_content', params.utm_content)
  if (params.utm_term) queryParams.set('utm_term', params.utm_term)
  
  const queryString = queryParams.toString()
  return queryString ? `?${queryString}` : ''
}
