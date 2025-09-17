"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";

import Container from "@/components/common/container";
import SocialLinks from "@/components/social";

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

const photos = [
  { src: "/sea.jpg", alt: "Bridge moment" },
  { src: "/adem.PNG", alt: "Portrait" },
  { src: "/arbor.jpg", alt: "Shelter" },
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

  const baseRotate = [-5, 0, 5][index % 3];

  return (
    <motion.div
      className="relative w-[220px] h-[300px] sm:w-[260px] sm:h-[340px] rounded-[22px] border border-white/10 overflow-hidden shadow-[0_18px_50px_-20px_rgba(0,0,0,0.65)] bg-white/5 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out"
      style={{ x: springX, y: springY, rotate: baseRotate }}
      drag
      dragElastic={0.18}
      dragMomentum={false}
      whileTap={{ cursor: "grabbing", scale: 0.97 }}
      whileHover={{ scale: 1.03 }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover select-none pointer-events-none brightness-[1.05] contrast-[1.05]"
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
      <section className="mb-16 flex justify-center">
        <div
          ref={areaRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative w-full max-w-4xl h-[380px] sm:h-[420px] flex items-center justify-center"
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

      <section className="mb-16">
        <SectionTitle>About</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-[0.4fr_1.6fr] gap-10">
          <div className="text-sm text-foreground/70"></div>
          <div className="space-y-6 text-[15px] leading-[1.75] text-foreground/80 max-w-prose">
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
              expressing ideas.
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