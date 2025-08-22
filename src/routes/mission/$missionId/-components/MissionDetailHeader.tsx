import { useNavigate } from "@tanstack/react-router";
import CloseIcon from "@/components/icons/CloseIcon";

export default function MissionDetailHeader() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-end p-2">
      <button
        type="button"
        onClick={() => {
          navigate({ to: "/mission" });
        }}
      >
        <div className="p-2">
          <CloseIcon variant="white" width={24} height={24} />
        </div>
      </button>
    </header>
  );
}
