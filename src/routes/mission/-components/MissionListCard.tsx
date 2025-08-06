import { Link } from "@tanstack/react-router";

interface MissionListCardProps {
  missionId: string;
  sectorName: string;
  difficulty: string;
  status?: "success" | "failed" | "not_tried";
  imageUrl?: string;
}

export default function MissionListCard({
  missionId,
  sectorName,
  difficulty,
  status = "not_tried",
  imageUrl,
}: MissionListCardProps) {
  return (
    <Link
      to="/mission/$missionId"
      params={{ missionId }}
      className="flex items-center gap-4 p-4 bg-neutral-100 rounded-[32px]"
    >
      <div className="w-[66px] h-[90px] flex items-center">
        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            className="w-[66px] h-[66px] rounded-full object-cover"
          />
        )}
      </div>
      <div className="w-[1px] h-[114px] -my-4 bg-neutral-300" />
      <div className="flex-1 flex flex-col gap-[6px]">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-neutral-300 rounded-3xl t-p-10-sb text-neutral-600">
            {status === "success" && "성공"}
            {status === "failed" && "실패"}
            {status === "not_tried" && "미도전"}
          </span>
          <span className="t-p-10-sb text-neutral-400">2025.07.21 (월)</span>
        </div>
        <div className="t-m-24-b text-neutral-900">{difficulty}</div>
        <div className="t-p-12-m text-neutral-600">
          이 루트가 궁금하지 않으신가요?
        </div>
        <div className="flex items-center gap-1 t-p-10-sb text-neutral-400">
          <span className="w-1 h-1 rounded-full bg-neutral-400" />
          <span>{sectorName}</span>
        </div>
      </div>
    </Link>
  );
}
