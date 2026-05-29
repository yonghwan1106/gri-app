"use client";

import { useState } from "react";

interface AxisScores {
  deposit_ratio: number;
  owner_concentration: number;
  building_age: number;
  dispute_history: number;
  cluster_pattern: number;
}

interface Assessment {
  score: number;
  level: "안전" | "관찰" | "주의" | "심각";
  axisScores: AxisScores;
  reasons: string[];
  actions: string[];
  callToAction: string;
  summary: string;
}

interface MolitItem {
  buildingType: string;
  buildingName?: string;
  legalDong?: string;
  area?: number;
  deposit?: number;
  monthlyRent?: number;
  contractYmd?: string;
  buildYear?: number;
  floor?: number;
}

interface MolitStats {
  count: number;
  depositMin: number;
  depositMax: number;
  depositMedian: number;
  depositMean: number;
}

interface MolitResponse {
  mock?: boolean;
  lawd?: { city: string; code: string };
  apiUsed?: string;
  stats?: MolitStats;
  itemCount?: number;
  items?: MolitItem[];
  error?: string;
  hint?: string;
}

const AXIS_LABELS: Record<keyof AxisScores, string> = {
  deposit_ratio: "보증금 비율",
  owner_concentration: "임대인 집중도",
  building_age: "건물 연식",
  dispute_history: "분쟁 이력",
  cluster_pattern: "클러스터 패턴",
};

const LEVEL_STYLE: Record<Assessment["level"], { color: string; bg: string; emoji: string }> = {
  안전: { color: "#166534", bg: "#DCFCE7", emoji: "✅" },
  관찰: { color: "#92400E", bg: "#FEF3C7", emoji: "👀" },
  주의: { color: "#B91C1C", bg: "#FEE2E2", emoji: "⚠️" },
  심각: { color: "#7F1D1D", bg: "#FECACA", emoji: "🚨" },
};

function formatWon(v: number): string {
  if (v >= 100000000) return `${(v / 100000000).toFixed(1)}억`;
  if (v >= 10000) return `${(v / 10000).toFixed(0)}만`;
  return v.toLocaleString();
}

export function JeonseForm() {
  const [address, setAddress] = useState("");
  const [deposit, setDeposit] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [buildingType, setBuildingType] = useState("아파트");
  const [ownerName, setOwnerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Assessment | null>(null);
  const [molit, setMolit] = useState<MolitResponse | null>(null);
  const [isMock, setIsMock] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setMolit(null);

    if (!address.trim() || !deposit.trim()) {
      setError("주소와 보증금은 필수 입력 항목입니다.");
      return;
    }

    setLoading(true);
    try {
      const body = {
        address: address.trim(),
        deposit: Number(deposit.replace(/[^0-9]/g, "")),
        monthlyRent: monthlyRent ? Number(monthlyRent.replace(/[^0-9]/g, "")) : undefined,
        buildingType,
        ownerName: ownerName.trim() || undefined,
      };

      // Claude 위험도 + 국토부 실거래가 병렬 호출
      const [scoreRes, molitRes] = await Promise.all([
        fetch("/api/jeonse/score", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }),
        fetch("/api/jeonse/molit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ address: body.address, buildingType, months: 3 }) }),
      ]);

      const scoreData = await scoreRes.json();
      const molitData = (await molitRes.json()) as MolitResponse;

      if (!scoreRes.ok || !scoreData.assessment) {
        setError(scoreData.error ?? "AI 분석에 실패했습니다. 잠시 후 다시 시도해주세요.");
        return;
      }

      setResult(scoreData.assessment);
      setIsMock(Boolean(scoreData.mock));
      setMolit(molitData);
    } catch (e) {
      setError("네트워크 오류가 발생했습니다. " + (e instanceof Error ? e.message : ""));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-paper border border-gold-leaf/25 rounded-sm p-6 sm:p-8">
        <h2 className="text-xl font-bold text-ink mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>임대 매물 정보 입력</h2>
        <p className="text-xs text-ink/55 mb-6" style={{ wordBreak: 'keep-all' }}>
          입력 정보는 분석 후 저장하지 않으며, GRI는 개인정보를 수집하지 않습니다. 경기도 31개 시·군 한정.
        </p>

        <div className="space-y-5">
          <Field label="주소" required>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="예: 경기 용인시 기흥구 동백죽전대로 123"
              className="w-full px-3 py-2 border border-ink/15 rounded-sm text-sm focus:outline-none focus:border-blue-deep transition-colors"
            />
          </Field>

          <Field label="건물 유형" required>
            <select
              value={buildingType}
              onChange={(e) => setBuildingType(e.target.value)}
              className="w-full px-3 py-2 border border-ink/15 rounded-sm text-sm focus:outline-none focus:border-blue-deep transition-colors bg-paper"
            >
              <option>아파트</option>
              <option>오피스텔</option>
              <option>연립·다세대</option>
              <option>단독·다가구</option>
            </select>
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="보증금 (원)" required>
              <input
                type="text"
                inputMode="numeric"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                placeholder="200000000"
                className="w-full px-3 py-2 border border-ink/15 rounded-sm text-sm focus:outline-none focus:border-blue-deep transition-colors"
              />
            </Field>
            <Field label="월세 (원, 선택)">
              <input
                type="text"
                inputMode="numeric"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 border border-ink/15 rounded-sm text-sm focus:outline-none focus:border-blue-deep transition-colors"
              />
            </Field>
          </div>

          <Field label="임대인 이름 (선택)">
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="입력 시 임대인 명의 반복 매물 분석 정확도 향상"
              className="w-full px-3 py-2 border border-ink/15 rounded-sm text-sm focus:outline-none focus:border-blue-deep transition-colors"
            />
          </Field>
        </div>

        {error && (
          <div className="mt-4 px-3 py-2 bg-red-50 border border-red-200 rounded-sm text-xs text-red-700">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full py-3 text-paper font-bold text-sm rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          style={{ fontFamily: 'Fraunces, Georgia, serif', backgroundColor: '#003876' }}
        >
          {loading ? "AI 분석 + 실거래가 조회 중... (3~5초)" : "GRI 위험도 즉시 분석 →"}
        </button>

        <p className="mt-3 text-[10px] text-ink/40 leading-relaxed" style={{ wordBreak: 'keep-all' }}>
          Claude Opus 4.8로 5축 위험도(보증금/임대인/건물/분쟁/클러스터)를 평가하고, 국토교통부 실거래가 OpenAPI(자동승인 완료)로 인근 시세를 검증합니다.
        </p>
      </form>

      {/* Result */}
      <div className="bg-paper border border-gold-leaf/25 rounded-sm p-6 sm:p-8 min-h-[400px]">
        {!result && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-center text-ink/40">
            <div className="text-6xl mb-4 opacity-30">🛡️</div>
            <p className="text-sm" style={{ wordBreak: 'keep-all' }}>
              주소를 입력하면 AI 위험도(0~100)와<br />국토부 실거래가 시세를 동시 확인할 수 있습니다.
            </p>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-4xl mb-4 animate-pulse">🤖</div>
            <p className="text-sm text-ink/60 mb-2">GRI Multi-Agent 분석 중...</p>
            <div className="space-y-1 text-[11px] text-ink/40" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              <p>· Agent 1: 경기 공공데이터 탐색</p>
              <p>· Agent 2: 5축 위험도 평가 (Claude Opus 4.8)</p>
              <p>· Agent 3: 국토부 실거래가 검증 (MOLIT API)</p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-5">
            {/* Score gauge */}
            <div className="flex items-center gap-4">
              <ScoreGauge score={result.score} level={result.level} />
              <div className="flex-1">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-sm font-bold"
                  style={{ backgroundColor: LEVEL_STYLE[result.level].bg, color: LEVEL_STYLE[result.level].color, fontFamily: 'JetBrains Mono, monospace' }}
                >
                  <span>{LEVEL_STYLE[result.level].emoji}</span>
                  <span>위험도 {result.score} · {result.level}</span>
                </div>
                <p className="mt-2 text-sm text-ink/70 leading-[1.6]" style={{ wordBreak: 'keep-all' }}>{result.summary}</p>
              </div>
            </div>

            {/* MOLIT 실거래가 검증 (신규) */}
            {molit && molit.stats && molit.stats.count > 0 && (
              <div className="border-t border-gold-leaf/20 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[10px] font-bold text-gold-leaf tracking-widest uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    국토부 실거래가 검증 · {molit.lawd?.city ?? ''} 최근 3개월
                  </div>
                  <div className="text-[9px] text-ink/40" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {molit.mock ? 'MOCK' : molit.apiUsed} · N={molit.stats.count}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <StatCell label="최저 보증금" value={formatWon((molit.stats.depositMin) * 10000)} sub="만원" />
                  <StatCell label="최고 보증금" value={formatWon((molit.stats.depositMax) * 10000)} sub="만원" />
                  <StatCell label="중위 보증금" value={formatWon((molit.stats.depositMedian) * 10000)} sub="만원" accent />
                  <StatCell label="평균 보증금" value={formatWon((molit.stats.depositMean) * 10000)} sub="만원" />
                </div>
                {molit.items && molit.items.length > 0 && (
                  <div className="mt-2 text-[10px] text-ink/55 space-y-0.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {molit.items.slice(0, 3).map((it, i) => (
                      <div key={i} className="flex justify-between">
                        <span>{it.contractYmd} · {it.legalDong ?? ''} {it.buildingName ?? ''} {it.area ? `· ${it.area}㎡` : ''}</span>
                        <span className="text-blue-deep font-bold">{formatWon((it.deposit ?? 0) * 10000)}원</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {molit && molit.error && (
              <div className="border-t border-gold-leaf/20 pt-3 text-[10px] text-ink/45" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                실거래가 조회: {molit.error}{molit.hint ? ` (${molit.hint})` : ''}
              </div>
            )}

            {/* Axis scores */}
            <div>
              <div className="text-[10px] font-bold text-gold-leaf tracking-widest uppercase mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                5축 위험 지표
              </div>
              <div className="space-y-1.5">
                {Object.entries(result.axisScores).map(([k, v]) => (
                  <AxisBar key={k} label={AXIS_LABELS[k as keyof AxisScores]} value={v} />
                ))}
              </div>
            </div>

            {/* Reasons */}
            <div>
              <div className="text-[10px] font-bold text-gold-leaf tracking-widest uppercase mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                AI 근거 5가지
              </div>
              <ol className="space-y-1.5 text-xs text-ink/75">
                {result.reasons.map((r, i) => (
                  <li key={i} className="flex gap-2 leading-[1.6]" style={{ wordBreak: 'keep-all' }}>
                    <span className="text-blue-deep font-bold flex-shrink-0">{i + 1}.</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Actions */}
            <div className="border-t border-gold-leaf/25 pt-4">
              <div className="text-[10px] font-bold text-gold-leaf tracking-widest uppercase mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                권장 행동
              </div>
              <ul className="space-y-1 text-xs text-ink/75">
                {result.actions.map((a, i) => (
                  <li key={i} className="flex gap-2 leading-[1.6]" style={{ wordBreak: 'keep-all' }}>
                    <span className="text-green-700">→</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to action */}
            {(result.level === "주의" || result.level === "심각") && (
              <div
                className="rounded-sm border-2 p-3 text-xs leading-[1.6]"
                style={{ borderColor: LEVEL_STYLE[result.level].color, backgroundColor: LEVEL_STYLE[result.level].bg, color: LEVEL_STYLE[result.level].color, wordBreak: 'keep-all' }}
              >
                <strong>📞 즉시 상담</strong><br />
                {result.callToAction}
              </div>
            )}

            {isMock && (
              <p className="text-[10px] text-ink/35 border-t border-ink/10 pt-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                ⚠️ Mock 응답 (ANTHROPIC_API_KEY 미설정). Vercel 환경변수 설정 시 Claude Opus 4.8 실시간 분석.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-ink/80 mb-1.5" style={{ fontFamily: 'Pretendard Variable, sans-serif' }}>
        {label}
        {required && <span className="text-red-600 ml-0.5">*</span>}
      </span>
      {children}
    </label>
  );
}

function ScoreGauge({ score, level }: { score: number; level: Assessment["level"] }) {
  const r = 28;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div className="relative w-20 h-20 flex-shrink-0">
      <svg viewBox="0 0 72 72" className="w-full h-full -rotate-90">
        <circle cx="36" cy="36" r={r} stroke="#E5E7EB" strokeWidth="6" fill="none" />
        <circle cx="36" cy="36" r={r} stroke={LEVEL_STYLE[level].color} strokeWidth="6" fill="none" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        <span className="text-xl font-black leading-none" style={{ color: LEVEL_STYLE[level].color }}>{score}</span>
        <span className="text-[8px] text-ink/40 mt-0.5">GRI</span>
      </div>
    </div>
  );
}

function AxisBar({ label, value }: { label: string; value: number }) {
  const color = value >= 70 ? "#B91C1C" : value >= 50 ? "#C4873B" : "#16A085";
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-24 text-ink/60 flex-shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-paper-warm rounded-sm overflow-hidden">
        <div className="h-full transition-all" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      <span className="w-8 text-right font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color }}>{value}</span>
    </div>
  );
}

function StatCell({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className={`rounded-sm border px-2.5 py-2 ${accent ? 'border-blue-deep bg-blue-50' : 'border-gold-leaf/25 bg-paper-warm'}`}>
      <div className="text-[9px] text-ink/55 mb-0.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{label}</div>
      <div className={`text-sm font-black ${accent ? 'text-blue-deep' : 'text-ink/85'}`} style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        {value}<span className="text-[9px] text-ink/40 ml-0.5">{sub}</span>
      </div>
    </div>
  );
}
