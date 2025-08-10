import { useNavigate } from "@tanstack/react-router";
import Button from "@/components/Button";
import MissionDetailHeader from "./MissionDetailHeader";

interface MissionNotTriedFailedProps {
  videoUrl: string;
  onRetry: () => void;
}

export default function MissionNotTriedFailed({
  videoUrl,
  onRetry,
}: MissionNotTriedFailedProps) {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-neutral-500">
      <MissionDetailHeader type="mypage" />

      <div className="flex-1 flex flex-col items-center pt-[14vh]">
        <div className="w-full flex flex-col items-center gap-4 mb-6 px-4">
          <h1 className="t-p-22-sb text-neutral-100 leading-[1.4] tracking-[-0.024em] text-center">
            성공 영상을 보며 루트를 떠올려보세요
          </h1>
          <p className="t-p-14-m text-[#D2D6DB] leading-[1.4] tracking-[-0.022em] text-center">
            준비되셨다면 다시 올라가볼 차례예요.
          </p>
        </div>

        <div className="max-w-[80vw] h-[60vh] aspect-[3/4] bg-neutral-800 border-8 border-neutral-100 rounded-3xl overflow-hidden">
          <video
            src={videoUrl}
            className="w-full h-full object-cover"
            controls
            playsInline
          >
            <track kind="captions" />
          </video>
        </div>
      </div>

      <div className="flex justify-center gap-2 px-[30px] pb-6">
        <Button onClick={() => navigate({ to: "/mission" })}>홈</Button>
        <Button onClick={onRetry}>재도전</Button>
      </div>
    </div>
  );
}
