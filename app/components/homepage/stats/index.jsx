"use client";
// @flow strict

import { statsData } from "@/utils/data/stats";
import { useEffect, useRef, useState } from "react";

function formatValue(value, current) {
  // Show one decimal only for non-integer targets (e.g. 2.5)
  if (Number.isInteger(value)) return Math.round(current).toLocaleString();
  return current.toFixed(1);
}

function StatItem({ value, suffix, label, start }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf;
    const duration = 1600;
    let startTime;

    const tick = (now) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(value * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-6">
      <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient">
        {formatValue(value, current)}
        <span>{suffix}</span>
      </p>
      <p className="mt-2 text-xs md:text-sm uppercase tracking-wider text-content-secondary">
        {label}
      </p>
    </div>
  );
}

function Stats() {
  const ref = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative z-10 my-8 lg:my-12">
      <div className="rounded-2xl border border-line bg-surface-2 shadow-lg shadow-black/10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-x divide-line lg:divide-y-0">
          {statsData.map((stat) => (
            <StatItem
              key={stat.id}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              start={start}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stats;
