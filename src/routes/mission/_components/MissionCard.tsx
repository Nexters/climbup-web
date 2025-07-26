import MissionCaptureDialogWithButton from "./MissionCaptureDialogWithButton";

interface MissionCardProps {
  sectorName: string;
  difficulty: string;
  viewMode?: "card" | "list";
}

export default function MissionCard({
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
        <MissionCaptureDialogWithButton sectorName={sectorName} />
      </div>
    </div>
  );
}
