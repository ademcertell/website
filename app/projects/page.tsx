"use client";

import Image from "next/image";
import Container from "@/components/common/container";
import SectionHeader from "@/components/common/SectionHeader";
import { ArrowRight } from "lucide-react";

type Project = {
  title: string;
  description: string;
  tools: string[];
  image: string;
  link: string;
  live?: string;
};

const projects: Project[] = [
  {
    title: "Hapify",
    description: "Habit Tracker UI/UX Mobile App Design",
    tools: ["Figma"],
    image: "/projects-banner/habify-cover.jpg",
    link: "https://www.behance.net/gallery/233745411/Habit-Tracker-App-UIUX-Design",
  },
  {
    title: "Camping Desing",
    description: "Camping Design Mobile App UI/UX Design.",
    tools: ["Figma"],
    image: "/projects-banner/camping-design.png",
    link: "https://www.behance.net/gallery/233561175/Camping-Mobile-App-UI",
  },
  {
    title: "Sprout",
    description:
      "Sprout is a minimalist Pomodoro app that helps you stay productive by growing a virtual tree as you work. Stay focused, stay motivated",
    tools: ["TypeScript", "Next.js", "TailwindCSS"],
    image: "/projects-banner/sprout-cover.png",
    link: "https://github.com/ademcertell/sprout",
    live: "https://sproutid.vercel.app/",
  },
  {
    title: "Car Market",
    description: "Find your dreams car, fast and easy.",
    tools: ["Figma"],
    image: "/projects-banner/car-market.png",
    link: "https://www.behance.net/gallery/234422847/CarMarket-Car-Sales-App-UIUX-Design",
  },
];

export default function Projects() {
  return (
    <Container size="large" className="container animate-enter">
      <SectionHeader title="Projects" />

      <div className="mt-10 flex flex-col gap-5">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 md:grid-cols-2 items-start gap-10 border border-neutral-800 rounded-2xl p-6 hover:bg-neutral-900/40 transition`}
          >
            {index % 2 === 0 ? (
              <>
                <ProjectText project={project} />
                <ProjectImage project={project} />
              </>
            ) : (
              <>
                <ProjectImage project={project} />
                <ProjectText project={project} />
              </>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
}
function ProjectText({ project }: { project: Project }) {
  return (
    <div className="flex flex-col justify-center h-full">
      <h2 className="text-2xl font-bold">{project.title}</h2>
      <p className="mt-3 text-neutral-400 leading-relaxed">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="text-sm text-neutral-500">Tools:</span>
        {project.tools.map((tool, i) => (
          <span key={i} className="px-2 py-1 text-xs bg-neutral-800 rounded-md">
            {tool}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <a
          href={project.link}
          target="_blank"
          className="inline-flex items-center gap-1 rounded-lg bg-white text-black px-3 py-1.5 text-sm font-medium hover:bg-neutral-200 transition"
        >
          View Project
          <ArrowRight className="w-4 h-4" />
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            className="text-neutral-400 hover:text-white text-sm"
          >
            Open Live Site
          </a>
        )}
      </div>
    </div>
  );
}
function ProjectImage({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[4/3] w-full">
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover rounded-xl"
      />
    </div>
  );
}