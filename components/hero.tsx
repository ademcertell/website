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
      <div className="w-full flex justify-between flex-col-reverse lg:flex-row items-center">
        <div className="md:max-w-lg">
          <p className="text-base text-center lg:text-start text-black dark:text-white mx-auto">
            Frontend developer and technology enthusiast. designs.
          </p>
        </div>
        <Image
          alt="Adem Can Certel"
          className="rounded-full my-3"
          src="/avatar.png"
          height={176}
          width={176}
          priority
        />
      </div>
      <div className="mb-8 mt-5">
        <Link
          className="border border-neutral-300 dark:border-neutral-800 dark:text-neutral-200 text-neutral-500 hover:dark:bg-neutral-800 hover:bg-neutral-100 rounded-xl p-3 m-1 transition duration-200"
          href="mailto:ademcancertel619@gmail.com"
        >
          Say hello!
        </Link>
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
          <Link href="/repository" className="text-neutral-400">
            More projects
          </Link>
        </div>
      </section>
    </section>
  );
};

export default Hero;