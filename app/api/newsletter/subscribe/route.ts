import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

// Get Supabase client (lazy initialization)
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credentials not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local')
  }

  return createClient(supabaseUrl, supabaseKey)
}

// Email validation regex
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

// Rate limiting (simple in-memory store - in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userLimit = rateLimitMap.get(ip)

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  userLimit.count++
  return true
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return request.ip || 'unknown'
}

export async function POST(request: NextRequest) {
  try {
    // Initialize Supabase client
    let supabase
    try {
      supabase = getSupabaseClient()
    } catch (error) {
      return NextResponse.json(
        { error: 'Newsletter service not configured', details: error instanceof Error ? error.message : 'Unknown error' },
        { status: 503 }
      )
    }

    const headersList = await headers()
    const clientIP = getClientIP(request)
    const userAgent = headersList.get('user-agent') || 'unknown'

    // Rate limiting
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again in 15 minutes.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { 
      email, 
      consent, 
      gdprConsent = false,
      marketingConsent = false,
      source = 'newsletter',
      referrerUrl,
      utmSource,
      utmMedium,
      utmCampaign 
    } = body

    // Validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required', code: 'EMAIL_REQUIRED' },
        { status: 400 }
      )
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email address', code: 'INVALID_EMAIL' },
        { status: 400 }
      )
    }

    if (!consent) {
      return NextResponse.json(
        { 
          error: 'Consent is required to subscribe to our newsletter', 
          code: 'CONSENT_REQUIRED' 
        },
        { status: 400 }
      )
    }

    const normalizedEmail = email.trim().toLowerCase()

    // Check if email already exists
    const { data: existingSubscription, error: checkError } = await supabase
      .from('newsletter_subscriptions')
      .select('id, status, email')
      .eq('email', normalizedEmail)
      .single()

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Database check error:', checkError)
      return NextResponse.json(
        { error: 'Database error occurred', code: 'DATABASE_ERROR' },
        { status: 500 }
      )
    }

    // If subscription exists, handle accordingly
    if (existingSubscription) {
      if (existingSubscription.status === 'confirmed') {
        return NextResponse.json(
          { 
            message: 'You are already subscribed to our newsletter!',
            code: 'ALREADY_SUBSCRIBED',
            status: 'confirmed'
          },
          { status: 200 }
        )
      } else if (existingSubscription.status === 'pending') {
        // Update existing subscription
        const { error: updateError } = await supabase
          .from('newsletter_subscriptions')
          .update({
            status: 'confirmed',
            confirmed_at: new Date().toISOString(),
            consent_timestamp: new Date().toISOString(),
            consent_ip_address: clientIP,
            consent_user_agent: userAgent,
            gdpr_consent: gdprConsent,
            marketing_consent: marketingConsent,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingSubscription.id)

        if (updateError) {
          console.error('Update error:', updateError)
          return NextResponse.json(
            { error: 'Failed to update subscription', code: 'UPDATE_ERROR' },
            { status: 500 }
          )
        }

        return NextResponse.json({
          message: 'Thanks for subscribing! You\'re all set to receive our updates.',
          code: 'SUBSCRIPTION_UPDATED',
          status: 'confirmed'
        })
      } else if (existingSubscription.status === 'unsubscribed') {
        // Reactivate subscription
        const { error: reactivateError } = await supabase
          .from('newsletter_subscriptions')
          .update({
            status: 'confirmed',
            consent_given: true,
            consent_timestamp: new Date().toISOString(),
            consent_ip_address: clientIP,
            consent_user_agent: userAgent,
            gdpr_consent: gdprConsent,
            marketing_consent: marketingConsent,
            confirmed_at: new Date().toISOString(),
            unsubscribed_at: null,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingSubscription.id)

        if (reactivateError) {
          console.error('Reactivate error:', reactivateError)
          return NextResponse.json(
            { error: 'Failed to reactivate subscription', code: 'REACTIVATE_ERROR' },
            { status: 500 }
          )
        }

        return NextResponse.json({
          message: 'Welcome back! You\'re now subscribed to our updates.',
          code: 'REACTIVATED',
          status: 'confirmed'
        })
      }
    }

    // Create new subscription
    const subscriptionData = {
      email: normalizedEmail,
      status: 'confirmed',
      consent_given: true,
      consent_timestamp: new Date().toISOString(),
      consent_ip_address: clientIP,
      consent_user_agent: userAgent,
      gdpr_consent: gdprConsent,
      ccpa_opt_out: false,
      marketing_consent: marketingConsent,
      confirmed_at: new Date().toISOString(),
      source: source,
      referrer_url: referrerUrl,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign
    }

    const { data: newSubscription, error: insertError } = await supabase
      .from('newsletter_subscriptions')
      .insert(subscriptionData)
      .select('id, email, confirmation_token')
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      
      // Handle unique constraint violation
      if (insertError.code === '23505') {
        return NextResponse.json(
          { 
            error: 'Email already exists in our system',
            code: 'EMAIL_EXISTS'
          },
          { status: 409 }
        )
      }

      return NextResponse.json(
        { error: 'Failed to create subscription', code: 'INSERT_ERROR' },
        { status: 500 }
      )
    }

    // Log the subscription action
    await supabase
      .from('newsletter_audit_log')
      .insert({
        subscription_id: newSubscription.id,
        action: 'subscribe',
        new_values: subscriptionData,
        ip_address: clientIP,
        user_agent: userAgent,
        notes: `New subscription from ${source}`
      })

    // Subscription is immediately confirmed - no email confirmation needed
    
    return NextResponse.json({
      success: true,
      message: 'Welcome! You\'re now subscribed to our newsletter.',
      code: 'SUBSCRIPTION_CREATED',
      status: 'confirmed',
      subscriptionId: newSubscription.id
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred. Please try again.',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Newsletter subscription endpoint',
    endpoints: {
      POST: '/api/newsletter/subscribe - Subscribe to newsletter',
      GET: '/api/newsletter/confirm/[token] - Confirm subscription',
      GET: '/api/newsletter/unsubscribe/[token] - Unsubscribe'
    },
    requiredFields: {
      email: 'string (required)',
      consent: 'boolean (required)',
      gdprConsent: 'boolean (optional)',
      marketingConsent: 'boolean (optional)',
      source: 'string (optional, default: newsletter)',
      referrerUrl: 'string (optional)',
      utmSource: 'string (optional)',
      utmMedium: 'string (optional)',
      utmCampaign: 'string (optional)'
    }
  })
}
