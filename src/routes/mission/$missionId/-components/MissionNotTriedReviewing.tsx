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
        <div className="w-full flex flex-col items-center gap-1 mb-4 px-4">
          <h1 className="t-p-22-sb text-neutral-100 leading-[1.4] tracking-[-0.024em] text-center">
            영상 확인 후 결과를 알려주세요
          </h1>
          <p className="t-p-14-m text-[#D2D6DB] leading-[1.4] tracking-[-0.022em] text-center">
            실패 영상은 최대 1개까지만 저장돼요.
          </p>
        </div>

        <div className="flex items-center justify-center">
          <div className="card-container">
            <video
              className="w-full h-full aspect-[3/4] object-cover rounded-[32px] overflow-hidden"
              playsInline
              muted
              loop
              controls
              autoPlay
              src={videoUrl}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 pt-4 pb-6">
        <Button onClick={onFailed}>실패</Button>
        <Button onClick={onRetry}>재촬영</Button>
        <Button onClick={onSuccess}>성공</Button>
      </div>
    </>
  );
}
