import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate(),
    ).padStart(2, "0")}`;
  } catch {
    return iso;
  }
}

export function bsiColor(score: number): string {
  if (score >= 80) return "#DC2626";
  if (score >= 60) return "#EA580C";
  if (score >= 40) return "#FCD34D";
  if (score >= 20) return "#84CC16";
  return "#22C55E";
}

export function bsiLevel(score: number): { label: string; color: string } {
  if (score >= 80) return { label: "심각", color: "bg-red-100 text-red-800" };
  if (score >= 60)
    return { label: "주의", color: "bg-orange-100 text-orange-800" };
  if (score >= 40)
    return { label: "관찰", color: "bg-amber-100 text-amber-800" };
  if (score >= 20)
    return { label: "양호", color: "bg-lime-100 text-lime-800" };
  return { label: "안정", color: "bg-green-100 text-green-800" };
}
