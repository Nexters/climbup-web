import { AnimatePresence, motion } from "motion/react";
import { Dialog } from "radix-ui";
import type { Swiper as SwiperType } from "swiper";
import { Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/virtual";
import {
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import assetScrollDown from "@/assets/images/ic_scroll_down.png";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import DownloadIcon from "@/components/icons/DownloadIcon";
import PlayIcon from "@/components/icons/PlayIcon";
import StopIcon from "@/components/icons/StopIcon";
import { cn } from "@/utils/cn";
import { downloadVideo, generateSafeFilename } from "@/utils/download";

type VideoDetailItem = {
  imageUrl: string;
  videoUrl: string;
  sectorName: string;
  score: number;
  completedAt: string;
};

interface VideoDetailSwiperProps {
  items: VideoDetailItem[];
  initialIndex: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
}

export const VideoDetailSwiper = ({
  items,
  initialIndex,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: VideoDetailSwiperProps) => {
  const [isHintVisible, setIsHintVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isControlHintVisible, setIsControlHintVisible] = useState(false);
  const [controlHintAction, setControlHintAction] = useState<"play" | "pause">(
    "play"
  );
  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(null);
  const controlHintTimerRef = useRef<number | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const timerId = window.setTimeout(() => setIsHintVisible(false), 2000);
    return () => window.clearTimeout(timerId);
  }, []);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
    setIsControlHintVisible(false);
    if (controlHintTimerRef.current !== null) {
      window.clearTimeout(controlHintTimerRef.current);
      controlHintTimerRef.current = null;
    }
    if (
      swiper.activeIndex >= items.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      void fetchNextPage();
    }
  };

  const handleVideoClick = (event: ReactMouseEvent<HTMLVideoElement>) => {
    const videoElement = event.currentTarget;
    const willPlay = videoElement.paused;
    if (willPlay) {
      void videoElement.play();
      setControlHintAction("play");
    } else {
      videoElement.pause();
      setControlHintAction("pause");
    }
    setIsControlHintVisible(true);
    if (controlHintTimerRef.current !== null) {
      window.clearTimeout(controlHintTimerRef.current);
    }
    controlHintTimerRef.current = window.setTimeout(() => {
      setIsControlHintVisible(false);
      controlHintTimerRef.current = null;
    }, 700);
  };

  const handleDownload = async (item: VideoDetailItem, index: number) => {
    if (downloadingIndex !== null) return; // 이미 다운로드 중인 경우 차단

    try {
      setDownloadingIndex(index);

      const filename = generateSafeFilename(
        item.sectorName,
        item.completedAt,
        item.score
      );

      await downloadVideo(item.videoUrl, {
        filename,
        onError: (error) => {
          console.error("Download failed:", error);
          alert("다운로드에 실패했습니다. 다시 시도해주세요.");
        },
        onComplete: () => {
          console.log("Download completed successfully");
        },
      });
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setDownloadingIndex(null);
    }
  };

  useEffect(
    () => () => {
      if (controlHintTimerRef.current !== null) {
        window.clearTimeout(controlHintTimerRef.current);
        controlHintTimerRef.current = null;
      }
    },
    []
  );

  // Swiper는 children 변경 시 자동으로 업데이트되므로 별도 update 호출 불필요

  return (
    <div className="relative w-full h-dvh">
      {/* Guide Overlay */}
      <AnimatePresence>
        {isHintVisible ? (
          <>
            <motion.div
              key="first-open-hint"
              className={cn(
                "absolute inset-0 z-[120] pointer-events-none flex-center"
              )}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="z-[120] pointer-events-none flex flex-col justify-center items-center gap-2">
                <div className="px-3 py-1.5 text-neutral-100 t-p-22-sb text-center whitespace-pre-line">
                  {`아래로 내려서\n내 완등 영상을 확인해보세요.`}
                </div>
                <motion.img
                  src={assetScrollDown}
                  alt="아래로 내려서 내 완등 영상을 확인해보세요."
                  className="w-[74px] h-[74px] object-cover"
                  initial={{ transform: "translateY(0)" }}
                  animate={{ transform: "translateY(10px)" }}
                  transition={{
                    duration: 0.45,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </div>
            </motion.div>
            <motion.div
              key="first-open-dim"
              className="absolute inset-0 z-[105] bg-black pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </>
        ) : null}
      </AnimatePresence>
      <Dialog.Close asChild>
        <button
          type="button"
          aria-label="닫기"
          className="absolute left-4 top-4 z-[110] w-8 h-8 rounded-full text-white flex-center"
        >
          <ChevronDownIcon className="rotate-90" />
        </button>
      </Dialog.Close>
      <Swiper
        className="w-full h-dvh"
        direction="vertical"
        modules={[Virtual]}
        virtual
        initialSlide={initialIndex}
        resistanceRatio={0.85}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onReachEnd={() => {
          if (hasNextPage && !isFetchingNextPage) {
            void fetchNextPage();
          }
        }}
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const isDownloading = downloadingIndex === index;
          return (
            <SwiperSlide key={`video-detail-slide-${item.imageUrl}`}>
              <div className="relative w-full h-dvh">
                <video
                  poster={item.imageUrl}
                  className="absolute inset-0 w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  autoPlay={isActive}
                  src={isActive ? item.videoUrl : undefined}
                  onClick={handleVideoClick}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* 다운로드 버튼 */}
                <button
                  type="button"
                  aria-label="영상 다운로드"
                  className={cn(
                    "absolute right-4 top-4 z-[110] w-10 h-10 rounded-full bg-black/40 text-white flex-center transition-all duration-200",
                    isDownloading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-black/60"
                  )}
                  onClick={() => handleDownload(item, index)}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <DownloadIcon variant="white" size={20} />
                  )}
                </button>
                <AnimatePresence>
                  {isActive && isControlHintVisible ? (
                    <motion.div
                      key="control-hint"
                      className="absolute inset-0 z-[115] pointer-events-none flex-center"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 0.9, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <div className="w-16 h-16 rounded-full bg-black/40 text-white flex-center">
                        {controlHintAction === "play" ? (
                          <PlayIcon className="w-6 h-6" variant="white" />
                        ) : (
                          <StopIcon className="w-6 h-6" variant="white" />
                        )}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
                <div className="absolute bottom-8 left-6 right-6 flex items-end justify-between gap-4">
                  <div className="flex flex-col items-start gap-1">
                    <span className="t-p-16-sb text-neutral-100">
                      {item.sectorName}
                    </span>
                    <span className="t-p-12-m text-neutral-200">
                      SCORE +{item.score}
                    </span>
                  </div>
                  <span className="t-p-12-sb text-neutral-300">
                    {item.completedAt}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
