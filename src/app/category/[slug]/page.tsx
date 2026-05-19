import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, getCategory, type CategorySlug } from "@/data/categories";
import { getSpotsByCategory } from "@/data/mockSpots";
import { REGIONS } from "@/data/mockRegions";
import { ARTICLES } from "@/data/mockArticles";
import { BsiBadge } from "@/components/BsiBadge";
import { Button } from "@/components/ui/button";
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

  const relatedArticles = ARTICLES.filter(
    (a) => a.category === cat.label,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-bluespot-900 to-bluespot-700 p-6 text-white sm:p-8">
        <Link
          href="/"
          className="inline-flex items-center text-xs text-bluespot-100 hover:text-white"
        >
          ← 전체 카테고리
        </Link>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-4xl">{cat.emoji}</span>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{cat.label} 사각지대</h1>
            <p className="mt-1 text-sm text-bluespot-100">{cat.description}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <KpiCard label="등록 사각지대" value={spots.length} suffix="건" />
          <KpiCard label="시민 제보 합계" value={totalReporters} suffix="명" />
          <KpiCard label="심각(BSI 80+)" value={criticalCount} suffix="건" />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full bg-white/15 px-3 py-1">
            평균 BSI <strong>{avgBsi}</strong>점
          </span>
          <span className="rounded-full bg-accent text-slate-900 px-3 py-1 font-medium">
            경기·인천 41개 시·군·구 적용
          </span>
        </div>
      </div>

      {/* Examples */}
      <section className="mt-8">
        <h2 className="text-lg font-bold text-slate-900">대표 사례</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {cat.examples.map((ex, i) => (
            <div
              key={i}
              className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-sm"
            >
              <span className="font-medium text-bluespot">사례 {i + 1}</span>
              <div className="mt-1">{ex}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Spots List */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            BSI 상위 사각지대 — 상위 {Math.min(15, spots.length)}건
          </h2>
          <Link href="/map" className="text-xs font-medium text-bluespot hover:underline">
            전체 지도 보기 →
          </Link>
        </div>
        <div className="mt-3 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-sm">
          {spots.slice(0, 15).map((s) => {
            const region = REGIONS.find((r) => r.id === s.regionId);
            return (
              <div
                key={s.id}
                className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 font-medium text-slate-700">
                      {region?.province} {region?.name}
                    </span>
                    <span>· {s.status}</span>
                    <span>· {formatDate(s.reportedAt)}</span>
                  </div>
                  <div className="mt-1 font-medium text-slate-900">{s.title}</div>
                  <div className="mt-0.5 text-xs text-slate-500">
                    시민 {s.reporters}명 제보
                  </div>
                </div>
                <BsiBadge score={s.bsi} />
              </div>
            );
          })}
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold text-slate-900">관련 솔루션 저널리즘 보도</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {relatedArticles.map((a) => (
              <Link
                key={a.id}
                href={`/article/${a.id}`}
                className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-bluespot hover:shadow-md"
              >
                <div className="text-xs text-slate-500">
                  {a.region} · {formatDate(a.publishedAt)}
                </div>
                <h3 className="mt-1.5 font-semibold leading-snug text-slate-900 group-hover:text-bluespot">
                  {a.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-slate-600">{a.summary}</p>
                <div className="mt-3 flex items-center justify-between">
                  <BsiBadge score={a.bsi} size="sm" />
                  <span className="text-xs text-slate-500">{a.reporter}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mt-12 rounded-2xl border border-slate-200 bg-bg p-6 text-center">
        <h3 className="text-lg font-bold text-slate-900">
          내 동네 {cat.label} 사각지대를 알려주세요
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          시민의 제보가 다음 보도와 정책을 만듭니다.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Link href="/report">
            <Button variant="default" size="lg">
              제보하기
            </Button>
          </Link>
          <Link href="/map">
            <Button variant="outline" size="lg">
              전체 지도 보기
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function KpiCard({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix: string;
}) {
  return (
    <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
      <div className="text-xs text-bluespot-100">{label}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-bold">{value.toLocaleString()}</span>
        <span className="text-xs text-bluespot-100">{suffix}</span>
      </div>
    </div>
  );
}
