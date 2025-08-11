import Link from "next/link";
import type { Metadata } from "next";
import Activity from "@/components/Activity/Activity";
import Container from "@/components/common/container";
import CompletedList from "@/components/CompletedList";
import ReviewTeasers from "@/components/ReviewTeasers";

export const metadata: Metadata = {
  title: "Playlog",
  description:
    "Current gaming activity, recently completed titles, and latest reviews.",
};

export default function PlaylogPage() {
  return (
    <Container size="large" className="text-foreground container animate-enter">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-heading text-foreground">
          Gaming Journal
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track my current gaming activity, completed titles, and latest
          reviews.
        </p>
      </header>

      <section className="mt-6">
        <Activity />
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-heading text-foreground mb-3">
          🏆 Recently Completed
        </h2>
        <CompletedList year="2025" limit={8} view="auto" />
      </section>

      <section className="mt-10">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-heading text-foreground">
            Latest Reviews
          </h2>
          <Link
            href="/reviews"
            className="text-sm text-primary hover:underline"
          >
            View All Reviews →
          </Link>
        </div>
        <ReviewTeasers limit={4} />
      </section>
    </Container>
  );
}
