import Container from "@/components/container";
import SectionHeader from "@/components/common/SectionHeader";
import PhotosGrid from "@/components/common/PhotosGrid";

export default function PhotosPage() {
  return (
    <Container size="large" className="container animate-enter">
      <SectionHeader title="Photos" />
      <PhotosGrid />
    </Container>
  );
}