"use client";

import dynamic from "next/dynamic";
import Image, { ImageProps } from "next/image";
import Link, { LinkProps } from "next/link";
import React, { ReactNode } from "react";
import { highlight } from "sugar-high";

// MDXRemote client dynamic upload
const MDXRemote = dynamic(
  () => import("next-mdx-remote").then((m) => m.MDXRemote),
  { ssr: false }
);

interface CustomMDXProps {
  source: any;
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
      { id: slug, className: "group scroll-mt-24" },
      <>
        <a
          href={`#${slug}`}
          className="mr-2 inline-block select-none opacity-0 transition group-hover:opacity-60"
          aria-label="Anchor link"
        >
          #
        </a>
        {children}
      </>
    );
  };
  Component.displayName = `Heading${level}`;
  return Component;
}

function Code({
  children,
  ...props
}: {
  children: ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const code = String(children ?? "");
  const isMultiline = code.includes("\n");

  if (isMultiline) {
    return (
      <pre
        className="not-prose overflow-x-auto rounded-lg border border-white/10 bg-black/50 p-4 text-sm"
        {...props}
      >
        <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
      </pre>
    );
  }

  // inline code
  return (
    <code
      className="rounded-md bg-white/5 px-1.5 py-0.5"
      dangerouslySetInnerHTML={{ __html: highlight(code) }}
      {...props}
    />
  );
}

interface CustomLinkProps extends LinkProps {
  href: string;
  children: ReactNode;
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
    return (
      <a href={href} {...(props as any)}>
        {children}
      </a>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...(props as any)}
    >
      {children}
    </a>
  );
}

interface RoundedImageProps extends ImageProps {
  alt: string;
}

function RoundedImage({ alt, className = "", ...props }: RoundedImageProps) {
  return <Image alt={alt} className={`rounded-lg ${className}`} {...props} />;
}

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  return (
    <table className="w-full border-collapse text-left">
      <thead>
        <tr>
          {data.headers.map((h, i) => (
            <th
              key={i}
              className="border-b border-white/10 px-3 py-2 text-sm font-semibold"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, ri) => (
          <tr key={ri} className="odd:bg-white/5">
            {row.map((cell, ci) => (
              <td key={ci} className="px-3 py-2 text-sm">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
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
    <div className="prose prose-invert mx-auto max-w-2xl md:max-w-3xl prose-p:leading-7">
      <MDXRemote {...source} components={components} />
    </div>
  );
};

export default CustomMDX;