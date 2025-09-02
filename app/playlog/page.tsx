import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/common/container";
import Activity from "@/components/Activity/Activity";
import CompletedList from "@/components/common/CompletedList";
import ReviewTeasers from "@/components/common/ReviewTeasers";
import SectionHeader from "@/components/common/SectionHeader";

export const metadata: Metadata = {
  title: "Playlog",
  description:
    "Current gaming activity, recently completed titles, and latest reviews.",
};

function CompactLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <h2 className="text-[15px] uppercase tracking-[0.14em] text-foreground/70 font-medium">
        {children}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-r from-foreground/30 to-transparent" />
    </div>
  );
}

export default function PlaylogPage() {
  return (
    <Container size="large" className="text-foreground container animate-enter">
      <SectionHeader title="Playlog" />

      <section className="mt-2">
        <Activity />
      </section>

      <section className="mt-12">
        <CompactLabel>Recently Completed</CompactLabel>
        <CompletedList year="2025" limit={8} view="auto" />
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <CompactLabel>Latest Reviews</CompactLabel>
          <Link
            href="/reviews"
            className="text-sm text-primary transition-colors hover:text-highlight"
          >
            View all →
          </Link>
        </div>
        <ReviewTeasers limit={4} />
      </section>
    </Container>
  );
}