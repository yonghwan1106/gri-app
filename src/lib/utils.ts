import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string): string {
  // v9.1: timezone-safe — Date 객체를 사용하지 않고 문자열에서 직접 추출
  // 이전 구현은 new Date()로 인해 server(UTC) vs client(KST) 타임존 차이로
  // hydration mismatch (React #418) 발생
  if (!iso) return "";
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  return iso;
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
