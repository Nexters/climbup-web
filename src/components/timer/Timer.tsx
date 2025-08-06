import { NumberFlowGroup } from "@number-flow/react";
import { cn } from "@/utils/cn";
import { MotionNumberFlow } from "../motion-number-flow/MotionNumberFlow";

type TimerProps = {
  seconds: number;
  className?: string;
};

export const Timer = ({ seconds, className }: TimerProps) => {
  const hh = Math.floor(seconds / 3600);
  const mm = Math.floor((seconds % 3600) / 60);
  const ss = seconds % 60;
  return (
    <NumberFlowGroup>
      <div
        className={cn(
          "flex items-baseline font-semibold tabular-nums t-m-48-b",
          className
        )}
      >
        <MotionNumberFlow
          trend={1}
          value={hh}
          format={{ minimumIntegerDigits: 2 }}
        />
        <MotionNumberFlow
          prefix=" : "
          trend={1}
          value={mm}
          digits={{ 1: { max: 5 } }}
          format={{ minimumIntegerDigits: 2 }}
        />
        <MotionNumberFlow
          prefix=" : "
          trend={1}
          value={ss}
          digits={{ 1: { max: 5 } }}
          format={{ minimumIntegerDigits: 2 }}
        />
      </div>
    </NumberFlowGroup>
  );
};
