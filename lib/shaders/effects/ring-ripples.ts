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
  float shimmer = snoise(pos * 5.0 + t * 0.02) * 0.5 + 0.5;

  float totalAlpha = 0.0;
  vec3 totalColor = vec3(0.0);

  vec2 center = vec2(0.18 * aspect, 0.06);
  center += 0.004 * vec2(sin(t * 0.015), cos(t * 0.012));

  float rot = t * 0.004;

  // 5 concentric broken rings, expanding outward
  for (int i = 0; i < 5; i++) {
    float fi = float(i);
    float r = 0.06 + fi * 0.09;
    float seed = fi * 2.7;

    // 2–3 arcs per ring with deliberate gaps
    for (int j = 0; j < 3; j++) {
      float fj = float(j);
      if (j == 2 && fi < 2.0) continue; // inner rings get 2 arcs, outer get 3
      float startA = rot * (1.0 - fi * 0.1) + fi * 0.6 + fj * 2.094 + 0.3 * hash(seed + fj);
      float arcLen = 1.0 + 0.6 * hash(seed + fj + 0.3);

      float d = sdArc(pos, center, r, startA, arcLen);
      float param = arcParam(pos, center, startA, arcLen);

      float bw = 0.005 + 0.002 * fi;
      vec2 ra = glyphAlpha(d, param, bw, 0.55 + 0.08 * fi, seed + fj, t);

      vec3 col = mix(coreGold, brightGold, fi / 5.0 * 0.3 + shimmer * 0.12);
      vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
      totalColor += rc * ra.x; totalAlpha += ra.x;
    }
  }

  // 12 radial tick marks at varied distances — evenly spaced like a clock
  for (int i = 0; i < 12; i++) {
    float fi = float(i);
    float angle = fi * 0.5236 + rot * 0.5;
    vec2 dir = vec2(cos(angle), sin(angle));

    float innerR = 0.05 + 0.08 * hash(fi * 1.618 + 0.5);
    float outerR = innerR + 0.03 + 0.04 * hash(fi * 1.618 + 0.8);

    vec2 a = center + dir * innerR;
    vec2 b = center + dir * outerR;
    float d = sdSegment(pos, a, b);
    float param = segParam(pos, a, b);

    vec2 ra = glyphAlpha(d, param, 0.003, 0.45, fi * 2.3, t);
    vec3 col = mix(coreGold, brightGold, shimmer * 0.18);
    vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
    totalColor += rc * ra.x; totalAlpha += ra.x;
  }

  // center point with halo
  {
    float d = length(pos - center);
    float dot_ = 1.0 - smoothstep(0.0, 0.012, d);
    float halo = 1.0 - smoothstep(0.0, 0.032, d);
    float a = dot_ * 0.85 + halo * 0.14;
    totalColor += brightGold * a; totalAlpha += a;
  }

  totalAlpha = clamp(totalAlpha, 0.0, 1.0);
  totalColor = totalColor / max(totalAlpha, 0.001);
  totalAlpha *= u_intensity;

  gl_FragColor = vec4(totalColor, totalAlpha);
}
`
