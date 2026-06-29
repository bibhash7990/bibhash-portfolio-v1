"use client";

import { useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa6";

const SCROLL_THRESHOLD = 50;

/**
 * Scroll-to-top button. Uses a DOM class toggle instead of React state on
 * every scroll event — avoids unnecessary re-renders while scrolling.
 */
const ScrollToTop = () => {
  const btnRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const handleScroll = () => {
      btn.classList.toggle("hidden", window.scrollY <= SCROLL_THRESHOLD);
    };

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll, { passive: true });
    };
  }, []);

  const onClickBtn = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      ref={btnRef}
      onClick={onClickBtn}
      className="fixed bottom-8 right-6 z-50 flex items-center rounded-full bg-gradient-to-r from-pink-500 to-violet-600 p-4 hover:text-xl transition-all duration-300 ease-out"
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTop;
