import { RIBBON_PREAMBLE } from "./ribbon-base"

/**
 * Glyph: Eye — massive vesica piscis with broken rings
 * and inner detail. Watching. For /contact.
 */
export const VORONOI_FRAGMENT = RIBBON_PREAMBLE + `
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 pos = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  float t = u_time * u_speed;
  float shimmer = snoise(pos * 6.0 + t * 0.03) * 0.5 + 0.5;

  float totalAlpha = 0.0;
  vec3 totalColor = vec3(0.0);

  float rot = t * 0.004;
  float R = 0.42;
  float sep = R * 0.65;

  vec2 mid = vec2(0.10 * aspect, -0.02);
  mid += 0.004 * vec2(sin(t * 0.02), cos(t * 0.015));

  vec2 c1 = mid + vec2(-sep * 0.5, 0.0);
  vec2 c2 = mid + vec2( sep * 0.5, 0.0);

  // two massive circles: each as 3 broken arcs
  for (int ci = 0; ci < 2; ci++) {
    vec2 c = (ci == 0) ? c1 : c2;
    float dir = (ci == 0) ? 1.0 : -1.0;
    for (int j = 0; j < 3; j++) {
      float fj = float(j);
      float startA = rot * dir + fj * 2.094 + float(ci) * 0.5;
      float arcLen = 1.3 + 0.6 * hash(fj + float(ci) * 10.0);
      float d = sdArc(pos, c, R, startA, arcLen);
      float param = arcParam(pos, c, startA, arcLen);
      vec2 ra = glyphAlpha(d, param, 0.005, 0.65, fj + float(ci) * 5.0, t);
      vec3 col = mix(coreGold, brightGold, 0.3 + shimmer * 0.15);
      vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
      totalColor += rc * ra.x; totalAlpha += ra.x;
    }
  }

  // inner iris: broken small circle at center
  {
    float irisR = 0.09;
    for (int j = 0; j < 2; j++) {
      float fj = float(j);
      float startA = -rot * 2.0 + fj * 3.14159 + 0.3;
      float arcLen = 1.8 + 0.5 * hash(fj + 30.0);
      float d = sdArc(pos, mid, irisR, startA, arcLen);
      float param = arcParam(pos, mid, startA, arcLen);
      vec2 ra = glyphAlpha(d, param, 0.003, 0.55, fj + 20.0, t);
      vec3 col = mix(coreGold, brightGold, 0.4 + shimmer * 0.15);
      vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
      totalColor += rc * ra.x; totalAlpha += ra.x;
    }
  }

  // pupil dot
  {
    float d = length(pos - mid);
    float dot_ = 1.0 - smoothstep(0.0, 0.014, d);
    float halo = 1.0 - smoothstep(0.0, 0.032, d);
    float a = dot_ * 0.85 + halo * 0.18;
    totalColor += brightGold * a; totalAlpha += a;
  }

  // vertical axis line
  {
    float d = sdSegment(pos, mid + vec2(0.0, -R * 0.7), mid + vec2(0.0, R * 0.7));
    float param = segParam(pos, mid + vec2(0.0, -R * 0.7), mid + vec2(0.0, R * 0.7));
    vec2 ra = glyphAlpha(d, param, 0.002, 0.35, 50.0, t);
    vec3 col = mix(coreGold, brightGold, shimmer * 0.15);
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
