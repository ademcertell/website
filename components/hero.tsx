import Link from "next/link";

import ProjectsCard from "@/components/card/ProjectsCard";

const projects: Project[] = [
  {
    title: "website",
    description:
      "My personal portfolio was created with next.js tailwindcss and vercel.",
    href: "https://github.com/ademcertell/website",
  },
  {
    title: "beatify",
    description:
      "A project that displays the music you listen to on Spotify in real-time on a web page coded using Next.js.",
    href: "https://github.com/ademcertell/beatify",
  },
];

type Project = {
  title: string;
  description: string;
  href: string;
};

const Hero = () => {
  return (
    <section>
      <div className="">
        <h1 className="w-full flex flex-col-reverse text-xl sm:text-2xl">
          <span className="opacity-60 text-xl">Frontend developer</span>
          <b className="mt-0 mb-1">Adem Can Certel</b>
        </h1>
        <div className="mt-8">
          <div className="space-y-5">
            <p>
              I am a 20 years old multidisciplinary developer specialised in web
              projects. I also create innovative products in interface design
            </p>

            <p>
              I enjoy playing games and reading books. I write creative blog
              posts.{" "}
              <Link
                href="/about"
                className="inline-flex underline underline-offset-2 relative decoration-sky-600 hover:decoration-blue-400 decoration-2 transition-colors"
              >
                about me{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
      <section>
        <div className="mt-40">
          <h3 className="font-semibold text-xl">Featured projects</h3>
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