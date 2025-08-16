import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
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
}: {
  showMockStopButton: boolean;
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
      const startTime = new Date(sessionData.startedAt).getTime();
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
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
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center p-4 gap-3 max-w-7xl mx-auto bg-neutral-500">
      <Timer
        seconds={time}
        className="t-p-42-b text-neutral-100 tracking-[-1.05px] leading-[54.6px]"
      />
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
    </div>
  );
}
