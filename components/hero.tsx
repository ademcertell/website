"use client";

import Image from "next/image";
import Link from "next/link";

import ProjectsCard from "./card/Projects";
import OtherCard from "./card/Other";

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
      "Özel günleri takip etmek ve hatırlatıcı bildirimler almak için basit bir araç.",
    href: "https://github.com/ademcertell/ozel-gun",
  },
];

type Project = {
  title: string;
  description: string;
  href: string;
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
        <div className="md:max-w-lg">
          <p className="mt-10 text-base text-center lg:text-start text-black dark:text-white mx-auto">
            Frontend developer and technology enthusiast. Interface, mobile apps
            and more.
          </p>
          <div className="mt-10">
            <div className="flex items-center space-x-3">
              <Link
                href="mailto:ademcancertel619@gmail.com"
                target="_blank"
                className="flex font-bold items-center rounded-full bg-zinc-200 p-3 text-zinc-600 transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-100"
              >
                Email
              </Link>
              <Link
                href="https://twitter.com/ademcertell"
                target="_blank"
                className="flex items-center rounded-full bg-zinc-200 p-3 text-zinc-600 transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="25"
                  height="25"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <Image
          alt="Adem Can Certel"
          className="rounded-full my-3"
          src="/avatar.png"
          height={176}
          width={176}
          priority
          loading="eager"
        />
      </div>
      <section id="projects">
        <div className="mt-10">
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
