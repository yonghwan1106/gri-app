import { MapClient } from "@/components/MapClient";

export const metadata = {
  title: "사각지대 지도 — BlueSpot",
  description: "경기·인천 41개 시·군·구 + 12개 카테고리 사각지대 라이브 지도",
};

export default function MapPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Page header — editorial style */}
      <header className="mb-7">
        <span
          className="text-[10px] font-bold tracking-[0.16em] uppercase"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
        >
          데이터 카토그래피
        </span>
        <div className="flex flex-wrap items-baseline gap-4 mt-2">
          <h1
            className="text-3xl sm:text-4xl font-bold text-ink"
            style={{ fontFamily: "Fraunces, Georgia, serif", letterSpacing: "-0.025em" }}
          >
            사각지대 라이브 지도
          </h1>
          <span
            className="text-sm text-ink/40"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            경기 31개 + 인천 10개 = 41개 시·군·구
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
          시민 제보 + AI 교차검증으로 매핑된 사각지대 100건.
          카테고리·BSI 점수 필터로 탐색할 수 있습니다.
        </p>
      </header>

      <MapClient />
    </div>
  );
}
