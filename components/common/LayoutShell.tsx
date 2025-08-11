"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/header";

export default function LayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isReviewPage = pathname?.startsWith("/reviews/");

  return (
    <main className="container max-w-4xl xl:max-w-6xl mx-auto mb-8 flex flex-col mt-8 px-6">
      <section className="flex-auto min-w-0 mt-6 flex flex-col px-4 md:px-6">
        {!isReviewPage && <Header />}
        {children}
      </section>
    </main>
  );
}
