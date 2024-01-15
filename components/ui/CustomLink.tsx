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
        className="border-neutral-300 dark:border-neutral-800 dark:text-neutral-200 text-neutral-500 hover:dark:bg-neutral-800 hover:bg-neutral-100 transition duration-200 flex w-full border rounded-lg p-4 items-center justify-between"
      >
        <span className="flex flex-row items-center"> {text} </span>
        <div> {icon} </div>
      </Link>
    </div>
  );
};

export default CustomLink;
