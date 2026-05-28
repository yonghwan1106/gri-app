import Link from "next/link";
import { CategoryGrid } from "@/components/CategoryGrid";
import { StatsRow } from "@/components/StatsRow";
import { ARTICLES } from "@/data/mockArticles";
import { BsiBadge } from "@/components/BsiBadge";
import { formatDate } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="relative">
      {/* ── HERO — 잡지 표지 ── */}
      <section className="contour-bg relative overflow-hidden min-h-[88vh] flex flex-col justify-center" style={{ background: 'linear-gradient(135deg, #001E3C 0%, #003876 55%, #1E5AA8 100%)' }}>
        {/* Contour SVG overlay — must be sized to 100% to not push hero height */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none select-none" style={{ overflow: 'hidden' }}>
          <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <g fill="none" stroke="#C4873B" strokeWidth="0.8">
              <ellipse cx="600" cy="300" rx="350" ry="260"/>
              <ellipse cx="600" cy="300" rx="300" ry="218"/>
              <ellipse cx="600" cy="300" rx="250" ry="176"/>
              <ellipse cx="600" cy="300" rx="200" ry="134"/>
              <ellipse cx="600" cy="300" rx="150" ry="94"/>
              <ellipse cx="600" cy="300" rx="100" ry="58"/>
              <ellipse cx="600" cy="300" rx="55" ry="32"/>
              <ellipse cx="150" cy="120" rx="120" ry="90"/>
              <ellipse cx="150" cy="120" rx="85"  ry="62"/>
              <ellipse cx="150" cy="120" rx="50"  ry="36"/>
              <line x1="0" y1="150" x2="800" y2="150" strokeDasharray="3,12"/>
              <line x1="0" y1="300" x2="800" y2="300" strokeDasharray="3,12"/>
              <line x1="0" y1="450" x2="800" y2="450" strokeDasharray="3,12"/>
              <line x1="200" y1="0" x2="200" y2="600" strokeDasharray="3,12"/>
              <line x1="400" y1="0" x2="400" y2="600" strokeDasharray="3,12"/>
              <line x1="600" y1="0" x2="600" y2="600" strokeDasharray="3,12"/>
            </g>
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Hero text */}
            <div>
              {/* Edition badge */}
              <div
                className="inline-flex items-center gap-2 mb-6 animate-reveal-fade"
                style={{ animationDelay: '0.05s', animationFillMode: 'both' }}
              >
                <span className="h-px w-8 bg-gold-leaf" />
                <span
                  className="text-[10px] tracking-[0.18em] uppercase text-gold-leaf font-bold"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  MVP v0.1 · 2026 경기도 공공데이터·AI 창업경진대회
                </span>
              </div>

              {/* Main headline */}
              <h1
                className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.95] text-paper animate-reveal-up"
                style={{ fontFamily: 'Fraunces, Georgia, serif', fontOpticalSizing: 'auto', animationDelay: '0.1s', animationFillMode: 'both' }}
              >
                G<span style={{ color: '#C4873B' }}>R</span>I
              </h1>

              {/* Subtitle */}
              <div
                className="mt-4 animate-reveal-up"
                style={{ animationDelay: '0.22s', animationFillMode: 'both' }}
              >
                <p
                  className="text-[clamp(1rem,2.5vw,1.4rem)] text-paper/70 leading-snug"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontStyle: 'italic' }}
                >
                  Gyeonggi Risk Index · 정책 위험도, AI가 5초에 진단한다
                </p>
              </div>

              {/* Gold divider */}
              <div className="my-7 flex items-center gap-3 animate-reveal-fade" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                <span className="h-px flex-1 bg-gold-leaf/40" />
                <span className="text-gold-leaf text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>◆</span>
                <span className="h-px flex-1 bg-gold-leaf/40" />
              </div>

              {/* Description */}
              <p
                className="text-sm sm:text-base text-paper/65 leading-[1.8] max-w-lg animate-reveal-up"
                style={{ animationDelay: '0.35s', animationFillMode: 'both', wordBreak: 'keep-all' }}
              >
                GRI는 <strong className="text-paper font-semibold">경기 공공데이터 × Claude Opus 4.7 × Multi-Agent</strong>를 결합한
                정책 위험도 지수 플랫폼입니다. 31개 시·군 × 7대 카테고리를 AI가 자동 진단하는
                GRI 본체(B2G)이며, 주거 카테고리 한 칸을 도민에게 전세사기 위험도로 5초 만에 미리 공개하는 주거 윈도우(B2C 인지도)를 함께 운영합니다.
              </p>

              {/* CTA buttons */}
              <div className="mt-8 flex flex-wrap gap-4 animate-reveal-up" style={{ animationDelay: '0.45s', animationFillMode: 'both' }}>
                <Link
                  href="/map"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold-leaf text-ink font-bold text-sm rounded-sm hover:bg-gold-accent transition-colors"
                  style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                >
                  정책 위험도 지도 보기
                  <span className="text-xs">→</span>
                </Link>
                <Link
                  href="/jeonse"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-paper/25 text-paper/80 font-medium text-sm rounded-sm hover:border-gold-leaf hover:text-gold-leaf transition-colors"
                  style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                >
                  전세사기 즉시 조회 →
                </Link>
              </div>
            </div>

            {/* Right: Mini map infographic — 경기 31개 시·군 grid */}
            <div className="animate-reveal-fade" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
              <MiniMapInfographic />
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce opacity-50">
          <span className="text-[10px] text-paper/40 tracking-widest uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Scroll</span>
          <span className="h-8 w-px bg-paper/20" />
        </div>
      </section>

      {/* ── STATS ROW ── */}
      <section className="bg-paper-warm border-y border-gold-leaf/20">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <StatsRow />
        </div>
      </section>

      {/* ── CATEGORIES — 7 policy categories ── */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="section-tag">정책 진단 인덱스</span>
            <h2
              className="mt-2 text-3xl sm:text-4xl font-bold text-ink"
              style={{ fontFamily: 'Fraunces, Georgia, serif', letterSpacing: '-0.025em' }}
            >
              7개 정책 카테고리로 본 위험도
            </h2>
            <p className="mt-2 text-sm text-ink/55 max-w-xl" style={{ wordBreak: 'keep-all' }}>
              의료·교통·장애·대기·주거·안전·교육 — 경기 공공데이터 15종을 결합해 시·군별 GRI 점수를 산출합니다.
              주거 안전 카테고리는 주거 윈도우(시민 전세사기 조회)까지 통합 제공합니다.
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <span className="page-folio">경기도 31개 시·군 + 3,574개 행정동</span>
          </div>
        </div>

        {/* Gold divider */}
        <div className="mb-8 flex items-center gap-2">
          <span className="h-px flex-1 bg-gold-leaf/35" />
        </div>

        <CategoryGrid />
      </section>

      {/* ── ARTICLES — 정책 진단 리포트 ── */}
      <section className="bg-paper-warm border-t border-gold-leaf/20">
        <div className="mx-auto max-w-7xl px-4 py-14">
          {/* Section header */}
          <div className="flex items-end justify-between mb-2">
            <span className="section-tag">GRI 정책 진단 리포트</span>
          </div>
          <div className="flex items-end justify-between mb-8 mt-2">
            <h2
              className="text-3xl sm:text-4xl font-bold text-ink"
              style={{ fontFamily: 'Fraunces, Georgia, serif', letterSpacing: '-0.025em' }}
            >
              최근 시·군별 위험 분석
            </h2>
            <div className="h-px flex-1 mx-6 bg-gold-leaf/25 hidden sm:block" />
          </div>

          {/* Article grid — asymmetric editorial layout */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {ARTICLES.map((a, idx) => (
              <Link
                key={a.id}
                href={`/article/${a.id}`}
                className={`card-editorial group flex flex-col rounded-sm border bg-paper shadow-ink-sm overflow-hidden${idx === 0 ? " md:col-span-2 md:row-span-1" : ""}`}
                style={{ borderColor: 'rgba(196,135,59,0.25)' }}
              >
                {/* Category bar */}
                <div
                  className="h-1"
                  style={{ backgroundColor: idx === 0 ? '#003876' : idx === 1 ? '#3498DB' : '#16A085' }}
                />
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between text-[11px] mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2 py-0.5 bg-ink text-paper font-bold rounded-sm"
                        style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '0.08em' }}
                      >
                        {a.category}
                      </span>
                      <span className="text-ink/40" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{a.region}</span>
                    </div>
                    <span className="text-ink/35" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{formatDate(a.publishedAt)}</span>
                  </div>

                  <h3
                    className={`font-bold leading-snug text-ink group-hover:text-blue-deep transition-colors${idx === 0 ? " text-xl sm:text-2xl" : " text-base"}`}
                    style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                  >
                    {a.title}
                  </h3>

                  <p className="mt-3 text-sm text-ink/60 leading-[1.75] line-clamp-3 flex-1" style={{ wordBreak: 'keep-all' }}>
                    {a.summary}
                  </p>

                  <div className="mt-5 pt-4 flex items-center justify-between border-t border-gold-leaf/20">
                    <BsiBadge score={a.bsi} size="sm" />
                    <div className="flex items-center gap-3 text-[11px] text-ink/40" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      <span>데이터 {a.spotCount}건</span>
                      <span className="text-gold-leaf group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY GRI — 3 pillars ── */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="text-center mb-12">
          <span className="section-tag">플랫폼 비전</span>
          <h2
            className="mt-3 text-3xl sm:text-4xl font-bold text-ink"
            style={{ fontFamily: 'Fraunces, Georgia, serif', letterSpacing: '-0.025em' }}
          >
            왜 GRI인가
          </h2>
        </div>

        <div className="grid gap-px sm:grid-cols-3 bg-gold-leaf/20 rounded-sm overflow-hidden shadow-ink-sm">
          <Pillar
            num="01"
            title="Multi-Agent 진단"
            body="데이터 탐색 → 위험도 평가 → 정책 추천 3단계 에이전트가 분리 동작. Claude Opus 4.7 (1M context) + RAG로 환각률 6%까지 감소."
            accent="#003876"
          />
          <Pillar
            num="02"
            title="경기 공공데이터 15종"
            body="경기데이터드림 9종 + 경기데이터분석포털 2종 + data.go.kr 4종을 결합. 모든 URL·갱신주기·라이선스를 /data 페이지에 공개해 평가위원이 외부 포털에서 직접 검증 가능합니다."
            accent="#C4873B"
          />
          <Pillar
            num="03"
            title="GRI 본체 + 주거 윈도우"
            body="도청·시군(B2G 본체)에는 위험 진단 + 자동 보고서를, 도민에게는 주거 윈도우(전세사기 즉시 조회)로 인지도를 확보하는 본체-종속 구조."
            accent="#3498DB"
          />
        </div>

        <div className="mt-8 pt-6 border-t border-gold-leaf/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-sm text-ink/50">개발 · 박용환 (크리에이티브 넥서스 / 단독)</span>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/data"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm text-[11px] font-bold border"
              style={{ fontFamily: 'JetBrains Mono, monospace', borderColor: '#1E40AF', color: '#1E40AF', backgroundColor: 'rgba(30,64,175,0.06)' }}
            >
              데이터 카탈로그 15종 →
            </Link>
            <Link
              href="/eval"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm text-[11px] font-bold border"
              style={{ fontFamily: 'JetBrains Mono, monospace', borderColor: '#166534', color: '#166534', backgroundColor: 'rgba(22,101,52,0.06)' }}
            >
              AI 정확도 88% 검증 →
            </Link>
            <Link
              href="/biz"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm text-[11px] font-bold border"
              style={{ fontFamily: 'JetBrains Mono, monospace', borderColor: '#B91C1C', color: '#B91C1C', backgroundColor: 'rgba(185,28,28,0.06)' }}
            >
              3년 매출 5.7억 →
            </Link>
            <Link
              href="/about"
              className="btn-editorial text-sm"
              style={{ fontFamily: 'Fraunces, Georgia, serif' }}
            >
              GRI 소개 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function MiniMapInfographic() {
  // 경기도 31개 시·군 중 주요 15개 GRI 진단값 (가상)
  const regions = [
    { name: "수원", gri: 78, x: 52, y: 68 },
    { name: "화성", gri: 65, x: 38, y: 78 },
    { name: "용인", gri: 71, x: 62, y: 75 },
    { name: "고양", gri: 72, x: 32, y: 22 },
    { name: "성남", gri: 58, x: 58, y: 62 },
    { name: "안산", gri: 68, x: 22, y: 65 },
    { name: "안양", gri: 65, x: 36, y: 60 },
    { name: "부천", gri: 63, x: 24, y: 50 },
    { name: "평택", gri: 81, x: 52, y: 92 },
    { name: "의정부", gri: 55, x: 50, y: 14 },
    { name: "광주", gri: 49, x: 72, y: 68 },
    { name: "파주", gri: 62, x: 28, y: 8 },
    { name: "가평", gri: 89, x: 78, y: 18 },
    { name: "연천", gri: 87, x: 48, y: 4 },
    { name: "양평", gri: 84, x: 82, y: 48 },
  ];

  const griToColor = (gri: number) => {
    if (gri >= 80) return "#B91C1C";
    if (gri >= 70) return "#C4873B";
    if (gri >= 60) return "#FCD34D";
    return "#166534";
  };

  const griToRadius = (gri: number) => 4 + (gri / 95) * 10;

  return (
    <div
      className="relative rounded-sm border p-4"
      style={{ borderColor: 'rgba(196,135,59,0.3)', background: 'rgba(0,30,60,0.5)', backdropFilter: 'blur(4px)' }}
    >
      {/* Map header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-gold-leaf tracking-widest uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          경기도 31개 시·군 GRI 분포도
        </span>
        <span className="text-[10px] text-paper/30" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          N=31 시·군
        </span>
      </div>

      {/* SVG map */}
      <svg viewBox="0 0 100 100" className="w-full" style={{ height: '280px' }}>
        {/* Graticule */}
        <g stroke="#C4873B" strokeWidth="0.2" opacity="0.3" strokeDasharray="1,4">
          {[25, 50, 75].map(v => (
            <g key={v}>
              <line x1={v} y1="0" x2={v} y2="100" />
              <line x1="0" y1={v} x2="100" y2={v} />
            </g>
          ))}
        </g>

        {/* Contour lines (stylized) */}
        <g fill="none" stroke="#C4873B" strokeWidth="0.4" opacity="0.2">
          <path d="M 20 50 Q 35 30 55 40 Q 70 50 65 70 Q 55 85 40 80 Q 25 75 20 50 Z" />
          <path d="M 25 48 Q 38 32 53 42 Q 66 52 62 68 Q 53 80 40 76 Q 28 71 25 48 Z" />
        </g>

        {/* Region markers */}
        {regions.map((r) => (
          <g key={r.name} transform={`translate(${r.x}, ${r.y})`}>
            {/* Pulse ring */}
            {r.gri >= 80 && (
              <circle r={griToRadius(r.gri) + 4} fill="none" stroke={griToColor(r.gri)} strokeWidth="0.5" opacity="0.4">
                <animate attributeName="r" values={`${griToRadius(r.gri)}; ${griToRadius(r.gri) + 8}; ${griToRadius(r.gri)}`} dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6; 0; 0.6" dur="3s" repeatCount="indefinite" />
              </circle>
            )}
            <circle
              r={griToRadius(r.gri)}
              fill={griToColor(r.gri)}
              fillOpacity="0.85"
              stroke="#FBF7F0"
              strokeWidth="0.5"
            />
            <text
              y={griToRadius(r.gri) + 4.5}
              textAnchor="middle"
              fill="#FBF7F0"
              fontSize="4"
              fontFamily="JetBrains Mono, monospace"
              opacity="0.8"
            >
              {r.name}
            </text>
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-3 flex-wrap">
        {[
          { label: "심각 80+", color: "#B91C1C" },
          { label: "주의 70+", color: "#C4873B" },
          { label: "관찰 60+", color: "#FCD34D" },
          { label: "양호",     color: "#166534" },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full inline-block" style={{ backgroundColor: color }} />
            <span className="text-[9px] text-paper/50" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pillar({ num, title, body, accent }: { num: string; title: string; body: string; accent: string }) {
  return (
    <div className="bg-paper p-6 sm:p-8 flex flex-col">
      <div
        className="text-[11px] font-bold mb-4"
        style={{ fontFamily: 'JetBrains Mono, monospace', color: accent, letterSpacing: '0.1em' }}
      >
        {num}
      </div>
      <h3
        className="text-xl font-bold text-ink mb-3"
        style={{ fontFamily: 'Fraunces, Georgia, serif' }}
      >
        {title}
      </h3>
      <div className="h-px w-8 mb-4" style={{ backgroundColor: accent }} />
      <p className="text-sm text-ink/60 leading-[1.8]" style={{ wordBreak: 'keep-all' }}>{body}</p>
    </div>
  );
}
