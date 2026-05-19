import Link from "next/link";

export const metadata = {
  title: "발행정보 · 매스트헤드 — BlueSpot 경인블루저널",
  description: "AI×LBS×Journalism 통합 사각지대 발굴 SaaS — 경인블루저널 박용환 대표",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Masthead header */}
      <header className="text-center mb-12">
        {/* Top rule — newspaper style */}
        <div className="border-t-4 border-ink pt-6 mb-3" />
        <div className="border-t border-gold-leaf/40 mb-6" />

        <div
          className="text-[9px] tracking-[0.25em] uppercase text-gold-leaf mb-4"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          발행정보 · 매스트헤드
        </div>

        <h1
          className="text-5xl sm:text-7xl font-black text-ink"
          style={{ fontFamily: "Fraunces, Georgia, serif", letterSpacing: "-0.04em", lineHeight: "0.9" }}
        >
          BlueSpot
        </h1>

        <p
          className="mt-4 text-lg text-ink/55 italic"
          style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
        >
          경인블루저널 AI×LBS×Journalism 통합 사각지대 발굴 플랫폼
        </p>

        {/* Gold divider with diamond */}
        <div className="flex items-center gap-3 mt-6 mb-6">
          <span className="h-px flex-1 bg-gold-leaf/35" />
          <span style={{ color: "#C4873B", fontSize: "14px" }}>◆</span>
          <span className="h-px flex-1 bg-gold-leaf/35" />
        </div>

        {/* Publication info */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-ink/40"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          <span>Vol. 01 · No. 001</span>
          <span>·</span>
          <span>2026.05.19</span>
          <span>·</span>
          <span>경기 아54671</span>
          <span>·</span>
          <span>인터넷신문</span>
        </div>
        <div className="border-t border-ink/10 mt-5" />
      </header>

      {/* Vision statement */}
      <section className="mb-14 max-w-3xl mx-auto">
        <div
          className="text-[9px] font-bold tracking-[0.14em] uppercase mb-4"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
        >
          미션 · 비전
        </div>
        <h2
          className="text-2xl sm:text-3xl font-bold text-ink mb-5"
          style={{ fontFamily: "Fraunces, Georgia, serif", letterSpacing: "-0.02em" }}
        >
          시민의 눈으로 본 동네,<br />AI가 모으고, 저널리즘이 답합니다.
        </h2>
        <p className="text-base text-ink/65 leading-[1.85]" style={{ wordBreak: "keep-all" }}>
          BlueSpot은 <strong className="text-ink/85">AI</strong>, <strong className="text-ink/85">위치 기반(LBS)</strong>,{" "}
          <strong className="text-ink/85">솔루션 저널리즘</strong>을 통합한 사각지대 발굴 SaaS입니다.
          경기·인천 41개 시·군·구를 우선 대상으로, 12개 카테고리 사각을 시민 제보와 AI 교차검증으로 매핑합니다.
        </p>
      </section>

      {/* Problem we solve */}
      <section className="mb-14">
        <div
          className="text-[9px] font-bold tracking-[0.14em] uppercase mb-5"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
        >
          우리가 푸는 문제
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              num: "01",
              title: "데이터 광역화 문제",
              body: "의료·교통·복지·행정 사각은 동네 단위로 발생하지만, 데이터는 광역 단위로만 공개됩니다.",
            },
            {
              num: "02",
              title: "구조적 간극",
              body: "시민의 체감과 공공데이터 사이에 구조적 간극이 있습니다. BlueSpot이 이 사이를 메웁니다.",
            },
            {
              num: "03",
              title: "단발성 보도 한계",
              body: "언론은 단발성 고발에 머무르고, 지자체는 우선순위를 정할 데이터가 부족합니다.",
            },
          ].map(({ num, title, body }) => (
            <div
              key={num}
              className="rounded-sm border bg-paper p-5 shadow-ink-sm"
              style={{ borderColor: "rgba(196,135,59,0.22)", borderTopWidth: "3px", borderTopColor: "#C4873B" }}
            >
              <div
                className="text-[9px] font-bold mb-3"
                style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
              >
                {num}
              </div>
              <h3
                className="font-bold text-ink mb-2"
                style={{ fontFamily: "Fraunces, Georgia, serif" }}
              >
                {title}
              </h3>
              <p className="text-sm text-ink/55" style={{ wordBreak: "keep-all", lineHeight: "1.75" }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="mb-14">
        <div
          className="text-[9px] font-bold tracking-[0.14em] uppercase mb-5"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
        >
          BlueSpot의 3축
        </div>
        <div className="grid gap-px sm:grid-cols-3 bg-gold-leaf/20 rounded-sm overflow-hidden shadow-ink-sm">
          {[
            { num: "I", title: "AI 교차검증", body: "시민 제보를 Claude Opus 4가 12개 카테고리로 자동 분류하고 BSI(BlueSpot Index)를 산출합니다.", accent: "#1E40AF" },
            { num: "II", title: "LBS 지도화", body: "경기·인천 41개 시·군·구 위경도 기반 시각화. 동네 단위 의사결정 도구입니다.", accent: "#C4873B" },
            { num: "III", title: "솔루션 저널리즘", body: "경인블루저널이 데이터를 보도로, 보도를 정책 협업으로 잇습니다.", accent: "#166534" },
          ].map(({ num, title, body, accent }) => (
            <div key={num} className="bg-paper p-6 flex flex-col">
              <div
                className="text-base font-black mb-3"
                style={{ fontFamily: "Fraunces, Georgia, serif", color: accent, fontStyle: "italic" }}
              >
                {num}
              </div>
              <h3
                className="font-bold text-ink mb-2"
                style={{ fontFamily: "Fraunces, Georgia, serif" }}
              >
                {title}
              </h3>
              <div className="h-px w-8 mb-3" style={{ backgroundColor: accent }} />
              <p className="text-sm text-ink/55" style={{ lineHeight: "1.75", wordBreak: "keep-all" }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team — masthead style */}
      <section className="mb-14 rounded-sm border overflow-hidden shadow-ink-sm" style={{ borderColor: "rgba(196,135,59,0.25)" }}>
        <div
          className="px-6 py-4 border-b"
          style={{ borderColor: "rgba(196,135,59,0.2)", backgroundColor: "#0A1628" }}
        >
          <div
            className="text-[9px] tracking-widest uppercase mb-1"
            style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
          >
            발행 · 편집
          </div>
          <h2
            className="text-paper text-xl font-bold"
            style={{ fontFamily: "Fraunces, Georgia, serif" }}
          >
            경인블루저널 — 매스트헤드
          </h2>
        </div>

        <div className="p-6 sm:p-8 grid sm:grid-cols-[auto_1fr] gap-6 items-start">
          {/* Avatar */}
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-sm text-paper"
            style={{ backgroundColor: "#0A1628" }}
          >
            <span
              className="text-4xl font-black"
              style={{ fontFamily: "Fraunces, Georgia, serif", color: "#C4873B" }}
            >
              박
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline gap-3 mb-1">
              <h3
                className="text-xl font-bold text-ink"
                style={{ fontFamily: "Fraunces, Georgia, serif" }}
              >
                박용환
              </h3>
              <span
                className="text-[10px] text-ink/40"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                발행인 · 편집인 · 대표이사
              </span>
            </div>
            <p
              className="text-sm text-ink/50 mb-3"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              경인블루저널 · 크리에이티브 넥서스
            </p>
            <p className="text-sm text-ink/70 leading-relaxed" style={{ wordBreak: "keep-all", lineHeight: "1.85" }}>
              지역 언론·솔루션 저널리즘·AI 활용 공모전 다수 수상.
              22개월간 86건 수상 경력을 통해 경기·인천의 사각지대를 시민과 데이터로 함께 풀어내는
              미디어테크 모델을 설계해왔습니다.
              BlueSpot은 경인블루저널의 핵심 제품군으로, 동네 저널리즘과 LBS·AI를 결합한 SaaS 플랫폼입니다.
            </p>

            {/* Awards infographic */}
            <div className="mt-5">
              <div
                className="text-[9px] font-bold tracking-widest uppercase mb-3"
                style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
              >
                22개월 · 86건 공모전 수상 실적
              </div>
              <div className="flex items-end gap-2 h-12">
                {[
                  { label: "대상", count: 4, color: "#B91C1C" },
                  { label: "최우수", count: 12, color: "#C4873B" },
                  { label: "우수", count: 28, color: "#1E40AF" },
                  { label: "장려", count: 42, color: "#166534" },
                ].map(({ label, count, color }) => (
                  <div key={label} className="flex flex-col items-center gap-1 flex-1">
                    <span
                      className="text-[8px]"
                      style={{ fontFamily: "JetBrains Mono, monospace", color }}
                    >
                      {count}건
                    </span>
                    <div
                      className="w-full rounded-t-sm"
                      style={{ height: `${(count / 42) * 36}px`, backgroundColor: color, opacity: 0.8 }}
                    />
                    <span
                      className="text-[8px]"
                      style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(10,22,40,0.4)" }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="mb-14">
        <div
          className="text-[9px] font-bold tracking-[0.14em] uppercase mb-5"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
        >
          5년 로드맵
        </div>
        <div className="space-y-3">
          {[
            {
              tag: "MVP v0.1",
              tone: "current" as const,
              title: "시제품 데모 (현재)",
              body: "정적 데모 + Claude API 제보 분류. 경기·인천 41개 시·군·구 mock 데이터 100건. 본 페이지가 v0.1 결과물입니다.",
            },
            {
              tag: "v0.5",
              tone: "next" as const,
              title: "DB 연동 + 시민 인증 + 이미지 업로드",
              body: "Supabase 또는 자체 PostgreSQL로 실시간 DB 연결. 카카오/네이버 OAuth, 이미지·동영상 첨부, 알림 시스템.",
            },
            {
              tag: "v1.0",
              tone: "future" as const,
              title: "전체 12개 카테고리 + 영상 솔루션 저널리즘",
              body: "12개 카테고리 모두 상세 페이지·BSI 대시보드 제공. 경인블루저널 영상 보도 통합. 지자체 협업 SaaS 라이선스.",
            },
            {
              tag: "v2.0",
              tone: "future" as const,
              title: "전국 확장 + 정책 모니터링 KPI",
              body: "전국 226개 시·군·구로 확장. 시·도의회 KPI 모니터링 API 제공. 외부 언론사 임베드 위젯 제공.",
            },
          ].map(({ tag, tone, title, body }) => {
            const accentColor = tone === "current" ? "#1E40AF" : tone === "next" ? "#C4873B" : "rgba(10,22,40,0.2)";
            const tagBg = tone === "current" ? "#1E40AF" : tone === "next" ? "#C4873B" : "rgba(10,22,40,0.08)";
            const tagText = tone === "current" ? "#FBF7F0" : tone === "next" ? "#0A1628" : "rgba(10,22,40,0.4)";
            return (
              <div
                key={tag}
                className="rounded-sm border-l-4 p-5"
                style={{
                  borderLeftColor: accentColor,
                  backgroundColor: tone === "current" ? "#EFF6FF" : tone === "next" ? "#FFFBEB" : "#FBF7F0",
                  borderTop: "1px solid rgba(196,135,59,0.15)",
                  borderRight: "1px solid rgba(196,135,59,0.15)",
                  borderBottom: "1px solid rgba(196,135,59,0.15)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="px-2.5 py-1 rounded-sm text-[10px] font-bold"
                    style={{ backgroundColor: tagBg, color: tagText, fontFamily: "JetBrains Mono, monospace" }}
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
                <p className="text-sm text-ink/60" style={{ wordBreak: "keep-all", lineHeight: "1.75" }}>{body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center border-t border-gold-leaf/25 pt-12">
        <p
          className="text-2xl font-bold text-ink mb-2"
          style={{ fontFamily: "Fraunces, Georgia, serif" }}
        >
          함께 만들어 갑니다
        </p>
        <p className="text-sm text-ink/45 mb-6">제보 1건이 동네를 바꿉니다.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/report"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-sm text-paper font-bold"
            style={{ backgroundColor: "#0A1628", fontFamily: "Fraunces, Georgia, serif" }}
          >
            지금 제보하기
          </Link>
          <Link
            href="/map"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-sm font-medium border"
            style={{ borderColor: "rgba(196,135,59,0.35)", color: "#0A1628", fontFamily: "Fraunces, Georgia, serif" }}
          >
            지도 둘러보기
          </Link>
        </div>

        {/* Footer imprint */}
        <div className="mt-10 pt-6 border-t border-ink/8">
          <p
            className="text-[11px] text-ink/30"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            © 2026 경인블루저널 · 인터넷신문 등록 경기 아54671 · 발행인 박용환 · heisenbug0306@gmail.com
          </p>
        </div>
      </section>
    </div>
  );
}
