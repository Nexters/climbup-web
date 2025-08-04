import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { isEmpty, isNil } from "es-toolkit/compat";
import { RadioGroup } from "radix-ui";
import { useState } from "react";
import { z } from "zod";
import Button from "@/components/Button";
import { getAllGyms } from "@/generated/climbing-gym/climbing-gym";
import { setGym } from "@/generated/onboarding/onboarding";
import { getHeaderToken } from "@/utils/cookie";
import { GymRadioButton } from "./-components/GymRadioButton";

export const Route = createFileRoute("/onboarding/gym/")({
  component: OnboardingGymComponent,
});

// zod 스키마: string을 number로 안전하게 파싱
const gymIdSchema = z.coerce.number().positive("체육관 ID는 양수여야 합니다");

function OnboardingGymComponent() {
  const navigate = useNavigate();
  const { data: gyms } = useQuery({
    queryKey: ["gyms"],
    queryFn: () => getAllGyms(),
    select: (data) => data.data ?? [],
  });
  const { mutateAsync: setGymMutation } = useMutation({
    mutationFn: (gymId: string) => {
      const parsedGymId = gymIdSchema.parse(gymId);
      return setGym(
        { gymId: parsedGymId },
        {
          headers: getHeaderToken(),
        }
      );
    },
  });
  const [selectedGym, setSelectedGym] = useState<string | null>(null);

  const handleOnChange = (value: string) => {
    setSelectedGym(value);
  };

  const handleNext = async () => {
    if (isNil(selectedGym)) {
      return;
    }
    try {
      await setGymMutation(selectedGym);
      navigate({ to: "/onboarding/level" });
    } catch {
      alert("체육관 설정 중 오류가 발생했습니다.");
    }
  };

  return (
    <main className="flex-center flex-col pt-[124px] px-8 min-h-screen">
      <div className="flex-col gap-1 flex items-center">
        <p className="t-p-22-sb text-neutral-900">
          어디서 클라이밍을 시작할까요?
        </p>
        <span className="t-p-14-m text-neutral-500">지점을 선택해주세요.</span>
      </div>
      <RadioGroup.Root
        className="flex justify-center gap-3 w-full pt-6"
        name="gymId"
        value={selectedGym}
        onValueChange={handleOnChange}
      >
        {isNil(gyms) || isEmpty(gyms)
          ? null
          : gyms.map((gym) => (
              <GymRadioButton
                checked={selectedGym === gym.id?.toString()}
                key={gym.id}
                value={gym.id?.toString() || ""}
                gym={gym}
              />
            ))}
      </RadioGroup.Root>
      <div className="w-full mt-auto p-4 flex-center">
        <Button
          className="w-full"
          disabled={isNil(selectedGym)}
          onClick={handleNext}
        >
          다음
        </Button>
      </div>
    </main>
  );
}
