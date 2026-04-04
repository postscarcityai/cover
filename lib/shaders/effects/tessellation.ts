import { RIBBON_PREAMBLE } from "./ribbon-base"

/**
 * Glyph: Orrery — massive orbital system with broken paths
 * and moving satellite marks. Planetary clockwork. For /terms-of-service.
 */
export const TESSELLATION_FRAGMENT = RIBBON_PREAMBLE + `
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 pos = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  float t = u_time * u_speed;
  float shimmer = snoise(pos * 5.0 + t * 0.025) * 0.5 + 0.5;

  float totalAlpha = 0.0;
  vec3 totalColor = vec3(0.0);

  vec2 center = vec2(0.14 * aspect, 0.04);
  center += 0.004 * vec2(sin(t * 0.015), cos(t * 0.012));

  // central broken ring
  {
    float R = 0.06;
    for (int j = 0; j < 2; j++) {
      float fj = float(j);
      float startA = t * 0.01 + fj * 3.14159;
      float arcLen = 2.0;
      float d = sdArc(pos, center, R, startA, arcLen);
      float param = arcParam(pos, center, startA, arcLen);
      vec2 ra = glyphAlpha(d, param, 0.003, 0.6, fj, t);
      vec3 col = mix(coreGold, brightGold, 0.35 + shimmer * 0.12);
      vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
      totalColor += rc * ra.x; totalAlpha += ra.x;
    }
  }

  // four orbital rings — expanding outward
  float orbits[4];
  orbits[0] = 0.13;
  orbits[1] = 0.22;
  orbits[2] = 0.31;
  orbits[3] = 0.40;

  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float R = orbits[i];

    // each orbit: 2-3 broken arcs
    for (int j = 0; j < 3; j++) {
      float fj = float(j);
      if (j == 2 && fi < 2.0) continue;
      float startA = t * (0.005 - fi * 0.001) + fj * 2.094 + fi * 0.8;
      float arcLen = 0.9 + 0.7 * hash(fi * 3.0 + fj + 0.5);
      float d = sdArc(pos, center, R, startA, arcLen);
      float param = arcParam(pos, center, startA, arcLen);
      float bw = 0.004 + 0.002 * (1.0 - fi / 4.0);
      vec2 ra = glyphAlpha(d, param, bw, 0.48 + 0.08 * fi, fi * 5.0 + fj, t);
      vec3 col = mix(coreGold, brightGold, fi / 4.0 * 0.2 + shimmer * 0.1);
      vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
      totalColor += rc * ra.x; totalAlpha += ra.x;
    }

    // satellite marks on each orbit
    float satAngle = t * (0.025 - fi * 0.005) + fi * 2.1;
    vec2 satPos = center + R * vec2(cos(satAngle), sin(satAngle));

    // satellite tick perpendicular to orbit
    float tickAngle = satAngle + 1.5708;
    vec2 tickDir = vec2(cos(tickAngle), sin(tickAngle));
    float tickLen = 0.015 + 0.008 * fi;
    vec2 ta = satPos - tickDir * tickLen;
    vec2 tb = satPos + tickDir * tickLen;
    {
      float d = sdSegment(pos, ta, tb);
      float param = segParam(pos, ta, tb);
      vec2 ra = glyphAlpha(d, param, 0.003, 0.55, fi + 40.0, t);
      vec3 col = mix(coreGold, brightGold, shimmer * 0.18);
      vec3 rc = mix(glowGold, col, ra.y / max(ra.x, 0.001));
      totalColor += rc * ra.x; totalAlpha += ra.x;
    }

    // satellite dot
    {
      float d = length(pos - satPos);
      float dot_ = 1.0 - smoothstep(0.0, 0.006, d);
      float halo = 1.0 - smoothstep(0.0, 0.015, d);
      float a = dot_ * 0.7 + halo * 0.12;
      totalColor += brightGold * a; totalAlpha += a;
    }
  }

  // center dot
  {
    float d = length(pos - center);
    float dot_ = 1.0 - smoothstep(0.0, 0.012, d);
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
