import { Metadata } from "next";

import CustomLink from "@/components/ui/CustomLink";

export const metadata: Metadata = {
  title: "About",
  description: "About me and links",
};

const AboutPage = () => {
  return (
    <section>
      <div>
        <h1 className="text-2xl font-semibold mb-6">About me</h1>
      </div>
      <div className="flex flex-col gap-6">
        <p>Hi there, I&rsquo;m Adem Can</p>
        <p>
          My journey in frontend development started with scripting in Lua for
          MTA (Multi Theft Auto). Later on, I delved into coding Discord bots,
          crafting various bots for different purposes, finding immense pleasure
          in the process.
        </p>
        <p>
          Subsequently, I ventured into web development, where I explored
          various technology libraries and frameworks, while also gaining
          knowledge about databases.
        </p>
        <p>Currently, I&rsquo;m working on projects and freelancing.</p>
      </div>
      <div className="mt-5">
        <div className="grid gap-2 md:grid-cols-4">
          <CustomLink
            text="X"
            url="https://twitter.com/ademcertell"
            iconKey="twitter"
          />
          <CustomLink
            text="GitHub"
            url="https://github.com/ademcertell"
            iconKey="github"
          />
          <CustomLink
            text="Email"
            url="mailto:ademcancertel619@gmail.com"
            iconKey="mail"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutPage;