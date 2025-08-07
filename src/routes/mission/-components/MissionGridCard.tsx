import { Link } from "@tanstack/react-router";
import Button from "@/components/Button";
import { cn } from "@/utils/cn";
import LockIcon from "../../../components/icons/LockIcon";

interface MissionGridCardProps {
  missionId?: string;
  sectorName: string;
  difficulty: string;
  status?: "success" | "failed" | "not_tried";
  isLocked?: boolean;
  imageUrl?: string;
  onStart?: () => void;
}

export default function MissionGridCard({
  missionId,
  sectorName,
  difficulty,
  status = "not_tried",
  isLocked = false,
  imageUrl,
  onStart,
}: MissionGridCardProps) {
  return (
    <Link
      to="/mission/$missionId"
      params={{ missionId }}
      disabled={!missionId || isLocked}
      className="w-full aspect-[3/4] rounded-[40px] overflow-hidden border-8 border-neutral-100"
    >
      <div className="relative h-full p-5">
        {status === "not_tried" && imageUrl && (
          <img
            src={imageUrl}
            alt="mission-image"
            className={cn(
              "absolute inset-0 w-full h-full object-cover z-[-1]",
              isLocked && "blur-sm"
            )}
          />
        )}
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-2">
            <div className="h-[18px] flex items-center">
              <span className="px-3 py-1 bg-neutral-300 rounded-3xl t-p-10-sb text-neutral-600">
                {sectorName}
              </span>
            </div>
            <div className="t-m-56-b text-neutral-100">{difficulty}</div>
            <div className="t-p-14-m text-neutral-100">
              이 루트 궁금하지 않으신가요?
            </div>
          </div>
          <div className="flex justify-end">
            {isLocked && (
              <Button asChild>
                <Link to="/mission/$missionId" params={{ missionId }}>
                  <LockIcon variant="white" />
                </Link>
              </Button>
            )}
            {onStart && <Button onClick={onStart}>도전</Button>}
          </div>
        </div>
      </div>
    </Link>
  );
}
