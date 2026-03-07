/**
 * Centralized GA4 Event Tracking for Marketing Site
 * All conversion and engagement events flow through this utility
 * 
 * Usage: trackEvent('event_name', { custom_data })
 */

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

/**
 * Core tracking function - call this for all events
 */
export const trackEvent = (
  eventName: string,
  eventData?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData)
  }
}

/**
 * CONVERSION EVENTS (High Priority)
 * These are the actions that matter for lead generation
 */

export const trackPhoneCallClick = (source: string, buttonLocation: string) => {
  trackEvent('phone_call_click', {
    source, // 'navigation', 'hero', 'footer', 'blog_cta', etc.
    button_location: buttonLocation, // 'header_nav', 'hero_section', 'footer', etc.
  })
}

export const trackScheduleConsultation = (
  source: string,
  pageSection: string,
  serviceType?: string
) => {
  trackEvent('schedule_consultation', {
    source, // 'hero', 'blog_cta', 'practice_area', 'contact_page', etc.
    page_section: pageSection,
    service_type: serviceType, // 'federal_defense', 'white_collar', etc. (optional)
  })
}

export const trackContactFormSubmit = (
  source: string,
  messageLength?: number
) => {
  trackEvent('contact_form_submit', {
    source, // 'contact_page', 'footer', etc.
    message_length: messageLength, // Indicates engagement level
  })
}

export const trackNewsletterSignup = (
  source: string,
  emailDomain?: string
) => {
  trackEvent('newsletter_signup', {
    source, // 'homepage', 'blog_footer', 'sidebar', etc.
    email_domain: emailDomain, // Business vs personal domain indication
  })
}

export const trackDownloadLeadMagnet = (
  resourceName: string,
  resourceType: string
) => {
  trackEvent('download_resource', {
    resource_name: resourceName, // 'federal_defense_guide', etc.
    resource_type: resourceType, // 'pdf', 'checklist', 'guide', etc.
  })
}

/**
 * ENGAGEMENT EVENTS (Medium Priority)
 * These help understand visitor behavior and interest
 */

export const trackPageView = (
  pageName: string,
  pageCategory: string,
  pageType?: string
) => {
  trackEvent('page_view_custom', {
    page_name: pageName,
    page_category: pageCategory, // 'service', 'blog', 'about', 'contact', etc.
    page_type: pageType, // 'practice_area', 'blog_post', 'informational', etc.
  })
}

export const trackServiceAreaClick = (
  serviceArea: string,
  location: string
) => {
  trackEvent('service_area_click', {
    service_area: serviceArea, // 'federal_defense', 'white_collar', 'drug_trafficking', etc.
    button_location: location, // 'homepage', 'practice_areas_page', etc.
  })
}

export const trackPracticeAreaView = (practiceArea: string) => {
  trackEvent('practice_area_view', {
    practice_area: practiceArea,
  })
}

export const trackBlogPostView = (
  postTitle: string,
  postCategory: string,
  postSlug: string
) => {
  trackEvent('blog_post_view', {
    post_title: postTitle,
    post_category: postCategory, // 'Federal Defense', 'White Collar', etc.
    post_slug: postSlug,
  })
}

export const trackVideoPlay = (
  videoType: string, // 'testimonial', 'explainer', 'case_study'
  videoTitle: string,
  buttonLocation: string
) => {
  trackEvent('video_play', {
    video_type: videoType,
    video_title: videoTitle,
    button_location: buttonLocation,
  })
}

export const trackAccordionOpen = (
  sectionName: string,
  itemTitle: string
) => {
  trackEvent('accordion_open', {
    section_name: sectionName, // 'faq', 'services', etc.
    item_title: itemTitle,
  })
}

export const trackFormFieldFocus = (
  fieldName: string,
  formName: string
) => {
  trackEvent('form_field_focus', {
    field_name: fieldName, // 'email', 'phone', 'message', etc.
    form_name: formName, // 'contact', 'newsletter', etc.
  })
}

export const trackButtonClick = (
  buttonText: string,
  buttonLocation: string,
  destination: string
) => {
  trackEvent('button_click', {
    button_text: buttonText,
    button_location: buttonLocation,
    destination: destination, // '/practice-areas', 'tel:', '/contact', etc.
  })
}

export const trackNavClick = (navItem: string) => {
  trackEvent('nav_click', {
    nav_item: navItem, // 'Our Firm', 'Practice Areas', 'Results', etc.
  })
}

export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', {
    depth_percentage: depth, // 0-100
  })
}

/**
 * ERROR/FRICTION EVENTS (Low Priority, but important for optimization)
 */

export const trackFormError = (
  formName: string,
  errorMessage: string,
  fieldName?: string
) => {
  trackEvent('form_error', {
    form_name: formName,
    error_message: errorMessage,
    field_name: fieldName,
  })
}

export const trackCopyToClipboard = (contentType: string, value: string) => {
  trackEvent('copy_to_clipboard', {
    content_type: contentType, // 'email', 'phone', 'address', etc.
    value_masked: value.substring(0, 3) + '***', // Don't send full value
  })
}

export const trackExitIntent = () => {
  trackEvent('exit_intent_triggered', {
    timestamp: new Date().toISOString(),
  })
}

export const trackWhatsAppClick = (source: string) => {
  trackEvent('whatsapp_click', {
    source,
  })
}

/**
 * AUDIO PLAYER ENGAGEMENT (Option B - Lightweight)
 * Track when users engage with blog audio content
 */

export const trackAudioPlay = (
  postSlug: string,
  postTitle: string,
  partNumber: number,
  partTitle: string
) => {
  trackEvent('audio_play', {
    post_slug: postSlug,
    post_title: postTitle,
    part_number: partNumber,
    part_title: partTitle,
  })
}

export const trackAudioPartComplete = (
  postSlug: string,
  postTitle: string,
  partNumber: number,
  partTitle: string,
  durationSeconds?: number
) => {
  trackEvent('audio_part_complete', {
    post_slug: postSlug,
    post_title: postTitle,
    part_number: partNumber,
    part_title: partTitle,
    duration_seconds: durationSeconds,
  })
}

export const trackAudioSeriesComplete = (
  postSlug: string,
  postTitle: string,
  totalParts: number,
  totalDurationSeconds?: number
) => {
  trackEvent('audio_series_complete', {
    post_slug: postSlug,
    post_title: postTitle,
    total_parts: totalParts,
    total_duration_seconds: totalDurationSeconds,
  })
}

/**
 * CONVERSION FUNNEL - map the visitor journey
 * 
 * Step 1: trackPageView('Practice Areas Page', 'service')
 * Step 2: trackServiceAreaClick('white_collar', 'practice_areas_page')
 * Step 3: trackScheduleConsultation('practice_area', 'call_to_action', 'white_collar')
 * CONVERSION ✅
 */
