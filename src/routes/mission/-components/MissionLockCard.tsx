import assetMissionIcon from "@/assets/images/ic_lock.png";
import assetMissionLock from "@/assets/images/ic_lock_image.png";
import { cn } from "@/utils/cn";

export default function MissionLockCard() {
  return (
    <div className={cn("card-container", "max-w-[380px]")}>
      <div className="relative w-full h-full rounded-[32px]">
        <div className="h-full flex flex-col items-center justify-center gap-2 relative z-1 bg-neutral-400 rounded-[32px]">
          <img
            src={assetMissionIcon}
            alt="자물쇠 이미지"
            className="absolute w-[35px] h-[43px] left-[24px] top-[24px] object-cover"
          />
          <div className="max-w-[200px] max-h-[200px] w-full h-full aspect-square">
            <img
              src={assetMissionLock}
              alt="미션 아이콘"
              className="size-full object-cover"
            />
          </div>
          <p className="text-center t-p-16-m text-neutral-800">
            아래 재생 버튼을 눌러
            <br />
            루트 미션을 확인해보세요
          </p>
        </div>
      </div>
    </div>
  );
}
