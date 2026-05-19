import { MapClient } from "@/components/MapClient";

export const metadata = {
  title: "사각지대 지도 — BlueSpot",
  description: "경기·인천 41개 시·군·구 + 12개 카테고리 사각지대 라이브 지도",
};

export default function MapPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <header className="mb-5">
        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            사각지대 라이브 지도
          </h1>
          <span className="text-sm text-slate-500">
            · 경기 31개 + 인천 10개 = 41개 시·군·구
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-600">
          시민 제보 + AI 교차검증으로 매핑된 사각지대 100건. 카테고리·BSI 점수 필터로 탐색할 수 있습니다.
        </p>
      </header>
      <MapClient />
    </div>
  );
}
