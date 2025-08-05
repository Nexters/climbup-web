import NumberFlow from "@number-flow/react";
import { createFileRoute } from "@tanstack/react-router";
import assetCharacterIcon from "@/assets/images/ic_character.png";
import assetFailIcon from "@/assets/images/ic_failure.png";
import assetScoreIcon from "@/assets/images/ic_score.png";
import assetSuccessIcon from "@/assets/images/ic_success.png";
import { LevelProgress } from "@/components/level-progress/LevelProgress";
import { Timer } from "@/components/timer/Timer";

export const Route = createFileRoute("/mission-result/")({
  component: () => <RouteComponent />,
});

function RouteComponent() {
  return (
    <div className="h-dvh px-4">
      <div className="flex flex-col justify-between items-center">
        <p className="t-p-14-m">25.07.20 (수)</p>
        <p className="t-p-16-m pt-1">더 클라임 강남점</p>
        <Timer seconds={0} className="pt-2" />
      </div>
      <div className="flex items-center w-full rounded-[24px] bg-neutral-100 px-4 py-6 gap-4 mt-6">
        <div className="flex flex-col flex-1 items-center justify-center">
          <img
            src={assetScoreIcon}
            alt="점수"
            className="object-cover w-12 h-12"
          />
          <NumberFlow
            prefix="+"
            value={500}
            className="t-p-22-sb text-neutral-800"
          />
          <p className="t-p-14-m pt-1 text-neutral-500">점수</p>
        </div>
        <div className="flex flex-col flex-1 items-center justify-center">
          <img
            src={assetSuccessIcon}
            alt="성공 횟수"
            className="object-cover w-12 h-12"
          />
          <NumberFlow value={22} className="t-p-22-sb text-neutral-800" />
          <p className="t-p-14-m pt-1 text-neutral-500">성공</p>
        </div>
        <div className="flex flex-col flex-1 items-center justify-center">
          <img
            src={assetFailIcon}
            alt="실패 횟수"
            className="object-cover w-12 h-12"
          />
          <NumberFlow value={11} className="t-p-22-sb text-neutral-800" />
          <p className="t-p-14-m pt-1 text-neutral-500">실패</p>
        </div>
      </div>
      <div className="flex items-center w-full rounded-[24px] bg-neutral-100 px-4 py-6 gap-4 mt-6">
        <img
          src={assetCharacterIcon}
          alt="레벨"
          className="w-[60px] h-[60px] object-cover"
        />
        <div className="flex flex-col flex-1">
          {/* TODO: UI 수정 */}
          <p className="t-p-12-m text-neutral-800 pb-2">
            LV.4까지 남은 점수 250점 !
          </p>
          <LevelProgress
            level={1}
            currentExp={100}
            levelExp={1000}
            progressWrapperClassName="w-full"
          />
        </div>
      </div>
    </div>
  );
}
