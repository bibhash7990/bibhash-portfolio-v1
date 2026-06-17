// @flow strict

import Link from 'next/link';
import * as React from 'react';
import { BsGithub } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';

function ProjectCard({ project }) {

  return (
    <div className="group from-editor border-editor-border relative rounded-lg border bg-gradient-to-r to-editor-alt w-full shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/60 hover:shadow-[0_8px_30px_-8px_rgba(139,92,246,0.45)]">
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
      </div>
      <div className="px-4 lg:px-8 py-3 lg:py-5 relative">
        <div className="flex flex-row space-x-1 lg:space-x-2 absolute top-1/2 -translate-y-1/2">
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-red-400"></div>
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-orange-400"></div>
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-green-200"></div>
        </div>
        <p className="text-center ml-3 text-[#16f2b3] text-base lg:text-xl">
          {project.name}
        </p>
      </div>
      <div className="overflow-hidden border-t-[2px] border-editor-rule px-4 lg:px-8 py-4 lg:py-8">
        <code className="font-mono text-xs md:text-sm lg:text-base">
          <div className="blink">
            <span className="mr-2 text-code-key">const</span>
            <span className="mr-2 text-code-var">project</span>
            <span className="mr-2 text-code-key">=</span>
            <span className="text-code-punc">{'{'}</span>
          </div>
          <div>
            <span className="ml-4 lg:ml-8 mr-2 text-code-var">name:</span>
            <span className="text-code-punc">{`'`}</span>
            <span className="text-code-str">{project.name}</span>
            <span className="text-code-punc">{`',`}</span>
          </div>

          <div className="ml-4 lg:ml-8 mr-2">
            <span className=" text-code-var">tools:</span>
            <span className="text-code-punc">{` ['`}</span>
            {
              project.tools.map((tag, i) => (
                <React.Fragment key={i}>
                  <span className="text-code-str">{tag}</span>
                  {
                    project.tools?.length - 1 !== i &&
                    <span className="text-code-punc">{`', '`}</span>
                  }
                </React.Fragment>
              ))
            }
            <span className="text-code-punc">{"],"}</span>
          </div>
          <div>
            <span className="ml-4 lg:ml-8 mr-2 text-code-var">myRole:</span>
            <span className="text-code-num">{project.role}</span>
            <span className="text-code-punc">,</span>
          </div>
          <div className="ml-4 lg:ml-8 mr-2">
            <span className="text-code-var">Description:</span>
            <span className="text-code-fn">{' ' + project.description}</span>
            <span className="text-code-punc">,</span>
          </div>
          <div><span className="text-code-punc">{`};`}</span></div>
        </code>
      </div>

      {(project.demo || project.code) && (
        <div className="flex flex-wrap items-center gap-3 border-t border-editor-rule/60 px-4 lg:px-8 py-4">
          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live demo of ${project.name}`}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-4 py-2 text-xs lg:text-sm font-medium text-white no-underline transition-all duration-300 hover:gap-3 hover:shadow-[0_0_20px_-4px_rgba(236,72,153,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16f2b3] focus-visible:ring-offset-2 focus-visible:ring-offset-editor"
            >
              <FiExternalLink size={16} />
              Live Demo
            </Link>
          )}
          {project.code && (
            <Link
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code of ${project.name} on GitHub`}
              className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-surface-3 px-4 py-2 text-xs lg:text-sm font-medium text-content-secondary no-underline transition-all duration-300 hover:gap-3 hover:border-[#16f2b3] hover:text-[#16f2b3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16f2b3] focus-visible:ring-offset-2 focus-visible:ring-offset-editor"
            >
              <BsGithub size={16} />
              Source
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;