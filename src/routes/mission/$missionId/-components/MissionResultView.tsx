import { useMemo } from "react";
import Button from "@/components/Button";
import DownloadIcon from "@/components/icons/DownloadIcon";
import FrownIcon from "@/components/icons/FrownIcon";
import ThumbsUpIcon from "@/components/icons/ThumbsUpIcon";
import type { RouteMissionRecommendationResponse } from "@/generated/model";
import { cn } from "@/utils/cn";
import { useCarousel } from "../../-hooks/useCarousel";

const VideoComponent = ({
  isSelected,
  videoUrl,
}: {
  isSelected: boolean;
  videoUrl: string;
}) => {
  return (
    <div
      className={cn("card-container", {
        "opacity-100 scale-100": isSelected,
        "opacity-50 scale-90": !isSelected,
      })}
    >
      {videoUrl ? (
        <video
          src={videoUrl}
          className="w-full h-full object-cover rounded-[32px] aspect-[3/4] overflow-hidden"
          playsInline
          muted
          loop
          controls
          autoPlay
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-neutral-400 t-p-14-m">
          영상이 없어요
        </div>
      )}
    </div>
  );
};

export default function MissionResultView({
  status,
  missionData,
  onRetry,
}: {
  status: "success" | "failed";
  missionData: RouteMissionRecommendationResponse;
  onRetry?: () => void;
}) {
  const { emblaRef, emblaApi, selectedIndex } = useCarousel();
  const activeTab = useMemo(
    () => (selectedIndex === 0 ? "answer" : "my-video"),
    [selectedIndex]
  );
  const latestAttemptUrl = missionData?.attempts?.[0]?.videoUrl;

  const handleDownload = async (url: string | undefined, filename: string) => {
    if (!url) return;

    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("다운로드 실패:", error);
    }
  };

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
            onClick={() => emblaApi?.scrollTo(0)}
            className={cn(
              "px-4 py-2 rounded-3xl t-p-14-m transition-colors",
              activeTab === "answer"
                ? "bg-neutral-600 text-neutral-100"
                : "bg-transparent text-neutral-100"
            )}
          >
            답지
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollTo(1)}
            className={cn(
              "px-4 py-2 rounded-3xl t-p-14-m transition-colors",
              activeTab === "my-video"
                ? "bg-neutral-600 text-neutral-100"
                : "bg-transparent text-neutral-100"
            )}
          >
            내 영상
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex items-center">
            <VideoComponent
              isSelected={selectedIndex === 0}
              videoUrl={missionData?.videoUrl ?? ""}
            />
            <VideoComponent
              isSelected={selectedIndex === 1}
              videoUrl={latestAttemptUrl ?? ""}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 px-4 pb-6 mt-auto">
        {latestAttemptUrl && (
          <Button
            onClick={() =>
              handleDownload(
                latestAttemptUrl,
                `my-video-${missionData.missionId}.mp4`
              )
            }
          >
            <span className="t-p-14-sb text-neutral-300 flex items-center gap-1">
              저장
              <DownloadIcon />
            </span>
          </Button>
        )}
        {onRetry && (
          <Button variant="white" onClick={onRetry}>
            다시 도전
          </Button>
        )}
      </div>
    </>
  );
}
