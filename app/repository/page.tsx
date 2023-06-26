import { Metadata } from "next";

import RepositoryCard from "@/components/card/Repository";

export const metadata: Metadata = {
  title: "Repository",
  description: "All my open source repositories",
};

const Repository = () => {
  return (
    <header className="m-1.5 space-y-6 md:my-20">
      <RepositoryCard />
    </header>
  );
};

export default Repository;