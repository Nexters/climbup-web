import { Link } from "@tanstack/react-router";
import { clsx } from "clsx";
import LockIcon from "../../../components/icons/LockIcon";

interface MissionListCardProps {
  missionId: string;
  sectorName: string;
  difficulty: string;
  status?: "success" | "failed" | "not_tried";
}

export default function MissionListCard({
  missionId,
  sectorName,
  difficulty,
  status = "not_tried",
}: MissionListCardProps) {
  return (
    <div className="flex items-center gap-4 p-4">
      <div className="w-[90px] h-[120px] rounded-2xl overflow-hidden">
        <img
          src={`https://placehold.co/400x600/4D5761/FCFCFD.png?text=Mission+${missionId}`}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-[18px] flex items-center">
          <span className="px-3 py-1 bg-neutral-300 rounded-3xl text-[10px] font-semibold text-neutral-600">
            {sectorName}
          </span>
        </div>
        <div className="text-2xl font-extrabold text-neutral-100">
          {difficulty}
        </div>
        <div className="text-sm font-medium text-neutral-100">
          이 루트 궁금하지 않으신가요?
        </div>
      </div>
      <Link
        to="/mission/$missionId"
        params={{ missionId }}
        className={clsx(
          "w-12 h-14 flex items-center justify-center rounded-[32px]",
          "bg-neutral-900 text-neutral-100",
          "hover:opacity-90 transition-opacity"
        )}
      >
        <LockIcon variant="white" />
      </Link>
    </div>
  );
}
