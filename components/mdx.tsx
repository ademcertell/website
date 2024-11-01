"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Image, { ImageProps } from "next/image";
import Link, { LinkProps } from "next/link";
import React, { ReactNode } from "react";
import { highlight } from "sugar-high";

interface CustomMDXProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
}

interface CustomLinkProps extends LinkProps {
  href: string;
  children: ReactNode;
}

// Code component with syntax highlighting
function Code({ children, ...props }: { children: ReactNode }) {
  const codeHTML = highlight(String(children));
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

// CustomLink component for different link types
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

// RoundedImage component with alt and rounded style
interface RoundedImageProps extends ImageProps {
  alt: string;
}

function RoundedImage({ alt, ...props }: RoundedImageProps) {
  return <Image alt={alt} className="rounded-lg" {...props} />;
}

// Table component for rendering tables with headers and rows
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

// Utility function to create slugs for headings
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

// Function to create heading components with anchor links
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

// Define MDX components
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
  Table,
};

// CustomMDX component to render MDX content
const CustomMDX: React.FC<CustomMDXProps> = ({ source }) => {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none text-justify">
      <MDXRemote {...source} />
    </div>
  );
};

export default CustomMDX;
