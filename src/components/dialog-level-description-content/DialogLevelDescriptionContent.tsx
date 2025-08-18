import { Dialog } from "radix-ui";
import { match, P } from "ts-pattern";
import assetBlue from "@/assets/images/ic_blue.png";
import assetGreen from "@/assets/images/ic_green.png";
import assetLevel1 from "@/assets/images/ic_lv1.png";
import assetLevel2 from "@/assets/images/ic_lv2.png";
import assetLevel3 from "@/assets/images/ic_lv3.png";
import assetLevel4 from "@/assets/images/ic_lv4.png";
import assetLevel5 from "@/assets/images/ic_lv5.png";
import assetPurple from "@/assets/images/ic_purple.png";
import assetRed from "@/assets/images/ic_red.png";
import assetStar from "@/assets/images/ic_star.svg";
import CloseIcon from "../icons/CloseIcon";

const LEVEL_DESCRIPTIONS = [
  {
    id: 1,
    score: {
      min: 600,
      max: 649,
    },
    image: assetLevel1,
  },
  {
    id: 2,
    score: {
      min: 650,
      max: 999,
    },
    image: assetLevel2,
  },
  {
    id: 3,
    score: {
      min: 1000,
      max: 1999,
    },
    image: assetLevel3,
  },
  {
    id: 4,
    score: {
      min: 2000,
      max: 2999,
    },
    image: assetLevel4,
  },
  {
    id: 5,
    score: {
      min: 3000,
      max: null,
    },
    image: assetLevel5,
  },
];

export const DialogLevelDescriptionContent = () => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
      <Dialog.Content className="fixed z-50 px-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[32px] w-full max-w-[420px]">
        <Dialog.Title className="hidden">레벨 보기</Dialog.Title>
        <Dialog.Description className="hidden">레벨 보기</Dialog.Description>
        <div className="bg-neutral-100 rounded-[32px] p-6 shadow-[2px_2px_16px_0px_rgba(0,0,0,0.4)]">
          <header className="flex justify-between items-center mb-5">
            <h2 className="t-p-16-m text-neutral-800">레벨 보기</h2>
            <Dialog.Close asChild>
              <button type="button" className="t-p-14-m text-neutral-500">
                <CloseIcon />
              </button>
            </Dialog.Close>
          </header>
          <ul className="flex flex-col gap-5">
            {LEVEL_DESCRIPTIONS.map((level) => (
              <li key={level.id} className="flex justify-between items-center">
                <div className="flex-center gap-1.5">
                  <img
                    src={level.image}
                    alt={`레벨 ${level.id}`}
                    className="size-9 object-cover"
                  />
                  <span className="t-p-20-sb text-neutral-800">
                    Level {level.id}
                  </span>
                </div>
                <p className="t-p-14-sb text-neutral-800">
                  {match(level.score)
                    .with({ max: P.nullish }, ({ min }) => `+${min}점`)
                    .otherwise(({ min, max }) => `${min}-${max}점`)}
                </p>
              </li>
            ))}
          </ul>
          <div className="h-[1px] bg-neutral-300 my-4" />
          <div className="flex flex-col rounded-[8px] text-neutral-500">
            <p className="t-p-14-sb text-neutral-800">
              레벨은 어떻게 올라가나요?
            </p>
            <p className="t-p-12-m py-1 whitespace-pre-line">
              {`루트 난이도별 점수를 쌓아 레벨이 올라가요.\n미션을 성공해 실력과 레벨을 함께 키워보세요!`}
            </p>
            <ul className="flex flex-col t-p-12-m list-disc pt-4 gap-2">
              <li className="flex justify-between items-center">
                <div className="flex gap-1 items-center">
                  <img
                    src={assetGreen}
                    alt="초록 난이도"
                    className="size-8 object-cover"
                  />
                  <p className="t-p-14-sb text-neutral-800">Green</p>
                </div>
                <div className="flex gap-1 items-center">
                  <img src={assetStar} alt="별" className="size-4" />
                  <p className="t-p-14-sb text-neutral-600">+10</p>
                </div>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex gap-1 items-center">
                  <img
                    src={assetBlue}
                    alt="블루 난이도"
                    className="size-8 object-cover"
                  />
                  <p className="t-p-14-sb text-neutral-800">Blue</p>
                </div>
                <div className="flex gap-1 items-center">
                  <img src={assetStar} alt="별" className="size-4" />
                  <p className="t-p-14-sb text-neutral-600">+30</p>
                </div>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex gap-1 items-center">
                  <img
                    src={assetRed}
                    alt="레드 난이도"
                    className="size-8 object-cover"
                  />
                  <p className="t-p-14-sb text-neutral-800">Red</p>
                </div>
                <div className="flex gap-1 items-center">
                  <img src={assetStar} alt="별" className="size-4" />
                  <p className="t-p-14-sb text-neutral-600">+100</p>
                </div>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex gap-1 items-center">
                  <img
                    src={assetPurple}
                    alt="퍼플 난이도"
                    className="size-8 object-cover"
                  />
                  <p className="t-p-14-sb text-neutral-800">Purple</p>
                </div>
                <div className="flex gap-1 items-center">
                  <img src={assetStar} alt="별" className="size-4" />
                  <p className="t-p-14-sb text-neutral-600">+300</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
