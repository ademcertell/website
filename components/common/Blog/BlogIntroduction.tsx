"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function BlogIntroduction() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const collectHeadings = () => {
      const elements = Array.from(
        document.querySelectorAll("h2, h3")
      ) as HTMLHeadingElement[];
      setHeadings(
        elements.map((el) => ({
          id: el.id,
          text: el.innerText,
          level: Number(el.tagName.replace("H", "")),
        }))
      );
    };

    collectHeadings();

    const observer = new MutationObserver(() => collectHeadings());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offsets = headings
        .map((h) => {
          const el = document.getElementById(h.id);
          return el ? { id: h.id, top: el.getBoundingClientRect().top } : null;
        })
        .filter(Boolean) as { id: string; top: number }[];

      const visible = offsets.find((o) => o.top >= 0 && o.top <= 200);
      setActiveId(visible ? visible.id : null);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block fixed top-32 right-10 w-64">
      <div className="border-l border-white/10 pl-5 space-y-2">
        <h4 className="text-xs tracking-wider text-muted-foreground mb-3">
          Introduction
        </h4>
        <ul className="space-y-2">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block text-sm transition-colors ${
                  activeId === h.id
                    ? "text-primary font-semibold border-l-2 border-primary pl-2"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(h.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}