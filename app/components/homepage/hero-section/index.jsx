// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import NeuralVortex from "../../helper/neural-vortex";

function HeroSection() {
  return (
    <section className="relative z-50 flex flex-col items-center justify-between py-4 lg:py-12">
      {/* Interactive WebGL vortex background, scoped to the hero. Sits behind
          content and is masked at the edges so it fades into the page. */}
      <div className="pointer-events-none absolute -inset-x-6 -top-24 sm:-inset-x-12 -z-10 h-[140%] overflow-hidden [mask-image:radial-gradient(120%_80%_at_50%_30%,#000_55%,transparent_100%)]">
        {/* CSS-only fallback (shown when WebGL is unavailable or reduced-motion):
            the original animated gradient blobs. */}
        <div className="blob blob-pink w-[260px] h-[260px] top-10 left-4 lg:w-[360px] lg:h-[360px]" />
        <div className="blob blob-violet w-[300px] h-[300px] top-24 right-4 lg:w-[400px] lg:h-[400px]" />
        <div className="blob blob-teal w-[200px] h-[200px] bottom-10 left-1/3 lg:w-[280px] lg:h-[280px]" />
        <NeuralVortex className="absolute inset-0 h-full w-full opacity-90" />
      </div>

      <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8">
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-20 md:pb-10 lg:pt-10">
          <div className="hero-enter mb-6 inline-flex items-center gap-2 rounded-full border border-[#16f2b3]/30 bg-[#16f2b3]/10 px-3 py-1.5 text-xs font-medium text-[#16f2b3]">
            <span className="pulse-dot relative inline-flex h-2 w-2 rounded-full bg-[#16f2b3]" />
            Available for new opportunities
          </div>

          <h1 className="hero-enter text-3xl font-bold leading-10 text-content md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]" style={{ "--enter-delay": "100ms" }}>
            Hello, <br />
            This is {' '}
            <span className="text-gradient font-bold">{personalData.name}</span>
            {` , I'm a Professional `}
            <span className=" text-[#16f2b3]">{personalData.designation}</span>
            .
          </h1>

          <div className="hero-enter my-12 flex items-center gap-5" style={{ "--enter-delay": "200ms" }}>
            <Link
              href={personalData.github}
              target='_blank'
              aria-label="GitHub profile"
              className="text-pink-500 transition-colors duration-300 hover:text-[#16f2b3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16f2b3] focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md"
            >
              <BsGithub size={30} />
            </Link>
            <Link
              href={personalData.linkedIn}
              target='_blank'
              aria-label="LinkedIn profile"
              className="text-pink-500 transition-colors duration-300 hover:text-[#16f2b3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16f2b3] focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md"
            >
              <BsLinkedin size={30} />
            </Link>
            <Link
              href={personalData.twitter}
              target='_blank'
              aria-label="Personal website"
              className="text-pink-500 transition-colors duration-300 hover:text-[#16f2b3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16f2b3] focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md"
            >
              <CgWebsite size={30} />
            </Link>
          </div>

          <div className="hero-enter flex items-center gap-3" style={{ "--enter-delay": "300ms" }}>
            <Link href="#contact" className="bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full transition-all duration-300 hover:from-pink-500 hover:to-violet-600">
              <button className="px-3 text-xs md:px-8 py-3 md:py-4 bg-surface rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider text-content no-underline transition-all duration-200 ease-out  md:font-semibold flex items-center gap-1 hover:gap-3">
                <span>Contact me</span>
                <RiContactsFill size={16} />
              </button>
            </Link>

            <Link className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold" role="button" target="_blank" rel="noopener noreferrer" href={personalData.resume}
            >
              <span>Get Resume</span>
              <MdDownload size={16} />
            </Link>
          </div>

        </div>
        <div className="order-1 lg:order-2 from-editor border-editor-border relative rounded-lg border bg-gradient-to-r to-editor-alt shadow-[var(--shadow-card)]">
          <div className="flex flex-row">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
            <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
          </div>
          <div className="px-4 lg:px-8 py-5">
            <div className="flex flex-row space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-orange-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-200"></div>
            </div>
          </div>
          <div className="overflow-hidden border-t-[2px] border-editor-rule px-4 lg:px-8 py-4 lg:py-8">
            <code className="font-mono text-xs md:text-sm lg:text-base">
              <div className="blink">
                <span className="mr-2 text-code-key">const</span>
                <span className="mr-2 text-code-var">coder</span>
                <span className="mr-2 text-code-key">=</span>
                <span className="text-code-punc">{'{'}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-code-var">name:</span>
                <span className="text-code-punc">{`'`}</span>
                <span className="text-code-str">Bibhash Lenka</span>
                <span className="text-code-punc">{`',`}</span>
              </div>
              <div className="ml-4 lg:ml-8 mr-2">
                <span className=" text-code-var">skills:</span>
                <span className="text-code-punc">{`['`}</span>
                <span className="text-code-str">React</span>
                <span className="text-code-punc">{"', '"}</span>
                <span className="text-code-str">Node.js</span>
                <span className="text-code-punc">{"', '"}</span>
                <span className="text-code-str">Express</span>
                <span className="text-code-punc">{"', '"}</span>
                <span className="text-code-str">MongoDB</span>
                <span className="text-code-punc">{"', '"}</span>
                <span className="text-code-str">TypeScript</span>
                <span className="text-code-punc">{"', '"}</span>
                <span className="text-code-str">Redux</span>
                <span className="text-code-punc">{"', '"}</span>
                <span className="text-code-str">React Query</span>
                <span className="text-code-punc">{"', '"}</span>
                <span className="text-code-str">Tailwind</span>
                <span className="text-code-punc">{"'],"}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-code-var">hardWorker:</span>
                <span className="text-code-num">true</span>
                <span className="text-code-punc">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-code-var">quickLearner:</span>
                <span className="text-code-num">true</span>
                <span className="text-code-punc">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-code-var">problemSolver:</span>
                <span className="text-code-num">true</span>
                <span className="text-code-punc">,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-code-method">hireable:</span>
                <span className="text-code-num">function</span>
                <span className="text-code-punc">{'() {'}</span>
              </div>
              <div>
                <span className="ml-8 lg:ml-16 mr-2 text-code-num">return</span>
                <span className="text-code-punc">{`(`}</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-code-fn">this.</span>
                <span className="mr-2 text-code-var">hardWorker</span>
                <span className="text-code-str">&amp;&amp;</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-code-fn">this.</span>
                <span className="mr-2 text-code-var">problemSolver</span>
                <span className="text-code-str">&amp;&amp;</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-code-fn">this.</span>
                <span className="mr-2 text-code-var">skills.length</span>
                <span className="mr-2 text-code-str">&gt;=</span>
                <span className="text-code-num">5</span>
              </div>
              <div><span className="ml-8 lg:ml-16 mr-2 text-code-punc">{`);`}</span></div>
              <div><span className="ml-4 lg:ml-8 text-code-punc">{`};`}</span></div>
              <div><span className="text-code-punc">{`};`}</span></div>
            </code>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;