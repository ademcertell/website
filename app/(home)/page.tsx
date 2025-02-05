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
        <p>As a Junior UI/UX Designer, my focus is on crafting intuitive and visually engaging user experiences. I believe design is more than just aesthetics—it&apos;s a problem-solving process centered around user needs.</p>
        <hr className="border-0 border-b border-zinc-300 opacity-40" />
        <p>By prioritizing usability, I create interfaces that balance functionality and aesthetics, ensuring seamless digital interactions. I am continuously learning, leveraging user feedback to refine processes, and enhancing digital accessibility.</p>
        <p>Beyond design, I develop small-scale frontend projects to make everyday digital experiences more meaningful. I enjoy building practical and minimalist tools that streamline workflows and improve efficiency.</p>
        </div>
      <Social />
    </Container>
  )
}