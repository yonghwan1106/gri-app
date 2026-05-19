import { getStats } from "@/data/mockSpots";
import { REGIONS } from "@/data/mockRegions";

export function StatsRow() {
  const stats = getStats();
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <Stat label="전체 사각지대" value={stats.total} suffix="건" tone="default" />
      <Stat label="심각(BSI 80+)" value={stats.critical} suffix="건" tone="danger" />
      <Stat label="보도 예정" value={stats.reporting} suffix="건" tone="accent" />
      <Stat label="대상 지역" value={REGIONS.length} suffix="시·군·구" tone="primary" />
    </div>
  );
}

function Stat({
  label,
  value,
  suffix,
  tone,
}: {
  label: string;
  value: number;
  suffix: string;
  tone: "default" | "primary" | "accent" | "danger";
}) {
  const toneClass =
    tone === "primary"
      ? "border-bluespot-200 bg-bluespot-50"
      : tone === "accent"
      ? "border-accent-200 bg-accent-50"
      : tone === "danger"
      ? "border-red-200 bg-red-50"
      : "border-slate-200 bg-white";
  return (
    <div className={`rounded-xl border p-4 shadow-sm ${toneClass}`}>
      <div className="text-xs font-medium text-slate-600">{label}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-bold text-slate-900">{value.toLocaleString()}</span>
        <span className="text-xs text-slate-500">{suffix}</span>
      </div>
    </div>
  );
}
