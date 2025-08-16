import { motion } from "motion/react";
import { RadioGroup } from "radix-ui";
import { cn } from "@/utils/cn";

type LevelRadioButtonProps = RadioGroup.RadioGroupItemProps;

export const LevelRadioButton = ({
  children,
  ...props
}: LevelRadioButtonProps) => {
  return (
    <RadioGroup.Item
      {...props}
      className={cn(
        "flex-center w-14 h-14 rounded-[16px] overflow-hidden mt-auto shrink-0 bg-neutral-300 text-neutral-400 t-p-14-sb",
        "data-[state=checked]:bg-neutral-600 data-[state=checked]:text-neutral-100",
        "aspect-square"
      )}
      asChild
    >
      <motion.button
        whileTap={{
          scale: 0.9,
        }}
      >
        {children}
      </motion.button>
    </RadioGroup.Item>
  );
};
