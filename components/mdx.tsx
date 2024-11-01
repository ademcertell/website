"use client";

import dynamic from "next/dynamic";
import Image, { ImageProps } from "next/image";
import Link, { LinkProps } from "next/link";
import React, { ReactNode } from "react";
import { highlight } from "sugar-high";

// MDXRemote'u dinamik import ile yükleyin
const MDXRemote = dynamic(() => import("next-mdx-remote").then(mod => mod.MDXRemote), { ssr: false });

interface CustomMDXProps {
  source: any; // Server'dan gelen serialize edilmiş veri tipi
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

interface TableProps {
  data: {
    headers: string[];
    rows: string[][];
  };
}

function Table({ data }: TableProps) {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  const rows = data.rows.map((row, rowIndex) => (
    <tr key={rowIndex}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
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
  code: Code,
  h6: createHeading(6),
  img: RoundedImage,
  a: CustomLink,
  Table,
};

const CustomMDX: React.FC<CustomMDXProps> = ({ source }) => {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none text-justify">
      <MDXRemote {...source} components={components} />
    </div>
  );
};

export default CustomMDX;
