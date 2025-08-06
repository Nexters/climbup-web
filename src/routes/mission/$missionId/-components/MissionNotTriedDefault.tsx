import { useNavigate } from "@tanstack/react-router";
import CloseIcon from "@/components/icons/CloseIcon";
import MissionGridCard from "../../-components/MissionGridCard";

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
  onStart,
}: MissionNotTriedDefaultProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-neutral-900">
      <div className="flex justify-end items-center px-4 py-4">
        <button
          type="button"
          onClick={() => navigate({ to: "/mission" })}
          className="w-6 h-6 text-neutral-400"
        >
          <CloseIcon variant="white" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center gap-4 px-4">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="rounded-3xl t-p-14-sb text-neutral-200">
              {sectorName}
            </span>
            <span className="rounded-3xl t-p-14-sb text-neutral-200">
              {difficulty}
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

        <div className="w-full h-full max-w-[85vw] flex items-center justify-center">
          <MissionGridCard
            sectorName={sectorName}
            difficulty={difficulty}
            imageUrl={missionImage}
            status="not_tried"
            onStart={onStart}
          />
        </div>
      </div>
    </div>
  );
}
