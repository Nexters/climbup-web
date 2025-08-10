import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { USER_SESSION_STORAGE_KEY } from "@/constants/mission";
import {
  endUserSession,
  getUserSession,
  startUserSession,
} from "@/generated/user-session/user-session";
import { getHeaderToken } from "@/utils/cookie";
import { getStorage, removeStorage, setStorage } from "@/utils/storage";
import PlayIcon from "../../../components/icons/PlayIcon";
import StopIcon from "../../../components/icons/StopIcon";

export default function MissionTimer({
  showMockStopButton,
}: {
  showMockStopButton: boolean;
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  const storageSessionId = getStorage(USER_SESSION_STORAGE_KEY);
  const showStopButton = isRunning || showMockStopButton;

  const { data: sessionData } = useQuery({
    queryKey: ["userSession"],
    queryFn: () =>
      storageSessionId
        ? getUserSession(Number(storageSessionId), {
            headers: getHeaderToken(),
          })
        : null,
    select: (data) => data?.data ?? null,
    enabled: !!getStorage(USER_SESSION_STORAGE_KEY),
  });

  const { mutateAsync: startSession } = useMutation({
    mutationFn: () => startUserSession({ headers: getHeaderToken() }),
    onSuccess: (data) => {
      setStorage(USER_SESSION_STORAGE_KEY, data.data?.id?.toString() ?? "");
      setIsRunning(true);
      setTime(0);
      queryClient.invalidateQueries({ queryKey: ["userSession"] });
    },
  });

  const { mutateAsync: endSession } = useMutation({
    mutationFn: (sessionId: number) =>
      endUserSession(sessionId, { headers: getHeaderToken() }),
    onSuccess: () => {
      removeStorage(USER_SESSION_STORAGE_KEY);
      setIsRunning(false);
      setTime(0);
      queryClient.invalidateQueries({ queryKey: ["userSession"] });
      navigate({ to: "/mission-result" });
    },
  });

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (sessionData?.startedAt && !sessionData?.endedAt) {
      setIsRunning(true);
      const startTime = new Date(sessionData.startedAt).getTime();
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
      setTime(elapsedSeconds);

      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      setIsRunning(false);
      setTime(0);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [sessionData]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(
      2,
      "0"
    )} : ${String(remainingSeconds).padStart(2, "0")}`;
  };

  const handleToggle = async () => {
    try {
      if (isRunning) {
        await endSession(Number(storageSessionId));
      } else {
        await startSession();
      }
    } catch (error) {
      console.error("세션 처리 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div className="flex items-center justify-center gap-3 max-w-7xl mx-auto px-[27px] py-4">
        <div className="t-p-42-b text-neutral-100 tracking-[-1.05px] leading-[54.6px]">
          {formatTime(time)}
        </div>
        <button
          type="button"
          onClick={handleToggle}
          id={showStopButton ? "timer-stop-button" : "timer-play-button"}
          className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center"
          aria-label={showStopButton ? "정지하기" : "시작하기"}
        >
          {showStopButton ? (
            <StopIcon variant="dark" width={16} height={16} />
          ) : (
            <PlayIcon variant="dark" width={16} height={16} />
          )}
        </button>
      </div>
    </div>
  );
}
