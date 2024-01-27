import { Metadata } from "next";

import CustomLink from "@/components/ui/CustomLink";

export const metadata: Metadata = {
  title: "About",
  description: "About me and links",
};

const AboutPage = () => {
  return (
    <main id="about">
      <div>
        <h1 className="text-black dark:text-white text-2xl font-semibold">
          <b>About me</b>
        </h1>
        <span className="text-black dark:text-white my-5">
          Hi, I&rsquo;m Adem Can
        </span>
      </div>
        <div className="text-black dark:text-white text-base">
          <p>
            I am a self-taught <strong>Frontend developer</strong> and jr. product designer producing small projects.
          </p>
          <hr className="my-5 opacity-30" />
          <div className="flex flex-col gap-3">
            <p>
              I love working in coding and design . Some of the things that
              excite me are CSS, design systems and great user interface
              designs.
            </p>
            <p>
              I enjoy reading books, playing games and I have a passion for
              producing creative content. I try to produce creative content as
              much as I can. I broadcast games on the Twitch platform.
            </p>
          </div>
          <div className="mt-10">
            <div className="grid gap-2 md:grid-cols-4 ">
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
            </div>
          </div>
        </div>
    </main>
  );
};

export default AboutPage;