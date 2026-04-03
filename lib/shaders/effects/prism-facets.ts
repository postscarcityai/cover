import { RIBBON_PREAMBLE } from "./ribbon-base"

/**
 * Glyph: Bloom — massive flower-of-life with broken petals,
 * each circle rendered as discontinuous arcs. For /work.
 */
export const PRISM_FACETS_FRAGMENT = RIBBON_PREAMBLE + `
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 pos = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  float t = u_time * u_speed;
  float shimmer = snoise(pos * 6.0 + t * 0.03) * 0.5 + 0.5;

  float totalAlpha = 0.0;
  vec3 totalColor = vec3(0.0);

  vec2 center = vec2(0.10 * aspect, -0.02);
  center += 0.004 * vec2(sin(t * 0.02), cos(t * 0.015));
  float rot = t * 0.004;
  float R = 0.28;

  // center circle: two arcs
  for (int j = 0; j < 2; j++) {
    float fj = float(j);
    float startA = rot + fj * 3.14159 + 0.4;
    float arcLen = 2.0 + 0.5 * hash(fj * 3.0);
    float d = sdArc(pos, center, R, startA, arcLen);
    float param = arcParam(pos, center, startA, arcLen);
    vec2 ra = glyphAlpha(d, param, 0.005, 0.7, fj * 5.0, t);
    vec3 col = mix(coreGold, brightGold, 0.35 + shimmer * 0.15);
    vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
    totalColor += rc * ra.x; totalAlpha += ra.x;
  }

  // six surrounding petals: each is 1-2 broken arcs
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    float angle = fi * 1.0472 + rot;
    vec2 c = center + R * vec2(cos(angle), sin(angle));

    float startA = angle + 2.5 + hash(fi * 1.618) * 0.5;
    float arcLen = 2.2 + 1.0 * hash(fi * 1.618 + 0.3);
    float d = sdArc(pos, c, R, startA, arcLen);
    float param = arcParam(pos, c, startA, arcLen);
    vec2 ra = glyphAlpha(d, param, 0.004, 0.55 + 0.15 * hash(fi), fi * 3.0 + 10.0, t);
    vec3 col = mix(coreGold, brightGold, fi / 6.0 * 0.2 + shimmer * 0.15);
    vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
    totalColor += rc * ra.x; totalAlpha += ra.x;
  }

  // outer ring: broken
  {
    float outerR = R * 2.15;
    for (int j = 0; j < 3; j++) {
      float fj = float(j);
      float startA = rot * 0.5 + fj * 2.094 + 0.2;
      float arcLen = 1.2 + 0.5 * hash(fj + 30.0);
      float d = sdArc(pos, center, outerR, startA, arcLen);
      float param = arcParam(pos, center, startA, arcLen);
      vec2 ra = glyphAlpha(d, param, 0.003, 0.4, fj + 40.0, t);
      vec3 col = mix(coreGold, brightGold, 0.15 + shimmer * 0.1);
      vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
      totalColor += rc * ra.x; totalAlpha += ra.x;
    }
  }

  totalAlpha = clamp(totalAlpha, 0.0, 1.0);
  totalColor = totalColor / max(totalAlpha, 0.001);
  totalAlpha *= u_intensity;

  vec3 color = mix(vec3(1.0), totalColor, totalAlpha);
  gl_FragColor = vec4(color, 1.0);
}
`
