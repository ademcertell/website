import Container from "@/components/common/container";
import HomeBlogCards from "@/components/common/Notes/HomeNotesCards";
import NowPlayingText from "@/components/common/NowPlayingText";
import ReadingNow from "@/components/common/ReadingNow";
import NowPlaying from "@/components/NowPlaying";
import Social from "@/components/social";
import StickyNote from "@/components/ui/StickyNote";

export default function Home() {
  return (
    <Container size="large" className="text-foreground container animate-enter">
      <header className="mb-6">
        <h1 className="text-2xl md:text-2xl font-heading tracking-tight">
          Hi, I&apos;m Adem Can.
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
          I keep a small digital journal here—notes I&apos;m collecting, things
          I&apos;m designing, and games I&apos;m currently into.
        </p>
      </header>

      <StickyNote variant="pin" tone="yellow" className="mt-2">
        I&apos;m a UI/UX Designer focused on clear, humane interfaces. I like
        building small, useful tools and writing down what I learn. This site is
        where those trails meet.
      </StickyNote>

      <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <section className="mb-6">
        <h2 className="text-sm font-heading text-foreground/90 mb-3">
          Elsewhere
        </h2>
        <Social />
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-heading">Latest Notes</h2>
        </div>
        <HomeBlogCards />
      </section>

      <footer className="mt-10 text-xs text-muted-foreground">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <span>
            <ReadingNow />
          </span>
          <span>
            <NowPlayingText />
          </span>
          <NowPlaying />
        </div>
      </footer>
    </Container>
  );
}
