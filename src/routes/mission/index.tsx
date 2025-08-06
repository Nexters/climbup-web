import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import GridIcon from "@/components/icons/GridIcon";
import type { RouteMissionRecommendationResponse } from "@/generated/model";
import { getRouteMissionRecommendations } from "@/generated/route-mission-recommendations/route-mission-recommendations";
import { cn } from "@/utils/cn";
import { getHeaderToken } from "@/utils/cookie";
import { calculateMissionStatus } from "@/utils/mission";
import ListIcon from "../../components/icons/ListIcon";
import MissionGridCard from "./-components/MissionGridCard";
import MissionListCard from "./-components/MissionListCard";
import MissionTimer from "./-components/MissionTimer";

export const Route = createFileRoute("/mission/")({
  component: Mission,
});

type FilterType = "all" | "failed" | "success" | "not_tried";

const getFilterLabels = (
  recommendations: (RouteMissionRecommendationResponse & {
    status: "not_tried" | "success" | "failed";
  })[]
) => {
  const total = recommendations.length;
  const notTried = recommendations.filter(
    (recommendation) => recommendation.status === "not_tried"
  ).length;
  const failed = recommendations.filter(
    (recommendation) => recommendation.status === "failed"
  ).length;
  const success = recommendations.filter(
    (recommendation) => recommendation.status === "success"
  ).length;

  return {
    all: `전체 ${total}`,
    not_tried: `미도전 ${notTried}`,
    failed: `실패 ${failed}`,
    success: `성공 ${success}`,
  };
};

function Mission() {
  const { data: recommendations = [] } = useQuery({
    queryKey: ["recommendations"],
    queryFn: () =>
      getRouteMissionRecommendations({ headers: getHeaderToken() }),
    select: (data) => {
      const missions = data.data ?? [];
      return missions.map((mission) => ({
        ...mission,
        status: calculateMissionStatus(mission.attempts),
      }));
    },
  });

  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [filter, setFilter] = useState<FilterType>("all");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: false,
    loop: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const filteredRecommendations = recommendations.filter((mission) => {
    if (filter === "all") return true;
    return mission.status === filter;
  });

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "card" ? "list" : "card"));
  };

  return (
    <div className="flex flex-col gap-4 pb-20">
      <div className="flex justify-between items-center px-4">
        <div className="flex gap-2">
          {(["all", "not_tried", "failed", "success"] as const).map((type) => (
            <button
              key={type}
              type="button"
              className={cn(
                "h-9 px-4 rounded-3xl t-p-14-recommendation transition-colors",
                filter === type
                  ? "bg-neutral-600 text-neutral-100"
                  : "text-neutral-100"
              )}
              onClick={() => setFilter(type)}
            >
              {getFilterLabels(recommendations)[type]}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="w-6 h-6 text-neutral-100"
          onClick={toggleViewMode}
          aria-label={viewMode === "card" ? "목록으로 보기" : "카드로 보기"}
        >
          {viewMode === "card" ? (
            <ListIcon variant="white" />
          ) : (
            <GridIcon variant="white" />
          )}
        </button>
      </div>

      {viewMode === "card" ? (
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-1 px-[7.5vw]">
            {filteredRecommendations.map((mission, index) => (
              <div
                key={mission.missionId}
                className="flex-[0_0_85vw] flex items-center justify-center"
                style={{
                  transform:
                    index === selectedIndex ? "scale(1)" : "scale(0.9)",
                  transition: "transform 0.3s ease",
                }}
              >
                <MissionGridCard
                  missionId={mission.missionId?.toString() ?? ""}
                  sectorName={mission.sector?.name ?? ""}
                  difficulty={mission.difficulty ?? ""}
                  imageUrl={mission.imageUrl}
                  status={mission.status}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 px-4">
          {filteredRecommendations.map((mission) => (
            <MissionListCard
              key={mission.missionId}
              missionId={mission.missionId?.toString() ?? ""}
              sectorName={mission.sector?.name ?? ""}
              difficulty={mission.difficulty ?? ""}
              imageUrl={mission.imageUrl}
              status={mission.status}
            />
          ))}
        </div>
      )}

      <MissionTimer />
    </div>
  );
}
