import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getRouteMissionRecommendations } from "@/generated/route-mission-recommendations/route-mission-recommendations";
import { getHeaderToken } from "@/utils/cookie";
import { calculateMissionStatus } from "@/utils/mission";
import MissionDetailHeader from "../-components/MissionDetailHeader";
import MissionResultView from "../-components/MissionResultView";

export const Route = createFileRoute("/mission/$missionId/success/")({
  component: MissionSuccess,
});

function MissionSuccess() {
  const { missionId } = Route.useParams();

  const { data: currentMission } = useQuery({
    queryKey: ["recommendations"],
    queryFn: () =>
      getRouteMissionRecommendations({ headers: getHeaderToken() }),
    select: (data) => {
      const missions = data.data ?? [];
      const mission = missions.find(
        (mission) => mission.missionId === Number(missionId)
      );

      if (!mission) return undefined;

      return {
        ...mission,
        status: calculateMissionStatus(mission.attempts),
      };
    },
  });

  if (!currentMission) {
    return (
      <div className="fixed inset-0 flex flex-col bg-neutral-900">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-neutral-100">미션을 찾을 수 없습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col h-full bg-neutral-900">
      <MissionDetailHeader type="close" />
      <MissionResultView status="success" missionData={currentMission} />
    </div>
  );
}
