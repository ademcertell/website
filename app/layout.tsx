import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import Header from "@/components/ui/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Adem Can Certel",
    template: "%s | Adem Can Certel",
  },
  description: "Front-end developer, designer.",
  openGraph: {
    title: "Adem Can Certel",
    description: "Front-end developer, designer.",
    url: "https://ademcan.dev",
    siteName: "Adem Can Certel",
    images: [
      {
        url: "/avatar.png",
        alt: "Adem Can Certel",
      },
    ],
    locale: "tr-TR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    title: "Adem Can Certel",
    site: "@ademcertell",
    card: "summary",
  },
  themeColor: "#c5ebfc",
  icons: {
    icon: "/avatar.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <main>
            <Header />
            {children}
          </main>
          <Analytics />
        </body>
    </html>
  );
}
