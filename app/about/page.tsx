import { Metadata } from "next";

import CustomLink from "@/components/ui/CustomLink";

export const metadata: Metadata = {
  title: "About",
  description: "About me and links",
};

const AboutPage = () => {
  return (
    <section id="about">
      <header>
        <h1 className="text-black dark:text-white text-2xl font-semibold">
          About me
        </h1>
        <p className="text-neutral-800 dark:text-neutral-200 my-5">
          Hi, I&rsquo;m Adem Can
        </p>
      </header>
      <>
        <div className="text-neutral-800 dark:text-neutral-200 text-base">
          <p>
            I&rsquo;m a self-taught Frontend Developer and writer, designer, I
            live in Istanbul, I write game reviews.
          </p>
          <hr className="my-5 opacity-40" />
          <div className="flex flex-col gap-3">
            <p>
              I love working in coding and design . Some of the things that
              excite me are CSS, design systems and great user interface
              designs.
            </p>
            <p>
              I enjoy reading books, playing games and I have a passion for
              creating creative content. I try to produce creative content as
              much as I can.
            </p>
          </div>
          <div className="mt-10">
            <div className="grid gap-4 md:grid-cols-4">
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
                text="Instagram"
                url="https://www.instagram.com/ademcertell/"
                iconKey="instagram"
              />
            </div>
          </div>
        </div>
      </>
    </section>
  );
};

export default AboutPage;