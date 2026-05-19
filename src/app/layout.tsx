import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlueSpot — AI×LBS×Journalism 사각지대 발굴 플랫폼",
  description:
    "시민이 위치 기반으로 사각지대를 제보하고, AI가 교차검증하며, 솔루션 저널리즘이 답을 제시합니다. 경기·인천 41개 시·군·구 우선.",
  applicationName: "BlueSpot",
  manifest: "/manifest.json",
  keywords: ["BlueSpot", "사각지대", "LBS", "솔루션 저널리즘", "경인블루저널", "AI"],
  authors: [{ name: "경인블루저널 박용환" }],
  openGraph: {
    title: "BlueSpot — 시민과 AI가 함께 찾는 사각지대",
    description: "경기·인천 41개 시·군·구에서 의료·교통·복지 등 12개 카테고리 사각지대를 발굴합니다.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1E40AF",
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
    <header className="sticky top-0 z-40 w-full bg-paper/95 backdrop-blur border-b border-gold-leaf/30" style={{ borderTop: '3px solid #0A1628' }}>
      {/* Masthead top rule */}
      <div className="border-b border-gold-leaf/20 py-0.5 px-4 hidden sm:block">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <span className="section-tag">경인블루저널 GeoJournalism Platform</span>
          <span className="page-folio">Vol. 01 · 2026.05 · 경기 아54671</span>
        </div>
      </div>

      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-paper font-bold text-lg"
            style={{ fontFamily: 'Fraunces, Georgia, serif', backgroundColor: '#0A1628', letterSpacing: '-0.02em' }}
          >
            B
          </span>
          <div className="flex flex-col leading-none">
            <span
              className="font-bold text-ink text-lg leading-none"
              style={{ fontFamily: 'Fraunces, Georgia, serif', letterSpacing: '-0.03em' }}
            >
              BlueSpot
            </span>
            <span className="hidden text-[9px] text-gold-leaf font-mono tracking-widest uppercase sm:block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              GeoJournalism
            </span>
          </div>
        </Link>

        {/* Nav — editorial serif links */}
        <nav className="flex items-center gap-0.5 text-sm">
          {[
            { href: "/map",                      label: "지도" },
            { href: "/report",                   label: "독자투고" },
            { href: "/article/seoul-medical-gap",label: "보도",   hidden: true },
            { href: "/about",                    label: "발행정보", hidden: true },
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
            href="/report"
            className="ml-2 px-4 py-1.5 bg-blue-deep text-paper text-sm font-medium rounded-sm hover:bg-ink transition-colors"
            style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 600 }}
          >
            제보하기
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
              BlueSpot
            </div>
            <div className="mt-1 text-gold-leaf text-xs tracking-widest uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              AI × LBS × Journalism
            </div>
          </div>
          <div className="text-right text-[11px] text-paper/40" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <div>Vol. 01 No. 001 · 2026-05-19</div>
            <div className="mt-0.5">경기 아54671 · 인터넷신문</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-sm">
          <FooterCol title="플랫폼">
            <FooterLink href="/map">사각지대 지도</FooterLink>
            <FooterLink href="/report">독자투고 · 제보</FooterLink>
            <FooterLink href="/category/medical">의료 섹션</FooterLink>
            <FooterLink href="/category/transport">교통 섹션</FooterLink>
          </FooterCol>
          <FooterCol title="저널리즘">
            <FooterLink href="/article/seoul-medical-gap">의료 보도</FooterLink>
            <FooterLink href="/article/incheon-transport-blind">교통 보도</FooterLink>
            <FooterLink href="/article/gimpo-welfare-isolation">복지 보도</FooterLink>
          </FooterCol>
          <FooterCol title="발행사">
            <FooterLink href="/about">경인블루저널</FooterLink>
            <FooterLink href="/about">박용환 대표</FooterLink>
            <FooterLink href="/about">로드맵 2026</FooterLink>
          </FooterCol>
          <FooterCol title="LBS 챌린지">
            <span className="text-paper/40 text-xs block leading-snug">2026 KOREA LBS 스타트업 챌린지 출품작</span>
            <span className="text-paper/40 text-xs block leading-snug mt-1">MVP v0.1 · Claude Opus 4 통합</span>
          </FooterCol>
        </div>

        <div className="mt-8 border-t border-paper/10 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-[11px] text-paper/40" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            © 2026 경인블루저널 (박용환 대표) · 인터넷신문 등록 경기 아54671
          </p>
          <p className="text-[11px] text-paper/30">
            본 데모는 2026 KOREA LBS 스타트업 챌린지 응모용 시제품입니다. Mock 데이터를 일부 사용합니다.
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
