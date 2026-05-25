import type { CategorySlug } from "./categories";
import { REGIONS } from "./mockRegions";

export interface Spot {
  id: string;
  title: string;
  category: CategorySlug;
  regionId: string;
  lat: number;
  lng: number;
  bsi: number; // GRI 점수로 의미 재해석 (legacy 필드명 유지)
  reportedAt: string;
  reporters: number; // 분석에 사용된 데이터 건수
  summary: string;
  status: "신규" | "검증중" | "보도예정" | "해결";
}

// GRI 7개 카테고리별 위험 시·군 분포 (mock)
const CATEGORY_POOL: { category: CategorySlug; weight: number; templates: string[] }[] = [
  {
    category: "medical",
    weight: 16,
    templates: [
      "야간 응급 진료 30분 이상 공백",
      "소아과 진료 가능 의원 부재",
      "분만 가능 산부인과 부재",
      "정신건강 외래 6개월 대기",
      "노인 만성질환 통합 진료 부재",
    ],
  },
  {
    category: "transit",
    weight: 16,
    templates: [
      "버스 1일 4회 미만 정류장",
      "교통약자 이동지원 대기 3일 이상",
      "GTX 역세권 라스트마일 단절",
      "심야 교통 수단 전무 구역",
      "농촌 수요응답형 버스 미도입",
    ],
  },
  {
    category: "disabled",
    weight: 14,
    templates: [
      "장애인 활동지원 6개월 대기",
      "발달장애 청년 자립 지원 부재",
      "다국어 장애인 복지 안내 부재",
      "전동휠체어 충전소 부재",
      "수어 통역 행정 공백",
    ],
  },
  {
    category: "air",
    weight: 14,
    templates: [
      "PM2.5 연평균 22 초과 + 유동인구 밀집",
      "노후 사업장 비산먼지 다발 구역",
      "고령자 호흡기 취약 노출 지수 상위",
      "대기질 측정소 부재 행정동",
      "도로변 미세먼지 핫스팟",
    ],
  },
  {
    category: "housing",
    weight: 18,
    templates: [
      "전세사기 의심 매물 클러스터 발견",
      "임대인 명의 12채 이상 반복",
      "노후 빌라 + 시세 대비 보증금 90% 초과",
      "공공임대 배정 대기 4년 초과",
      "청년 1인가구 주거비 부담률 55% 초과",
    ],
  },
  {
    category: "safety",
    weight: 12,
    templates: [
      "물류창고 화재 골든타임 초과 구역",
      "외국인 다국어 재난문자 사각",
      "화학물질 취급시설 반경 취약인구 노출",
      "산업재해 고위험 사업장 클러스터",
      "응급이송 골든타임 초과 지역",
    ],
  },
  {
    category: "edu",
    weight: 10,
    templates: [
      "기초학력 미달 학생 비율 15% 초과",
      "다문화 학생 학습 지원 공백",
      "성인 디지털 문해력 격차 40% 초과",
      "공공도서관 5km 이상 거리",
      "방과 후 돌봄 신청 탈락 다발",
    ],
  },
];

function griScore(rank: number): number {
  return Math.max(35, Math.min(94, 90 - rank * 2 + Math.floor(Math.random() * 5)));
}

function jitter(coord: number, scale = 0.04): number {
  return coord + (Math.random() - 0.5) * scale * 2;
}

const STATUSES: Spot["status"][] = ["신규", "검증중", "보도예정", "해결"];

export const SPOTS: Spot[] = (() => {
  const out: Spot[] = [];
  let n = 0;
  const total = 100;
  const totalWeight = CATEGORY_POOL.reduce((s, c) => s + c.weight, 0);

  for (const pool of CATEGORY_POOL) {
    const count = Math.round((pool.weight / totalWeight) * total);
    for (let i = 0; i < count; i++) {
      const region = REGIONS[(n + i) % (REGIONS.length - 1)]; // skip placeholder at end
      out.push({
        id: `spot-${++n}`,
        title: pool.templates[i % pool.templates.length],
        category: pool.category,
        regionId: region.id,
        lat: jitter(region.lat),
        lng: jitter(region.lng),
        bsi: griScore(i),
        reportedAt: `2026-05-${String(15 + (i % 12)).padStart(2, "0")}`,
        reporters: 3 + Math.floor(Math.random() * 25),
        summary: `${region.name} ${pool.templates[i % pool.templates.length]} (GRI 자동 진단)`,
        status: STATUSES[i % STATUSES.length],
      });
    }
  }
  return out;
})();

export function getSpotsByCategory(category: CategorySlug): Spot[] {
  return SPOTS.filter((s) => s.category === category);
}

export function getSpotsByRegion(regionId: string): Spot[] {
  return SPOTS.filter((s) => s.regionId === regionId);
}
