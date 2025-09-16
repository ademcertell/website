import type { Metadata } from "next";
import Link from "next/link";

import Activity from "@/components/Activity/Activity";
import Container from "@/components/common/container";
import CompletedList from "@/components/common/CompletedList";
import ReviewTeasers from "@/components/common/ReviewTeasers";
import SectionHeader from "@/components/common/SectionHeader";

import MotionSection from "@/components/common/MotionSection";
import MotionHeader from "@/components/common/MotionHeader";

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
    <div className="relative">
      <Container
        size="large"
        className="text-foreground container relative z-10"
      >
        <MotionHeader>
          <SectionHeader title="Playlog" />
        </MotionHeader>
        <MotionSection delay={0.1}>
          <Activity />
        </MotionSection>
        <section className="mt-12">
          <MotionSection delay={0.2}>
            <CompactLabel>Recently Completed</CompactLabel>
            <CompletedList year="2025" limit={8} view="auto" />
          </MotionSection>
        </section>
        <section className="mt-12">
          <MotionSection delay={0.3}>
            <div className="flex items-center justify-between">
              <CompactLabel>Latest Reviews</CompactLabel>
            </div>
            <ReviewTeasers limit={4} />
            <Link
              href="/reviews"
              className="inline-block mt-3 text-sm font-medium text-primary transition-colors hover:text-highlight"
            >
              View all →
            </Link>
          </MotionSection>
        </section>
      </Container>
    </div>
  );
}