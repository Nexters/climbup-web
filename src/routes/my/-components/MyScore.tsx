import { MotionNumberFlow } from "@/components/motion-number-flow/MotionNumberFlow";

export const MyScore = () => {
  return (
    <div className="flex gap-1.5 p-4 bg-neutral-100 rounded-[24px] mx-4">
      <div className="flex flex-1 flex-col items-center gap-2">
        <MotionNumberFlow value={10} className="t-m-24-b text-neutral-900" />
        <span className="t-p-12-m text-neutral-500">도전</span>
      </div>
      <div className="flex flex-1 flex-col items-center gap-2 border-x-[1px] border-solid border-x-neutral-200">
        <MotionNumberFlow value={10} className="t-m-24-b text-neutral-900" />
        <span className="t-p-12-m text-neutral-500">성공</span>
      </div>
      <div className="flex flex-1 flex-col items-center gap-2">
        <MotionNumberFlow value={10} className="t-m-24-b text-neutral-900" />
        <span className="t-p-12-m text-neutral-500">실패</span>
      </div>
    </div>
  );
};
