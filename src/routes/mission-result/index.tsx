import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Dialog } from "radix-ui";
import { useState } from "react";
import assetCharacterIcon from "@/assets/images/ic_character.png";
import assetFailIcon from "@/assets/images/ic_failure.png";
import assetScoreIcon from "@/assets/images/ic_score.png";
import assetSuccessIcon from "@/assets/images/ic_success.png";
import Button from "@/components/Button";
import { DialogLevelDescriptionContent } from "@/components/dialog-level-description-content/DialogLevelDescriptionContent";
import { LevelProgress } from "@/components/level-progress/LevelProgress";
import { MotionNumberFlow } from "@/components/motion-number-flow/MotionNumberFlow";
import { Timer } from "@/components/timer/Timer";

export const Route = createFileRoute("/mission-result/")({
  component: () => <RouteComponent />,
});

function RouteComponent() {
  // TODO: 데이터 받아오기
  const [scoreValue] = useState(500);
  const [successValue] = useState(22);
  const [failureValue] = useState(11);

  return (
    <div className=" h-dvh px-4 flex flex-col">
      <header className="flex justify-end items-center h-[52px] w-full">
        <Link to="/mission" className="flex-center size-6" replace>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Close icon"
            role="img"
          >
            <path
              d="M18 6L6 18"
              stroke="#9DA4AE"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="#9DA4AE"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </header>
      <div className="flex flex-col justify-between items-center">
        <p className="t-p-14-m">25.07.20 (수)</p>
        <p className="t-p-16-m pt-1">더 클라임 강남점</p>
        <Timer seconds={2000} className="pt-2 t-m-48-b" />
      </div>
      <div className="flex items-center w-full rounded-[24px] bg-neutral-100 px-4 py-6 gap-4 mt-6">
        <div className="flex flex-col flex-1 items-center justify-center">
          <img
            src={assetScoreIcon}
            alt="점수"
            className="object-cover w-12 h-12"
          />
          <MotionNumberFlow
            prefix="+"
            value={scoreValue}
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
          <MotionNumberFlow
            value={successValue}
            className="t-p-22-sb text-neutral-800"
          />
          <p className="t-p-14-m pt-1 text-neutral-500">성공</p>
        </div>
        <div className="flex flex-col flex-1 items-center justify-center">
          <img
            src={assetFailIcon}
            alt="실패 횟수"
            className="object-cover w-12 h-12"
          />
          <MotionNumberFlow
            value={failureValue}
            className="t-p-22-sb text-neutral-800"
          />
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
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="t-p-12-m text-neutral-800 pb-2"
          >
            LV.4까지 남은 점수 250점 !
          </motion.p>
          <LevelProgress
            level={1}
            currentExp={100}
            levelExp={1000}
            progressWrapperClassName="w-full"
          />
        </div>
      </div>
      <Dialog.Root>
        <Dialog.Trigger
          type="button"
          className="flex justify-end items-center gap-1 mt-3 w-fit ml-auto"
        >
          <p className="t-p-14-m text-neutral-500">레벨 보기</p>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="레벨 보기 바로가기"
            role="img"
          >
            <path
              className="stroke-neutral-500"
              d="M6 11.9961L10 7.99609L6 3.99609"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Dialog.Trigger>
        <DialogLevelDescriptionContent />
      </Dialog.Root>
      <div className="flex items-center justify-center w-full mt-auto px-10 py-4">
        <Button asChild className="w-full">
          <Link to="/my">완등 영상 보기</Link>
        </Button>
      </div>
    </div>
  );
}
