"use client";

import { lazy, Suspense } from "react";

// Lazy-load the Spline runtime so its (heavy) WebGL bundle is only fetched when
// this component actually mounts — the parent gates mounting on in-view.
const Spline = lazy(() => import("@splinetool/react-spline"));

export function SplineScene({ scene, className }) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-line-2 border-t-[#16f2b3]" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}

export default SplineScene;
