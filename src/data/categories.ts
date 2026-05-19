export type CategorySlug =
  | "medical"
  | "transport"
  | "welfare"
  | "education"
  | "admin"
  | "safety"
  | "environment"
  | "housing"
  | "food"
  | "youth"
  | "multicultural"
  | "digital";

export interface Category {
  slug: CategorySlug;
  label: string;
  emoji: string;
  description: string;
  color: string;
  hasDetailPage: boolean;
  examples: string[];
}

export const CATEGORIES: Category[] = [
  {
    slug: "medical",
    label: "의료",
    emoji: "🏥",
    description: "응급실 공백, 소아·산부인과 부재, 야간 진료 사각",
    color: "#DC2626",
    hasDetailPage: true,
    examples: [
      "소아과 30분 이상 이동 필요 지역",
      "야간 응급 진료 공백",
      "분만 가능 의료기관 부재",
    ],
  },
  {
    slug: "transport",
    label: "교통",
    emoji: "🚌",
    description: "버스 미경유, 환승 부재, 보행 안전 사각",
    color: "#2563EB",
    hasDetailPage: true,
    examples: [
      "1일 4회 미만 버스 정류장",
      "지하철역 30분 이상 거리",
      "보행자 횡단 사고 다발 구역",
    ],
  },
  {
    slug: "welfare",
    label: "복지",
    emoji: "🤝",
    description: "독거노인, 한부모 가정, 발달장애인 지원 공백",
    color: "#7C3AED",
    hasDetailPage: true,
    examples: [
      "복지관 1시간 이상 소요",
      "장애인 활동지원 대기 6개월 이상",
      "한부모 돌봄 사각",
    ],
  },
  {
    slug: "education",
    label: "교육",
    emoji: "📚",
    description: "학원·도서관 부재, 방과 후 돌봄 공백",
    color: "#059669",
    hasDetailPage: false,
    examples: [
      "공공도서관 5km 이상 거리",
      "방과 후 돌봄 신청 탈락",
      "특수교육 통학버스 부재",
    ],
  },
  {
    slug: "admin",
    label: "행정",
    emoji: "🏛️",
    description: "민원실 접근성, 디지털 행정 소외, 처리 지연",
    color: "#0891B2",
    hasDetailPage: true,
    examples: [
      "주민센터 1시간 이상 소요",
      "온라인 민원 처리 지연",
      "복지 신청 절차 정보 부재",
    ],
  },
  {
    slug: "safety",
    label: "안전",
    emoji: "🚨",
    description: "범죄·재난 우려 구역, 가로등·CCTV 부재",
    color: "#DB2777",
    hasDetailPage: false,
    examples: ["여성 안심 귀가 사각", "어린이 보호구역 단속 부재", "재난 알림 사각"],
  },
  {
    slug: "environment",
    label: "환경",
    emoji: "🌳",
    description: "대기·소음·쓰레기 처리 사각",
    color: "#16A34A",
    hasDetailPage: false,
    examples: ["미세먼지 측정소 부재", "소음 민원 다발 구역", "쓰레기 수거 사각"],
  },
  {
    slug: "housing",
    label: "주거",
    emoji: "🏘️",
    description: "노후 주거, 청년·신혼 임대 부족",
    color: "#9333EA",
    hasDetailPage: false,
    examples: ["30년 이상 노후 빌라 밀집", "청년 임대주택 미공급", "주거 취약 1인 가구"],
  },
  {
    slug: "food",
    label: "식품",
    emoji: "🥬",
    description: "신선식품 접근성, 도시락 결식 우려",
    color: "#EAB308",
    hasDetailPage: false,
    examples: ["식료품 마트 도보 20분 이상", "결식아동 도시락 사각", "전통시장 쇠퇴"],
  },
  {
    slug: "youth",
    label: "청년",
    emoji: "🎓",
    description: "청년 일자리·주거·심리 지원 공백",
    color: "#0EA5E9",
    hasDetailPage: false,
    examples: ["청년 일자리센터 부재", "1인 가구 청년 고립", "심리상담 6개월 대기"],
  },
  {
    slug: "multicultural",
    label: "다문화",
    emoji: "🌐",
    description: "다국어 행정, 다문화 가정 지원 공백",
    color: "#F97316",
    hasDetailPage: false,
    examples: ["다국어 통역 행정 부재", "다문화 자녀 학업 지원", "외국인 의료 통역 공백"],
  },
  {
    slug: "digital",
    label: "디지털",
    emoji: "📱",
    description: "디지털 소외, 키오스크·앱 접근성 사각",
    color: "#64748B",
    hasDetailPage: false,
    examples: ["키오스크 사용 어려움 다발", "행정 앱 노년층 사용 곤란", "5G 음영 지역"],
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
