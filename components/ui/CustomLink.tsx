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
    <div className="my-5">
      <Link
        href={url}
        passHref
        target="_blank"
        className="border border-neutral-300 dark:border-neutral-800 dark:text-neutral-200 text-neutral-500 hover:dark:bg-neutral-800 hover:bg-neutral-100 rounded flex items-center justify-between p-4 overflow-x-hidden transition duration-200"
      >
        <span className="flex-shrink-0"> {text} </span>
        <div> {icon} </div>
      </Link>
    </div>
  );
};

export default CustomLink;
