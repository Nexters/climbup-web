import MissionGridCard from "../../-components/MissionGridCard";
import MissionDetailHeader from "./MissionDetailHeader";

interface MissionNotTriedDefaultProps {
  sectorName: string;
  sectorImage: string;
  difficulty: string;
  missionImage: string;
  score: number;
  onStart: () => void;
}

export default function MissionNotTriedDefault({
  sectorName,
  sectorImage,
  difficulty,
  missionImage,
  score,
  onStart,
}: MissionNotTriedDefaultProps) {
  return (
    <>
      <MissionDetailHeader />

      <div className="flex-1 flex flex-col items-center gap-4 px-4">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="rounded-3xl t-p-14-sb text-neutral-200">
              SEC {sectorName}
            </span>
          </div>
          <div className="w-[88px] h-[46px]">
            <img
              src={sectorImage}
              alt="Sector"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="w-full max-w-[85vw] flex items-center justify-center">
          <MissionGridCard
            sectorName={sectorName}
            difficulty={difficulty}
            imageUrl={missionImage}
            status="not_tried"
            onStart={onStart}
            type="detail"
            imageOpacity={100}
            score={score}
            hasTooltip
          />
        </div>
      </div>
    </>
  );
}
