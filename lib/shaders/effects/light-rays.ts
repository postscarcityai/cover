import { RIBBON_PREAMBLE } from "./ribbon-base"

/**
 * Glyph: Spiral Script — massive broken spiral with
 * scattered notation marks. For /about.
 */
export const LIGHT_RAYS_FRAGMENT = RIBBON_PREAMBLE + `
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 pos = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  float t = u_time * u_speed;
  float shimmer = snoise(pos * 6.0 + t * 0.03) * 0.5 + 0.5;

  float totalAlpha = 0.0;
  vec3 totalColor = vec3(0.0);

  vec2 center = vec2(0.10 * aspect, -0.02);
  center += 0.005 * vec2(sin(t * 0.02), cos(t * 0.015));
  float rot = t * 0.008;

  // massive Archimedean spiral, rendered as broken arcs
  float spiralA = 0.04;
  float spiralB = 0.055;

  for (int i = 0; i < 8; i++) {
    float fi = float(i);
    float theta = fi * 1.2 + rot;
    float r = spiralA + spiralB * theta;
    if (r > 0.6) continue;

    float arcLen = 0.8 + 0.6 * hash(fi * 1.618);
    float d = sdArc(pos, center, r, theta, arcLen);
    float param = arcParam(pos, center, theta, arcLen);

    float bw = 0.003 + 0.003 * (1.0 - r / 0.6);
    vec2 ra = glyphAlpha(d, param, bw, 0.6, fi * 2.5, t);
    vec3 col = mix(coreGold, brightGold, fi / 8.0 * 0.3 + shimmer * 0.15);
    vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
    totalColor += rc * ra.x; totalAlpha += ra.x;
  }

  // scattered notation marks around the spiral
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    float seed = fi * 3.7 + 50.0;
    float angle = fi * 1.047 + rot * 0.5 + hash(seed) * 1.5;
    float dist = 0.20 + 0.25 * hash(seed + 0.1);
    vec2 markCenter = center + dist * vec2(cos(angle), sin(angle));

    float markAngle = hash(seed + 0.2) * 3.14159;
    float markLen = 0.02 + 0.04 * hash(seed + 0.3);
    vec2 dir = vec2(cos(markAngle), sin(markAngle));
    vec2 a = markCenter - dir * markLen;
    vec2 b = markCenter + dir * markLen;

    float d = sdSegment(pos, a, b);
    float param = segParam(pos, a, b);
    vec2 ra = glyphAlpha(d, param, 0.0025, 0.45, seed, t);
    vec3 col = mix(coreGold, brightGold, shimmer * 0.2);
    vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
    totalColor += rc * ra.x; totalAlpha += ra.x;
  }

  // center dot
  {
    float d = length(pos - center);
    float dot_ = 1.0 - smoothstep(0.0, 0.010, d);
    float halo = 1.0 - smoothstep(0.0, 0.025, d);
    float a = dot_ * 0.8 + halo * 0.15;
    totalColor += brightGold * a; totalAlpha += a;
  }

  totalAlpha = clamp(totalAlpha, 0.0, 1.0);
  totalColor = totalColor / max(totalAlpha, 0.001);
  totalAlpha *= u_intensity;

  vec3 color = mix(vec3(1.0), totalColor, totalAlpha);
  gl_FragColor = vec4(color, 1.0);
}
`
