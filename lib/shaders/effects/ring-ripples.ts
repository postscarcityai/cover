import { RIBBON_PREAMBLE } from "./ribbon-base"

/**
 * Glyph: Beacon — massive concentric broken rings with
 * radial tick marks. Like a targeting sigil. For /services.
 */
export const RING_RIPPLES_FRAGMENT = RIBBON_PREAMBLE + `
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 pos = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  float t = u_time * u_speed;
  float shimmer = snoise(pos * 6.0 + t * 0.03) * 0.5 + 0.5;

  float totalAlpha = 0.0;
  vec3 totalColor = vec3(0.0);

  vec2 center = vec2(0.12 * aspect, -0.04);
  center += 0.005 * vec2(sin(t * 0.02), cos(t * 0.015));

  float rot = t * 0.005;

  // huge broken concentric arcs
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float r = 0.15 + fi * 0.18;
    float seed = fi * 2.7;

    // two arcs per ring, with big gaps
    for (int j = 0; j < 2; j++) {
      float fj = float(j);
      float startA = rot + fi * 0.4 + fj * 3.14159 + 0.3 * hash(seed + fj);
      float arcLen = 1.2 + 1.5 * hash(seed + fj + 0.3);

      float d = sdArc(pos, center, r, startA, arcLen);
      float param = arcParam(pos, center, startA, arcLen);

      float bw = 0.004 + 0.003 * fi;
      vec2 ra = glyphAlpha(d, param, bw, 0.6 + 0.1 * fi, seed + fj, t);

      vec3 col = mix(coreGold, brightGold, fi / 4.0 * 0.3 + shimmer * 0.15);
      vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
      totalColor += rc * ra.x; totalAlpha += ra.x;
    }
  }

  // radial tick marks at varied distances
  for (int i = 0; i < 8; i++) {
    float fi = float(i);
    float angle = fi * 0.785 + rot + hash(fi * 3.1) * 0.3;
    vec2 dir = vec2(cos(angle), sin(angle));

    float innerR = 0.12 + 0.15 * hash(fi * 1.618 + 0.5);
    float outerR = innerR + 0.06 + 0.08 * hash(fi * 1.618 + 0.8);

    vec2 a = center + dir * innerR;
    vec2 b = center + dir * outerR;
    float d = sdSegment(pos, a, b);
    float param = segParam(pos, a, b);

    vec2 ra = glyphAlpha(d, param, 0.003, 0.5, fi * 2.3, t);
    vec3 col = mix(coreGold, brightGold, shimmer * 0.2);
    vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
    totalColor += rc * ra.x; totalAlpha += ra.x;
  }

  totalAlpha = clamp(totalAlpha, 0.0, 1.0);
  totalColor = totalColor / max(totalAlpha, 0.001);
  totalAlpha *= u_intensity;

  vec3 color = mix(vec3(1.0), totalColor, totalAlpha);
  gl_FragColor = vec4(color, 1.0);
}
`
