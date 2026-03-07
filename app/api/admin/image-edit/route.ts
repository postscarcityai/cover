import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import nodePath from "path"

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Image editing is only available in local development. Security first!" },
      { status: 403 }
    )
  }

  if (!process.env.FAL_KEY) {
    return NextResponse.json(
      { error: "FAL_KEY is not configured. Add it to your .env.local file." },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const { imagePath, imagePaths, prompt, outputPath } = body

    const paths: string[] = imagePaths || (imagePath ? [imagePath] : [])

    if (paths.length === 0 || !prompt) {
      return NextResponse.json(
        { error: "Both 'imagePath' (or 'imagePaths') and 'prompt' are required." },
        { status: 400 }
      )
    }

    for (const p of paths) {
      if (!p.startsWith("/img/")) {
        return NextResponse.json(
          { error: `Image path must start with '/img/'. Got: ${p}` },
          { status: 400 }
        )
      }
    }

    const publicDir = nodePath.join(process.cwd(), "public")
    const imageDataUrls: string[] = []

    for (const imgPath of paths) {
      const fullImagePath = nodePath.join(publicDir, imgPath)

      try {
        await fs.access(fullImagePath)
      } catch {
        return NextResponse.json(
          { error: `Image not found at: ${imgPath}. Double-check the path.` },
          { status: 404 }
        )
      }

      const imageBuffer = await fs.readFile(fullImagePath)
      const imageBase64 = imageBuffer.toString("base64")

      const ext = nodePath.extname(imgPath).toLowerCase()
      const mimeTypes: Record<string, string> = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".webp": "image/webp",
      }
      const mimeType = mimeTypes[ext] || "image/jpeg"
      imageDataUrls.push(`data:${mimeType};base64,${imageBase64}`)
    }

    const { fal } = await import("@fal-ai/client")
    fal.config({ credentials: process.env.FAL_KEY })

    const result = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
      input: {
        image_urls: imageDataUrls,
        prompt,
        num_outputs: 1,
      } as any,
    }) as Record<string, any>

    let editedImageUrl: string | undefined
    if (result?.images?.[0]?.url) editedImageUrl = result.images[0].url
    else if (result?.image?.url) editedImageUrl = result.image.url
    else if (result?.data?.images?.[0]?.url) editedImageUrl = result.data.images[0].url

    if (!editedImageUrl) {
      return NextResponse.json(
        { error: "No image returned from fal.ai. The model may have had trouble with this one." },
        { status: 500 }
      )
    }

    const imageResponse = await fetch(editedImageUrl)
    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: `Failed to download the edited image (HTTP ${imageResponse.status}).` },
        { status: 500 }
      )
    }

    const editedImageBuffer = Buffer.from(await imageResponse.arrayBuffer())

    let finalOutputPath = outputPath
    if (!finalOutputPath) {
      const pathParts = paths[0].split("/")
      const filename = pathParts[pathParts.length - 1]
      const ext = nodePath.extname(filename)
      const nameWithoutExt = nodePath.basename(filename, ext)
      const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, '').replace('T', '-')
      pathParts[pathParts.length - 1] = `${nameWithoutExt}-edited-${timestamp}${ext}`
      finalOutputPath = pathParts.join("/")
    }

    const fullOutputPath = nodePath.join(publicDir, finalOutputPath)
    const outputDir = nodePath.dirname(fullOutputPath)
    await fs.mkdir(outputDir, { recursive: true })
    await fs.writeFile(fullOutputPath, editedImageBuffer)

    return NextResponse.json({
      success: true,
      originalPaths: paths,
      editedPath: finalOutputPath,
    })
  } catch (error) {
    console.error("[image-edit] Error:", error)
    return NextResponse.json(
      { error: "Image editing failed unexpectedly. Check the server logs.", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
