import { useNavigate } from "@tanstack/react-router";
import CloseIcon from "@/components/icons/CloseIcon";

export default function MissionDetailHeader({
  type = "close",
}: {
  type?: "close" | "mypage";
}) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-end px-4 py-3">
      <button
        type="button"
        onClick={() => {
          if (type === "close") {
            navigate({ to: "/mission" });
          }
          if (type === "mypage") {
            navigate({ to: "/mypage" });
          }
        }}
        className="p-2"
      >
        {type === "close" && (
          <CloseIcon variant="white" width={24} height={24} />
        )}
        {type === "mypage" && (
          <div className="w-[42px] h-[42px] bg-neutral-100 rounded-full" />
        )}
      </button>
    </header>
  );
}
