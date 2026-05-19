import { getStats } from "@/data/mockSpots";
import { REGIONS } from "@/data/mockRegions";

export function StatsRow() {
  const stats = getStats();
  return (
    <div className="grid grid-cols-2 gap-px sm:grid-cols-4 bg-gold-leaf/20 rounded-sm overflow-hidden shadow-ink-sm">
      <Stat label="전체 사각지대" value={stats.total} suffix="건" accent="#1E40AF" />
      <Stat label="심각(BSI 80+)" value={stats.critical} suffix="건" accent="#B91C1C" />
      <Stat label="보도 예정" value={stats.reporting} suffix="건" accent="#C4873B" />
      <Stat label="대상 지역" value={REGIONS.length} suffix="시·군·구" accent="#166534" />
    </div>
  );
}

function Stat({
  label,
  value,
  suffix,
  accent,
}: {
  label: string;
  value: number;
  suffix: string;
  accent: string;
}) {
  return (
    <div className="bg-paper px-5 py-6 flex flex-col gap-1">
      <div
        className="text-[9px] font-bold tracking-[0.14em] uppercase"
        style={{ fontFamily: "JetBrains Mono, monospace", color: accent }}
      >
        {label}
      </div>
      <div className="flex items-baseline gap-1.5 mt-1">
        <span
          className="text-3xl font-black text-ink leading-none"
          style={{ fontFamily: "Fraunces, Georgia, serif", fontOpticalSizing: "auto" }}
        >
          {value.toLocaleString()}
        </span>
        <span
          className="text-xs text-ink/40"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          {suffix}
        </span>
      </div>
      <div className="mt-2 h-0.5 rounded-full w-8" style={{ backgroundColor: accent }} />
    </div>
  );
}
