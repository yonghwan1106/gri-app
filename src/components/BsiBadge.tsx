import { bsiLevel } from "@/lib/utils";

export function BsiBadge({ score, size = "md" }: { score: number; size?: "sm" | "md" | "lg" }) {
  const { label, bg, text } = bsiLevelEditorial(score);

  const sizeStyles =
    size === "sm"
      ? { fontSize: "9px", padding: "2px 7px", letterSpacing: "0.08em" }
      : size === "lg"
      ? { fontSize: "11px", padding: "4px 10px", letterSpacing: "0.08em" }
      : { fontSize: "10px", padding: "3px 8px", letterSpacing: "0.08em" };

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-sm font-bold"
      style={{
        fontFamily: "JetBrains Mono, monospace",
        backgroundColor: bg,
        color: text,
        ...sizeStyles,
      }}
    >
      <span>BSI {score}</span>
      <span style={{ opacity: 0.5 }}>·</span>
      <span>{label}</span>
    </span>
  );
}

function bsiLevelEditorial(score: number): { label: string; bg: string; text: string } {
  if (score >= 80) return { label: "심각", bg: "#FEE2E2", text: "#B91C1C" };
  if (score >= 60) return { label: "주의", bg: "#FEF3C7", text: "#92400E" };
  if (score >= 40) return { label: "관찰", bg: "#FEF9C3", text: "#713F12" };
  if (score >= 20) return { label: "양호", bg: "#DCFCE7", text: "#166534" };
  return { label: "안정", bg: "#D1FAE5", text: "#065F46" };
}
