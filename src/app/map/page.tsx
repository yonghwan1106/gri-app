import { MapClient } from "@/components/MapClient";

export const metadata = {
  title: "GRI 정책 위험도 지도 — 경기 31개 시·군",
  description: "경기도 31개 시·군 + 7개 정책 카테고리(의료/교통/장애/대기/주거/안전/교육) GRI 위험도 라이브 지도. Claude Opus 4.8 + Multi-Agent 자동 진단.",
};

export default function MapPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-7">
        <span
          className="text-[10px] font-bold tracking-[0.16em] uppercase"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
        >
          GRI 정책 위험도 진단
        </span>
        <div className="flex flex-wrap items-baseline gap-4 mt-2">
          <h1
            className="text-3xl sm:text-4xl font-bold text-ink"
            style={{ fontFamily: "Fraunces, Georgia, serif", letterSpacing: "-0.025em" }}
          >
            경기 31개 시·군 GRI 라이브 지도
          </h1>
          <span
            className="text-sm text-ink/40"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            7개 정책 카테고리 · Claude Opus 4.8
          </span>
        </div>

        {/* Gold divider */}
        <div className="mt-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-gold-leaf/30" />
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", color: "#C4873B" }}>
            ◆
          </span>
          <span className="h-px w-12 bg-gold-leaf/30" />
        </div>

        <p className="mt-3 text-sm text-ink/55 max-w-2xl" style={{ wordBreak: "keep-all" }}>
          경기 공공데이터 + Claude Opus 4.8 Multi-Agent로 자동 진단된 GRI 위험도 100건.
          카테고리·GRI 점수 필터로 탐색할 수 있습니다.
        </p>
      </header>

      <MapClient />
    </div>
  );
}
