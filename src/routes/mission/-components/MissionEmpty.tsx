import Button from "@/components/Button";

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
      <div className="flex flex-col items-center gap-2 mt-[17px]">
        <span className="t-p-18-sb text-neutral-100">
          {STATUS_LABELS[status]} 미션이 없어요
        </span>
        <span className="t-p-14-m text-neutral-300 mb-[24px]">
          {status === "not_tried"
            ? "오늘의 문제를 모두 해결했어요!"
            : "완등하기 좋은 문제를 추천해드릴게요."}
        </span>
      </div>
      <Button variant="white" onClick={onClickRecommend}>
        추천 문제 보기
      </Button>
    </div>
  );
}
