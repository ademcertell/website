import Hero from "@/components/hero";
import { metadata } from "@/lib/meta";

export async function generateMetadata({ params }: any) {
  return metadata;
}

export default async function HomePage() {
  return (
    <div>
      <Hero />
    </div>
  );
}