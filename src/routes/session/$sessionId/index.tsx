import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Dialog } from "radix-ui";
import { useEffect, useState } from "react";

import assetFailIcon from "@/assets/images/ic_failure.png";
import assetScoreIcon from "@/assets/images/ic_score.png";
import assetSuccessIcon from "@/assets/images/ic_success.png";
import Button from "@/components/Button";
import { DialogLevelDescriptionContent } from "@/components/dialog-level-description-content/DialogLevelDescriptionContent";
import { MotionNumberFlow } from "@/components/motion-number-flow/MotionNumberFlow";
import { Timer } from "@/components/timer/Timer";
import { getUserSession } from "@/generated/user-session/user-session";
import { getHeaderToken } from "@/utils/cookie";
import { getLevelInfo } from "@/utils/level";
import { LevelUpPopup } from "../-components/level-up-popup";
import { SessionLevelProgress } from "../-components/session-level-progress";

function formatDateToKorean(dateString?: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[date.getDay()];

  return `${year}.${month}.${day} (${weekday})`;
}

export const Route = createFileRoute("/session/$sessionId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { sessionId } = Route.useParams();

  const {
    data: sessionInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-session", sessionId],
    queryFn: () => getUserSession(sessionId, { headers: getHeaderToken() }),
    select: (data) => data.data,
  });

  // 서버 데이터를 사용하여 값 계산
  const scoreValue = sessionInfo?.srGained ?? 0;
  const successValue = sessionInfo?.completedCount ?? 0;
  const failureValue =
    (sessionInfo?.attemptedCount ?? 0) - (sessionInfo?.completedCount ?? 0);

  // 이전/현재 점수 기반 레벨 정보 계산
  const previousSr = sessionInfo?.previousSr ?? 0;
  const currentSr = sessionInfo?.currentSr ?? previousSr;
  const prevLevelInfo = getLevelInfo(previousSr);
  const nextLevelInfo = getLevelInfo(currentSr);

  // Progress 표시용 상태: 이전 점수 상태로 시작 → 점수 애니메이션 완료 후 현재 점수 상태로 전환
  const [displayLevel, setDisplayLevel] = useState(prevLevelInfo.displayLevel);
  const [displayCurrentExp, setDisplayCurrentExp] = useState(
    prevLevelInfo.currentExp
  );
  const [displayLevelExp, setDisplayLevelExp] = useState(
    prevLevelInfo.levelExp
  );

  // 레벨업 팝업 상태 관리
  const [isLevelUpPopupOpen, setIsLevelUpPopupOpen] = useState(false);
  const [newLevelForPopup, setNewLevelForPopup] = useState(1);

  // 세션 정보가 바뀌면 초기 표시 상태를 이전 점수 기준으로 재설정
  useEffect(() => {
    setDisplayLevel(prevLevelInfo.displayLevel);
    setDisplayCurrentExp(prevLevelInfo.currentExp);
    setDisplayLevelExp(prevLevelInfo.levelExp);
  }, [
    prevLevelInfo.displayLevel,
    prevLevelInfo.currentExp,
    prevLevelInfo.levelExp,
  ]);

  // 점수 애니메이션 완료 후 0.5초 지연 뒤 현재 점수 기준으로 Progress 갱신
  const handleScoreAnimationComplete = () => {
    setTimeout(() => {
      setDisplayLevel(nextLevelInfo.displayLevel);
      setDisplayCurrentExp(nextLevelInfo.currentExp);
      setDisplayLevelExp(nextLevelInfo.levelExp);
    }, 500);
  };

  // 레벨업 발생 시 팝업 표시
  const handleLevelUp = () => {
    setNewLevelForPopup(nextLevelInfo.displayLevel);
    setIsLevelUpPopupOpen(true);
  };

  // 레벨업 팝업 닫기
  const handleCloseLevelUpPopup = () => {
    setIsLevelUpPopupOpen(false);
  };

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <p className="t-p-16-m text-neutral-500">데이터를 불러오는 중...</p>
      </div>
    );
  }

  // 에러 상태 처리
  if (isError) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <p className="t-p-16-m text-red-500">
          데이터를 불러오는데 실패했습니다.
        </p>
      </div>
    );
  }

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
        <p className="t-p-14-m">
          {formatDateToKorean(sessionInfo?.sessionDate)}
        </p>
        <p className="t-p-16-m pt-1">더 클라임 강남점</p>
        <Timer
          seconds={sessionInfo?.totalDuration ?? 0}
          className="pt-2 t-m-48-b"
        />
      </div>
      <div className="flex items-center w-full rounded-[24px] bg-neutral-100 px-4 py-6 gap-4 mt-6 relative">
        <div className="flex flex-col flex-1 items-center justify-center relative">
          <img
            src={assetSuccessIcon}
            alt="성공 횟수"
            className="object-cover w-[56px] h-[56px]"
          />
          <MotionNumberFlow
            value={successValue}
            className="t-m-24-b text-neutral-800"
          />
          <p className="t-p-14-m pt-1 text-neutral-500">성공</p>
        </div>
        <div className="flex flex-col flex-1 items-center justify-center">
          <img
            src={assetFailIcon}
            alt="실패 횟수"
            className="object-cover w-[56px] h-[56px]"
          />
          <MotionNumberFlow
            value={failureValue}
            className="t-m-24-b text-neutral-800"
          />
          <p className="t-p-14-m pt-1 text-neutral-500">실패</p>
        </div>
        <div className="flex flex-col flex-1 items-center justify-center relative">
          <img
            src={assetScoreIcon}
            alt="점수"
            className="object-cover w-[56px] h-[56px]"
          />
          <MotionNumberFlow
            prefix="+"
            value={scoreValue}
            className="t-m-24-b text-neutral-800"
            onAnimationComplete={handleScoreAnimationComplete}
          />
          <p className="t-p-14-m pt-1 text-neutral-500">점수</p>
        </div>
      </div>
      <div className="flex items-center w-full rounded-[24px] bg-neutral-100 px-4 py-6 gap-4 mt-6">
        <div className="flex flex-col flex-1">
          <SessionLevelProgress
            level={displayLevel}
            currentExp={displayCurrentExp}
            levelExp={displayLevelExp}
            progressWrapperClassName="w-full"
            onLevelUp={handleLevelUp}
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

      {/* 레벨업 팝업 */}
      <LevelUpPopup
        isOpen={isLevelUpPopupOpen}
        onClose={handleCloseLevelUpPopup}
        newLevel={newLevelForPopup}
      />
    </div>
  );
}
