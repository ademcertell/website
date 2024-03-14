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
      <h1 className="text-2xl font-semibold mb-6">Blog</h1>
      <p className="mb-6">
        She jots down information, notes, tips and tricks on her blog to show
        what she has learnt from her experiences and what she wants to tell.
      </p>
      <div className="mt-4">
        <Lists />
      </div>
    </header>
  );
};

export default BlogPage;