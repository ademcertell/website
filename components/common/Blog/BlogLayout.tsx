"use client";

import React from "react";

interface BlogLayoutProps {
  children: React.ReactNode;
  toc?: React.ReactNode;
}

export default function BlogLayout({ children, toc }: BlogLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 items-start">
        <div className="max-w-3xl">{children}</div>
        {toc && (
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                On this page
              </p>
              <ul className="space-y-2 text-sm">{toc}</ul>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}