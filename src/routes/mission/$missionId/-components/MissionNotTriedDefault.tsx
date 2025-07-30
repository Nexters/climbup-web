import Button from "@/components/Button";

interface MissionNotTriedDefaultProps {
  sectorName: string;
  missionImage: string;
  score: number;
  onStart: () => void;
}

export default function MissionNotTriedDefault({
  sectorName,
  missionImage,
  score,
  onStart,
}: MissionNotTriedDefaultProps) {
  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="w-full flex flex-col items-center gap-6 mt-[14vh] mb-6">
        <div className="w-[23.5%] aspect-[88/46] bg-neutral-800 rounded-lg flex items-center justify-center">
          <span className="t-p-14-m text-neutral-400">{sectorName}</span>
        </div>
        <div className="flex flex-col items-center gap-1 px-4">
          <h1 className="t-p-22-sb text-neutral-100 leading-[1.4] tracking-[-0.024em] text-center">
            {sectorName} 파란 홀드 미션!
          </h1>
          <p className="t-p-14-m text-neutral-400 leading-[1.4] tracking-[-0.022em] text-center">
            완등하고 {score}점 쌓아보세요.
          </p>
        </div>
      </div>

      <div className="relative w-[80%] max-w-[300px] aspect-[3/4] rounded-[2.5rem] bg-neutral-50 border-8 border-neutral-50 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={missionImage}
            alt="Mission"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute top-0 left-0 w-full h-[45%] bg-gradient-neutral opacity-60" />

        <div className="relative flex flex-col justify-between h-full p-[7%]">
          <div>
            <div className="w-[18.7%] aspect-square rounded-xl bg-neutral-200/60" />
          </div>

          <div className="w-full flex justify-end">
            <Button onClick={onStart}>도전하기</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
