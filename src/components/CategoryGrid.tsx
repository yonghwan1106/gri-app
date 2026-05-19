import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
      {CATEGORIES.map((c, idx) => {
        const card = (
          <div
            className="group relative flex flex-col items-center justify-center rounded-sm border bg-paper p-3 text-center shadow-ink-sm transition-all duration-300 sm:p-4 overflow-hidden"
            style={{
              borderColor: "rgba(196,135,59,0.22)",
              animationDelay: `${idx * 0.04}s`,
            }}
          >
            {/* Top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-300 group-hover:h-1"
              style={{ backgroundColor: c.color }}
            />

            {/* Category number — magazine style */}
            <span
              className="absolute top-2 right-2 text-[8px] opacity-25"
              style={{ fontFamily: "JetBrains Mono, monospace", color: c.color }}
            >
              {String(idx + 1).padStart(2, "0")}
            </span>

            <div className="text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110">
              {c.emoji}
            </div>
            <div
              className="mt-1.5 text-xs font-bold text-ink sm:text-sm"
              style={{ fontFamily: "Fraunces, Georgia, serif" }}
            >
              {c.label}
            </div>
            <div
              className="mt-1 text-[9px] transition-colors duration-200"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                color: c.hasDetailPage ? c.color : "rgba(10,22,40,0.3)",
              }}
            >
              {c.hasDetailPage ? "상세 보기 →" : "곧 공개"}
            </div>

            {/* Gold shimmer on hover */}
            {c.hasDetailPage && (
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, transparent 40%, rgba(196,135,59,0.06) 100%)`,
                }}
              />
            )}
          </div>
        );

        return c.hasDetailPage ? (
          <Link key={c.slug} href={`/category/${c.slug}`} className="block">
            {card}
          </Link>
        ) : (
          <div key={c.slug} className="cursor-not-allowed opacity-60">
            {card}
          </div>
        );
      })}
    </div>
  );
}
