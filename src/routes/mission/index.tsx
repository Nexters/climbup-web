import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { countBy } from "es-toolkit/compat";
import { useCallback, useState } from "react";
import GridIcon from "@/components/icons/GridIcon";
import {
  MISSION_GUIDE_COMPLETED_KEY,
  USER_SESSION_STORAGE_KEY,
} from "@/constants/mission";
import type { RouteMissionRecommendationResponse } from "@/generated/model";
import { getRouteMissionRecommendations } from "@/generated/route-mission-recommendations/route-mission-recommendations";
import { getUserSession } from "@/generated/user-session/user-session";
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
import MissionTimer from "./-components/MissionTimer";
import { useCarousel } from "./-hooks/useCarousel";

export const Route = createFileRoute("/mission/")({
  component: Mission,
});

type FilterType = "all" | "failed" | "success" | "not_tried";

const getFilterLabels = (
  recommendations: (RouteMissionRecommendationResponse & {
    status: "not_tried" | "success" | "failed";
  })[]
) => {
  const counts = countBy(recommendations, ({ status }) => status);

  const notTried = counts.not_tried || 0;
  const failed = counts.failed || 0;
  const success = counts.success || 0;

  return {
    all: `전체 ${recommendations.length}`,
    not_tried: `미도전 ${notTried}`,
    failed: `실패 ${failed}`,
    success: `성공 ${success}`,
  };
};

const createMissionCardProps = (
  mission: RouteMissionRecommendationResponse & {
    status: "not_tried" | "success" | "failed";
  },
  isLocked: boolean
) => {
  const baseProps = {
    missionId: mission.missionId?.toString() ?? "",
    sectorName: mission.sector?.name ?? "",
    difficulty: mission.difficulty ?? "",
    imageUrl: mission.imageUrl,
    status: mission.status,
    isLocked,
    score: mission.score,
  };

  switch (mission.status) {
    case "success":
      return {
        ...baseProps,
        completedAt: mission.attempts?.[0]?.createdAt,
        holdImageUrl: mission.imageUrl,
      };
    case "failed":
      return {
        ...baseProps,
        removedAt: mission.removedAt,
        holdImageUrl: mission.imageUrl,
      };
    default:
      return baseProps;
  }
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

  const { data: sessionData } = useQuery({
    queryKey: ["userSession"],
    queryFn: () =>
      getStorage(USER_SESSION_STORAGE_KEY)
        ? getUserSession(Number(getStorage(USER_SESSION_STORAGE_KEY)), {
            headers: getHeaderToken(),
          })
        : null,
    select: (data) => data?.data ?? null,
    enabled: !!getStorage(USER_SESSION_STORAGE_KEY),
  });

  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [filter, setFilter] = useState<FilterType>("all");
  const [showGuide, setShowGuide] = useState(
    () => !getStorage(MISSION_GUIDE_COMPLETED_KEY)
  );
  const [showMockStopButton, setShowMockStopButton] = useState(false);

  const { emblaRef, selectedIndex } = useCarousel();

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
    <div className="flex flex-col gap-4 pb-20">
      <div className="flex justify-between items-center px-4">
        <div id="mission-filters" className="flex gap-2">
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
      </div>

      {viewMode === "card" ? (
        <div id="mission-carousel" className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-1 px-[10vw]">
            {filteredRecommendations.map((mission, index) => (
              <div
                key={mission.missionId}
                className="flex-[0_0_80vw] flex items-center justify-center"
                style={{
                  transform:
                    index === selectedIndex ? "scale(1)" : "scale(0.9)",
                  transition: "transform 0.3s ease",
                }}
              >
                <MissionGridCard
                  {...createMissionCardProps(mission, !sessionData?.startedAt)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div id="mission-list" className="flex flex-col gap-2 px-4">
          {filteredRecommendations.map((mission) => (
            <MissionListCard
              key={mission.missionId}
              {...createMissionCardProps(mission, !sessionData?.startedAt)}
            />
          ))}
        </div>
      )}

      <MissionTimer showMockStopButton={showMockStopButton} />
    </div>
  );
}
