"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { ThemeToggle } from "../theme-toggle";

interface NavItem {
  label: string;
  path: string;
}

const Header = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nav: NavItem[] = [
    { label: "Home", path: "/" },
    { label: "Posts", path: "/post" },
  ];

  return (
    <nav>
      <div className="flex flex-col justify-center">
        <nav className="flex items-center justify-between w-full mt-5 relative max-w-5xl py-5 text-zinc-900 dark:text-zinc-200">
          <div className="ml-[-0.10rem] space-x-4">
            {nav.map((navItem) => (
              <Link key={navItem.path} href={navItem.path}>
                <span className="p-1 md:px-3 sm:py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800/40 transition-all text-gray-900 dark:text-gray-200">
                  {navItem.label}
                </span>
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </nav>
      </div>
    </nav>
  );
};

export default Header;
