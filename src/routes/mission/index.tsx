import { createFileRoute } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import { useState } from "react";
import MissionCard from "./-components/MissionCard";

export const Route = createFileRoute("/mission/")({
  component: Mission,
});

const missions = [
  {
    id: 1,
    sectorName: "A구역 1번",
    difficulty: "orange",
  },
  {
    id: 2,
    sectorName: "B구역 3번",
    difficulty: "blue",
  },
  {
    id: 3,
    sectorName: "C구역 2번",
    difficulty: "red",
  },
] as const;

type FilterType = "all" | "failed" | "success" | "not_tried";

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
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setFilter("all")}
          >
            전체
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === "failed"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setFilter("failed")}
          >
            실패
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === "success"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setFilter("success")}
          >
            성공
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === "not_tried"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setFilter("not_tried")}
          >
            미도전
          </button>
        </div>
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
          onClick={toggleViewMode}
        >
          {viewMode === "card" ? "목록으로 보기" : "카드로 보기"}
        </button>
      </div>

      {viewMode === "card" ? (
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {missions.map((mission) => (
              <MissionCard
                key={mission.id}
                missionId={mission.id.toString()}
                {...mission}
                viewMode="card"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {missions.map((mission) => (
            <MissionCard
              key={mission.id}
              missionId={mission.id.toString()}
              {...mission}
              viewMode="list"
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
            <svg
              aria-label="시작하기"
              role="img"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
