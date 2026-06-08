// @flow strict

import * as React from 'react';

function ProjectCard({ project }) {

  return (
    <div className="from-editor border-editor-border relative rounded-lg border bg-gradient-to-r to-editor-alt w-full shadow-[var(--shadow-card)]">
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
    </div>
  );
};

export default ProjectCard;