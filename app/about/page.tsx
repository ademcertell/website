import Link from "next/link";

import CustomLink from "@/components/ui/CustomLink";

const AboutPage = () => {
  return (
    <section className="space-y-6 md:my-20 m-1.5 mt-20">
      <>
        <h1 className="text-black dark:text-white text-3xl font-semibold">
          About me
        </h1>
        <h3 className="text-neutral-500 dark:text-white/70">
          Hi I&rsquo;m Adem Can 👋
        </h3>
        <div className="text-black dark:text-white text-base my-5">
          <p>
            I am a frontend developer and designer based in Istanbul, I&rsquo;m
            currently making mobile applications on a react native. I also do ui
            designs as a freelancer and I&rsquo;m interested in fitness
            bodybuilding.
          </p>
          <hr className="my-5 opacity-25" />
          <div className="flex flex-col gap-6">
            <p>
              I develop react native mobile applications in my organization
              called{" "}
              <Link
                href="https://github.com/NebulaViq"
                target="_blank"
                className="underline underline-offset-4"
              >
                NebulaViq
              </Link>{" "}
              on GitHub and independently made a space news website with Nasa
              API.
            </p>
            <p>
              I love working in coding and design. Some of the things that
              excite me are animations, design systems, and great ui designs.
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-black/50 dark:text-white/70 font-semibold">
              Links
            </h2>
            <div className="my-1.5">
              <ul className="flex flex-col gap-1">
                <CustomLink
                  text="Twitter"
                  url="https://twitter.com/ademcertell"
                  iconKey="twitter"
                />
                <CustomLink
                  text="GitHub"
                  url="https://github.com/ademcertell"
                  iconKey="github"
                />
                <CustomLink
                  text="Resume"
                  url="https://read.cv/ademcancertel"
                  iconKey="resume"
                />
                <CustomLink
                  text="Instagram"
                  url="https://www.instagram.com/ademcertell/"
                  iconKey="instagram"
                />
                <CustomLink
                  text="YouTube"
                  url="https://www.youtube.com/channel/UC3sLnNIrakZRPJEOnzCKerQ"
                  iconKey="youtube"
                />
              </ul>
            </div>
          </div>
        </div>
      </>
    </section>
  );
};

export default AboutPage;
