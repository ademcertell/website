"use client";

import Image from "next/image";

import ProjectsCard from "./card/Projects";

const projects: Project[] = [
  {
    title: "website",
    description:
      "My personal portfolio was created with next.js tailwindcss and vercel.",
    href: "https://github.com/ademcertell/website",
  },
  {
    title: "ozel-gun",
    description:
      "A simple tool to keep track of special occasions and receive reminder notifications.",
    href: "https://github.com/ademcertell/ozel-gun",
  },
];

type Project = {
  title: string;
  description: string;
  href: string;
};

const Hero = () => {
  return (
    <section id="home">
      <div className="w-full flex justify-center flex-col-reverse lg:flex-row items-center">
        <Image
          alt="Adem Can Certel"
          className="rounded-full my-3"
          src="/favicon.png"
          height={165}
          width={165}
          priority
        />
      </div>
      <section id="projects">
        <div className="mt-40">
          <h3 className="text-black dark:text-white text-xl font-semibold">
            Featured projects
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectsCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Hero;