"use client";

import { useTheme } from "./theme-provider";
import { FiMoon, FiSun } from "react-icons/fi";

function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Avoid hydration mismatch: render a neutral placeholder until mounted.
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex items-center justify-center h-9 w-9 rounded-full border border-line-2 bg-surface-3 text-content-secondary transition-all duration-300 hover:text-[#16f2b3] hover:border-[#16f2b3] hover:scale-110"
    >
      {mounted ? (
        isDark ? <FiSun size={18} /> : <FiMoon size={18} />
      ) : (
        <FiSun size={18} />
      )}
    </button>
  );
}

export default ThemeToggle;
