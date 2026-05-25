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

/** 주소 문자열에서 시·군을 추출해 LAWD_CD를 반환 */
export function findLawdByAddress(address: string): LawdCode | null {
  const cleaned = address.replace(/\s/g, '');
  for (const lawd of LAWD_CODES) {
    if (cleaned.includes(lawd.city) || cleaned.includes(lawd.cityShort + '시') || cleaned.includes(lawd.cityShort + '군')) {
      return lawd;
    }
  }
  // 시 단위 약식만 있는 경우 fallback
  for (const lawd of LAWD_CODES) {
    if (cleaned.includes(lawd.cityShort)) return lawd;
  }
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
