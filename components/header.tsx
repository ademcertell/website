"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import { useMemo } from 'react';
import Container from './common/container';

const Header = () => {
  const pathname = usePathname();

  const NAV_ITEMS = useMemo(() => ({
    home: '/',
    blog: '/blog',
  }), []);

  return (
    <header>
      <Container size="large">
        <nav
          className="flex flex-col items-center md:items-start justify-start py-4 tracking-tight w-full sm:pr-0 md:pr-6 lg:pr-0"
          aria-label="navigation"
        >
          <div className="flex items-center justify-between w-full">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                priority={true}
              />
              <div className="flex flex-col ml-4">
                <span className="text-medium inline-block font-medium text-zinc-50">
                  Adem Can Certel
                </span>
                <span className="text-zinc-300">frontend developer</span>
              </div>
            </Link>
            <div className="flex items-center">
              {Object.entries(NAV_ITEMS).map(([name, href]) => (
                <Link
                  key={name}
                  href={href}
                  className={classNames(
                    pathname === href ? "font-semibold" : "font-normal",
                    "transition-all text-neutral-100 hover:text-neutral-200 flex align-middle relative py-1 px-2"
                  )}
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;