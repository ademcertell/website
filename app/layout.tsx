import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import "@upstash/claps/style.css";

import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

const title = "Adem Can Certel";
const description = "Frontend developer";
const url = "https://ademcan.dev";
const locale = "tr-TR";

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description: description,
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    locale,
    type: "website",
    images: [
      {
        url: "/favicon.png",
        alt: "Adem Can Certel",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: title,
    description,
    site: "@ademcertell",
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: "#d5d5d7",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: `/manifest.json`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <body className={inter.className}>
          <main>
            <Header />
            {children}
          </main>
          <Analytics />
        </body>
      </head>
    </html>
  );
}