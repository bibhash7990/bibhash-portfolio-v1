"use client";
// @flow strict
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const NAV_LINKS = [
  { label: "ABOUT", href: "/#about", id: "about" },
  { label: "EXPERIENCE", href: "/#experience", id: "experience" },
  { label: "SKILLS", href: "/#skills", id: "skills" },
  { label: "EDUCATION", href: "/#education", id: "education" },
  { label: "PROJECTS", href: "/#projects", id: "projects" },
  { label: "CONTACT", href: "/#contact", id: "contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  // Glass background only after the page is scrolled a little.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = NAV_LINKS
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-[100] -mx-5 px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 xl:-mx-16 xl:px-16 transition-all duration-300 ${
        scrolled
          ? "border-b border-divider bg-bg/80 backdrop-blur-lg backdrop-saturate-150 shadow-[0_4px_30px_-12px_rgba(0,0,0,0.5)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between py-4 lg:py-5">
        <Link
          href="/"
          className="text-[#16f2b3] text-2xl lg:text-3xl font-bold tracking-tight rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16f2b3] focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          BIBHASH LENKA
        </Link>

        {/* Right side: desktop links + (mobile) menu toggle */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Desktop links */}
          <ul className="hidden md:flex md:flex-row md:items-center md:space-x-1">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="group relative block px-3 lg:px-4 py-2 no-underline outline-none rounded-md focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    <span
                      className={`text-sm transition-colors duration-300 ${
                        isActive
                          ? "text-pink-500"
                          : "text-content group-hover:text-pink-600"
                      }`}
                    >
                      {link.label}
                    </span>
                    <span
                      className={`absolute -bottom-0.5 left-3 right-3 lg:left-4 lg:right-4 h-[2px] rounded-full bg-gradient-to-r from-pink-500 to-violet-600 origin-left transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden flex items-center justify-center h-9 w-9 rounded-full border border-line-2 bg-surface-3 text-content-secondary transition-colors duration-300 hover:text-[#16f2b3] hover:border-[#16f2b3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16f2b3]"
          >
            {open ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 pb-4">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm no-underline transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 ${
                    isActive
                      ? "border-pink-500/60 bg-surface-3 text-pink-500"
                      : "border-line bg-surface/40 text-content hover:border-pink-500/40 hover:text-pink-500"
                  }`}
                >
                  <span className="h-4 w-1 rounded-full bg-gradient-to-b from-pink-500 to-violet-600" />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
