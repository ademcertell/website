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
    url: "ademcan.dev",
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
        className={`{inter.className} bg-[#111010] `}
      >
        <main className="lg:max-w-2xl md:max-w-full mx-4 mb-4 flex flex-col md:flex-row mt-2 sm:mt-8 lg:mx-auto">
          <section className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
            <Header />

            {children}
          </section>
        </main>
      </body>
    </html>
  );
}