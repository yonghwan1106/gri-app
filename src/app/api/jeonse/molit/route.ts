import { NextResponse } from "next/server";
import { findLawdByAddress, recentDealYmds } from "@/data/lawdCodes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// 국토교통부 실거래가 OpenAPI 엔드포인트 (자동승인 완료)
const APT_RENT_URL = "http://apis.data.go.kr/1613000/RTMSDataSvcAptRent/getRTMSDataSvcAptRent";
const RH_RENT_URL = "http://apis.data.go.kr/1613000/RTMSDataSvcRHRent/getRTMSDataSvcRHRent";

interface RentItem {
  buildingType: string;
  buildingName?: string;
  legalDong?: string;
  jibun?: string;
  area?: number;
  deposit?: number;
  monthlyRent?: number;
  contractYmd?: string;
  buildYear?: number;
  floor?: number;
}

interface RequestBody {
  address?: string;
  buildingType?: string;
  months?: number;
}

function extract(xml: string, tag: string): string | null {
  const m = xml.match(new RegExp(`<${tag}>\\s*([\\s\\S]*?)\\s*</${tag}>`, "i"));
  return m ? m[1].trim() : null;
}

function extractAllItems(xml: string): string[] {
  const items: string[] = [];
  const re = /<item>([\s\S]*?)<\/item>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    items.push(m[1]);
  }
  return items;
}

function parseItem(raw: string, isApt: boolean): RentItem {
  const deposit = extract(raw, "보증금액") || extract(raw, "보증금") || "0";
  const monthly = extract(raw, "월세금액") || extract(raw, "월세") || "0";
  const area = extract(raw, "전용면적");
  const year = extract(raw, "년");
  const month = extract(raw, "월");
  const day = extract(raw, "일");
  const buildYear = extract(raw, "건축년도");
  const floor = extract(raw, "층");
  const jibun = extract(raw, "지번");
  const dong = extract(raw, "법정동");
  const name = isApt ? extract(raw, "아파트") : (extract(raw, "연립다세대") || extract(raw, "건물명") || extract(raw, "주택유형"));

  return {
    buildingType: isApt ? "아파트" : "연립다세대",
    buildingName: name || undefined,
    legalDong: dong || undefined,
    jibun: jibun || undefined,
    area: area ? parseFloat(area) : undefined,
    deposit: parseInt((deposit || "0").replace(/,/g, ""), 10),
    monthlyRent: parseInt((monthly || "0").replace(/,/g, ""), 10),
    contractYmd: year && month && day ? `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}` : undefined,
    buildYear: buildYear ? parseInt(buildYear, 10) : undefined,
    floor: floor ? parseInt(floor, 10) : undefined,
  };
}

async function fetchRent(url: string, key: string, lawdCd: string, dealYmd: string, isApt: boolean): Promise<{ items: RentItem[]; rawSample: string }> {
  const params = new URLSearchParams({
    serviceKey: key,
    LAWD_CD: lawdCd,
    DEAL_YMD: dealYmd,
    pageNo: "1",
    numOfRows: "100",
  });
  const fullUrl = `${url}?${params.toString()}`;

  const res = await fetch(fullUrl, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`MOLIT API HTTP ${res.status}`);
  }
  const xml = await res.text();
  // OpenAPI 정상 응답은 resultCode가 "00" 또는 "000" 등 0으로 시작
  const rc = extract(xml, "resultCode");
  if (rc && !/^0+$/.test(rc)) {
    const msg = extract(xml, "resultMsg");
    throw new Error(`MOLIT API result error ${rc}: ${msg}`);
  }
  const rawItems = extractAllItems(xml);
  const rawSample = rawItems[0] ?? "";
  return {
    items: rawItems.map((r) => parseItem(r, isApt)),
    rawSample,
  };
}

function computeStats(items: RentItem[]) {
  const deposits = items
    .filter((i) => i.deposit && i.deposit > 0)
    .map((i) => i.deposit as number)
    .sort((a, b) => a - b);
  if (deposits.length === 0) {
    return { count: 0, depositMin: 0, depositMax: 0, depositMedian: 0, depositMean: 0 };
  }
  const sum = deposits.reduce((s, v) => s + v, 0);
  const mid = Math.floor(deposits.length / 2);
  return {
    count: deposits.length,
    depositMin: deposits[0],
    depositMax: deposits[deposits.length - 1],
    depositMedian: deposits.length % 2 === 0 ? Math.round((deposits[mid - 1] + deposits[mid]) / 2) : deposits[mid],
    depositMean: Math.round(sum / deposits.length),
  };
}

export async function POST(req: Request) {
  let payload: RequestBody;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const address = payload.address?.trim();
  const months = Math.min(Math.max(payload.months ?? 3, 1), 6);
  const buildingType = payload.buildingType || "아파트";
  const isApt = buildingType.includes("아파트") || buildingType.includes("오피스텔");

  if (!address) {
    return NextResponse.json({ error: "address 필수" }, { status: 400 });
  }

  const lawd = findLawdByAddress(address);
  if (!lawd) {
    return NextResponse.json(
      {
        error: "주소에서 경기도 시·군을 인식할 수 없습니다.",
        hint: "예: 경기 용인시 기흥구 동백동 ... / 경기 수원시 권선구 ... / 경기 평택시 ...",
      },
      { status: 422 },
    );
  }

  const apiKey = process.env.MOLIT_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      mock: true,
      lawd,
      months,
      stats: { count: 12, depositMin: 18000, depositMax: 32000, depositMedian: 24000, depositMean: 24500 },
      items: [
        { buildingType: buildingType, buildingName: "(Mock) 동백 SK뷰", legalDong: "동백동", area: 84.6, deposit: 25000, monthlyRent: 0, contractYmd: "2026-05-10", buildYear: 2008, floor: 12 },
        { buildingType: buildingType, buildingName: "(Mock) 동백 자이", legalDong: "동백동", area: 59.9, deposit: 22000, monthlyRent: 0, contractYmd: "2026-04-22", buildYear: 2010, floor: 8 },
      ],
      note: "MOLIT_API_KEY 미설정 mock 응답. .env.local에 키 설정 후 실시간 호출 가능.",
    });
  }

  const targetUrl = isApt ? APT_RENT_URL : RH_RENT_URL;
  const ymds = recentDealYmds(months);

  try {
    const settled = await Promise.allSettled(
      ymds.map((ymd) => fetchRent(targetUrl, apiKey, lawd.code, ymd, isApt)),
    );
    const items: RentItem[] = [];
    const errors: string[] = [];
    let rawSample = "";
    settled.forEach((r, i) => {
      if (r.status === "fulfilled") {
        items.push(...r.value.items);
        if (!rawSample && r.value.rawSample) rawSample = r.value.rawSample;
      } else {
        errors.push(`${ymds[i]}: ${(r.reason as Error).message}`);
      }
    });
    const stats = computeStats(items);

    return NextResponse.json({
      mock: false,
      lawd,
      months,
      ymds,
      buildingType,
      apiUsed: isApt ? "RTMSDataSvcAptRent" : "RTMSDataSvcRHRent",
      stats,
      itemCount: items.length,
      items: items.slice(0, 12),
      rawSample: rawSample.slice(0, 800),
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: "MOLIT API 호출 실패", detail: msg }, { status: 500 });
  }
}
