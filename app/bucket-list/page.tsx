"use client";

import { useState, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Container from "@/components/common/container";

export default function BucketListPage() {
  const [preview, setPreview] = useState<{
    src: string;
    x: number;
    y: number;
  } | null>(null);

  const bucketItems = [
    {
      title: "Go on a Solo Road Trip",
      desc: "I went on my first long solo road trip in June 2025.",
      done: true,
      images: ["/road.JPEG", "/meadow.JPEG"],
    },
    {
      title: "Create My Own Design Brand",
      desc: "I will build a personal brand where I share my UI/UX projects, digital posters, and creative work under a consistent identity.",
      done: false,
      images: [],
    },
    {
      title: "Attend a Motorsport Event",
      desc: "",
      done: false,
      images: [],
    },
    {
      title: "Go Paragliding",
      desc: "I want to go paragliding and feel the freedom of flying.",
      done: false,
      images: [],
    },
    {
      title: "Learn Horse Riding",
      desc: "I want to learn how to ride a horse and be able to ride on my own",
      done: false,
      images: [],
    },
    {
      title: "Buy My Own House",
      desc: "I want to buy my own house and design a space that reflects my style.",
      done: false,
      images: [],
    },
  ];

  const completedCount = bucketItems.filter((item) => item.done).length;

  return (
    <Container
      size="large"
      className="container animate-enter text-foreground relative"
    >
      {preview && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{
            top: preview.y - 240,
            left: preview.x - 112,
          }}
        >
          <div className="relative w-56 h-56 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black animate-[fadeIn_0.2s_ease-out]">
            <Image
              src={preview.src}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
      <div className="mb-8">
        <h2 className="text-[15px] uppercase tracking-[0.14em] text-foreground/70 font-medium">
          Bucket List
        </h2>
        <div className="h-px bg-gradient-to-r from-white/15 to-transparent mt-2" />
      </div>
      {bucketItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-white/70 text-lg font-medium">
            I haven't created my bucket list yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {bucketItems.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between gap-3 rounded-xl py-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className={`h-5 w-5 mt-1 ${
                      item.done ? "text-green-400" : "text-white/30"
                    }`}
                  />
                  <div>
                    <h3
                      className={`text-base font-medium ${
                        item.done ? "text-white/50 line-through" : "text-white"
                      }`}
                    >
                      {item.title}
                    </h3>
                    {item.desc && (
                      <p className="text-white/60 text-xs font-normal leading-relaxed">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </div>
                {item.images.length > 0 && (
                  <div className="flex items-center group">
                    {item.images.map((src, i) => (
                      <HoverableImage
                        key={i}
                        src={src}
                        setPreview={setPreview}
                        index={i}
                      />
                    ))}
                  </div>
                )}
              </div>
              {index < bucketItems.length - 1 && (
                <hr className="border-t border-white/5 mx-4" />
              )}
            </div>
          ))}
          <div className="pt-6 text-right">
            <p className="text-sm italic text-white/50">
              {completedCount} out of {bucketItems.length} completed.
            </p>
          </div>
        </div>
      )}
    </Container>
  );
}
function HoverableImage({
  src,
  setPreview,
  index,
}: {
  src: string;
  setPreview: (value: { src: string; x: number; y: number } | null) => void;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPreview({
        src,
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    }
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={() => setPreview(null)}
      className={`relative h-12 w-12 overflow-hidden rounded-md transition-all duration-300 ease-out 
        ${index > 0 ? "-ml-6 group-hover:ml-2" : ""}`}
    >
      <Image
        src={src}
        alt="thumbnail"
        fill
        className="object-cover rounded-md transition-transform duration-300 ease-out group-hover:scale-110"
      />
    </div>
  );
}