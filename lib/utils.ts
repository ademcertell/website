import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function combineClassNames(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | number | Date): string {
  return new Date(dateString).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default async function fetchData<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  try {
    const response = await fetch(input, init);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}