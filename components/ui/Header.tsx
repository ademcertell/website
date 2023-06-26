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
    <nav className="fixed left-0 right-0 top-0 z-40 bg-white/80 shadow-md saturate-[1.8] backdrop-blur-[10px] dark:bg-[#19191b] dark:saturate-100">
        <nav className="flex items-center justify-between w-full mx-auto h-[60px] px-5 relative max-w-5xl">
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
    </nav>
  );
};

export default Header;
