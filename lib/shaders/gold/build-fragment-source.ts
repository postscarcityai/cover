/**
 * Single WebGL1 fragment shader: fbm gold glow + SDF shape ladder + band mask to white.
 */
export function buildGoldPaintFragmentSource(): string {
  return `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_shapeKind;
uniform float u_posScale;
uniform vec2 u_posOffset;
uniform float u_glowScale;
uniform float u_glowMin;
uniform vec3 u_band;
uniform float u_vFadeStrength;
uniform vec4 u_q0;
uniform vec4 u_q1;
uniform vec4 u_q2;
uniform vec4 u_q3;

float hash(vec2 p) {
  float h = dot(p, vec2(127.1, 311.7));
  return fract(sin(h) * 43758.5453123);
}

float noise(in vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return -1.0 + 2.0 * mix(mix(hash(i + vec2(0.0, 0.0)),
                              hash(i + vec2(1.0, 0.0)), u.x),
                          mix(hash(i + vec2(0.0, 1.0)),
                              hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm_noise(vec2 p) {
  const mat2 rot = mat2(1.736, 1.302, -1.302, 1.736);
  float fbm = noise(p);
  float amplitude = 0.617;
  for (int i = 0; i < 4; ++i) {
    p = rot * p;
    fbm += amplitude * noise(p);
    amplitude *= 0.617;
  }
  return fbm;
}

float smooth_max(float p, float q, float delta) {
  float h = clamp(0.5 + 0.5 * (p - q) / delta, 0.0, 1.0);
  return mix(q, p, h) + delta * h * (1.0 - h);
}

float sdTriangle(vec2 p, vec2 p0, vec2 p1, vec2 p2) {
  vec2 e0 = p1 - p0;
  vec2 e1 = p2 - p1;
  vec2 e2 = p0 - p2;
  vec2 v0 = p - p0;
  vec2 v1 = p - p1;
  vec2 v2 = p - p2;
  vec2 pq0 = v0 - e0 * clamp(dot(v0, e0) / dot(e0, e0), 0.0, 1.0);
  vec2 pq1 = v1 - e1 * clamp(dot(v1, e1) / dot(e1, e1), 0.0, 1.0);
  vec2 pq2 = v2 - e2 * clamp(dot(v2, e2) / dot(e2, e2), 0.0, 1.0);
  float s = sign(e0.x * e1.y - e0.y * e1.x);
  vec2 d0 = vec2(length(pq0), s * (v0.x * e0.y - v0.y * e0.x));
  vec2 d1 = vec2(length(pq1), s * (v1.x * e1.y - v1.y * e1.x));
  vec2 d2 = vec2(length(pq2), s * (v2.x * e2.y - v2.y * e2.x));
  vec2 dm = min(d0, min(d1, d2));
  return -dm.x * sign(dm.y);
}

float sdBox(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float sdSegment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float sdRoundRect(vec2 p, vec2 center, vec2 he, float rot, float rr) {
  vec2 pr = p - center;
  float ca = cos(-rot);
  float sa = sin(-rot);
  vec2 q = vec2(ca * pr.x - sa * pr.y, sa * pr.x + ca * pr.y);
  return sdBox(q, he) - rr;
}

float repeatLatticeSdf(vec2 pos, float time) {
  float px = max(u_q0.x, 0.032);
  float py = max(u_q0.y, 0.032);
  float mfx = clamp(u_q0.z, 0.08, 0.94);
  float mfy = clamp(u_q0.w, 0.08, 0.94);
  float rr = u_q1.x;
  float drift = u_q1.y;
  float st = clamp(u_q1.z, 0.0, 1.0);
  float rL = u_q1.w;
  float cr = cos(-rL);
  float sr = sin(-rL);
  vec2 p = vec2(cr * pos.x - sr * pos.y, sr * pos.x + cr * pos.y);
  float du = time * (0.24 + drift * 0.9);
  p += vec2(sin(du * 0.71), cos(du * 0.64)) * drift * vec2(px, py) * 0.12;
  vec2 cell = vec2(px, py);
  float rowA = floor(p.y / py);
  vec2 pA = p;
  pA.x += mod(rowA, 2.0) * st * px * 0.5;
  vec2 gA = fract(pA / cell) * cell - 0.5 * cell;
  vec2 heA = vec2(mfx * px * 0.5, mfy * py * 0.5);
  float br = 1.0 + 0.042 * sin(time * 0.52 + p.x * 0.18 + p.y * 0.14);
  heA *= br;
  float dA = sdBox(gA, heA) - rr;
  float useDual = u_q2.x;
  float kb = max(u_q2.y, 0.016) * min(px, py);
  float sc = clamp(u_q2.z, 0.45, 1.0);
  vec2 pB = p + 0.5 * cell;
  float rowB = floor(pB.y / py);
  pB.x += mod(rowB, 2.0) * st * px * 0.5;
  vec2 gB = fract(pB / cell) * cell - 0.5 * cell;
  vec2 heB = heA * sc;
  float dB = sdBox(gB, heB) - rr * 0.93;
  return mix(dA, smin(dA, dB, kb), useDual);
}

const vec3 internalGlowColor = vec3(0.98, 0.62, 0.12);
const vec3 externalGlowColor = vec3(1.0, 0.72, 0.18);

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  vec2 uv = (fragCoord - 0.5 * u_resolution.xy) / u_resolution.xx;
  vec2 pos = u_posScale * uv + u_posOffset;

  float t = 0.0225 * u_time;
  float co = cos(t);
  float si = sin(t);
  mat2 r = mat2(co, si, -si, co);
  vec2 n = vec2(fbm_noise(7.0 * uv + r * vec2(4.0, -7.0)),
                fbm_noise(7.0 * uv + r * vec2(-5.0, 6.0)));

  pos += 0.0075 * n;

  float sdf;
  if (u_shapeKind < 0.5) {
    vec2 t0 = u_q0.xy;
    vec2 t1 = u_q0.zw;
    vec2 t2 = u_q1.xy;
    float tr = u_q1.z;
    sdf = sdTriangle(pos, t0, t1, t2) + tr;
  } else if (u_shapeKind < 1.5) {
    vec2 c = u_q0.xy;
    float rad = u_q0.z;
    sdf = length(pos - c) - rad;
  } else if (u_shapeKind < 2.5) {
    vec2 center = u_q0.xy;
    vec2 he = u_q0.zw;
    float rot = u_q1.x;
    float rr = u_q1.y;
    vec2 pr = pos - center;
    float ca = cos(-rot);
    float sa = sin(-rot);
    vec2 p2 = vec2(ca * pr.x - sa * pr.y, sa * pr.x + ca * pr.y);
    sdf = sdBox(p2, he) - rr;
  } else if (u_shapeKind < 3.5) {
    vec2 a = u_q0.xy;
    vec2 b = u_q0.zw;
    float halfTh = u_q1.x;
    sdf = sdSegment(pos, a, b) - halfTh;
  } else if (u_shapeKind < 4.5) {
    vec2 dir = u_q0.xy;
    float plen = length(dir);
    vec2 d = plen > 1e-5 ? dir / plen : vec2(1.0, 0.0);
    vec2 perp = vec2(-d.y, d.x);
    float period = u_q0.z;
    float hw = u_q0.w;
    float ph = u_q1.x;
    float u = dot(pos, perp) + ph;
    float m = mod(u, period);
    sdf = min(m, period - m) - hw;
  } else if (u_shapeKind < 5.5) {
    vec2 c1 = u_q0.xy;
    float r1 = u_q0.z;
    vec2 c2 = vec2(u_q0.w, u_q1.x);
    float r2 = u_q1.y;
    float kb = u_q1.z;
    float dA = length(pos - c1) - r1;
    float dB = length(pos - c2) - r2;
    sdf = smin(dA, dB, kb);
  } else if (u_shapeKind < 6.5) {
    vec2 c1 = u_q0.xy;
    float r1 = u_q0.z;
    vec2 c2 = vec2(u_q0.w, u_q1.x);
    float r2 = u_q1.y;
    vec2 c3 = u_q1.zw;
    float r3 = u_q2.x;
    float kb = u_q2.y;
    float dA = length(pos - c1) - r1;
    float dB = length(pos - c2) - r2;
    float dC = length(pos - c3) - r3;
    sdf = smin(smin(dA, dB, kb), dC, kb);
  } else if (u_shapeKind < 7.5) {
    vec2 baseC = u_q0.xy;
    vec2 he = u_q0.zw;
    float tilt0 = u_q1.x;
    float rr = u_q1.y;
    float spd = max(u_q1.z, 0.05);
    float ph = mod(u_time * spd, 1.0);
    float rot = tilt0;
    float horiz = smoothstep(0.22, 0.36, ph) * (1.0 - smoothstep(0.85, 0.98, ph));
    float quad = smoothstep(0.50, 0.64, ph) * (1.0 - smoothstep(0.83, 0.96, ph));
    float spreadH = 1.46;
    float spreadV = 1.42;
    float sx = max(horiz, quad) * he.x * 0.5 * spreadH;
    float sy = quad * he.y * 0.5 * spreadV;
    vec2 hPiece = vec2(he.x * 0.5, mix(he.y, he.y * 0.5, quad));
    float cr = cos(rot);
    float sr = sin(rot);
    vec2 o0 = baseC + vec2(cr * (-sx) - sr * (-sy), sr * (-sx) + cr * (-sy));
    vec2 o1 = baseC + vec2(cr * sx - sr * (-sy), sr * sx + cr * (-sy));
    vec2 o2 = baseC + vec2(cr * (-sx) - sr * sy, sr * (-sx) + cr * sy);
    vec2 o3 = baseC + vec2(cr * sx - sr * sy, sr * sx + cr * sy);
    float dm = sdRoundRect(pos, o0, hPiece, rot, rr);
    dm = min(dm, sdRoundRect(pos, o1, hPiece, rot, rr));
    dm = min(dm, sdRoundRect(pos, o2, hPiece, rot, rr));
    dm = min(dm, sdRoundRect(pos, o3, hPiece, rot, rr));
    sdf = dm;
  } else {
    sdf = repeatLatticeSdf(pos, u_time);
  }

  float d = max(1.0 + sdf * u_glowScale, u_glowMin);
  float di = smooth_max(min(d, 1.0), 0.7, 0.2);
  float de = max(d, 1.0);

  di = pow(di, -0.8);
  de = pow(de, 2.8);

  float shell0 = max(max(di, de) - 1.0, 0.00012);
  float d0 = 0.07 / shell0;
  d0 = pow(d0, 0.8);

  de = pow(de, 14.5);
  float d1 = max(max(di, de) - 1.0, 0.00012);
  d1 *= 1.0 + 0.25 * (abs(n.x) + abs(n.y));
  d1 = 0.7 / max(d1, 0.00012);
  d1 = pow(d1, 0.4);

  vec3 lit = d1 * internalGlowColor + d0 * externalGlowColor;
  lit = lit / (0.1 + lit);
  lit = clamp(lit, vec3(0.0), vec3(40.0));
  lit = lit * 2.4;
  lit = vec3(1.0) - exp(-lit * vec3(1.1, 0.95, 0.75));
  lit = pow(lit, vec3(0.88));
  lit *= vec3(1.06, 1.0, 0.72);
  lit = clamp(lit, vec3(0.0), vec3(1.0));

  float bandSharp = u_band.x;
  float band = exp(-(sdf * sdf) * bandSharp);
  vec3 gold = mix(vec3(1.0), lit, band);

  float inside = 1.0 - smoothstep(-0.22, 0.05, sdf);
  vec3 warmWash = vec3(1.0, 0.97, 0.88);
  gold = mix(gold, warmWash, inside * 0.42);

  float vf = pow(clamp(0.52 - 0.48 * pos.y, 0.0, 1.0), 1.25);
  float topOpen = mix(1.0, vf, clamp(u_vFadeStrength, 0.0, 1.0));
  vec3 color = mix(vec3(1.0), gold, topOpen);

  float lum = dot(color, vec3(0.299, 0.587, 0.114));
  float peak = max(max(color.r, color.g), color.b);
  float pop = smoothstep(0.11, 0.52, peak) * smoothstep(0.06, 0.44, lum + 0.22 * peak);
  pop = pow(clamp(pop, 0.0, 1.0), 0.9);
  color = mix(vec3(1.0), color, pop);

  gl_FragColor = vec4(color, 1.0);
}
`
}
