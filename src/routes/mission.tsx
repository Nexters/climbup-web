import { Flex } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import MissionCard from "../components/Home/MissionCard";

export const Route = createFileRoute("/mission")({
  component: Mission,
});

const missions = [
  {
    id: 1,
    sectorName: "A구역 1번",
    difficulty: 'orange'
  },
  {
    id: 2,
    sectorName: "B구역 3번",
    difficulty: 'blue'
  },
  {
    id: 3,
    sectorName: "C구역 2번",
    difficulty: 'red'
  },
] as const;

function Mission() {
  const [emblaRef] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
  });

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <Flex gap="4" className="flex-row">
        {missions.map((mission) => (
          <MissionCard key={mission.id} {...mission} />
        ))}
      </Flex>
    </div>
  );
}
