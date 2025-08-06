import { Link } from "@tanstack/react-router";
import Button from "@/components/Button";
import { cn } from "@/utils/cn";
import LockIcon from "../../../components/icons/LockIcon";

interface MissionGridCardProps {
  missionId: string;
  sectorName: string;
  difficulty: string;
  status?: "success" | "failed" | "not_tried";
  isLocked?: boolean;
}

export default function MissionGridCard({
  missionId,
  sectorName,
  difficulty,
  status = "not_tried",
  isLocked = false,
}: MissionGridCardProps) {
  return (
    <Link
      to="/mission/$missionId"
      params={{ missionId }}
      className="flex-[0_0_300px] h-[400px] rounded-[40px] overflow-hidden  border-8 border-neutral-100"
    >
      <div className="relative h-full p-5">
        {status === "not_tried" && (
          <img
            src={`https://placehold.co/400x600/4D5761/FCFCFD.png?text=Mission+${missionId}`}
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
          </div>
        </div>
      </div>
    </Link>
  );
}
