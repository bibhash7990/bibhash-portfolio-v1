"use client";

import { useEffect, useRef, useState } from "react";
import SplineScene from "../../helper/spline-scene";
import Spotlight from "../../helper/spotlight";
import RobotGreeting from "./robot-greeting";

const SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

/**
 * The 3D robot panel for the projects section. The heavy Spline scene is only
 * mounted once the panel scrolls into view (and stays mounted after), so it
 * never slows initial page load. Desktop-only — the parent hides it on mobile.
 */
function RobotPanel() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group relative h-full w-full overflow-hidden rounded-2xl border border-line-2 bg-gradient-to-br from-[#0d1224] via-[#13183a] to-[#1a1340]"
    >
      {/* Brand glow washes so the (fixed-colour) 3D scene reads as on-theme */}
      <div className="pointer-events-none absolute -top-1/4 left-1/2 h-[60%] w-[80%] -translate-x-1/2 rounded-full bg-violet-600/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[45%] w-[60%] rounded-full bg-[#16f2b3]/15 blur-3xl" />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-20" fill="#16f2b3" />

      {/* Subtle brand-tinted overlay over the scene to unify the palette */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-tr from-[#16f2b3]/10 via-transparent to-violet-600/15 mix-blend-screen" />

      {/* Robot greeting speech bubble (types in when the panel enters view) */}
      <RobotGreeting active={inView} />

      {inView ? (
        <SplineScene scene={SCENE} className="relative z-[1] h-full w-full" />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-line-2 border-t-[#16f2b3]" />
        </div>
      )}
    </div>
  );
}

export default RobotPanel;
