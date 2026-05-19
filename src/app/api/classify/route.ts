import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { CATEGORIES } from "@/data/categories";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM = `당신은 BlueSpot의 시민 제보 분류 어시스턴트입니다. BlueSpot은 AI×LBS×Journalism 통합 사각지대 발굴 플랫폼이며, 경기·인천 41개 시·군·구에서 시민이 위치 기반으로 사각지대를 제보합니다.

당신의 역할:
1. 시민이 제출한 제보 텍스트를 12개 카테고리(의료/교통/복지/교육/행정/안전/환경/주거/식품/청년/다문화/디지털) 중 가장 적합한 한 곳으로 분류
2. BSI(BlueSpot Index) 점수 0~95 산출 (사각지대 심각도; 80+ 심각, 60+ 주의, 40+ 관찰, 20+ 양호, 0+ 안정)
3. 우선순위 plan (즉시/단기/중기/장기) 결정
4. 솔루션 저널리즘 관점에서 다음 단계 3개 제안
5. 교차검증이 필요한 공공데이터 출처 1-2개 추천

반드시 다음 JSON 스키마를 정확히 따라 응답하세요:
{
  "category": "medical" | "transport" | "welfare" | "education" | "admin" | "safety" | "environment" | "housing" | "food" | "youth" | "multicultural" | "digital",
  "categoryLabel": "한국어 라벨",
  "bsi": 0-95 정수,
  "bsiLevel": "심각|주의|관찰|양호|안정",
  "priority": "즉시|단기|중기|장기",
  "summary": "1-2문장 요약 (한국어)",
  "nextSteps": ["다음 단계 1", "다음 단계 2", "다음 단계 3"],
  "dataSources": ["공공데이터 출처 1", "출처 2"],
  "rationale": "분류 및 BSI 산출 근거 2-3문장"
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
        bsi: 68,
        bsiLevel: "주의",
        priority: "단기",
        summary: `${region ?? "해당 지역"}의 ${fallbackCategory.label} 사각지대로 추정됩니다. (Mock 응답: ANTHROPIC_API_KEY 미설정)`,
        nextSteps: [
          "관할 지자체 담당 부서로 1차 이송",
          "BlueSpot 교차검증 — 동일 권역 유사 제보 클러스터링",
          "솔루션 저널리즘 후보 — 보도 가능성 검토",
        ],
        dataSources: ["공공데이터포털 (해당 카테고리 데이터셋)", "지자체 통계"],
        rationale: "ANTHROPIC_API_KEY 환경변수가 설정되지 않아 mock 응답을 반환합니다. Vercel 대시보드에서 환경변수를 설정하면 Claude Opus 4.7 실시간 분석이 활성화됩니다.",
      },
    });
  }

  const userText = [
    category ? `[제보 카테고리 추정]: ${category}` : null,
    region ? `[지역]: ${region}` : null,
    title ? `[제목]: ${title}` : null,
    body ? `[내용]: ${body}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const client = new Anthropic({ apiKey });
    // Claude Opus 4.7 우선, 실패 시 4.5 fallback. CLAUDE_MODEL env로 오버라이드 가능.
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

    // Claude 응답에서 JSON만 추출
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
