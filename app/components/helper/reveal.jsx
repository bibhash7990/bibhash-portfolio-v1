"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal wrapper. Adds an `is-visible` class when the element
 * scrolls into view, triggering the CSS transition defined in globals.scss.
 *
 * @param {('up'|'left'|'right'|'scale')} direction - reveal direction
 * @param {number} delay - delay in ms before the animation starts
 * @param {string} as - element tag to render (default 'div')
 */
const Reveal = ({
  children,
  direction = "up",
  delay = 0,
  className = "",
  as: Tag = "div",
  ...rest
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const dirClass =
    direction === "left"
      ? "reveal-left"
      : direction === "right"
      ? "reveal-right"
      : direction === "scale"
      ? "reveal-scale"
      : "";

  return (
    <Tag
      ref={ref}
      style={{ "--reveal-delay": `${delay}ms` }}
      className={`reveal ${dirClass} ${visible ? "is-visible" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
