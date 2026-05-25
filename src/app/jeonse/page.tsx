import { JeonseForm } from "./JeonseForm";

export const metadata = {
  title: "전세사기 즉시 조회 · GRI 시민 모드",
  description: "임대 매물 주소·보증금만 입력하면 GRI AI가 5초 안에 전세사기 위험도(0~100점)와 5가지 근거를 제시합니다.",
};

export default function JeonsePage() {
  return (
    <div className="bg-paper-warm min-h-screen">
      {/* Hero */}
      <section className="border-b border-gold-leaf/20" style={{ background: 'linear-gradient(135deg, #001E3C 0%, #003876 100%)' }}>
        <div className="mx-auto max-w-5xl px-4 py-12 text-paper">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-gold-leaf" />
            <span
              className="text-[10px] tracking-[0.18em] uppercase text-gold-leaf font-bold"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              GRI 시민 모드 · F1 전세사기
            </span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-black leading-tight"
            style={{ fontFamily: 'Fraunces, Georgia, serif', letterSpacing: '-0.025em' }}
          >
            전세사기 위험도, <br/><span style={{ color: '#C4873B' }}>5초 안에 알려드립니다</span>
          </h1>
          <p className="mt-4 max-w-2xl text-paper/70 text-sm sm:text-base leading-[1.8]" style={{ wordBreak: 'keep-all' }}>
            경기 공공데이터(전월세 · 등기 · 실거래가) + Claude Opus 4.7이 임대 매물의 5축 위험을 종합 분석합니다. 계약 전 5초만 투자하세요.
          </p>
        </div>
      </section>

      {/* Form + Result */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <JeonseForm />
      </section>

      {/* Info row */}
      <section className="bg-paper border-t border-gold-leaf/25">
        <div className="mx-auto max-w-5xl px-4 py-10 grid sm:grid-cols-3 gap-6">
          <InfoCol
            icon="🏠"
            title="활용 공공데이터"
            body="경기데이터드림 단독·다가구 전월세 + 국토부 실거래가 OpenAPI + 법원 등기"
          />
          <InfoCol
            icon="🤖"
            title="AI 모델"
            body="Claude Opus 4.7 (1M context) + Multi-Agent (탐색·평가·추천 3단계)"
          />
          <InfoCol
            icon="🛡️"
            title="위험 시 자동 안내"
            body="대한법률구조공단(1899-1133) · 경기도 전세사기 피해지원센터(031-120)"
          />
        </div>
      </section>
    </div>
  );
}

function InfoCol({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="flex flex-col">
      <div className="text-3xl mb-2">{icon}</div>
      <h3
        className="text-base font-bold text-ink mb-2"
        style={{ fontFamily: 'Fraunces, Georgia, serif' }}
      >
        {title}
      </h3>
      <p className="text-sm text-ink/60 leading-[1.7]" style={{ wordBreak: 'keep-all' }}>{body}</p>
    </div>
  );
}
