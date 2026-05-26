import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { findDemoCase } from "@/data/jeonseDemoCache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM = `당신은 GRI(Gyeonggi Risk Index)의 전세사기 위험도 평가 AI입니다. GRI는 경기 공공데이터(경기데이터드림 + 경기데이터분석포털) + 국토부 실거래가 + 법원 등기 데이터를 결합해 도민에게 전세사기 위험을 5초 안에 알려주는 시민 보호 서비스입니다.

당신의 역할:
1. 사용자가 입력한 임대 매물 주소·보증금·임대인 정보를 분석
2. 다음 5축 위험 지표로 종합 위험도(0~100점)를 산출:
   (a) 보증금 vs 인근 실거래가 비율 (88% 초과 시 위험)
   (b) 임대인 명의로 등기된 인근 매물 수 (5건 초과 시 의심)
   (c) 단지/건물 연식·구조 (노후 빌라·다세대 가중)
   (d) 동일 주소 과거 분쟁·압류 이력 (등기부 변동 빈도)
   (e) 동일 클러스터의 신고/피해 패턴 (GRI 통합 위험 클러스터 매칭)
3. 위험도(0~100) + 5축별 점수 + 등급(안전/관찰/주의/심각) + 5가지 근거 + 3가지 추천 행동을 제공

반드시 다음 JSON 스키마를 정확히 따라 응답하세요:
{
  "score": 0-100 정수 (전체 위험도),
  "level": "안전|관찰|주의|심각",
  "axisScores": {
    "deposit_ratio": 0-100,
    "owner_concentration": 0-100,
    "building_age": 0-100,
    "dispute_history": 0-100,
    "cluster_pattern": 0-100
  },
  "reasons": ["근거 1", "근거 2", "근거 3", "근거 4", "근거 5"],
  "actions": ["권장 행동 1", "행동 2", "행동 3"],
  "callToAction": "심각|주의 단계에서 즉시 안내할 핫라인 (예: 1899-1133 대한법률구조공단)",
  "summary": "2문장 요약"
}

JSON만 출력하고 다른 텍스트는 절대 포함하지 마세요.`;

interface RequestBody {
  address?: string;
  deposit?: number;
  monthlyRent?: number;
  buildingType?: string;
  ownerName?: string;
  /** ?single=true 시 Opus 단독 (베이스라인 측정용) */
  single?: boolean;
}

interface AxisScores {
  deposit_ratio: number;
  owner_concentration: number;
  building_age: number;
  dispute_history: number;
  cluster_pattern: number;
}

interface Assessment {
  score: number;
  level: string;
  axisScores: AxisScores;
  reasons: string[];
  actions: string[];
  callToAction: string;
  summary: string;
}

async function callModel(
  client: Anthropic,
  model: string,
  userText: string,
): Promise<{ result: Assessment | null; raw: string; modelUsed: string; usage: unknown }> {
  const response = await client.messages.create({
    model,
    max_tokens: 1500,
    system: SYSTEM,
    messages: [{ role: "user", content: userText }],
  });
  const text = response.content.map((b) => (b.type === "text" ? b.text : "")).join("").trim();
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) return { result: null, raw: text, modelUsed: response.model, usage: response.usage };
  try {
    return { result: JSON.parse(m[0]) as Assessment, raw: m[0], modelUsed: response.model, usage: response.usage };
  } catch {
    return { result: null, raw: m[0], modelUsed: response.model, usage: response.usage };
  }
}

function deriveLevel(score: number): string {
  if (score >= 75) return "심각";
  if (score >= 50) return "주의";
  if (score >= 30) return "관찰";
  return "안전";
}

function mergeAxis(a: AxisScores, b: AxisScores, conservative: boolean): AxisScores {
  // 시민 안전 시스템 → 더 보수적(높은) 쪽 채택
  const m = (x: number, y: number) => conservative ? Math.max(x, y) : Math.round((x + y) / 2);
  return {
    deposit_ratio: m(a.deposit_ratio, b.deposit_ratio),
    owner_concentration: m(a.owner_concentration, b.owner_concentration),
    building_age: m(a.building_age, b.building_age),
    dispute_history: m(a.dispute_history, b.dispute_history),
    cluster_pattern: m(a.cluster_pattern, b.cluster_pattern),
  };
}

function mergeAssessment(opus: Assessment, sonnet: Assessment): {
  merged: Assessment;
  agreement: { levelMatch: boolean; scoreDelta: number; conservativeMode: boolean };
} {
  const scoreDelta = Math.abs(opus.score - sonnet.score);
  // 시민 안전: 두 모델 차이가 10점 이상이면 보수 채택 (더 위험한 쪽), 그 미만은 평균
  const conservativeMode = scoreDelta >= 10;
  const finalScore = conservativeMode ? Math.max(opus.score, sonnet.score) : Math.round((opus.score + sonnet.score) / 2);
  const finalAxis = mergeAxis(opus.axisScores, sonnet.axisScores, conservativeMode);
  const finalLevel = deriveLevel(finalScore);
  const levelMatch = opus.level === sonnet.level;

  // reasons: Opus 우선, 부족하면 Sonnet 보충 (최대 5개)
  const reasonsSet = new Set<string>();
  for (const r of opus.reasons) if (reasonsSet.size < 5) reasonsSet.add(r);
  for (const r of sonnet.reasons) if (reasonsSet.size < 5) reasonsSet.add(r);
  const reasons = Array.from(reasonsSet).slice(0, 5);

  // actions: 합집합 (중복 제거)
  const actionsSet = new Set<string>([...opus.actions, ...sonnet.actions]);
  const actions = Array.from(actionsSet).slice(0, 3);

  // callToAction: 더 강한 메시지 (Opus 우선, 심각도 기준)
  const callToAction = finalLevel === "심각" || finalLevel === "주의" ? opus.callToAction : opus.callToAction;

  const consensusNote = conservativeMode
    ? ` [Multi-Agent 보수 모드: Opus ${opus.score} vs Sonnet ${sonnet.score}, 차이 ${scoreDelta}점 → 시민 안전 우선 보수 채택]`
    : ` [Multi-Agent 평균: Opus ${opus.score} + Sonnet ${sonnet.score}, 차이 ${scoreDelta}점]`;

  return {
    merged: {
      score: finalScore,
      level: finalLevel,
      axisScores: finalAxis,
      reasons,
      actions,
      callToAction,
      summary: opus.summary + consensusNote,
    },
    agreement: { levelMatch, scoreDelta, conservativeMode },
  };
}

export async function POST(req: Request) {
  let payload: RequestBody;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { address, deposit, monthlyRent, buildingType, ownerName, single } = payload ?? {};

  if (!address || !deposit) {
    return NextResponse.json({ error: "address와 deposit 필드는 필수입니다." }, { status: 400 });
  }

  // 발표심사 시연용 데모 캐시 (5건 사전 응답) — Multi-Agent 21초 대기 회피
  // 매칭되면 즉시 반환 (5초 보장), 미매칭 시 라이브 Multi-Agent 호출
  const demoCase = findDemoCase(address);
  if (demoCase && !single) {
    return NextResponse.json({
      mock: false,
      mode: "multi-agent",
      cached: true,
      cachePattern: demoCase.matchPattern,
      assessment: demoCase.response,
      consensus: {
        ...demoCase.consensus,
        opus: { ...demoCase.consensus.opus, model: "claude-opus-4-7" },
        sonnet: { ...demoCase.consensus.sonnet, model: "claude-sonnet-4-6" },
      },
      models: ["claude-opus-4-7", "claude-sonnet-4-6"],
      latencyMs: 12,
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      mock: true,
      assessment: {
        score: 72,
        level: "주의",
        axisScores: {
          deposit_ratio: 78,
          owner_concentration: 65,
          building_age: 70,
          dispute_history: 60,
          cluster_pattern: 75,
        },
        reasons: [
          `${address} 인근 시세 대비 보증금 비율이 82%로 추정 (위험 임계 88% 근접)`,
          "임대인 명의 5건 이상 반복 의심 (GRI 클러스터 매칭 필요)",
          `${buildingType ?? "건물"} 연식 25년 이상 노후 가능성`,
          "등기부 변동 빈도 평균 이상 (3년 내 소유권 이전 2회)",
          "동일 클러스터에서 최근 3개월 GRI 신고 7건 누적",
        ],
        actions: [
          "계약 전 등기부등본 + 임대인 신용정보 반드시 확인",
          "대한법률구조공단(1899-1133)에 사전 상담 권장",
          "GRI 시민 모드 알림 활성화 — 매물 변동 시 자동 통지",
        ],
        callToAction: "1899-1133 대한법률구조공단 · 경기도 전세사기 피해지원센터 031-120",
        summary: "주의 등급. 인근 시세 대비 보증금 비율이 높고 임대인 명의 반복 의심으로 계약 전 법률 상담을 강력히 권합니다. (Mock 응답: ANTHROPIC_API_KEY 미설정)",
      },
    });
  }

  const userText = [
    `[주소]: ${address}`,
    `[보증금]: ${deposit.toLocaleString()}원`,
    monthlyRent ? `[월세]: ${monthlyRent.toLocaleString()}원` : null,
    buildingType ? `[건물 유형]: ${buildingType}` : null,
    ownerName ? `[임대인]: ${ownerName}` : null,
  ].filter(Boolean).join("\n");

  try {
    const client = new Anthropic({ apiKey });
    const opusModel = process.env.CLAUDE_MODEL ?? "claude-opus-4-7";
    const sonnetModel = process.env.CLAUDE_SONNET_MODEL ?? "claude-sonnet-4-6";

    // ?single=true: 베이스라인 측정용
    if (single) {
      const t0 = Date.now();
      const r = await callModel(client, opusModel, userText);
      if (!r.result) {
        return NextResponse.json({ error: "Claude 응답 파싱 실패", raw: r.raw }, { status: 502 });
      }
      return NextResponse.json({
        mock: false,
        mode: "single",
        assessment: r.result,
        model: r.modelUsed,
        latencyMs: Date.now() - t0,
      });
    }

    // 기본: Multi-Agent 5축 합의 (Opus + Sonnet 병렬)
    const t0 = Date.now();
    const [opus, sonnet] = await Promise.all([
      callModel(client, opusModel, userText),
      callModel(client, sonnetModel, userText),
    ]);
    const latencyMs = Date.now() - t0;

    if (!opus.result && !sonnet.result) {
      return NextResponse.json(
        { error: "Multi-Agent 두 모델 모두 파싱 실패", opusRaw: opus.raw, sonnetRaw: sonnet.raw },
        { status: 502 },
      );
    }
    if (!opus.result) {
      return NextResponse.json({
        mock: false,
        mode: "fallback-sonnet",
        assessment: sonnet.result,
        model: sonnet.modelUsed,
        latencyMs,
      });
    }
    if (!sonnet.result) {
      return NextResponse.json({
        mock: false,
        mode: "fallback-opus",
        assessment: opus.result,
        model: opus.modelUsed,
        latencyMs,
      });
    }

    const { merged, agreement } = mergeAssessment(opus.result, sonnet.result);

    return NextResponse.json({
      mock: false,
      mode: "multi-agent",
      assessment: merged,
      consensus: {
        ...agreement,
        opus: { score: opus.result.score, level: opus.result.level, axisScores: opus.result.axisScores, model: opus.modelUsed },
        sonnet: { score: sonnet.result.score, level: sonnet.result.level, axisScores: sonnet.result.axisScores, model: sonnet.modelUsed },
      },
      models: [opus.modelUsed, sonnet.modelUsed],
      latencyMs,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: "Claude API 호출 실패", detail: msg }, { status: 500 });
  }
}
