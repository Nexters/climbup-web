import type { RouteMissionRecommendationResponse } from "@/generated/model";
import MissionDetailHeader from "./MissionDetailHeader";
import MissionResultView from "./MissionResultView";

interface MissionSuccessProps {
  missionData: RouteMissionRecommendationResponse;
}

export default function MissionSuccess({ missionData }: MissionSuccessProps) {
  return (
    <div className="flex flex-col h-full bg-neutral-900">
      <MissionDetailHeader type="close" />
      <MissionResultView status="success" missionData={missionData} />
    </div>
  );
}
