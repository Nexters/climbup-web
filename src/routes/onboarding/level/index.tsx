import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { AspectRatio, RadioGroup } from "radix-ui";
import { useEffect, useState } from "react";
import { match, P } from "ts-pattern";
import Button from "@/components/Button";
import { Tag, type TagVariant } from "@/components/tag/Tag";
import { getBrandLevels1 } from "@/generated/brand/brand";
import type { GymLevelResponse } from "@/generated/model";
import { setLevel } from "@/generated/onboarding/onboarding";
import { convertPascalCase } from "@/utils/convert";
import { getHeaderToken } from "@/utils/cookie";
import { LevelRadioButton } from "./-components/LevelRadioButton";

export const Route = createFileRoute("/onboarding/level/")({
  component: OnboardingLevelComponent,
});

// TODO: 레벨 선택 후 레벨 설정 실패 시 레벨 선택 화면으로 돌아가야 함.
function OnboardingLevelComponent() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<GymLevelResponse | null>(
    null
  );
  const { data: levels } = useQuery({
    queryKey: ["levels", 1],
    queryFn: () => {
      return getBrandLevels1(1, {
        headers: getHeaderToken(),
      });
    },
    select: (response) => response.data,
  });

  const { mutateAsync: setLevelMutation } = useMutation({
    mutationFn: (levelId: number) => {
      return setLevel(
        { gymLevelId: levelId },
        {
          headers: getHeaderToken(),
        }
      );
    },
  });

  const handleNextClick = async () => {
    if (!selectedLevel || !selectedLevel.id) {
      alert("레벨을 선택해주세요.");
      return;
    }

    try {
      await setLevelMutation(selectedLevel.id);
      navigate({ to: "/mission" });
    } catch {
      alert("레벨 설정에 실패했습니다.");
    }
  };

  const tagVariant = match<GymLevelResponse | null, TagVariant>(selectedLevel)
    .with(null, () => "NEUTRAL")
    .with({ gymLevelName: "ORANGE" }, () => "ORANGE")
    .with({ gymLevelName: "GREEN" }, () => "GREEN")
    .with({ gymLevelName: "BLUE" }, () => "BLUE")
    .with({ gymLevelName: "RED" }, () => "RED")
    .with({ gymLevelName: "PURPLE" }, () => "NEUTRAL")
    .otherwise(() => "NEUTRAL");

  const selectedLabel = match(selectedLevel)
    .with(null, () => "")
    .with({ gymLevelName: P.string }, (level) =>
      convertPascalCase(level.gymLevelName)
    )
    .otherwise(() => "");

  useEffect(
    function initializeSelectedLevel() {
      if (levels) {
        setSelectedLevel(levels[0]);
      }
    },
    [levels]
  );

  return (
    <div className="flex-center flex-col w-full h-dvh">
      <AnimatePresence mode="wait">
        {selectedLevel && (
          <motion.div
            key={selectedLevel.id}
            className="flex flex-col items-center pt-[68px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Tag variant={tagVariant}>{selectedLabel}</Tag>
            <p className="t-p-22-sb text-neutral-900 pt-2">
              {selectedLevel?.levelName}
            </p>
            <p className="t-p-14-m text-neutral-500 pt-1">
              {selectedLevel?.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {selectedLevel && (
          <motion.div
            key={selectedLevel.id}
            className="max-w-32 max-h-32 w-full pt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <AspectRatio.Root ratio={1 / 1}>
              <img
                src={selectedLevel.imageUrls?.[0]}
                className="size-full object-cover"
                alt={selectedLevel.gymLevelName}
              />
            </AspectRatio.Root>
          </motion.div>
        )}
      </AnimatePresence>
      <RadioGroup.Root
        className="pt-8 flex-center gap-2 w-full px-4"
        value={selectedLevel?.id?.toString() ?? ""}
        onValueChange={(value) => {
          const level = levels?.find((level) => level.id?.toString() === value);
          if (level) {
            setSelectedLevel(level);
          }
        }}
      >
        {levels?.map((level) => (
          <LevelRadioButton
            key={level.id}
            value={level.id?.toString() ?? ""}
            checked={level.id === selectedLevel?.id}
          >
            {level.gymLevelName && convertPascalCase(level.gymLevelName)}
          </LevelRadioButton>
        ))}
      </RadioGroup.Root>
      <div className="w-full mt-auto py-4 px-10">
        <Button className="w-full" onClick={handleNextClick}>
          다음
        </Button>
      </div>
    </div>
  );
}
