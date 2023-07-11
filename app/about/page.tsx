import Link from "next/link";

const AboutPage = () => {
  return (
    <section className="space-y-6 md:my-20 m-1.5 mt-20">
      <>
        <h1 className="text-black dark:text-white text-3xl">About me</h1>
        <div className="text-black dark:text-white text-base my-5">
          <p>
            Hi, Im Adem Can, I am a front end developer in Turkey, I am
            currently developing my project maahes which is a fitness interface
            application. I also do ui designs as a freelancer and I am
            interested in fitness bodybuilding.
          </p>
          <hr className="my-5 opacity-25" />
          <p>
            I was interested in coding, and when I added design into it, this
            combination of interests eventually led me to my current role, front
            end development.
          </p>
          <div className="mt-10">
            <h2 id="links" className="text-black dark:text-white text-2xl">
              <a href="#links">Links</a>
            </h2>
            <ul className="underline underline-offset-4 my-4">
              <li className="mb-1.5">
                <Link target="_blank" href="https://github.com/ademcertell">
                  GitHub
                </Link>
              </li>
              <li className="mb-1.5">
                <Link target="_blank" href="https://twitter.com/ademcertell">
                  Twitter
                </Link>
              </li>
              <li className="mb-1.5">
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/in/ademcancertel/"
                >
                  LinkedIn
                </Link>
              </li>
              <li className="mb-1.5">
                <Link
                  target="_blank"
                  href="https://www.instagram.com/ademcertell/"
                >
                  Instagram
                </Link>
              </li>
              <li className="mb-1.5">
                <Link
                  target="_blank"
                  href="https://www.youtube.com/channel/UC3sLnNIrakZRPJEOnzCKerQ"
                >
                  YouTube
                </Link>
              </li>
              <li></li>
            </ul>
          </div>
          <div className="mt-10">
            <h2 id="build" className="text-black dark:text-white text-2xl">
              <a href="#build">How it was built</a>
            </h2>
            <ul className="my-4">
              <li className="mb-1.5">
                Framework:
                <Link
                  target="_blank"
                  className="underline underline-offset-4"
                  href="https://nextjs.org/"
                >
                  {" "}
                  Nextjs
                </Link>
              </li>
              <li className="mb-1.5">
                Styling:
                <Link
                  target="_blank"
                  className="underline underline-offset-4"
                  href="https://tailwindcss.com/"
                >
                  {" "}
                  Tailwind CSS
                </Link>
              </li>
              <li className="mb-1.5">
                Claps:
                <Link
                  target="_blank"
                  className="underline underline-offset-4"
                  href="https://upstash.com/"
                >
                  {" "}
                  Upstash
                </Link>
              </li>
              <li className="mb-1.5">
                Deployment:
                <Link
                  target="_blank"
                  className="underline underline-offset-4"
                  href="https://vercel.com/"
                >
                  {" "}
                  Vercel
                </Link>
              </li>
              <li className="mb-1.5">
                Database:
                <Link
                  target="_blank"
                  className="underline underline-offset-4"
                  href="https://supabase.com/"
                >
                  {" "}
                  Supabase
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    </section>
  );
};

export default AboutPage;
