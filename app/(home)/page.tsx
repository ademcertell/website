import Container from "@/components/common/container";
import HomeBlogCards from "@/components/common/HomeBlogCards";
import Social from "@/components/social";

export default function Home() {
  return (
    <Container size="large" className="text-foreground container animate-enter">
      <div className="space-y-4 mb-5">Hi, I&apos;m Adem Can.</div>
      <div className="space-y-8 text-muted-foreground">
        <p>
          I am a UI/UX Designer who focuses on creating intuitive and visually
          appealing mobile designs using Figma. I believe that design is not
          only about aesthetics but also about solving problems based on user
          needs.
        </p>

        <hr className="border-0 border-b border-muted opacity-40" />

        <p>
          I always prioritize usability and build interfaces that combine
          functionality and clean visual style to ensure smooth digital
          experiences. I constantly improve my skills by learning,
          experimenting, and listening to user feedback to refine my design
          approach and improve digital accessibility.
        </p>

        <p>
          I also work as a freelance frontend developer, creating small-scale
          projects that help people with practical and minimalist tools. In
          addition, I enjoy writing game reviews in my spare time. I see myself
          as a Web Designer who combines design and development to make daily
          digital life more efficient and meaningful.
        </p>
      </div>

      <Social />

      <HomeBlogCards />
    </Container>
  );
}