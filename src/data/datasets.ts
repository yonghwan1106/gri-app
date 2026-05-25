// 경기도 공공데이터 카탈로그 (data.gg.go.kr / insight.gg.go.kr / data.go.kr)
// 본 페이지는 평가 가점 5점("경기 공공데이터") 직접 활용을 명세화하기 위한 목록입니다.
// 모든 URL은 2026-05-25 기준 실존하는 포털 페이지로 검증되었습니다.

export type DatasetProvider =
  | "data.gg.go.kr"       // 경기데이터드림 (가점 5점)
  | "insight.gg.go.kr"    // 경기 데이터 분석 포털 (가점 5점)
  | "data.go.kr";         // 공공데이터포털 (가점 대상 아님, 본 점수 30점에 기여)

export type DatasetStatus = "live" | "scheduled" | "manual";

export interface Dataset {
  id: string;
  title: string;
  provider: DatasetProvider;
  url: string;
  // GRI 7대 카테고리 슬러그 (multi)
  categories: ("medical" | "transit" | "disabled" | "air" | "housing" | "safety" | "edu")[];
  updateCycle: string;          // 갱신주기
  lastUpdated: string;          // 메타데이터 기준 최근 갱신
  license: string;              // KOGL 등
  format: string;               // CSV/JSON/Open API
  usedFor: string;              // GRI 내부 활용 (점수 산출/표시)
  status: DatasetStatus;        // live=실시간 fetch, scheduled=배치 적재, manual=수동 다운로드 후 정적 적재
  fields?: string[];            // 활용 컬럼
}

export const DATASETS: Dataset[] = [
  // ── 경기데이터드림 (가점 5점) ─────────────────────────────────────────
  {
    id: "gg-emergency-rooms",
    title: "응급의료기관 및 응급의료지원센터 현황",
    provider: "data.gg.go.kr",
    url: "https://data.gg.go.kr/portal/data/service/selectServicePage.do?infId=MB714IBPDSE5OPNIMW0V27143432&infSeq=1",
    categories: ["medical"],
    updateCycle: "필요시 갱신",
    lastUpdated: "2025-09-01 (포털 메타데이터)",
    license: "KOGL 제1유형",
    format: "Sheet · CSV · XML",
    usedFor: "시·군별 응급실 밀도 → 의료 접근성 GRI 가중치 0.35",
    status: "scheduled",
    fields: ["기관명", "주소", "대표전화번호", "응급의료등급"],
  },
  {
    id: "gg-public-health-center",
    title: "보건소·보건지소 현황",
    provider: "data.gg.go.kr",
    url: "https://data.gg.go.kr/portal/data/service/selectServicePage.do?infId=VFC8YZB6W3FVAIL3P73Z24912594&infSeq=1",
    categories: ["medical"],
    updateCycle: "반기",
    lastUpdated: "2026-04-15",
    license: "KOGL 제1유형",
    format: "Sheet · CSV",
    usedFor: "1km 반경 보건소 부재 지역 식별 → 의료 사각 가중치 0.25",
    status: "scheduled",
    fields: ["시설명", "지번주소", "도로명주소", "홈페이지URL"],
  },
  {
    id: "gg-bus-stops",
    title: "버스정류소 현황",
    provider: "data.gg.go.kr",
    url: "https://data.gg.go.kr/portal/data/service/selectServicePage.do?infId=GDKWAGWYRKJYIRVX110226832213&infSeq=1",
    categories: ["transit"],
    updateCycle: "필요시 갱신",
    lastUpdated: "2018-02-23 (포털 메타데이터 기준)",
    license: "KOGL 제1유형",
    format: "Sheet · GeoJSON · Open API",
    usedFor: "정류장 300m 도보권 인구 비율 → 교통 약자 GRI 0.4",
    status: "live",
    fields: ["정류장아이디", "정류장명", "GPSX좌표", "GPSY좌표", "행정동코드"],
  },
  {
    id: "gg-disabled-welfare",
    title: "장애인 관련 시설 현황",
    provider: "data.gg.go.kr",
    url: "https://data.gg.go.kr/portal/data/service/selectServicePage.do?infId=347LEGQP3MV3ON8S4VHU26319760&infSeq=1",
    categories: ["disabled"],
    updateCycle: "분기",
    lastUpdated: "2026-03-15",
    license: "KOGL 제1유형",
    format: "Sheet · CSV",
    usedFor: "장애인 1만명 당 시설 수 격차 → 장애 포용 GRI 0.5",
    status: "scheduled",
    fields: ["기관명", "유형", "주소", "연락처"],
  },
  {
    id: "gg-disabled-mobility-center",
    title: "교통약자 이동지원센터 정보 현황(제공표준)",
    provider: "data.gg.go.kr",
    url: "https://data.gg.go.kr/portal/data/service/selectServicePage.do?infId=5EG05WPHXWHKIEW0ZEWD27018698&infSeq=1",
    categories: ["transit", "disabled"],
    updateCycle: "월",
    lastUpdated: "2026-04-30",
    license: "KOGL 제1유형",
    format: "Sheet · CSV",
    usedFor: "이동지원 차량 보유·운영시간 격차 → 교통 약자 GRI 0.3",
    status: "scheduled",
    fields: ["센터명", "차량보유대수", "운영시간", "연락처", "소재지위치"],
  },
  {
    id: "gg-childcare-facility",
    title: "어린이집 현황(제공표준)",
    provider: "data.gg.go.kr",
    url: "https://data.gg.go.kr/portal/data/service/selectServicePage.do?infId=0L9Q27735HPYCGJWAALS12611803&infSeq=1",
    categories: ["edu", "safety"],
    updateCycle: "월",
    lastUpdated: "2025-08-25",
    license: "KOGL 제1유형",
    format: "Sheet · Map · XLS · CSV · JSON · XML",
    usedFor: "어린이집 정원 충족률·보행환경 결합 → 교육 격차 GRI 0.2",
    status: "scheduled",
    fields: ["어린이집명", "유형", "위치", "교직원수", "정원수"],
  },
  {
    id: "gg-large-fire",
    title: "대형 화재발생 현황",
    provider: "data.gg.go.kr",
    url: "https://data.gg.go.kr/portal/data/service/selectServicePage.do?infId=9O846DWO84YR9C217KQ312099810&infSeq=1",
    categories: ["safety"],
    updateCycle: "연",
    lastUpdated: "2024-12-31 (포털 메타데이터)",
    license: "KOGL 제1유형",
    format: "Sheet · CSV",
    usedFor: "시·군별 인명피해·재산피해 추세 → 재난 안전 GRI 0.35",
    status: "scheduled",
    fields: ["발생일자", "발생시각", "발생장소", "화재원인", "재산피해액", "시군명"],
  },
  {
    id: "gg-elderly-housing",
    title: "경기도 노인주거복지시설(양로시설, 공동생활가정) 현황",
    provider: "data.gg.go.kr",
    url: "https://data.gg.go.kr/portal/data/service/selectServicePage.do?infId=7QSG3H7LGJ3HMYQ3QBHJ27657101&infSeq=3",
    categories: ["medical", "disabled"],
    updateCycle: "분기",
    lastUpdated: "2026-03-31",
    license: "KOGL 제1유형",
    format: "Open API",
    usedFor: "고령인구 대비 시설 수 → 의료·복지 사각 보정 0.15",
    status: "scheduled",
    fields: ["시군명", "시설종류", "시설명", "주소", "입소정원", "입소현원"],
  },
  {
    id: "gg-air-quality",
    title: "대기질 측정 정보",
    provider: "data.gg.go.kr",
    url: "https://data.gg.go.kr/portal/data/service/selectServicePage.do?infId=GE0DUHTX3VX0GL4R0LUS26448884&infSeq=1",
    categories: ["air"],
    updateCycle: "시간",
    lastUpdated: "실시간",
    license: "KOGL 제1유형",
    format: "Sheet · Open API",
    usedFor: "측정소별 PM10·PM2.5·O3·NO2 → 대기 환경 GRI 0.3",
    status: "live",
    fields: ["측정소", "측정시각", "PM10", "PM25", "O3", "NO2", "CO", "SO2"],
  },

  // ── 경기 데이터 분석 포털 (가점 5점) ────────────────────────────────
  {
    id: "gg-insight-floating-population",
    title: "인구 및 소비 현황 분석 — 유동인구 (KT)",
    provider: "insight.gg.go.kr",
    url: "https://insight.gg.go.kr/analysisGalleryPop.do",
    categories: ["transit", "safety", "medical"],
    updateCycle: "월",
    lastUpdated: "2026-04-30",
    license: "경기도 분석센터 협약 (KT 통신데이터)",
    format: "분석 포털 시각화 · CSV 추출",
    usedFor: "야간·시간대별 체류인구 가중치 → 응급실 공백·심야 안전 GRI 0.2",
    status: "manual",
    fields: ["시군", "행정동", "성별", "연령대", "시간대", "체류인구"],
  },
  {
    id: "gg-insight-card-sales",
    title: "인구 및 소비 현황 분석 — 카드매출",
    provider: "insight.gg.go.kr",
    url: "https://insight.gg.go.kr/analysisGallerySales.do",
    categories: ["housing", "safety"],
    updateCycle: "월",
    lastUpdated: "2026-04-30",
    license: "경기도 분석센터 협약 (카드사 데이터)",
    format: "분석 포털 시각화 · CSV 추출",
    usedFor: "심야·소상공인 매출 패턴 → 주거 안전·생활 안전 GRI 0.15",
    status: "manual",
    fields: ["시군", "업종", "월", "시간대", "매출액", "건수"],
  },

  // ── 공공데이터포털 (data.go.kr) — 본 30점 보강 ───────────────────────
  {
    id: "molit-rtms-rent",
    title: "국토교통부 아파트 전월세 실거래가",
    provider: "data.go.kr",
    url: "https://www.data.go.kr/data/15126474/openapi.do",
    categories: ["housing"],
    updateCycle: "일",
    lastUpdated: "2026-05-24",
    license: "KOGL 제1유형",
    format: "Open API · XML",
    usedFor: "전세가율·동일 임대인 다건 임대 탐지 → 전세사기 위험도 GRI 0.4",
    status: "live",
    fields: ["법정동", "보증금", "월세", "전용면적", "계약일"],
  },
  {
    id: "hira-hospital-info",
    title: "건강보험심사평가원 병원정보서비스",
    provider: "data.go.kr",
    url: "https://www.data.go.kr/data/15001698/openapi.do",
    categories: ["medical"],
    updateCycle: "월",
    lastUpdated: "2026-04-30",
    license: "KOGL 제1유형",
    format: "Open API",
    usedFor: "야간진료·소아·산부인과 진료과목 매핑 → 의료 접근성 GRI 0.25",
    status: "scheduled",
    fields: ["요양기관명", "진료과목", "위경도", "주소"],
  },
  {
    id: "airkorea-pollution",
    title: "한국환경공단 에어코리아 대기오염정보",
    provider: "data.go.kr",
    url: "https://www.data.go.kr/data/15073861/openapi.do",
    categories: ["air"],
    updateCycle: "시간",
    lastUpdated: "실시간",
    license: "KOGL 제1유형",
    format: "Open API",
    usedFor: "전국 측정소 PM10·PM2.5 24h 평균 → 대기 환경 GRI 0.4 (경기 분석 보완)",
    status: "live",
    fields: ["측정소", "측정시각", "PM10", "PM25", "O3"],
  },
  {
    id: "hug-jeonse-deposit",
    title: "주택도시보증공사 전세보증금반환보증 발급현황",
    provider: "data.go.kr",
    url: "https://www.data.go.kr/data/15002531/fileData.do",
    categories: ["housing"],
    updateCycle: "월",
    lastUpdated: "2025-12-31",
    license: "KOGL 제1유형",
    format: "File · CSV",
    usedFor: "시·군구별 보증사고 추세 → 전세사기 GRI 검증 신호 0.2",
    status: "manual",
    fields: ["시도", "시군구", "연월", "사고건수", "사고금액"],
  },
];

export const DATASET_STATS = {
  total: DATASETS.length,
  byProvider: {
    "data.gg.go.kr": DATASETS.filter((d) => d.provider === "data.gg.go.kr").length,
    "insight.gg.go.kr": DATASETS.filter((d) => d.provider === "insight.gg.go.kr").length,
    "data.go.kr": DATASETS.filter((d) => d.provider === "data.go.kr").length,
  },
  byStatus: {
    live: DATASETS.filter((d) => d.status === "live").length,
    scheduled: DATASETS.filter((d) => d.status === "scheduled").length,
    manual: DATASETS.filter((d) => d.status === "manual").length,
  },
  // 가점 5점 직접 대상 (data.gg.go.kr + insight.gg.go.kr만)
  gyeonggiDirect:
    DATASETS.filter((d) => d.provider === "data.gg.go.kr").length +
    DATASETS.filter((d) => d.provider === "insight.gg.go.kr").length,
};
