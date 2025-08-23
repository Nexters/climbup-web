import assetMissionIcon from "@/assets/images/ic_lock.png";
import assetMissionLock from "@/assets/images/ic_lock_image.png";

export default function MissionLockCard() {
  return (
    <div className="card-container">
      <div className="relative aspect-[3/4] w-full h-full rounded-[32px]">
        <div className="h-full flex flex-col items-center justify-center gap-5 relative z-1 bg-neutral-300 rounded-[32px]">
          <img
            src={assetMissionIcon}
            alt="자물쇠 이미지"
            className="absolute w-[35px] h-[43px] left-[20px] top-[20px] object-cover"
          />
          <div className="max-w-[140px] max-h-[140px] w-full h-full aspect-square">
            <img
              src={assetMissionLock}
              alt="미션 아이콘"
              className="size-full object-cover"
            />
          </div>
          <p className="text-center t-p-16-m text-neutral-800">
            아래 시작 버튼을 눌러
            <br />
            루트 미션을 확인해보세요
          </p>
        </div>
      </div>
    </div>
  );
}
