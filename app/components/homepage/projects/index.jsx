import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';
import RobotPanel from './robot-panel';

const Projects = () => {

  return (
    <div id='projects' className="relative z-50  my-12 lg:my-24">
      <div className="sticky top-10 z-10">
        <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute -top-3 left-0 translate-x-1/2 filter blur-3xl  opacity-30"></div>
        <div className="flex items-center justify-start relative">
          <span className="bg-label absolute left-0  w-fit text-label-text px-5 py-3 text-xl rounded-md">
            PROJECTS
          </span>
          <span className="w-full h-[2px] bg-label"></span>
        </div>
      </div>

      <div className="pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Project cards (sticky-stack effect). On mobile they come AFTER the
              robot; on desktop they're the left column. */}
          <div className="order-2 lg:order-1 flex flex-col gap-6">
            {projectsData.slice(0, 4).map((project, index) => (
              <div
                id={`sticky-card-${index + 1}`}
                key={index}
                className="sticky-card w-full sticky"
              >
                <div className="box-border flex items-center justify-center rounded shadow-[0_0_30px_0_rgba(0,0,0,0.3)] transition-all duration-[0.5s]">
                  <ProjectCard project={project} />
                </div>
              </div>
            ))}
          </div>

          {/* 3D robot panel. Mobile: a fixed-height panel above the cards.
              Desktop: sticky full-height on the right, pinned for the whole
              projects scroll. Mounts when in view. */}
          <div className="order-1 lg:order-2">
            <div className="h-[55vh] min-h-[360px] lg:sticky lg:top-28 lg:h-[calc(100vh-9rem)]">
              <RobotPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;