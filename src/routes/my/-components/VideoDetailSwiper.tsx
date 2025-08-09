import { AnimatePresence, motion } from "motion/react";
import { Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/virtual";
import { useEffect, useState } from "react";
import assetScrollDown from "@/assets/images/ic_scroll_down.png";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import { cn } from "@/utils/cn";

type VideoDetailItem = {
  imageUrl: string;
  sectorName: string;
  score: number;
  completedAt: string;
};

interface VideoDetailSwiperProps {
  items: VideoDetailItem[];
  initialIndex: number;
  onClose: () => void;
  sharedLayoutId: string;
}

export const VideoDetailSwiper = ({
  items,
  initialIndex,
  onClose,
  sharedLayoutId,
}: VideoDetailSwiperProps) => {
  const [isHintVisible, setIsHintVisible] = useState(true);

  useEffect(() => {
    const timerId = window.setTimeout(() => setIsHintVisible(false), 2000);
    return () => window.clearTimeout(timerId);
  }, []);

  return (
    <motion.div
      layout
      layoutId={sharedLayoutId}
      className="fixed inset-0 z-[100]"
      onClick={(e) => e.stopPropagation()}
    >
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
      <button
        type="button"
        aria-label="닫기"
        className="absolute left-4 top-4 z-[110] w-8 h-8 rounded-full text-white flex-center"
        onClick={onClose}
      >
        <ChevronDownIcon className="rotate-90" />
      </button>
      <Swiper
        className="w-full h-dvh"
        direction="vertical"
        modules={[Virtual]}
        virtual
        initialSlide={initialIndex}
        resistanceRatio={0.85}
      >
        {items.map((item) => (
          <SwiperSlide key={`video-detail-slide-${item.imageUrl}`}>
            <div className="relative w-full h-dvh">
              <img
                src={item.imageUrl}
                alt={`${item.sectorName} 영상`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
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
        ))}
      </Swiper>
    </motion.div>
  );
};
