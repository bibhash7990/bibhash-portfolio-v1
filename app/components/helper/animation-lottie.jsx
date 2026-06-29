"use client"

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const AnimationLottie = ({ animationPath, width }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Show a lightweight placeholder until in view
  if (!inView) {
    return (
      <div
        ref={ref}
        className="flex items-center justify-center"
        style={{ width: width || '95%', aspectRatio: '1/1' }}
      >
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-line-2 border-t-[#16f2b3]" />
      </div>
    );
  }

  return (
    <div ref={ref}>
      <Lottie
        animationData={animationPath}
        loop={true}
        autoplay={true}
        style={{ width: width || '95%' }}
      />
    </div>
  );
};

export default AnimationLottie;