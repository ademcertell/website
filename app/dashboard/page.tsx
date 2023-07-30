import { Metadata } from "next";

import React from "react";

import Games from "@/components/activites";
import NowPlaying from "@/components/now-playing";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Personal activity dashboard created using the Next.js API ways",
};

const Dashboard = () => {
  return (
    <section className="space-y-6 md:my-20 m-1.5 mt-20">
      <>
        <h1 className="text-black dark:text-white text-3xl font-semibold">Dashboard</h1>
        <p className="text-black dark:text-white">
          This control panel shows my Steam activity and my spotify activity.
        </p>
        <div className="mb-4 mt-5 grid gap-4 sm:grid-cols-2">
          <div className="h-full">
            <div className="text-slate-500 dark:text-white/70 text-lg line-clamp-2 mb-2.5">
              Steam Activite
            </div>
           <hr className="w-full opacity-5 my-1.5" />
            <div className="text-black dark:text-white items-center truncate space-x-1">
              <div className="mt-1.5">
                <Games />
              </div>
            </div>
          </div>
          <div className="h-full">
            <div className="text-slate-500 dark:text-white/70 text-lg line-clamp-2 mb-2.5">
              Spotify Now Playing
            </div>
            <hr className="w-full opacity-5 my-1.5" />
            <div className="text-black dark:text-white items-center truncate space-x-1">
              <div className="mt-1.5">
                <NowPlaying />
              </div>
            </div>
          </div>
        </div>
      </>
    </section>
  );
};

export default Dashboard;
