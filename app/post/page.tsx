import { Metadata } from "next";

import Lists from "@/components/card/Posts/Lists";

export const metadata: Metadata = {
  title: "Blog",
  description: "Sonra",
};

const BlogPage = () => {
  return (
    <header className="w-full m-1.5">
      <h1 className="text-black dark:text-white text-3xl">Blog</h1>
      <div className="mt-5">
        <Lists />
      </div>
    </header>
  );
};

export default BlogPage;
