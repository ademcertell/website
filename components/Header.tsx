"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NavMenu } from "./nav-menu";

const links = {
  "/": "Home",
  "/about": "About",
  "/post": "Blog",
};

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="flex flex-col sm:flex-row mt-5 md:mb-10 items-center">
      <nav id="nav" className={"items-center flex grow gap-3"}>
        {Object.entries(links).map(([path, text]) => {
          const active = path === pathname;
          return (
            <Link key={path} href={path}>
              <span
                className={`${
                  active
                    ? "text-black dark:text-white font-semibold underline decoration-sky-500 decoration-2                    "
                    : "dark:text-white text-black hover:underline"
                }`}
              >
                {text}
              </span>
            </Link>
          );
        })}
        <NavMenu />
      </nav>
      <div className="flex flex-row items-center justify-center sm:ml-4 space-x-4 mt-3">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;