"use client";
import { useEffect, useState } from "react";
type Reading = { title: string; author?: string } | null;

export default function ReadingNow() {
  const [text, setText] = useState("—");

  useEffect(() => {
    fetch("/api/reading")
      .then((r) => r.json())
      .then((d) => {
        const r: Reading = d?.reading ?? null;
        setText(
          r ? `${r.title}${r.author ? " — " + r.author : ""}` : "not reading"
        );
      })
      .catch(() => setText("not reading"));
  }, []);

  return (
    <span>
      📖 Currently reading: <em>{text}</em>
    </span>
  );
}
