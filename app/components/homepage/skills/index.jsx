// @flow strict

import { skillCategories, skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Reveal from "../../helper/reveal";

function Skills() {
  return (
    <div id="skills" className="relative z-50 border-t my-12 lg:my-24 border-divider">
      <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl  opacity-20"></div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent  w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-label"></span>
          <span className="bg-label w-fit text-label-text p-2 px-5 text-xl rounded-md">
            Skills
          </span>
          <span className="w-24 h-[2px] bg-label"></span>
        </div>
      </div>

      {/* Animated icon marquee */}
      <div className="w-full my-12 overflow-hidden">
        <Marquee
          gradient={false}
          speed={80}
          pauseOnHover={true}
          pauseOnClick={true}
          delay={0}
          play={true}
          direction="left"
        >
          {skillsData.map((skill, id) => (
            <div className="w-36 min-w-fit h-fit flex flex-col items-center justify-center transition-transform duration-300 m-3 sm:m-5 rounded-lg group relative hover:-translate-y-1 cursor-pointer"
              key={id}>
              <div className="h-full w-full rounded-lg border border-line bg-surface-4 transition-all duration-300 group-hover:border-violet-500/70 group-hover:shadow-[0_0_22px_-8px_rgba(139,92,246,0.55)]">
                <div className="flex -translate-y-[1px] justify-center">
                  <div className="w-3/4">
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-3 p-6">
                  <div className="h-8 sm:h-10">
                    <Image
                      src={skillsImage(skill)?.src}
                      alt={skill}
                      width={40}
                      height={40}
                      className="!h-full !w-auto rounded-lg"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </div>
                  <p className="text-content text-sm sm:text-lg">
                    {skill}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Categorized skill grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {skillCategories.map((category, index) => (
          <Reveal
            key={category.id}
            direction={index % 2 === 0 ? "left" : "right"}
            delay={(index % 2) * 80}
          >
            <div className="h-full rounded-xl border border-line bg-surface/60 p-5 lg:p-6 transition-all duration-300 hover:border-violet-500/70 hover:shadow-[0_0_25px_-8px_rgba(139,92,246,0.5)]">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-pink-500 to-violet-600" />
                <h3 className="text-lg font-semibold text-content">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs sm:text-sm px-3 py-1.5 rounded-full border border-line-2 bg-input text-content-secondary transition-all duration-300 hover:border-[#16f2b3] hover:text-[#16f2b3]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default Skills;
