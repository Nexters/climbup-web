import NumberFlow, { type NumberFlowProps } from "@number-flow/react";
import { type MotionProps, motion } from "motion/react";

const MotionNumberFlowComponent = motion.create(NumberFlow);

type MotionNumberFlowProps = NumberFlowProps & MotionProps;

export const MotionNumberFlow = ({ ...props }: MotionNumberFlowProps) => {
  return (
    <MotionNumberFlowComponent
      layout
      layoutRoot
      transformTiming={{ duration: 850, easing: "easeInOut" }}
      spinTiming={{ duration: 750, easing: "linear" }}
      opacityTiming={{ duration: 350, easing: "easeInOut" }}
      {...props}
    />
  );
};
