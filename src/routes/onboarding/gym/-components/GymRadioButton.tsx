import { RadioGroup } from "radix-ui";
import type { GymResponse } from "@/generated/model";
import { cn } from "@/utils/cn";

interface GymRadioButtonProps extends RadioGroup.RadioGroupItemProps {
  gym: GymResponse;
}

export const GymRadioButton = ({
  children,
  gym,
  checked,
  ...props
}: GymRadioButtonProps) => {
  return (
    <RadioGroup.Item
      className={cn(
        "p-6 w-full max-w-[150px] h-[200px] text-neutral-400 bg-neutral-300 rounded-[32px]",
        "data-[state=checked]:bg-neutral-600",
        "data-[state=checked]:text-neutral-100"
      )}
      checked={checked}
      {...props}
    >
      <div className="flex flex-col h-full items-start w-full">
        <div className="flex flex-col h-full">
          <p className="t-p-16-m">{gym.brandName}</p>
          <strong className="t-p-20-sb">{gym.branchName}</strong>
        </div>
        <div
          className={cn(
            "w-11 h-11 rounded-full bg-neutral-200 overflow-hidden ml-auto mt-auto flex shrink-0",
            !checked && "opacity-50"
          )}
        >
          <img
            src={gym.imageUrl}
            alt={gym.fullName}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </RadioGroup.Item>
  );
};
