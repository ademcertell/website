import { Metadata } from "next";

import CustomLink from "@/components/ui/CustomLink";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "About me and links",
};

const AboutPage = () => {
  return (
    <section id="about">
      <>
        <h1 className="text-black dark:text-white text-2xl font-semibold">
          About me
        </h1>
        <p className="text-neutral-800 dark:text-neutral-200 my-5">
          Hi, I&rsquo;m Adem Can
        </p>
        <div className="text-neutral-800 dark:text-neutral-200 text-base">
          <p>
            I&rsquo;m a self-taught Frontend Developer living in Istanbul, I
            develop mobile applications with react-native. I also freelance
            interface designs and I&rsquo;m interested in bodybuilding.
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
            <div className="grid grid-cols-4 gap-4">
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
              <CustomLink
                text="YouTube"
                url="https://www.youtube.com/channel/UC3sLnNIrakZRPJEOnzCKerQ"
                iconKey="youtube"
              />
            </div>
          </div>
        </div>
      </>
    </section>
  );
};

export default AboutPage;