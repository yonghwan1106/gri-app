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
      <section className="contour-bg relative overflow-hidden min-h-[88vh] flex flex-col justify-center" style={{ background: 'linear-gradient(135deg, #0A1628 0%, #102040 55%, #1a3464 100%)' }}>
        {/* Contour SVG overlay */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none select-none">
          <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
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
                  MVP v0.1 · 2026 KOREA LBS 스타트업 챌린지
                </span>
              </div>

              {/* Main headline */}
              <h1
                className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.95] text-paper animate-reveal-up"
                style={{ fontFamily: 'Fraunces, Georgia, serif', fontOpticalSizing: 'auto', animationDelay: '0.1s', animationFillMode: 'both' }}
              >
                Blue<span style={{ color: '#C4873B' }}>Spot</span>
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
                  GeoJournalism, 사각지대를 발굴하다
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
                BlueSpot은 <strong className="text-paper font-semibold">AI × LBS × Journalism</strong>을 통합한
                사각지대 발굴 SaaS입니다. 경기·인천 41개 시·군·구의 의료·교통·복지·행정 사각을
                시민 제보와 AI 교차검증으로 매핑하고, 솔루션 저널리즘으로 다음 단계의 변화를 만듭니다.
              </p>

              {/* CTA buttons */}
              <div className="mt-8 flex flex-wrap gap-4 animate-reveal-up" style={{ animationDelay: '0.45s', animationFillMode: 'both' }}>
                <Link
                  href="/map"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold-leaf text-ink font-bold text-sm rounded-sm hover:bg-gold-accent transition-colors"
                  style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                >
                  지도에서 사각지대 보기
                  <span className="text-xs">→</span>
                </Link>
                <Link
                  href="/report"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-paper/25 text-paper/80 font-medium text-sm rounded-sm hover:border-gold-leaf hover:text-gold-leaf transition-colors"
                  style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                >
                  독자투고 — 제보하기
                </Link>
              </div>
            </div>

            {/* Right: Mini map infographic — 경기·인천 grid */}
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

      {/* ── CATEGORIES — Magazine section index ── */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="section-tag">섹션 인덱스</span>
            <h2
              className="mt-2 text-3xl sm:text-4xl font-bold text-ink"
              style={{ fontFamily: 'Fraunces, Georgia, serif', letterSpacing: '-0.025em' }}
            >
              12개 카테고리로 본 사각지대
            </h2>
            <p className="mt-2 text-sm text-ink/55 max-w-xl" style={{ wordBreak: 'keep-all' }}>
              의료·교통·복지·행정 4개 카테고리는 BSI 점수와 보도 사례 상세 페이지를 제공합니다.
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <span className="page-folio">경기·인천 41개 시·군·구</span>
          </div>
        </div>

        {/* Gold divider */}
        <div className="mb-8 flex items-center gap-2">
          <span className="h-px flex-1 bg-gold-leaf/35" />
        </div>

        <CategoryGrid />
      </section>

      {/* ── ARTICLES — 솔루션 저널리즘 ── */}
      <section className="bg-paper-warm border-t border-gold-leaf/20">
        <div className="mx-auto max-w-7xl px-4 py-14">
          {/* Section header */}
          <div className="flex items-end justify-between mb-2">
            <span className="section-tag">솔루션 저널리즘</span>
          </div>
          <div className="flex items-end justify-between mb-8 mt-2">
            <h2
              className="text-3xl sm:text-4xl font-bold text-ink"
              style={{ fontFamily: 'Fraunces, Georgia, serif', letterSpacing: '-0.025em' }}
            >
              최근 경인블루저널 보도
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
                  style={{ backgroundColor: idx === 0 ? '#B91C1C' : idx === 1 ? '#1E40AF' : '#166534' }}
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
                      <span>제보 {a.spotCount}건</span>
                      <span className="text-gold-leaf group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY BLUESPOT — 3 pillars ── */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="text-center mb-12">
          <span className="section-tag">플랫폼 비전</span>
          <h2
            className="mt-3 text-3xl sm:text-4xl font-bold text-ink"
            style={{ fontFamily: 'Fraunces, Georgia, serif', letterSpacing: '-0.025em' }}
          >
            왜 BlueSpot인가
          </h2>
        </div>

        <div className="grid gap-px sm:grid-cols-3 bg-gold-leaf/20 rounded-sm overflow-hidden shadow-ink-sm">
          <Pillar
            num="01"
            title="AI 교차검증"
            body="시민 제보를 Claude Opus 4가 자동 분류·우선순위 산출. 공공데이터와 교차 검증해 BSI 점수를 계산합니다."
            accent="#1E40AF"
          />
          <Pillar
            num="02"
            title="LBS 지도화"
            body="경기·인천 41개 시·군·구 + 12개 카테고리 사각지대를 위경도 기반으로 시각화. 동네 단위 의사결정에 즉시 활용됩니다."
            accent="#C4873B"
          />
          <Pillar
            num="03"
            title="솔루션 저널리즘"
            body="단순 고발이 아닌 '다음 단계'를 함께 설계. 경인블루저널 명의로 지자체·시민과 동시 협업합니다."
            accent="#166534"
          />
        </div>

        <div className="mt-8 pt-6 border-t border-gold-leaf/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-sm text-ink/50">운영 · 경인블루저널 (박용환 대표)</span>
          <Link
            href="/about"
            className="btn-editorial text-sm"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            발행정보 · 팀과 비전 →
          </Link>
        </div>
      </section>
    </div>
  );
}

function MiniMapInfographic() {
  // Simplified 경기·인천 region grid visualization
  const regions = [
    { name: "수원", bsi: 87, x: 52, y: 68 },
    { name: "화성", bsi: 83, x: 38, y: 78 },
    { name: "인천", bsi: 78, x: 18, y: 42 },
    { name: "고양", bsi: 72, x: 42, y: 22 },
    { name: "용인", bsi: 71, x: 62, y: 75 },
    { name: "김포", bsi: 71, x: 24, y: 32 },
    { name: "안산", bsi: 68, x: 30, y: 65 },
    { name: "안양", bsi: 65, x: 46, y: 60 },
    { name: "부천", bsi: 63, x: 30, y: 50 },
    { name: "평택", bsi: 61, x: 52, y: 88 },
    { name: "성남", bsi: 58, x: 58, y: 62 },
    { name: "의정부", bsi: 55, x: 58, y: 16 },
    { name: "강화", bsi: 78, x: 8,  y: 28 },
    { name: "파주", bsi: 52, x: 32, y: 10 },
    { name: "광주", bsi: 49, x: 70, y: 68 },
  ];

  const bsiToColor = (bsi: number) => {
    if (bsi >= 80) return "#B91C1C";
    if (bsi >= 70) return "#C4873B";
    if (bsi >= 60) return "#FCD34D";
    return "#166534";
  };

  const bsiToRadius = (bsi: number) => 4 + (bsi / 95) * 10;

  return (
    <div
      className="relative rounded-sm border p-4"
      style={{ borderColor: 'rgba(196,135,59,0.3)', background: 'rgba(10,22,40,0.5)', backdropFilter: 'blur(4px)' }}
    >
      {/* Map header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-gold-leaf tracking-widest uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          경기·인천 사각지대 분포도
        </span>
        <span className="text-[10px] text-paper/30" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          N=100 spots
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
            {r.bsi >= 80 && (
              <circle r={bsiToRadius(r.bsi) + 4} fill="none" stroke={bsiToColor(r.bsi)} strokeWidth="0.5" opacity="0.4">
                <animate attributeName="r" values={`${bsiToRadius(r.bsi)}; ${bsiToRadius(r.bsi) + 8}; ${bsiToRadius(r.bsi)}`} dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6; 0; 0.6" dur="3s" repeatCount="indefinite" />
              </circle>
            )}
            <circle
              r={bsiToRadius(r.bsi)}
              fill={bsiToColor(r.bsi)}
              fillOpacity="0.85"
              stroke="#FBF7F0"
              strokeWidth="0.5"
            />
            <text
              y={bsiToRadius(r.bsi) + 4.5}
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
