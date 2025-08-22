import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getRouteMissionRecommendationByAttempt } from "@/generated/attempts/attempts";
import { convertPascalCase } from "@/utils/convert";
import { getHeaderToken } from "@/utils/cookie";
import MissionGridCard from "../../-components/MissionGridCard";
import { useCarousel } from "../../-hooks/useCarousel";
import MissionDetailHeader from "./MissionDetailHeader";

interface MissionNotTriedSuccessProps {
  attemptId: number | null;
  onStart: () => void;
}

export default function MissionNotTriedSuccess({
  attemptId,
  onStart,
}: MissionNotTriedSuccessProps) {
  const navigate = useNavigate();
  const { emblaRef, selectedIndex } = useCarousel();

  const { data: missions } = useQuery({
    queryKey: ["mission-not-tried-success", attemptId],
    queryFn: () =>
      getRouteMissionRecommendationByAttempt(attemptId ?? 0, {
        headers: getHeaderToken(),
      }),
    select: (data) => data.data ?? [],
  });

  return (
    <>
      <MissionDetailHeader />

      <div className="flex-1 flex flex-col items-center">
        <div className="w-full flex flex-col items-center gap-4 mb-6 px-4">
          <h1 className="t-p-22-sb text-neutral-100 leading-[1.4] tracking-[-0.024em] text-center">
            축하해요!
            <br />
            다음 문제도 풀어보세요
          </h1>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex items-center">
            {missions?.map((mission, index) => (
              <MissionGridCard
                key={mission.missionId}
                sectorName={mission.sector?.name ?? ""}
                difficulty={convertPascalCase(mission.difficulty ?? "")}
                imageUrl={mission.imageUrl}
                onStart={() => {
                  navigate({
                    to: "/mission/$missionId",
                    params: { missionId: mission.missionId?.toString() },
                  });
                  onStart();
                }}
                type="recommendation"
                isSelected={index === selectedIndex}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center t-p-14-m bg-neutral-600 rounded-[24px] px-3 py-1 mt-4">
          <span className="text-neutral-100">{selectedIndex + 1}</span>
          <span className="text-neutral-400">/</span>
          <span className="text-neutral-400">{missions?.length}</span>
        </div>
      </div>
    </>
  );
}
