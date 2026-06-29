"use client";
// @flow strict

import { languagesData } from "@/utils/data/languages";
import { IoLanguage } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

function Languages() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="languages" className="section-root relative z-50 border-t my-12 lg:my-24 border-divider">
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-label"></span>
          <span className="bg-label w-fit text-label-text p-2 px-5 text-xl rounded-md">
            Languages
          </span>
          <span className="w-24 h-[2px] bg-label"></span>
        </div>
      </div>

      <div ref={ref} className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-8">
        {languagesData.map((lang, index) => (
          <div
            key={lang.id}
            className="rounded-xl border border-line bg-surface/60 p-5 lg:p-6 transition-all duration-300 hover:border-violet-500/70"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-violet-400">
                  <IoLanguage size={22} />
                </span>
                <span className="text-base lg:text-lg font-semibold text-content">
                  {lang.name}
                </span>
              </div>
              <span className="text-xs text-[#16f2b3]">{lang.level}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-input overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-pink-500 to-violet-600 transition-all duration-[1200ms] ease-out"
                style={{
                  width: visible ? `${lang.proficiency}%` : "0%",
                  transitionDelay: `${index * 120}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Languages;
