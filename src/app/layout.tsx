import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "GRI — 경기 7대 카테고리 정책 위험도 지수 (주거 윈도우 시민 공개)",
  description:
    "경기도 31개 시·군 × 7대 카테고리 정책 위험도 지수를 AI가 자동 진단하는 B2G 본체이며, 주거 카테고리를 도민에게 전세사기 위험도로 미리 공개하는 주거 윈도우를 함께 운영하는 정책 위험도 지수 플랫폼. 경기데이터드림 + 경기데이터분석포털 직접 활용.",
  applicationName: "GRI · Gyeonggi Risk Index",
  manifest: "/manifest.json",
  keywords: ["GRI", "경기도", "공공데이터", "AI", "전세사기", "정책 위험도", "Claude Opus", "경기데이터드림"],
  authors: [{ name: "박용환 (크리에이티브 넥서스)" }],
  openGraph: {
    title: "GRI — 경기 31개 시·군 7대 카테고리 정책 위험도 지수",
    description: "도청·시군 공무원에게는 정책 위험 진단(B2G 본체), 도민에게는 전세사기 즉시 차단을 주거 윈도우로 제공하는 정책 위험도 지수 플랫폼.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#003876",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-paper text-ink antialiased">
        <SiteHeader />
        <main className="min-h-[calc(100vh-200px)]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-paper/95 backdrop-blur border-b border-gold-leaf/30" style={{ borderTop: '3px solid #003876' }}>
      {/* Masthead top rule */}
      <div className="border-b border-gold-leaf/20 py-0.5 px-4 hidden sm:block">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <span className="section-tag">GRI · Gyeonggi Risk Index · 경기 공공데이터·AI 정책 위험도 지수</span>
          <span className="page-folio">Vol. 01 · 2026.05 · 박용환 단독</span>
        </div>
      </div>

      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-paper font-bold text-lg"
            style={{ fontFamily: 'Fraunces, Georgia, serif', backgroundColor: '#003876', letterSpacing: '-0.02em' }}
          >
            G
          </span>
          <div className="flex flex-col leading-none">
            <span
              className="font-bold text-ink text-lg leading-none"
              style={{ fontFamily: 'Fraunces, Georgia, serif', letterSpacing: '-0.03em' }}
            >
              GRI
            </span>
            <span className="hidden text-[9px] text-gold-leaf font-mono tracking-widest uppercase sm:block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Gyeonggi Risk Index
            </span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-0.5 text-sm">
          {[
            { href: "/map",    label: "정책 지도" },
            { href: "/jeonse", label: "전세사기 조회" },
            { href: "/data",   label: "데이터 카탈로그", hidden: true },
            { href: "/eval",   label: "AI 성능 검증",   hidden: true },
            { href: "/biz",    label: "사업화 BM",       hidden: true },
            { href: "/report", label: "정책 보고서", hidden: true },
            { href: "/about",  label: "GRI 소개",   hidden: true },
          ].map(({ href, label, hidden }) => (
            <Link
              key={href}
              href={href}
              className={`relative px-3 py-1.5 text-ink/80 hover:text-ink transition-colors group${hidden ? " hidden sm:inline-flex" : ""}`}
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontSize: '0.875rem' }}
            >
              {label}
              <span className="absolute bottom-0.5 left-3 right-3 h-px bg-gold-leaf scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>
          ))}
          <Link
            href="/jeonse"
            className="ml-2 px-4 py-1.5 text-paper text-sm font-medium rounded-sm hover:opacity-90 transition-opacity"
            style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 600, backgroundColor: '#003876' }}
          >
            전세사기 즉시 조회
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink bg-ink text-paper/80">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Footer masthead */}
        <div className="border-b border-paper/10 pb-6 mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div
              className="text-paper text-2xl font-bold leading-none"
              style={{ fontFamily: 'Fraunces, Georgia, serif', letterSpacing: '-0.03em' }}
            >
              GRI · Gyeonggi Risk Index
            </div>
            <div className="mt-1 text-gold-leaf text-xs tracking-widest uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              경기 공공데이터 × Claude Opus 4.7 × Multi-Agent
            </div>
          </div>
          <div className="text-right text-[11px] text-paper/40" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <div>Vol. 01 No. 001 · 2026-05-29</div>
            <div className="mt-0.5">박용환 · 크리에이티브 넥서스</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-sm">
          <FooterCol title="플랫폼">
            <FooterLink href="/map">정책 위험도 지도</FooterLink>
            <FooterLink href="/jeonse">전세사기 조회</FooterLink>
            <FooterLink href="/report">정책 자동 보고서</FooterLink>
            <FooterLink href="/category/housing">주거 안전 섹션</FooterLink>
          </FooterCol>
          <FooterCol title="정책 진단 리포트">
            <FooterLink href="/article/jeonse-risk-yongin">용인 전세사기 위험 리포트</FooterLink>
            <FooterLink href="/article/medical-gap-gapyeong">가평 의료공백 리포트</FooterLink>
            <FooterLink href="/article/transit-isolation-yeoncheon">연천 교통약자 리포트</FooterLink>
          </FooterCol>
          <FooterCol title="개발자">
            <FooterLink href="/about">박용환 · 크리에이티브 넥서스</FooterLink>
            <FooterLink href="/about">기획·개발 일체형</FooterLink>
            <FooterLink href="/about">86건 수상 이력</FooterLink>
          </FooterCol>
          <FooterCol title="평가위원 검증">
            <FooterLink href="/data">데이터 카탈로그 (15종)</FooterLink>
            <FooterLink href="/eval">AI 분류 성능 평가</FooterLink>
            <FooterLink href="/biz">BM · 3년 매출 · 경쟁비교</FooterLink>
            <span className="text-paper/40 text-xs block leading-snug mt-2">2026 경기도 공공데이터·AI 창업경진대회</span>
            <span className="text-paper/40 text-xs block leading-snug mt-0.5">②제품 및 서비스 개발 부문</span>
            <span className="text-paper/40 text-xs block leading-snug mt-0.5">경기데이터드림 + 분석포털 직접 활용 (가점 5점)</span>
          </FooterCol>
        </div>

        <div className="mt-8 border-t border-paper/10 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-[11px] text-paper/40" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            © 2026 박용환 (크리에이티브 넥서스) · GRI · Gyeonggi Risk Index
          </p>
          <p className="text-[11px] text-paper/30">
            본 데모는 2026 경기도 공공데이터·AI 활용 창업경진대회 응모용 시제품입니다.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] font-bold text-gold-leaf tracking-widest uppercase mb-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        {title}
      </div>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-paper/50 hover:text-paper text-sm transition-colors">
      {children}
    </Link>
  );
}
