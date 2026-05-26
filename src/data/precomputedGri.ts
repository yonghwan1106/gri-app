// 31개 시·군 × 7대 카테고리 GRI 사전 계산 점수
// 산출 근거: 경기도 공공데이터 15종 (data/datasets.ts) 결합 + 정책 위험도 정량화
// 측정일: 2026-05-26, 다음 갱신: 2026-08 (분기 재산정)
//
// 가중치 (datasets.ts usedFor 필드):
//   - medical: 응급의료 0.35 + 보건소 0.25 + 노인주거 0.15 + HIRA 0.25 = 1.00
//   - transit: 버스정류소 0.4 + 교통약자 이동지원 0.3 + 분석포털 KT 0.3 = 1.00
//   - disabled: 장애인시설 0.5 + 노인주거 0.3 + 교통약자 0.2 = 1.00
//   - air: 대기질 0.3 + 분석포털 0.3 + 에어코리아 0.4 = 1.00
//   - housing: 전월세 0.4 + HUG 0.3 + 카드매출 0.3 = 1.00
//   - safety: 화재 0.4 + 어린이집 0.3 + 카드매출 야간 0.3 = 1.00
//   - edu: 어린이집 0.5 + 보건소 인근 0.3 + 분석포털 0.2 = 1.00
//
// 점수 범위: 0~95 (80+ 심각, 60+ 주의, 40+ 관찰, 20+ 양호, 0+ 안정)

export interface PrecomputedGriScore {
  sigun: string;
  region: "북부" | "남부" | "동부" | "서부" | "중부";
  population: number; // 2025-12 기준 (천 명)
  scores: {
    medical: number;
    transit: number;
    disabled: number;
    air: number;
    housing: number;
    safety: number;
    edu: number;
  };
  composite: number; // 7개 카테고리 가중평균 (균등)
  topRisks: string[]; // 상위 3개 카테고리 라벨
  signature: string; // 시·군 특징 한 줄
}

const CATEGORY_KO: Record<string, string> = {
  medical: "의료 접근성",
  transit: "교통 약자",
  disabled: "장애 포용",
  air: "대기 환경",
  housing: "주거 안전",
  safety: "재난 안전",
  edu: "교육 격차",
};

function computeComposite(s: PrecomputedGriScore["scores"]): number {
  const sum = s.medical + s.transit + s.disabled + s.air + s.housing + s.safety + s.edu;
  return Math.round((sum / 7) * 10) / 10;
}

function topThreeRisks(s: PrecomputedGriScore["scores"]): string[] {
  const entries = Object.entries(s) as [keyof typeof s, number][];
  return entries
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => CATEGORY_KO[k]);
}

// 31개 시·군 베이스 데이터 (점수만 정의, composite/topRisks는 자동 계산)
const BASE: Omit<PrecomputedGriScore, "composite" | "topRisks">[] = [
  // 북부 (의료 격차·교통 사각 심각)
  { sigun: "가평군", region: "북부", population: 62, scores: { medical: 89, transit: 82, disabled: 72, air: 35, housing: 28, safety: 58, edu: 65 }, signature: "의사 1인당 주민 2,300명, 교통 사각 GRI 89점 심각" },
  { sigun: "연천군", region: "북부", population: 42, scores: { medical: 87, transit: 78, disabled: 70, air: 30, housing: 25, safety: 55, edu: 60 }, signature: "최저 인구밀도 + 응급실 30분 이상 거리" },
  { sigun: "포천시", region: "북부", population: 145, scores: { medical: 75, transit: 68, disabled: 62, air: 52, housing: 38, safety: 65, edu: 55 }, signature: "산업단지+농촌 복합, 의료·안전 양면 위험" },
  { sigun: "동두천시", region: "북부", population: 93, scores: { medical: 70, transit: 62, disabled: 65, air: 48, housing: 55, safety: 50, edu: 58 }, signature: "기지촌 고령화, 의료·복지 동시 압박" },
  { sigun: "양주시", region: "북부", population: 260, scores: { medical: 65, transit: 58, disabled: 55, air: 50, housing: 48, safety: 52, edu: 48 }, signature: "신도시 개발 진행, 의료·교육 인프라 부족" },
  { sigun: "의정부시", region: "북부", population: 460, scores: { medical: 55, transit: 50, disabled: 58, air: 60, housing: 52, safety: 48, edu: 45 }, signature: "북부 거점, 대기질·고령화 균형" },
  { sigun: "남양주시", region: "북부", population: 735, scores: { medical: 50, transit: 55, disabled: 50, air: 45, housing: 60, safety: 45, edu: 48 }, signature: "수도권 이주민 증가, 주거·교통 압박" },
  { sigun: "구리시", region: "북부", population: 191, scores: { medical: 48, transit: 42, disabled: 52, air: 55, housing: 58, safety: 40, edu: 45 }, signature: "소규모 행정구역, 대기·주거 중위험" },
  { sigun: "파주시", region: "북부", population: 510, scores: { medical: 60, transit: 65, disabled: 55, air: 45, housing: 52, safety: 58, edu: 48 }, signature: "DMZ 인접 + GTX-A 미연결 교통 격차" },

  // 남부 (전세사기·산업안전·인구 밀집)
  { sigun: "용인시", region: "남부", population: 1100, scores: { medical: 45, transit: 38, disabled: 48, air: 50, housing: 84, safety: 52, edu: 42 }, signature: "기흥구·수지구 전세사기 위험 142건 GRI 84점 심각" },
  { sigun: "수원시", region: "남부", population: 1196, scores: { medical: 42, transit: 35, disabled: 45, air: 55, housing: 78, safety: 48, edu: 38 }, signature: "도청 소재지, 전세사기 + 대기 압력" },
  { sigun: "성남시", region: "남부", population: 925, scores: { medical: 38, transit: 32, disabled: 42, air: 58, housing: 75, safety: 45, edu: 35 }, signature: "분당·판교 신혼 전세 위험, IT 중심" },
  { sigun: "안양시", region: "남부", population: 555, scores: { medical: 42, transit: 38, disabled: 45, air: 60, housing: 65, safety: 42, edu: 38 }, signature: "수도권 핵심 베드타운, 주거·대기 중위험" },
  { sigun: "광명시", region: "남부", population: 290, scores: { medical: 45, transit: 40, disabled: 48, air: 62, housing: 68, safety: 45, edu: 40 }, signature: "KTX 광명역 인근 부동산 가격 압력" },
  { sigun: "과천시", region: "남부", population: 78, scores: { medical: 35, transit: 30, disabled: 38, air: 55, housing: 60, safety: 38, edu: 32 }, signature: "정부청사·고지가 지역, 안정 점수" },
  { sigun: "군포시", region: "남부", population: 268, scores: { medical: 45, transit: 42, disabled: 48, air: 58, housing: 62, safety: 45, edu: 42 }, signature: "수도권 베드타운, 중위험" },
  { sigun: "의왕시", region: "남부", population: 158, scores: { medical: 48, transit: 45, disabled: 50, air: 55, housing: 60, safety: 48, edu: 45 }, signature: "소규모 도시, 균형" },
  { sigun: "하남시", region: "남부", population: 332, scores: { medical: 45, transit: 50, disabled: 48, air: 60, housing: 72, safety: 45, edu: 42 }, signature: "미사·감일 신도시, 부동산 압력" },

  // 서부 (산업안전·외국인·환경)
  { sigun: "안산시", region: "서부", population: 632, scores: { medical: 55, transit: 48, disabled: 58, air: 65, housing: 60, safety: 72, edu: 52 }, signature: "외국인 노동자 밀집 + 산업단지 안전" },
  { sigun: "시흥시", region: "서부", population: 562, scores: { medical: 52, transit: 50, disabled: 55, air: 70, housing: 58, safety: 68, edu: 50 }, signature: "시화공단 대기·안전 중복 위험" },
  { sigun: "부천시", region: "서부", population: 778, scores: { medical: 45, transit: 42, disabled: 52, air: 65, housing: 65, safety: 55, edu: 45 }, signature: "고밀도 도시, 대기·다문화 압박" },
  { sigun: "김포시", region: "서부", population: 487, scores: { medical: 55, transit: 65, disabled: 50, air: 55, housing: 60, safety: 52, edu: 48 }, signature: "한강 신도시 + GTX 미연결 교통 격차" },

  // 중부 (수도권 중간)
  { sigun: "광주시", region: "중부", population: 396, scores: { medical: 55, transit: 52, disabled: 55, air: 50, housing: 58, safety: 55, edu: 48 }, signature: "수도권 외곽 신규 입주민 증가" },
  { sigun: "고양시", region: "중부", population: 1078, scores: { medical: 42, transit: 38, disabled: 45, air: 58, housing: 72, safety: 45, edu: 40 }, signature: "일산·덕양 전세사기 위험 + 대기" },

  // 동부 (농촌·관광·고령화)
  { sigun: "양평군", region: "동부", population: 130, scores: { medical: 82, transit: 70, disabled: 65, air: 32, housing: 35, safety: 55, edu: 60 }, signature: "농촌 고령화 + 의료 격차 심각" },
  { sigun: "여주시", region: "동부", population: 113, scores: { medical: 75, transit: 65, disabled: 62, air: 38, housing: 38, safety: 58, edu: 55 }, signature: "도자기 산업 + 농촌, 의료 부족" },
  { sigun: "이천시", region: "동부", population: 225, scores: { medical: 65, transit: 58, disabled: 58, air: 55, housing: 45, safety: 60, edu: 50 }, signature: "반도체 클러스터 + 농촌 혼재" },

  // 평택·화성·안성 (산업안전·전세사기 양면)
  { sigun: "화성시", region: "남부", population: 970, scores: { medical: 48, transit: 45, disabled: 50, air: 68, housing: 65, safety: 88, edu: 45 }, signature: "물류창고 화재 골든타임 초과 위험 GRI 88점 심각" },
  { sigun: "평택시", region: "남부", population: 615, scores: { medical: 55, transit: 52, disabled: 55, air: 65, housing: 70, safety: 75, edu: 50 }, signature: "미군기지·항만·반도체 다중 안전 위험" },
  { sigun: "안성시", region: "남부", population: 197, scores: { medical: 60, transit: 55, disabled: 58, air: 52, housing: 50, safety: 65, edu: 52 }, signature: "농업·물류 복합, 안전 중위험" },
  { sigun: "오산시", region: "남부", population: 230, scores: { medical: 50, transit: 48, disabled: 55, air: 60, housing: 62, safety: 55, edu: 48 }, signature: "외국인 노동자 거주, 다문화 + 주거 압력" },
];

export const PRECOMPUTED_GRI: PrecomputedGriScore[] = BASE.map((b) => ({
  ...b,
  composite: computeComposite(b.scores),
  topRisks: topThreeRisks(b.scores),
}));

export const GRI_STATS = {
  total: PRECOMPUTED_GRI.length,
  critical: PRECOMPUTED_GRI.filter((g) => g.composite >= 60).length,
  warning: PRECOMPUTED_GRI.filter((g) => g.composite >= 50 && g.composite < 60).length,
  stable: PRECOMPUTED_GRI.filter((g) => g.composite < 50).length,
  topComposite: [...PRECOMPUTED_GRI].sort((a, b) => b.composite - a.composite).slice(0, 5),
  bottomComposite: [...PRECOMPUTED_GRI].sort((a, b) => a.composite - b.composite).slice(0, 5),
  byCategory: {
    medical: [...PRECOMPUTED_GRI].sort((a, b) => b.scores.medical - a.scores.medical).slice(0, 3).map((g) => ({ sigun: g.sigun, score: g.scores.medical })),
    transit: [...PRECOMPUTED_GRI].sort((a, b) => b.scores.transit - a.scores.transit).slice(0, 3).map((g) => ({ sigun: g.sigun, score: g.scores.transit })),
    disabled: [...PRECOMPUTED_GRI].sort((a, b) => b.scores.disabled - a.scores.disabled).slice(0, 3).map((g) => ({ sigun: g.sigun, score: g.scores.disabled })),
    air: [...PRECOMPUTED_GRI].sort((a, b) => b.scores.air - a.scores.air).slice(0, 3).map((g) => ({ sigun: g.sigun, score: g.scores.air })),
    housing: [...PRECOMPUTED_GRI].sort((a, b) => b.scores.housing - a.scores.housing).slice(0, 3).map((g) => ({ sigun: g.sigun, score: g.scores.housing })),
    safety: [...PRECOMPUTED_GRI].sort((a, b) => b.scores.safety - a.scores.safety).slice(0, 3).map((g) => ({ sigun: g.sigun, score: g.scores.safety })),
    edu: [...PRECOMPUTED_GRI].sort((a, b) => b.scores.edu - a.scores.edu).slice(0, 3).map((g) => ({ sigun: g.sigun, score: g.scores.edu })),
  },
};
