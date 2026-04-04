"use client"

import type { RefObject } from "react"
import { useEffect } from "react"

const VERTEX = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const s = gl.createShader(type)
  if (!s) return null
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn("[shader]", gl.getShaderInfoLog(s))
    gl.deleteShader(s)
    return null
  }
  return s
}

export interface EffectConfig {
  speed: number
  intensity: number
}

export const DEFAULT_EFFECT_CONFIG: EffectConfig = { speed: 1.0, intensity: 0.9 }

export function useEffectWebGL(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  fragmentSource: string,
  config: EffectConfig,
  reducedMotion: boolean,
  dprCap = 2,
): void {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reducedMotion) return

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false, antialias: false, powerPreference: "low-power" })
    if (!gl) return

    const vert = compile(gl, gl.VERTEX_SHADER, VERTEX)
    const frag = compile(gl, gl.FRAGMENT_SHADER, fragmentSource)
    if (!vert || !frag) return

    const prog = gl.createProgram()!
    gl.attachShader(prog, vert)
    gl.attachShader(prog, frag)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("[shader]", gl.getProgramInfoLog(prog))
      return
    }
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(prog, "a_position")
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, "u_resolution")
    const uTime = gl.getUniformLocation(prog, "u_time")
    const uSpd = gl.getUniformLocation(prog, "u_speed")
    const uInt = gl.getUniformLocation(prog, "u_intensity")

    gl.uniform1f(uSpd, config.speed)
    gl.uniform1f(uInt, config.intensity)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, dprCap)
      const w = Math.round(canvas.clientWidth * dpr)
      const h = Math.round(canvas.clientHeight * dpr)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }
    resize()
    window.addEventListener("resize", resize)

    const t0 = performance.now()
    const FRAME_MS = 1000 / 24 // cap at 24fps
    let raf = 0
    let lastPaint = 0
    const render = (now: number) => {
      raf = requestAnimationFrame(render)
      if (now - lastPaint < FRAME_MS) return
      lastPaint = now
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, (now - t0) / 1000)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      gl.deleteProgram(prog)
      gl.deleteShader(vert)
      gl.deleteShader(frag)
      gl.deleteBuffer(buf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, fragmentSource, config.speed, config.intensity, reducedMotion, dprCap])
}
