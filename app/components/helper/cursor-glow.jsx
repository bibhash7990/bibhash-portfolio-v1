"use client";

import { useEffect, useRef } from "react";

/**
 * A soft brand-coloured glow that smoothly follows the cursor across the
 * whole page. Pure DOM + requestAnimationFrame (no re-renders, no deps).
 *
 * - Disabled on touch / coarse-pointer devices (no cursor to follow).
 * - Disabled when the user prefers reduced motion.
 * - Sits behind content and ignores pointer events, so it never blocks clicks.
 */
function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!finePointer || reducedMotion) return;

    // Start off-screen until the first real mouse move.
    let targetX = -9999;
    let targetY = -9999;
    let x = targetX;
    let y = targetY;
    let raf = 0;
    let visible = false;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        // Snap on first appearance so it doesn't streak in from the corner.
        x = targetX;
        y = targetY;
        visible = true;
        el.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    const tick = () => {
      // Ease toward the cursor for a soft trailing feel.
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="cursor-glow pointer-events-none fixed left-0 top-0 -z-10 hidden lg:block"
    />
  );
}

export default CursorGlow;
