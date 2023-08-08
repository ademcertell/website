import Link from "next/link";

const AboutPage = () => {
  return (
    <section className="space-y-6 md:my-20 m-1.5 mt-20">
      <>
        <h1 className="text-black dark:text-white text-3xl font-semibold">
          About me
        </h1>
        <h3 className="text-neutral-500 dark:text-white/70">Hi I'm Adem Can</h3>
        <div className="text-black dark:text-white text-base my-5">
          <p>
            I'm a Frontend developer in Turkey, I'm currently making mobile
            applications on a react native. I also do ui designs as a freelancer
            and I'm interested in fitness bodybuilding.
          </p>
          <hr className="my-5 opacity-25" />
          <p>
            I was interested in coding, and when I added design into it, this
            combination of interests eventually led me to my current role, front
            end development.
            <Link target="_blank" href="https://superpeer.com/ademcancertel">
              To meet 1:1
            </Link>
          </p>
          <div className="mt-10">
            <h2 className="text-black/50 dark:text-white/70 font-semibold">
              Links
            </h2>
            <div className="my-1.5">
              <ul>
                <li className="mb-1.5">
                  <Link
                    className="w-28 flex justify-between items-center cursor-pointer text-lg"
                    target="_blank"
                    href="mailto:ademcancertel619@gmail.com"
                  >
                    Email
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      ></path>
                    </svg>
                  </Link>
                </li>
                <li className="mb-1.5">
                  <Link
                    className="w-28 flex justify-between items-center cursor-pointer text-lg"
                    target="_blank"
                    href="https://twitter.com/ademcertell"
                  >
                    Twitter
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      ></path>
                    </svg>
                  </Link>
                </li>
                <li className="mb-1.5">
                  <Link
                    className="w-28 flex justify-between items-center cursor-pointer text-lg"
                    target="_blank"
                    href="https://github.com/ademcertell"
                  >
                    GitHub
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      ></path>
                    </svg>
                  </Link>
                </li>
                <li className="mb-1.5">
                  <Link
                    className="w-28 flex justify-between items-center cursor-pointer text-lg"
                    target="_blank"
                    href="https://www.linkedin.com/in/ademcancertel/"
                  >
                    LinkedIn
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      ></path>
                    </svg>
                  </Link>
                </li>
                <li className="mb-1.5">
                  <Link
                    className="w-28 flex justify-between items-center cursor-pointer text-lg"
                    target="_blank"
                    href="https://www.instagram.com/ademcertell/"
                  >
                    Instagram
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      ></path>
                    </svg>
                  </Link>
                </li>
                <li className="mb-1.5">
                  <Link
                    className="w-28 flex justify-between items-center cursor-pointer text-lg"
                    target="_blank"
                    href="https://www.youtube.com/channel/UC3sLnNIrakZRPJEOnzCKerQ"
                  >
                    YouTube
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      ></path>
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    </section>
  );
};

export default AboutPage;
