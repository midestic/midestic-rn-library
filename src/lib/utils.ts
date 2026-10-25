import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names with conflict resolution.
 *
 * @example
 * cn("p-2 text-sm", condition && "p-4") // => "p-4 text-sm"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
