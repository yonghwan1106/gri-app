import Link from "next/link";

export const metadata = {
  title: "사업화 — BM · 매출 시뮬 · 경쟁비교 — GRI",
  description:
    "GRI의 비즈니스 모델 캔버스, 3년 매출 시뮬레이션, TAM/SAM/SOM, 경쟁사 비교 — 평가 항목 '발전가능성(15점)' 정량 근거 자료",
};

const BM_BLOCKS: { title: string; tone: "key" | "support"; items: string[] }[] = [
  {
    title: "고객 세그먼트",
    tone: "key",
    items: [
      "B2G · 경기도청 정책기획관·주거복지과·교통국",
      "B2G · 경기 31개 시·군 정책담당부서",
      "B2B · 지역 언론사(경기일보·중부일보 등) — 임베드 위젯",
      "B2C · 도민 1,360만 명 — freemium 전세사기·생활안전",
    ],
  },
  {
    title: "가치 제안",
    tone: "key",
    items: [
      "정책담당자: 7대 위험도 GRI 점수로 예산 집행 근거 자동 산출",
      "시·군: 시민 제보 → AI 분류 → 우선순위 30분 → 의회 보고서",
      "도민: 주소 입력 5초 만에 전세사기·심야 의료공백 진단",
      "공통: 외부 검증 가능한 데이터 출처 + AI 정확도 88%",
    ],
  },
  {
    title: "채널",
    tone: "support",
    items: [
      "경기도 행정SaaS 마켓플레이스 등록 (GBSA 협력)",
      "31개 시·군 위탁사업 RFP 참여 (연 4~6건)",
      "언론사 임베드 위젯 (지역신문 5개사 무상 PoC)",
      "B2C: 카카오 채널 + 31개 시·군 보도자료",
    ],
  },
  {
    title: "고객 관계",
    tone: "support",
    items: [
      "B2G: 전담 PM 1명 + 분기 운영 리뷰",
      "B2G: SLA 99.5% · p95 5초 보장",
      "B2C: 무료, 데이터·AI 신뢰도 확보 채널",
      "B2B: 임베드 위젯 → 광고 매출 분배",
    ],
  },
  {
    title: "수익원",
    tone: "key",
    items: [
      "B2G SaaS 연간 라이선스 — 시·군 평균 2,000만원/년",
      "B2G 컨설팅 — 시·군 1건 평균 1,000만원",
      "B2G 도청 통합 라이선스 — 1.5억원/년 (Y3 목표)",
      "B2B 위젯 임베드 — 월 50만원/언론사",
    ],
  },
  {
    title: "핵심 자원",
    tone: "support",
    items: [
      "Claude Opus 4.8 추론 API",
      "골든셋 25건 → 100건 확장 + 평가 파이프라인",
      "경기 31개 시·군 데이터 ETL 자동화 코드",
      "박용환 — 22개월 86건 공모 수상·정책 기획 경험",
    ],
  },
  {
    title: "핵심 활동",
    tone: "support",
    items: [
      "공공데이터 ETL (일 1회 배치 + 실시간 Open API)",
      "Multi-Agent 모델 운영 + 정확도 모니터링",
      "시·군 컨설팅 (분기 정책 보고서 자동 발행)",
      "골든셋 라벨링 + 모델 재학습 (분기)",
    ],
  },
  {
    title: "핵심 파트너",
    tone: "support",
    items: [
      "경기도경제과학진흥원 (GBSA) — 본 대회 후속 인큐베이팅",
      "경기도청 정책기획관 — 파일럿 MOU 추진 (Y1)",
      "한국부동산원 · HUG — 전세사기 데이터 협력",
      "KT 빅데이터센터 — 유동인구 데이터 (경기 분석포털)",
    ],
  },
  {
    title: "비용 구조",
    tone: "support",
    items: [
      "Claude API — Y1 월 30만원 → Y3 월 300만원",
      "인프라(Vercel Pro + Supabase) — 월 15만원",
      "인건비 — Y1 1인(대표) → Y3 4인 팀",
      "마케팅 + 컨설팅 외주 — Y2부터 매출의 8%",
    ],
  },
];

// v9: 3안 시나리오 (보수/기본/도전) — v8 PDF 정합
const SCENARIOS: {
  key: "conservative" | "base" | "aggressive";
  label: string;
  share: string; // SAM 점유율
  precondition: string;
  rows: { year: string; date: string; customers: string; total: number }[];
  cumulative: number;
}[] = [
  {
    key: "conservative",
    label: "① 보수",
    share: "SAM 12%",
    precondition: "파일럿 1곳 착수금만 + Y2 시·군 2곳 + Y3 5곳 (B2G 조달 사이클 9개월 가정)",
    rows: [
      { year: "Y1", date: "2026", customers: "파일럿 착수금 1곳", total: 800 },
      { year: "Y2", date: "2027", customers: "시·군 2곳", total: 4000 },
      { year: "Y3", date: "2028", customers: "시·군 5곳", total: 10000 },
    ],
    cumulative: 14800,
  },
  {
    key: "base",
    label: "② 기본 (자가평가 기준)",
    share: "SAM 25%",
    precondition: "파일럿 1곳 + Y2 시·군 3곳 + B2B 위젯 2사 + Y3 시·군 10곳",
    rows: [
      { year: "Y1", date: "2026", customers: "파일럿 1곳", total: 1500 },
      { year: "Y2", date: "2027", customers: "시·군 3곳 + B2B 2사", total: 8000 },
      { year: "Y3", date: "2028", customers: "시·군 10곳 + 도청 PoC", total: 21000 },
    ],
    cumulative: 30500,
  },
  {
    key: "aggressive",
    label: "③ 도전",
    share: "SAM 50%",
    precondition: "GBSA 후속지원 + 도청 PoC MOU + B2B 위젯 5사 + Y3 시·군 15곳 + 도청 통합 라이선스",
    rows: [
      { year: "Y1", date: "2026", customers: "파일럿 1곳 + PoC", total: 2500 },
      { year: "Y2", date: "2027", customers: "시·군 5곳 + 도청 PoC + B2B 2사", total: 13600 },
      { year: "Y3", date: "2028", customers: "시·군 15곳 + 도청 통합 + B2B 5사", total: 41000 },
    ],
    cumulative: 57100,
  },
];

const COMPETITORS: {
  name: string;
  type: string;
  strengths: string[];
  gaps: string[];
}[] = [
  {
    name: "경기 데이터 분석 포털",
    type: "공공 (insight.gg.go.kr)",
    strengths: ["분석 시각화 제공", "KT 유동인구 등 고품질 데이터"],
    gaps: [
      "시민 제보 채널 부재",
      "AI 자동 분류·우선순위 미제공",
      "정책 보고서 자동 생성 불가",
    ],
  },
  {
    name: "국민신문고 · 다산콜",
    type: "공공 민원 (행안부 · 서울)",
    strengths: ["전국 단위 인지도", "민원 라우팅 자동화"],
    gaps: [
      "민원→정책 우선순위로 전환 못함",
      "공공데이터 교차검증 없음",
      "정량적 위험지수(GRI 같은) 부재",
    ],
  },
  {
    name: "다방 · 직방",
    type: "민간 부동산 플랫폼",
    strengths: ["매물 DB 광범위", "사용자 기반 큼"],
    gaps: [
      "전세사기 사전 경보 없음",
      "공공 보증사고 데이터 미통합",
      "B2G 채널 부재",
    ],
  },
  {
    name: "전세사기 피해확인서 시스템 (HUG)",
    type: "공공 사후 구제",
    strengths: ["피해 확인 공식 절차", "보증보험 운영"],
    gaps: [
      "사후 구제만, 사전 차단 없음",
      "지도 시각화 없음",
      "시민 1차 진단 어려움",
    ],
  },
];

export default function BizPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <header className="mb-12">
        <div className="border-t-4 border-ink pt-6 mb-3" />
        <div className="border-t border-gold-leaf/40 mb-6" />
        <div
          className="text-[9px] tracking-[0.25em] uppercase text-gold-leaf mb-3"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          사업화 · 발전가능성 검증
        </div>
        <h1
          className="text-4xl sm:text-5xl font-black text-ink"
          style={{ fontFamily: "Fraunces, Georgia, serif", letterSpacing: "-0.025em", lineHeight: "1.05" }}
        >
          BM · 3년 매출 · 경쟁비교
        </h1>
        <p className="mt-4 text-sm sm:text-base text-ink/65 max-w-3xl leading-[1.85]" style={{ wordBreak: "keep-all" }}>
          서류평가 <strong>발전가능성(15점)</strong>의 핵심 질문 — &quot;투자유치·매출 창출 가능성이 있으며 국내외 유망기업으로 성장할 수 있는가&quot; — 에 대한 정량 답변입니다.
          비즈니스 모델 캔버스 9블록, 3년 매출 시뮬레이션, 경쟁사 비교, TAM/SAM/SOM 분석을 한 화면에 제시합니다.
        </p>
      </header>

      {/* TAM/SAM/SOM */}
      <section className="grid sm:grid-cols-3 gap-px bg-gold-leaf/20 rounded-sm overflow-hidden shadow-ink-sm mb-12">
        <Market
          label="TAM"
          subLabel="Total Addressable"
          value="678억"
          unit="원/년"
          body="전국 226개 시·군·구 × 평균 라이선스 3,000만원/년"
          accent="#0A1628"
        />
        <Market
          label="SAM"
          subLabel="Serviceable Available"
          value="8억"
          unit="원/년"
          body="경기 31개 시·군 + 도청 = 32곳 × 평균 2,500만원/년"
          accent="#C4873B"
        />
        <Market
          label="SOM"
          subLabel="Serviceable Obtainable · Y3"
          value="3.0억"
          unit="원/년"
          body="15개 시·군 + 도청 통합 — 기본 시나리오(3년 누적 3.05억) 기준 보수 산정"
          accent="#166534"
        />
      </section>

      {/* BM Canvas */}
      <section className="mb-14">
        <div
          className="text-[9px] font-bold tracking-[0.14em] uppercase mb-5"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
        >
          비즈니스 모델 캔버스 (9블록)
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {BM_BLOCKS.map((b) => (
            <article
              key={b.title}
              className="rounded-sm border bg-paper p-5 shadow-ink-sm"
              style={{
                borderColor: "rgba(196,135,59,0.22)",
                borderTopWidth: "3px",
                borderTopColor: b.tone === "key" ? "#1E40AF" : "#C4873B",
              }}
            >
              <div
                className="text-[9px] font-bold tracking-widest uppercase mb-3"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  color: b.tone === "key" ? "#1E40AF" : "#C4873B",
                }}
              >
                {b.title}
              </div>
              <ul className="space-y-1.5 text-sm text-ink/70" style={{ wordBreak: "keep-all", lineHeight: "1.7" }}>
                {b.items.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <span style={{ color: "#C4873B" }}>—</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Revenue */}
      <section className="mb-14">
        <div
          className="text-[9px] font-bold tracking-[0.14em] uppercase mb-5"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
        >
          3년 매출 시뮬레이션 (단위: 만원)
        </div>

        <div className="rounded-sm border overflow-hidden shadow-ink-sm" style={{ borderColor: "rgba(196,135,59,0.25)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#0A1628" }}>
                {["시나리오", "SAM 점유", "Y1 (2026)", "Y2 (2027)", "Y3 (2028)", "3년 누적", "전제 조건"].map((h) => (
                  <th
                    key={h}
                    className="py-3 px-3 text-[10px] uppercase tracking-widest text-gold-leaf text-left"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SCENARIOS.map((s) => {
                const bg = s.key === "base" ? "#FFFBEB" : s.key === "aggressive" ? "#F4ECE0" : "#FBF7F0";
                const accent = s.key === "base" ? "#C4873B" : s.key === "aggressive" ? "#166534" : "#6b7280";
                return (
                  <tr key={s.key} className="border-t" style={{ borderColor: "rgba(196,135,59,0.15)", backgroundColor: bg }}>
                    <td className="py-3 px-3">
                      <div className="font-black text-ink" style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "1rem", color: accent }}>
                        {s.label}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-ink/80" style={{ fontFamily: "JetBrains Mono, monospace" }}>{s.share}</td>
                    {s.rows.map((r) => (
                      <td key={r.year} className="py-3 px-3 text-right text-ink/80" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                        {r.total.toLocaleString()}
                      </td>
                    ))}
                    <td className="py-3 px-3 text-right">
                      <span className="font-black text-ink" style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: s.key === "base" ? "1.15rem" : "1rem" }}>
                        {s.cumulative.toLocaleString()}
                      </span>
                      <span className="ml-1 text-[10px] text-ink/45">만원</span>
                    </td>
                    <td className="py-3 px-3 text-xs text-ink/65" style={{ wordBreak: "keep-all", lineHeight: "1.5" }}>
                      {s.precondition}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-ink/50 leading-[1.7]" style={{ wordBreak: "keep-all" }}>
          * 자가평가 점수는 <strong style={{ color: "#C4873B" }}>② 기본 시나리오 (3.05억 누적)</strong> 기준 산출. 평가위원 검증 가능하도록 보수·기본·도전 3안 병행 공개.
          가정: 시·군 평균 라이선스 2,000만원/년, 컨설팅 평균 1,000만원/건, B2B 위젯 월 50만원/사. GBSA 후속지원·도청 PoC MOU 시 도전 시나리오 가능.
        </p>
      </section>

      {/* Competitor matrix */}
      <section className="mb-14">
        <div
          className="text-[9px] font-bold tracking-[0.14em] uppercase mb-5"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
        >
          경쟁사 비교 — 4개 기존 솔루션 대비 GRI 차별점
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {COMPETITORS.map((c) => (
            <article
              key={c.name}
              className="rounded-sm border bg-paper p-5 shadow-ink-sm"
              style={{ borderColor: "rgba(196,135,59,0.22)" }}
            >
              <div className="flex items-baseline justify-between mb-3">
                <h3
                  className="font-bold text-ink text-base"
                  style={{ fontFamily: "Fraunces, Georgia, serif" }}
                >
                  {c.name}
                </h3>
                <span
                  className="text-[10px] text-ink/45"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  {c.type}
                </span>
              </div>

              <div className="mb-3">
                <div
                  className="text-[9px] font-bold mb-1.5"
                  style={{ fontFamily: "JetBrains Mono, monospace", color: "#166534", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  강점
                </div>
                <ul className="text-xs text-ink/65 space-y-1">
                  {c.strengths.map((s, i) => (
                    <li key={i} className="flex gap-1.5">
                      <span style={{ color: "#166534" }}>+</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div
                  className="text-[9px] font-bold mb-1.5"
                  style={{ fontFamily: "JetBrains Mono, monospace", color: "#B91C1C", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  GRI가 메우는 공백
                </div>
                <ul className="text-xs text-ink/65 space-y-1">
                  {c.gaps.map((g, i) => (
                    <li key={i} className="flex gap-1.5">
                      <span style={{ color: "#B91C1C" }}>→</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div
          className="mt-5 rounded-sm border-l-4 p-5"
          style={{ borderLeftColor: "#1E40AF", backgroundColor: "#EFF6FF", borderTop: "1px solid rgba(196,135,59,0.15)", borderRight: "1px solid rgba(196,135,59,0.15)", borderBottom: "1px solid rgba(196,135,59,0.15)" }}
        >
          <div
            className="text-[9px] font-bold tracking-widest uppercase mb-2"
            style={{ fontFamily: "JetBrains Mono, monospace", color: "#1E40AF" }}
          >
            GRI 3대 차별점 (UVP)
          </div>
          <ul className="space-y-1.5 text-sm text-ink/75 leading-[1.8]" style={{ wordBreak: "keep-all" }}>
            <li><strong>① AI 자동 분류 + 정량 GRI 지수:</strong> 시민 제보·공공데이터를 결합해 0~95 정량 점수로 환산 (경쟁사 부재).</li>
            <li><strong>② GRI 본체 + 주거 윈도우 위계:</strong> 도청·시·군(B2G 본체)과 도민(주거 윈도우·인지도 채널)이 동일 데이터를 다른 UX로 사용 (경쟁사 단일 채널).</li>
            <li><strong>③ 외부 검증 가능성:</strong> /data 카탈로그·/eval 정확도 라이브 측정 페이지 공개 (경쟁사 블랙박스).</li>
          </ul>
        </div>
      </section>

      {/* Roadmap milestones (concise) */}
      <section className="mb-14">
        <div
          className="text-[9px] font-bold tracking-[0.14em] uppercase mb-5"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
        >
          12개월 로드맵 (Y1)
        </div>
        <div className="space-y-3">
          {[
            { tag: "M0", title: "2026.07 — 통합본선 진출 + GBSA 멘토링", desc: "본선 통과 시 컨설팅 + 1,500만원 시상금 → 운영비 확보" },
            { tag: "M1", title: "2026.08 — 화성/부천 시청 파일럿 MOU 추진", desc: "프렉탈 신청서·86건 수상 이력으로 시·군 정책담당자 초기 미팅 3건 확정" },
            { tag: "M2", title: "2026.10 — 첫 유료 라이선스 (1,500만원/연)", desc: "파일럿 시 1곳 SaaS 1년 계약 + 분기 정책 보고서 자동 발행" },
            { tag: "M3", title: "2026.12 — 골든셋 100건 확장 + 멀티에이전트 출시", desc: "Opus 4.8 + Sonnet 4.6 합의 → 정확도 95%+ · 가점 5점 후속 검증" },
            { tag: "M4", title: "2027.03 — 시·군 5곳 확장 + 도청 PoC", desc: "Y2 매출 1.36억 목표 — 도청 통합 라이선스 1차 미팅" },
            { tag: "M5", title: "2027.09 — 시·군 다지역 확산 + 단계적 투자 검토", desc: "Y2 종료 시점 BEP 가시화 후 실증 성과에 연동해 투자 유치 검토 (경기 IBK·신용보증재단·GBSA 후속지원 연계)" },
          ].map(({ tag, title, desc }) => (
            <div
              key={tag}
              className="rounded-sm border-l-4 p-4"
              style={{ borderLeftColor: "#C4873B", backgroundColor: "#FFFBEB", borderTop: "1px solid rgba(196,135,59,0.15)", borderRight: "1px solid rgba(196,135,59,0.15)", borderBottom: "1px solid rgba(196,135,59,0.15)" }}
            >
              <div className="flex items-center gap-3 mb-1">
                <span
                  className="px-2 py-0.5 rounded-sm text-[10px] font-bold"
                  style={{ backgroundColor: "#C4873B", color: "#0A1628", fontFamily: "JetBrains Mono, monospace" }}
                >
                  {tag}
                </span>
                <span
                  className="font-bold text-ink"
                  style={{ fontFamily: "Fraunces, Georgia, serif" }}
                >
                  {title}
                </span>
              </div>
              <p className="text-sm text-ink/60 ml-12" style={{ wordBreak: "keep-all", lineHeight: "1.7" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="text-center pt-8 border-t border-gold-leaf/25">
        <p className="text-xs text-ink/45 leading-[1.7]" style={{ fontFamily: "JetBrains Mono, monospace" }}>
          본 사업화 자료는 응모 단계 시뮬레이션이며, 통합본선 진출 시 외부 회계검증·고객 인터뷰 결과로 업데이트됩니다.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            href="/data"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-sm font-bold text-sm border"
            style={{ borderColor: "rgba(196,135,59,0.35)", color: "#0A1628", fontFamily: "Fraunces, Georgia, serif" }}
          >
            데이터 카탈로그 →
          </Link>
          <Link
            href="/eval"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-sm font-bold text-sm border"
            style={{ borderColor: "rgba(196,135,59,0.35)", color: "#0A1628", fontFamily: "Fraunces, Georgia, serif" }}
          >
            AI 정확도 검증 →
          </Link>
          <Link
            href="/report"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-sm text-paper font-bold text-sm"
            style={{ backgroundColor: "#0A1628", fontFamily: "Fraunces, Georgia, serif" }}
          >
            제보 시연하기 →
          </Link>
        </div>
      </footer>
    </div>
  );
}

function Market({
  label,
  subLabel,
  value,
  unit,
  body,
  accent,
}: {
  label: string;
  subLabel: string;
  value: string;
  unit: string;
  body: string;
  accent: string;
}) {
  return (
    <div className="bg-paper p-6 flex flex-col">
      <div
        className="text-[10px] font-bold mb-1"
        style={{ fontFamily: "JetBrains Mono, monospace", color: accent, letterSpacing: "0.14em" }}
      >
        {label}
      </div>
      <div
        className="text-[9px] text-ink/40 mb-3"
        style={{ fontFamily: "JetBrains Mono, monospace" }}
      >
        {subLabel}
      </div>
      <div className="flex items-baseline gap-1.5 mb-3">
        <span
          className="text-4xl font-black text-ink"
          style={{ fontFamily: "Fraunces, Georgia, serif" }}
        >
          {value}
        </span>
        <span className="text-sm text-ink/45">{unit}</span>
      </div>
      <p className="text-xs text-ink/60 leading-[1.7]" style={{ wordBreak: "keep-all" }}>{body}</p>
    </div>
  );
}
