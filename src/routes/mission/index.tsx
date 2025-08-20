import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { countBy, sample } from "es-toolkit/compat";
import { useCallback, useState } from "react";
import GridIcon from "@/components/icons/GridIcon";
import { MISSION_GUIDE_COMPLETED_KEY } from "@/constants/mission";
import type { RouteMissionRecommendationResponse } from "@/generated/model";
import { getRouteMissionRecommendations } from "@/generated/route-mission-recommendations/route-mission-recommendations";
import { getCurrentUserSession } from "@/generated/user-session/user-session";
import {
  type DriverGuideStepsFactory,
  useDriverGuide,
} from "@/hooks/useDriverGuide";
import { cn } from "@/utils/cn";
import { getHeaderToken } from "@/utils/cookie";
import { calculateMissionStatus } from "@/utils/mission";
import { getStorage, setStorage } from "@/utils/storage";
import ListIcon from "../../components/icons/ListIcon";
import MissionGridCard from "./-components/MissionGridCard";
import MissionListCard from "./-components/MissionListCard";
import MissionLockCard from "./-components/MissionLockCard";
import MissionTimer from "./-components/MissionTimer";
import { useCarousel } from "./-hooks/useCarousel";

export const Route = createFileRoute("/mission/")({
  component: Mission,
});

type FilterType = "all" | "failed" | "success" | "not_tried";

const getFilterLabels = (
  recommendations: (RouteMissionRecommendationResponse & {
    status: "not_tried" | "success" | "failed";
  })[],
  currentFilter: FilterType
) => {
  const counts = countBy(recommendations, ({ status }) => status);

  const notTried = counts.not_tried || 0;
  const failed = counts.failed || 0;
  const success = counts.success || 0;

  return {
    all:
      currentFilter === "all" ? `전체 ${recommendations.length || ""}` : "전체",
    not_tried: currentFilter === "not_tried" ? `미도전 ${notTried}` : "미도전",
    failed: currentFilter === "failed" ? `실패 ${failed}` : "실패",
    success: currentFilter === "success" ? `성공 ${success}` : "성공",
  };
};

const createMissionCardProps = (
  mission: RouteMissionRecommendationResponse & {
    status: "not_tried" | "success" | "failed";
  }
) => {
  const baseProps = {
    missionId: mission.missionId?.toString() ?? "",
    sectorName: mission.sector?.name ?? "",
    difficulty: mission.difficulty ?? "",
    imageUrl: mission.imageUrl,
    status: mission.status,
    score: mission.score,
  };

  switch (mission.status) {
    case "success":
      return {
        ...baseProps,
        completedAt: mission.attempts?.[0]?.createdAt,
        holdImageUrl: sample(mission.gymLevel?.imageUrls ?? []),
      };
    case "failed":
      return {
        ...baseProps,
        removedAt: mission.removedAt,
        holdImageUrl: sample(mission.gymLevel?.imageUrls ?? []),
      };
    default:
      return baseProps;
  }
};

function Mission() {
  const { data: sessionData, isError: isSessionError } = useQuery({
    queryKey: ["userSession"],
    queryFn: () => getCurrentUserSession({ headers: getHeaderToken() }),
    select: (data) => data?.data ?? null,
  });

  const isSessionStarted = !!sessionData?.startedAt && !isSessionError;

  const { data: recommendations = [] } = useQuery({
    queryKey: ["recommendations"],
    queryFn: () =>
      getRouteMissionRecommendations({ headers: getHeaderToken() }),
    select: (data) => {
      const missions = data.data ?? [];
      return missions
        .map((mission) => ({
          ...mission,
          status: calculateMissionStatus(mission.attempts),
        }))
        .sort((a, b) => {
          const statusOrder = { not_tried: 0, failed: 1, success: 2 };
          return statusOrder[a.status] - statusOrder[b.status];
        });
    },
    enabled: isSessionStarted,
  });

  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [filter, setFilter] = useState<FilterType>("all");
  const [showMockStopButton, setShowMockStopButton] = useState(false);
  const [showGuide, setShowGuide] = useState(
    () => !getStorage(MISSION_GUIDE_COMPLETED_KEY)
  );

  const { emblaRef, selectedIndex, scrollTo } = useCarousel();

  const handleGuideComplete = useCallback(() => {
    setShowGuide(false);
    setShowMockStopButton(false);
  }, []);

  const filteredRecommendations = recommendations.filter((mission) => {
    if (filter === "all") return true;
    return mission.status === filter;
  });

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "card" ? "list" : "card"));
  };

  const steps: DriverGuideStepsFactory = ({ stop, driverRef }) => [
    {
      element: "#timer-play-button",
      popover: {
        align: "center",
        side: "top",
        title: "세션 시작",
        description: "재생 버튼을 누르면 오늘의 세션을 시작해요.",
        onNextClick: () => {
          setShowMockStopButton(true);
          driverRef.current?.moveNext();
        },
      },
    },
    {
      element: "#mission-carousel",
      popover: {
        align: "center",
        side: "bottom",
        title: "루트 미션",
        description: "내 레벨에 맞는 미션에 도전하고 해설 영상을 확인해보세요.",
      },
    },
    {
      element: "#timer-stop-button",
      popover: {
        align: "center",
        side: "top",
        title: "세션 종료",
        description:
          "멈춤 버튼을 길게 누르면 오늘의 세션이 종료돼요. 종료 후 기록을 확인할 수 있어요.",
        onNextClick: () => {
          stop();
        },
      },
    },
  ];

  useDriverGuide({
    enabled: showGuide,
    onStart: () => {
      setStorage(MISSION_GUIDE_COMPLETED_KEY, "true");
    },
    onComplete: handleGuideComplete,
    steps,
  });

  return (
    <div className="flex flex-col">
      <div className="flex justify-between sticky top-[78px] items-center px-4 bg-neutral-500 pb-4">
        <div id="mission-filters" className="flex gap-2">
          {(["all", "not_tried", "failed", "success"] as const).map((type) => (
            <button
              key={type}
              type="button"
              disabled={!isSessionStarted}
              className={cn(
                "h-9 px-4 rounded-3xl whitespace-nowrap t-p-12-m sm:t-p-14-m transition-colors text-neutral-100",
                cn({
                  "bg-neutral-600": filter === type && isSessionStarted,
                })
              )}
              onClick={() => {
                setFilter(type);
                scrollTo(0);
              }}
            >
              {getFilterLabels(recommendations, filter)[type]}
            </button>
          ))}
        </div>
        {isSessionStarted && (
          <button
            id="mission-view-toggle"
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
        )}
      </div>

      {viewMode === "card" ? (
        <div id="mission-carousel" className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-1 px-[10vw] p-2 pb-4">
            {isSessionStarted ? (
              filteredRecommendations.map((mission, index) => (
                <div
                  key={mission.missionId}
                  className={cn(
                    "flex-[0_0_80vw] flex items-center justify-center transition-transform duration-300 ease-in-out",
                    index === selectedIndex
                      ? "scale-100 opacity-100"
                      : "scale-90 opacity-50"
                  )}
                  data-selected={index === selectedIndex}
                  data-index={index}
                  data-selected-index={selectedIndex}
                >
                  <MissionGridCard
                    {...createMissionCardProps(mission)}
                    type="main"
                  />
                </div>
              ))
            ) : (
              <MissionLockCard />
            )}
          </div>
        </div>
      ) : (
        <div id="mission-list" className="flex flex-col gap-2 px-4">
          {filteredRecommendations.map((mission) => (
            <MissionListCard
              key={mission.missionId}
              {...createMissionCardProps(mission)}
            />
          ))}
        </div>
      )}

      <MissionTimer showMockStopButton={showMockStopButton} />
    </div>
  );
}
