import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import CloseIcon from "@/components/icons/CloseIcon";
import { getRouteMissionRecommendationByAttempt } from "@/generated/attempts/attempts";
import MissionGridCard from "../../-components/MissionGridCard";

interface MissionNotTriedSuccessProps {
  attemptId: number | null;
}

export default function MissionNotTriedSuccess({
  attemptId,
}: MissionNotTriedSuccessProps) {
  const navigate = useNavigate();

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

  const { data: missions } = useQuery({
    queryKey: ["mission-not-tried-success", attemptId],
    queryFn: () => getRouteMissionRecommendationByAttempt(attemptId ?? 0),
    select: (data) => data.data ?? [],
  });

  return (
    <div className="flex-1 flex flex-col">
      <div className="absolute top-4 right-4">
        <button type="button" onClick={() => window.history.back()}>
          <CloseIcon variant="white" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center pt-[14vh]">
        <div className="w-full flex flex-col items-center gap-4 mb-6 px-4">
          <h1 className="t-p-22-sb text-neutral-100 leading-[1.4] tracking-[-0.024em] text-center">
            축하해요!
            <br />
            다음 문제도 풀어보세요
          </h1>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-1 px-[7.5vw]">
            {missions?.map((mission, index) => (
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
                  key={mission.missionId}
                  sectorName={mission.sector?.name ?? ""}
                  difficulty={mission.difficulty ?? ""}
                  imageUrl={mission.imageUrl}
                  onStart={() => {
                    navigate({
                      to: "/mission/$missionId",
                      params: { missionId: mission.missionId?.toString() },
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
