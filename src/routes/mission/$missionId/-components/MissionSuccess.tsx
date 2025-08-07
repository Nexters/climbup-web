import { useNavigate } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import CloseIcon from "@/components/icons/CloseIcon";
import ThumbsUpIcon from "@/components/icons/ThumbsUpIcon";
import type { RouteMissionRecommendationResponse } from "@/generated/model";
import { cn } from "@/utils/cn";

type TabType = "my-video" | "answer";

interface MissionSuccessProps {
  missionData: RouteMissionRecommendationResponse;
}

export default function MissionSuccess({ missionData }: MissionSuccessProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("my-video");

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

  return (
    <div className="flex flex-col h-full bg-neutral-900">
      <div className="flex items-center justify-end px-4 py-3">
        <button
          type="button"
          onClick={() => navigate({ to: "/mission" })}
          className="p-2"
        >
          <CloseIcon variant="white" width={24} height={24} />
        </button>
      </div>

      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-1">
          <ThumbsUpIcon variant="white" width={24} height={24} />
          <span className="t-p-22-sb text-neutral-100">미션 성공</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("my-video")}
            className={cn(
              "px-4 py-2 rounded-3xl t-p-14-m transition-colors",
              activeTab === "my-video"
                ? "bg-neutral-600 text-neutral-100"
                : "bg-transparent text-neutral-100"
            )}
          >
            내 영상
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("answer")}
            className={cn(
              "px-4 py-2 rounded-3xl t-p-14-m transition-colors",
              activeTab === "answer"
                ? "bg-neutral-600 text-neutral-100"
                : "bg-transparent text-neutral-100"
            )}
          >
            답지
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 px-4 py-6 overflow-x-auto">
        {activeTab === "my-video" ? (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-1 px-[10vw]">
              {missionData?.attempts?.map((attempt, index) => (
                <div
                  key={attempt.missionAttemptId}
                  className="flex-[0_0_80vw] flex items-center justify-center border-8 border-neutral-100 rounded-[40px] overflow-hidden"
                  style={{
                    transform:
                      index === selectedIndex ? "scale(1)" : "scale(0.9)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <video src={attempt.videoUrl} controls playsInline>
                    <track kind="captions" />
                  </video>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center">
            <div className="flex-[0_0_80vw] flex items-center justify-center border-8 border-neutral-100 rounded-[40px] overflow-hidden">
              <video src={missionData?.videoUrl} controls playsInline>
                <track kind="captions" />
              </video>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
