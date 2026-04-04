import { RIBBON_PREAMBLE } from "./ribbon-base"

/**
 * Glyph: Spiral Script — massive broken spiral with
 * scattered notation marks radiating outward. For /about.
 */
export const LIGHT_RAYS_FRAGMENT = RIBBON_PREAMBLE + `
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
  float rot = t * 0.006;

  // massive Archimedean spiral: 12 segments for 3+ full turns
  float spiralA = 0.03;
  float spiralB = 0.032;

  for (int i = 0; i < 12; i++) {
    float fi = float(i);
    float theta = fi * 1.1 + rot;
    float r = spiralA + spiralB * theta;
    if (r > 0.42) continue;

    float arcLen = 0.7 + 0.5 * hash(fi * 1.618);
    float d = sdArc(pos, center, r, theta, arcLen);
    float param = arcParam(pos, center, theta, arcLen);

    float bw = 0.004 + 0.003 * (1.0 - r / 0.42);
    vec2 ra = glyphAlpha(d, param, bw, 0.55, fi * 2.5, t);
    vec3 col = mix(coreGold, brightGold, fi / 12.0 * 0.3 + shimmer * 0.12);
    vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
    totalColor += rc * ra.x; totalAlpha += ra.x;
  }

  // scattered notation marks radiating outward
  for (int i = 0; i < 8; i++) {
    float fi = float(i);
    float seed = fi * 3.7 + 50.0;
    float angle = fi * 0.785 + rot * 0.4 + hash(seed) * 1.2;
    float dist = 0.14 + 0.18 * hash(seed + 0.1);
    vec2 markCenter = center + dist * vec2(cos(angle), sin(angle));

    float markAngle = hash(seed + 0.2) * 3.14159;
    float markLen = 0.025 + 0.04 * hash(seed + 0.3);
    vec2 dir = vec2(cos(markAngle), sin(markAngle));
    vec2 a = markCenter - dir * markLen;
    vec2 b = markCenter + dir * markLen;

    float d = sdSegment(pos, a, b);
    float param = segParam(pos, a, b);
    vec2 ra = glyphAlpha(d, param, 0.0025, 0.42, seed, t);
    vec3 col = mix(coreGold, brightGold, shimmer * 0.18);
    vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
    totalColor += rc * ra.x; totalAlpha += ra.x;
  }

  // containment ring — broken outer boundary
  {
    float outerR = 0.38;
    for (int j = 0; j < 3; j++) {
      float fj = float(j);
      float startA = -rot * 0.3 + fj * 2.094 + 0.2;
      float arcLen = 1.0 + 0.4 * hash(fj + 70.0);
      float d = sdArc(pos, center, outerR, startA, arcLen);
      float param = arcParam(pos, center, startA, arcLen);
      vec2 ra = glyphAlpha(d, param, 0.003, 0.35, fj + 70.0, t);
      vec3 col = mix(coreGold, brightGold, 0.15 + shimmer * 0.1);
      vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
      totalColor += rc * ra.x; totalAlpha += ra.x;
    }
  }

  // center dot
  {
    float d = length(pos - center);
    float dot_ = 1.0 - smoothstep(0.0, 0.010, d);
    float halo = 1.0 - smoothstep(0.0, 0.028, d);
    float a = dot_ * 0.8 + halo * 0.14;
    totalColor += brightGold * a; totalAlpha += a;
  }

  totalAlpha = clamp(totalAlpha, 0.0, 1.0);
  totalColor = totalColor / max(totalAlpha, 0.001);
  totalAlpha *= u_intensity;

  gl_FragColor = vec4(totalColor, totalAlpha);
}
`
