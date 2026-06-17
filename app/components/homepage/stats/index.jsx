"use client";
// @flow strict

import { statsData } from "@/utils/data/stats";
import { useEffect, useRef, useState } from "react";
import { BsRocketTakeoff } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { LuPlug, LuTrendingUp } from "react-icons/lu";

const ICONS = {
  experience: LuTrendingUp,
  rocket: BsRocketTakeoff,
  users: FiUsers,
  plug: LuPlug,
};

// Per-accent classes for the icon badge + hover glow. Kept as full class
// strings so Tailwind's JIT can see them.
const ACCENTS = {
  teal: {
    badge: "text-[#16f2b3] border-[#16f2b3]/30 bg-[#16f2b3]/10",
    glow: "hover:border-[#16f2b3]/50 hover:shadow-[0_0_30px_-8px_rgba(22,242,179,0.45)]",
  },
  pink: {
    badge: "text-pink-400 border-pink-500/30 bg-pink-500/10",
    glow: "hover:border-pink-500/50 hover:shadow-[0_0_30px_-8px_rgba(236,72,153,0.45)]",
  },
  violet: {
    badge: "text-violet-400 border-violet-500/30 bg-violet-500/10",
    glow: "hover:border-violet-500/50 hover:shadow-[0_0_30px_-8px_rgba(139,92,246,0.45)]",
  },
};

function formatValue(value, current) {
  // Show one decimal only for non-integer targets (e.g. 2.5)
  if (Number.isInteger(value)) return Math.round(current).toLocaleString();
  return current.toFixed(1);
}

function StatCard({ value, suffix, label, icon, accent, start }) {
  const [current, setCurrent] = useState(0);
  const Icon = ICONS[icon] ?? LuTrendingUp;
  const accentCls = ACCENTS[accent] ?? ACCENTS.teal;

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
    <div
      className={`group relative flex flex-col gap-4 rounded-xl border border-line bg-surface/50 p-5 lg:p-6 transition-all duration-300 ${accentCls.glow}`}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:-translate-y-0.5 ${accentCls.badge}`}
      >
        <Icon size={20} aria-hidden="true" />
      </div>
      <div>
        <p className="text-3xl lg:text-4xl font-bold text-gradient">
          {formatValue(value, current)}
          <span>{suffix}</span>
        </p>
        <p className="mt-1.5 text-xs md:text-sm uppercase tracking-wider text-content-secondary">
          {label}
        </p>
      </div>
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
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {statsData.map((stat) => (
          <StatCard
            key={stat.id}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            icon={stat.icon}
            accent={stat.accent}
            start={start}
          />
        ))}
      </div>
    </div>
  );
}

export default Stats;
