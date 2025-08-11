"use client";
import { useEffect } from "react";

export default function HideHeader() {
  useEffect(() => {
    document.body.classList.add("hide-header");
    return () => document.body.classList.remove("hide-header");
  }, []);
  return null;
}
