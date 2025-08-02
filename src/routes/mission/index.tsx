import { createFileRoute } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import { useState } from "react";
import GridIcon from "@/components/icons/GridIcon";
import { cn } from "@/utils/cn";
import ListIcon from "../../components/icons/ListIcon";
import MissionGridCard from "./-components/MissionGridCard";
import MissionListCard from "./-components/MissionListCard";
import MissionTimer from "./-components/MissionTimer";

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

  return (
    <div className="flex flex-col gap-4 pb-20">
      <div className="flex justify-between items-center px-4">
        <div className="flex gap-2">
          {(["all", "not_tried", "failed", "success"] as const).map((type) => (
            <button
              key={type}
              type="button"
              className={cn(
                "h-9 px-4 rounded-3xl t-p-14-m transition-colors",
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
        <div className="flex flex-col gap-2 px-4">
          {missions.map((mission) => (
            <MissionListCard
              key={mission.id}
              missionId={mission.id.toString()}
              {...mission}
            />
          ))}
        </div>
      )}

      <MissionTimer />
    </div>
  );
}
