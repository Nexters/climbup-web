import { Button, Flex, Text } from "@radix-ui/themes";
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

  return (
    <Flex direction="column" gap="4">
      <Flex>
        <Text size="6" weight="bold">
          00:00:00
        </Text>
      </Flex>
      <Flex justify="between" align="center">
        <Flex gap="2">
          <Button
            size="2"
            variant={filter === "all" ? "solid" : "soft"}
            onClick={() => setFilter("all")}
          >
            전체
          </Button>
          <Button
            size="2"
            variant={filter === "failed" ? "solid" : "soft"}
            onClick={() => setFilter("failed")}
          >
            실패
          </Button>
          <Button
            size="2"
            variant={filter === "success" ? "solid" : "soft"}
            onClick={() => setFilter("success")}
          >
            성공
          </Button>
          <Button
            size="2"
            variant={filter === "not_tried" ? "solid" : "soft"}
            onClick={() => setFilter("not_tried")}
          >
            미도전
          </Button>
        </Flex>
        <Button size="2" variant="soft" onClick={toggleViewMode}>
          {viewMode === "card" ? "목록으로 보기" : "카드로 보기"}
        </Button>
      </Flex>

      {viewMode === "card" ? (
        <div className="overflow-hidden" ref={emblaRef}>
          <Flex gap="4" className="flex-row">
            {missions.map((mission) => (
              <MissionCard key={mission.id} {...mission} viewMode="card" />
            ))}
          </Flex>
        </div>
      ) : (
        <Flex direction="column" gap="3">
          {missions.map((mission) => (
            <MissionCard key={mission.id} {...mission} viewMode="list" />
          ))}
        </Flex>
      )}

      <Flex
        style={{
          marginTop: "auto",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1rem",
        }}
      >
        <Button size="4" style={{ width: "100%" }}>
          시작하기
        </Button>
      </Flex>
    </Flex>
  );
}
