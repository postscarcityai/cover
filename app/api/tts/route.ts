import { NextRequest, NextResponse } from 'next/server'
import { fal } from '@fal-ai/client'

const isDevelopment = process.env.NODE_ENV === 'development'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''

export async function POST(request: NextRequest) {
  if (!isDevelopment) {
    return NextResponse.json(
      { error: 'TTS generation is only available in development. Nice try though.' },
      { status: 403 }
    )
  }

  try {
    const falKey = process.env.FAL_KEY
    if (!falKey) {
      return NextResponse.json({ error: 'FAL_KEY not configured. Add it to your .env.local.' }, { status: 500 })
    }

    fal.config({ credentials: falKey })

    const body = await request.json()
    const {
      text,
      blog_slug,
      part_name,
      part_number = 1,
      ref_audio_url,
      auto_upload = true
    } = body

    if (!text) {
      return NextResponse.json({ error: 'Text is required — we need something to read!' }, { status: 400 })
    }

    if (!blog_slug) {
      return NextResponse.json({ error: 'blog_slug is required to organize the audio files.' }, { status: 400 })
    }

    const fileName = `${blog_slug}-part${part_number}-${part_name || 'section'}.mp3`

    console.log(`Generating TTS for ${fileName} (${text.length} chars)`)

    const input: Record<string, unknown> = { prompt: text }
    if (ref_audio_url) {
      input.audio_url = ref_audio_url
    }

    const { data: result, requestId } = await fal.subscribe('fal-ai/index-tts-2/text-to-speech', {
      input: input as any,
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === 'IN_PROGRESS') {
          console.log('TTS generation in progress...')
        }
      }
    })

    const audioUrl = (result as Record<string, any>).audio?.url
    if (!audioUrl) {
      return NextResponse.json({ error: 'No audio generated — the TTS model returned empty.' }, { status: 500 })
    }

    let supabasePublicUrl: string | null = null

    if (auto_upload && supabaseUrl) {
      try {
        const { getSupabaseClient } = await import('@/lib/supabase')
        const supabase = getSupabaseClient()

        const audioResponse = await fetch(audioUrl)
        if (!audioResponse.ok) throw new Error(`Failed to download audio: ${audioResponse.status}`)

        const audioBuffer = Buffer.from(await audioResponse.arrayBuffer())
        const contentType = (result as Record<string, any>).audio?.content_type || 'audio/wav'

        const { error: uploadError } = await supabase.storage
          .from('audio-files')
          .upload(fileName, audioBuffer, {
            contentType,
            cacheControl: '3600',
            upsert: true
          })

        if (uploadError) {
          console.error('Supabase upload error:', uploadError)
        } else {
          supabasePublicUrl = `${supabaseUrl}/storage/v1/object/public/audio-files/${fileName}`
        }
      } catch (uploadErr) {
        console.error('Upload to Supabase failed:', uploadErr)
      }
    }

    return NextResponse.json({
      success: true,
      audio: {
        fal_url: audioUrl,
        supabase_url: supabasePublicUrl,
        file_name: fileName,
        text_length: text.length,
      },
      blog_slug,
      part_number,
      part_name,
      fal_request_id: requestId
    })
  } catch (error) {
    console.error('TTS route error:', error)
    return NextResponse.json(
      { error: 'TTS generation hit a snag. Check the logs for details.', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'TTS endpoint using fal.ai Index TTS 2.0. POST with text and blog_slug.',
    model: 'fal-ai/index-tts-2/text-to-speech',
    example: {
      text: 'The text to be narrated...',
      blog_slug: 'my-blog-post-slug',
      part_name: 'introduction',
      part_number: 1,
      auto_upload: true
    }
  })
}
