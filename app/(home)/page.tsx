import Container from "@/components/common/container";
import HomeBlogCards from "@/components/common/Notes/HomeNotesCards";
import NowPlayingText from "@/components/common/NowPlayingText";
import ReadingNow from "@/components/common/ReadingNow";
import Social from "@/components/social";
import StickyNote from "@/components/ui/StickyNote";

export default function Home() {
  return (
    <Container size="large" className="text-foreground container animate-enter">
      {/* Hero Section */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
          Hi, I&apos;m Adem Can.
        </h1>
        <div className="mt-2 h-[2px] w-16 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        <p className="text-base text-muted-foreground mt-4 max-w-2xl leading-relaxed">
          I keep a small digital journal here—notes I&apos;m collecting, things
          I&apos;m designing, and games I&apos;m currently into.
        </p>
      </header>

      {/* Sticky Note */}
      <StickyNote variant="pin" tone="yellow" className="mt-6">
        I&apos;m a UI/UX Designer focused on clear, humane interfaces. I like
        building small, useful tools and writing down what I learn. This site is
        where those trails meet.
      </StickyNote>

      {/* Divider */}
      <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Elsewhere Section */}
      <section className="mb-10">
        <h2 className="text-sm font-heading text-foreground/90 mb-3 flex items-center gap-3">
          Elsewhere
          <span className="h-[2px] w-10 bg-gradient-to-r from-accent to-highlight rounded-full"></span>
        </h2>
        <Social />
      </section>

      {/* Latest Notes Section */}
      <section className="mt-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold flex items-center gap-3">
            Latest Notes
            <span className="h-[2px] w-12 bg-gradient-to-r from-primary to-accent rounded-full"></span>
          </h2>
        </div>
        <HomeBlogCards />
      </section>

      {/* Footer */}
      <footer className="mt-14 text-xs text-muted-foreground">
        <div className="gap-x-4 gap-y-1">
          <span>
            <ReadingNow />
          </span>
          <br />
          <span>
            <NowPlayingText />
          </span>
        </div>
      </footer>
    </Container>
  );
}
