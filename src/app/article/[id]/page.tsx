import { notFound } from "next/navigation";
import Link from "next/link";
import { ARTICLES, getArticle } from "@/data/mockArticles";
import { BsiBadge } from "@/components/BsiBadge";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ id: a.id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const article = getArticle(id);
  if (!article) return { title: "찾을 수 없음 — BlueSpot" };
  return {
    title: `${article.title} — 경인블루저널`,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  const a = getArticle(id);
  if (!a) return notFound();

  const others = ARTICLES.filter((x) => x.id !== a.id).slice(0, 2);

  return (
    <article className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        {/* Main article column */}
        <div>
          {/* Breadcrumb */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-ink/35 hover:text-ink/70 transition-colors mb-6"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            ← 홈으로
          </Link>

          {/* Article header */}
          <header className="border-b pb-7 mb-8" style={{ borderColor: "rgba(196,135,59,0.25)" }}>
            {/* Publication meta */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span
                className="px-3 py-1 rounded-sm text-paper text-[10px] font-bold"
                style={{ backgroundColor: "#0A1628", fontFamily: "JetBrains Mono, monospace" }}
              >
                경인블루저널
              </span>
              <span
                className="px-2.5 py-1 rounded-sm text-[10px] font-bold"
                style={{ backgroundColor: "rgba(196,135,59,0.15)", color: "#C4873B", fontFamily: "JetBrains Mono, monospace" }}
              >
                {a.category}
              </span>
              <span
                className="text-[10px]"
                style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(10,22,40,0.35)" }}
              >
                {a.region} · {formatDate(a.publishedAt)}
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-2xl sm:text-4xl font-black text-ink leading-tight"
              style={{ fontFamily: "Fraunces, Georgia, serif", letterSpacing: "-0.025em", lineHeight: "1.1" }}
            >
              {a.title}
            </h1>

            {/* Subtitle — Cormorant italic */}
            <p
              className="mt-4 text-lg text-ink/60 leading-relaxed"
              style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontStyle: "italic", lineHeight: "1.6" }}
            >
              {a.subtitle}
            </p>

            {/* Byline + badges */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <BsiBadge score={a.bsi} size="lg" />
              <span
                className="px-3 py-1 rounded-sm text-[10px]"
                style={{ backgroundColor: "rgba(10,22,40,0.06)", color: "rgba(10,22,40,0.55)", fontFamily: "JetBrains Mono, monospace" }}
              >
                시민 제보 {a.spotCount}건
              </span>
              <span
                className="text-[10px]"
                style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(10,22,40,0.35)" }}
              >
                {a.reporter}
              </span>
            </div>
          </header>

          {/* Summary box */}
          <div
            className="rounded-sm border-l-4 px-5 py-4 mb-8"
            style={{ borderColor: "#C4873B", backgroundColor: "#F4ECE0" }}
          >
            <div
              className="text-[9px] font-bold tracking-widest uppercase mb-2"
              style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
            >
              기사 요약
            </div>
            <p className="text-sm text-ink/75 leading-relaxed" style={{ wordBreak: "keep-all", lineHeight: "1.8" }}>
              {a.summary}
            </p>
          </div>

          {/* Body — with drop cap on first paragraph */}
          <section className="space-y-5 mb-10">
            {a.body.map((p, i) => (
              <p
                key={i}
                className={`text-[15px] leading-[1.85] text-ink/85${i === 0 ? " drop-cap" : ""}`}
                style={{ wordBreak: "keep-all" }}
              >
                {p}
              </p>
            ))}
          </section>

          {/* Gold divider */}
          <div className="flex items-center gap-3 my-8">
            <span className="h-px flex-1 bg-gold-leaf/30" />
            <span style={{ color: "#C4873B", fontSize: "12px" }}>◆</span>
            <span className="h-px flex-1 bg-gold-leaf/30" />
          </div>

          {/* Solution box */}
          <section
            className="rounded-sm border overflow-hidden mb-8 shadow-ink-sm"
            style={{ borderColor: "rgba(196,135,59,0.25)" }}
          >
            {/* Solution header */}
            <div
              className="px-6 py-4 border-b"
              style={{ borderColor: "rgba(196,135,59,0.2)", backgroundColor: "#0A1628" }}
            >
              <div
                className="text-[9px] tracking-widest uppercase mb-1"
                style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
              >
                솔루션 저널리즘
              </div>
              <h2
                className="text-paper text-lg font-bold"
                style={{ fontFamily: "Fraunces, Georgia, serif" }}
              >
                BlueSpot 제안 — 다음 단계
              </h2>
              <p
                className="text-paper/40 text-[10px] mt-1"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                단순 고발이 아닌, 실행 가능한 해법을 제시하는 솔루션 저널리즘
              </p>
            </div>
            <div className="p-6">
              <ol className="space-y-4">
                {a.solution.map((s, i) => (
                  <li key={i} className="flex gap-4">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm text-paper text-[11px] font-bold mt-0.5"
                      style={{ backgroundColor: "#C4873B", fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm text-ink/80 leading-relaxed" style={{ wordBreak: "keep-all", lineHeight: "1.75" }}>
                      {s}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Partners */}
          <section
            className="rounded-sm p-4 mb-8 text-sm"
            style={{ backgroundColor: "#F4ECE0", border: "1px solid rgba(196,135,59,0.2)" }}
          >
            <span
              className="font-bold text-[9px] tracking-widest uppercase mr-3"
              style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
            >
              협력 파트너
            </span>
            <span className="text-ink/65">{a.partners.join(" · ")}</span>
          </section>

          {/* Article caption */}
          <div
            className="border-t pt-5 mb-10 text-[11px] text-ink/35 italic"
            style={{ borderColor: "rgba(196,135,59,0.2)", fontFamily: "Cormorant Garamond, Georgia, serif", lineHeight: "1.7" }}
          >
            본 기사는 BlueSpot AI가 발굴한 사각지대를 경인블루저널 기자가 솔루션 저널리즘 표준에 따라 보도합니다.
            데이터 출처: BlueSpot 시민 제보 + 공공데이터 교차검증 (Claude Opus 4 모델 사용).
          </div>

          {/* Related articles */}
          <section>
            <div
              className="text-[9px] font-bold tracking-[0.14em] uppercase mb-4"
              style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
            >
              함께 보기
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.id}
                  href={`/article/${o.id}`}
                  className="card-editorial group rounded-sm border bg-paper p-4 shadow-ink-sm"
                  style={{ borderColor: "rgba(196,135,59,0.22)" }}
                >
                  <div
                    className="text-[9px] mb-1.5"
                    style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(10,22,40,0.35)" }}
                  >
                    {o.category} · {o.region}
                  </div>
                  <div
                    className="line-clamp-2 text-sm font-bold text-ink group-hover:text-blue-deep transition-colors"
                    style={{ fontFamily: "Fraunces, Georgia, serif", lineHeight: "1.3" }}
                  >
                    {o.title}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/report"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm text-sm font-bold text-paper"
              style={{ backgroundColor: "#0A1628", fontFamily: "Fraunces, Georgia, serif" }}
            >
              비슷한 사각, 제보하기
            </Link>
            <Link
              href="/map"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm text-sm font-medium border"
              style={{ borderColor: "rgba(196,135,59,0.35)", color: "#0A1628", fontFamily: "Fraunces, Georgia, serif" }}
            >
              전체 사각지대 지도
            </Link>
          </section>
        </div>

        {/* Sidebar — data panel */}
        <aside className="space-y-5 hidden lg:block">
          {/* Article info card */}
          <div
            className="rounded-sm border overflow-hidden"
            style={{ borderColor: "rgba(196,135,59,0.25)" }}
          >
            <div
              className="px-4 py-3 border-b"
              style={{ borderColor: "rgba(196,135,59,0.2)", backgroundColor: "#F4ECE0" }}
            >
              <span
                className="text-[9px] font-bold tracking-widest uppercase text-gold-leaf"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                기사 데이터
              </span>
            </div>
            <div className="p-4 space-y-4">
              {[
                { label: "BSI 점수", value: `${a.bsi}점` },
                { label: "시민 제보", value: `${a.spotCount}건` },
                { label: "카테고리", value: a.category },
                { label: "지역", value: a.region },
                { label: "발행일", value: formatDate(a.publishedAt) },
                { label: "발행인", value: a.reporter },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span
                    className="text-[9px] font-bold tracking-widest uppercase"
                    style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
                  >
                    {label}
                  </span>
                  <span className="text-sm text-ink font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Blockquote pull */}
          <blockquote
            className="editorial"
          >
            "시민의 제보 1건이 동네를 바꿉니다."
            <footer
              className="mt-2 text-[10px] not-italic"
              style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
            >
              — BlueSpot 편집강령
            </footer>
          </blockquote>
        </aside>
      </div>
    </article>
  );
}
