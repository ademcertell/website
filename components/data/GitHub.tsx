"use client";

import { useEffect, useState } from "react";

import { FaGithub } from "react-icons/fa";

interface GitHubDataProps {
  username: string;
}

const GitHubData: React.FC<GitHubDataProps> = ({ username }) => {
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [starsCount, setStarsCount] = useState<number>(0);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/followers`
        );
        const data = await response.json();
        setFollowerCount(data.length);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchStars = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/starred`
        );
        const data = await response.json();
        setStarsCount(data.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFollowers();
    fetchStars();
  }, [username]);

  return (
    <section className="relative rounded-full transform-none overflow-hidden dark:bg-dark_card bg-light_card">
      <div className="w-80 p-5">
        <div className="flex items-center gap-3">
          <FaGithub className="inline-block mr-2" size={35} />
          <span>
            Followers: <strong className="text-lg">{followerCount}</strong>
          </span>
          <span className="font-bold text-xl">/</span>
          <span>
            Stars: <strong className="text-lg">{starsCount}</strong>
          </span>
        </div>
      </div>
    </section>
  );
};

export default GitHubData;
