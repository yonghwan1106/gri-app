import { ReportForm } from "./ReportForm";

export const metadata = {
  title: "사각지대 제보 — BlueSpot",
  description: "내 동네 사각지대를 제보하면 Claude Opus 4가 AI 분류·BSI 점수·해결 단계를 자동 산출합니다.",
};

export default function ReportPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          사각지대 제보
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          위치·카테고리·내용을 입력하면 Claude Opus 4가 자동 분류·BSI 점수·해결 단계를 산출합니다.
          제보는 BlueSpot 검증팀과 경인블루저널 솔루션 저널리즘 파이프라인으로 이관됩니다.
        </p>
      </header>
      <ReportForm />
    </div>
  );
}
