"use client"

import { useEffect, useRef } from 'react';

// --- Shared pointer-tracking for ALL GlowCards ---
// Instead of every card attaching its own pointermove listener (which causes
// N getBoundingClientRect calls per frame), we run a single rAF-driven loop
// that updates every card once per frame. Cards register/unregister via a
// static registry.

const CONFIG = {
  proximity: 40,
  spread: 80,
  blur: 12,
  gap: 32,
  vertical: false,
  opacity: 0,
};

let registeredCards = [];
let pointerX = -9999;
let pointerY = -9999;
let rafId = null;
let hasFinePointer = false;

function updateAllCards() {
  for (let i = 0; i < registeredCards.length; i++) {
    const entry = registeredCards[i];
    const card = entry.card;
    if (!card || !card.isConnected) {
      registeredCards.splice(i, 1);
      i--;
      continue;
    }

    const bounds = card.getBoundingClientRect();

    const near =
      pointerX > bounds.left - CONFIG.proximity &&
      pointerX < bounds.left + bounds.width + CONFIG.proximity &&
      pointerY > bounds.top - CONFIG.proximity &&
      pointerY < bounds.top + bounds.height + CONFIG.proximity;

    card.style.setProperty('--active', near ? 1 : CONFIG.opacity);

    if (near) {
      const cx = bounds.left + bounds.width * 0.5;
      const cy = bounds.top + bounds.height * 0.5;
      let angle = (Math.atan2(pointerY - cy, pointerX - cx) * 180) / Math.PI;
      angle = angle < 0 ? angle + 360 : angle;
      card.style.setProperty('--start', angle + 90);
    }
  }

  if (registeredCards.length > 0) {
    rafId = requestAnimationFrame(updateAllCards);
  } else {
    rafId = null;
  }
}

function onPointerMove(e) {
  pointerX = e.clientX;
  pointerY = e.clientY;
}

function onPointerLeave() {
  pointerX = -9999;
  pointerY = -9999;
}

// Initialize once: check pointer type and attach shared listeners.
let initialized = false;
function ensureSharedListeners() {
  if (initialized) return;
  initialized = true;

  hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  // Only run glow effect on fine pointer (mouse / trackpad).
  if (!hasFinePointer) return;

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.documentElement.addEventListener('mouseleave', onPointerLeave);
}

function scheduleUpdate() {
  if (!rafId && registeredCards.length > 0 && hasFinePointer) {
    rafId = requestAnimationFrame(updateAllCards);
  }
}

const GlowCard = ({ children , identifier}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    ensureSharedListeners();
    return () => {}; // noop — shared listeners live forever
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Register this card with the shared update loop.
    const entry = { card, identifier };
    registeredCards.push(entry);
    scheduleUpdate();

    return () => {
      const idx = registeredCards.indexOf(entry);
      if (idx !== -1) registeredCards.splice(idx, 1);
    };
  }, [identifier]);

  return (
    <div className={`glow-container-${identifier} glow-container`}>
      <article
        ref={cardRef}
        className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-line-strong transition-all duration-300 relative bg-surface-2 text-content-secondary rounded-xl hover:border-transparent w-full`}
      >
        <div className="glows"></div>
        {children}
      </article>
    </div>
  );
};

export default GlowCard;
