import { RIBBON_PREAMBLE } from "./ribbon-base"

/**
 * Glyph: Triad — three massive interlocking broken rings
 * with connecting mark strokes. For /privacy-policy.
 */
export const AURORA_FRAGMENT = RIBBON_PREAMBLE + `
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
  float rot = t * 0.005;
  float R = 0.30;
  float spread = 0.18;

  // three massive broken circles
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float angle = fi * 2.094 + rot;
    vec2 c = center + spread * vec2(cos(angle), sin(angle));

    for (int j = 0; j < 2; j++) {
      float fj = float(j);
      float startA = rot * (1.0 + fi * 0.3) + fj * 3.14159 + fi * 0.7;
      float arcLen = 1.5 + 0.8 * hash(fi * 3.0 + fj);
      float d = sdArc(pos, c, R, startA, arcLen);
      float param = arcParam(pos, c, startA, arcLen);
      float bw = 0.004 + 0.002 * fi;
      vec2 ra = glyphAlpha(d, param, bw, 0.6 + 0.1 * fi, fi * 5.0 + fj * 2.0, t);
      vec3 col = mix(coreGold, brightGold, fi / 3.0 * 0.25 + shimmer * 0.15);
      vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
      totalColor += rc * ra.x; totalAlpha += ra.x;
    }
  }

  // connecting strokes between ring centers
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float a1 = fi * 2.094 + rot;
    float a2 = (fi + 1.0) * 2.094 + rot;
    vec2 p1 = center + spread * vec2(cos(a1), sin(a1));
    vec2 p2 = center + spread * vec2(cos(a2), sin(a2));
    float d = sdSegment(pos, p1, p2);
    float param = segParam(pos, p1, p2);
    vec2 ra = glyphAlpha(d, param, 0.0025, 0.45, fi + 30.0, t);
    vec3 col = mix(coreGold, brightGold, shimmer * 0.2);
    vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
    totalColor += rc * ra.x; totalAlpha += ra.x;
  }

  // center mark
  {
    float d = length(pos - center);
    float dot_ = 1.0 - smoothstep(0.0, 0.008, d);
    float halo = 1.0 - smoothstep(0.0, 0.020, d);
    float a = dot_ * 0.75 + halo * 0.15;
    totalColor += brightGold * a; totalAlpha += a;
  }

  totalAlpha = clamp(totalAlpha, 0.0, 1.0);
  totalColor = totalColor / max(totalAlpha, 0.001);
  totalAlpha *= u_intensity;

  vec3 color = mix(vec3(1.0), totalColor, totalAlpha);
  gl_FragColor = vec4(color, 1.0);
}
`
