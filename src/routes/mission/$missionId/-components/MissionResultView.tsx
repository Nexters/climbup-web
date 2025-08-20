import { useMemo } from "react";
import Button from "@/components/Button";
import DownloadIcon from "@/components/icons/DownloadIcon";
import FrownIcon from "@/components/icons/FrownIcon";
import ThumbsUpIcon from "@/components/icons/ThumbsUpIcon";
import type { RouteMissionRecommendationResponse } from "@/generated/model";
import { cn } from "@/utils/cn";
import { useCarousel } from "../../-hooks/useCarousel";

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

      <div className="flex items-center gap-4 py-6">
        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex gap-1 px-[10vw]">
            <div
              className="flex-[0_0_80vw] flex items-center justify-center"
              style={{
                transform: selectedIndex === 0 ? "scale(1)" : "scale(0.9)",
                transition: "transform 0.3s ease",
              }}
            >
              <div className="card-container">
                {missionData?.videoUrl ? (
                  <video
                    src={missionData.videoUrl}
                    className="w-full h-full object-cover rounded-[32px]"
                    controls
                    playsInline
                  >
                    <track kind="captions" />
                  </video>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400 t-p-14-m">
                    답지 영상이 없습니다
                  </div>
                )}
              </div>
            </div>
            <div
              className="flex-[0_0_80vw] flex items-center justify-center"
              style={{
                transform: selectedIndex === 1 ? "scale(1)" : "scale(0.9)",
                transition: "transform 0.3s ease",
              }}
            >
              <div className="card-container">
                {latestAttemptUrl ? (
                  <video
                    src={latestAttemptUrl}
                    className="w-full h-full object-cover rounded-[32px]"
                    controls
                    playsInline
                  >
                    <track kind="captions" />
                  </video>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400 t-p-14-m">
                    영상이 없습니다
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 px-4 py-6">
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
          <button
            type="button"
            className="t-p-14-sb bg-neutral-100 rounded-[32px] px-9 py-4 shadow-[2px_2px_16px_0_rgba(0,0,0,0.4)]"
            onClick={onRetry}
          >
            다시 도전
          </button>
        )}
      </div>
    </>
  );
}
