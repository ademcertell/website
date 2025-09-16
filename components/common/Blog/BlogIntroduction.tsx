"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function BlogIntroduction() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const collectHeadings = () => {
      const elements = Array.from(document.querySelectorAll("h2, h3"));
      const collected = elements
        .filter((el) => el.id && el.textContent) // boş id'leri filtrele
        .map((el) => ({
          id: el.id,
          text: el.textContent || "",
          level: Number(el.tagName.replace("H", "")),
        }));
      setHeadings(collected);
    };

    collectHeadings();

    // DOM değişirse tekrar çalışsın
    const observer = new MutationObserver(() => collectHeadings());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  if (!headings.length) return null;

  return (
    <>
      {/* Desktop TOC */}
      <aside className="hidden xl:block fixed right-12 top-28 w-64">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur">
          <ul className="space-y-2 text-sm">
            {headings.map((h, i) => (
              <li key={h.id || `heading-${i}`}>
                <a
                  href={`#${h.id}`}
                  className="block text-foreground/70 hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(h.id)?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Mobile Floating Button */}
      <button
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 text-sm text-white shadow-lg md:hidden"
        onClick={() => setIsOpen(true)}
      >
        Table of Contents
      </button>

      {/* Mobile Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/40 md:hidden">
          <div className="rounded-t-2xl bg-black/70 backdrop-blur-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold text-muted-foreground">
                Table of Contents
              </h2>
              <button
                className="text-xs text-white/70 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Close ✕
              </button>
            </div>
            <ul className="space-y-3">
              {headings.map((h, i) => (
                <li key={h.id || `heading-mobile-${i}`}>
                  <a
                    href={`#${h.id}`}
                    className="block text-white/80 hover:text-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(h.id)?.scrollIntoView({
                        behavior: "smooth",
                      });
                      setIsOpen(false);
                    }}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}