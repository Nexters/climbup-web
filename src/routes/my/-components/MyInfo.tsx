import assetMyCharacter from "@/assets/images/ic_my_character.png";
import { LevelProgress } from "@/components/level-progress/LevelProgress";
import { Tag } from "@/components/tag/Tag";

export const MyInfo = () => {
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
            LV.1
          </Tag>
          <p className="t-p-18-sb text-neutral-800 truncate min-w-0">
            내이름은 김삼순 내이름은 김삼순 내이름은 김삼순 내이름은 김삼순
            내이름은 김삼순 내이름은 김삼순
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="t-p-12-m text-neutral-500">LV.4까지 남은 점수 250점</p>
          <LevelProgress
            currentExp={100}
            levelExp={1000}
            level={4}
            progressWrapperClassName="w-full"
          />
        </div>
      </div>
    </div>
  );
};
