import Container from "@/components/common/container";
import SectionHeader from "@/components/common/SectionHeader";
import PhotosGrid from "@/components/common/PhotosGrid";

export const metadata = {
  title: "Photos",
  description: "Memories from real life and the gaming worlds.",
};

export default function PhotosPage() {
  return (
    <Container size="large" className="container animate-enter">
      <SectionHeader title="Photos" />
      <PhotosGrid />
    </Container>
  );
}