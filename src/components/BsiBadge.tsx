import { bsiLevel } from "@/lib/utils";

export function BsiBadge({ score, size = "md" }: { score: number; size?: "sm" | "md" | "lg" }) {
  const { label, color } = bsiLevel(score);
  const sizeClass =
    size === "sm"
      ? "px-2 py-0.5 text-xs"
      : size === "lg"
      ? "px-3 py-1 text-sm"
      : "px-2.5 py-0.5 text-xs";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${color} ${sizeClass}`}
    >
      <span className="font-bold">BSI {score}</span>
      <span>·</span>
      <span>{label}</span>
    </span>
  );
}
