import { EvalDashboard } from "./EvalDashboard";

export const metadata = {
  title: "AI 분류 성능 평가 — GRI",
  description: "GRI의 Claude Opus 4.8 분류 정확도·일관성·지연시간을 골든셋 25건으로 평가한 결과",
};

export default function EvalPage() {
  return <EvalDashboard />;
}
