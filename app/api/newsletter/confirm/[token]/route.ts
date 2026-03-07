import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse} from 'next/server'

// Get Supabase client (lazy initialization)
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credentials not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local')
  }

  return createClient(supabaseUrl, supabaseKey)
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    // Initialize Supabase client
    let supabase
    try {
      supabase = getSupabaseClient()
    } catch (error) {
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 503 }
      )
    }

    const { token } = await params
    const clientIP = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'unknown'

    if (!token) {
      return NextResponse.json(
        { error: 'Confirmation token is required' },
        { status: 400 }
      )
    }

    // Find subscription by confirmation token
    const { data: subscription, error: findError } = await supabase
      .from('newsletter_subscriptions')
      .select('id, email, status, confirmation_token')
      .eq('confirmation_token', token)
      .single()

    if (findError || !subscription) {
      return NextResponse.json(
        { error: 'Invalid or expired confirmation token' },
        { status: 404 }
      )
    }

    // Check if already confirmed
    if (subscription.status === 'confirmed') {
      return NextResponse.json({
        message: 'Email already confirmed! You are subscribed to our updates.',
        email: subscription.email,
        status: 'confirmed'
      })
    }

    // Confirm the subscription
    const { error: updateError } = await supabase
      .from('newsletter_subscriptions')
      .update({
        status: 'confirmed',
        confirmed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', subscription.id)

    if (updateError) {
      console.error('Confirmation update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to confirm subscription' },
        { status: 500 }
      )
    }

    // Log the confirmation action
    await supabase
      .from('newsletter_audit_log')
      .insert({
        subscription_id: subscription.id,
        action: 'confirm',
        new_values: { status: 'confirmed', confirmed_at: new Date().toISOString() },
        ip_address: clientIP,
        user_agent: userAgent,
        notes: 'Email confirmation completed'
      })

    return NextResponse.json({
      success: true,
      message: 'Email confirmed successfully! Welcome to our updates.',
      email: subscription.email,
      status: 'confirmed'
    })

  } catch (error) {
    console.error('Confirmation error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
