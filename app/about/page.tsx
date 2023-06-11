"use client";

import React from "react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <section className="w-full m-1.5">
      <h1 className="text-black dark:text-white text-3xl font-bold">
        About me
      </h1>
      <p className="my-5 text-black dark:text-white text-base">
        Hi, Im Adem Can
      </p>
      <div className="text-black dark:text-white text-base">
        <p>
          Currently, I am developing my fitness application maahes app, which I
          founded as a founder and front-end developer.
        </p>
        <hr className="my-5 opacity-25" />
        <p>
          I am passionate about many activities such as gaming(story-based
          games) 🎮, design ✨, coding ⌨️. this combination of my interests has
          led to my current role, which is front-end developer 🚀
        </p>
        <div className="flex space-x-10 mt-5">
        <Link
            href="https://twitter.com/ademcertell"
            target="_blank"
            className="rounded-md w-full p-4 border border-neutral-200 dark:border-neutral-800 hover:dark:bg-neutral-900 hover:bg-neutral-100 duration-300 ease-in-out overflow-x-hidden transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="ml-3">Twitter</div>
              <div>
                <svg
                  className="mr-2"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
          </Link>
          <Link
            href="https://github.com/ademcertell"
            target="_blank"
            className="rounded-md w-full p-4 border border-neutral-200 dark:border-neutral-800 hover:dark:bg-neutral-900 hover:bg-neutral-100 duration-300 ease-in-out overflow-x-hidden transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="ml-3">GitHub</div>
              <div>
                <svg
                  className="mr-2"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
          </Link>
          <Link
            href="https://steamcommunity.com/id/ademcertel"
            target="_blank"
            className="rounded-md w-full p-4 border border-neutral-200 dark:border-neutral-800 hover:dark:bg-neutral-900 hover:bg-neutral-100 duration-300 ease-in-out overflow-x-hidden transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="ml-3">Steam</div>
              <div>
                <svg
                  className="mr-2"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
