import Container from "@/components/common/container";
import Social from "@/components/social";

export default function Home() {
  return (
    <Container
      size="large"
      className="prose prose-zinc dark:prose-invert 
      text-zinc-200 container animate-enter"
    >
      <div className="space-y-4">
        <p className="">
          Hi, I&apos;m Adem 👋
        </p>
        <p> As a self-taught frontend developer, I create independent projects and design web systems. I have experience in user interface design.</p>
        <p>Solving problems encountered in the web development process is a great passion of mine. I continuously research and improve myself to find the most efficient solutions.</p>
        <p>Additionally, I enjoy designing minimalist digital tools that make workflows more efficient. My goal is to maximize user experience and add value to projects.</p>
      </div>
      <div className="clas"></div>
      <Social />
    </Container>
  )
}