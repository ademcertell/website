import Container from "@/components/common/container";
import PhotosGrid from "@/components/common/PhotosGrid";

export const metadata = {
  title: "Photos",
  description: "My photo stream from Unsplash.",
};

export default function PhotosPage() {
  return (
    <Container size="large" className="container animate-enter">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-heading text-foreground">
          Photos
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Memories from real life and the gaming worlds. 🌍🎮✨
        </p>
      </header>
      <div className="my-4 select-none text-muted-foreground/70">———</div>
      <PhotosGrid />
    </Container>
  );
}
