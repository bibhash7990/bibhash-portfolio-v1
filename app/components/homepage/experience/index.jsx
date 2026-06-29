// @flow strict

import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import lottieFile from "../../../assets/lottie/coding.json";
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import Reveal from "../../helper/reveal";

function Experience() {
  return (
    <div id="experience" className="section-root relative z-50 border-t my-12 lg:my-24 border-divider">
      <Image
        src="/section.svg"
        alt=""
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
        style={{ width: "100%", height: "auto" }}
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-label"></span>
          <span className="bg-label w-fit text-label-text p-2 px-5 text-xl rounded-md">
            Experiences
          </span>
          <span className="w-24 h-[2px] bg-label"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* sticky lottie panel */}
          <div className="hidden lg:flex lg:col-span-5 justify-center sticky top-24">
            <div className="w-3/4 h-full">
              <AnimationLottie animationPath={lottieFile} />
            </div>
          </div>

          {/* timeline */}
          <div className="lg:col-span-7 relative">
            {/* vertical timeline line */}
            <div className="absolute left-4 md:left-6 top-2 bottom-2 w-[2px] bg-gradient-to-b from-pink-500 via-violet-500 to-transparent" />

            <div className="flex flex-col gap-8">
            {experiences.map((experience, index) => (
              <Reveal
                key={experience.id}
                direction="right"
                delay={index * 80}
                className="relative pl-12 md:pl-16"
              >
                {/* timeline node */}
                <span className="absolute left-[9px] md:left-[17px] top-6 h-4 w-4 rounded-full bg-surface border-2 border-violet-500 shadow-[0_0_12px_2px_rgba(139,92,246,0.5)]" />

                <GlowCard identifier={`experience-${experience.id}`}>
                  <div className="p-3 relative">
                    <Image
                      src="/blur-23.svg"
                      alt=""
                      width={1080}
                      height={200}
                      className="absolute bottom-0 opacity-80"
                      style={{ width: "100%", height: "auto" }}
                    />
                    <div className="px-3 py-5">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                        <div className="flex items-center gap-x-4">
                          <div className="text-violet-500 transition-colors duration-300 hover:text-[#16f2b3]">
                            <BsPersonWorkspace size={32} />
                          </div>
                          <div>
                            <p className="text-base sm:text-xl font-semibold text-content">
                              {experience.title}
                            </p>
                            <p className="text-sm sm:text-base text-[#16f2b3]">
                              {experience.company}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end gap-1 pl-12 sm:pl-0">
                          <span className="text-xs sm:text-sm text-content-secondary whitespace-nowrap">
                            {experience.duration}
                          </span>
                          {experience.location && (
                            <span className="flex items-center gap-1 text-xs text-content-muted">
                              <HiOutlineLocationMarker size={14} />
                              {experience.location}
                            </span>
                          )}
                        </div>
                      </div>

                      {experience.bullets?.length > 0 && (
                        <ul className="flex flex-col gap-2 mt-3">
                          {experience.bullets.map((bullet, i) => (
                            <li key={i} className="flex gap-2 text-sm text-content-secondary leading-relaxed">
                              <span className="mt-[6px] h-[6px] w-[6px] min-w-[6px] rounded-full bg-gradient-to-r from-pink-500 to-violet-600" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experience;
