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
    () => [
      { name: "home", href: "/" },
      { name: "about", href: "/about" },
      { name: "blog", href: "/blog" },
      { name: "photos", href: "/photos" },
    ],
    []
  );

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header>
      <Container size="large">
        <nav
          aria-label="primary"
          className="flex flex-col items-center md:items-start py-4 tracking-tight w-full"
        >
          <div className="flex items-center justify-between w-full gap-3">
            <Link
              href="/"
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-full"
            >
              <Image
                src="/ademcancertel.png"
                alt="Adem Can Certel"
                width={44}
                height={44}
                className="rounded-full border border-white/10"
                priority
              />
              <div className="flex flex-col ml-3 leading-tight">
                <span className="text-[15px] font-medium text-foreground">
                  Adem Can Certel
                </span>
                <span className="text-[15px] text-foreground/70">
                  UI/UX Designer
                </span>
              </div>
            </Link>
            <div className="hidden md:flex items-center">
              {NAV_ITEMS.map(({ name, href }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={name}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={classNames(
                      "relative mx-1 px-3 py-1.5 rounded-full transition-colors",
                      "text-foreground/90 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                      active
                        ? "bg-white/10 text-foreground"
                        : "hover:bg-white/5"
                    )}
                  >
                    {name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="mt-3 flex w-full justify-center gap-1.5 md:hidden flex-wrap">
            {NAV_ITEMS.map(({ name, href }) => {
              const active = isActive(href);
              return (
                <Link
                  key={name}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={classNames(
                    "px-3 py-1.5 rounded-full text-sm transition-colors",
                    "text-foreground/90 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                    active ? "bg-white/10 text-foreground" : "hover:bg-white/5"
                  )}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      </Container>
    </header>
  );
}