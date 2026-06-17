"use client";

import { useEffect, useRef } from "react";

/**
 * Site-wide animated "tubes" cursor effect, adapted from a 21st.dev component.
 *
 * Adaptations for this project:
 *  - Loads `threejs-components` from the LOCAL npm package (bundled), not a
 *    runtime CDN — works offline, no external network / CSP dependency.
 *  - No demo hero markup: just a fixed, pointer-events-none canvas behind all
 *    content, so it reads as a cursor effect rather than a page.
 *  - Fixed brand palette (teal / violet / pink) instead of random colours.
 *  - Skipped on coarse-pointer / touch devices and prefers-reduced-motion.
 *  - Pauses (disposes) cleanly on unmount.
 */

// Brand palette.
const TUBE_COLORS = ["#16f2b3", "#8b5cf6", "#ec4899"]; // teal, violet, pink
const LIGHT_COLORS = ["#16f2b3", "#8b5cf6", "#ec4899", "#22d3ee"]; // + cyan accent

function TubesCursor() {
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Only run where there is a real cursor and motion is welcome.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!finePointer || reducedMotion) return;

    let disposed = false;

    // The tubes library creates its Three.js renderer with an OPAQUE context and
    // clears to solid black, which would paint a black rectangle over the page.
    // We force this canvas's WebGL context to be alpha-transparent + premultiplied
    // BEFORE the library grabs it, so its black clear becomes fully transparent.
    // The tubes (bright, additive) then render on a genuinely empty canvas — no
    // blend-mode tricks, no dark veil.
    const origGetContext = canvas.getContext.bind(canvas);
    canvas.getContext = (type, attrs) => {
      if (type === "webgl" || type === "webgl2" || type === "experimental-webgl") {
        return origGetContext(type, {
          ...(attrs || {}),
          alpha: true,
          premultipliedAlpha: true,
          antialias: true,
        });
      }
      return origGetContext(type, attrs);
    };

    // Small delay so the canvas has its final size before the library reads it
    // (the lib computes geometry from canvas dimensions and chokes on 0×0).
    const timer = setTimeout(() => {
      import("threejs-components/build/cursors/tubes1.min.js")
        .then((module) => {
          const TubesCursorInit = module.default;
          if (disposed || !canvasRef.current) return;

          appRef.current = TubesCursorInit(canvasRef.current, {
            tubes: {
              colors: TUBE_COLORS,
              lights: {
                intensity: 200,
                colors: LIGHT_COLORS,
              },
            },
          });

          // Cap the renderer resolution: the library renders the tube buffer at
          // full device-pixel-ratio (e.g. 2x = 2880x1800), which is most of the
          // GPU cost. If it exposes a Three.js renderer, clamp its pixel ratio
          // to 1.5 — roughly halving fragment work with no visible difference
          // for a soft glowing trail.
          const app = appRef.current;
          const renderer =
            app?.renderer || app?.three?.renderer || app?.webgl?.renderer;
          if (renderer && typeof renderer.setPixelRatio === "function") {
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
          }
        })
        .catch((err) =>
          console.error("Failed to load TubesCursor module:", err)
        );
    }, 100);

    return () => {
      disposed = true;
      clearTimeout(timer);
      if (appRef.current && typeof appRef.current.dispose === "function") {
        appRef.current.dispose();
      }
      appRef.current = null;
    };
  }, []);

  return (
    // The tubes library measures and rewrites the canvas's own inline size from
    // its PARENT box. So we give it a fixed, viewport-locked parent: the canvas
    // then sizes to the viewport instead of the full document height (which made
    // the trail render far below the fold and look "missing").
    //
    // Sits ABOVE page content (the site has opaque backgrounds, so a behind-
    // content canvas would be invisible). pointer-events-none keeps every
    // link/button/field clickable; the trail is purely decorative.
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 hidden h-screen w-screen overflow-hidden lg:block"
    >
      {/* Canvas context is forced transparent in the effect above, so the tubes
          render on a genuinely empty surface — no blend mode, no opacity hack,
          no dark veil over the page. */}
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

export default TubesCursor;
