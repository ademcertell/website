"use client";

import React from "react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <section className="space-y-6 md:my-20 m-1.5 mt-20">
      <div>
        <h1 className="text-black dark:text-white text-3xl">About me</h1>
        <div className="text-black dark:text-white text-base my-5">
          <p>
            Hi, Im Adem Can, I am a front-end developer living in Turkey.
            Currently, I am working on my fitness application project called
            Maahes.
          </p>
          <hr className="my-5 opacity-25" />
          <p>
            I have a passion for various activities such as games (story-based
            games), design, and coding. The combination of these interests has
            led me to my current role as a front-end developer.
          </p>
          <div className=" my-10">
            <h2 id="links" className="text-black dark:text-white text-2xl">
              <a href="#links">Links</a>
            </h2>
            <ul className="underline underline-offset-4 my-4">
              <li className="mb-1.5">
                <Link href="https://twitter.com/ademcertell">Twitter</Link>
              </li>
              <li className="mb-1.5">
                <Link href="https://github.com/ademcertell">GitHub</Link>
              </li>
              <li className="mb-1.5">
                {" "}
                <Link href="https://steamcommunity.com/id/ademcertel">
                  Steam
                </Link>
              </li>
              <li>
                {" "}
                <Link href="https://www.instagram.com/ademcertell/">
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
          <div className="my-10">
            <h2 id="build" className="text-black dark:text-white text-2xl">
              <a href="#build">How it was built</a>
            </h2>
            <ul className="my-4">
              <li className="mb-1.5">
                Framework:
                <Link className="underline underline-offset-4" href="">
                  {" "}
                   Nextjs
                </Link>
              </li>
              <li className="mb-1.5">
                Styling:
                <Link className="underline underline-offset-4" href="">
                  {" "}
                   Tailwind CSS
                </Link>
              </li>
              <li className="mb-1.5">
                Claps:
                <Link className="underline underline-offset-4" href="">
                  {" "}
                   Upstash
                </Link>
              </li>
              <li className="mb-1.5">
                Deployment:
                <Link className="underline underline-offset-4" href="">
                  {" "}
                   Vercel
                </Link>
              </li>
              <li className="mb-1.5">
                Database:
                <Link className="underline underline-offset-4" href="">
                  {" "}
                  Supabase
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
