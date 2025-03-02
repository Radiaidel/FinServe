import { type ClassValue, clsx } from "clsx"

// Simple utility function to combine class names
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

