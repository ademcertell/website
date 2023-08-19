import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from 'next/script'

import "./globals.css";
import "@upstash/claps/style.css";

import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

const title = "Adem Can Certel";
const description = "Front-end developer and designer.";
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
        url: "/avatar.png",
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
    icon: "/avatar.png",
    apple: "/avatar.png",
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
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </head>
    </html>
  );
}
