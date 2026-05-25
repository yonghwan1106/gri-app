import { ReportForm } from "./ReportForm";

export const metadata = {
  title: "정책 진단 — BlueSpot",
  description: "경기 31개 시·군 위험도를 제보하면 Claude Opus 4가 AI 분류·GRI 점수·해결 단계를 자동 산출합니다.",
};

export default function ReportPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Page header */}
      <header className="mb-8">
        <span
          className="text-[10px] font-bold tracking-[0.16em] uppercase"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
        >
          GRI Editorial 정책 진단란
        </span>
        <div className="mt-2 flex flex-wrap items-baseline gap-4">
          <h1
            className="text-3xl sm:text-4xl font-bold text-ink"
            style={{ fontFamily: "Fraunces, Georgia, serif", letterSpacing: "-0.025em" }}
          >
            위험도 제보
          </h1>
        </div>

        {/* Gold divider */}
        <div className="mt-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-gold-leaf/30" />
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", color: "#C4873B" }}>◆</span>
          <span className="h-px w-12 bg-gold-leaf/30" />
        </div>

        <p
          className="mt-4 text-sm text-ink/55 max-w-2xl leading-relaxed"
          style={{ wordBreak: "keep-all", lineHeight: "1.8" }}
        >
          위치·카테고리·내용을 입력하면 <strong className="text-ink/80">Claude Opus 4</strong>가
          자동 분류·GRI 점수·해결 단계를 산출합니다.
          제보는 GRI 검증팀과 GRI Editorial 정책 진단 리포트 파이프라인으로 이관됩니다.
        </p>

        {/* Disclaimer */}
        <div
          className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border"
          style={{ borderColor: "rgba(196,135,59,0.25)", backgroundColor: "#F4ECE0" }}
        >
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", color: "#C4873B" }}>
            ❏ 본 투고란은 2026 KOREA LBS 스타트업 챌린지 데모입니다 · Mock 데이터 일부 사용
          </span>
        </div>
      </header>

      <ReportForm />
    </div>
  );
}
