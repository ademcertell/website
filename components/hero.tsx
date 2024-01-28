"use client";

import Image from "next/image";
import Link from "next/link";

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
      <div>
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
        <div className="space-y-6">
          <h1 className="w-full flex justify-center items-center flex-col-reverse text-black dark:text-white text-xl sm:text-2xl">
            <span className="opacity-60">Frontend developer</span>
            <b>Adem Can Certel</b>
          </h1>
        </div>
        <div className="mt-10 w-full flex justify-center items-center flex-col-reverse">
          <div className="flex items-center space-x-3">
            <Link
              href="mailto:ademcancertel619@gmail.com"
              className="bg-zinc-200 text-zinc-600 hover:bg-zinc-400 hover:text-white flex items-center rounded-full p-3 transition-colors"
            >
              <span className="font-medium">Email</span>
            </Link>
            <Link
              href="https://twitter.com/ademcertell"
              target="_blank"
              className="bg-zinc-200 text-zinc-600 hover:bg-zinc-400 hover:text-white flex items-center rounded-full p-3 transition-colors"
            >
              <span className="font-medium">Twitter</span>
            </Link>
          </div>
        </div>
      </div>
      <section id="projects">
        <div className="mt-40">
          <h3 className="font-semibold text-black dark:text-white text-xl">
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
