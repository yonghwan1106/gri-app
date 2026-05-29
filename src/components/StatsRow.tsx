import { SPOTS } from "@/data/mockSpots";
import { REGIONS } from "@/data/mockRegions";
import { DATASET_STATS } from "@/data/datasets";

export function StatsRow() {
  const total = SPOTS.length;
  const critical = SPOTS.filter((s) => s.bsi >= 80).length;
  const reports = SPOTS.filter((s) => s.status === "보도예정").length;
  return (
    <div className="grid grid-cols-2 gap-px sm:grid-cols-4 bg-gold-leaf/20 rounded-sm overflow-hidden shadow-ink-sm">
      <Stat label="GRI 진단 데이터" value={total} suffix="건" accent="#003876" />
      <Stat label="위험 시·군 (GRI 80+)" value={critical} suffix="건" accent="#B91C1C" />
      <Stat label="정책 진단 리포트" value={reports} suffix="건" accent="#C4873B" />
      <Stat label="분석 대상 (경기 31개 시·군)" value={REGIONS.length} suffix="시·군" accent="#166534" sub={`경기 공공데이터 ${DATASET_STATS.gyeonggiDirect}종 + 보조 ${DATASET_STATS.total - DATASET_STATS.gyeonggiDirect}종`} />
    </div>
  );
}

function Stat({
  label,
  value,
  suffix,
  accent,
  sub,
}: {
  label: string;
  value: number;
  suffix: string;
  accent: string;
  sub?: string;
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
      {sub && (
        <div className="mt-1 text-[9px] text-ink/40" style={{ fontFamily: "JetBrains Mono, monospace" }}>
          {sub}
        </div>
      )}
    </div>
  );
}
