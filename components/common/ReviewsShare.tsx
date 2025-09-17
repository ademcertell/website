"use client";

import { usePathname } from "next/navigation";

export default function ShareButton({ title }: { title: string }) {
  const pathname = usePathname();
  const fullUrl = `https://ademcan.dev${pathname}`;

  // 🔥 Türkçe tweet metni
  const shareText = encodeURIComponent(
    `🎮 ${title} hakkında @ademcertel tarafından yazılmış incelemeyi okudum. 👀\n\n${fullUrl}`
  );

  return (
    <a
      href={`https://twitter.com/intent/tweet?text=${shareText}`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-10 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition-colors backdrop-blur"
    >
      Bu incelemeyi X'te paylaş
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 1227"
        fill="currentColor"
        className="h-4 w-4"
      >
        <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L368.444 0H0L468.305 681.821L0 1226.37H105.867L515.096 746.642L831.556 1226.37H1200L714.137 519.284H714.163ZM570.372 678.063L520.118 606.302L144.011 79.7104H313.546L608.261 501.96L658.514 573.721L1056.9 1146.66H887.36L570.372 678.063Z"/>
      </svg>
    </a>
  );
}