import Link from "next/link";
import clsx from "clsx";

export type SocialItem = {
  href: string;
  label: string;
  primary?: boolean;
  external?: boolean;
};

type Props = {
  variant?: "cta" | "pill";
  items?: SocialItem[];
  align?: "start" | "center";
  className?: string;
};

export default function SocialLinks({
  variant = "cta",
  items,
  align = "start",
  className,
}: Props) {
  const defaults: SocialItem[] = [
    {
      href: "https://www.behance.net/ademcancertel",
      label: "View Full Portfolio",
      primary: true,
      external: true,
    },
    {
      href: "https://www.linkedin.com/in/ademcertel/",
      label: "LinkedIn",
      external: true,
    },
  ];

  const list = items ?? defaults;
  const isCTA = variant === "cta";

  return (
    <div className={clsx(isCTA ? "mt-1" : "", className)}>
      <div
        className={clsx(
          "flex flex-wrap md:flex-nowrap gap-3",
          align === "center"
            ? "justify-center items-center"
            : "justify-start items-center"
        )}
      >
        {list.map(({ href, label, primary, external }) => (
          <Link
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={clsx(
              "inline-flex items-center gap-2 rounded-full transition whitespace-nowrap",
              isCTA
                ? [
                    "px-4 py-2 min-h-[40px] text-[13px] sm:text-sm border border-white/10",
                    primary
                      ? "bg-white/5 text-foreground/90 hover:bg-white/10"
                      : "text-foreground/80 hover:bg-white/5",
                  ]
                : "px-3.5 py-1.5 text-sm border border-white/10 text-foreground/90 hover:bg-white/5"
            )}
          >
            <span>{label}</span>
            {isCTA && primary && (
              <span aria-hidden className="translate-y-[1px]">
                →
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}