import { createFileRoute } from "@tanstack/react-router";
import { clsx } from "clsx";
import useEmblaCarousel from "embla-carousel-react";
import { useState } from "react";
import GridIcon from "@/components/icons/GridIcon";
import ListIcon from "../../components/icons/ListIcon";
import PlayIcon from "../../components/icons/PlayIcon";
import MissionGridCard from "./-components/MissionGridCard";
import MissionListCard from "./-components/MissionListCard";

export const Route = createFileRoute("/mission/")({
  component: Mission,
});

const missions = [
  {
    id: 1,
    sectorName: "SEC 1·2",
    difficulty: "Blue",
  },
  {
    id: 2,
    sectorName: "SEC 3·4",
    difficulty: "Blue",
  },
  {
    id: 3,
    sectorName: "SEC 5·6",
    difficulty: "Blue",
  },
] as const;

type FilterType = "all" | "failed" | "success" | "not_tried";

const filterLabels: Record<FilterType, string> = {
  all: "전체 30",
  not_tried: "미도전",
  failed: "실패",
  success: "성공",
};

function Mission() {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [filter, setFilter] = useState<FilterType>("all");
  const [emblaRef] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
  });

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "card" ? "list" : "card"));
  };

  const handleStart = () => {
    console.log("시작하기");
  };

  return (
    <div className="flex flex-col gap-4 pb-20">
      <div className="flex justify-between items-center px-4">
        <div className="flex gap-2">
          {(["all", "not_tried", "failed", "success"] as const).map((type) => (
            <button
              key={type}
              type="button"
              className={clsx(
                "h-9 px-4 rounded-3xl text-sm font-medium transition-colors",
                filter === type
                  ? "bg-neutral-600 text-neutral-100"
                  : "text-neutral-100"
              )}
              onClick={() => setFilter(type)}
            >
              {filterLabels[type]}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="w-6 h-6 text-gray-50"
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
        <div className="overflow-hidden px-4" ref={emblaRef}>
          <div className="flex gap-4">
            {missions.map((mission) => (
              <MissionGridCard
                key={mission.id}
                missionId={mission.id.toString()}
                {...mission}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          {missions.map((mission) => (
            <MissionListCard
              key={mission.id}
              missionId={mission.id.toString()}
              {...mission}
            />
          ))}
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-4xl font-bold text-gray-900">00:00:00</div>
          <button
            type="button"
            onClick={handleStart}
            className="w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors"
            aria-label="시작하기"
          >
            <PlayIcon variant="white" />
          </button>
        </div>
      </div>
    </div>
  );
}
