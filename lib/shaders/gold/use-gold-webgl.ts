"use client"

import type { RefObject } from "react"
import { useEffect } from "react"
import { buildGoldPaintFragmentSource } from "./build-fragment-source"
import { GOLD_PAINT_VERTEX_SHADER } from "./vertex-shader"
import { mergeRuntimeDefaults, shapeToUniformVectors } from "./shape-to-uniforms"
import { shapeKindForShape } from "./types"
import type { GoldPaintRuntimeOptions, GoldPaintShape } from "./types"

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("Gold paint shader compile error:", gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export interface UseGoldWebGLOptions {
  shape: GoldPaintShape
  runtime: GoldPaintRuntimeOptions | undefined
  /** When true, skip WebGL (canvas stays blank / parent background shows). */
  reducedMotion: boolean
  dprCap?: number
  powerPreference?: "default" | "low-power" | "high-performance"
}

function stableSerialize(obj: unknown): string {
  return JSON.stringify(obj)
}

export function useGoldWebGL(canvasRef: RefObject<HTMLCanvasElement | null>, opts: UseGoldWebGLOptions): void {
  const shapeKey = stableSerialize(opts.shape)
  const runtimeKey = stableSerialize(opts.runtime ?? null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const { shape, runtime, reducedMotion, dprCap, powerPreference } = opts
    if (reducedMotion) return

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: powerPreference ?? "low-power",
    })
    if (!gl) return

    const vertShader = createShader(gl, gl.VERTEX_SHADER, GOLD_PAINT_VERTEX_SHADER)
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, buildGoldPaintFragmentSource())
    if (!vertShader || !fragShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertShader)
    gl.attachShader(program, fragShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("Gold paint program link error:", gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    const posBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const posLoc = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uResolution = gl.getUniformLocation(program, "u_resolution")
    const uTime = gl.getUniformLocation(program, "u_time")
    const uShapeKind = gl.getUniformLocation(program, "u_shapeKind")
    const uPosScale = gl.getUniformLocation(program, "u_posScale")
    const uPosOffset = gl.getUniformLocation(program, "u_posOffset")
    const uGlowScale = gl.getUniformLocation(program, "u_glowScale")
    const uGlowMin = gl.getUniformLocation(program, "u_glowMin")
    const uBand = gl.getUniformLocation(program, "u_band")
    const uVFade = gl.getUniformLocation(program, "u_vFadeStrength")
    const uQ0 = gl.getUniformLocation(program, "u_q0")
    const uQ1 = gl.getUniformLocation(program, "u_q1")
    const uQ2 = gl.getUniformLocation(program, "u_q2")
    const uQ3 = gl.getUniformLocation(program, "u_q3")

    const vecs = shapeToUniformVectors(shape)
    const rt = mergeRuntimeDefaults(runtime)

    const resize = () => {
      const rawDpr = window.devicePixelRatio
      const dpr = dprCap !== undefined ? Math.min(rawDpr, dprCap) : rawDpr
      const w = canvas.clientWidth * dpr
      const h = canvas.clientHeight * dpr
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    resize()
    window.addEventListener("resize", resize)

    gl.uniform1f(uShapeKind, shapeKindForShape(shape))
    gl.uniform1f(uPosScale, rt.posScale)
    gl.uniform2f(uPosOffset, rt.posOffset[0], rt.posOffset[1])
    gl.uniform1f(uGlowScale, rt.glowScale)
    gl.uniform1f(uGlowMin, rt.glowMin)
    gl.uniform3f(uBand, rt.band[0], rt.band[1], rt.band[2])
    gl.uniform1f(uVFade, rt.verticalFadeStrength)
    gl.uniform4f(uQ0, vecs.q0[0], vecs.q0[1], vecs.q0[2], vecs.q0[3])
    gl.uniform4f(uQ1, vecs.q1[0], vecs.q1[1], vecs.q1[2], vecs.q1[3])
    gl.uniform4f(uQ2, vecs.q2[0], vecs.q2[1], vecs.q2[2], vecs.q2[3])
    gl.uniform4f(uQ3, vecs.q3[0], vecs.q3[1], vecs.q3[2], vecs.q3[3])

    const startTime = performance.now()
    let raf = 0
    const render = () => {
      gl.uniform2f(uResolution, canvas.width, canvas.height)
      gl.uniform1f(uTime, (performance.now() - startTime) / 1000.0)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      gl.deleteProgram(program)
      gl.deleteShader(vertShader)
      gl.deleteShader(fragShader)
      gl.deleteBuffer(posBuffer)
    }
  }, [
    canvasRef,
    shapeKey,
    runtimeKey,
    opts.reducedMotion,
    opts.dprCap,
    opts.powerPreference,
  ])
}
