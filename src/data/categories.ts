export type CategorySlug =
  | "medical"
  | "transit"
  | "disabled"
  | "air"
  | "housing"
  | "safety"
  | "edu";

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
    label: "의료 접근성",
    emoji: "🏥",
    description: "보건소·병원 밀도와 어르신 인구를 결합한 시·군별 의료공백 진단",
    color: "#DC2626",
    hasDetailPage: true,
    examples: [
      "의사 1인당 주민 2,000명 이상 시·군",
      "응급실 30분 초과 이송 지역",
      "보건소 야간 진료 공백",
    ],
  },
  {
    slug: "transit",
    label: "교통 약자",
    emoji: "🚌",
    description: "버스정류소·등록장애인·고령 인구 결합으로 이동권 사각 측정",
    color: "#2563EB",
    hasDetailPage: true,
    examples: [
      "버스 1일 4회 미만 농촌 지역",
      "교통약자 이동지원 대기 3일 이상",
      "GTX 역세권 라스트마일 단절",
    ],
  },
  {
    slug: "disabled",
    label: "장애 포용",
    emoji: "♿",
    description: "등록장애인 분포 × 복지시설 면적으로 장애인 포용성 진단",
    color: "#7C3AED",
    hasDetailPage: true,
    examples: [
      "발달장애인 성인기 서비스 단절",
      "장애인 활동지원 6개월 대기",
      "다국어 복지 안내 부재",
    ],
  },
  {
    slug: "air",
    label: "대기 환경",
    emoji: "🌫️",
    description: "PM2.5 농도 × 유동인구로 건강 노출 위험도 산출",
    color: "#16A34A",
    hasDetailPage: true,
    examples: [
      "PM2.5 25㎍/㎥ 초과 + 유동인구 밀집",
      "노후 사업장 밀집 지역",
      "고령자 호흡기 취약 구역",
    ],
  },
  {
    slug: "housing",
    label: "주거 안전",
    emoji: "🏠",
    description: "전월세 시세·임대주택·전세사기 위험 매물 통합 진단 (F1 시민 모드 포함)",
    color: "#3498DB",
    hasDetailPage: true,
    examples: [
      "전세사기 의심 매물 클러스터",
      "청년 1인가구 주거비 부담 55%+",
      "노후 빌라 밀집 + 임대인 이력 위험",
    ],
  },
  {
    slug: "safety",
    label: "재난 안전",
    emoji: "⚠️",
    description: "화학사고 대피장소·화재이력·재난 핫라인 결합 위험 진단",
    color: "#C0392B",
    hasDetailPage: true,
    examples: [
      "물류창고 화재 골든타임 초과",
      "외국인 다국어 재난문자 사각",
      "화학물질 취급시설 반경 취약인구",
    ],
  },
  {
    slug: "edu",
    label: "교육 격차",
    emoji: "📚",
    description: "SOC 교육시설 × 학원 분포 × 청년 인구로 학습 인프라 격차 진단",
    color: "#16A085",
    hasDetailPage: true,
    examples: [
      "수원·성남 대비 농촌 학력 20% 격차",
      "다문화 학생 학습 지원 공백",
      "성인 디지털 문해력 격차 40%+",
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
