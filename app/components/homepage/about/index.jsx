// @flow strict

import { aboutHighlights, personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import { BsCheck2Circle } from "react-icons/bs";
import Reveal from "../../helper/reveal";

function AboutSection() {
  return (
    <div id="about" className="section-root my-12 lg:my-24 relative z-50">
      {/* CSS gradient blobs — lighter alternative to a second WebGL vortex.
          The hero already runs one NeuralVortex; duplicating it here would
          double the GPU work for a subtle background effect. */}
      <div className="pointer-events-none absolute -inset-x-6 -inset-y-16 sm:-inset-x-12 -z-10 overflow-hidden [mask-image:radial-gradient(120%_80%_at_50%_50%,#000_50%,transparent_100%)]">
        <div className="blob blob-pink w-[200px] h-[200px] top-10 left-4 lg:w-[280px] lg:h-[280px]" />
        <div className="blob blob-violet w-[240px] h-[240px] top-24 right-4 lg:w-[320px] lg:h-[320px]" />
        <div className="blob blob-teal w-[160px] h-[160px] bottom-10 left-1/3 lg:w-[220px] lg:h-[220px]" />
      </div>

      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-label w-fit text-label-text rotate-90 p-2 px-5 text-xl rounded-md">
          ABOUT ME
        </span>
        <span className="h-36 w-[2px] bg-label"></span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <Reveal direction="left" className="order-2 lg:order-1">
          <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
            Who I am?
          </p>
          <p className="text-content-secondary text-sm lg:text-lg leading-relaxed">
            {personalData.description}
          </p>

          <ul className="mt-6 flex flex-col gap-3">
            {aboutHighlights.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-sm lg:text-base text-content-secondary">
                <span className="mt-[2px] text-[#16f2b3]">
                  <BsCheck2Circle size={20} />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal direction="right" className="flex justify-center order-1 lg:order-2">
          <div className="relative group">
            {/* gradient glow ring */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-500 via-violet-600 to-[#16f2b3] opacity-40 blur-md group-hover:opacity-70 transition-all duration-700" />
            <Image
              src={personalData.profile}
              width={280}
              height={280}
              alt={personalData.name}
              className="relative rounded-2xl transition-all duration-1000 grayscale hover:grayscale-0 group-hover:scale-105 cursor-pointer"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default AboutSection;
