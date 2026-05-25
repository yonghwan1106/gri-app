// 경기도 31개 시·군 법정동 코드 (LAWD_CD 5자리) — 국토부 실거래가 OpenAPI용
// 출처: 행정표준코드관리시스템 (https://www.code.go.kr)

export interface LawdCode {
  city: string;       // 시·군 이름
  cityShort: string;  // 검색용 약식 (예: 수원, 용인)
  code: string;       // LAWD_CD 5자리
  type: '시' | '군';
}

export const LAWD_CODES: LawdCode[] = [
  { city: '수원시', cityShort: '수원', code: '41110', type: '시' },
  { city: '성남시', cityShort: '성남', code: '41130', type: '시' },
  { city: '의정부시', cityShort: '의정부', code: '41150', type: '시' },
  { city: '안양시', cityShort: '안양', code: '41170', type: '시' },
  { city: '부천시', cityShort: '부천', code: '41190', type: '시' },
  { city: '광명시', cityShort: '광명', code: '41210', type: '시' },
  { city: '평택시', cityShort: '평택', code: '41220', type: '시' },
  { city: '동두천시', cityShort: '동두천', code: '41250', type: '시' },
  { city: '안산시', cityShort: '안산', code: '41270', type: '시' },
  { city: '고양시', cityShort: '고양', code: '41280', type: '시' },
  { city: '과천시', cityShort: '과천', code: '41290', type: '시' },
  { city: '구리시', cityShort: '구리', code: '41310', type: '시' },
  { city: '남양주시', cityShort: '남양주', code: '41360', type: '시' },
  { city: '오산시', cityShort: '오산', code: '41370', type: '시' },
  { city: '시흥시', cityShort: '시흥', code: '41390', type: '시' },
  { city: '군포시', cityShort: '군포', code: '41410', type: '시' },
  { city: '의왕시', cityShort: '의왕', code: '41430', type: '시' },
  { city: '하남시', cityShort: '하남', code: '41450', type: '시' },
  { city: '용인시', cityShort: '용인', code: '41460', type: '시' },
  { city: '파주시', cityShort: '파주', code: '41480', type: '시' },
  { city: '이천시', cityShort: '이천', code: '41500', type: '시' },
  { city: '안성시', cityShort: '안성', code: '41550', type: '시' },
  { city: '김포시', cityShort: '김포', code: '41570', type: '시' },
  { city: '화성시', cityShort: '화성', code: '41590', type: '시' },
  { city: '광주시', cityShort: '광주', code: '41610', type: '시' },
  { city: '양주시', cityShort: '양주', code: '41630', type: '시' },
  { city: '포천시', cityShort: '포천', code: '41650', type: '시' },
  { city: '여주시', cityShort: '여주', code: '41670', type: '시' },
  { city: '연천군', cityShort: '연천', code: '41800', type: '군' },
  { city: '가평군', cityShort: '가평', code: '41820', type: '군' },
  { city: '양평군', cityShort: '양평', code: '41830', type: '군' },
];

// 일반구 (특정 시에는 5자리 LAWD_CD가 구별로 별도 부여됨 — 구가 명시되면 우선 매핑)
interface DistrictCode { parentCity: string; districtName: string; code: string; }
export const DISTRICT_CODES: DistrictCode[] = [
  // 수원시 (4개구)
  { parentCity: '수원시', districtName: '장안구', code: '41111' },
  { parentCity: '수원시', districtName: '권선구', code: '41113' },
  { parentCity: '수원시', districtName: '팔달구', code: '41115' },
  { parentCity: '수원시', districtName: '영통구', code: '41117' },
  // 성남시 (3개구)
  { parentCity: '성남시', districtName: '수정구', code: '41131' },
  { parentCity: '성남시', districtName: '중원구', code: '41133' },
  { parentCity: '성남시', districtName: '분당구', code: '41135' },
  // 안양시 (2개구)
  { parentCity: '안양시', districtName: '만안구', code: '41171' },
  { parentCity: '안양시', districtName: '동안구', code: '41173' },
  // 안산시 (2개구)
  { parentCity: '안산시', districtName: '상록구', code: '41271' },
  { parentCity: '안산시', districtName: '단원구', code: '41273' },
  // 고양시 (3개구)
  { parentCity: '고양시', districtName: '덕양구', code: '41281' },
  { parentCity: '고양시', districtName: '일산동구', code: '41285' },
  { parentCity: '고양시', districtName: '일산서구', code: '41287' },
  // 용인시 (3개구)
  { parentCity: '용인시', districtName: '처인구', code: '41461' },
  { parentCity: '용인시', districtName: '기흥구', code: '41463' },
  { parentCity: '용인시', districtName: '수지구', code: '41465' },
];

/** 주소 문자열에서 시·군 또는 일반구를 추출해 LAWD_CD를 반환 (NFC 정규화 + 다중 패턴) */
export function findLawdByAddress(address: string): LawdCode | null {
  if (!address) return null;
  const norm = address.normalize('NFC');
  const cleaned = norm.replace(/\s+/g, '');

  // 1) 일반구가 명시된 경우 우선 (수원시 권선구 → 41113)
  for (const d of DISTRICT_CODES) {
    if (cleaned.includes(d.parentCity + d.districtName) || cleaned.includes(d.districtName)) {
      // parent city도 함께 있는지 확인 (안성시 vs 만안구 같은 동음이의 회피)
      if (cleaned.includes(d.parentCity)) {
        return { city: `${d.parentCity} ${d.districtName}`, cityShort: d.districtName, code: d.code, type: '시' };
      }
    }
  }
  // 2) 일반구만 있는 경우 (parentCity 없이) — 고유한 구만 매칭 (분당구, 일산동구 등)
  for (const d of DISTRICT_CODES) {
    if (cleaned.includes(d.districtName)) {
      return { city: `${d.parentCity} ${d.districtName}`, cityShort: d.districtName, code: d.code, type: '시' };
    }
  }
  // 3) 시 전체명 매칭
  for (const lawd of LAWD_CODES) {
    if (cleaned.includes(lawd.city)) return lawd;
  }
  // 4) short + 시/군 suffix
  for (const lawd of LAWD_CODES) {
    if (cleaned.includes(lawd.cityShort + '시') || cleaned.includes(lawd.cityShort + '군')) {
      return lawd;
    }
  }
  // 5) short only fallback
  const candidates = LAWD_CODES
    .filter((lawd) => cleaned.includes(lawd.cityShort))
    .sort((a, b) => b.cityShort.length - a.cityShort.length);
  if (candidates.length > 0) return candidates[0];

  return null;
}

/** 최근 N개월의 YYYYMM 배열 (오늘 기준 역순) */
export function recentDealYmds(months = 3): string[] {
  const out: string[] = [];
  const now = new Date();
  for (let i = 0; i < months; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const ym = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}`;
    out.push(ym);
  }
  return out;
}
