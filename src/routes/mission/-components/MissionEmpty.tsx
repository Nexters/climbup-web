const STATUS_LABELS = {
  all: "더 이상 해결할",
  success: "성공한",
  failed: "실패한",
  not_tried: "미도전",
};

export default function MissionEmpty({
  status,
  onClickRecommend,
}: {
  status: "success" | "failed" | "not_tried";
  onClickRecommend: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col mt-[76px] h-full items-center justify-center">
      <img
        src="/empty-character.png"
        alt="Mission Empty"
        className="w-[120px] h-[128px]"
      />
      <div className="w-[100px] h-[20px] rounded-[50%] bg-neutral-400 mt-[-10px] z-[-1]" />
      <div className="flex flex-col items-center gap-2 mt-[17px]">
        <span className="t-p-18-sb text-neutral-100">
          {STATUS_LABELS[status]} 미션이 없어요
        </span>
        <span className="t-p-14-m text-neutral-300">
          {status === "not_tried"
            ? "오늘의 문제를 모두 해결했어요!"
            : "완등하기 좋은 문제를 추천해드릴게요."}
        </span>
      </div>
      <button
        type="button"
        className="t-p-14-sb bg-neutral-100 rounded-[32px] px-9 py-4 shadow-[2px_2px_16px_0_rgba(0,0,0,0.4)] mt-[24px]"
        onClick={onClickRecommend}
      >
        추천 문제 보기
      </button>
    </div>
  );
}
