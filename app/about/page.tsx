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
      </div>
      <div className="text-black dark:text-white">
        <p>Hi, I&rsquo;m Adem Can</p>
        <p>
          I am a self-taught <strong>Frontend developer</strong> and jr. product
          designer producing small projects.
        </p>
        <hr className="my-5 opacity-30" />
        <div className="flex flex-col gap-3">
          <p>
            I am a multidisciplinary developer specializing in web projects.
            Additionally, I create innovative products in interface design
          </p>
          <p>
            I enjoy playing games and reading books. I write creative blog posts
            and stream on Twitch.
          </p>
        </div>
        <div className="mt-5">
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
