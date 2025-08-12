import { Dialog } from "radix-ui";
import { match, P } from "ts-pattern";
import assetLevel1 from "@/assets/images/ic_lv1.png";
import assetLevel2 from "@/assets/images/ic_lv2.png";
import assetLevel3 from "@/assets/images/ic_lv3.png";
import assetLevel4 from "@/assets/images/ic_lv4.png";
import assetLevel5 from "@/assets/images/ic_lv5.png";
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
      <Dialog.Content className="fixed z-50 px-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[32px] w-full">
        <div className="bg-neutral-100 rounded-[32px] p-6 shadow-[2px_2px_16px_0px_rgba(0,0,0,0.4)]">
          <header className="flex justify-between items-center mb-5">
            <h2 className="t-p-16-m text-neutral-800">레벨 보기</h2>
            <Dialog.Close asChild>
              <button type="button" className="t-p-14-m text-neutral-500">
                <CloseIcon />
              </button>
            </Dialog.Close>
          </header>
          <ul className="flex flex-col gap-5 pb-5">
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
                <p className="t-p-16-sb text-neutral-800">
                  {match(level.score)
                    .with({ max: P.nullish }, ({ min }) => `${min}+ 점`)
                    .otherwise(({ min, max }) => `${min} - ${max} 점`)}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex flex-col p-3 rounded-[8px] bg-neutral-200 text-neutral-500">
            <p className="t-p-14-sb">레벨은 어떻게 올라가나요?</p>
            <p className="t-p-12-m py-2">
              레벨은 나의 클라이밍 실력을 보여주는 지표예요. 완등한 루트의
              난이도에 따라 점수가 올라가고, 누적된 점수로 레벨이상승해요.
            </p>
            <ul className="flex flex-col t-p-12-m list-disc pl-4">
              <li>초록 루트 : +10점</li>
              <li>파랑 루트 : +30점</li>
              <li>빨강 루트 : +100점</li>
              <li>보라 루트 : +200점</li>
            </ul>
            <p className="t-p-12-m pt-4">
              레벨이 오를수록, 더 잘 맞는 루트를 추천해드려요.
            </p>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
