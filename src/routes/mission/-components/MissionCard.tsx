import { Link } from "@tanstack/react-router";

interface MissionCardProps {
  missionId: string;
  sectorName: string;
  difficulty: string;
  viewMode?: "card" | "list";
}

export default function MissionCard({
  missionId,
  sectorName,
  difficulty,
  viewMode = "card",
}: MissionCardProps) {
  return (
    <div
      className={`rounded-lg bg-white p-4 shadow-sm ${viewMode === "card" ? "flex-[0_0_90%]" : "flex-auto"} min-w-0`}
    >
      <div className="flex flex-col gap-3">
        <span className="text-sm text-gray-500">
          Success | Failed | Not Tried
        </span>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">{sectorName}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">난이도:</span>
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: `var(--${difficulty}-9)` }}
            />
          </div>
        </div>
        <Link
          to="/mission/$missionId"
          params={{ missionId }}
          className="w-full py-2 px-4 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-center block"
        >
          도전하기
        </Link>
      </div>
    </div>
  );
}
