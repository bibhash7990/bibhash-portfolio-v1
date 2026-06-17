"use client";

import { useEffect, useRef, useState } from "react";

const MESSAGE = "Hey there! 👋 Welcome to my projects — take a look around.";

/**
 * A small chat speech-bubble that types itself out when `active` becomes true
 * (the parent flips it on when the robot panel scrolls into view). Respects
 * prefers-reduced-motion by showing the full text instantly.
 */
function RobotGreeting({ active }) {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let i = 0;
    let typer;

    // Reduced motion: reveal the full message after a tick (kept async so we
    // never call setState synchronously inside the effect body).
    if (reduced) {
      const t = setTimeout(() => {
        setText(MESSAGE);
        setDone(true);
      }, 0);
      return () => clearTimeout(t);
    }

    // Small delay so the bubble's entrance animation plays first, then type.
    const startDelay = setTimeout(() => {
      typer = setInterval(() => {
        i += 1;
        setText(MESSAGE.slice(0, i));
        if (i >= MESSAGE.length) {
          clearInterval(typer);
          setDone(true);
        }
      }, 38);
    }, 600);

    return () => {
      clearTimeout(startDelay);
      clearInterval(typer);
    };
  }, [active]);

  return (
    <div
      className={`pointer-events-none absolute left-4 top-4 z-[3] max-w-[78%] transition-all duration-500 sm:max-w-[60%] ${
        active ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
      }`}
    >
      <div className="relative rounded-2xl rounded-tl-sm border border-[#16f2b3]/40 bg-bg/80 px-4 py-3 backdrop-blur-md shadow-[0_8px_30px_-10px_rgba(0,0,0,0.6)]">
        <p className="text-sm leading-relaxed text-content">
          {text}
          {!done && (
            <span className="ml-0.5 inline-block h-4 w-[2px] -mb-[2px] animate-pulse bg-[#16f2b3] align-middle" />
          )}
        </p>
        {/* little tail pointing down-left toward the robot */}
        <span className="absolute -bottom-1.5 left-5 h-3 w-3 rotate-45 border-b border-r border-[#16f2b3]/40 bg-bg/80" />
      </div>
    </div>
  );
}

export default RobotGreeting;
