import { motion } from "motion/react";
import { Progress as ProgressPrimitive } from "radix-ui";
import { useCallback, useEffect, useRef, useState } from "react";
import { match } from "ts-pattern";
import assetLevel1 from "@/assets/images/ic_lv1.png";
import assetLevel2 from "@/assets/images/ic_lv2.png";
import assetLevel3 from "@/assets/images/ic_lv3.png";
import assetLevel4 from "@/assets/images/ic_lv4.png";
import assetLevel5 from "@/assets/images/ic_lv5.png";
import { LEVEL_SCORE_STANDARD } from "@/constants/level";
import { cn } from "@/utils/cn";
import { getLevelInfo } from "@/utils/level";

interface LevelProgressProps {
  currentExp: number;
  levelExp: number;
  level: number;
  progress?: number;
  currentSr: number;
  previousSr: number;
  onLevelUp?: () => void;
  onProgressChange?: (progress: number) => void;
  progressWrapperClassName?: string;
  levelUpCount?: number;
}

export const SessionLevelProgress = ({
  currentExp,
  levelExp,
  level,
  progress: controlledProgress,
  onLevelUp,
  onProgressChange,
  progressWrapperClassName,
  levelUpCount = 0,
  currentSr,
  previousSr,
}: LevelProgressProps) => {
  const [internalProgress, setInternalProgress] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [displayedLevel, setDisplayedLevel] = useState(level);
  const [isLevelingUp, setIsLevelingUp] = useState(false);

  const progressPercentage = Math.min((currentExp / levelExp) * 100, 100);

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // previousSr을 기반으로 초기 상태 설정
  useEffect(() => {
    if (previousSr !== undefined) {
      const prevLevelInfo = getLevelInfo(previousSr);
      setDisplayedLevel(prevLevelInfo.displayLevel);
    }
  }, [previousSr]);

  const getLevelExpByDisplayLevel = useCallback(
    (displayLevel: number) => {
      for (const [, config] of Object.entries(LEVEL_SCORE_STANDARD)) {
        if (config.displayLevel === displayLevel) {
          if (config.max === null) {
            return 1000;
          }
          return config.max - config.min + 1;
        }
      }
      return levelExp;
    },
    [levelExp]
  );

  // controlled 또는 uncontrolled 결정
  const progress =
    controlledProgress !== undefined ? controlledProgress : internalProgress;
  const setProgress = useCallback(
    (value: number) => {
      if (controlledProgress !== undefined) {
        onProgressChange?.(value);
      } else {
        setInternalProgress(value);
      }
    },
    [controlledProgress, onProgressChange]
  );

  // 레벨 업 애니메이션 시퀀스 실행
  useEffect(() => {
    if (!currentSr || !previousSr) {
      return;
    }

    // 초기/일반 진행률 갱신 (레벨 변동 없음, 또는 애니메이션 중 아님)
    if (!isLevelingUp && level === displayedLevel) {
      setProgress(progressPercentage);
      return;
    }

    // 레벨 업 발생: displayedLevel < level 인 경우 시퀀스 실행
    if (!isLevelingUp && displayedLevel < level) {
      setIsLevelingUp(true);

      const runSequence = (fromLevel: number) => {
        // 1) 현재 레벨에서 progress를 100%까지 채우기
        setProgress(100);

        // 채움 애니메이션(transition 300ms) 완료 후 아이콘 변경 및 흔들기
        const afterFill = window.setTimeout(() => {
          // 2) 레벨 아이콘 교체 + 좌우 로테이트 애니메이션
          setDisplayedLevel(fromLevel + 1);
          setShowLevelUp(true);

          // levelUpCount가 0 이상일 때만 onLevelUp 콜백 호출
          if (levelUpCount > 0) {
            onLevelUp?.();
          }

          // 3) 1초 후 progress 0으로 초기화 후 남은 경험치 반영 또는 다음 레벨업 반복
          const afterWiggle = window.setTimeout(() => {
            setShowLevelUp(false);
            setProgress(0);

            const nextLevel = fromLevel + 1;
            const isLastLevel = nextLevel >= level;

            // 텍스트 표시에 사용할 목표 레벨 경험치 계산 (실제 바 너비는 progress로 제어)
            const nextLevelExp = getLevelExpByDisplayLevel(nextLevel);
            // 마지막 레벨이면 남은 경험치 반영, 아니면 바로 다음 사이클로 진행
            timeoutsRef.current.push(
              window.setTimeout(() => {
                if (!mountedRef.current) return;
                if (isLastLevel) {
                  // 마지막 레벨: 남은 경험치 비율로 진행률 설정
                  setProgress(progressPercentage);
                  setIsLevelingUp(false);
                  // displayedLevel은 이미 nextLevel로 맞춰져 있음
                } else {
                  // 중간 레벨: 0에서 다시 꽉 채우는 사이클 반복
                  runSequence(nextLevel);
                }
              }, 50)
            );

            // nextLevelExp는 현재 표시 텍스트용으로만 활용 가능하지만,
            // 텍스트는 상위에서 전달되는 props를 사용하므로 추가 상태 변경은 생략
            void nextLevelExp;
          }, 300);

          // 정리: 위 타이머를 클린업에서 취소
          timeoutsRef.current.push(afterWiggle);
        }, 200);

        timeoutsRef.current.push(afterFill);
      };

      runSequence(displayedLevel);
    }
  }, [
    level,
    displayedLevel,
    isLevelingUp,
    progressPercentage,
    onLevelUp,
    setProgress,
    getLevelExpByDisplayLevel,
    levelUpCount,
    currentSr,
    previousSr,
  ]);

  // 타이머 정리용 ref
  const timeoutsRef = useRef<number[]>([]);
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
      timeoutsRef.current = [];
    };
  }, []);

  return (
    <div className={cn("flex gap-1 w-full")}>
      {/* 왼쪽 영역: 말풍선과 진행률바 */}
      <div className="flex flex-col gap-2 flex-1">
        {/* 말풍선 영역 */}
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex justify-start"
        >
          <div className="relative">
            {/* 말풍선 배경 */}
            <div className="bg-neutral-100 px-2 py-1 rounded-lg shadow-md">
              <span className="text-xs font-medium text-neutral-800">
                {level >= 5
                  ? "최고 레벨 달성!"
                  : `LV.${level + 1}까지 남은 점수 ${levelExp - currentExp}점!`}
              </span>
            </div>
            {/* 말풍선 꼬리 */}
            <div className="absolute -bottom-1 left-[14px] transform -translate-x-[50%] w-2 h-2 bg-neutral-100 rotate-45" />
          </div>
        </motion.div>

        {/* 진행률 바 영역 */}
        <div
          className={cn("relative h-[20px] w-full", progressWrapperClassName)}
        >
          {/* Radix UI Progress */}
          <ProgressPrimitive.Root
            value={progress}
            className="w-full h-full bg-neutral-300 rounded-[32px] relative overflow-hidden"
          >
            <ProgressPrimitive.Indicator
              className={cn(
                "h-full bg-blue-400 rounded-[32px] relative px-2 pt-1 transition-all ease-out duration-300"
              )}
              style={{
                width: `${progress}%`,
              }}
            >
              {/* 내부 하이라이트 바 */}
              <motion.div
                className="bg-blue-300 rounded-[32px] opacity-60 h-1.5"
                transition={{
                  duration: isLevelingUp ? 0.3 : 0.8,
                  ease: "easeOut",
                }}
              />
            </ProgressPrimitive.Indicator>
          </ProgressPrimitive.Root>

          {/* 현재 경험치 텍스트 */}
          <motion.div
            className="absolute left-2 top-0.5 t-p-10-sb text-neutral-100 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              textShadow: "0.5px 0.5px 1px rgba(51, 91, 160, 0.4)",
            }}
          >
            {currentExp}
          </motion.div>

          {/* 목표 경험치 텍스트 */}
          <motion.div
            className="absolute right-2 top-0.5 t-p-10-sb text-neutral-100 text-right pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              textShadow: "0.5px 0.5px 1px rgba(51, 91, 160, 0.4)",
            }}
          >
            {levelExp}
          </motion.div>
        </div>
      </div>

      {/* 오른쪽 영역: 레벨 아이콘 */}
      <div className="flex items-center">
        <motion.div
          className="relative w-16 h-16 shrink-0"
          animate={
            showLevelUp ? { rotate: [0, 20, -20, 10, -10, 0] } : { rotate: 0 }
          }
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {match(displayedLevel)
            .with(1, () => (
              <img src={assetLevel1} className="size-full" alt="레벨 1" />
            ))
            .with(2, () => (
              <img src={assetLevel2} className="size-full" alt="레벨 2" />
            ))
            .with(3, () => (
              <img src={assetLevel3} className="size-full" alt="레벨 3" />
            ))
            .with(4, () => (
              <img src={assetLevel4} className="size-full" alt="레벨 4" />
            ))
            .with(5, () => (
              <img src={assetLevel5} className="size-full" alt="레벨 5" />
            ))
            .otherwise(() => (
              <img src={assetLevel1} className="size-full" alt="레벨 1" />
            ))}
        </motion.div>
      </div>
    </div>
  );
};
