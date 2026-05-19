"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { SPOTS, type Spot } from "@/data/mockSpots";
import { REGIONS, GYEONGIN_CENTER } from "@/data/mockRegions";
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

  return (
    <div className="grid gap-4 md:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900">필터</h3>

        <div className="mt-3">
          <label className="text-xs font-medium text-slate-600">카테고리</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as CategorySlug | "all")}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm focus:border-bluespot focus:outline-none focus:ring-1 focus:ring-bluespot"
          >
            <option value="all">전체 12개 카테고리</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.emoji} {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <label className="text-xs font-medium text-slate-600">
            최소 BSI 점수 — {minBsi}
          </label>
          <input
            type="range"
            min={0}
            max={95}
            step={5}
            value={minBsi}
            onChange={(e) => setMinBsi(Number(e.target.value))}
            className="mt-1 w-full accent-bluespot"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>0</span>
            <span>40</span>
            <span>80</span>
            <span>95</span>
          </div>
        </div>

        <div className="mt-5 rounded-lg bg-slate-50 p-3 text-xs">
          <div className="font-semibold text-slate-700">현재 표시</div>
          <div className="mt-1 text-slate-600">
            <strong className="text-bluespot">{filtered.length}건</strong> /
            전체 {SPOTS.length}건
          </div>
        </div>

        <div className="mt-4 space-y-1.5">
          <h4 className="text-xs font-bold text-slate-700">BSI 색상 범례</h4>
          <Legend color="#DC2626" label="80+ 심각" />
          <Legend color="#EA580C" label="60-79 주의" />
          <Legend color="#FCD34D" label="40-59 관찰" />
          <Legend color="#84CC16" label="20-39 양호" />
          <Legend color="#22C55E" label="0-19 안정" />
        </div>
      </aside>

      {/* Map */}
      <div className="h-[70vh] min-h-[500px] overflow-hidden rounded-xl border border-slate-200 shadow-sm">
        {!mounted ? (
          <div className="flex h-full items-center justify-center text-slate-500">
            지도 로딩 중...
          </div>
        ) : (
          <MapContainer
            center={[GYEONGIN_CENTER.lat, GYEONGIN_CENTER.lng]}
            zoom={9}
            scrollWheelZoom
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {REGIONS.map((r) => (
              <CircleMarker
                key={r.id}
                center={[r.lat, r.lng]}
                radius={5}
                pathOptions={{ color: "#1E40AF", fillColor: "#1E40AF", fillOpacity: 0.4, weight: 1 }}
              >
                <Tooltip direction="top" offset={[0, -5]} opacity={0.95}>
                  <span className="text-xs">
                    {r.province} {r.name} · 인구 {r.population.toLocaleString()}
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
        fillOpacity: 0.65,
        weight: 2,
      }}
    >
      <Popup>
        <div className="space-y-1.5 text-sm">
          <div className="flex items-center gap-1 text-xs">
            <span>{cat?.emoji}</span>
            <span className="font-medium text-slate-700">{cat?.label}</span>
            <span className="text-slate-400">· {spot.status}</span>
          </div>
          <div className="font-semibold leading-snug">{spot.title}</div>
          <BsiBadge score={spot.bsi} size="sm" />
          <div className="text-xs text-slate-500">
            제보 {spot.reporters}명 · {spot.reportedAt}
          </div>
        </div>
      </Popup>
    </CircleMarker>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-600">
      <span
        className="inline-block h-3 w-3 rounded-full border border-white shadow"
        style={{ backgroundColor: color }}
      />
      <span>{label}</span>
    </div>
  );
}
