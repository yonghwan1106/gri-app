import Link from "next/link";
import { CATEGORIES } from "@/data/categories";

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
      {CATEGORIES.map((c) => {
        const card = (
          <div
            className="group flex h-full flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-bluespot hover:shadow-md sm:p-4"
            style={{ borderTopColor: c.color, borderTopWidth: 3 }}
          >
            <div className="text-2xl sm:text-3xl">{c.emoji}</div>
            <div className="mt-1 text-sm font-semibold sm:text-base">{c.label}</div>
            <div className="mt-0.5 text-[10px] text-slate-500 sm:text-xs">
              {c.hasDetailPage ? "상세 보기 →" : "곧 공개"}
            </div>
          </div>
        );
        return c.hasDetailPage ? (
          <Link key={c.slug} href={`/category/${c.slug}`}>
            {card}
          </Link>
        ) : (
          <div key={c.slug} className="cursor-not-allowed opacity-85">
            {card}
          </div>
        );
      })}
    </div>
  );
}
