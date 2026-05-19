import type { CategorySlug } from "./categories";
import { REGIONS } from "./mockRegions";

export interface Spot {
  id: string;
  title: string;
  category: CategorySlug;
  regionId: string;
  lat: number;
  lng: number;
  bsi: number;
  reportedAt: string;
  reporters: number;
  summary: string;
  status: "신규" | "검증중" | "보도예정" | "해결";
}

// 100건의 mock 사각지대 생성: 41개 시·군·구에 분산
// 카테고리별 분포는 의료·교통·복지·행정에 가중치 (상세 페이지가 있는 카테고리)
const CATEGORY_POOL: { category: CategorySlug; weight: number; templates: string[] }[] = [
  {
    category: "medical",
    weight: 18,
    templates: [
      "야간 응급 진료 30분 이상 공백",
      "소아과 진료 가능 의원 부재",
      "분만 가능 산부인과 부재",
      "정신건강 외래 6개월 대기",
      "노인 만성질환 통합 진료 부재",
    ],
  },
  {
    category: "transport",
    weight: 16,
    templates: [
      "버스 1일 4회 미만 정류장",
      "지하철 환승 30분 이상 소요",
      "보행자 횡단 사고 다발 구역",
      "어린이 통학로 신호 부재",
      "심야 교통 수단 전무 구역",
    ],
  },
  {
    category: "welfare",
    weight: 14,
    templates: [
      "독거노인 안부 사각",
      "장애인 활동지원 대기 6개월",
      "한부모 가정 돌봄 공백",
      "발달장애 청년 자립 지원 부재",
      "복지관 60분 이상 소요",
    ],
  },
  {
    category: "admin",
    weight: 12,
    templates: [
      "주민센터 1시간 이상 소요",
      "복지 신청 정보 부재",
      "온라인 민원 처리 지연 30일+",
      "다국어 행정 서비스 부재",
      "고령자 키오스크 사용 곤란",
    ],
  },
  {
    category: "education",
    weight: 8,
    templates: [
      "공공도서관 도보 30분 이상",
      "방과 후 돌봄 정원 초과",
      "특수교육 통학 사각",
    ],
  },
  {
    category: "safety",
    weight: 7,
    templates: ["여성 안심 귀가 사각", "어린이보호구역 단속 부재", "재난 알림 사각 구역"],
  },
  {
    category: "environment",
    weight: 6,
    templates: ["미세먼지 측정소 부재", "소음 민원 다발", "재활용 분리수거 사각"],
  },
  {
    category: "housing",
    weight: 6,
    templates: ["30년+ 노후 빌라 밀집", "청년 임대주택 미공급", "주거 취약 1인 가구 다수"],
  },
  {
    category: "food",
    weight: 4,
    templates: ["식료품 마트 도보 25분 이상", "결식아동 도시락 사각", "전통시장 쇠퇴"],
  },
  {
    category: "youth",
    weight: 4,
    templates: ["청년 일자리센터 부재", "1인 가구 청년 고립", "심리상담 6개월 대기"],
  },
  {
    category: "multicultural",
    weight: 3,
    templates: ["다국어 통역 행정 부재", "다문화 가정 학업 지원 사각", "외국인 의료 통역 공백"],
  },
  {
    category: "digital",
    weight: 2,
    templates: ["행정 앱 노년층 사용 곤란", "5G 음영 지역", "키오스크 사용 어려움 다발"],
  },
];

// 결정론적 PRNG (seed로 재현 가능)
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickWeighted<T extends { weight: number }>(
  rng: () => number,
  pool: T[],
): T {
  const total = pool.reduce((s, p) => s + p.weight, 0);
  const r = rng() * total;
  let acc = 0;
  for (const p of pool) {
    acc += p.weight;
    if (r <= acc) return p;
  }
  return pool[pool.length - 1];
}

function generateSpots(): Spot[] {
  const rng = mulberry32(20260519);
  const result: Spot[] = [];
  const statusOptions: Spot["status"][] = [
    "신규",
    "신규",
    "검증중",
    "검증중",
    "보도예정",
    "해결",
  ];

  for (let i = 0; i < 100; i++) {
    const region = REGIONS[Math.floor(rng() * REGIONS.length)];
    const catEntry = pickWeighted(rng, CATEGORY_POOL);
    const template =
      catEntry.templates[Math.floor(rng() * catEntry.templates.length)];

    // 시·군 중심 좌표에 약간 분산 (반경 약 3-5km)
    const jitterLat = (rng() - 0.5) * 0.04;
    const jitterLng = (rng() - 0.5) * 0.05;

    // BSI 점수: 20 ~ 95
    const bsi = Math.round(20 + rng() * 75);

    // 일자: 2026-01-01 ~ 2026-05-18
    const daysBack = Math.floor(rng() * 138);
    const reportedDate = new Date(2026, 4, 18);
    reportedDate.setDate(reportedDate.getDate() - daysBack);
    const reportedAt = reportedDate.toISOString().split("T")[0];

    const reporters = 1 + Math.floor(rng() * 28);
    const status = statusOptions[Math.floor(rng() * statusOptions.length)];

    result.push({
      id: `spot-${String(i + 1).padStart(3, "0")}`,
      title: `${region.name} ${template}`,
      category: catEntry.category,
      regionId: region.id,
      lat: region.lat + jitterLat,
      lng: region.lng + jitterLng,
      bsi,
      reportedAt,
      reporters,
      summary: `${region.name} 일대에서 시민 ${reporters}명이 제보한 사각지대로, BSI(BlueSpot Index) ${bsi}점으로 평가되었습니다.`,
      status,
    });
  }

  return result;
}

export const SPOTS: Spot[] = generateSpots();

export function getSpotsByCategory(category: CategorySlug): Spot[] {
  return SPOTS.filter((s) => s.category === category).sort(
    (a, b) => b.bsi - a.bsi,
  );
}

export function getSpotsByRegion(regionId: string): Spot[] {
  return SPOTS.filter((s) => s.regionId === regionId).sort(
    (a, b) => b.bsi - a.bsi,
  );
}

export function getStats() {
  const total = SPOTS.length;
  const resolved = SPOTS.filter((s) => s.status === "해결").length;
  const reporting = SPOTS.filter((s) => s.status === "보도예정").length;
  const critical = SPOTS.filter((s) => s.bsi >= 80).length;
  return { total, resolved, reporting, critical };
}
