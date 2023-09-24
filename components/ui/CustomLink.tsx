import React from "react";
import Link from "next/link";
import IconMap from "./IconMap";

interface CustomLinkProps {
  text: string;
  url: string;
  iconKey: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ text, url, iconKey }) => {
  const icon = IconMap[iconKey];

  return (
    <div className="flex felx-col gap-1">
      <Link
        href={url}
        passHref
        target="_blank"
        className="flex items-center justify-between gap-2 rounded-lg p-2 hover:dark:bg-zinc-800 hover:bg-indigo-50 transition-all"
      >
        <span className="inline-flex items-center gap-2 font-medium">
          {icon}
          {text}
        </span>
      </Link>
    </div>
  );
};

export default CustomLink;