import { Link } from "@tanstack/react-router";
import { sample } from "es-toolkit/compat";
import { MISSION_STATUS_MESSAGES } from "@/constants/mission";
import { cn } from "@/utils/cn";
import { convertPascalCase } from "@/utils/convert";

interface MissionListCardProps {
  missionId: string;
  sectorName: string;
  difficulty: string;
  status?: "success" | "failed" | "not_tried";
  imageUrl?: string;
  holdImageUrl?: string;
  completedAt?: string;
  removedAt?: string;
  score?: number;
}

export default function MissionListCard({
  missionId,
  sectorName,
  difficulty,
  status = "not_tried",
  imageUrl,
  holdImageUrl,
  completedAt,
  removedAt,
  score,
}: MissionListCardProps) {
  return (
    <Link
      to="/mission/$missionId"
      params={{ missionId }}
      className="flex items-center bg-neutral-100 rounded-[32px] h-[112px] p-3 gap-3"
    >
      <div className="w-full max-w-[66px] h-full flex items-center">
        {status === "not_tried" && imageUrl && (
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full rounded-[20px] object-cover"
            loading="lazy"
          />
        )}
        {status !== "not_tried" && holdImageUrl && (
          <img
            src={holdImageUrl}
            alt=""
            className="w-full h-full rounded-[20px] object-contain"
            loading="lazy"
          />
        )}
      </div>
      <div className="w-[1px] h-full bg-neutral-300" />
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={cn(
              "px-2 py-1 rounded-3xl t-p-10-sb",
              status === "success" && "bg-blue-100 text-blue-800",
              status === "failed" && "bg-red-100 text-red-800",
              status === "not_tried" && "bg-neutral-300 text-neutral-600"
            )}
          >
            {status === "success" && "성공"}
            {status === "failed" && "실패"}
            {status === "not_tried" && "미도전"}
          </span>
          {completedAt && (
            <span className="t-p-10-sb text-neutral-400">
              {new Date(completedAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                weekday: "short",
              })}
            </span>
          )}
          {removedAt && (
            <span className="t-p-10-sb text-neutral-400">
              탈거일:&nbsp;
              {new Date(removedAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                weekday: "short",
              })}
            </span>
          )}
        </div>
        <div className="t-m-24-b text-neutral-900 mb-[6px]">
          {convertPascalCase(difficulty)}
        </div>
        <div className="t-p-12-m text-neutral-600 mb-1">
          {status === "not_tried" && sample(MISSION_STATUS_MESSAGES.not_tried)}
          {status === "success" && sample(MISSION_STATUS_MESSAGES.success)}
          {status === "failed" && sample(MISSION_STATUS_MESSAGES.failed)}
        </div>
        <div className="flex items-center gap-1 t-p-10-sb text-neutral-400">
          <span className="w-1 h-1 rounded-full bg-neutral-400" />
          <span className="mr-1">SEC: {sectorName}</span>
          <span className="w-1 h-1 rounded-full bg-neutral-400" />
          <span>SCORE: {score}</span>
        </div>
      </div>
    </Link>
  );
}
