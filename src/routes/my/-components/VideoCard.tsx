import { motion } from "motion/react";
import type { MouseEventHandler } from "react";

interface VideoCardProps {
  thumbnailUrl: string;
  sectorName: string;
  score: number;
  completedAt: string;
  layoutId?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  difficultyImageUrl: string;
}

export const VideoCard = ({
  thumbnailUrl,
  sectorName,
  score,
  layoutId,
  onClick,
  disabled,
  difficultyImageUrl,
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
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt="캐릭터"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="p-3 relative h-full z-[15]">
        <div className="flex gap-1.5 items-center">
          <div className="size-8 flex-center relative">
            <img
              src={difficultyImageUrl}
              alt="난이도"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="t-p-14-m text-neutral-100">SEC {sectorName}</span>
            <span className="t-p-12-m text-neutral-300">SCORE +{score}</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
};
