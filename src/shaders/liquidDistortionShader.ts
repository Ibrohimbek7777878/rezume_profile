export const liquidDistortionVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uMouse;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Interactive surface ripple displacement near mouse
    float dist = distance(uv, uMouse);
    float wave = sin(dist * 20.0 - uTime * 4.0) * exp(-dist * 4.5) * uHover * 0.25;
    pos.z += wave;

    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const liquidDistortionFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uMouse;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec2 vUv;
  varying vec3 vPosition;

  // 2D Simplex noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float distToMouse = distance(uv, uMouse);

    // Liquid ripple wave
    float ripple = sin(distToMouse * 22.0 - uTime * 4.0) * exp(-distToMouse * 3.8) * uHover;
    vec2 rippleDir = normalize(uv - uMouse + 0.0001);
    vec2 distortedUv = uv + rippleDir * ripple * 0.09;

    // RGB-Shift Chromatic Aberration
    float shift = (0.012 + 0.038 * uHover) * (1.0 + abs(ripple) * 2.0);
    vec2 uvR = distortedUv + vec2(shift, shift * 0.5);
    vec2 uvG = distortedUv;
    vec2 uvB = distortedUv - vec2(shift, shift * 0.5);

    // Procedural noise sample for channels
    float nR = snoise(uvR * 3.5 + vec2(uTime * 0.12, -uTime * 0.08));
    float nG = snoise(uvG * 3.5 + vec2(uTime * 0.12, -uTime * 0.08));
    float nB = snoise(uvB * 3.5 + vec2(uTime * 0.12, -uTime * 0.08));

    // Colors
    vec3 colR = mix(uColorA, uColorB, nR * 0.5 + 0.5);
    vec3 colG = mix(uColorB, uColorC, nG * 0.5 + 0.5);
    vec3 colB = mix(uColorC, uColorA, nB * 0.5 + 0.5);

    vec3 finalColor = vec3(colR.r, colG.g, colB.b);

    // Subtle technological cyber grid pattern
    vec2 grid = abs(fract(distortedUv * 14.0 - 0.5) - 0.5) / fwidth(distortedUv * 14.0);
    float line = 1.0 - min(min(grid.x, grid.y), 1.0);
    finalColor += vec3(0.22, 0.74, 0.97) * line * 0.07 * (1.0 + uHover * 1.5);

    // Border bevel vignette
    float edgeX = smoothstep(0.0, 0.06, uv.x) * smoothstep(1.0, 0.94, uv.x);
    float edgeY = smoothstep(0.0, 0.06, uv.y) * smoothstep(1.0, 0.94, uv.y);
    float edge = edgeX * edgeY;
    finalColor = mix(uColorA * 0.25, finalColor, edge);

    // Hover interactive glow burst around mouse
    float mouseGlow = max(0.0, 1.0 - distToMouse * 2.8) * uHover;
    finalColor += vec3(0.22, 0.74, 0.97) * mouseGlow * 0.55;

    gl_FragColor = vec4(finalColor, 0.95);
  }
`;
