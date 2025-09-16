import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/container";
import HomeBlogCards from "@/components/common/Blog/HomeLatestCards";
import SocialLinks from "@/components/social";

const featured = [
  {
    title: "Habit Tracker App UI/UX",
    summary:
      "A clean and simple way to build habits with focus and consistency.",
    href: "https://www.behance.net/gallery/233745411/Habit-Tracker-App-UIUX-Design",
    thumb: "/projects-banner/habify-cover.jpg",
  },
  {
    title: "Camping Mobile App UI",
    summary: "Plan trips clearly, pack smart, and share easily.",
    href: "https://www.behance.net/gallery/233561175/Camping-Mobile-App-UI",
    thumb: "/projects-banner/camping-design.png",
  },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-4">
      <h2 className="text-[15px] uppercase tracking-[0.14em] text-foreground/70 font-medium">
        {children}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
    </div>
  );
}

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.02] supports-[backdrop-filter]:backdrop-blur-xl shadow-[0_10px_30px_-16px_rgba(0,0,0,0.55)] transition-transform">
      {children}
    </div>
  );
}

function ProjectCard({ item }: { item: (typeof featured)[number] }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <CardShell>
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-[28px]">
          <Image
            src={item.thumb}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1000px"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        </div>
        <div className="p-6">
          <h3 className="text-[18px] font-semibold tracking-tight text-foreground">
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-foreground/70 leading-relaxed max-w-prose">
            {item.summary}
          </p>
          <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground/90">
            <span>View</span>
            <span
              aria-hidden
              className="translate-y-[1px] transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </div>
        </div>
      </CardShell>
    </a>
  );
}

export default function Home() {
  return (
    <Container size="large" className="text-foreground container animate-enter">
      <header className="pt-2 mb-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        <div className="flex flex-col gap-6 self-start">
          <div>
            <h1 className="font-heading font-bold tracking-tight text-[32px] sm:text-[40px] md:text-[48px] leading-[1.08]">
              Adem.
            </h1>
            <p className="mt-3 text-[15px] text-muted-foreground/90 max-w-xl leading-relaxed">
              I keep a small digital journal here—notes I’m collecting, things
              I’m designing, and games I’m currently into.{" "}
              <Link href="/about" className="underline hover:text-foreground">
                More about me
              </Link>
              .
            </p>
          </div>
          {/* CTA */}
          <SocialLinks variant="cta" />
        </div>

        <div className="flex flex-col items-center gap-6 self-start">
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border border-white/10 shadow-xl">
            <Image
              src="/ademcancertel.png"
              alt="Adem Can profile photo"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </header>
      <section className="mb-16">
        <SectionTitle>Featured Projects</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {featured.map((item) => (
            <ProjectCard key={item.title} item={item} />
          ))}
          <a
            href="/projects"
            className="md:col-span-2 flex justify-center text-neutral-400 hover:text-white cursor-pointer"
          >
            See more projects
          </a>
        </div>
      </section>
      <section className="mb-16">
        <SectionTitle>Latest Blog & Review</SectionTitle>
        <HomeBlogCards />
      </section>
    </Container>
  );
}