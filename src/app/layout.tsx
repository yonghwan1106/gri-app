import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlueSpot — AI×LBS×Journalism 사각지대 발굴 플랫폼",
  description:
    "시민이 위치 기반으로 사각지대를 제보하고, AI가 교차검증하며, 솔루션 저널리즘이 답을 제시합니다. 경기·인천 41개 시·군·구 우선.",
  applicationName: "BlueSpot",
  manifest: "/manifest.json",
  themeColor: "#1E40AF",
  keywords: [
    "BlueSpot",
    "사각지대",
    "LBS",
    "솔루션 저널리즘",
    "경인블루저널",
    "AI",
  ],
  authors: [{ name: "경인블루저널 박용환" }],
  openGraph: {
    title: "BlueSpot — 시민과 AI가 함께 찾는 사각지대",
    description:
      "경기·인천 41개 시·군·구에서 의료·교통·복지 등 12개 카테고리 사각지대를 발굴합니다.",
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
      <body className="min-h-screen bg-bg text-slate-900 antialiased">
        <SiteHeader />
        <main className="min-h-[calc(100vh-200px)]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-bluespot text-white font-bold">
            B
          </span>
          <span className="font-bold tracking-tight text-bluespot-900">
            BlueSpot
          </span>
          <span className="hidden text-xs text-slate-500 sm:inline">
            · 경인블루저널
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/map"
            className="rounded-md px-3 py-1.5 text-slate-700 hover:bg-slate-100"
          >
            지도
          </Link>
          <Link
            href="/report"
            className="rounded-md px-3 py-1.5 text-slate-700 hover:bg-slate-100"
          >
            제보
          </Link>
          <Link
            href="/article/seoul-medical-gap"
            className="hidden rounded-md px-3 py-1.5 text-slate-700 hover:bg-slate-100 sm:inline"
          >
            보도
          </Link>
          <Link
            href="/about"
            className="hidden rounded-md px-3 py-1.5 text-slate-700 hover:bg-slate-100 sm:inline"
          >
            소개
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <strong className="text-slate-900">BlueSpot</strong> · AI×LBS×
            Journalism 사각지대 발굴 SaaS
          </div>
          <div className="text-xs text-slate-500">
            © 2026 경인블루저널 (박용환 대표) · MVP v0.1 데모
          </div>
        </div>
        <div className="mt-2 text-xs text-slate-500">
          본 데모는 2026 KOREA LBS 스타트업 챌린지 응모용 시제품입니다. Mock
          데이터를 일부 사용합니다.
        </div>
      </div>
    </footer>
  );
}
