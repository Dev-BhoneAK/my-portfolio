import { MotionConfig } from "framer-motion";

import projectsData, { projectId } from "@/app/utils/projectsData";
import { eyebrowClassName } from "@/app/utils/styles";
import ProjectItem from "./ProjectItem";

export default function ProjectsSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="mb-24 scroll-mt-12 md:mb-36"
      >
        <h2 id="projects-heading" className={eyebrowClassName}>
          Projects
        </h2>
        <p className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-heading xs:text-4xl">
          Built end to end, from business requirements to launch
        </p>

        <ul className="mt-12 space-y-20 lg:mt-16 lg:space-y-24">
          {/* Zig-zag from lg up: every second row flips its sides. */}
          {projectsData.map((project, index) => (
            <ProjectItem
              key={projectId(project)}
              project={project}
              reverse={index % 2 === 1}
            />
          ))}
        </ul>
      </section>
    </MotionConfig>
  );
}
