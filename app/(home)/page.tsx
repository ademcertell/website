import Image from "next/image";
import Link from "next/link";

import Container from "@/components/container";
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
    <div className="mb-6 flex items-center gap-4">
      <h2 className="text-[15px] uppercase tracking-[0.14em] text-foreground/70 font-medium">
        {children}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
    </div>
  );
}

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] supports-[backdrop-filter]:backdrop-blur-xl shadow-[0_10px_30px_-16px_rgba(0,0,0,0.6)]">
      {children}
    </div>
  );
}

function ProjectCard({ item }: { item: (typeof featured)[number] }) {
  return (
    <Link
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-2xl overflow-hidden"
    >
      <div className="relative w-full h-[350px]">
        <Image
          src={item.thumb}
          alt={item.title}
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <span className="uppercase text-xs tracking-[0.2em] text-white/70 mb-2">
          Project
        </span>
        <h3 className="text-xl font-semibold">{item.title}</h3>
        <p className="mt-1 text-sm text-white/80 line-clamp-2">
          {item.summary}
        </p>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <Container size="large" className="text-foreground container animate-enter">
      <header className="pt-4 mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        <div className="flex flex-col gap-6 self-start">
          <div>
            <h1 className="font-heading font-bold tracking-tight text-[36px] sm:text-[44px] md:text-[52px] leading-[1.1]">
              Adem.
            </h1>
            <p className="mt-4 text-[15px] text-muted-foreground/80 max-w-xl leading-relaxed">
              I keep a small digital journal here—notes I’m collecting, things
              I’m designing, and games I’m currently into.{" "}
              <Link
                href="/about"
                className="underline decoration-white/30 hover:decoration-white hover:text-foreground transition-colors"
              >
                More about me
              </Link>
              .
            </p>
          </div>
          <SocialLinks variant="cta" />
        </div>

        <div className="flex flex-col items-center gap-6 self-start">
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/ademcancertel.png"
              alt="Adem Can profile photo"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>
      </header>

      <section className="mb-20">
        <SectionTitle>Featured Projects</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {featured.map((item) => (
            <ProjectCard key={item.title} item={item} />
          ))}
          <Link
            href="/projects"
            className="md:col-span-2 flex justify-center text-neutral-400 hover:text-white cursor-pointer transition-colors"
          >
            See more projects
          </Link>
        </div>
      </section>

      <section className="mb-20">
        <SectionTitle>Latest Blog</SectionTitle>
        <HomeBlogCards />
      </section>
    </Container>
  );
}