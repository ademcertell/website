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
        Hi👋, I&rsquo;m Adem Can
        </h3>
        <div className="text-black dark:text-white text-base my-5">
          <p>
            I&rsquo;m a frontend developer and designer living in Istanbul, I
            make mobile applications on react native in my spare time. I also do
            interface designs as a freelancer and I&rsquo;m interested in
            bodybuilding.
          </p>
          <hr className="my-5 opacity-25 border-dashed" />
          <div className="flex flex-col gap-6">
            <p>
              I love working in coding and design. Some of the things that
              excite me are animations, design systems and cool user interface
              designs. Sometimes I do pixel art designs.
            </p>
          </div>
          <div className="text-center mb-8 mt-8">
            <Link className="m-1 bg-blue-300 hover:bg-blue-200 transition duration-200 text-black rounded-xl p-3 " href="mailto:ademcancertel619@gmail.com">
              Say hello!
            </Link>
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
                  text="Instagram"
                  url="https://www.instagram.com/ademcertell/"
                  iconKey="instagram"
                />
                <CustomLink
                  text="YouTube"
                  url="https://www.youtube.com/channel/UC3sLnNIrakZRPJEOnzCKerQ"
                  iconKey="youtube"
                />
                <CustomLink
                  text="Resume"
                  url="https://read.cv/ademcancertel"
                  iconKey="resume"
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