// 경기 공공데이터 출처 표 — 사업계획서 서식2 제3-1 기재용
// 가점 5점 (경기데이터드림 + 경기데이터분석포털 직접 활용) + 공공데이터 활용 30점 핵심 근거

export interface DataSource {
  plat: string; // 제공 기관(플랫폼)명
  name: string; // 데이터명
  url: string;  // URL
  use: string;  // GRI 활용 방식
  isGyeonggi: boolean; // 가점 5점 인정 데이터 (경기데이터드림 또는 경기데이터분석포털)
}

export const DATA_SOURCES: DataSource[] = [
  // 경기데이터드림 (가점 5점)
  {
    plat: "경기데이터드림",
    name: "시군별 유동인구",
    url: "https://data.gg.go.kr/portal/data/service/selectServicePage.do?infId=6NOSUTB9NJAKABX5DFCJ31197470",
    use: "GRI 활동성 지수 — 31개 시·군 시간대·요일 이동 패턴",
    isGyeonggi: true,
  },
  {
    plat: "경기데이터드림",
    name: "단독·다가구 전월세",
    url: "https://data.gg.go.kr/portal/data/service/selectServicePage.do?infId=GK5U8HQJRVOWT9ZZIHHP23118682",
    use: "주거 안전 지수 + F1 전세사기 위험도 베이스 데이터",
    isGyeonggi: true,
  },
  {
    plat: "경기데이터드림",
    name: "등록장애인 집계",
    url: "https://data.gg.go.kr/portal/data/service/selectServicePage.do?infId=YIN8M7Y2PO0IDIVHI2OE24856941",
    use: "장애 포용 지수 + 교통약자 이동권 가중치",
    isGyeonggi: true,
  },
  // 경기데이터분석포털 (가점 5점)
  {
    plat: "경기데이터분석포털",
    name: "유동인구 분석 (KT 통신)",
    url: "https://insight.gg.go.kr/analysisGalleryPop.do",
    use: "시·군별 시간대·연령대 활동 패턴 (멀티 에이전트 입력)",
    isGyeonggi: true,
  },
  {
    plat: "경기데이터분석포털",
    name: "카드매출 분석 (5개 카드사)",
    url: "https://insight.gg.go.kr/analysisGallerySales.do",
    use: "상권 안전 지수 + 주거 안전 보조 변수 (소비 침체 탐지)",
    isGyeonggi: true,
  },
  // 공공데이터포털 (활용신청 자동승인 완료, 일일 10,000건, 24개월)
  {
    plat: "공공데이터포털",
    name: "아파트 전월세 실거래가 (자동승인✓)",
    url: "https://www.data.go.kr/data/15126474/openapi.do",
    use: "F1 전세사기 시세 검증 / RTMSDataSvcAptRent / 일일 10,000건",
    isGyeonggi: false,
  },
  {
    plat: "공공데이터포털",
    name: "연립다세대 전월세 실거래가 (자동승인✓)",
    url: "https://www.data.go.kr/data/15126473/openapi.do",
    use: "F1 보증금 위험도 평가 / RTMSDataSvcRHRent / 일일 10,000건",
    isGyeonggi: false,
  },
  {
    plat: "행정안전부",
    name: "재난문자방송(CBS) OpenAPI",
    url: "https://www.data.go.kr/",
    use: "GRI 재난 안전 지수 보조 데이터",
    isGyeonggi: false,
  },
];

export const GYEONGGI_SOURCES = DATA_SOURCES.filter((s) => s.isGyeonggi);
export const SUPPORT_SOURCES = DATA_SOURCES.filter((s) => !s.isGyeonggi);
