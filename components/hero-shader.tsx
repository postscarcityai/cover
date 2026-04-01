"use client"

import { useEffect, useRef } from "react"

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_distanceIntensity;
uniform float u_tunnel;

#define M_PI 3.1415926535897932384626433832795

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 12.1414))) * 83758.5453);
}

float noise(vec2 n) {
  const vec2 d = vec2(0.0, 1.0);
  vec2 b = floor(n);
  vec2 f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
  return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

vec3 ramp(float t) {
  // Purple to gold — clamped, no division blow-up
  vec3 purple = vec3(0.35, 0.05, 0.6);
  vec3 gold = vec3(0.85, 0.65, 0.15);
  float blend = smoothstep(0.15, 0.65, t);
  vec3 col = mix(purple, gold, blend);
  // Gentle falloff instead of dividing by t (which causes pink blow-out)
  col *= smoothstep(0.0, 0.3, t);
  return col;
}

vec2 polarMap(vec2 uv, float shift, float inner) {
  uv = vec2(0.5) - uv;
  float px = 1.0 - fract(atan(uv.y, uv.x) / 6.28 + 0.25) + shift;
  float py = (sqrt(uv.x * uv.x + uv.y * uv.y) * (1.0 + inner * 2.0) - inner) * 2.0;
  return vec2(px, py);
}

float fire(vec2 n) {
  return noise(n) + noise(n * 2.1) * 0.6 + noise(n * 5.4) * 0.42;
}

float shade(vec2 uv, float t) {
  uv.x += uv.y < 0.5 ? 23.0 + t * 0.035 : -11.0 + t * 0.03;
  uv.y = abs(uv.y - 0.5);
  uv.x *= 35.0;

  float q = fire(uv - t * 0.013) / 2.0;
  vec2 r = vec2(fire(uv + q / 2.0 + t - uv.x - uv.y), fire(uv + q - t));

  return pow((r.y + r.y) * max(0.0, uv.y) + 0.1, 4.0);
}

vec3 color(float grad) {
  grad = sqrt(grad);
  vec3 c = ramp(grad);
  // Tone-map gently — avoid crushing to black
  c = c / (0.6 + c);
  return c;
}

void main() {
  float m1 = 3.6 * u_tunnel;
  float t = u_time;

  // Normalized UV — square canvas keeps the circle round
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  uv -= 0.5;
  uv *= 1.2;
  uv += 0.5;

  float ff = 1.0 - uv.y;
  vec2 uv2 = uv;
  uv2.y = 1.0 - uv2.y;
  uv = polarMap(uv, 1.3, m1);
  uv2 = polarMap(uv2, 1.9, m1);

  vec3 c1 = color(shade(uv, t)) * ff;
  vec3 c2 = color(shade(uv2, t)) * (1.0 - ff);

  vec3 shaderColor = c1 + c2;

  // Raw intensity from the fire
  float intensity = dot(shaderColor, vec3(0.299, 0.587, 0.114));

  // Hard cut — only the ring and bright smoke get color.
  // Everything below this threshold is pure white.
  float mask = smoothstep(0.03, 0.5, intensity);

  // Golden yellow color, intensity-driven brightness
  vec3 gold = vec3(0.85, 0.65, 0.05);
  vec3 brightGold = vec3(1.0, 0.85, 0.25);
  vec3 tinted = mix(gold, brightGold, smoothstep(0.2, 0.6, intensity));

  // White where the fire is bright, gold where it's dark/smoky
  vec3 finalColor = mix(vec3(1.0), tinted, 1.0 - mask);

  gl_FragColor = vec4(finalColor, 1.0);
}
`

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("Shader compile error:", gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export function HeroShader({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" })
    if (!gl) return

    const vertShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vertShader || !fragShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertShader)
    gl.attachShader(program, fragShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("Program link error:", gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    // Full-screen quad
    const posBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const posLoc = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    // Uniforms
    const uResolution = gl.getUniformLocation(program, "u_resolution")
    const uTime = gl.getUniformLocation(program, "u_time")
    const uDistanceIntensity = gl.getUniformLocation(program, "u_distanceIntensity")
    const uTunnel = gl.getUniformLocation(program, "u_tunnel")

    gl.uniform1f(uDistanceIntensity, 0.5)
    gl.uniform1f(uTunnel, 1.0)

    // Resize handler
    const resize = () => {
      const dpr = window.devicePixelRatio // Full resolution for detail
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

    // Animation loop
    const startTime = performance.now()
    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000.0
      gl.uniform2f(uResolution, canvas.width, canvas.height)
      gl.uniform1f(uTime, elapsed)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
      gl.deleteProgram(program)
      gl.deleteShader(vertShader)
      gl.deleteShader(fragShader)
      gl.deleteBuffer(posBuffer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ display: "block" }}
    />
  )
}
