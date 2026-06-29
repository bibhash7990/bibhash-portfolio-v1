// @flow strict

import { achievementsData } from "@/utils/data/achievements";
import { FaTrophy } from "react-icons/fa";
import GlowCard from "../../helper/glow-card";
import Reveal from "../../helper/reveal";

function Achievements() {
  return (
    <div id="achievements" className="section-root relative z-50 border-t my-12 lg:my-24 border-divider">
      <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-20"></div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-label"></span>
          <span className="bg-label w-fit text-label-text p-2 px-5 text-xl rounded-md">
            Achievements
          </span>
          <span className="w-24 h-[2px] bg-label"></span>
        </div>
      </div>

      <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8">
        {achievementsData.map((item, index) => (
          <Reveal key={item.id} direction="up" delay={index * 100}>
            <GlowCard identifier={`achievement-${item.id}`}>
              <div className="p-5 lg:p-6 flex flex-col items-center text-center gap-3">
                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-pink-500/20 to-violet-600/20 border border-violet-500/40 text-[#16f2b3]">
                  <FaTrophy size={24} />
                </div>
                <p className="text-base lg:text-lg font-semibold text-content">
                  {item.title}
                </p>
                <p className="text-sm text-content-secondary">{item.issuer}</p>
                <span className="text-xs px-3 py-1 rounded-full border border-line-2 text-[#16f2b3]">
                  {item.date}
                </span>
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default Achievements;
