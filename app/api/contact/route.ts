import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'
import { sendContactFormAlert, isEmailServiceConfigured } from '@/lib/email'

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000
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

  if (forwarded) return forwarded.split(',')[0].trim()
  if (realIP) return realIP
  return 'unknown'
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'unknown'

    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        {
          error: "Whoa there, speed racer! Too many submissions. Take a breather and try again in a few minutes, or just give us a call.",
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { status: 429 }
      )
    }

    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
      tcpaConsent,
      utmSource,
      utmMedium,
      utmCampaign,
      jobTitle,
      country,
      companyName,
    } = body

    const metaLines = [
      typeof jobTitle === "string" && jobTitle.trim() && `Job title: ${jobTitle.trim()}`,
      typeof country === "string" && country.trim() && `Country: ${country.trim()}`,
      typeof companyName === "string" && companyName.trim() && `Company: ${companyName.trim()}`,
    ].filter(Boolean) as string[]

    const messageBody = typeof message === "string" ? message.trim() : ""
    const composedMessage =
      metaLines.length > 0
        ? `${metaLines.join("\n")}${messageBody ? `\n\n${messageBody}` : ""}`
        : messageBody || null

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: "Looks like you missed a spot! We need your name, email, and phone to get back to you.", code: 'MISSING_FIELDS' },
        { status: 400 }
      )
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: "That email doesn't look quite right. Mind double-checking it?", code: 'INVALID_EMAIL' },
        { status: 400 }
      )
    }

    if (!tcpaConsent) {
      return NextResponse.json(
        { error: 'We need your consent to reach out to you. Please check the consent box and try again.', code: 'CONSENT_REQUIRED' },
        { status: 400 }
      )
    }

    let submissionId: string | null = null

    try {
      const supabase = getSupabaseClient()

      const submissionData = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        subject: subject?.trim() || null,
        message: composedMessage,
        tcpa_consent: true,
        consent_timestamp: new Date().toISOString(),
        consent_ip_address: clientIP,
        consent_user_agent: userAgent,
        utm_source: utmSource || null,
        utm_medium: utmMedium || null,
        utm_campaign: utmCampaign || null,
        status: 'new',
      }

      const { data: newSubmission, error: insertError } = await supabase
        .from('contact_form_submissions')
        .insert(submissionData)
        .select('id')
        .single()

      if (insertError) {
        console.error('[Contact] Insert error:', insertError)
      } else {
        submissionId = newSubmission.id
      }
    } catch (dbError) {
      console.error('[Contact] Database unavailable, continuing with email only:', dbError)
    }

    if (isEmailServiceConfigured()) {
      await sendContactFormAlert({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        subject: subject?.trim(),
        message: composedMessage || undefined,
      })
    }

    return NextResponse.json({
      success: true,
      submissionId,
      message: "Thanks for reaching out! We'll get back to you shortly."
    })
  } catch (error) {
    console.error('[Contact] Unexpected error:', error)
    return NextResponse.json(
      {
        error: "Well, that wasn't supposed to happen. Something went sideways on our end. Try again or give us a call!",
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    )
  }
}
