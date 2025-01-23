import { Analytics } from '@vercel/analytics/react';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Adem Can Certel",
    template: "%s - Adem Can Certel"
  },
  description: "Frontend developer",
  openGraph: {
    title: "Adem Can Certel",
    description: "Frontend developer",
    url: "https://ademcan.dev",
    siteName: "Adem Can Certel",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "logo.png",
        width: 1200,
        height: 630,
        alt: "Adem Can Certel",
      }
    ]
  },
  icons: {
    icon: "logo.png",
    apple: "logo.png",
  },
  twitter: {
    title: "Adem Can Certel",
    card: "summary_large_image",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#111010]`}
      >
        <main className="container max-w-4xl xl:max-w-6xl mx-auto mb-8 flex flex-col mt-8 px-6">
          <section className="flex-auto min-w-0 mt-6 flex flex-col px-4 md:px-6">
            <Header />

            {children}
          </section>
        </main>
        <Analytics mode={"production"} />;
      </body>
    </html>
  );
}