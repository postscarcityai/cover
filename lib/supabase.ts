import { createClient } from '@supabase/supabase-js'

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Supabase credentials not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local'
    )
  }

  return createClient(supabaseUrl, supabaseKey)
}

export const supabaseAdmin = (() => {
  try {
    return getSupabaseAdmin()
  } catch {
    return null
  }
})()

export function getSupabaseClient() {
  return getSupabaseAdmin()
}
