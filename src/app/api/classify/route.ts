import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { CATEGORIES } from "@/data/categories";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM = `당신은 GRI(Gyeonggi Risk Index)의 정책 위험도 자동 평가 AI입니다. GRI는 경기 공공데이터(경기데이터드림 + 경기데이터분석포털) + Claude Opus 4.7을 결합한 듀얼 모드 플랫폼으로, 경기도 31개 시·군의 7대 정책 위험도를 자동 진단합니다.

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
}

export async function POST(req: Request) {
  let payload: RequestBody;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const { category, region, title, body } = payload ?? {};

  if (!title && !body) {
    return NextResponse.json(
      { error: "title 또는 body 필드가 필요합니다." },
      { status: 400 },
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // API 키가 없을 때는 mock 응답 (개발/데모 안정성)
  if (!apiKey) {
    const fallbackCategory =
      CATEGORIES.find((c) => c.label === category) ?? CATEGORIES[0];
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
        rationale: "ANTHROPIC_API_KEY 환경변수가 설정되지 않아 mock 응답을 반환합니다. Vercel 대시보드에서 환경변수를 설정하면 Claude Opus 4.7 실시간 분석이 활성화됩니다.",
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
    const model = process.env.CLAUDE_MODEL ?? "claude-opus-4-5";
    const response = await client.messages.create({
      model,
      max_tokens: 1200,
      system: SYSTEM,
      messages: [{ role: "user", content: userText }],
    });

    const text = response.content
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("")
      .trim();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Claude 응답에서 JSON을 찾을 수 없습니다.", raw: text },
        { status: 502 },
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (e) {
      return NextResponse.json(
        {
          error: "Claude 응답 JSON 파싱 실패",
          raw: jsonMatch[0],
          detail: String(e),
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      mock: false,
      classification: parsed,
      model: response.model,
      usage: response.usage,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { error: "Claude API 호출 실패", detail: msg },
      { status: 500 },
    );
  }
}
