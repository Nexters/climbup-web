import type { ButtonHTMLAttributes } from "react";

interface VideoCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  imageUrl: string;
  sectorName: string;
  score: number;
  completedAt: string;
}

export const VideoCard = ({
  imageUrl,
  sectorName,
  score,
  completedAt,
  ...props
}: VideoCardProps) => {
  return (
    <button
      type="button"
      className="w-full min-h-[224px] rounded-[24px] overflow-hidden bg-neutral-100 relative aspect-[168 / 224]"
      {...props}
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
    </button>
  );
};
