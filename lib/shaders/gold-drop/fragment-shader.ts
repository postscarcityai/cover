/**
 * WebGL1 fragment shader: horizontal gold ribbons along the bottom.
 *
 * Wavy lines run left-to-right; y undulates with x + time. Packed in a
 * bottom band so the hero copy stays clear above.
 *
 * When u_opaqueBg < 0.5, outputs premultiplied-friendly RGBA (gold only);
 * use with alpha:true WebGL + blending for seam overlays.
 */
export function buildGoldDropFragmentSource(): string {
  return `
precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_noiseScale;
uniform float u_speed;
uniform float u_intensity;
uniform float u_rightBias;
uniform float u_topFade;
uniform float u_bottomFade;
uniform float u_opaqueBg;
uniform float u_bandCenter;
uniform float u_bandHalfH;
uniform float u_geometryScale;
uniform float u_waveXScale;
uniform float u_softRim;

/* ── noise ── */

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289v2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289((x * 34.0 + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289v2(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x_ = 2.0 * fract(p * C.www) - 1.0;
  vec3 h  = abs(x_) - 0.5;
  vec3 a0 = x_ - floor(x_ + 0.5);
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x * x0.x  + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float hash(float n) { return fract(sin(n) * 43758.5453123); }

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 pos = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);

  float t = u_time * u_speed;
  float shimmer = snoise(pos * 16.0 + t * 0.07) * 0.5 + 0.5;

  // richer gold so ribbons pop against the light background
  vec3 coreGold   = vec3(0.82, 0.62, 0.08);
  vec3 brightGold = vec3(0.95, 0.78, 0.22);
  vec3 glowGold   = vec3(0.88, 0.70, 0.14);

  float totalAlpha = 0.0;
  vec3  totalColor = vec3(0.0);

  const int COUNT = 5;

  float bandYMin     = u_bandCenter - u_bandHalfH;
  float bandYMax     = u_bandCenter + u_bandHalfH;
  float bandHeight   = bandYMax - bandYMin;
  float bandCenterY  = u_bandCenter;
  float g            = u_geometryScale;
  float xw           = pos.x * u_waveXScale;

  for (int i = 0; i < COUNT; i++) {
    float fi   = float(i);
    float seed = fi * 1.618033988;

    float yBase = bandYMin + bandHeight * hash(seed + 0.1);

    float amp1  = (0.014 + 0.024 * hash(seed + 0.2)) * g;
    float freq1 = 0.7   + 1.35 * hash(seed + 0.3);
    float amp2  = (0.007 + 0.014 * hash(seed + 0.4)) * g;
    float freq2 = 1.45  + 2.35 * hash(seed + 0.5);
    float phase = 6.283 * hash(seed + 0.6);

    float boldness = hash(seed + 0.7);
    float width = mix(0.0026, 0.0135, boldness * boldness) * g;
    float glowR = width * 3.15;

    float spdMul = 0.7 + 0.6 * hash(seed + 0.8);
    float rt = t * spdMul;

    float curve = yBase
      + amp1 * sin(xw * freq1 + rt * 0.14 + phase)
      + amp2 * sin(xw * freq2 - rt * 0.09 + phase * 1.7);

    float d = abs(pos.y - curve);

    float core = 1.0 - smoothstep(0.0, width, d);
    float glow = 1.0 - smoothstep(0.0, glowR, d);

    float warmth = hash(seed + 0.9);
    vec3 col = mix(coreGold, brightGold, warmth * 0.5 + shimmer * 0.2);

    float coreA = core * mix(0.7, 0.95, boldness);
    float glowA = glow * mix(0.08, 0.20, boldness);
    float a = coreA + glowA;

    vec3 ribbonCol = mix(glowGold, col, clamp(core / max(a, 0.001), 0.0, 1.0));

    totalColor += ribbonCol * a;
    totalAlpha += a;
  }

  totalAlpha = clamp(totalAlpha, 0.0, 1.0);
  totalColor = totalColor / max(totalAlpha, 0.001);
  totalAlpha  = clamp(totalAlpha * u_intensity, 0.0, 1.0);

  // ── animated background — pale blue-white ──
  // bgLight ≈ #F2F5FB, bgDeep ≈ #E8EDF7
  vec3 bgLight = vec3(0.949, 0.961, 0.984);
  vec3 bgDeep  = vec3(0.910, 0.929, 0.969);

  float fog1 = snoise(pos * 1.2 + vec2(t * 0.02, -t * 0.015)) * 0.5 + 0.5;
  float fog2 = snoise(pos * 0.7 + vec2(-t * 0.018, t * 0.012) + 3.7) * 0.5 + 0.5;
  float mist = smoothstep(0.3, 0.7, fog1 * 0.6 + fog2 * 0.4);

  vec3 bg = mix(bgDeep, bgLight, mist);

  if (u_softRim > 0.5) {
    float bandProximity = smoothstep(u_bandHalfH * 1.6, 0.0, abs(pos.y - bandCenterY));
    bg = mix(bg, vec3(0.96, 0.94, 0.88), bandProximity * 0.25 * fog1);
    bg += vec3(0.03, 0.02, 0.0) * (totalAlpha * 0.08);
  }

  if (u_opaqueBg > 0.5) {
    gl_FragColor = vec4(mix(bg, totalColor, totalAlpha), 1.0);
  } else {
    gl_FragColor = vec4(totalColor, totalAlpha);
  }
}
`
}
