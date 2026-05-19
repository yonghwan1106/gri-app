import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "BlueSpot 소개 — 경인블루저널",
  description: "AI×LBS×Journalism 통합 사각지대 발굴 SaaS — 경인블루저널 박용환 대표",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <header>
        <span className="inline-block rounded-full bg-bluespot-100 px-3 py-1 text-xs font-semibold text-bluespot-800">
          About BlueSpot
        </span>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
          시민의 눈으로 본 동네, <br />
          AI가 모으고, 저널리즘이 답합니다.
        </h1>
        <p className="mt-3 text-base text-slate-600">
          BlueSpot은 <strong>AI</strong>, <strong>위치 기반(LBS)</strong>,{" "}
          <strong>솔루션 저널리즘</strong>을 통합한 사각지대 발굴 SaaS입니다.
          경기·인천 41개 시·군·구를 우선 대상으로, 12개 카테고리 사각을 시민 제보와 AI 교차검증으로 매핑합니다.
        </p>
      </header>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">우리가 푸는 문제</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <Bullet>
            의료·교통·복지·행정 사각은 <strong>동네 단위</strong>로 발생하지만, 데이터는 <strong>광역 단위</strong>로만 공개됩니다.
          </Bullet>
          <Bullet>
            시민의 체감과 공공데이터 사이에 <strong>구조적 간극</strong>이 있습니다.
          </Bullet>
          <Bullet>
            언론은 단발성 고발에 머무르고, 지자체는 우선순위를 정할 데이터가 부족합니다.
          </Bullet>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">BlueSpot의 3축</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Pillar
            title="AI 교차검증"
            body="시민 제보를 Claude Opus 4가 12개 카테고리로 자동 분류하고 BSI(BlueSpot Index)를 산출합니다."
          />
          <Pillar
            title="LBS 지도화"
            body="경기·인천 41개 시·군·구 위경도 기반 시각화. 동네 단위 의사결정 도구입니다."
          />
          <Pillar
            title="솔루션 저널리즘"
            body="경인블루저널이 데이터를 보도로, 보도를 정책 협업으로 잇습니다."
          />
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">팀 — 경인블루저널</h2>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-bluespot text-white">
            <span className="text-3xl font-bold">박</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">박용환</h3>
            <p className="text-sm text-slate-600">경인블루저널 대표 · 크리에이티브 넥서스 대표</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              지역 언론·솔루션 저널리즘·AI 활용 공모전 다수 수상. 경기·인천의 사각지대를 시민과 데이터로 함께 풀어내는 미디어테크 모델을 설계해왔습니다.
              BlueSpot은 박용환 대표가 운영하는 경인블루저널의 핵심 제품군으로, 동네 저널리즘과 LBS·AI를 결합한 SaaS 플랫폼입니다.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">로드맵</h2>
        <div className="mt-3 space-y-3">
          <Roadmap
            tag="MVP v0.1"
            tone="current"
            title="시제품 데모 (현재)"
            body="정적 데모 + Claude API 제보 분류. 경기·인천 41개 시·군·구 mock 데이터 100건. 본 페이지가 v0.1 결과물입니다."
          />
          <Roadmap
            tag="v0.5"
            tone="next"
            title="DB 연동 + 시민 인증 + 이미지 업로드"
            body="Supabase 또는 자체 PostgreSQL로 실시간 DB 연결. 카카오/네이버 OAuth, 이미지·동영상 첨부, 알림 시스템."
          />
          <Roadmap
            tag="v1.0"
            tone="future"
            title="전체 12개 카테고리 + 영상 솔루션 저널리즘"
            body="12개 카테고리 모두 상세 페이지·BSI 대시보드 제공. 경인블루저널 영상 보도 통합. 지자체 협업 SaaS 라이선스."
          />
          <Roadmap
            tag="v2.0"
            tone="future"
            title="전국 확장 + 정책 모니터링 KPI"
            body="전국 226개 시·군·구로 확장. 시·도의회 KPI 모니터링 API 제공. 외부 언론사 임베드 위젯 제공."
          />
        </div>
      </section>

      <section className="mt-10 text-center">
        <h3 className="text-lg font-bold text-slate-900">함께 만들어 갑니다</h3>
        <p className="mt-1 text-sm text-slate-600">
          제보 1건이 동네를 바꿉니다.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Link href="/report">
            <Button variant="default" size="lg">
              지금 제보하기
            </Button>
          </Link>
          <Link href="/map">
            <Button variant="outline" size="lg">
              지도 둘러보기
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-bluespot" />
      <span>{children}</span>
    </li>
  );
}

function Pillar({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="font-semibold text-bluespot">{title}</div>
      <p className="mt-1 text-sm text-slate-600">{body}</p>
    </div>
  );
}

function Roadmap({
  tag,
  tone,
  title,
  body,
}: {
  tag: string;
  tone: "current" | "next" | "future";
  title: string;
  body: string;
}) {
  const toneClass =
    tone === "current"
      ? "border-bluespot bg-bluespot-50"
      : tone === "next"
      ? "border-accent-300 bg-accent-50"
      : "border-slate-200 bg-white";
  const tagClass =
    tone === "current"
      ? "bg-bluespot text-white"
      : tone === "next"
      ? "bg-accent-400 text-slate-900"
      : "bg-slate-200 text-slate-700";
  return (
    <div className={`rounded-xl border-l-4 p-4 ${toneClass}`}>
      <div className="flex items-center gap-2">
        <span className={`rounded px-2 py-0.5 text-xs font-bold ${tagClass}`}>{tag}</span>
        <span className="font-semibold text-slate-900">{title}</span>
      </div>
      <p className="mt-1 text-sm text-slate-700">{body}</p>
    </div>
  );
}
