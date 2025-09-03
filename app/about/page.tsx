"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import Container from "@/components/common/container";
import SocialLinks from "@/components/social";

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

const photos = [
  { src: "/deniz.jpg", alt: "Bridge moment" },
  { src: "/bina.jpg", alt: "Architecture" },
  { src: "/cardak.jpg", alt: "Shelter" },
  { src: "/gok.jpg", alt: "Sky" },
];
function DraggablePhoto({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.6 });

  const baseRotate = [-6, -2, 2, 6][index % 4];

  return (
    <motion.div
      className="relative w-[220px] h-[300px] sm:w-[260px] sm:h-[340px] rounded-[22px] border border-white/10 overflow-hidden shadow-[0_18px_60px_-20px_rgba(0,0,0,0.6)] bg-white/5"
      style={{ x: springX, y: springY, rotate: baseRotate }}
      drag
      dragElastic={0.2}
      dragMomentum={false}
      whileTap={{ cursor: "grabbing", scale: 0.98 }}
      initial={{ y: 0, rotate: baseRotate, scale: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover select-none pointer-events-none"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
    </motion.div>
  );
}
export default function AboutPage() {
  const areaRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <Container size="large" className="container animate-enter text-foreground">
      <section className="mb-10 flex justify-center">
        <div
          ref={areaRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative w-full max-w-4xl h-[360px] sm:h-[400px] flex items-center justify-center"
        >
          <div className="relative">
            <div className="pointer-events-none absolute -inset-10" />
            <div className="relative flex items-center gap-4 sm:gap-6">
              {photos.map((p, i) => (
                <DraggablePhoto key={p.src} src={p.src} alt={p.alt} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mb-14">
        <SectionTitle>About</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-[0.5fr_1.5fr] gap-8">
          <div className="text-sm text-foreground/70"></div>
          <div className="space-y-5 text-[15px] leading-relaxed text-foreground/85">
            <p>
              I’m Adem Can Certel, a UI/UX and product designer focused on
              building clear, functional, human-centered experiences. For me,
              design always starts with one question: does this truly solve a
              problem and make life easier?
            </p>
            <p>
              I began with small personal projects that grew into structured
              product work—research, prototyping, and polished interfaces.
              Today, I work end-to-end, specializing in mobile and web products
              where clarity and usability are essential.
            </p>
            <p>
              Outside of design, I enjoy story-driven games and photography—both
              in real life and inside the game worlds. These keep my perspective
              fresh and my curiosity alive.
            </p>
            <p>
              In short, design for me is a way to keep learning, observing, and
              expressing ideas. If you’re curious about the games I’m currently
              playing or the ones I’ve completed this year, you can explore them
              on my{" "}
              <Link href="/playlog" className="underline hover:text-foreground">
                playlog
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
      <section className="mb-12">
        <SectionTitle>Elsewhere</SectionTitle>
        <SocialLinks
          variant="pill"
          align="start"
          items={[
            {
              href: "https://www.behance.net/ademcancertel",
              label: "Behance",
              external: true,
            },
            {
              href: "https://www.linkedin.com/in/ademcertel/",
              label: "LinkedIn",
              external: true,
            },
            {
              href: "https://www.instagram.com/ademcertel/",
              label: "Instagram",
              external: true,
            },
            { href: "mailto:ademcan.cert@gmail.com", label: "Email" },
          ]}
        />
      </section>
    </Container>
  );
}