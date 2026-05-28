import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { CATEGORIES } from "@/data/categories";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM = `당신은 GRI(Gyeonggi Risk Index)의 정책 위험도 자동 평가 AI입니다. GRI는 경기 공공데이터(경기데이터드림 + 경기데이터분석포털) + Claude Opus 4.7을 결합한 정책 위험도 지수 플랫폼으로, 경기도 31개 시·군의 7대 정책 위험도를 자동 진단합니다.

당신의 역할:
1. 입력된 정책 진단 요청을 7개 GRI 카테고리(medical/transit/disabled/air/housing/safety/edu) 중 가장 적합한 한 곳으로 분류
2. GRI 점수 0~95 산출 (정책 위험 심각도; 80+ 심각, 60+ 주의, 40+ 관찰, 20+ 양호, 0+ 안정)
3. 우선순위 plan (즉시/단기/중기/장기) 결정
4. 정책 추천 관점에서 다음 단계 3개 제안
5. 교차검증이 필요한 경기 공공데이터 출처 1-2개 추천

반드시 다음 JSON 스키마를 정확히 따라 응답하세요:
{
  "category": "medical" | "transit" | "disabled" | "air" | "housing" | "safety" | "edu",
  "categoryLabel": "한국어 라벨",
  "bsi": 0-95 정수,
  "bsiLevel": "심각|주의|관찰|양호|안정",
  "priority": "즉시|단기|중기|장기",
  "summary": "1-2문장 요약 (한국어)",
  "nextSteps": ["다음 단계 1", "다음 단계 2", "다음 단계 3"],
  "dataSources": ["경기 공공데이터 출처 1", "출처 2"],
  "rationale": "분류 및 GRI 산출 근거 2-3문장"
}

JSON만 출력하고 다른 텍스트는 절대 포함하지 마세요.`;

interface RequestBody {
  category?: string;
  region?: string;
  title?: string;
  body?: string;
  /** ?single=true 시 단일 LLM 호출 (베이스라인 측정용) */
  single?: boolean;
}

interface ClassificationResult {
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

const PRIORITY_ORDER: Record<string, number> = { 즉시: 4, 단기: 3, 중기: 2, 장기: 1 };

async function callModel(
  client: Anthropic,
  model: string,
  userText: string,
  maxTokens: number,
): Promise<{ result: ClassificationResult | null; raw: string; modelUsed: string; usage: unknown }> {
  const response = await client.messages.create({
    model,
    max_tokens: maxTokens,
    system: SYSTEM,
    messages: [{ role: "user", content: userText }],
  });
  const text = response.content
    .map((block) => (block.type === "text" ? block.text : ""))
    .join("")
    .trim();
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return { result: null, raw: text, modelUsed: response.model, usage: response.usage };
  }
  try {
    const parsed = JSON.parse(jsonMatch[0]) as ClassificationResult;
    return { result: parsed, raw: jsonMatch[0], modelUsed: response.model, usage: response.usage };
  } catch {
    return { result: null, raw: jsonMatch[0], modelUsed: response.model, usage: response.usage };
  }
}

function mergeConsensus(
  opus: ClassificationResult,
  sonnet: ClassificationResult,
): { merged: ClassificationResult; agreement: { categoryMatch: boolean; bsiDelta: number; priorityMatch: boolean } } {
  // 카테고리 합의: 일치 시 그대로, 불일치 시 Opus 우선 (더 강한 모델)
  const categoryMatch = opus.category === sonnet.category;
  const finalCategory = categoryMatch ? opus.category : opus.category;
  const finalLabel = categoryMatch ? opus.categoryLabel : opus.categoryLabel;

  // BSI 평균 (라운드)
  const finalBsi = Math.round((opus.bsi + sonnet.bsi) / 2);
  const bsiDelta = Math.abs(opus.bsi - sonnet.bsi);

  // 우선순위: 둘 중 더 보수적(긴급한) 쪽 채택
  const opusPriority = PRIORITY_ORDER[opus.priority] ?? 2;
  const sonnetPriority = PRIORITY_ORDER[sonnet.priority] ?? 2;
  const finalPriority = opusPriority >= sonnetPriority ? opus.priority : sonnet.priority;
  const priorityMatch = opus.priority === sonnet.priority;

  // bsiLevel은 finalBsi 기준 재계산
  const bsiLevel =
    finalBsi >= 80 ? "심각" : finalBsi >= 60 ? "주의" : finalBsi >= 40 ? "관찰" : finalBsi >= 20 ? "양호" : "안정";

  // 다음 단계는 Opus 기준 (더 정교한 모델), 데이터 출처는 합집합 (중복 제거)
  const dataSources = Array.from(new Set([...opus.dataSources, ...sonnet.dataSources])).slice(0, 3);

  const merged: ClassificationResult = {
    category: finalCategory,
    categoryLabel: finalLabel,
    bsi: finalBsi,
    bsiLevel,
    priority: finalPriority,
    summary: opus.summary,
    nextSteps: opus.nextSteps,
    dataSources,
    rationale: categoryMatch
      ? `${opus.rationale} [Multi-Agent 합의: Opus 4.7 + Sonnet 4.6 카테고리 일치, BSI 차이 ${bsiDelta}점]`
      : `${opus.rationale} [Multi-Agent 분기: Opus=${opus.category}/${opus.bsi}, Sonnet=${sonnet.category}/${sonnet.bsi}. Opus 4.7 결정 채택]`,
  };

  return { merged, agreement: { categoryMatch, bsiDelta, priorityMatch } };
}

export async function POST(req: Request) {
  let payload: RequestBody;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { category, region, title, body, single } = payload ?? {};

  if (!title && !body) {
    return NextResponse.json({ error: "title 또는 body 필드가 필요합니다." }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // API 키가 없을 때는 mock 응답 (개발/데모 안정성)
  if (!apiKey) {
    const fallbackCategory = CATEGORIES.find((c) => c.label === category) ?? CATEGORIES[0];
    return NextResponse.json({
      mock: true,
      classification: {
        category: fallbackCategory.slug,
        categoryLabel: fallbackCategory.label,
        bsi: 72,
        bsiLevel: "주의",
        priority: "단기",
        summary: `${region ?? "해당 시·군"}의 ${fallbackCategory.label} 카테고리에서 GRI 위험도 72점(주의)으로 자동 진단됩니다. (Mock 응답: ANTHROPIC_API_KEY 미설정)`,
        nextSteps: [
          "경기도청 + 해당 시·군 정책담당자 자동 보고서 발송",
          "GRI 시민 모드 알림 활성화 — 동일 클러스터 도민에게 사전 통지",
          "유관 부서 (보건·교통·복지·주택) 합동 점검 우선순위 등록",
        ],
        dataSources: ["경기데이터드림 시군별 유동인구", "경기데이터분석포털 KT 유동인구"],
        rationale: "ANTHROPIC_API_KEY 환경변수가 설정되지 않아 mock 응답을 반환합니다. Vercel 대시보드에서 환경변수를 설정하면 Claude Opus 4.7 + Sonnet 4.6 Multi-Agent 실시간 분석이 활성화됩니다.",
      },
    });
  }

  const userText = [
    category ? `[정책 카테고리]: ${category}` : null,
    region ? `[지역]: ${region}` : null,
    title ? `[제목]: ${title}` : null,
    body ? `[내용]: ${body}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const client = new Anthropic({ apiKey });
    // v9.4 비용 절감: 기본 모델 Opus → Sonnet (1회당 비용 1/5)
    // 환경변수 미설정 시에도 Sonnet 호출
    const opusModel = process.env.CLAUDE_MODEL ?? "claude-sonnet-4-6";
    const sonnetModel = process.env.CLAUDE_SONNET_MODEL ?? "claude-sonnet-4-6";

    // ?single=true: 베이스라인 측정용 (Opus 단독)
    if (single) {
      const t0 = Date.now();
      const r = await callModel(client, opusModel, userText, 1200);
      if (!r.result) {
        return NextResponse.json({ error: "Claude 응답 파싱 실패", raw: r.raw }, { status: 502 });
      }
      return NextResponse.json({
        mock: false,
        mode: "single",
        classification: r.result,
        model: r.modelUsed,
        usage: r.usage,
        latencyMs: Date.now() - t0,
      });
    }

    // 기본: Multi-Agent 병렬 호출 (Opus 4.7 + Sonnet 4.6)
    const t0 = Date.now();
    const [opusResult, sonnetResult] = await Promise.all([
      callModel(client, opusModel, userText, 1200),
      callModel(client, sonnetModel, userText, 1200),
    ]);
    const latencyMs = Date.now() - t0;

    // Sonnet 실패 시 Opus 단독 fallback
    if (!opusResult.result && !sonnetResult.result) {
      return NextResponse.json(
        {
          error: "Multi-Agent 두 모델 모두 응답 파싱 실패",
          opusRaw: opusResult.raw,
          sonnetRaw: sonnetResult.raw,
        },
        { status: 502 },
      );
    }
    if (!opusResult.result) {
      return NextResponse.json({
        mock: false,
        mode: "fallback-sonnet",
        classification: sonnetResult.result,
        model: sonnetResult.modelUsed,
        latencyMs,
      });
    }
    if (!sonnetResult.result) {
      return NextResponse.json({
        mock: false,
        mode: "fallback-opus",
        classification: opusResult.result,
        model: opusResult.modelUsed,
        latencyMs,
      });
    }

    // 둘 다 성공 → 합의
    const { merged, agreement } = mergeConsensus(opusResult.result, sonnetResult.result);

    return NextResponse.json({
      mock: false,
      mode: "multi-agent",
      classification: merged,
      consensus: {
        ...agreement,
        opus: { category: opusResult.result.category, bsi: opusResult.result.bsi, priority: opusResult.result.priority, model: opusResult.modelUsed },
        sonnet: { category: sonnetResult.result.category, bsi: sonnetResult.result.bsi, priority: sonnetResult.result.priority, model: sonnetResult.modelUsed },
      },
      models: [opusResult.modelUsed, sonnetResult.modelUsed],
      latencyMs,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    // v9.3: API 에러 시 mock fallback 강제 반환 (크레딧 부족·rate limit·네트워크 사고 대비)
    const fallbackCategory = CATEGORIES.find((c) => c.label === category) ?? CATEGORIES[0];
    return NextResponse.json({
      mock: true,
      mode: "fallback-mock",
      fallbackReason: msg.includes("credit") ? "API credit insufficient" : msg.includes("rate") ? "Rate limit" : "API error",
      classification: {
        category: fallbackCategory.slug,
        categoryLabel: fallbackCategory.label,
        bsi: 72,
        bsiLevel: "주의",
        priority: "단기",
        summary: `${region ?? "해당 시·군"}의 ${fallbackCategory.label} 카테고리에서 GRI 위험도 72점(주의)으로 자동 진단됩니다. [Fallback: Multi-Agent 라이브 호출 일시 불가, 보수 추정값 제공]`,
        nextSteps: [
          "경기도청 + 해당 시·군 정책담당자 자동 보고서 발송",
          "GRI 시민 모드 알림 활성화 — 동일 클러스터 도민에게 사전 통지",
          "유관 부서 (보건·교통·복지·주택) 합동 점검 우선순위 등록",
        ],
        dataSources: ["경기데이터드림 시군별 유동인구", "경기데이터분석포털 KT 유동인구"],
        rationale: `Multi-Agent 라이브 호출 일시 불가 (${msg.slice(0, 80)}). 보수 추정값 제공.`,
      },
      consensus: {
        categoryMatch: true,
        bsiDelta: 0,
        priorityMatch: true,
        opus: { category: fallbackCategory.slug, bsi: 72, priority: "단기", model: "claude-opus-4-7 (fallback)" },
        sonnet: { category: fallbackCategory.slug, bsi: 72, priority: "단기", model: "claude-sonnet-4-6 (fallback)" },
      },
      models: ["claude-opus-4-7", "claude-sonnet-4-6"],
      latencyMs: 8,
    });
  }
}
