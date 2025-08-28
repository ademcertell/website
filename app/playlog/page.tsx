import Link from "next/link";
import type { Metadata } from "next";
import Activity from "@/components/Activity/Activity";
import Container from "@/components/common/container";
import CompletedList from "@/components/common/CompletedList";
import ReviewTeasers from "@/components/common/ReviewTeasers";

export const metadata: Metadata = {
  title: "Playlog",
  description:
    "Current gaming activity, recently completed titles, and latest reviews.",
};

export default function PlaylogPage() {
  return (
    <Container size="large" className="text-foreground container animate-enter">
      {/* Page Header */}
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
          Gaming Journal
        </h1>
        <div className="mt-2 h-[2px] w-16 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        <p className="text-base text-muted-foreground mt-4 leading-relaxed max-w-2xl">
          Track my current gaming activity, completed titles, and latest
          reviews.
        </p>
      </header>

      {/* Current Activity */}
      <section className="mt-8">
        <Activity />
      </section>

      {/* Recently Completed */}
      <section className="mt-14">
        <h2 className="text-lg font-heading font-semibold flex items-center gap-3 mb-3">
          🏆 Recently Completed
          <span className="h-[2px] w-12 bg-gradient-to-r from-accent to-highlight rounded-full"></span>
        </h2>
        <CompletedList year="2025" limit={8} view="auto" />
      </section>

      {/* Latest Reviews */}
      <section className="mt-14">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold flex items-center gap-3">
            Latest Reviews
            <span className="h-[2px] w-12 bg-gradient-to-r from-primary to-accent rounded-full"></span>
          </h2>
          <Link
            href="/reviews"
            className="text-sm text-primary transition-colors hover:text-highlight"
          >
            View All Reviews →
          </Link>
        </div>
        <ReviewTeasers limit={4} />
      </section>
    </Container>
  );
}
