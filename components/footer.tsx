import Link from "next/link";

import { FOOTER_LINK, FOOTER_SOCIAL_MEDIA } from "@/config/links";

import NowPlaying from "./now-playing";

const Footer = () => {
  return (
    <footer className="mx-auto flex max-w-5xl flex-col px-3 pb-8">
      <div className="mt-28">
        <hr className="mb-8 opacity-75 dark:opacity-25" />
        <div className="grid grid-cols-2 sm:grid-cols-3">
          {FOOTER_LINK.map((list) => (
            <div
              key={list.id}
              className="mb-10 flex flex-col items-start gap-4 pr-4"
            >
              {list.links.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-[#888] hover:dark:text-white transition-colors duration-200"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          ))}
          <div className="mb-10 flex flex-col items-start gap-4 pr-4">
            {FOOTER_SOCIAL_MEDIA.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-[#888] hover:dark:text-white transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.title}
              </Link>
            ))}
          </div>
          <div className="mb-10 flex flex-col items-start gap-2">
            <div className="mb-3 flex items-center gap-4">
              <div className="my-1.5">
                <span className="text-black/50 dark:text-white/70">
                  This website is open source and you can access it from{" "}
                  <Link
                    href="https://github.com/ademcertell/homepage"
                    target="_blank"
                    className="underline underline-offset-2"
                  >
                    GitHub
                  </Link>
                </span>
              </div>
            </div>
            <div className="my-4">
              <span className="text-[#888] hover:dark:text-white transition-colors duration-200">
                <NowPlaying />
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
