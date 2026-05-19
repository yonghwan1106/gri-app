import { notFound } from "next/navigation";
import Link from "next/link";
import { ARTICLES, getArticle } from "@/data/mockArticles";
import { BsiBadge } from "@/components/BsiBadge";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
    <article className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/"
        className="text-xs font-medium text-slate-500 hover:text-slate-900"
      >
        ← 홈으로
      </Link>

      <header className="mt-4 border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded bg-bluespot text-white px-2 py-0.5 font-semibold">
            경인블루저널
          </span>
          <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-700">{a.category}</span>
          <span className="text-slate-500">· {a.region}</span>
          <span className="text-slate-500">· {formatDate(a.publishedAt)}</span>
        </div>
        <h1 className="mt-3 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
          {a.title}
        </h1>
        <p className="mt-2 text-base text-slate-600 sm:text-lg">{a.subtitle}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <BsiBadge score={a.bsi} size="lg" />
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
            시민 제보 {a.spotCount}건
          </span>
          <span className="text-xs text-slate-500">· {a.reporter}</span>
        </div>
      </header>

      <div className="mt-6 rounded-xl border-l-4 border-bluespot bg-bluespot-50 p-4 text-sm text-slate-700">
        <strong className="text-bluespot-900">요약 — </strong>
        {a.summary}
      </div>

      <section className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate-800">
        {a.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>

      <section className="mt-10 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent text-slate-900">
            ✓
          </span>
          BlueSpot 제안 — 다음 단계
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          단순 고발이 아닌, 실행 가능한 해법을 제시하는 솔루션 저널리즘
        </p>
        <ol className="mt-4 space-y-3">
          {a.solution.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bluespot text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="text-sm text-slate-700">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
        <strong className="text-slate-900">협력 파트너:</strong>{" "}
        {a.partners.join(" · ")}
      </section>

      <section className="mt-10 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-base font-bold text-slate-900">함께 보기</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {others.map((o) => (
            <Link
              key={o.id}
              href={`/article/${o.id}`}
              className="group rounded-lg border border-slate-200 p-3 transition-all hover:border-bluespot hover:bg-bluespot-50"
            >
              <div className="text-xs text-slate-500">
                {o.category} · {o.region}
              </div>
              <div className="mt-1 line-clamp-2 text-sm font-medium text-slate-900 group-hover:text-bluespot">
                {o.title}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/report">
          <Button variant="default" size="lg">
            비슷한 사각, 제보하기
          </Button>
        </Link>
        <Link href="/map">
          <Button variant="outline" size="lg">
            전체 사각지대 지도
          </Button>
        </Link>
      </section>
    </article>
  );
}
