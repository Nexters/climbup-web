import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getRouteMissionRecommendations } from "@/generated/route-mission-recommendations/route-mission-recommendations";
import { getHeaderToken } from "@/utils/cookie";
import { calculateMissionStatus } from "@/utils/mission";
import MissionFailed from "./-components/MissionFailed";
import MissionNotTried from "./-components/MissionNotTried";
import MissionSuccess from "./-components/MissionSuccess";

export const Route = createFileRoute("/mission/$missionId/")({
  component: MissionDetail,
});

function MissionDetail() {
  const { missionId } = Route.useParams();

  const [state, setState] = useState<"not_tried" | "success" | "failed">(
    "not_tried"
  );

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

  useEffect(() => {
    if (currentMission?.status) {
      setState(currentMission.status);
    }
  }, [currentMission]);

  if (!currentMission) {
    return (
      <div className="fixed inset-0 flex flex-col bg-neutral-900">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-neutral-100">미션을 찾을 수 없습니다.</div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (state) {
      case "success":
        return <MissionSuccess missionData={currentMission} />;
      case "failed":
        return (
          <MissionFailed
            missionData={currentMission}
            onRetry={() => setState("not_tried")}
          />
        );
      case "not_tried":
        return (
          <MissionNotTried
            missionId={Number(missionId)}
            sectorName={currentMission.sector?.name ?? ""}
            difficulty={currentMission.difficulty ?? ""}
            sectorImage={currentMission.sector?.imageUrl ?? ""}
            missionImage={currentMission.imageUrl ?? ""}
            score={currentMission.score ?? 0}
            videoUrl={currentMission.videoUrl ?? ""}
            attemptId={currentMission.attempts?.[0]?.missionAttemptId ?? null}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-neutral-900">
      {renderContent()}
    </div>
  );
}
