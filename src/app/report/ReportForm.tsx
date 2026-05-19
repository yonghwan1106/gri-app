"use client";

import { useState } from "react";
import { CATEGORIES } from "@/data/categories";
import { REGIONS } from "@/data/mockRegions";
import { Button } from "@/components/ui/button";

interface Classification {
  category: string;
  categoryLabel: string;
  bsi: number;
  bsiLevel: string;
  priority: string;
  summary: string;
  nextSteps: string[];
  dataSources: string[];
  rationale: string;
}

interface ApiResponse {
  mock?: boolean;
  classification?: Classification;
  model?: string;
  error?: string;
  detail?: string;
}

export function ReportForm() {
  const [category, setCategory] = useState("의료");
  const [region, setRegion] = useState("수원시");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError("제목과 내용을 모두 입력해주세요.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ category, region, title, body }),
      });
      const data = (await res.json()) as ApiResponse;
      if (!res.ok) {
        setError(data.error ?? `요청 실패 (${res.status})`);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  function applyPreset() {
    setCategory("의료");
    setRegion("화성시");
    setTitle("화성 봉담읍 야간 소아 응급 진료 공백");
    setBody(
      "화성시 봉담읍에서 평일 21시 이후 도보 30분 내 소아 응급실이 없습니다. 아이가 밤에 갑자기 열이 났는데, 분당까지 차로 40분 이상 이동해야 했습니다. 같은 동네 학부모들도 비슷한 경험을 이야기합니다. 평일·주말 모두 야간 소아 진료 공백이 보입니다."
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">제보 입력</h2>
          <button
            type="button"
            onClick={applyPreset}
            className="text-xs font-medium text-bluespot hover:underline"
          >
            예시 자동 채우기
          </button>
        </div>

        <Field label="카테고리">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-bluespot focus:outline-none focus:ring-1 focus:ring-bluespot"
          >
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.label}>
                {c.emoji} {c.label} — {c.description}
              </option>
            ))}
          </select>
        </Field>

        <Field label="지역 (시·군·구)">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-bluespot focus:outline-none focus:ring-1 focus:ring-bluespot"
          >
            <optgroup label="경기">
              {REGIONS.filter((r) => r.province === "경기").map((r) => (
                <option key={r.id} value={r.name}>
                  {r.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="인천">
              {REGIONS.filter((r) => r.province === "인천").map((r) => (
                <option key={r.id} value={r.name}>
                  {r.name}
                </option>
              ))}
            </optgroup>
          </select>
        </Field>

        <Field label="제목">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 야간 소아 응급 진료 공백"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-bluespot focus:outline-none focus:ring-1 focus:ring-bluespot"
            maxLength={120}
          />
        </Field>

        <Field label="내용">
          <textarea
            rows={6}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="구체적인 상황, 시간대, 빈도, 영향받는 인원을 적어주세요."
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-bluespot focus:outline-none focus:ring-1 focus:ring-bluespot"
            maxLength={1000}
          />
          <div className="mt-1 text-right text-[10px] text-slate-400">
            {body.length}/1000
          </div>
        </Field>

        <Field label="이미지 첨부 (선택)">
          <input
            type="file"
            accept="image/*"
            className="block w-full text-xs file:mr-3 file:rounded-md file:border-0 file:bg-bluespot-50 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-bluespot hover:file:bg-bluespot-100"
            disabled
          />
          <div className="mt-1 text-[10px] text-slate-400">
            * v0.5에서 활성화 — 현재 데모는 텍스트만 처리합니다.
          </div>
        </Field>

        {error && (
          <div className="mb-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <Button type="submit" size="lg" disabled={loading} className="w-full">
          {loading ? "AI 분석 중..." : "제출 — Claude Opus 4 분석 시작"}
        </Button>

        <p className="mt-3 text-[11px] text-slate-500">
          제출하면 Claude Opus 4 모델이 제보를 분류하고 BSI 점수·우선순위·다음 단계를 산출합니다.
          (API 키 미설정 시 mock 응답 반환)
        </p>
      </form>

      {/* Result */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-bold">AI 분석 결과</h2>
        <p className="mt-1 text-xs text-slate-500">
          BlueSpot AI 교차검증 엔진 — 시민 제보를 자동 분류·우선순위·해결 단계로 변환합니다.
        </p>

        {!result && !loading && (
          <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
            왼쪽 폼을 작성하고 제출하면 결과가 여기에 표시됩니다.
          </div>
        )}

        {loading && (
          <div className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-bluespot-200 bg-bluespot-50 p-6 text-sm text-bluespot-700">
            <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-bluespot" />
            Claude Opus 4가 제보를 분석하고 있습니다...
          </div>
        )}

        {result?.classification && (
          <ResultCard
            result={result.classification}
            mock={result.mock === true}
            model={result.model}
          />
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="mb-3 block">
      <div className="mb-1 text-xs font-medium text-slate-700">{label}</div>
      {children}
    </label>
  );
}

function ResultCard({
  result,
  mock,
  model,
}: {
  result: Classification;
  mock: boolean;
  model?: string;
}) {
  return (
    <div className="mt-4 space-y-4">
      {mock && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
          <strong>Mock 응답:</strong> ANTHROPIC_API_KEY 환경변수가 설정되지 않았습니다.
          Vercel 환경변수에 키를 등록하면 Claude Opus 4 실시간 분석이 활성화됩니다.
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-bluespot-100 px-3 py-1 text-xs font-semibold text-bluespot-800">
          {result.categoryLabel}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          우선순위 · {result.priority}
        </span>
        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-800">
          BSI {result.bsi} · {result.bsiLevel}
        </span>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-900">요약</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-700">{result.summary}</p>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-900">제안된 다음 단계</h3>
        <ol className="mt-2 space-y-1.5">
          {result.nextSteps.map((s, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-700">
              <span className="font-bold text-bluespot">{i + 1}.</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-900">교차검증 데이터 출처</h3>
        <ul className="mt-2 space-y-1">
          {result.dataSources.map((d, i) => (
            <li key={i} className="text-sm text-slate-700">
              · {d}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
        <strong className="text-slate-800">AI 산출 근거:</strong> {result.rationale}
      </div>

      {model && (
        <div className="text-[10px] text-slate-400">
          모델: {model}
        </div>
      )}
    </div>
  );
}
