import { useState } from "react";
import FrownIcon from "@/components/icons/FrownIcon";
import ThumbsUpIcon from "@/components/icons/ThumbsUpIcon";
import type { RouteMissionRecommendationResponse } from "@/generated/model";
import { cn } from "@/utils/cn";
import { useCarousel } from "../../-hooks/useCarousel";

type TabType = "my-video" | "answer";

export default function MissionResultView({
  status,
  missionData,
}: {
  status: "success" | "failed";
  missionData: RouteMissionRecommendationResponse;
}) {
  const [activeTab, setActiveTab] = useState<TabType>("my-video");

  const { emblaRef, selectedIndex } = useCarousel();

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-1">
          {status === "success" ? (
            <ThumbsUpIcon variant="white" width={24} height={24} />
          ) : (
            <FrownIcon variant="white" width={24} height={24} />
          )}
          <span className="t-p-22-sb text-neutral-100">
            {status === "success" ? "미션 성공" : "미션 실패"}
          </span>
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
    </>
  );
}
