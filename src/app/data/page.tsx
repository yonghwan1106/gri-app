import Link from "next/link";
import { DATASETS, DATASET_STATS } from "@/data/datasets";

export const metadata = {
  title: "데이터 카탈로그 — GRI",
  description: "GRI가 활용하는 경기 공공데이터·국가 공공데이터 카탈로그 — 출처·갱신주기·라이선스·활용 매핑",
};

const PROVIDER_LABEL: Record<string, { label: string; sub: string; color: string }> = {
  "data.gg.go.kr": {
    label: "경기데이터드림",
    sub: "data.gg.go.kr · 가점 5점 직접 대상",
    color: "#1E40AF",
  },
  "insight.gg.go.kr": {
    label: "경기 데이터 분석 포털",
    sub: "insight.gg.go.kr · 가점 5점 직접 대상",
    color: "#1E40AF",
  },
  "data.go.kr": {
    label: "공공데이터포털",
    sub: "data.go.kr · 본 30점 보강",
    color: "#0A1628",
  },
};

const STATUS_LABEL: Record<string, { label: string; color: string; bg: string }> = {
  live: { label: "실시간 연동", color: "#FBF7F0", bg: "#166534" },
  scheduled: { label: "배치 적재", color: "#0A1628", bg: "#C4873B" },
  manual: { label: "수동 적재", color: "#0A1628", bg: "rgba(10,22,40,0.12)" },
};

const CATEGORY_KO: Record<string, string> = {
  medical: "의료",
  transit: "교통",
  disabled: "장애",
  air: "대기",
  housing: "주거",
  safety: "안전",
  edu: "교육",
};

export default function DataCatalogPage() {
  const ordered = [...DATASETS].sort((a, b) => {
    const order = ["data.gg.go.kr", "insight.gg.go.kr", "data.go.kr"];
    return order.indexOf(a.provider) - order.indexOf(b.provider);
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <header className="mb-10">
        <div className="border-t-4 border-ink pt-6 mb-3" />
        <div className="border-t border-gold-leaf/40 mb-6" />
        <div
          className="text-[9px] tracking-[0.25em] uppercase text-gold-leaf mb-3"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          데이터 카탈로그 · 평가위원 검증용
        </div>
        <h1
          className="text-4xl sm:text-5xl font-black text-ink"
          style={{ fontFamily: "Fraunces, Georgia, serif", letterSpacing: "-0.025em", lineHeight: "1.05" }}
        >
          GRI가 활용하는 공공데이터 {DATASET_STATS.total}종
        </h1>
        <p className="mt-4 text-sm sm:text-base text-ink/65 max-w-3xl leading-[1.85]" style={{ wordBreak: "keep-all" }}>
          본 페이지는 평가 가점 5점(<strong>경기 공공데이터 직접 활용</strong>)과 본 점수 30점(<strong>공공데이터 활용</strong>)
          의 근거 자료를 한 화면에 명세화한 카탈로그입니다. 각 데이터셋의 출처 URL · 갱신주기 · 라이선스 · GRI 내부 가중치까지
          공개하여 외부 검증이 가능하도록 설계했습니다.
        </p>
      </header>

      {/* Stats strip */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gold-leaf/20 rounded-sm overflow-hidden shadow-ink-sm mb-12">
        <Stat label="전체 데이터셋" value={`${DATASET_STATS.total}종`} />
        <Stat
          label="경기 공공데이터 직접"
          value={`${DATASET_STATS.gyeonggiDirect}종`}
          accent="#1E40AF"
          sub="가점 5점 대상"
        />
        <Stat label="실시간 Open API" value={`${DATASET_STATS.byStatus.live}종`} accent="#166534" />
        <Stat
          label="배치·수동 적재"
          value={`${DATASET_STATS.byStatus.scheduled + DATASET_STATS.byStatus.manual}종`}
          accent="#C4873B"
        />
      </section>

      {/* Provider distribution */}
      <section className="mb-10">
        <div
          className="text-[9px] font-bold tracking-[0.14em] uppercase mb-4"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
        >
          제공처 분포
        </div>
        <div className="grid sm:grid-cols-4 gap-3">
          {(Object.keys(DATASET_STATS.byProvider) as (keyof typeof DATASET_STATS.byProvider)[]).map((key) => (
            <div
              key={key}
              className="rounded-sm border bg-paper p-4 shadow-ink-sm"
              style={{
                borderColor: "rgba(196,135,59,0.22)",
                borderTopWidth: "3px",
                borderTopColor: PROVIDER_LABEL[key].color,
              }}
            >
              <div
                className="text-[10px] font-bold mb-1"
                style={{ fontFamily: "JetBrains Mono, monospace", color: PROVIDER_LABEL[key].color }}
              >
                {PROVIDER_LABEL[key].label}
              </div>
              <div
                className="text-[9px] text-ink/45 mb-3"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {PROVIDER_LABEL[key].sub}
              </div>
              <div className="flex items-baseline gap-1">
                <span
                  className="text-3xl font-black text-ink"
                  style={{ fontFamily: "Fraunces, Georgia, serif" }}
                >
                  {DATASET_STATS.byProvider[key]}
                </span>
                <span className="text-xs text-ink/40">종</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dataset table */}
      <section className="mb-14">
        <div
          className="text-[9px] font-bold tracking-[0.14em] uppercase mb-4"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
        >
          데이터셋 상세
        </div>

        <div className="space-y-4">
          {ordered.map((d) => (
            <article
              key={d.id}
              className="rounded-sm border bg-paper shadow-ink-sm overflow-hidden"
              style={{ borderColor: "rgba(196,135,59,0.22)" }}
            >
              {/* Top stripe */}
              <div
                className="h-1"
                style={{ backgroundColor: PROVIDER_LABEL[d.provider].color }}
              />

              <div className="p-5 sm:p-6 grid sm:grid-cols-[1fr_auto] gap-4 items-start">
                {/* Left: title + meta */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {(d.provider === "data.gg.go.kr" || d.provider === "insight.gg.go.kr") && (
                      <span
                        className="px-2 py-0.5 text-[10px] font-black rounded-sm inline-flex items-center gap-1"
                        style={{
                          backgroundColor: "#C4873B",
                          color: "#0A1628",
                          fontFamily: "JetBrains Mono, monospace",
                          boxShadow: "0 1px 2px rgba(196,135,59,0.4)",
                        }}
                        title="가점 5점 직접 대상 (경기 공공데이터)"
                      >
                        <span style={{ fontSize: "12px", lineHeight: "1" }}>★</span>
                        <span>가점 5점</span>
                      </span>
                    )}
                    <span
                      className="px-2 py-0.5 text-[9px] font-bold rounded-sm"
                      style={{
                        backgroundColor: PROVIDER_LABEL[d.provider].color,
                        color: "#FBF7F0",
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      {PROVIDER_LABEL[d.provider].label}
                    </span>
                    <span
                      className="px-2 py-0.5 text-[9px] font-bold rounded-sm"
                      style={{
                        backgroundColor: STATUS_LABEL[d.status].bg,
                        color: STATUS_LABEL[d.status].color,
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      {STATUS_LABEL[d.status].label}
                    </span>
                    {d.categories.map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 text-[9px] rounded-sm"
                        style={{
                          backgroundColor: "rgba(196,135,59,0.12)",
                          color: "#7C5A2A",
                          fontFamily: "JetBrains Mono, monospace",
                        }}
                      >
                        #{CATEGORY_KO[c]}
                      </span>
                    ))}
                  </div>

                  <h3
                    className="text-lg font-bold text-ink"
                    style={{ fontFamily: "Fraunces, Georgia, serif" }}
                  >
                    {d.title}
                  </h3>

                  <p className="mt-2 text-sm text-ink/65 leading-[1.75]" style={{ wordBreak: "keep-all" }}>
                    <strong className="text-ink/80">GRI 활용:</strong> {d.usedFor}
                  </p>

                  {d.fields && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {d.fields.map((f) => (
                        <span
                          key={f}
                          className="px-1.5 py-0.5 text-[10px] rounded-sm border"
                          style={{
                            borderColor: "rgba(10,22,40,0.12)",
                            color: "rgba(10,22,40,0.55)",
                            fontFamily: "JetBrains Mono, monospace",
                          }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: spec */}
                <div
                  className="text-[10px] rounded-sm border p-3 min-w-[180px]"
                  style={{
                    borderColor: "rgba(196,135,59,0.18)",
                    backgroundColor: "#F4ECE0",
                    fontFamily: "JetBrains Mono, monospace",
                    color: "rgba(10,22,40,0.6)",
                  }}
                >
                  <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5">
                    <span style={{ color: "#C4873B" }}>갱신</span>
                    <span>{d.updateCycle}</span>
                    <span style={{ color: "#C4873B" }}>최근</span>
                    <span>{d.lastUpdated}</span>
                    <span style={{ color: "#C4873B" }}>형식</span>
                    <span>{d.format}</span>
                    <span style={{ color: "#C4873B" }}>라이선스</span>
                    <span>{d.license}</span>
                  </div>
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block text-center px-2 py-1.5 rounded-sm text-[10px] font-bold transition-colors"
                    style={{
                      backgroundColor: "#0A1628",
                      color: "#C4873B",
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    원본 보기 →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Pipeline note */}
      <section
        className="rounded-sm border p-6 mb-12"
        style={{ borderColor: "rgba(196,135,59,0.25)", backgroundColor: "#FFFBEB" }}
      >
        <div
          className="text-[9px] font-bold tracking-[0.14em] uppercase mb-3"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
        >
          데이터 처리 파이프라인
        </div>
        <ol className="space-y-2 text-sm text-ink/70 leading-[1.85]" style={{ wordBreak: "keep-all" }}>
          <li><strong>① 수집:</strong> Open API(실시간) 또는 일·월 배치(GitHub Actions cron)로 raw 데이터 적재 → Vercel Blob/Supabase.</li>
          <li><strong>② 정제:</strong> 시·군 코드 표준화(법정동코드 10자리), 위경도 WGS84 보정, 결측치 마스킹.</li>
          <li><strong>③ 집계:</strong> 시·군 × 카테고리 × 월 단위 피처(z-score, 인구 정규화) 생성 → GRI 산출식 입력.</li>
          <li><strong>④ 모델:</strong> Claude Opus 4.7이 시민 제보 + 집계 피처를 결합해 카테고리 분류 + GRI 0~95 산출.</li>
          <li><strong>⑤ 검증:</strong> <Link href="/eval" className="underline" style={{ color: "#1E40AF" }}>/eval 페이지</Link>의 골든셋 정확도 · 일관성 · p95 지연시간을 라이브 측정.</li>
        </ol>
      </section>

      {/* Footer */}
      <footer className="text-center pt-8 border-t border-gold-leaf/25">
        <p className="text-xs text-ink/55 leading-[1.8] max-w-3xl mx-auto" style={{ wordBreak: "keep-all" }}>
          모든 URL은 <strong>2026-05-25 기준 실존 검증</strong>되었으며, 각 데이터셋의 갱신일은 포털 메타데이터를 그대로 표시합니다.
          GRI 산출 시점에는 Open API 호출(실시간) 또는 일·월 배치(GitHub Actions cron)로 최신본을 가져옵니다.
          본 카탈로그는 시제품 단계의 manifest이며, 통합본선 진출 시 ETL 자동화 코드와 함께 GitHub에 공개됩니다.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            href="/eval"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-sm text-paper font-bold text-sm"
            style={{ backgroundColor: "#0A1628", fontFamily: "Fraunces, Georgia, serif" }}
          >
            AI 분류 성능 평가 →
          </Link>
          <Link
            href="/report"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-sm font-medium text-sm border"
            style={{ borderColor: "rgba(196,135,59,0.35)", color: "#0A1628", fontFamily: "Fraunces, Georgia, serif" }}
          >
            제보 시연하기
          </Link>
        </div>
      </footer>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
  sub,
}: {
  label: string;
  value: string;
  accent?: string;
  sub?: string;
}) {
  return (
    <div className="bg-paper p-5 flex flex-col">
      <div
        className="text-[9px] font-bold tracking-widest uppercase mb-2"
        style={{ fontFamily: "JetBrains Mono, monospace", color: accent ?? "#C4873B" }}
      >
        {label}
      </div>
      <div
        className="text-3xl font-black text-ink"
        style={{ fontFamily: "Fraunces, Georgia, serif" }}
      >
        {value}
      </div>
      {sub && (
        <div
          className="mt-1 text-[10px] text-ink/45"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}
