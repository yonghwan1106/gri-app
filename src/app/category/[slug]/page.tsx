import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, getCategory, type CategorySlug } from "@/data/categories";
import { getSpotsByCategory } from "@/data/mockSpots";
import { REGIONS } from "@/data/mockRegions";
import { ARTICLES } from "@/data/mockArticles";
import { BsiBadge } from "@/components/BsiBadge";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return CATEGORIES.filter((c) => c.hasDetailPage).map((c) => ({ slug: c.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return { title: "찾을 수 없음 — BlueSpot" };
  return {
    title: `${cat.label} 사각지대 — BlueSpot`,
    description: cat.description,
  };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat || !cat.hasDetailPage) return notFound();

  const spots = getSpotsByCategory(cat.slug as CategorySlug);
  const totalReporters = spots.reduce((s, x) => s + x.reporters, 0);
  const avgBsi = spots.length
    ? Math.round(spots.reduce((s, x) => s + x.bsi, 0) / spots.length)
    : 0;
  const criticalCount = spots.filter((s) => s.bsi >= 80).length;
  const relatedArticles = ARTICLES.filter((a) => a.category === cat.label);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Section hero — 잡지 섹션 도입부 */}
      <div
        className="relative rounded-sm overflow-hidden mb-10"
        style={{ background: "linear-gradient(135deg, #0A1628 0%, #102040 60%, #1a3464 100%)" }}
      >
        {/* Contour overlay */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
          <svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <g fill="none" stroke="#C4873B" strokeWidth="0.8">
              <ellipse cx="650" cy="150" rx="280" ry="160"/>
              <ellipse cx="650" cy="150" rx="230" ry="128"/>
              <ellipse cx="650" cy="150" rx="180" ry="98"/>
              <ellipse cx="650" cy="150" rx="130" ry="68"/>
              <ellipse cx="650" cy="150" rx="80"  ry="40"/>
              <line x1="0" y1="75"  x2="800" y2="75"  strokeDasharray="3,12"/>
              <line x1="0" y1="150" x2="800" y2="150" strokeDasharray="3,12"/>
              <line x1="0" y1="225" x2="800" y2="225" strokeDasharray="3,12"/>
              <line x1="200" y1="0" x2="200" y2="300" strokeDasharray="3,12"/>
              <line x1="400" y1="0" x2="400" y2="300" strokeDasharray="3,12"/>
            </g>
          </svg>
        </div>

        <div className="relative z-10 p-7 sm:p-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-gold-leaf/60 hover:text-gold-leaf transition-colors text-[10px] tracking-widest uppercase mb-5"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            ← 전체 섹션 인덱스
          </Link>

          <div className="flex items-start gap-5">
            <span className="text-5xl sm:text-6xl">{cat.emoji}</span>
            <div className="flex-1">
              {/* Section tag */}
              <div
                className="text-[9px] tracking-[0.18em] uppercase mb-2"
                style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
              >
                섹션 — {cat.label}
              </div>

              <h1
                className="text-3xl sm:text-5xl font-black text-paper leading-none"
                style={{ fontFamily: "Fraunces, Georgia, serif", letterSpacing: "-0.03em" }}
              >
                {cat.label}
                <span style={{ color: "#C4873B" }}> 사각지대</span>
              </h1>

              {/* Gold underline */}
              <div className="mt-3 h-px w-24 bg-gold-leaf/60" />

              <p className="mt-3 text-paper/60 text-sm max-w-xl" style={{ wordBreak: "keep-all" }}>
                {cat.description}
              </p>
            </div>
          </div>

          {/* KPI bar */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { label: "등록 사각지대", value: spots.length, suffix: "건" },
              { label: "시민 제보 합계", value: totalReporters, suffix: "명" },
              { label: "심각(BSI 80+)", value: criticalCount, suffix: "건" },
            ].map(({ label, value, suffix }) => (
              <div
                key={label}
                className="rounded-sm p-4"
                style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(196,135,59,0.2)" }}
              >
                <div
                  className="text-[9px] mb-1"
                  style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B", letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  {label}
                </div>
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-2xl font-black text-paper"
                    style={{ fontFamily: "Fraunces, Georgia, serif" }}
                  >
                    {value.toLocaleString()}
                  </span>
                  <span
                    className="text-xs text-paper/40"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {suffix}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span
              className="px-3 py-1 rounded-sm text-xs"
              style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", fontFamily: "JetBrains Mono, monospace" }}
            >
              평균 BSI <strong className="text-paper">{avgBsi}</strong>점
            </span>
            <span
              className="px-3 py-1 rounded-sm text-xs font-bold"
              style={{ backgroundColor: "#C4873B", color: "#0A1628", fontFamily: "JetBrains Mono, monospace" }}
            >
              경기·인천 41개 시·군·구 적용
            </span>
          </div>
        </div>
      </div>

      {/* Main grid: spots list + sidebar */}
      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div>
          {/* Examples */}
          <section className="mb-10">
            <div
              className="text-[9px] font-bold tracking-[0.14em] uppercase mb-4"
              style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
            >
              대표 사례
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {cat.examples.map((ex, i) => (
                <div
                  key={i}
                  className="rounded-sm border bg-paper p-4 shadow-ink-sm"
                  style={{ borderColor: "rgba(196,135,59,0.22)", borderTopWidth: "3px", borderTopColor: cat.color }}
                >
                  <div
                    className="text-[9px] font-bold mb-2"
                    style={{ fontFamily: "JetBrains Mono, monospace", color: cat.color }}
                  >
                    사례 {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="text-sm text-ink leading-snug">{ex}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Spots list */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div
                className="text-[9px] font-bold tracking-[0.14em] uppercase"
                style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
              >
                BSI 상위 사각지대 — 상위 {Math.min(15, spots.length)}건
              </div>
              <Link
                href="/map"
                className="text-[10px] text-blue-deep hover:underline"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                전체 지도 →
              </Link>
            </div>

            <div
              className="rounded-sm border bg-paper shadow-ink-sm overflow-hidden"
              style={{ borderColor: "rgba(196,135,59,0.22)" }}
            >
              {spots.slice(0, 15).map((s, idx) => {
                const region = REGIONS.find((r) => r.id === s.regionId);
                return (
                  <div
                    key={s.id}
                    className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between border-b last:border-b-0"
                    style={{ borderColor: "rgba(196,135,59,0.12)" }}
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <span
                        className="text-[9px] font-bold mt-0.5 w-6 shrink-0 text-right"
                        style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="px-1.5 py-0.5 rounded-sm text-paper text-[9px] font-bold"
                            style={{ backgroundColor: "#0A1628", fontFamily: "JetBrains Mono, monospace" }}
                          >
                            {region?.province} {region?.name}
                          </span>
                          <span
                            className="text-[9px]"
                            style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(10,22,40,0.35)" }}
                          >
                            {s.status} · {formatDate(s.reportedAt)}
                          </span>
                        </div>
                        <div className="font-medium text-ink text-sm">{s.title}</div>
                        <div
                          className="text-[9px] mt-0.5"
                          style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(10,22,40,0.35)" }}
                        >
                          시민 {s.reporters}명 제보
                        </div>
                      </div>
                    </div>
                    <BsiBadge score={s.bsi} />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <section className="mt-10">
              <div
                className="text-[9px] font-bold tracking-[0.14em] uppercase mb-5"
                style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
              >
                관련 솔루션 저널리즘 보도
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedArticles.map((a) => (
                  <Link
                    key={a.id}
                    href={`/article/${a.id}`}
                    className="card-editorial group rounded-sm border bg-paper p-5 shadow-ink-sm overflow-hidden"
                    style={{ borderColor: "rgba(196,135,59,0.22)", borderTopWidth: "3px", borderTopColor: "#C4873B" }}
                  >
                    <div
                      className="text-[9px] mb-2"
                      style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(10,22,40,0.4)" }}
                    >
                      {a.region} · {formatDate(a.publishedAt)}
                    </div>
                    <h3
                      className="font-bold leading-snug text-ink group-hover:text-blue-deep transition-colors"
                      style={{ fontFamily: "Fraunces, Georgia, serif" }}
                    >
                      {a.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-ink/55">{a.summary}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <BsiBadge score={a.bsi} size="sm" />
                      <span
                        className="text-[10px]"
                        style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
                      >
                        {a.reporter}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar — vintage map miniature + CTA */}
        <aside className="space-y-5">
          {/* Mini map sidebar */}
          <div
            className="rounded-sm border overflow-hidden"
            style={{ borderColor: "rgba(196,135,59,0.25)", backgroundColor: "#0A1628" }}
          >
            <div className="px-4 py-3 border-b" style={{ borderColor: "rgba(196,135,59,0.2)" }}>
              <span
                className="text-[9px] tracking-widest uppercase text-gold-leaf"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                경기·인천 분포
              </span>
            </div>
            <div className="p-3">
              <svg viewBox="0 0 100 100" className="w-full" style={{ height: "180px" }}>
                <g stroke="#C4873B" strokeWidth="0.3" fill="none" opacity="0.3" strokeDasharray="1,4">
                  {[25,50,75].map(v=>(
                    <g key={v}>
                      <line x1={v} y1="0" x2={v} y2="100"/>
                      <line x1="0" y1={v} x2="100" y2={v}/>
                    </g>
                  ))}
                </g>
                {spots.slice(0, 20).map((s, i) => {
                  const nx = ((s.lng - 126.5) / 2.5) * 100;
                  const ny = (1 - (s.lat - 36.8) / 2.2) * 100;
                  const r = 3 + (s.bsi / 95) * 6;
                  const color = s.bsi >= 80 ? "#B91C1C" : s.bsi >= 60 ? "#C4873B" : "#FCD34D";
                  return (
                    <circle
                      key={i}
                      cx={Math.max(5, Math.min(95, nx))}
                      cy={Math.max(5, Math.min(95, ny))}
                      r={r}
                      fill={color}
                      fillOpacity="0.8"
                      stroke="#FBF7F0"
                      strokeWidth="0.5"
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* CTA */}
          <div
            className="rounded-sm border p-5 bg-paper"
            style={{ borderColor: "rgba(196,135,59,0.25)" }}
          >
            <h3
              className="font-bold text-ink text-base mb-2"
              style={{ fontFamily: "Fraunces, Georgia, serif" }}
            >
              내 동네 {cat.label} 사각지대를 알려주세요
            </h3>
            <p className="text-xs text-ink/50 mb-4" style={{ wordBreak: "keep-all" }}>
              시민의 제보가 다음 보도와 정책을 만듭니다.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/report"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm text-sm font-bold text-paper transition-colors"
                style={{ backgroundColor: "#0A1628", fontFamily: "Fraunces, Georgia, serif" }}
              >
                제보하기
              </Link>
              <Link
                href="/map"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm text-sm font-medium transition-colors border"
                style={{ borderColor: "rgba(196,135,59,0.3)", color: "#0A1628", fontFamily: "Fraunces, Georgia, serif" }}
              >
                전체 지도 보기
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
