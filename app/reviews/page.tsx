import type { Metadata } from "next";
import { getPostsByType } from "@/lib/getBlogPosts";
import Container from "@/components/common/container";
import ReviewsClient from "./reviews-client";

export const metadata: Metadata = {
  title: "Game Reviews",
  description: "Gaming activity, completed games, and detailed reviews.",
};

export default function ReviewsPage() {
  const reviews = getPostsByType("review");   // Server tarafında veri çekiyorum (fs burada çalışır)

  return (
    <Container size="large" className="text-foreground container animate-enter">
      <h2 className="text-[15px] uppercase tracking-[0.14em] text-foreground/70 font-medium">
        Game Reviews
      </h2>
      <div className="h-px bg-gradient-to-r from-white/15 to-transparent mt-2" />

      <ReviewsClient reviews={reviews} />
    </Container>
  );
}