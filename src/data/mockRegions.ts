export interface Region {
  id: string;
  name: string;
  province: "경기" | "인천";
  kind: "시" | "군" | "구";
  lat: number;
  lng: number;
  population: number;
}

// 경기 31개 시·군 + 인천 10개 시·군·구 = 41개
export const REGIONS: Region[] = [
  // 경기 31개
  { id: "gg-suwon", name: "수원시", province: "경기", kind: "시", lat: 37.2636, lng: 127.0286, population: 1196000 },
  { id: "gg-yongin", name: "용인시", province: "경기", kind: "시", lat: 37.2410, lng: 127.1776, population: 1109000 },
  { id: "gg-goyang", name: "고양시", province: "경기", kind: "시", lat: 37.6584, lng: 126.8320, population: 1075000 },
  { id: "gg-hwaseong", name: "화성시", province: "경기", kind: "시", lat: 37.1996, lng: 126.8311, population: 956000 },
  { id: "gg-seongnam", name: "성남시", province: "경기", kind: "시", lat: 37.4201, lng: 127.1265, population: 919000 },
  { id: "gg-bucheon", name: "부천시", province: "경기", kind: "시", lat: 37.5034, lng: 126.7660, population: 780000 },
  { id: "gg-namyangju", name: "남양주시", province: "경기", kind: "시", lat: 37.6359, lng: 127.2169, population: 741000 },
  { id: "gg-ansan", name: "안산시", province: "경기", kind: "시", lat: 37.3219, lng: 126.8309, population: 634000 },
  { id: "gg-pyeongtaek", name: "평택시", province: "경기", kind: "시", lat: 36.9921, lng: 127.1129, population: 586000 },
  { id: "gg-anyang", name: "안양시", province: "경기", kind: "시", lat: 37.3943, lng: 126.9568, population: 549000 },
  { id: "gg-siheung", name: "시흥시", province: "경기", kind: "시", lat: 37.3801, lng: 126.8030, population: 522000 },
  { id: "gg-paju", name: "파주시", province: "경기", kind: "시", lat: 37.7600, lng: 126.7800, population: 510000 },
  { id: "gg-gimpo", name: "김포시", province: "경기", kind: "시", lat: 37.6151, lng: 126.7159, population: 503000 },
  { id: "gg-uijeongbu", name: "의정부시", province: "경기", kind: "시", lat: 37.7381, lng: 127.0337, population: 463000 },
  { id: "gg-gwangju", name: "광주시", province: "경기", kind: "시", lat: 37.4297, lng: 127.2550, population: 393000 },
  { id: "gg-hanam", name: "하남시", province: "경기", kind: "시", lat: 37.5392, lng: 127.2148, population: 332000 },
  { id: "gg-yangju", name: "양주시", province: "경기", kind: "시", lat: 37.7853, lng: 127.0454, population: 268000 },
  { id: "gg-osan", name: "오산시", province: "경기", kind: "시", lat: 37.1499, lng: 127.0772, population: 233000 },
  { id: "gg-icheon", name: "이천시", province: "경기", kind: "시", lat: 37.2722, lng: 127.4350, population: 224000 },
  { id: "gg-anseong", name: "안성시", province: "경기", kind: "시", lat: 37.0080, lng: 127.2799, population: 188000 },
  { id: "gg-pocheon", name: "포천시", province: "경기", kind: "시", lat: 37.8949, lng: 127.2002, population: 146000 },
  { id: "gg-uiwang", name: "의왕시", province: "경기", kind: "시", lat: 37.3447, lng: 126.9685, population: 162000 },
  { id: "gg-yangpyeong", name: "양평군", province: "경기", kind: "군", lat: 37.4914, lng: 127.4875, population: 124000 },
  { id: "gg-yeoju", name: "여주시", province: "경기", kind: "시", lat: 37.2982, lng: 127.6373, population: 113000 },
  { id: "gg-gwacheon", name: "과천시", province: "경기", kind: "시", lat: 37.4292, lng: 126.9876, population: 79000 },
  { id: "gg-gapyeong", name: "가평군", province: "경기", kind: "군", lat: 37.8315, lng: 127.5099, population: 62000 },
  { id: "gg-yeoncheon", name: "연천군", province: "경기", kind: "군", lat: 38.0966, lng: 127.0749, population: 41000 },
  { id: "gg-dongducheon", name: "동두천시", province: "경기", kind: "시", lat: 37.9036, lng: 127.0606, population: 88000 },
  { id: "gg-gunpo", name: "군포시", province: "경기", kind: "시", lat: 37.3617, lng: 126.9352, population: 263000 },
  { id: "gg-gwangmyeong", name: "광명시", province: "경기", kind: "시", lat: 37.4795, lng: 126.8646, population: 285000 },
  { id: "gg-guri", name: "구리시", province: "경기", kind: "시", lat: 37.5944, lng: 127.1296, population: 189000 },

  // 인천 10개
  { id: "ic-jung", name: "중구", province: "인천", kind: "구", lat: 37.4738, lng: 126.6216, population: 154000 },
  { id: "ic-donggu", name: "동구", province: "인천", kind: "구", lat: 37.4738, lng: 126.6433, population: 60000 },
  { id: "ic-michuhol", name: "미추홀구", province: "인천", kind: "구", lat: 37.4634, lng: 126.6500, population: 401000 },
  { id: "ic-yeonsu", name: "연수구", province: "인천", kind: "구", lat: 37.4108, lng: 126.6783, population: 391000 },
  { id: "ic-namdong", name: "남동구", province: "인천", kind: "구", lat: 37.4470, lng: 126.7311, population: 502000 },
  { id: "ic-bupyeong", name: "부평구", province: "인천", kind: "구", lat: 37.5079, lng: 126.7219, population: 491000 },
  { id: "ic-gyeyang", name: "계양구", province: "인천", kind: "구", lat: 37.5374, lng: 126.7378, population: 287000 },
  { id: "ic-seogu", name: "서구", province: "인천", kind: "구", lat: 37.5453, lng: 126.6757, population: 614000 },
  { id: "ic-ganghwa", name: "강화군", province: "인천", kind: "군", lat: 37.7466, lng: 126.4878, population: 70000 },
  { id: "ic-ongjin", name: "옹진군", province: "인천", kind: "군", lat: 37.4466, lng: 126.6364, population: 21000 },
];

export const GYEONGGI_CENTER = { lat: 37.4, lng: 127.05 };
export const INCHEON_CENTER = { lat: 37.46, lng: 126.7 };
export const GYEONGIN_CENTER = { lat: 37.42, lng: 126.95 };
