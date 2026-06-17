"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive WebGL "neural vortex" background, adapted for this project from a
 * 21st.dev shader component.
 *
 * Differences from the original demo:
 *  - Plain JS/JSX (no TypeScript, no styled-jsx, no global !important colours).
 *  - Scoped to its parent container (absolute inset-0), NOT fixed site-wide,
 *    so it only lives behind the hero and never overrides other sections or
 *    the cursor glow.
 *  - Pointer is tracked relative to the canvas, not the window.
 *  - Colours tuned to the site brand (violet -> teal, with a pink lift).
 *  - Skips entirely on coarse-pointer/touch devices and prefers-reduced-motion;
 *    pauses rendering when the tab is hidden.
 */
const VERTEX_SRC = `
  precision mediump float;
  attribute vec2 a_position;
  varying vec2 vUv;
  void main() {
    vUv = .5 * (a_position + 1.);
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SRC = `
  precision mediump float;
  varying vec2 vUv;
  uniform float u_time;
  uniform float u_ratio;
  uniform vec2 u_pointer_position;
  uniform float u_scroll_progress;

  vec2 rotate(vec2 uv, float th) {
    return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
  }

  float neuro_shape(vec2 uv, float t, float p) {
    vec2 sine_acc = vec2(0.);
    vec2 res = vec2(0.);
    float scale = 8.;
    for (int j = 0; j < 15; j++) {
      uv = rotate(uv, 1.);
      sine_acc = rotate(sine_acc, 1.);
      vec2 layer = uv * scale + float(j) + sine_acc - t;
      sine_acc += sin(layer) + 2.4 * p;
      res += (.5 + .5 * cos(layer)) / scale;
      scale *= (1.2);
    }
    return res.x + res.y;
  }

  void main() {
    vec2 uv = .5 * vUv;
    uv.x *= u_ratio;
    vec2 pointer = vUv - u_pointer_position;
    pointer.x *= u_ratio;
    float p = clamp(length(pointer), 0., 1.);
    p = .5 * pow(1. - p, 2.);
    float t = .001 * u_time;
    vec3 color = vec3(0.);
    float noise = neuro_shape(uv, t, p);
    noise = 1.2 * pow(noise, 3.);
    noise += pow(noise, 10.);
    noise = max(.0, noise - .5);
    noise *= (1. - length(vUv - .5));

    // --- Brand palette: violet base, mix toward teal, lift with pink ---
    vec3 violet = vec3(0.545, 0.361, 0.965); // #8b5cf6
    vec3 teal   = vec3(0.086, 0.949, 0.702); // #16f2b3
    vec3 pink   = vec3(0.925, 0.282, 0.600); // #ec4899
    color = violet;
    color = mix(color, teal, 0.40 + 0.18 * sin(2.0 * u_scroll_progress + 1.2));
    color += pink * (0.10 + 0.08 * sin(2.0 * u_scroll_progress + 1.5));
    color = color * noise;

    gl_FragColor = vec4(color, noise);
  }
`;

function compileShader(gl, source, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("NeuralVortex shader error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function NeuralVortex({ className = "" }) {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0, tX: 0, tY: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect user preferences / device capabilities.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return; // leave the CSS fallback visible

    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return; // graceful: CSS fallback stays

    const vertexShader = compileShader(gl, VERTEX_SRC, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(gl, FRAGMENT_SRC, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("NeuralVortex link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRatio = gl.getUniformLocation(program, "u_ratio");
    const uPointer = gl.getUniformLocation(program, "u_pointer_position");
    const uScroll = gl.getUniformLocation(program, "u_scroll_progress");

    const resize = () => {
      // Cap DPR low: this is an ambient background, not crisp UI, so rendering
      // at <=1.25x device pixels roughly halves the fragment work vs 2x with no
      // visible quality loss behind the masked hero.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uRatio, canvas.width / canvas.height);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Center the pointer influence by default so it looks alive before hover.
    pointer.current.tX = pointer.current.x = 0.5;
    pointer.current.tY = pointer.current.y = 0.5;

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.tX = (e.clientX - rect.left) / rect.width;
      pointer.current.tY = 1 - (e.clientY - rect.top) / rect.height;
    };
    if (finePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    // running = tab is visible AND the hero is on screen. The vortex is purely
    // a hero background, so there's no reason to burn GPU once it scrolls away.
    let tabVisible = !document.hidden;
    let onScreen = true;
    const isRunning = () => tabVisible && onScreen;
    const kick = () => {
      if (isRunning() && !rafRef.current) {
        rafRef.current = requestAnimationFrame(render);
      }
    };

    const onVisibility = () => {
      tabVisible = !document.hidden;
      kick();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Pause rendering when the hero canvas leaves the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? true;
        kick();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const render = () => {
      if (!isRunning()) {
        rafRef.current = null;
        return;
      }
      const now = performance.now();
      pointer.current.x += (pointer.current.tX - pointer.current.x) * 0.15;
      pointer.current.y += (pointer.current.tY - pointer.current.y) * 0.15;

      gl.uniform1f(uTime, now);
      gl.uniform2f(uPointer, pointer.current.x, pointer.current.y);
      gl.uniform1f(
        uScroll,
        window.pageYOffset / (2 * Math.max(1, window.innerHeight))
      );
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(vertexBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    />
  );
}

export default NeuralVortex;
