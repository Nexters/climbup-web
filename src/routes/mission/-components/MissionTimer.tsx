import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { differenceInSeconds, isValid, parseISO } from "date-fns";
import { Tooltip } from "radix-ui";
import { useEffect, useRef, useState } from "react";
import { Timer } from "@/components/timer/Timer";
import {
  endUserSession,
  getCurrentUserSession,
  startUserSession,
} from "@/generated/user-session/user-session";
import useToast from "@/hooks/useToast";
import { getHeaderToken } from "@/utils/cookie";
import PlayIcon from "../../../components/icons/PlayIcon";
import StopIcon from "../../../components/icons/StopIcon";

const HOLD_MS = 1000;

export default function MissionTimer({
  showMockStopButton,
  isTooltipOpen,
}: {
  showMockStopButton: boolean;
  isTooltipOpen: boolean;
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [time, setTime] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  const holdTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: sessionData, isError: isSessionError } = useQuery({
    queryKey: ["userSession"],
    queryFn: () => getCurrentUserSession({ headers: getHeaderToken() }),
    select: (data) => data?.data ?? null,
  });

  const isRunning = !!sessionData?.startedAt && !isSessionError;
  const showStopButton = isRunning || showMockStopButton;

  const { mutateAsync: startSession } = useMutation({
    mutationFn: () => startUserSession({ headers: getHeaderToken() }),
  });

  const { mutateAsync: endSession } = useMutation({
    mutationFn: (sessionId: number) =>
      endUserSession(sessionId, { headers: getHeaderToken() }),
  });

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (sessionData?.startedAt && !isSessionError) {
      const startDate = parseISO(sessionData.startedAt);

      // startedAt이 유효한 날짜인지 확인
      if (!isValid(startDate)) {
        setTime(0);
        return;
      }

      const elapsedSeconds = Math.max(
        0,
        differenceInSeconds(new Date(), startDate)
      );
      setTime(elapsedSeconds);

      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      setTime(0);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [sessionData, isSessionError]);

  const handleToggle = async () => {
    try {
      if (!showStopButton) {
        await startSession();
        setTime(0);
        queryClient.invalidateQueries({ queryKey: ["userSession"] });
      }
    } catch (error) {
      console.error("세션 처리 중 오류가 발생했습니다:", error);
    }
  };

  const startHoldToStop = () => {
    if (!showStopButton) return;
    if (!isRunning) return;
    if (holdTimeoutRef.current) return;

    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }

    setIsHolding(true);

    holdTimeoutRef.current = setTimeout(async () => {
      try {
        await endSession(sessionData?.id ?? 0);
        queryClient.invalidateQueries({ queryKey: ["userSession"] });
        navigate({
          to: "/session/$sessionId",
          params: { sessionId: sessionData?.id?.toString() ?? "" },
        });
      } catch (error) {
        console.error(error);
      } finally {
        if (holdTimeoutRef.current) {
          clearTimeout(holdTimeoutRef.current);
          holdTimeoutRef.current = null;
        }
        setIsHolding(false);
      }
    }, HOLD_MS);
  };

  const cancelHoldToStop = () => {
    const hadPendingHold = !!holdTimeoutRef.current;

    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }

    if (hadPendingHold && showStopButton && isRunning) {
      showToast("정지 버튼을 길게 누르면\n오늘의 세션을 종료할 수 있어요.");
    }
    setIsHolding(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center h-[88px] gap-3 max-w-[600px] mx-auto bg-neutral-500 select-none z-30">
      <Timer
        seconds={time}
        trend={0}
        className="t-p-42-b text-neutral-100 tracking-[-1.05px] leading-[54.6px]"
      />
      <Tooltip.Provider>
        <Tooltip.Root open={isTooltipOpen}>
          <Tooltip.Trigger asChild>
            <button
              type="button"
              onClick={handleToggle}
              onMouseDown={startHoldToStop}
              onMouseUp={cancelHoldToStop}
              onMouseLeave={cancelHoldToStop}
              onTouchStart={startHoldToStop}
              onTouchEnd={cancelHoldToStop}
              onContextMenu={(e) => e.preventDefault()}
              id={showStopButton ? "timer-stop-button" : "timer-play-button"}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-1000 ease-in ${
                isHolding && showStopButton
                  ? "scale-150 bg-neutral-200"
                  : "bg-neutral-100"
              }`}
              aria-label={showStopButton ? "정지하기" : "시작하기"}
            >
              {showStopButton ? (
                <StopIcon
                  variant={isHolding ? "red" : "dark"}
                  width={16}
                  height={16}
                />
              ) : (
                <PlayIcon variant="dark" width={16} height={16} />
              )}
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="select-none rounded-[8px] bg-white px-[15px] py-2 text-[15px] leading-none text-violet11 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade animate-bounce"
              sideOffset={5}
            >
              <p className="t-p-14-sb text-blue-500">시작</p>
              <Tooltip.Arrow className="fill-white mt-[-1px]" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
}
