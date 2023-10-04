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
    <div className="my-5 flex sm:flex-row">
      <div className="flex flex-col gap-2 md:flex-row md:gap-2">
        <Link
          href={url}
          passHref
          target="_blank"
          className="border border-neutral-200 dark:border-neutral-700 rounded flex items-center justify-between px-3 py-4 w-full"
        >
          <div className="flex items-center space-x-2">
            {icon}
            <span> {text} </span>
          </div>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
              fill="currentColor"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CustomLink;