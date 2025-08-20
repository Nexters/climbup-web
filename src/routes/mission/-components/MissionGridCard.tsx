import { Link } from "@tanstack/react-router";
import Button from "@/components/Button";
import { Tag } from "@/components/tag/Tag";
import { cn } from "@/utils/cn";
import { convertPascalCase } from "@/utils/convert";
import { getDiffFromNow } from "@/utils/date";
import FrownIcon from "../../../components/icons/FrownIcon";
import ThumbsUpIcon from "../../../components/icons/ThumbsUpIcon";

interface MissionGridCardProps {
  missionId?: string;
  sectorName: string;
  difficulty: string;
  status?: "success" | "failed" | "not_tried";
  imageUrl?: string;
  onStart?: () => void;
  score?: number;
  completedAt?: string;
  removedAt?: string;
  holdImageUrl?: string;
  type: "main" | "detail" | "recommendation";
  isSelected?: boolean;
}

export default function MissionGridCard({
  missionId,
  sectorName,
  difficulty,
  status = "not_tried",
  imageUrl,
  onStart,
  score,
  completedAt,
  removedAt,
  holdImageUrl,
  type = "main",
  isSelected = true,
}: MissionGridCardProps) {
  return (
    <Link
      to={`/mission/${missionId}/${status === "not_tried" ? "" : status}`}
      disabled={!missionId}
      className={cn("card-container", {
        "scale-100 opacity-100": isSelected,
        "scale-90 opacity-50": !isSelected,
      })}
    >
      <div
        className={cn(
          "relative h-full p-5 rounded-[32px]",
          status === "not_tried"
            ? ""
            : "bg-neutral-100 border-[1px] border-neutral-300"
        )}
      >
        {status === "not_tried" && imageUrl && (
          <>
            <img
              src={imageUrl}
              alt="mission-image"
              className="absolute inset-0 w-full h-full object-cover opacity-50 rounded-[32px]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#313131] to-[#00000000] opacity-60 rounded-[32px]" />
          </>
        )}
        <div className="flex flex-col justify-between h-full relative z-10">
          {(type === "main" || type === "recommendation") && (
            <div className="flex flex-col gap-1 xs:gap-2">
              <div className="flex items-center justify-between gap-1">
                {type === "main" && (
                  <div className="flex items-center gap-1">
                    {status === "not_tried" && (
                      <Tag variant="NEUTRAL">
                        <img
                          src="/score-star.png"
                          alt="score-star"
                          className="w-2.5 h-2.5 mr-1"
                        />
                        +{score}
                      </Tag>
                    )}
                    <Tag
                      variant={
                        status === "success"
                          ? "BLUE"
                          : status === "failed"
                            ? "RED"
                            : "NEUTRAL"
                      }
                    >
                      {status === "success" && "성공"}
                      {status === "failed" && "실패"}
                      {status === "not_tried" && `SEC ${sectorName}`}
                    </Tag>
                    {status === "failed" && removedAt && (
                      <Tag variant="RED">D-{getDiffFromNow(removedAt)}</Tag>
                    )}
                  </div>
                )}
                {type === "recommendation" && <Tag variant="GREEN">추천</Tag>}
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
                className={cn("t-m-48-b xs:t-m-56-b", {
                  "text-neutral-100": status === "not_tried",
                  "text-neutral-900": status !== "not_tried",
                })}
              >
                {convertPascalCase(difficulty)}
              </div>
              {type === "main" && (
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
              )}
              {status !== "not_tried" && (
                <div className="flex justify-center items-center max-h-[180px] max-w-[180px] w-full h-full mx-auto p-5">
                  <img
                    src={holdImageUrl}
                    alt="mission-image"
                    className="object-contain w-full h-full"
                    loading="lazy"
                  />
                </div>
              )}
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
          {onStart && (type === "recommendation" || type === "detail") && (
            <div className="flex justify-end gap-2 mt-auto">
              <Button onClick={onStart}>도전</Button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
