"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Photos() {
  const [userImages, setUserImages] = useState<any[]>([]);

  useEffect(() => {
    async function fetchUserImages() {
      try {
        const response = await fetch("/api/unsplash");
        if (!response.ok) {
          throw new Error(
            `Unsplash API isteği basarisiz: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        setUserImages(data);
      } catch (error) {
        console.error("Hata:", error);
      }
    }

    fetchUserImages();
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 md:gap-y-20 lg:grid-cols-4 mx-auto mt-10">
      {userImages.map((item: any) => (
        <figure key={item.id}>
          <Link
            href={`${item.links.html}`}
            target="_blank"
            className="block overflow-hidden rounded-lg"
          >
            <Image
              src={item.urls.regular}
              alt={item.description}
              width={300}
              height={378}
            />
          </Link>
        </figure>
      ))}
    </div>
  );
}