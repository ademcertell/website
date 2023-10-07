import { Metadata } from "next";

import { allPosts, Post } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import PostCard from "./PostsCard";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "He jots down information, notes, figma designs, tips, tips on his blog page to show the knowledge he has gained from experience and what he wants to tell.",
};

// Sort posts by date in descending order
function getData() {
  const posts: Post[] = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  return posts.map((post: Post) => post);
}

const Lists = () => {
  const posts: Post[] = getData();

  return (
    <div>
      {posts.map((post: Post) => (
        <PostCard key={post._id} data={post} />
      ))}
    </div>
  );
};

export default Lists;