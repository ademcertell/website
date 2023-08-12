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
    <li className="mb-1.5">
      <Link 
        href={url} 
        passHref
        target="_blank"
        className="w-32 flex justify-between items-center cursor-pointer text-lg"
        >
          {text}
          {icon}
      </Link>
    </li>
  );
};

export default CustomLink;
