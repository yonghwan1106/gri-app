import Link from "next/link";
import { CategoryGrid } from "@/components/CategoryGrid";
import { StatsRow } from "@/components/StatsRow";
import { Button } from "@/components/ui/button";
import { ARTICLES } from "@/data/mockArticles";
import { BsiBadge } from "@/components/BsiBadge";
import { formatDate } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      {/* Hero */}
      <section className="rounded-2xl bg-gradient-to-br from-bluespot-900 via-bluespot-800 to-bluespot-700 p-6 text-white shadow-lg sm:p-10">
        <span className="inline-flex items-center rounded-full bg-accent/95 px-3 py-1 text-xs font-bold text-slate-900">
          MVP v0.1 · 2026 KOREA LBS 스타트업 챌린지 출품작
        </span>
        <h1 className="mt-4 text-2xl font-bold leading-tight sm:text-4xl md:text-5xl">
          시민이 찍고, AI가 잇고,
          <br />
          저널리즘이 답합니다.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-bluespot-100 sm:text-base">
          BlueSpot은 <strong className="text-white">AI×LBS×Journalism</strong> 통합 사각지대 발굴 SaaS입니다.
          경기·인천 41개 시·군·구의 의료·교통·복지·행정 사각을 시민 제보와 AI 교차검증으로 매핑하고,
          솔루션 저널리즘으로 다음 단계의 변화를 만듭니다.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/map">
            <Button variant="accent" size="lg">
              지도에서 사각지대 보기
            </Button>
          </Link>
          <Link href="/report">
            <Button variant="outline" size="lg" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
              내 동네 제보하기
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-8">
        <StatsRow />
      </section>

      {/* Categories */}
      <section className="mt-10">
        <SectionHeader
          title="12개 카테고리로 본 사각지대"
          desc="의료·교통·복지·행정 4개 카테고리는 상세 페이지에서 BSI 점수와 보도 사례를 확인할 수 있습니다."
        />
        <div className="mt-5">
          <CategoryGrid />
        </div>
      </section>

      {/* Articles */}
      <section className="mt-12">
        <SectionHeader
          title="솔루션 저널리즘 — 최근 보도"
          desc="BlueSpot 데이터로 작성된 경인블루저널의 사각지대 보도 사례입니다."
        />
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {ARTICLES.map((a) => (
            <Link
              key={a.id}
              href={`/article/${a.id}`}
              className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-bluespot hover:shadow-md"
            >
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 font-medium text-slate-700">{a.category}</span>
                  <span>· {a.region}</span>
                </span>
                <span>{formatDate(a.publishedAt)}</span>
              </div>
              <h3 className="mt-3 font-semibold leading-snug text-slate-900 group-hover:text-bluespot">
                {a.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-slate-600">{a.summary}</p>
              <div className="mt-4 flex items-center justify-between">
                <BsiBadge score={a.bsi} size="sm" />
                <span className="text-xs text-slate-500">제보 {a.spotCount}건</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          왜 BlueSpot인가
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Pillar
            num="01"
            title="AI 교차검증"
            body="시민 제보를 Claude Opus 4.7이 자동 분류·우선순위 산출. 공공데이터와 교차 검증해 BSI 점수를 계산합니다."
          />
          <Pillar
            num="02"
            title="LBS 지도화"
            body="경기·인천 41개 시·군·구 + 12개 카테고리 사각지대를 위경도 기반으로 시각화. 동네 단위 의사결정에 즉시 활용됩니다."
          />
          <Pillar
            num="03"
            title="솔루션 저널리즘"
            body="단순 고발이 아닌 ‘다음 단계’를 함께 설계. 경인블루저널 명의로 지자체·시민과 동시 협업합니다."
          />
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 text-sm text-slate-600">
          <span>운영 · 경인블루저널 (박용환 대표)</span>
          <Link href="/about" className="font-medium text-bluespot hover:underline">
            팀과 비전 자세히 →
          </Link>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{title}</h2>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </div>
  );
}

function Pillar({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-bg p-4">
      <div className="text-xs font-bold text-bluespot">{num}</div>
      <div className="mt-1 font-semibold">{title}</div>
      <p className="mt-1 text-sm text-slate-600">{body}</p>
    </div>
  );
}
