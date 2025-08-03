import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { RadioGroup } from "radix-ui";
import { getAllGyms } from "@/generated/climbing-gym/climbing-gym";
import type { GymResponse } from "@/generated/model";
import { cn } from "@/utils/cn";

export const Route = createFileRoute("/onboarding/gym/")({
  component: OnboardingGymComponent,
});

function OnboardingGymComponent() {
  const { data: gyms } = useQuery({
    queryKey: ["gyms"],
    queryFn: () => getAllGyms(),
    select: (data) => data.data,
  });

  return (
    <main className="flex-center flex-col pt-[124px]">
      <div className="flex-col gap-1">
        <p className="t-p-22-sb text-neutral-900">
          어디서 클라이밍을 시작할까요?
        </p>
        <span className="t-p-14-m text-neutral-500">지점을 선택해주세요.</span>
      </div>
      <RadioGroup.Root className="flex gap-3">
        {gyms?.map((gym) => (
          <RadioButton key={gym.id} value={gym.id?.toString() || ""} gym={gym}>
            {gym.branchName}
          </RadioButton>
        ))}
      </RadioGroup.Root>
    </main>
  );
}

const RadioButton = ({
  children,
  gym,
  ...props
}: RadioGroup.RadioGroupItemProps & { gym: GymResponse }) => {
  return (
    <RadioGroup.Item
      className={cn(
        "flex-1 p-6 h-[200px] text-neutral-400",
        "data-[state=checked]:bg-neutral-600",
        "data-[state=checked]:text-neutral-100"
      )}
      {...props}
    >
      <div className="flex-col">
        <div className="flex-col">
          <p className="t-p-16-sb">{children}</p>
          <strong className="t-p-12-m">{gym.address}</strong>
        </div>
      </div>
    </RadioGroup.Item>
  );
};
