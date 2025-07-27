import { useEffect, useState } from "react";
import PlayIcon from "../../../components/icons/PlayIcon";
import StopIcon from "../../../components/icons/StopIcon";

export default function MissionTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(
      2,
      "0"
    )} : ${String(remainingSeconds).padStart(2, "0")}`;
  };

  const handleToggle = () => {
    setIsRunning((prev) => !prev);
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
          className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center"
          aria-label={isRunning ? "정지하기" : "시작하기"}
        >
          {isRunning ? (
            <StopIcon variant="dark" width={16} height={16} />
          ) : (
            <PlayIcon variant="dark" width={16} height={16} />
          )}
        </button>
      </div>
    </div>
  );
}
