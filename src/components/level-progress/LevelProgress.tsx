import { motion } from "motion/react";
import { Progress as ProgressPrimitive } from "radix-ui";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/utils/cn";

interface LevelProgressProps {
  currentExp: number;
  levelExp: number;
  level: number;
  progress?: number;
  onLevelUp?: () => void;
  onProgressChange?: (progress: number) => void;
}

export const LevelProgress = ({
  currentExp,
  levelExp,
  level,
  progress: controlledProgress,
  onLevelUp,
  onProgressChange,
}: LevelProgressProps) => {
  const [internalProgress, setInternalProgress] = useState(0);
  const [, setShowLevelUp] = useState(false);
  const [prevLevel, setPrevLevel] = useState(level);
  const [isLevelingUp, setIsLevelingUp] = useState(false);

  const progressPercentage = Math.min((currentExp / levelExp) * 100, 100);

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

  useEffect(() => {
    // 레벨업 체크
    if (level > prevLevel) {
      setIsLevelingUp(true);
      setShowLevelUp(true);
      onLevelUp?.();
      // 축하 애니메이션 후 초기화
      setTimeout(() => {
        setShowLevelUp(false);
        setIsLevelingUp(false);
      }, 1500);
      setProgress(0);
    } else {
      // 일반 진행률 애니메이션
      if (!isLevelingUp) {
        setProgress(progressPercentage);
      }
    }
    setPrevLevel(level);
  }, [
    level,
    progressPercentage,
    prevLevel,
    onLevelUp,
    isLevelingUp,
    setProgress,
  ]);

  return (
    <div className="flex items-center gap-1 w-full">
      {/* 진행률 바 영역 */}
      <div className="relative w-[211px] h-[20px]">
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

      {/* 레벨 표시 원형 컴포넌트 */}
      <div className="relative w-8 h-8">
        {/* 원형 배경 */}
        <div className="w-full h-full bg-neutral-100 border-2 border-neutral-300 rounded-full" />

        {/* 다이아몬드 아이콘 
        TODO: 추후 변경 필요 */}
        <i className="absolute top-[8.47px] left-[5.65px] w-[14.12px] h-[11.29px]">
          <svg
            width="14"
            height="12"
            viewBox="0 0 14 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Diamond Icon</title>
            <path d="M7 0L13.0622 6L7 12L0.937822 6L7 0Z" fill="#D2D6DB" />
          </svg>
        </i>
        {/* 레벨 숫자 */}
        <div className="absolute bottom-[8.47px] right-[6.59px] w-[8.47px] h-[8.47px] flex items-center justify-center">
          <span className="text-[8px] font-semibold text-neutral-700 leading-none">
            {level}
          </span>
        </div>
      </div>
    </div>
  );
};
