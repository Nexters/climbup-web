import { NumberFlowGroup } from "@number-flow/react";
import { cn } from "@/utils/cn";
import { MotionNumberFlow } from "../motion-number-flow/MotionNumberFlow";

type TimerProps = {
  seconds: number;
  className?: string;
  trend?: number;
};

export const Timer = ({ seconds, className, trend = 1 }: TimerProps) => {
  const safeSeconds = Math.max(0, seconds);
  const hh = Math.floor(safeSeconds / 3600);
  const mm = Math.floor((safeSeconds % 3600) / 60);
  const ss = safeSeconds % 60;

  return (
    <NumberFlowGroup>
      <div className={cn("flex items-baseline tabular-nums", className)}>
        <MotionNumberFlow
          trend={trend}
          value={hh}
          format={{ minimumIntegerDigits: 2 }}
        />
        <MotionNumberFlow
          prefix=" : "
          trend={trend}
          value={mm}
          digits={{ 1: { max: 5 } }}
          format={{ minimumIntegerDigits: 2 }}
        />
        <MotionNumberFlow
          prefix=" : "
          trend={trend}
          value={ss}
          digits={{ 1: { max: 5 } }}
          format={{ minimumIntegerDigits: 2 }}
        />
      </div>
    </NumberFlowGroup>
  );
};
