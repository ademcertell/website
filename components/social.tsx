import Link from "next/link";

const socials = [
  {
    name: "Behance",
    href: "https://www.behance.net/ademcancertel",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@ademcancertel",
  },
  {
    name: "GitHub",
    href: "https://github.com/ademcertell",
  },
];

export default function Social() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 mt-6 btn-neon">
      {socials.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between w-full sm:w-auto px-5 py-3 rounded-xl border border-white/10 bg-card/60 hover:border-white/20 hover:bg-card transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <span className="text-foreground font-medium">{social.name}</span>
          <svg
            className="size-4 text-muted-foreground group-hover:text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17 17 7M9 7h8v8"
            />
          </svg>
        </Link>
      ))}
    </div>
  );
}
