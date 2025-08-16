import NumberFlow, { type NumberFlowProps } from "@number-flow/react";
import { type MotionProps, motion } from "motion/react";
import { useEffect, useState } from "react";

const MotionNumberFlowComponent = motion.create(NumberFlow);

type MotionNumberFlowProps = NumberFlowProps &
  MotionProps & {
    onAnimationComplete?: () => void;
  };

export const MotionNumberFlow = ({
  value,
  onAnimationComplete,
  ...props
}: MotionNumberFlowProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // 50ms 지연 후 실제 value 적용
    const valueTimer = setTimeout(() => {
      setDisplayValue(value || 0);
    }, 50);

    // 전체 애니메이션 완료 후 콜백 실행 (50ms 지연 + 850ms 애니메이션)
    const completeTimer = setTimeout(() => {
      onAnimationComplete?.();
    }, 900);

    return () => {
      clearTimeout(valueTimer);
      clearTimeout(completeTimer);
    };
  }, [value, onAnimationComplete]);

  return (
    <MotionNumberFlowComponent
      layout
      layoutRoot
      transformTiming={{ duration: 850, easing: "ease-in-out" }}
      spinTiming={{ duration: 750, easing: "linear" }}
      opacityTiming={{ duration: 350, easing: "ease-in-out" }}
      value={displayValue}
      {...props}
    />
  );
};
