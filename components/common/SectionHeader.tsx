import React from "react";

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="mb-10">
      <h2 className="text-[15px] uppercase tracking-[0.16em] font-medium text-foreground/80 mb-3">
        {title}
      </h2>
      <div className="h-px w-full bg-gradient-to-r from-foreground/30 to-transparent" />
    </div>
  );
}
