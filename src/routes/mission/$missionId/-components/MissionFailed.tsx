import type { RouteMissionRecommendationResponse } from "@/generated/model";
import MissionDetailHeader from "./MissionDetailHeader";
import MissionResultView from "./MissionResultView";

interface MissionFailedProps {
  missionData: RouteMissionRecommendationResponse;
  onRetry: () => void;
}

export default function MissionFailed({
  missionData,
  onRetry,
}: MissionFailedProps) {
  return (
    <div className="flex flex-col h-full bg-neutral-900">
      <MissionDetailHeader type="close" />
      <MissionResultView
        status="failed"
        missionData={missionData}
        onRetry={onRetry}
      />
    </div>
  );
}
