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
    <>
      <MissionDetailHeader type="mypage" />

      <div className="flex-1 flex flex-col items-center">
        <div className="w-full flex flex-col items-center gap-1 mb-6 px-4">
          <h1 className="t-p-22-sb text-neutral-100 leading-[1.4] tracking-[-0.024em] text-center">
            영상 확인 후 결과를 알려주세요
          </h1>
          <p className="t-p-14-m text-[#D2D6DB] leading-[1.4] tracking-[-0.022em] text-center">
            실패 영상은 최대 1개까지만 저장돼요.
          </p>
        </div>

        <div className="max-w-[80vw] aspect-[3/4] bg-neutral-800 border-8 border-neutral-100 rounded-[40px] overflow-hidden">
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

      <div className="flex justify-center gap-2 pb-6">
        <Button onClick={onFailed}>실패</Button>
        <Button onClick={onRetry}>재촬영</Button>
        <Button onClick={onSuccess}>성공</Button>
      </div>
    </>
  );
}
