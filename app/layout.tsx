import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google"; // Space Grotesk import
import LayoutShell from "@/components/common/LayoutShell";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: { default: "Adem Can Certel", template: "%s - Adem Can Certel" },
  description: "UI/UX Designer",
  openGraph: {
    title: "Adem Can Certel",
    description: "UI/UX Designer",
    url: "https://ademcan.dev",
    siteName: "Adem Can Certel",
    locale: "en_US",
    type: "website",
    images: [
      { url: "ademcancertel.png", width: 1200, height: 630, alt: "Adem Can Certel" },
    ],
  },
  icons: { icon: "ademcancertel.png", apple: "ademcancertel.png" },
  twitter: { title: "Adem Can Certel", card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} bg-background text-foreground font-sans`}
      >
        <LayoutShell>{children}</LayoutShell>
        <Analytics mode="production" />
      </body>
    </html>
  );
}
