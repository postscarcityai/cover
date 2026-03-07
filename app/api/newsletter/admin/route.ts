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

// Simple admin authentication (in production, use proper auth)
const ADMIN_KEY = process.env.NEWSLETTER_ADMIN_KEY || ''

function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  const apiKey = request.headers.get('x-api-key')
  
  return authHeader === `Bearer ${ADMIN_KEY}` || apiKey === ADMIN_KEY
}

export async function GET(request: NextRequest) {
  try {
    // Check authorization
    if (!isAuthorized(request)) {
      return NextResponse.json(
        { error: 'Unauthorized. Provide valid API key.' },
        { status: 401 }
      )
    }

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

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') // pending, confirmed, unsubscribed
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    const source = searchParams.get('source')
    const search = searchParams.get('search') // search by email

    let query = supabase
      .from('newsletter_subscriptions')
      .select(`
        id,
        email,
        status,
        consent_given,
        consent_timestamp,
        gdpr_consent,
        marketing_consent,
        source,
        created_at,
        confirmed_at,
        unsubscribed_at,
        email_open_count,
        email_click_count
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Apply filters
    if (status) {
      query = query.eq('status', status)
    }

    if (source) {
      query = query.eq('source', source)
    }

    if (search) {
      query = query.ilike('email', `%${search}%`)
    }

    const { data: subscriptions, error } = await query

    if (error) {
      console.error('Admin query error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch subscriptions' },
        { status: 500 }
      )
    }

    // Get total count for pagination
    let countQuery = supabase
      .from('newsletter_subscriptions')
      .select('id', { count: 'exact', head: true })

    if (status) {
      countQuery = countQuery.eq('status', status)
    }

    if (source) {
      countQuery = countQuery.eq('source', source)
    }

    if (search) {
      countQuery = countQuery.ilike('email', `%${search}%`)
    }

    const { count, error: countError } = await countQuery

    if (countError) {
      console.error('Count query error:', countError)
    }

    // Get summary statistics
    const { data: stats } = await supabase
      .from('newsletter_subscriptions')
      .select('status')

    const summary = {
      total: count || 0,
      pending: stats?.filter(s => s.status === 'pending').length || 0,
      confirmed: stats?.filter(s => s.status === 'confirmed').length || 0,
      unsubscribed: stats?.filter(s => s.status === 'unsubscribed').length || 0,
      bounced: stats?.filter(s => s.status === 'bounced').length || 0
    }

    return NextResponse.json({
      subscriptions,
      pagination: {
        limit,
        offset,
        total: count || 0,
        hasMore: (offset + limit) < (count || 0)
      },
      summary,
      filters: {
        status,
        source,
        search
      }
    })

  } catch (error) {
    console.error('Admin API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Export newsletter data (CSV format)
export async function POST(request: NextRequest) {
  try {
    // Check authorization
    if (!isAuthorized(request)) {
      return NextResponse.json(
        { error: 'Unauthorized. Provide valid API key.' },
        { status: 401 }
      )
    }

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

    const body = await request.json()
    const { format = 'csv', status, source } = body

    let query = supabase
      .from('newsletter_subscriptions')
      .select(`
        email,
        status,
        consent_given,
        consent_timestamp,
        gdpr_consent,
        marketing_consent,
        source,
        created_at,
        confirmed_at,
        unsubscribed_at
      `)
      .order('created_at', { ascending: false })

    // Apply filters
    if (status) {
      query = query.eq('status', status)
    }

    if (source) {
      query = query.eq('source', source)
    }

    const { data: subscriptions, error } = await query

    if (error) {
      console.error('Export query error:', error)
      return NextResponse.json(
        { error: 'Failed to export subscriptions' },
        { status: 500 }
      )
    }

    if (format === 'csv') {
      // Generate CSV
      const headers = [
        'Email',
        'Status',
        'Consent Given',
        'Consent Timestamp',
        'GDPR Consent',
        'Marketing Consent',
        'Source',
        'Created At',
        'Confirmed At',
        'Unsubscribed At'
      ]

      const csvRows = [
        headers.join(','),
        ...subscriptions.map(sub => [
          sub.email,
          sub.status,
          sub.consent_given,
          sub.consent_timestamp,
          sub.gdpr_consent,
          sub.marketing_consent,
          sub.source,
          sub.created_at,
          sub.confirmed_at || '',
          sub.unsubscribed_at || ''
        ].map(field => `"${field}"`).join(','))
      ]

      const csvContent = csvRows.join('\n')

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="newsletter-subscriptions-${new Date().toISOString().split('T')[0]}.csv"`
        }
      })
    }

    return NextResponse.json({
      subscriptions,
      exportedAt: new Date().toISOString(),
      count: subscriptions.length
    })

  } catch (error) {
    console.error('Export API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
