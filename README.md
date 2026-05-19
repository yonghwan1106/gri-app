# BlueSpot — MVP v0.1

**AI × LBS × Journalism 통합 사각지대 발굴 SaaS 플랫폼**

경기·인천 41개 시·군·구를 우선 대상으로, 시민이 위치 기반으로 사각지대를 제보하고
AI(Claude Opus 4)가 교차검증·점수화하며, 솔루션 저널리즘(경인블루저널)이 다음 단계를 만듭니다.

본 데모는 **2026 KOREA LBS 스타트업 챌린지(마감 2026-06-10) 사업화 분야** 응모용 시제품입니다.

---

## 페이지

- `/` — 랜딩: 히어로 + 12개 카테고리 + 통계 + CTA
- `/map` — Leaflet 지도 + 사각지대 100건 + BSI 필터
- `/report` — 시민 제보 폼 → Claude API 자동 분류
- `/category/[slug]` — 의료/교통/복지/행정 상세 (BSI 상위 + 관련 보도)
- `/article/[id]` — 솔루션 저널리즘 보도 3건
- `/about` — 경인블루저널 + 박용환 대표 + 로드맵

## 기술 스택

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS 3.4
- Leaflet + react-leaflet
- @anthropic-ai/sdk (Claude Opus 4)
- Mock 데이터: `src/data/*.ts`

## 환경변수

`.env.local` 생성 또는 Vercel 환경변수 설정:

```
ANTHROPIC_API_KEY=sk-ant-...
```

미설정 시 `/api/classify`는 mock 응답을 반환합니다.

## 로컬 실행

```bash
npm install --legacy-peer-deps
npm run build
npm run start
```

## Vercel 배포

```bash
vercel deploy --prod
```

배포 후 Vercel 대시보드 > Settings > Environment Variables에서 `ANTHROPIC_API_KEY` 등록.

## 로드맵

- **v0.1 (현재)**: 정적 데모 + Claude API 제보 분류
- **v0.5**: DB 연동 (Supabase 또는 자체 PostgreSQL), 시민 인증, 이미지 업로드
- **v1.0**: 전체 12개 카테고리 상세 + 영상 솔루션 저널리즘 통합
- **v2.0**: 전국 226개 시·군·구 확장 + 정책 KPI API

---

© 2026 경인블루저널 (박용환 대표)
