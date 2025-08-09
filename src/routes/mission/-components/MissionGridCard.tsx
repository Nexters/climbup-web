import { Link } from "@tanstack/react-router";
import Button from "@/components/Button";
import { cn } from "@/utils/cn";
import FrownIcon from "../../../components/icons/FrownIcon";
import LockIcon from "../../../components/icons/LockIcon";
import ThumbsUpIcon from "../../../components/icons/ThumbsUpIcon";

interface MissionGridCardProps {
  missionId?: string;
  sectorName: string;
  difficulty: string;
  status?: "success" | "failed" | "not_tried";
  isLocked?: boolean;
  imageUrl?: string;
  onStart?: () => void;
  score?: number;
  completedAt?: string;
  removedAt?: string;
  holdImageUrl?: string;
}

export default function MissionGridCard({
  missionId,
  sectorName,
  difficulty,
  status = "not_tried",
  isLocked = false,
  imageUrl,
  onStart,
  score,
  completedAt,
  removedAt,
  holdImageUrl,
}: MissionGridCardProps) {
  return (
    <Link
      to="/mission/$missionId"
      params={{ missionId }}
      disabled={!missionId || (isLocked && status === "not_tried")}
      className="w-full aspect-[3/4] rounded-[40px] overflow-hidden border-8 border-neutral-100"
    >
      <div
        className={cn(
          "relative h-full p-5",
          status === "not_tried"
            ? ""
            : "bg-neutral-100 border-[1px] border-neutral-300 rounded-[32px]"
        )}
      >
        {status === "not_tried" && imageUrl && (
          <img
            src={imageUrl}
            alt="mission-image"
            className={cn(
              "absolute inset-0 w-full h-full object-cover z-[-1]",
              isLocked && status === "not_tried" && "blur-sm"
            )}
          />
        )}
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-1">
              <span
                className={cn("px-2 py-1 rounded-3xl t-p-10-sb", {
                  "bg-blue-100 text-blue-800": status === "success",
                  "bg-red-100 text-red-800": status === "failed",
                  "bg-neutral-300 text-neutral-600": status === "not_tried",
                })}
              >
                {status === "success" && "성공"}
                {status === "failed" && "실패"}
                {status === "not_tried" && sectorName}
              </span>
              {completedAt && (
                <span className="t-p-10-sb text-neutral-400">
                  {new Date(completedAt).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
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
                  })}
                </span>
              )}
            </div>
            <div
              className={cn("t-m-56-b", {
                "text-neutral-100": status === "not_tried",
                "text-neutral-900": status !== "not_tried",
              })}
            >
              {difficulty}
            </div>
            <div className="flex items-center gap-1">
              {status === "not_tried" ? (
                <div className="t-p-14-m text-neutral-100">
                  이 루트 궁금하지 않으신가요?
                </div>
              ) : (
                <>
                  {status === "success" ? (
                    <ThumbsUpIcon variant="dark" width={16} height={16} />
                  ) : (
                    <FrownIcon variant="dark" width={16} height={16} />
                  )}
                  <div className="t-p-14-m">
                    {status === "success"
                      ? "완등 ! 대단히 상당히 멋져요!"
                      : "한 번 더 도전해보세요!"}
                  </div>
                </>
              )}
            </div>
          </div>
          {status !== "not_tried" && (
            <div className="flex justify-center items-center">
              <img
                src={holdImageUrl}
                alt="mission-image"
                className="w-[180px] h-[180px] object-cover"
              />
            </div>
          )}
          {status !== "not_tried" && (
            <div className="flex flex-col gap-1 border-t border-neutral-300 pt-3">
              <div className="flex justify-between items-center">
                <span className="t-p-16-m text-neutral-500">SECTOR</span>
                <span className="t-p-16-m text-neutral-500">{sectorName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="t-p-16-m text-neutral-500">SCORE</span>
                <span className="t-p-16-m text-neutral-500">
                  {status === "success" ? `+${score || 30}` : "+0"}
                </span>
              </div>
            </div>
          )}
          {status === "not_tried" && (
            <div className="flex justify-end">
              {isLocked && (
                <Button asChild>
                  <Link
                    to="/mission/$missionId"
                    params={{ missionId }}
                    disabled={
                      !missionId || (isLocked && status === "not_tried")
                    }
                  >
                    <LockIcon variant="white" />
                  </Link>
                </Button>
              )}
              {onStart && <Button onClick={onStart}>도전</Button>}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
