import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

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
        { error: 'Unsubscribe token is required' },
        { status: 400 }
      )
    }

    // Find subscription by unsubscribe token
    const { data: subscription, error: findError } = await supabase
      .from('newsletter_subscriptions')
      .select('id, email, status, unsubscribe_token')
      .eq('unsubscribe_token', token)
      .single()

    if (findError || !subscription) {
      return NextResponse.json(
        { error: 'Invalid unsubscribe token' },
        { status: 404 }
      )
    }

    // Check if already unsubscribed
    if (subscription.status === 'unsubscribed') {
      return NextResponse.json({
        message: 'You have already been unsubscribed from our updates.',
        email: subscription.email,
        status: 'unsubscribed'
      })
    }

    // Unsubscribe
    const { error: updateError } = await supabase
      .from('newsletter_subscriptions')
      .update({
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', subscription.id)

    if (updateError) {
      console.error('Unsubscribe update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to unsubscribe' },
        { status: 500 }
      )
    }

    // Log the unsubscribe action
    await supabase
      .from('newsletter_audit_log')
      .insert({
        subscription_id: subscription.id,
        action: 'unsubscribe',
        new_values: { status: 'unsubscribed', unsubscribed_at: new Date().toISOString() },
        ip_address: clientIP,
        user_agent: userAgent,
        notes: 'User unsubscribed via email link'
      })

    return NextResponse.json({
      success: true,
      message: 'You have been successfully unsubscribed from our updates. We\'re sorry to see you go!',
      email: subscription.email,
      status: 'unsubscribed'
    })

  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// Handle POST for unsubscribe with reason
export async function POST(
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
    const body = await request.json()
    const { reason, feedback } = body
    const clientIP = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'unknown'

    if (!token) {
      return NextResponse.json(
        { error: 'Unsubscribe token is required' },
        { status: 400 }
      )
    }

    // Find subscription by unsubscribe token
    const { data: subscription, error: findError } = await supabase
      .from('newsletter_subscriptions')
      .select('id, email, status, unsubscribe_token')
      .eq('unsubscribe_token', token)
      .single()

    if (findError || !subscription) {
      return NextResponse.json(
        { error: 'Invalid unsubscribe token' },
        { status: 404 }
      )
    }

    // Check if already unsubscribed
    if (subscription.status === 'unsubscribed') {
      return NextResponse.json({
        message: 'You have already been unsubscribed from our updates.',
        email: subscription.email,
        status: 'unsubscribed'
      })
    }

    // Unsubscribe with reason
    const unsubscribeNotes = reason ? `Reason: ${reason}` : 'No reason provided'
    const fullNotes = feedback ? `${unsubscribeNotes}. Feedback: ${feedback}` : unsubscribeNotes

    const { error: updateError } = await supabase
      .from('newsletter_subscriptions')
      .update({
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString(),
        notes: fullNotes,
        updated_at: new Date().toISOString()
      })
      .eq('id', subscription.id)

    if (updateError) {
      console.error('Unsubscribe update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to unsubscribe' },
        { status: 500 }
      )
    }

    // Log the unsubscribe action with reason
    await supabase
      .from('newsletter_audit_log')
      .insert({
        subscription_id: subscription.id,
        action: 'unsubscribe',
        new_values: { 
          status: 'unsubscribed', 
          unsubscribed_at: new Date().toISOString(),
          notes: fullNotes
        },
        ip_address: clientIP,
        user_agent: userAgent,
        notes: `User unsubscribed with reason: ${fullNotes}`
      })

    return NextResponse.json({
      success: true,
      message: 'You have been successfully unsubscribed from our updates. Thank you for your feedback!',
      email: subscription.email,
      status: 'unsubscribed'
    })

  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
