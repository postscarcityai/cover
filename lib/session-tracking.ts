const SESSION_STORAGE_KEY = 'cover_session_id'
const SESSION_START_KEY = 'cover_session_start'
const LANDING_PAGE_KEY = 'cover_landing_page'
const PAGES_VIEWED_KEY = 'cover_pages_viewed'
const FORM_START_KEY = 'cover_form_start'

export function getSessionId(): string {
  if (typeof window === 'undefined') return ''

  let sessionId = sessionStorage.getItem(SESSION_STORAGE_KEY)

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId)
    sessionStorage.setItem(SESSION_START_KEY, Date.now().toString())
  }

  return sessionId
}

export function getSessionStartTime(): number {
  if (typeof window === 'undefined') return Date.now()
  const startTime = sessionStorage.getItem(SESSION_START_KEY)
  return startTime ? parseInt(startTime, 10) : Date.now()
}

export function getLandingPage(): string {
  if (typeof window === 'undefined') return ''
  let landingPage = sessionStorage.getItem(LANDING_PAGE_KEY)
  if (!landingPage && window.location.pathname) {
    landingPage = window.location.pathname + window.location.search
    sessionStorage.setItem(LANDING_PAGE_KEY, landingPage)
  }
  return landingPage || ''
}

export function trackPageView(pagePath: string): void {
  if (typeof window === 'undefined') return
  getSessionId()
  const pagesViewed = getPagesViewed()
  const fullPath = pagePath + window.location.search
  if (!pagesViewed.includes(fullPath)) {
    pagesViewed.push(fullPath)
    sessionStorage.setItem(PAGES_VIEWED_KEY, JSON.stringify(pagesViewed))
  }
}

export function getPagesViewed(): string[] {
  if (typeof window === 'undefined') return []
  const stored = sessionStorage.getItem(PAGES_VIEWED_KEY)
  return stored ? JSON.parse(stored) : []
}

export function getTimeOnSiteSeconds(): number {
  if (typeof window === 'undefined') return 0
  const startTime = getSessionStartTime()
  return Math.floor((Date.now() - startTime) / 1000)
}

export function getScreenResolution(): string {
  if (typeof window === 'undefined') return ''
  return `${window.screen.width}x${window.screen.height}`
}

export function startFormFillTracking(): void {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(FORM_START_KEY, Date.now().toString())
}

export function getFormFillTimeSeconds(): number | null {
  if (typeof window === 'undefined') return null
  const startTime = sessionStorage.getItem(FORM_START_KEY)
  if (!startTime) return null
  return Math.floor((Date.now() - parseInt(startTime, 10)) / 1000)
}

export function getPageViewsCount(): number {
  return getPagesViewed().length || 1
}
