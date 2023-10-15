"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "./theme-toggle";

const links = {
  "/": "Home",
  "/about": "About",
  "/post": "Blog",
  "/photos": "Photos",
};

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="flex flex-col sm:flex-row mt-5 md:mb-10 items-center">
      <nav
        id="nav"
        className={
          "font-medium text-medium items-center flex grow gap-3"
        }
      >
        {Object.entries(links).map(([path, text]) => {
          const active = path === pathname;
          return (
            <Link key={path} href={path}>
              <span
                className={`${
                  active
                    ? "dark:text-white text-black font-bold"
                    : "dark:text-white text-black"
                }`}
              >
                {text}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="flex flex-row items-center justify-center sm:ml-4 space-x-4 mt-3">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;