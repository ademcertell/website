import Link from "next/link";
import React from "react";

type ProjectsCardProps = {
  project: Project;
};

type Project = {
  title: string;
  description: string;
  href: string
};

const ProjectsCard = ({ project }: ProjectsCardProps) => {
  return (
      <section>
        <div className="mt-4 grid gap-4 md:grid-cols-1">
          <Link
            href={project.href}
            target="_blank"
            className="rounded-md p-4 hover:dark:bg-zinc-800 hover:bg-indigo-50 overflow-x-hidden transition-colors duration-300 ease-in-out"
          >
            <div className="overflow-x-hidden leading-relaxed space-x-y">
              <h2 className="text-black dark:text-white font-medium">
                {project.title}
              </h2>
              <p className="text-slate-500 dark:text-white/70 text-sm line-clamp-2 mb-2.5">
                {project.description}
              </p>
            </div>
          </Link>
        </div>
      </section>
  );
};

export default ProjectsCard;
