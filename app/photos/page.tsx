import Container from "@/components/common/container";
import PhotosGrid from "@/components/common/PhotosGrid";

export const metadata = {
  title: "Photos",
  description: "My photo stream from Unsplash.",
};

export default function PhotosPage() {
  return (
    <Container size="large" className="container animate-enter">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
          Photos
        </h1>
        <div className="mt-2 h-[2px] w-16 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        <p className="text-base text-muted-foreground mt-4 leading-relaxed">
          Memories from real life and the gaming worlds. 🌍🎮✨
        </p>
      </header>

      <PhotosGrid />
    </Container>
  );
}
