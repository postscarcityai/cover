/**
 * Shared GLSL preamble for hieroglyphic ribbon effects:
 * noise, hash, gold palette, shape distances, and stroke effects.
 */
export const RIBBON_PREAMBLE = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_speed;
uniform float u_intensity;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289v2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289((x * 34.0 + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289v2(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x_ = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x_) - 0.5;
  vec3 a0 = x_ - floor(x_ + 0.5);
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float hash(float n) { return fract(sin(n) * 43758.5453123); }

const vec3 coreGold  = vec3(0.95, 0.78, 0.22);
const vec3 brightGold = vec3(1.0, 0.90, 0.45);
const vec3 glowGold  = vec3(1.0, 0.88, 0.42);

float sdSegment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}

// parametric position along a segment (0 at a, 1 at b)
float segParam(vec2 p, vec2 a, vec2 b) {
  vec2 ba = b - a;
  return clamp(dot(p - a, ba) / dot(ba, ba), 0.0, 1.0);
}

// arc distance + parametric angle position
float sdArc(vec2 p, vec2 center, float radius, float startAngle, float arcLen) {
  vec2 d = p - center;
  float angle = atan(d.y, d.x);
  float midAngle = startAngle + arcLen * 0.5;
  float da = angle - midAngle;
  da = da - 6.283185 * floor((da + 3.141593) / 6.283185);
  float halfArc = arcLen * 0.5;
  if (abs(da) < halfArc) {
    return abs(length(d) - radius);
  } else {
    float e1a = startAngle;
    float e2a = startAngle + arcLen;
    vec2 e1 = center + radius * vec2(cos(e1a), sin(e1a));
    vec2 e2 = center + radius * vec2(cos(e2a), sin(e2a));
    return min(length(p - e1), length(p - e2));
  }
}

// parametric position along an arc (0..1)
float arcParam(vec2 p, vec2 center, float startAngle, float arcLen) {
  vec2 d = p - center;
  float angle = atan(d.y, d.x);
  float da = angle - startAngle;
  da = da - 6.283185 * floor((da + 3.141593) / 6.283185);
  return clamp(da / arcLen, 0.0, 1.0);
}

// calligraphic width: thicker in middle, tapers at ends
float calliWidth(float param, float baseWidth) {
  float taper = smoothstep(0.0, 0.15, param) * smoothstep(1.0, 0.85, param);
  return baseWidth * (0.3 + 0.7 * taper);
}

// discontinuous dash mask based on parametric position
float dashMask(float param, float seed, float t) {
  float n = sin(param * 18.0 + seed * 5.0 + t * 0.3) * 0.5 + 0.5;
  return smoothstep(0.25, 0.35, n);
}

// stroke reveal: animated drawing effect
float strokeReveal(float param, float t, float seed, float duration) {
  float reveal = fract(t * 0.04 + seed * 0.618);
  float head = reveal * (1.0 + duration);
  float tail = head - duration;
  return smoothstep(tail, tail + 0.08, param) * smoothstep(head, head - 0.08, param);
}

// full ribbon with calligraphic width + dash + reveal
vec2 glyphAlpha(float dist, float param, float baseWidth, float boldness, float seed, float t) {
  float w = calliWidth(param, baseWidth);
  float glowR = w * 3.5;
  float dash = dashMask(param, seed, t);
  float reveal = strokeReveal(param, t, seed, 0.6);
  float mask = max(dash, reveal);

  float core = 1.0 - smoothstep(0.0, w, dist);
  float glow = 1.0 - smoothstep(0.0, glowR, dist);
  float coreA = core * mix(0.7, 0.95, boldness);
  float glowA = glow * mix(0.08, 0.22, boldness);
  return vec2((coreA + glowA) * mask, core * mask);
}
`
