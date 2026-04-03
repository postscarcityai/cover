"use client"

import type { RefObject } from "react"
import { useEffect } from "react"
import { buildGoldDropFragmentSource } from "./fragment-shader"
import { GOLD_DROP_VERTEX_SHADER } from "./vertex-shader"
import type { GoldDropConfig } from "./types"

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("[gold-drop] compile:", gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export interface UseGoldDropOptions {
  config: GoldDropConfig
  reducedMotion: boolean
  dprCap?: number
}

export function useGoldDropWebGL(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  opts: UseGoldDropOptions,
): void {
  const configKey = JSON.stringify(opts.config)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || opts.reducedMotion) return

    const { config } = opts

    const opaqueBg = config.opaqueBackground !== false
    const gl = canvas.getContext("webgl", {
      alpha: !opaqueBg,
      antialias: false,
      powerPreference: "low-power",
      premultipliedAlpha: false,
    })
    if (!gl) return

    if (!opaqueBg) {
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    }

    const vert = compileShader(gl, gl.VERTEX_SHADER, GOLD_DROP_VERTEX_SHADER)
    const frag = compileShader(gl, gl.FRAGMENT_SHADER, buildGoldDropFragmentSource())
    if (!vert || !frag) return

    const program = gl.createProgram()!
    gl.attachShader(program, vert)
    gl.attachShader(program, frag)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("[gold-drop] link:", gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    )
    const posLoc = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, "u_resolution")
    const uTime = gl.getUniformLocation(program, "u_time")
    const uNoiseScale = gl.getUniformLocation(program, "u_noiseScale")
    const uSpeed = gl.getUniformLocation(program, "u_speed")
    const uIntensity = gl.getUniformLocation(program, "u_intensity")
    const uRight = gl.getUniformLocation(program, "u_rightBias")
    const uTop = gl.getUniformLocation(program, "u_topFade")
    const uBottom = gl.getUniformLocation(program, "u_bottomFade")
    const uOpaqueBg = gl.getUniformLocation(program, "u_opaqueBg")
    const uBandCenter = gl.getUniformLocation(program, "u_bandCenter")
    const uBandHalfH = gl.getUniformLocation(program, "u_bandHalfH")
    const uGeometryScale = gl.getUniformLocation(program, "u_geometryScale")
    const uWaveXScale = gl.getUniformLocation(program, "u_waveXScale")

    gl.uniform1f(uNoiseScale, config.noiseScale)
    gl.uniform1f(uSpeed, config.speed)
    gl.uniform1f(uIntensity, config.intensity)
    gl.uniform1f(uRight, config.rightBias)
    gl.uniform1f(uTop, config.topFade)
    gl.uniform1f(uBottom, config.bottomFade)
    gl.uniform1f(uOpaqueBg, opaqueBg ? 1.0 : 0.0)
    gl.uniform1f(uBandCenter, config.ribbonBandCenter)
    gl.uniform1f(uBandHalfH, config.ribbonBandHalfHeight)
    gl.uniform1f(uGeometryScale, config.geometryScale)
    gl.uniform1f(uWaveXScale, config.waveHorizontalScale)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, opts.dprCap ?? 2)
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
    let raf = 0
    const render = () => {
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, (performance.now() - t0) / 1000)
      if (!opaqueBg) {
        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
      }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      gl.deleteProgram(program)
      gl.deleteShader(vert)
      gl.deleteShader(frag)
      gl.deleteBuffer(buf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, configKey, opts.reducedMotion, opts.dprCap])
}
