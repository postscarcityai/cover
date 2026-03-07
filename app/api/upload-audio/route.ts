import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, unlinkSync } from 'fs'

// Get Supabase credentials
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credentials not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local')
  }

  return createClient(supabaseUrl, supabaseKey)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { filePath, fileName, deleteAfterUpload = true } = body

    if (!filePath || !fileName) {
      return NextResponse.json(
        { error: 'File path and file name are required' },
        { status: 400 }
      )
    }

    // Initialize Supabase client (will throw if not configured)
    let supabase
    try {
      supabase = getSupabaseClient()
    } catch (error) {
      return NextResponse.json(
        { error: 'Supabase not configured', details: error instanceof Error ? error.message : 'Unknown error' },
        { status: 503 }
      )
    }

    // Read the file from local path
    const fileBuffer = readFileSync(filePath)
    
    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from('audio-files')
      .upload(fileName, fileBuffer, {
        contentType: 'audio/mpeg',
        cacheControl: '3600',
        upsert: true
      })

    if (error) {
      console.error('Supabase upload error:', error)
      return NextResponse.json(
        { error: 'Failed to upload to Supabase', details: error.message },
        { status: 500 }
      )
    }

    // Delete local file if requested
    if (deleteAfterUpload) {
      try {
        unlinkSync(filePath)
      } catch (deleteError) {
        console.warn('Could not delete local file:', deleteError)
      }
    }

    // Return the public URL (supabaseUrl exists since getSupabaseClient succeeded)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/audio-files/${fileName}`

    return NextResponse.json({
      success: true,
      publicUrl,
      message: 'File uploaded successfully',
      data
    })

  } catch (error) {
    console.error('Upload route error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Check if Supabase is configured
  const isConfigured = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)

  return NextResponse.json({
    message: 'Audio upload endpoint. Use POST with filePath and fileName.',
    configured: isConfigured,
    example: {
      filePath: '/Users/username/Desktop/audio.mp3',
      fileName: 'my-audio.mp3',
      deleteAfterUpload: true
    }
  })
}
