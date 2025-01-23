import Container from "@/components/common/container";
import Social from "@/components/social";

export default function Home() {
  return (
    <Container
      size="large"
      className="text-zinc-200 container animate-enter"
    >
      <div className="space-y-4 mb-5">
        <p>
          Hi, I&apos;m Adem Can.
        </p>
      </div>
        <div className="space-y-8">
        <p>Currently studying in the Graphic Design department, my true passion and expertise lie in frontend development. Although graphic design wasn&apos;t my initial choice, it has provided me with valuable insights into visual design and user interfaces. Over time, I self-taught frontend development and started creating user-centered web applications that combine aesthetics and functionality.</p>
        <hr className="border-0 border-b border-zinc-300 opacity-40" />
        <p>I'm passionate about creating minimalist and functional designs. By combining <strong>UI/UX</strong> design with frontend development, I focus on building intuitive interfaces that prioritize user experience, making them both visually appealing and effective.</p>
        <p>Outside of web development, I love playing story-driven games. Writing reviews after finishing a game has become a hobby.</p>
        </div>
      <Social />
    </Container>
  )
}