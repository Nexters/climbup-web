import { useNavigate } from "@tanstack/react-router";
import CloseIcon from "@/components/icons/CloseIcon";
import MissionMyProfile from "../../-components/MissionMyProfile";

export default function MissionDetailHeader({
  type = "close",
}: {
  type?: "close" | "mypage";
}) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-end p-2">
      <button
        type="button"
        onClick={() => {
          if (type === "close") {
            navigate({ to: "/mission" });
          }
          if (type === "mypage") {
            navigate({ to: "/my" });
          }
        }}
      >
        {type === "close" && (
          <div className="p-2">
            <CloseIcon variant="white" width={24} height={24} />
          </div>
        )}
        {type === "mypage" && <MissionMyProfile />}
      </button>
    </header>
  );
}
