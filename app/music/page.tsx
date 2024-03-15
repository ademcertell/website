import { Metadata } from "next";

import TopAblums from "@/components/mores/top-albums";
import LatestSong from "@/components/mores/latest-song";

export const metadata: Metadata = {
  title: "Music",
  description:
    "I have always loved music, whether it is a happy or sad day, there is always a song that accompanies me.",
};

const AboutPage = () => {
  return (
    <section>
      <div className="pb-10">
        <h1 className="text-2xl font-semibold mb-6">Music</h1>
        <p>
          I have always loved music, whether it is a happy or sad day, there is
          always a song that accompanies me.
        </p>
      </div>
      <LatestSong />
    </section>
  );
};

export default AboutPage;