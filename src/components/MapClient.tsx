"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { SPOTS, type Spot } from "@/data/mockSpots";
import { REGIONS, GYEONGGI_CENTER } from "@/data/mockRegions";
import { CATEGORIES, type CategorySlug, getCategory } from "@/data/categories";
import { bsiColor } from "@/lib/utils";
import { BsiBadge } from "@/components/BsiBadge";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false },
);
const CircleMarker = dynamic(
  () => import("react-leaflet").then((m) => m.CircleMarker),
  { ssr: false },
);
const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false },
);
const Tooltip = dynamic(
  () => import("react-leaflet").then((m) => m.Tooltip),
  { ssr: false },
);

interface MapClientProps {
  initialCategory?: CategorySlug | "all";
}

export function MapClient({ initialCategory = "all" }: MapClientProps) {
  const [mounted, setMounted] = useState(false);
  const [category, setCategory] = useState<CategorySlug | "all">(initialCategory);
  const [minBsi, setMinBsi] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = useMemo(() => {
    return SPOTS.filter(
      (s) => (category === "all" || s.category === category) && s.bsi >= minBsi,
    );
  }, [category, minBsi]);

  // Top 10 by BSI for sidebar list
  const topSpots = useMemo(() => {
    return [...filtered].sort((a, b) => b.bsi - a.bsi).slice(0, 10);
  }, [filtered]);

  return (
    <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
      {/* Sidebar — editorial filter panel */}
      <aside
        className="rounded-sm border bg-paper shadow-ink-sm overflow-hidden"
        style={{ borderColor: "rgba(196,135,59,0.25)" }}
      >
        {/* Panel header */}
        <div className="border-b px-4 py-3" style={{ borderColor: "rgba(196,135,59,0.2)", background: "#0A1628" }}>
          <div
            className="text-[9px] tracking-widest uppercase mb-1"
            style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
          >
            편집장 픽 — 사각지대 필터
          </div>
          <div
            className="text-white text-sm font-bold"
            style={{ fontFamily: "Fraunces, Georgia, serif" }}
          >
31개 시·군 GRI 진단
          </div>
        </div>

        <div className="p-4 space-y-5">
          {/* Category filter */}
          <div>
            <label
              className="block text-[9px] font-bold tracking-widest uppercase mb-2"
              style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
            >
              카테고리 분류
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategorySlug | "all")}
              className="input-editorial"
            >
              <option value="all">전체 7개 정책 카테고리</option>
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.emoji} {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* BSI slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                className="text-[9px] font-bold tracking-widest uppercase"
                style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
              >
                최소 GRI 점수
              </label>
              <span
                className="text-ink font-bold text-sm"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {minBsi}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={95}
              step={5}
              value={minBsi}
              onChange={(e) => setMinBsi(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: "#C4873B" }}
            />
            <div
              className="flex justify-between text-[9px] mt-1"
              style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(10,22,40,0.35)" }}
            >
              <span>0</span><span>40</span><span>80</span><span>95</span>
            </div>
          </div>

          {/* Count display */}
          <div
            className="rounded-sm px-3 py-2.5 border"
            style={{ backgroundColor: "#F4ECE0", borderColor: "rgba(196,135,59,0.25)" }}
          >
            <div className="text-[9px] font-bold tracking-widest uppercase mb-1" style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}>
              현재 표시
            </div>
            <div className="text-sm text-ink">
              <span className="font-black text-xl" style={{ fontFamily: "Fraunces, Georgia, serif", color: "#1E40AF" }}>
                {filtered.length}
              </span>
              <span className="text-ink/40 ml-1" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px" }}>
                / {SPOTS.length}건
              </span>
            </div>
          </div>

          {/* Legend */}
          <div>
            <div className="text-[9px] font-bold tracking-widest uppercase mb-2.5" style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}>
              GRI 색상 범례
            </div>
            <div className="space-y-1.5">
              {[
                { color: "#B91C1C", label: "80+ 심각" },
                { color: "#EA580C", label: "60–79 주의" },
                { color: "#FCD34D", label: "40–59 관찰" },
                { color: "#84CC16", label: "20–39 양호" },
                { color: "#22C55E", label: "0–19 안정" },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full border-2 border-paper inline-block shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-[10px] text-ink/60" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top 10 BSI list */}
        <div className="border-t" style={{ borderColor: "rgba(196,135,59,0.2)" }}>
          <div className="px-4 py-2.5 border-b" style={{ borderColor: "rgba(196,135,59,0.15)", backgroundColor: "#F4ECE0" }}>
            <span className="text-[9px] font-bold tracking-widest uppercase" style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}>
위험 시·군 GRI Top 10
            </span>
          </div>
          <div className="divide-y divide-amber-100">
            {topSpots.map((s, i) => (
              <div key={s.id} className="px-4 py-2.5 flex items-start gap-2.5">
                <span
                  className="text-[9px] font-bold mt-0.5 w-4 shrink-0 text-right"
                  style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
                >
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-medium text-ink leading-snug truncate">
                    {s.title}
                  </div>
                  <div className="mt-0.5">
                    <BsiBadge score={s.bsi} size="sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Map */}
      <div
        className="h-[70vh] min-h-[500px] overflow-hidden rounded-sm border shadow-ink-md"
        style={{ borderColor: "rgba(196,135,59,0.25)" }}
      >
        {!mounted ? (
          <div
            className="flex h-full items-center justify-center text-ink/40"
            style={{ backgroundColor: "#F4ECE0", fontFamily: "JetBrains Mono, monospace", fontSize: "12px" }}
          >
            지도 로딩 중...
          </div>
        ) : (
          <MapContainer
            center={[GYEONGGI_CENTER.lat, GYEONGGI_CENTER.lng]}
            zoom={9}
            scrollWheelZoom
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CartoDB</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            {REGIONS.map((r) => (
              <CircleMarker
                key={r.id}
                center={[r.lat, r.lng]}
                radius={4}
                pathOptions={{
                  color: "#C4873B",
                  fillColor: "#C4873B",
                  fillOpacity: 0.25,
                  weight: 1,
                }}
              >
                <Tooltip direction="top" offset={[0, -4]} opacity={0.97}>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "10px" }}>
                    경기 {r.name} · 인구 {r.population.toLocaleString()}
                  </span>
                </Tooltip>
              </CircleMarker>
            ))}
            {filtered.map((s) => (
              <SpotCircle key={s.id} spot={s} />
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
}

function SpotCircle({ spot }: { spot: Spot }) {
  const cat = getCategory(spot.category);
  const radius = 6 + (spot.bsi / 95) * 10;
  return (
    <CircleMarker
      center={[spot.lat, spot.lng]}
      radius={radius}
      pathOptions={{
        color: bsiColor(spot.bsi),
        fillColor: bsiColor(spot.bsi),
        fillOpacity: 0.72,
        weight: 1.5,
      }}
    >
      <Popup>
        <div
          className="space-y-2 text-sm"
          style={{ fontFamily: "Pretendard Variable, sans-serif", minWidth: "200px" }}
        >
          <div style={{ borderBottom: "1px solid rgba(196,135,59,0.25)", paddingBottom: "6px", marginBottom: "6px" }}>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", color: "#C4873B", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>
              {cat?.label} · {spot.status}
            </div>
            <div style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 700, fontSize: "13px", color: "#0A1628", lineHeight: "1.3" }}>
              {spot.title}
            </div>
          </div>
          <BsiBadge score={spot.bsi} size="sm" />
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", color: "rgba(10,22,40,0.45)", marginTop: "4px" }}>
분석 데이터 {spot.reporters}건 · {spot.reportedAt}
          </div>
        </div>
      </Popup>
    </CircleMarker>
  );
}
