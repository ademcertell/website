"use client";

import dynamic from "next/dynamic";
import Image, { ImageProps } from "next/image";
import Link, { LinkProps } from "next/link";
import React, { ReactNode } from "react";
import { highlight } from "sugar-high";

const MDXRemote = dynamic(() => import("next-mdx-remote").then(mod => mod.MDXRemote), { ssr: false });

interface CustomMDXProps {
  source: any;
}

interface CustomLinkProps extends LinkProps {
  href: string;
  children: ReactNode;
}

function Code({ children, ...props }: { children: ReactNode }) {
  const codeHTML = highlight(String(children));
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a href={href} {...props}>{children}</a>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

interface RoundedImageProps extends ImageProps {
  alt: string;
}

function RoundedImage({ alt, ...props }: RoundedImageProps) {
  return <Image alt={alt} className="rounded-lg" {...props} />;
}

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  return (
    <table className="w-full border-collapse border border-gray-700 text-left">
      <thead>
        <tr className="bg-gray-800">
          {data.headers.map((header, index) => (
            <th key={index} className="p-2 border border-gray-600 text-white font-semibold">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, rowIndex) => (
          <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="p-2 border border-gray-700 text-gray-300">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(level: number) {
  const Component: React.FC<{ children: ReactNode }> = ({ children }) => {
    const slug = slugify(String(children));
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        <a key={`link-${slug}`} href={`#${slug}`} className="anchor">
          #
        </a>,
      ],
      children
    );
  };
  Component.displayName = `Heading${level}`;
  return Component;
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  code: Code,
  img: RoundedImage,
  a: CustomLink,
  table: Table,
};

const CustomMDX: React.FC<CustomMDXProps> = ({ source }) => {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none text-justify">
      <MDXRemote {...source} components={components} />
    </div>
  );
};

export default CustomMDX;
