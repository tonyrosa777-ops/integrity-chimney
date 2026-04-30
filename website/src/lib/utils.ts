import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind class composition helper. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Detects the user's reduced-motion preference. SSR-safe. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Formats a phone string for tel: links. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
