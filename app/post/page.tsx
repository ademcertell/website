import { Metadata } from "next";

import Lists from "@/components/card/Posts/Lists";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "He jots down information, notes, figma designs, tips, tips on his blog page to show the knowledge he has gained from experience and what he wants to tell.",
};

const BlogPage = () => {
  return (
    <header>
      <h1 className="text-2xl font-semibold">Blog</h1>
      <div className="mt-4">
        <Lists />
      </div>
    </header>
  );
};

export default BlogPage;