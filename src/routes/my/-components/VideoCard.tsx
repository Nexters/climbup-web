import { motion } from "motion/react";
import type { MouseEventHandler } from "react";

interface VideoCardProps {
  imageUrl: string;
  sectorName: string;
  score: number;
  completedAt: string;
  layoutId?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const VideoCard = ({
  imageUrl,
  sectorName,
  score,
  completedAt,
  layoutId,
  onClick,
  disabled,
}: VideoCardProps) => {
  return (
    <motion.button
      type="button"
      className="w-full rounded-[24px] overflow-hidden bg-neutral-100 relative aspect-[3/4]"
      layout
      layoutId={layoutId}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#313131] to-[#00000000] z-10" />
      <img
        src={imageUrl}
        alt="캐릭터"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="p-3 relative h-full z-[15]">
        <div className="flex gap-1.5 items-center">
          <div className="w-[34px] h-[34px] rounded-[8px] bg-neutral-300 bg-opacity-60 flex-center relative">
            <img
              src={imageUrl}
              alt="난이도"
              className="w-full h-full p-1.5 object-cover"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="t-p-12-m text-neutral-100">{sectorName}</span>
            <span className="t-p-12-m text-neutral-100">SCORE +{score}</span>
          </div>
        </div>
        <div className="flex items-center absolute bottom-3 right-3">
          <span className="t-p-10-sb text-neutral-300">{completedAt}</span>
        </div>
      </div>
    </motion.button>
  );
};
