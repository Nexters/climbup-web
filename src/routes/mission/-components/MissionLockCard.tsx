export default function MissionLockCard() {
  return (
    <div className="card-container">
      <div className="relative w-full h-full overflow-hidden rounded-[32px]">
        <img
          src="/mission-start-mock.png"
          alt="클라이밍 이미지"
          className="absolute inset-0 scale-105 w-full h-full object-cover blur-sm rounded-[32px]"
        />
        <div className="h-full flex flex-col items-center justify-center gap-2 relative z-1">
          <img src="/mission-lock.png" alt="자물쇠 이미지" className="w-16" />
          <p className="text-center t-p-14-sb text-neutral-100 [text-shadow:_0_4px_8px_rgba(0,0,0,0.5)]">
            재생 버튼을 눌러
            <br />
            오늘의 추천 루트를 확인해보세요
          </p>
        </div>
      </div>
    </div>
  );
}
