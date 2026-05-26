import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

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
  buildingType?: string; // 아파트/빌라/단독다가구/오피스텔
  ownerName?: string; // 선택
}

export async function POST(req: Request) {
  let payload: RequestBody;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { address, deposit, monthlyRent, buildingType, ownerName } = payload ?? {};

  if (!address || !deposit) {
    return NextResponse.json(
      { error: "address와 deposit 필드는 필수입니다." },
      { status: 400 },
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // API 키 없을 때 mock 응답 (데모 안정성)
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
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const client = new Anthropic({ apiKey });
    const model = process.env.CLAUDE_MODEL ?? "claude-opus-4-7";
    const response = await client.messages.create({
      model,
      max_tokens: 1500,
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
      assessment: parsed,
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
