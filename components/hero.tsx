"use client";

import Image from "next/image";

import ProjectsCard from "./card/Projects";
import OtherCard from "./card/Other";

const projects: Project[] = [
  {
    title: "homepage",
    description:
      "✨ My personal website was created with Nextjs, TawilwindCSS and deployed with Vercel.",
    href: "https://github.com/ademcertell/homepage",
  },
  {
    title: "maahes",
    description:
      "Stay in shape ⚡ - The fitness app I made with React Native technology",
    href: "https://github.com/maahes-app/maahes",
  },
];

type Project = {
  title: string;
  description: string;
  href: string;
};
///
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
  {
    title: "Dashboard",
    description:
      "Personal activity dashboard created using the Next.js API ways",
    href: "/dashboard",
  },
];

type Other = {
  title: string;
  description: string;
  href: string;
};

const Hero = () => {
  return (
    <section className="m-1.5 space-y-6 md:my-16 mt-20">
      <div className="w-full flex justify-between flex-col-reverse lg:flex-row items-center">
        <div>
          <p className="w-full mt-10 text-base text-center lg:text-start mb-0 text-black dark:text-white mx-auto">
            front-end developer and technology enthusiast. Im in love with
            NextJS, TailwindCSS. I dont stop learning new things.
          </p>
        </div>
        <Image
          alt="Adem Can Certel"
          height={176}
          width={176}
          priority
          loading='eager'
          className="rounded-full my-3"
          src="/avatar.png"
        />
      </div>
      <section id="projects">
        <div className="mt-20">
          <h3 className="text-black dark:text-white text-xl font-semibold">
            Projects
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectsCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>
      <section id="other">
        <div className=" mt-24">
          <h3 className="text-black dark:text-white text-xl font-semibold">
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
