import React, { useEffect, useRef } from 'react';

const vertSrc = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragSrc = `
  precision mediump float;
  uniform float u_time;
  uniform vec2  u_resolution;
  uniform vec2  u_mouse;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), u.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2  s = vec2(1.0);
    for (int i = 0; i < 6; i++) {
      v += a * noise(p);
      p  = p * 2.1 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    float ar = u_resolution.x / u_resolution.y;
    vec2  uv = vec2(st.x * ar, st.y);

    // Smooth mouse influence
    vec2 mouse = vec2(u_mouse.x / u_resolution.x * ar, 1.0 - u_mouse.y / u_resolution.y);
    float mdist = distance(uv, mouse);
    float mpulse = exp(-mdist * 4.0) * 0.35;

    float t = u_time * 0.12;

    // Two-layer fBm for fluid look
    float n1 = fbm(uv * 1.8 + vec2(t, t * 0.6));
    float n2 = fbm(uv * 3.5 + vec2(n1 * 0.5, t * 0.8));
    float n  = n1 * 0.6 + n2 * 0.4 + mpulse;

    // Palette: near-black → blood red → midnight blue
    vec3 cBase  = vec3(0.04, 0.03, 0.04);
    vec3 cRed   = vec3(0.50, 0.02, 0.02);
    vec3 cBlue  = vec3(0.02, 0.02, 0.20);

    vec3 col = mix(cBase, cRed,  smoothstep(0.3, 0.7, n));
    col = mix(col,  cBlue, smoothstep(0.5, 0.9, n2) * 0.5);

    // Vignette
    float vig = 1.0 - smoothstep(0.35, 1.3, length(st - 0.5) * 2.0);
    col *= vig;

    // Film grain
    float grain = (hash(st + fract(u_time)) - 0.5) * 0.045;
    col = clamp(col + grain, 0.0, 1.0);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

function createProgram(gl: WebGLRenderingContext) {
  const prog = gl.createProgram()!;
  gl.attachShader(prog, createShader(gl, gl.VERTEX_SHADER, vertSrc));
  gl.attachShader(prog, createShader(gl, gl.FRAGMENT_SHADER, fragSrc));
  gl.linkProgram(prog);
  return prog;
}

const WebGLBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;

    const prog = createProgram(gl);
    gl.useProgram(prog);

    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes  = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: mouse.x, y: mouse.y };

    const onMouseMove = (e: MouseEvent) => { target.x = e.clientX; target.y = e.clientY; };
    window.addEventListener('mousemove', onMouseMove);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    let raf: number;
    const start = performance.now();
    const tick = () => {
      mouse.x += (target.x - mouse.x) * 0.04;
      mouse.y += (target.y - mouse.y) * 0.04;

      gl.uniform1f(uTime,  (performance.now() - start) / 1000);
      gl.uniform2f(uRes,   canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x * (canvas.width / window.innerWidth),
                            mouse.y * (canvas.height / window.innerHeight));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100vw', height: '100vh',
        zIndex: 0, display: 'block',
        pointerEvents: 'none',
      }}
    />
  );
};

export default WebGLBackground;
