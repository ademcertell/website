import { Metadata } from "next";

import RepositoryCard from "@/components/card/Repository";

export const metadata: Metadata = {
  title: "Repository",
  description: "All my open source repositories",
};

const Repository = () => {
  return (
    <header className="w-full m-1.5">
      <RepositoryCard />
    </header>
  );
};

export default Repository;