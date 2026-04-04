import { RIBBON_PREAMBLE } from "./ribbon-base"

/**
 * Glyph: Codex — massive broken hexagonal lattice with
 * concentric rings and floating notation marks.
 * Like a transmission diagram. For /products.
 */
export const CONSTELLATION_FRAGMENT = RIBBON_PREAMBLE + `
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 pos = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  float t = u_time * u_speed;
  float shimmer = snoise(pos * 5.0 + t * 0.02) * 0.5 + 0.5;

  float totalAlpha = 0.0;
  vec3 totalColor = vec3(0.0);

  vec2 center = vec2(0.14 * aspect, 0.04);
  center += 0.003 * vec2(sin(t * 0.012), cos(t * 0.01));
  float rot = t * 0.003;

  // ── massive outer broken ring ──
  float outerR = 0.40;
  for (int i = 0; i < 5; i++) {
    float fi = float(i);
    float startA = rot + fi * 1.2566 + 0.15 * hash(fi * 2.7);
    float arcLen = 0.7 + 0.35 * hash(fi * 1.618 + 0.1);
    float d = sdArc(pos, center, outerR, startA, arcLen);
    float param = arcParam(pos, center, startA, arcLen);
    vec2 ra = glyphAlpha(d, param, 0.005, 0.7, fi * 3.0, t);
    vec3 col = mix(coreGold, brightGold, 0.2 + shimmer * 0.1);
    vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
    totalColor += rc * ra.x; totalAlpha += ra.x;
  }

  // ── outer hexagon: 6 broken sides ──
  float hexR = 0.28;
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    float a1 = fi * 1.0472 + rot;
    float a2 = (fi + 1.0) * 1.0472 + rot;
    vec2 p1 = center + hexR * vec2(cos(a1), sin(a1));
    vec2 p2 = center + hexR * vec2(cos(a2), sin(a2));
    float d = sdSegment(pos, p1, p2);
    float param = segParam(pos, p1, p2);
    vec2 ra = glyphAlpha(d, param, 0.004, 0.6, fi * 4.0 + 10.0, t);
    vec3 col = mix(coreGold, brightGold, 0.28 + shimmer * 0.12);
    vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
    totalColor += rc * ra.x; totalAlpha += ra.x;
  }

  // ── inner hexagon (rotated 30deg) ──
  float innerHexR = 0.16;
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    float a1 = fi * 1.0472 - rot + 0.5236;
    float a2 = (fi + 1.0) * 1.0472 - rot + 0.5236;
    vec2 p1 = center + innerHexR * vec2(cos(a1), sin(a1));
    vec2 p2 = center + innerHexR * vec2(cos(a2), sin(a2));
    float d = sdSegment(pos, p1, p2);
    float param = segParam(pos, p1, p2);
    vec2 ra = glyphAlpha(d, param, 0.003, 0.5, fi * 5.0 + 20.0, t);
    vec3 col = mix(coreGold, brightGold, 0.32 + shimmer * 0.12);
    vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
    totalColor += rc * ra.x; totalAlpha += ra.x;
  }

  // ── radial connectors: outer hex to inner hex ──
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    float outerAngle = fi * 1.0472 + rot;
    float innerAngle = fi * 1.0472 - rot + 0.5236;
    vec2 p1 = center + hexR * vec2(cos(outerAngle), sin(outerAngle));
    vec2 p2 = center + innerHexR * vec2(cos(innerAngle), sin(innerAngle));
    float d = sdSegment(pos, p1, p2);
    float param = segParam(pos, p1, p2);
    vec2 ra = glyphAlpha(d, param, 0.0025, 0.42, fi + 40.0, t);
    vec3 col = mix(coreGold, brightGold, shimmer * 0.18);
    vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
    totalColor += rc * ra.x; totalAlpha += ra.x;
  }

  // ── inner sanctum: broken circle ──
  {
    float r = 0.07;
    for (int j = 0; j < 2; j++) {
      float fj = float(j);
      float startA = -rot * 2.0 + fj * 3.14159 + 0.4;
      float arcLen = 1.8 + 0.4 * hash(fj + 50.0);
      float d = sdArc(pos, center, r, startA, arcLen);
      float param = arcParam(pos, center, startA, arcLen);
      vec2 ra = glyphAlpha(d, param, 0.003, 0.55, fj + 50.0, t);
      vec3 col = mix(coreGold, brightGold, 0.38 + shimmer * 0.12);
      vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
      totalColor += rc * ra.x; totalAlpha += ra.x;
    }
  }

  // ── notation ticks extending past outer ring ──
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    float angle = fi * 1.0472 + rot;
    vec2 dir = vec2(cos(angle), sin(angle));
    vec2 a = center + dir * (outerR - 0.03);
    vec2 b = center + dir * (outerR + 0.04 + 0.02 * hash(fi * 2.1));
    float d = sdSegment(pos, a, b);
    float param = segParam(pos, a, b);
    vec2 ra = glyphAlpha(d, param, 0.003, 0.48, fi + 60.0, t);
    vec3 col = mix(coreGold, brightGold, shimmer * 0.15);
    vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
    totalColor += rc * ra.x; totalAlpha += ra.x;
  }

  // ── center point ──
  {
    float d = length(pos - center);
    float dot_ = 1.0 - smoothstep(0.0, 0.012, d);
    float halo = 1.0 - smoothstep(0.0, 0.030, d);
    float a = dot_ * 0.85 + halo * 0.14;
    totalColor += brightGold * a; totalAlpha += a;
  }

  totalAlpha = clamp(totalAlpha, 0.0, 1.0);
  totalColor = totalColor / max(totalAlpha, 0.001);
  totalAlpha *= u_intensity;

  gl_FragColor = vec4(totalColor, totalAlpha);
}
`
