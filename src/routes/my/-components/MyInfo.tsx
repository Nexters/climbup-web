import { useQuery } from "@tanstack/react-query";

import assetMyCharacter from "@/assets/images/ic_my_character.png";
import { LevelProgress } from "@/components/level-progress/LevelProgress";
import { Tag } from "@/components/tag/Tag";
import { getCurrentUserStatus } from "@/generated/user/user";
import { getHeaderToken } from "@/utils/cookie";
import { getLevelDisplayText, getLevelInfo } from "@/utils/level";

export const MyInfo = () => {
  const { data: userStatus, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUserStatus({ headers: getHeaderToken() }),
    select: (data) => data.data,
  });

  // 로딩 중일 때 기본값 사용
  const totalScore = userStatus?.sr ?? 0;
  const nickname = userStatus?.nickname ?? "사용자";

  // 레벨 정보 계산
  const levelInfo = getLevelInfo(totalScore);
  const levelDisplayText = getLevelDisplayText(totalScore);

  if (isLoading) {
    return (
      <div className="flex w-full gap-3 h-[114px] items-center px-4">
        <div className="flex-center size-[84px] outline outline-4 -outline-offset-4 outline-neutral-100 rounded-full bg-neutral-300 relative shrink-0 animate-pulse">
          <img
            alt="캐릭터"
            src={assetMyCharacter}
            className="object-cover absolute bottom-[15px] left-1/2 -translate-x-1/2 w-[73px] h-[99px]"
          />
        </div>
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <div className="flex items-end gap-2 flex-1">
            <div className="bg-neutral-200 rounded-full px-2 py-1 animate-pulse h-6 w-12" />
            <div className="bg-neutral-200 rounded h-5 w-32 animate-pulse" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="bg-neutral-200 rounded h-4 w-24 animate-pulse" />
            <div className="bg-neutral-200 rounded h-5 w-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full gap-3 h-[114px] items-center px-4">
      <div className="flex-center size-[84px] outline outline-4 -outline-offset-4 outline-neutral-100 rounded-full bg-neutral-300 relative shrink-0">
        <img
          alt="캐릭터"
          src={assetMyCharacter}
          className="object-cover absolute bottom-[15px] left-1/2 -translate-x-1/2 w-[73px] h-[99px]"
        />
      </div>
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div className="flex items-end gap-2 flex-1">
          <Tag className="bg-neutral-600 text-neutral-100 rounded-full px-2 py-1">
            LV.{levelInfo.displayLevel}
          </Tag>
          <p className="t-p-18-sb text-neutral-800 truncate min-w-0">
            {nickname}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="t-p-12-m text-neutral-500">{levelDisplayText}</p>
          <LevelProgress
            currentExp={levelInfo.currentExp}
            levelExp={levelInfo.levelExp}
            level={levelInfo.displayLevel}
            progressWrapperClassName="w-full"
          />
        </div>
      </div>
    </div>
  );
};
