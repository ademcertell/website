"use client";

import Image from "next/image";
import Tech from "./icons/Tech";
import ProjectsCard from "./card/Projects";
import OtherCard from "./card/Other";

const projects: Project[] = [
  {
    title: "homepage",
    description: "My personal website, build with Next.js, TailwindCSS",
    href: "https://github.com/ademcertell/homepage",
  },
  {
    title: "maahes",
    description: "Stay in shape⚡- my fitness app project with React Native",
    href: "https://github.com/maahes-app/maahes",
  },
];

type Project = {
  title: string;
  description: string;
  href: string
};

const other: Other[] = [
  {
    title: "Repository",
    description: "All my open source repositories",
    href: "/repository",
  },
  {
    title: "About",
    description:
      "About me, what I like to do, what is my current job, and more...",
    href: "/about",
  },
];

type Other = {
  title: string;
  description: string;
  href: string
};


const Hero = () => {
  return (
    <section className="w-full m-1.5">
      <div className="w-full flex justify-between flex-col-reverse lg:flex-row items-center">
        <div>
          <p className="w-full mt-10 text-base text-center lg:text-start mb-0 text-black dark:text-white mx-auto">
            Im
            <strong className="text-zinc-900 dark:text-white"> Adem Can</strong>
            , front-end developer in Turkey, a technology enthusiast. Im in love
            with NextJS, TailwindCSS. I dont stop learning new things.
          </p>
          <div className="flex flex-col justify-center items-center lg:items-start mb-16 mx-auto lg:mx-0">
            <div className="flex flex-col justify-center items-center lg:items-start">
              <Tech />
            </div>
          </div>
        </div>
        <Image
          alt="Adem Can Certel"
          height={176}
          width={176}
          priority={true}
          className="rounded-full"
          src="/avatar.png"
        />
      </div>
      <section>
        <div id="projects" className="mt-20">
          <h3 className="text-black/90 dark:text-white/90 text-xl font-semibold">
            Projects
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectsCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>
      <section>
        <div id="other" className=" mt-24">
          <h3 className="text-black/90 dark:text-white/90 text-xl font-semibold">
            Other
          </h3>
          <div className="grid gap-4 md:grid-cols-2 mb-10">
            {other.map((other, index) => (
              <OtherCard key={index} other={other} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Hero;
