"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import Container from "./common/container";

export default function Header() {
  const pathname = usePathname();

  const NAV_ITEMS = useMemo(
    () => ({
      home: "/",
      blog: "/blog",
      playlog: "/playlog",
      photos: "/photos",
    }),
    []
  );

  const isActive = (href: string) => pathname === href;

  return (
    <header>
      <Container size="large">
        <nav
          aria-label="navigation"
          className="flex flex-col items-center md:items-start justify-start py-4 tracking-tight w-full sm:pr-0 md:pr-6 lg:pr-0"
        >
          <div className="flex items-center justify-between w-full gap-3">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={45}
                height={45}
                priority
              />
              <div className="flex flex-col ml-4">
                <span className="text-medium inline-block font-medium text-zinc-50">
                  Adem Can Certel
                </span>
                <span className="text-zinc-300">Designer</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center">
              {Object.entries(NAV_ITEMS).map(([name, href]) => (
                <Link
                  key={name}
                  href={href}
                  className={classNames(
                    isActive(href) ? "font-semibold" : "font-normal",
                    "transition-all text-neutral-100 hover:text-neutral-200 flex align-middle relative py-1 px-2"
                  )}
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-3 flex w-full justify-center gap-2 md:hidden flex-wrap">
            {Object.entries(NAV_ITEMS).map(([name, href]) => (
              <Link
                key={name}
                href={href}
                className={classNames(
                  isActive(href) ? "font-semibold" : "font-normal",
                  "transition-all text-neutral-100 hover:text-neutral-200 py-1 px-2"
                )}
              >
                {name}
              </Link>
            ))}
          </div>
        </nav>
      </Container>
    </header>
  );
}