"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import Container from "./common/container";
import { ChevronDown, Bookmark, Gamepad2, Camera } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [panelOpen, setPanelOpen] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleDesktopRef = useRef<HTMLButtonElement | null>(null);
  const toggleMobileRef = useRef<HTMLButtonElement | null>(null);

  const NAV_ITEMS = useMemo(
    () => [
      { name: "home", href: "/" },
      { name: "about", href: "/about" },
      { name: "blog", href: "/blog" },
      { name: "projects", href: "/projects" },
    ],
    []
  );

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  useEffect(() => setPanelOpen(false), [pathname]);

  useEffect(() => {
    if (!panelOpen) return;

    const handlePointer = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      const inside = panelRef.current?.contains(t);
      const onDesktopToggle = toggleDesktopRef.current?.contains(t);
      const onMobileToggle = toggleMobileRef.current?.contains(t);
      if (!inside && !onDesktopToggle && !onMobileToggle) setPanelOpen(false);
    };
    const handleKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setPanelOpen(false);

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("touchstart", handlePointer, { passive: true });
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("touchstart", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [panelOpen]);
  return (
    <header className="relative z-50">
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
              <button
                ref={toggleDesktopRef}
                onClick={() => setPanelOpen((s) => !s)}
                className="mx-1 px-3 py-1.5 rounded-full text-foreground/90 hover:text-foreground hover:bg-white/5 flex items-center gap-1"
                aria-expanded={panelOpen}
                aria-controls="quick-panel"
              >
                More{" "}
                <ChevronDown
                  className={classNames(
                    "h-4 w-4 transition-transform",
                    panelOpen && "rotate-180"
                  )}
                />
              </button>
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
            <button
              ref={toggleMobileRef}
              onClick={() => setPanelOpen((s) => !s)}
              className="px-3 py-1.5 rounded-full text-sm text-foreground/90 hover:text-foreground hover:bg-white/5 flex items-center gap-1"
              aria-expanded={panelOpen}
              aria-controls="quick-panel"
            >
              More{" "}
              <ChevronDown
                className={classNames(
                  "h-4 w-4 transition-transform",
                  panelOpen && "rotate-180"
                )}
              />
            </button>
          </div>
        </nav>
      </Container>
      <AnimatePresence>
        {panelOpen && (
          <div className="absolute inset-x-0 top-full mt-2">
            <motion.div
              ref={panelRef}
              id="quick-panel"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mx-auto max-w-4xl px-4"
            >
              <div className="rounded-2xl bg-neutral-900 p-4 shadow-xl">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <QuickCard
                    href="/playlog"
                    title="Playlog"
                    desc="A journal of the games I’m playing and finishing."
                    image="/Playlog.JPEG"
                    icon={<Gamepad2 className="h-4 w-4" />}
                  />
                  <QuickCard
                    href="/bucket-list"
                    title="Bucket List"
                    desc="Things to do at least once in life"
                    image="/bucket-list.avif"
                    icon={<Bookmark className="h-4 w-4" />}
                  />
                  <div className="flex flex-col gap-4">
                    <TextCard
                      href="/photos"
                      title="Photos"
                      desc="Moments from nature and city life"
                      icon={<Camera className="h-4 w-4" />}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
function QuickCard({
  href,
  title,
  desc,
  image,
  icon,
}: {
  href: string;
  title: string;
  desc: string;
  image: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative overflow-hidden rounded-xl bg-white/5 hover:bg-white/[0.08] transition-colors"
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover opacity-60"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>
      <div className="relative p-6 h-48 flex items-end">
        <div>
          <div className="flex items-center gap-2 mb-1">{icon}</div>
          <h3 className="text-white text-xl font-medium">{title}</h3>
          <p className="text-white/80 text-base">{desc}</p>
        </div>
      </div>
    </Link>
  );
}
function TextCard({
  href,
  title,
  desc,
  icon,
}: {
  href: string;
  title: string;
  desc: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl bg-white/5 hover:bg-white/[0.08] transition-colors px-4 py-3"
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
            {icon}
          </div>
        )}
        <div>
          <h4 className="text-white text-base font-medium">{title}</h4>
          <p className="text-white/70 text-sm">{desc}</p>
        </div>
      </div>
    </Link>
  );
}