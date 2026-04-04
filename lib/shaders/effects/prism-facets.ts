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
  float shimmer = snoise(pos * 5.0 + t * 0.025) * 0.5 + 0.5;

  float totalAlpha = 0.0;
  vec3 totalColor = vec3(0.0);

  vec2 center = vec2(0.16 * aspect, 0.04);
  center += 0.004 * vec2(sin(t * 0.015), cos(t * 0.012));
  float rot = t * 0.003;
  float R = 0.20;

  // center circle: three arcs for structure
  for (int j = 0; j < 3; j++) {
    float fj = float(j);
    float startA = rot + fj * 2.094 + 0.3;
    float arcLen = 1.4 + 0.4 * hash(fj * 3.0);
    float d = sdArc(pos, center, R, startA, arcLen);
    float param = arcParam(pos, center, startA, arcLen);
    vec2 ra = glyphAlpha(d, param, 0.005, 0.65, fj * 5.0, t);
    vec3 col = mix(coreGold, brightGold, 0.32 + shimmer * 0.12);
    vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
    totalColor += rc * ra.x; totalAlpha += ra.x;
  }

  // six surrounding petals: each is 2 broken arcs
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    float angle = fi * 1.0472 + rot;
    vec2 c = center + R * vec2(cos(angle), sin(angle));

    for (int j = 0; j < 2; j++) {
      float fj = float(j);
      float startA = angle + 2.2 + fj * 2.5 + hash(fi * 1.618 + fj) * 0.4;
      float arcLen = 1.4 + 0.6 * hash(fi * 1.618 + fj + 0.3);
      float d = sdArc(pos, c, R, startA, arcLen);
      float param = arcParam(pos, c, startA, arcLen);
      vec2 ra = glyphAlpha(d, param, 0.004, 0.5 + 0.1 * hash(fi), fi * 3.0 + fj + 10.0, t);
      vec3 col = mix(coreGold, brightGold, fi / 6.0 * 0.2 + shimmer * 0.12);
      vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
      totalColor += rc * ra.x; totalAlpha += ra.x;
    }
  }

  // outer containment ring: broken into 4 arcs
  {
    float outerR = R * 2.25;
    for (int j = 0; j < 4; j++) {
      float fj = float(j);
      float startA = rot * 0.5 + fj * 1.5708 + 0.15;
      float arcLen = 0.9 + 0.4 * hash(fj + 30.0);
      float d = sdArc(pos, center, outerR, startA, arcLen);
      float param = arcParam(pos, center, startA, arcLen);
      vec2 ra = glyphAlpha(d, param, 0.003, 0.38, fj + 40.0, t);
      vec3 col = mix(coreGold, brightGold, 0.15 + shimmer * 0.1);
      vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
      totalColor += rc * ra.x; totalAlpha += ra.x;
    }
  }

  // inner ring for depth
  {
    float innerR = R * 0.45;
    for (int j = 0; j < 2; j++) {
      float fj = float(j);
      float startA = -rot * 1.5 + fj * 3.14159 + 0.5;
      float arcLen = 1.8 + 0.4 * hash(fj + 50.0);
      float d = sdArc(pos, center, innerR, startA, arcLen);
      float param = arcParam(pos, center, startA, arcLen);
      vec2 ra = glyphAlpha(d, param, 0.003, 0.5, fj + 50.0, t);
      vec3 col = mix(coreGold, brightGold, 0.36 + shimmer * 0.12);
      vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
      totalColor += rc * ra.x; totalAlpha += ra.x;
    }
  }

  // center point
  {
    float d = length(pos - center);
    float dot_ = 1.0 - smoothstep(0.0, 0.010, d);
    float halo = 1.0 - smoothstep(0.0, 0.028, d);
    float a = dot_ * 0.85 + halo * 0.14;
    totalColor += brightGold * a; totalAlpha += a;
  }

  totalAlpha = clamp(totalAlpha, 0.0, 1.0);
  totalColor = totalColor / max(totalAlpha, 0.001);
  totalAlpha *= u_intensity;

  gl_FragColor = vec4(totalColor, totalAlpha);
}
`
