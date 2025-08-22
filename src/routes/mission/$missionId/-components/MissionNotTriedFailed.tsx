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
  return (
    <>
      <MissionDetailHeader />

      <div className="flex-1 flex flex-col items-center">
        <div className="w-full flex flex-col items-center gap-4 mb-6 px-4">
          <h1 className="t-p-22-sb text-neutral-100 leading-[1.4] tracking-[-0.024em] text-center">
            성공 영상을 보며 루트를 떠올려보세요
          </h1>
          <p className="t-p-14-m text-[#D2D6DB] leading-[1.4] tracking-[-0.022em] text-center">
            준비되셨다면 다시 올라가볼 차례예요.
          </p>
        </div>

        <div className="card-container">
          <video
            src={videoUrl}
            className="w-full h-full aspect-[3/4] object-cover rounded-[32px] overflow-hidden"
            playsInline
            muted
            loop
            controls
            autoPlay
          />
        </div>
      </div>

      <div className="flex justify-center gap-2 px-[30px] pb-6">
        <Button variant="white" onClick={onRetry}>
          다시 도전
        </Button>
      </div>
    </>
  );
}
