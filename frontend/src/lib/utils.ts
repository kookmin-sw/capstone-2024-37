import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms) {
  const loopTime = Date.now() + ms;
  while (Date.now() < loopTime) {}
}
