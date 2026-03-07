/**
 * Upload audio file to Supabase storage via API route
 */
export async function uploadAudioToSupabase(
  filePath: string,
  fileName: string,
  deleteAfterUpload: boolean = true
): Promise<{ success: boolean; publicUrl?: string; error?: string }> {
  try {
    const response = await fetch('/api/upload-audio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filePath,
        fileName,
        deleteAfterUpload
      })
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Upload failed'
      }
    }

    return {
      success: true,
      publicUrl: result.publicUrl
    }

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Generate audio with ElevenLabs and upload to Supabase
 */
export interface AudioGenerationOptions {
  text: string
  voiceId?: string
  fileName: string
  speed?: number
  stability?: number
  similarityBoost?: number
  style?: number
  useSpeakerBoost?: boolean
  modelId?: string
  outputFormat?: string
  language?: string
}

export async function generateAndUploadAudio(
  options: AudioGenerationOptions
): Promise<{ success: boolean; publicUrl?: string; error?: string }> {
  // This would be called from your server-side code or API route
  // Since we can't directly call ElevenLabs MCP from client-side
  
  return {
    success: false,
    error: 'This function should be called from server-side code'
  }
}
