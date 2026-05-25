"use client";

import { useState } from "react";
import { CATEGORIES } from "@/data/categories";
import { REGIONS } from "@/data/mockRegions";

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

const labelStyle: React.CSSProperties = {
  fontFamily: "JetBrains Mono, monospace",
  fontSize: "9px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#C4873B",
  display: "block",
  marginBottom: "6px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#FBF7F0",
  border: "1px solid rgba(196,135,59,0.35)",
  borderRadius: "2px",
  padding: "10px 14px",
  fontFamily: "Pretendard Variable, sans-serif",
  fontSize: "14px",
  color: "#0A1628",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

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
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Form — 정책 진단 양식 */}
      <form
        onSubmit={handleSubmit}
        className="rounded-sm border bg-paper shadow-ink-sm overflow-hidden"
        style={{ borderColor: "rgba(196,135,59,0.25)" }}
      >
        {/* Form header */}
        <div className="border-b px-6 py-4" style={{ borderColor: "rgba(196,135,59,0.2)", backgroundColor: "#0A1628" }}>
          <div
            className="text-[9px] tracking-widest uppercase mb-1"
            style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
          >
            GRI Editorial 정책 진단
          </div>
          <div className="flex items-center justify-between">
            <h2
              className="text-white text-lg font-bold"
              style={{ fontFamily: "Fraunces, Georgia, serif" }}
            >
              제보 입력란
            </h2>
            <button
              type="button"
              onClick={applyPreset}
              className="text-[10px] text-gold-leaf/70 hover:text-gold-leaf transition-colors"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              예시 자동 채우기
            </button>
          </div>
        </div>

        {/* Gold leaf rule */}
        <div className="h-px bg-gold-leaf/20" />

        <div className="p-6 space-y-5">
          {/* Category */}
          <div>
            <label style={labelStyle}>분류 카테고리</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = "#C4873B";
                e.target.style.boxShadow = "0 0 0 3px rgba(196,135,59,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(196,135,59,0.35)";
                e.target.style.boxShadow = "none";
              }}
            >
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.label}>
                  {c.emoji} {c.label} — {c.description}
                </option>
              ))}
            </select>
          </div>

          {/* Region */}
          <div>
            <label style={labelStyle}>지역 (시·군·구)</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = "#C4873B";
                e.target.style.boxShadow = "0 0 0 3px rgba(196,135,59,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(196,135,59,0.35)";
                e.target.style.boxShadow = "none";
              }}
            >
              <optgroup label="경기 시">
                {REGIONS.filter((r) => r.kind === "시").map((r) => (
                  <option key={r.id} value={r.name}>{r.name}</option>
                ))}
              </optgroup>
              <optgroup label="경기 군">
                {REGIONS.filter((r) => r.kind === "군").map((r) => (
                  <option key={r.id} value={r.name}>{r.name}</option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Title */}
          <div>
            <label style={labelStyle}>제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 야간 소아 응급 진료 공백"
              style={{ ...inputStyle, fontStyle: title ? "normal" : "italic" }}
              maxLength={120}
              onFocus={(e) => {
                e.target.style.borderColor = "#C4873B";
                e.target.style.boxShadow = "0 0 0 3px rgba(196,135,59,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(196,135,59,0.35)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Body */}
          <div>
            <label style={labelStyle}>투고 내용</label>
            <textarea
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="구체적인 상황, 시간대, 빈도, 영향받는 인원을 적어주세요."
              style={{ ...inputStyle, resize: "vertical", lineHeight: "1.7" }}
              maxLength={1000}
              onFocus={(e) => {
                e.target.style.borderColor = "#C4873B";
                e.target.style.boxShadow = "0 0 0 3px rgba(196,135,59,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(196,135,59,0.35)";
                e.target.style.boxShadow = "none";
              }}
            />
            <div
              className="mt-1 text-right"
              style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", color: "rgba(10,22,40,0.3)" }}
            >
              {body.length}/1000
            </div>
          </div>

          {/* Image upload (disabled) */}
          <div>
            <label style={labelStyle}>사진 첨부 (선택)</label>
            <input
              type="file"
              accept="image/*"
              disabled
              className="block w-full text-xs file:mr-3 file:rounded-sm file:border-0 file:bg-paper-warm file:px-3 file:py-1.5 file:text-[10px] file:font-bold file:text-ink/40 file:cursor-not-allowed opacity-40"
            />
            <div
              className="mt-1"
              style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", color: "rgba(10,22,40,0.3)" }}
            >
              * v0.5에서 활성화 — 현재 데모는 텍스트만 처리합니다.
            </div>
          </div>

          {error && (
            <div
              className="rounded-sm border px-4 py-3 text-sm"
              style={{ borderColor: "#B91C1C", backgroundColor: "#FEF2F2", color: "#B91C1C" }}
            >
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-bold text-sm transition-colors rounded-sm"
            style={{
              fontFamily: "Fraunces, Georgia, serif",
              backgroundColor: loading ? "rgba(10,22,40,0.4)" : "#0A1628",
              color: "#FBF7F0",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Claude Opus 4 분석 중..." : "투고 제출 — AI 분석 시작"}
          </button>

          <p
            className="text-center"
            style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", color: "rgba(10,22,40,0.35)" }}
          >
            제출 시 Claude Opus 4 모델이 제보를 분류하고 GRI·우선순위·다음 단계를 산출합니다.<br />
            (API 키 미설정 시 mock 응답 반환)
          </p>
        </div>
      </form>

      {/* Result — 편집장 검토 결과 */}
      <div
        className="rounded-sm border bg-paper shadow-ink-sm overflow-hidden"
        style={{ borderColor: "rgba(196,135,59,0.25)" }}
      >
        {/* Result header */}
        <div className="border-b px-6 py-4" style={{ borderColor: "rgba(196,135,59,0.2)", backgroundColor: "#F4ECE0" }}>
          <div
            className="text-[9px] tracking-widest uppercase mb-1"
            style={{ fontFamily: "JetBrains Mono, monospace", color: "#C4873B" }}
          >
            GRI Multi-Agent AI 교차검증 엔진
          </div>
          <h2
            className="text-ink text-lg font-bold"
            style={{ fontFamily: "Fraunces, Georgia, serif" }}
          >
            편집장 검토 결과
          </h2>
        </div>

        <div className="p-6">
          {!result && !loading && (
            <div
              className="flex flex-col items-center justify-center py-16 text-center rounded-sm border border-dashed"
              style={{ borderColor: "rgba(196,135,59,0.25)", backgroundColor: "#F4ECE0" }}
            >
              <div style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: "2rem", color: "rgba(196,135,59,0.4)" }}>◈</div>
              <p
                className="mt-3 text-sm"
                style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(10,22,40,0.35)", fontSize: "11px" }}
              >
                투고 양식을 작성하고 제출하면<br />
                결과가 여기에 표시됩니다.
              </p>
            </div>
          )}

          {loading && (
            <div
              className="flex flex-col items-center justify-center py-16 text-center rounded-sm border"
              style={{ borderColor: "rgba(30,64,175,0.2)", backgroundColor: "#EFF6FF" }}
            >
              <div
                className="inline-block h-5 w-5 rounded-full animate-pulse mb-3"
                style={{ backgroundColor: "#1E40AF" }}
              />
              <p
                style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "#1E40AF" }}
              >
                Claude Opus 4가 제보를 분석하고 있습니다...
              </p>
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
    </div>
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
    <div className="space-y-5">
      {mock && (
        <div
          className="rounded-sm border px-4 py-3 text-xs"
          style={{ borderColor: "rgba(196,135,59,0.35)", backgroundColor: "#FFFBEB", color: "#92400E" }}
        >
          <strong style={{ fontFamily: "JetBrains Mono, monospace" }}>Mock 응답:</strong>{" "}
          ANTHROPIC_API_KEY 환경변수가 설정되지 않았습니다.
        </div>
      )}

      {/* GRI headline */}
      <div
        className="rounded-sm p-4 border"
        style={{ borderColor: "rgba(196,135,59,0.2)", backgroundColor: "#F4ECE0" }}
      >
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", color: "#C4873B", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "6px" }}>
          분류 결과
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="px-3 py-1 rounded-sm text-paper text-xs font-bold"
            style={{ backgroundColor: "#1E40AF", fontFamily: "JetBrains Mono, monospace" }}
          >
            {result.categoryLabel}
          </span>
          <span
            className="px-3 py-1 rounded-sm text-xs font-bold"
            style={{ backgroundColor: "rgba(10,22,40,0.08)", color: "#0A1628", fontFamily: "JetBrains Mono, monospace" }}
          >
            우선순위 · {result.priority}
          </span>
          <span
            className="px-3 py-1 rounded-sm text-xs font-bold"
            style={{ backgroundColor: "#FEE2E2", color: "#B91C1C", fontFamily: "JetBrains Mono, monospace" }}
          >
            GRI {result.bsi} · {result.bsiLevel}
          </span>
        </div>
      </div>

      {/* Summary */}
      <div>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", color: "#C4873B", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "8px" }}>
          요약
        </div>
        <p
          className="text-sm text-ink leading-relaxed"
          style={{ wordBreak: "keep-all", lineHeight: "1.8" }}
        >
          {result.summary}
        </p>
      </div>

      {/* Gold divider */}
      <div className="h-px bg-gold-leaf/20" />

      {/* Next steps */}
      <div>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", color: "#C4873B", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "10px" }}>
          제안된 다음 단계
        </div>
        <ol className="space-y-2.5">
          {result.nextSteps.map((s, i) => (
            <li key={i} className="flex gap-3 text-sm text-ink/80">
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm text-paper text-[10px] font-bold mt-0.5"
                style={{ backgroundColor: "#1E40AF", fontFamily: "JetBrains Mono, monospace" }}
              >
                {i + 1}
              </span>
              <span style={{ lineHeight: "1.7" }}>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Data sources */}
      <div
        className="rounded-sm p-4 border"
        style={{ borderColor: "rgba(196,135,59,0.18)", backgroundColor: "#F4ECE0" }}
      >
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", color: "#C4873B", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "8px" }}>
          교차검증 데이터 출처
        </div>
        <ul className="space-y-1">
          {result.dataSources.map((d, i) => (
            <li key={i} className="text-xs text-ink/60 flex gap-1.5">
              <span style={{ color: "#C4873B" }}>—</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Rationale */}
      <div
        className="rounded-sm border-l-2 pl-4 py-1"
        style={{ borderColor: "#C4873B" }}
      >
        <p className="text-xs text-ink/60 leading-relaxed">
          <strong className="text-ink/80" style={{ fontFamily: "JetBrains Mono, monospace" }}>AI 산출 근거:</strong>{" "}
          {result.rationale}
        </p>
      </div>

      {model && (
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", color: "rgba(10,22,40,0.3)" }}>
          모델: {model}
        </div>
      )}
    </div>
  );
}
