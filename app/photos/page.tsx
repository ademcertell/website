import { Metadata } from "next";

import Unsplash from "@/components/unsplash";

export const metadata: Metadata = {
  title: "Photos",
  description: "Photos I took.",
};

export default function Photos() {
  return (
    <>
      <header>
        <h1 className="text-black dark:text-white text-2xl font-semibold">
          Photos
        </h1>
        <p className="text-black dark:text-white">
          The page where I keep my photos as a memory.
        </p>
      </header>
      <section>
        <Unsplash />
      </section>
    </>
  );
}