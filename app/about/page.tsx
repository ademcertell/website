"use client";

import React from "react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <section className="space-y-6 md:my-20 m-1.5">
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
          <div className="flex flex-col my-5">
            <ul>
              <li>
                <Link href="https://twitter.com/ademcertell">
                  Twitter: @ademcertell
                </Link>
              </li>
              <li>
                <Link href="https://github.com/ademcertell">
                  GitHub: @ademcertell
                </Link>
              </li>
              <li>
                {" "}
                <Link href="https://steamcommunity.com/id/ademcertel">
                  Steam: ademcertell
                </Link>
              </li>
              <li>
                {" "}
                <Link href="https://www.instagram.com/ademcertell/">
                  Instagram: @ademcertell
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
