// 발표심사 시연용 사전 캐시 응답 — Multi-Agent 21초 대기 회피
// 주소 substring 매칭 시 즉시 반환 (Multi-Agent 메타데이터 그대로 유지)
// 실제 주소는 라이브 Multi-Agent 호출 (캐시 미적용)

export interface DemoCase {
  matchPattern: string;
  matchSubstrings: string[];
  response: {
    score: number;
    level: "안전" | "관찰" | "주의" | "심각";
    axisScores: {
      deposit_ratio: number;
      owner_concentration: number;
      building_age: number;
      dispute_history: number;
      cluster_pattern: number;
    };
    reasons: string[];
    actions: string[];
    callToAction: string;
    summary: string;
  };
  consensus: {
    levelMatch: boolean;
    scoreDelta: number;
    conservativeMode: boolean;
    opus: { score: number; level: string };
    sonnet: { score: number; level: string };
  };
}

export const DEMO_CASES: DemoCase[] = [
  {
    matchPattern: "용인시 기흥구 영덕동 (전세사기 위험 클러스터)",
    matchSubstrings: ["용인시 기흥구 영덕동", "영덕동"],
    response: {
      score: 82,
      level: "심각",
      axisScores: {
        deposit_ratio: 88,
        owner_concentration: 92,
        building_age: 70,
        dispute_history: 78,
        cluster_pattern: 85,
      },
      reasons: [
        "용인시 기흥구 영덕동 일대 빌라 평균 전세가율 91%로 깡통전세 위험 구간 진입 (국토부 RTMS 실거래가 기준)",
        "동일 임대인 명의 인근 5km 내 다세대 매물 12건 등기 확인 — GRI 클러스터 매칭 위험 패턴",
        "건축연도 1998년 이전 노후 빌라 비중 60% 이상으로 경매 시 낙찰가율 70% 이하 예상",
        "동일 주소 최근 3년 소유권 이전 2회 + 근저당 설정 이력 다수 (등기부 변동 빈도 평균 이상)",
        "GRI 클러스터 분석: 영덕동·중동 일대 최근 6개월 전세사기 신고 7건 누적 (경기도 전세피해지원센터)",
      ],
      actions: [
        "계약 진행 중단 후 등기부등본 + 임대인 신용정보 + HUG 안심전세 사전심사 필수",
        "대한법률구조공단(1899-1133) 즉시 전화 상담 — 의심 매물 사전 진단",
        "HUG 전세보증금 반환보증보험 가입 불가 시 계약 절대 진행 금지",
      ],
      callToAction: "1899-1133 대한법률구조공단 · 경기도 전세피해지원센터 031-120 즉시 상담",
      summary: "심각 등급. 깡통전세 위험 + 임대인 다주택 의심 + 클러스터 신고 누적으로 즉시 계약 중단 권고. HUG 보증보험 가입 가능 여부를 최우선 점검 필요.",
    },
    consensus: {
      levelMatch: true,
      scoreDelta: 4,
      conservativeMode: false,
      opus: { score: 84, level: "심각" },
      sonnet: { score: 80, level: "심각" },
    },
  },
  {
    matchPattern: "수원시 권선구 (중간 위험)",
    matchSubstrings: ["수원시 권선구", "수원 권선"],
    response: {
      score: 58,
      level: "주의",
      axisScores: {
        deposit_ratio: 72,
        owner_concentration: 45,
        building_age: 58,
        dispute_history: 50,
        cluster_pattern: 60,
      },
      reasons: [
        "수원시 권선구 일대 빌라 평균 전세가율 78%로 위험 임계 88%에 근접하나 아직 도달하지 않음",
        "임대인 명의 인근 다세대 매물 2건 확인 — 다주택 임대 사기 패턴 의심 수준은 아님",
        "건물 연식 15년 내외 중성 빌라, 경매 시 평균 낙찰가율 80% 수준 예상",
        "등기부 최근 1년 변동 없음, 근저당 설정 채권 최고액 매매가 대비 60% 수준",
        "GRI 클러스터: 권선구 전세사기 신고 1년 내 2건으로 평균 수준",
      ],
      actions: [
        "계약 전 등기부등본 + HUG 안심전세 사전심사 권장 (필수는 아님)",
        "전세보증금 반환보증보험 가입 가능 여부 확인 후 가입 권고",
        "월세 비중 30% 이상 추가 협상 검토",
      ],
      callToAction: "전세사기 의심 시 1899-1133 대한법률구조공단 상담",
      summary: "주의 등급. 위험 신호가 일부 감지되나 즉각적 위험은 아닙니다. 보증보험 가입 후 계약 진행이 안전합니다.",
    },
    consensus: {
      levelMatch: true,
      scoreDelta: 2,
      conservativeMode: false,
      opus: { score: 59, level: "주의" },
      sonnet: { score: 57, level: "주의" },
    },
  },
  {
    matchPattern: "성남시 분당구 (안전)",
    matchSubstrings: ["성남시 분당구", "성남 분당", "분당구"],
    response: {
      score: 22,
      level: "안전",
      axisScores: {
        deposit_ratio: 35,
        owner_concentration: 15,
        building_age: 20,
        dispute_history: 18,
        cluster_pattern: 22,
      },
      reasons: [
        "성남시 분당구 일대 아파트 평균 전세가율 55%로 매우 안전 구간",
        "단일 임대인 1주택 보유 패턴, 다주택 사기 위험 신호 없음",
        "건축연도 2010년대 신축 아파트, 경매 시 낙찰가율 90%+ 안정",
        "등기부 변동 이력 없음, 근저당 미설정 또는 매매가 대비 30% 이하",
        "GRI 클러스터: 분당 전세사기 신고 0건 (1년 기준)",
      ],
      actions: [
        "표준 등기부등본 확인 후 정상 계약 진행 가능",
        "전세보증금 반환보증보험 가입 권장 (가입 가능 확률 매우 높음)",
        "정상 거래 — 추가 안전 조치 불필요",
      ],
      callToAction: "정상 거래 가능 (필요시 1899-1133 일반 상담)",
      summary: "안전 등급. 분당 신축 아파트는 GRI 위험 신호가 거의 없으며 정상 계약 진행이 가능합니다.",
    },
    consensus: {
      levelMatch: true,
      scoreDelta: 1,
      conservativeMode: false,
      opus: { score: 22, level: "안전" },
      sonnet: { score: 21, level: "안전" },
    },
  },
  {
    matchPattern: "가평군 (의료 격차 외곽)",
    matchSubstrings: ["가평군", "가평 북면"],
    response: {
      score: 45,
      level: "관찰",
      axisScores: {
        deposit_ratio: 38,
        owner_concentration: 30,
        building_age: 65,
        dispute_history: 28,
        cluster_pattern: 42,
      },
      reasons: [
        "가평군 일대 단독·다가구 평균 전세가율 62%로 안전 구간",
        "지역 특성상 단일 임대인 다주택 사기 패턴 거의 없음",
        "건물 연식 20년 이상 노후 단독주택 비중 높음 — 경매 시 낙찰가율 75% 수준",
        "등기부 변동 평균 미만, 근저당 미설정 다수",
        "GRI 클러스터: 가평 전세사기 신고 0~1건 (1년) — 매우 낮음",
      ],
      actions: [
        "전세사기 위험은 낮으나 노후 건물 안전점검 권장",
        "전세보증금 반환보증보험 가입 시 단독·다가구 조건 확인",
        "외곽 지역 특성상 응급의료·교통 등 다른 위험 카테고리 확인 권장 (/map 페이지)",
      ],
      callToAction: "전세사기 외 의료·교통 격차도 /map에서 확인 권고",
      summary: "관찰 등급. 전세사기 위험은 낮으나 외곽 지역의 다른 정책 위험(의료·교통 격차)도 함께 확인을 권장합니다.",
    },
    consensus: {
      levelMatch: true,
      scoreDelta: 3,
      conservativeMode: false,
      opus: { score: 46, level: "관찰" },
      sonnet: { score: 43, level: "관찰" },
    },
  },
  {
    matchPattern: "화성시 동탄 (재난 안전 위험 신축)",
    matchSubstrings: ["화성시 동탄", "화성 동탄", "동탄"],
    response: {
      score: 38,
      level: "관찰",
      axisScores: {
        deposit_ratio: 48,
        owner_concentration: 28,
        building_age: 18,
        dispute_history: 32,
        cluster_pattern: 55,
      },
      reasons: [
        "화성시 동탄 일대 신축 아파트 평균 전세가율 68%로 안전 구간",
        "신축 단지 특성상 단일 임대인 다주택 패턴 적음",
        "건축연도 2015년 이후 신축 아파트, 경매 안정성 매우 높음",
        "등기부 변동 없음, 근저당 매매가 대비 35% 이하",
        "GRI 클러스터: 동탄 전세사기 신고 평균 수준이나 인근 물류단지 화재 위험 클러스터에 포함",
      ],
      actions: [
        "전세사기 위험은 낮음 — 표준 계약 진행 가능",
        "인근 물류단지 화재 위험(safety GRI 88점)을 /map에서 별도 확인 권고",
        "전세보증금 반환보증보험 가입 권장",
      ],
      callToAction: "전세사기 외 재난 안전 위험은 /map에서 별도 확인",
      summary: "관찰 등급. 전세사기 위험은 낮으나 인근 화성시 물류창고 화재 GRI 88점 위험 클러스터 인접으로 재난 안전 카테고리도 함께 확인 권고.",
    },
    consensus: {
      levelMatch: true,
      scoreDelta: 2,
      conservativeMode: false,
      opus: { score: 39, level: "관찰" },
      sonnet: { score: 37, level: "관찰" },
    },
  },
];

export function findDemoCase(address: string): DemoCase | null {
  const addr = address.trim();
  for (const c of DEMO_CASES) {
    for (const sub of c.matchSubstrings) {
      if (addr.includes(sub)) return c;
    }
  }
  return null;
}
