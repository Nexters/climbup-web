import Button from "@/components/Button";
import MissionDetailHeader from "./MissionDetailHeader";

interface MissionNotTriedReviewingProps {
  videoUrl: string;
  onSuccess: () => void;
  onFailed: () => void;
  onRetry: () => void;
}

export default function MissionNotTriedReviewing({
  videoUrl,
  onSuccess,
  onFailed,
  onRetry,
}: MissionNotTriedReviewingProps) {
  return (
    <div className="flex-1 flex flex-col">
      <MissionDetailHeader type="mypage" />

      <div className="flex-1 flex flex-col items-center pt-[14vh]">
        <div className="w-full flex flex-col items-center gap-4 mb-6 px-4">
          <h1 className="t-p-22-sb text-neutral-100 leading-[1.4] tracking-[-0.024em] text-center">
            영상 확인 후 결과를 알려주세요
          </h1>
          <p className="t-p-14-m text-[#D2D6DB] leading-[1.4] tracking-[-0.022em] text-center">
            실패 영상은 최대 1개까지만 저장돼요.
          </p>
        </div>

        <div className="w-[85vw] aspect-video bg-neutral-800 border-8 border-neutral-100 rounded-2xl overflow-hidden">
          <video
            src={videoUrl}
            className="w-full h-full object-contain"
            controls
            playsInline
          >
            <track kind="captions" />
          </video>
        </div>
      </div>

      <div className="flex justify-center gap-2 px-[30px] pb-6">
        <Button onClick={onFailed}>실패</Button>
        <Button onClick={onRetry}>재촬영</Button>
        <Button onClick={onSuccess}>성공</Button>
      </div>
    </div>
  );
}
