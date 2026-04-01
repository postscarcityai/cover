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

mat2 rot(in float a){float c = cos(a), s = sin(a); return mat2(c,s,-s,c);}
const mat3 m3 = mat3(0.33338, 0.56034, -0.71817, -0.87887, 0.32651, -0.15323, 0.15162, 0.69596, 0.61339)*1.93;
float mag2(vec2 p){return dot(p,p);}
float linstep(in float mn, in float mx, in float x){ return clamp((x - mn)/(mx - mn), 0., 1.); }
float prm1 = 0.;

vec2 disp(float t){ return vec2(sin(t*0.22)*1., cos(t*0.175)*1.)*2.; }

vec2 map(vec3 p, float time)
{
    vec3 p2 = p;
    p2.xy -= disp(p.z).xy;
    p.xy *= rot(sin(p.z+time)*(0.1 + prm1*0.05) + time*0.09);
    float cl = mag2(p2.xy);
    float d = 0.;
    p *= .61;
    float z = 1.;
    float trk = 1.;
    float dspAmp = 0.1 + prm1*0.2;
    for(int i = 0; i < 5; i++)
    {
        p += sin(p.zxy*0.75*trk + time*trk*.8)*dspAmp;
        d -= abs(dot(cos(p), sin(p.yzx))*z);
        z *= 0.57;
        trk *= 1.4;
        p = p*m3;
    }
    d = abs(d + prm1*3.)+ prm1*.3 - 2.5;
    return vec2(d + cl*.2 + 0.25, cl);
}

vec4 render(in vec3 ro, in vec3 rd, float time)
{
    vec4 rez = vec4(0);
    const float ldst = 8.;
    vec3 lpos = vec3(disp(time + ldst)*0.5, time + ldst);
    float t = 1.5;
    float fogT = 0.;
    for(int i=0; i<80; i++)
    {
        if(rez.a > 0.99) break;

        vec3 pos = ro + t*rd;
        vec2 mpv = map(pos, time);
        float den = clamp(mpv.x-0.3,0.,1.)*1.12;
        float dn = clamp((mpv.x + 2.),0.,3.);

        vec4 col = vec4(0);
        if (mpv.x > 0.6)
        {
            // Amber/gold base, with purple and teal shifts based on position
            vec3 amber = vec3(0.95, 0.65, 0.15);
            vec3 purple = vec3(0.55, 0.2, 0.65);
            vec3 teal = vec3(0.15, 0.6, 0.55);
            float blend1 = sin(pos.z * 0.15 + mpv.y * 0.3) * 0.5 + 0.5;
            float blend2 = cos(pos.x * 0.2 + pos.z * 0.1) * 0.5 + 0.5;
            vec3 baseCol = mix(amber, mix(purple, teal, blend2), blend1 * 0.6);
            col = vec4(baseCol, 0.08);
            col *= den*den*den;
            col.rgb *= linstep(4.,-2.5, mpv.x)*2.3;
            float dif = clamp((den - map(pos+.8, time).x)/9., 0.001, 1.);
            dif += clamp((den - map(pos+.35, time).x)/2.5, 0.001, 1.);
            // Warm lighting — boosted so colors survive the lighten pass
            col.xyz *= den*(vec3(0.06, 0.04, 0.03) + 2.2*vec3(0.1, 0.07, 0.04)*dif);
        }

        float fogC = exp(t*0.2 - 2.2);
        col.rgba += vec4(0.07, 0.05, 0.04, 0.12)*clamp(fogC-fogT, 0., 1.);
        fogT = fogC;
        rez = rez + col*(1. - rez.a);
        t += clamp(0.5 - dn*dn*.05, 0.09, 0.3);
    }
    return clamp(rez, 0.0, 1.0);
}

float getsat(vec3 c)
{
    float mi = min(min(c.x, c.y), c.z);
    float ma = max(max(c.x, c.y), c.z);
    return (ma - mi)/(ma + 1e-7);
}

vec3 iLerp(in vec3 a, in vec3 b, in float x)
{
    vec3 ic = mix(a, b, x) + vec3(1e-6, 0., 0.);
    float sd = abs(getsat(ic) - mix(getsat(a), getsat(b), x));
    vec3 dir = normalize(vec3(2.*ic.x - ic.y - ic.z, 2.*ic.y - ic.x - ic.z, 2.*ic.z - ic.y - ic.x));
    float lgt = dot(vec3(1.0), ic);
    float ff = dot(dir, normalize(ic));
    ic += 1.5*dir*sd*ff*lgt;
    return clamp(ic, 0., 1.);
}

void main()
{
    vec2 q = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = (gl_FragCoord.xy - 0.5*u_resolution.xy) / u_resolution.y;

    float time = u_time * 1.2;
    vec3 ro = vec3(0, 0, time);

    ro += vec3(sin(u_time)*0.5, sin(u_time*1.)*0., 0);

    float dspAmp = .85;
    ro.xy += disp(ro.z)*dspAmp;
    float tgtDst = 3.5;

    vec3 target = normalize(ro - vec3(disp(time + tgtDst)*dspAmp, time + tgtDst));
    vec3 rightdir = normalize(cross(target, vec3(0, 1, 0)));
    vec3 updir = normalize(cross(rightdir, target));
    rightdir = normalize(cross(updir, target));
    vec3 rd = normalize((p.x*rightdir + p.y*updir)*1. - target);
    rd.xy *= rot(-disp(time + 3.5).x*0.2);
    prm1 = smoothstep(-0.4, 0.4, sin(u_time*0.3));
    vec4 scn = render(ro, rd, time);

    vec3 col = scn.rgb;

    // Neutral grade — don't crush any channel
    col = pow(col, vec3(.55, 0.55, 0.55)) * vec3(1.05, 1.0, 1.0);

    // Lighten gently — keep color richness
    col = mix(vec3(0.95, 0.94, 0.92), col * 2.2, smoothstep(0.0, 0.04, dot(col, vec3(0.33))));

    // Vignette
    col *= pow(16.0*q.x*q.y*(1.0-q.x)*(1.0-q.y), 0.08)*0.85 + 0.15;

    gl_FragColor = vec4(col, 1.0);
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

export function CloudShader({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "default" })
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

    const posBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const posLoc = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uResolution = gl.getUniformLocation(program, "u_resolution")
    const uTime = gl.getUniformLocation(program, "u_time")

    // Lower res for this heavy shader — 0.6x device pixels
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5) * 0.6
      const w = Math.floor(canvas.clientWidth * dpr)
      const h = Math.floor(canvas.clientHeight * dpr)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    resize()
    window.addEventListener("resize", resize)

    // Only render when visible
    let isVisible = false
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting },
      { threshold: 0.1 }
    )
    observer.observe(canvas)

    const startTime = performance.now()
    const render = () => {
      if (isVisible) {
        const elapsed = (performance.now() - startTime) / 1000.0
        gl.uniform2f(uResolution, canvas.width, canvas.height)
        gl.uniform1f(uTime, elapsed)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }
      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
      observer.disconnect()
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
