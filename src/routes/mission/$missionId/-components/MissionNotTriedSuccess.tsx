import useEmblaCarousel from "embla-carousel-react";
import Button from "@/components/Button";
import CloseIcon from "@/components/icons/CloseIcon";

const MOCK_MISSIONS = [
  {
    missionId: 2,
    attempts: [],
    gymId: 1,
    sector: {
      id: 1,
      name: "섹터 5·6",
      imageUrl: "https://placehold.co/600x400/png?text=Sector+1",
    },
    difficulty: "6A",
    score: 30,
    imageUrl: "https://placehold.co/800x600/png?text=Mission+2",
    videoUrl: "https://example.com/mission-video.mp4",
    removedAt: "2024-04-20T00:00:00Z",
    postedAt: "2024-03-20T00:00:00Z",
    recommendedOrder: 2,
  },
  {
    missionId: 3,
    attempts: [],
    gymId: 1,
    sector: {
      id: 1,
      name: "섹터 5·6",
      imageUrl: "https://placehold.co/600x400/png?text=Sector+1",
    },
    difficulty: "6A+",
    score: 35,
    imageUrl: "https://placehold.co/800x600/png?text=Mission+3",
    videoUrl: "https://example.com/mission-video.mp4",
    removedAt: "2024-04-20T00:00:00Z",
    postedAt: "2024-03-20T00:00:00Z",
    recommendedOrder: 3,
  },
  {
    missionId: 4,
    attempts: [],
    gymId: 1,
    sector: {
      id: 1,
      name: "섹터 5·6",
      imageUrl: "https://placehold.co/600x400/png?text=Sector+1",
    },
    difficulty: "6B",
    score: 40,
    imageUrl: "https://placehold.co/800x600/png?text=Mission+4",
    videoUrl: "https://example.com/mission-video.mp4",
    removedAt: "2024-04-20T00:00:00Z",
    postedAt: "2024-03-20T00:00:00Z",
    recommendedOrder: 4,
  },
];

export default function MissionNotTriedSuccess() {
  const [emblaRef] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
  });

  return (
    <div className="flex-1 flex flex-col">
      <div className="absolute top-4 right-4">
        <button type="button" onClick={() => window.history.back()}>
          <CloseIcon variant="white" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center pt-[14vh]">
        <div className="w-full flex flex-col items-center gap-4 mb-6 px-4">
          <h1 className="t-p-22-sb text-neutral-100 leading-[1.4] tracking-[-0.024em] text-center">
            축하해요!
            <br />
            다음 문제도 풀어보세요
          </h1>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 ml-[38px]">
            {MOCK_MISSIONS.map((mission) => (
              <div
                key={mission.missionId}
                className="relative shrink-0 w-[300px] aspect-[3/4] rounded-[40px] bg-neutral-50 border-8 border-neutral-50 overflow-hidden"
              >
                <div className="absolute inset-0">
                  <img
                    src={mission.imageUrl}
                    alt={`Mission ${mission.missionId}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute top-0 left-0 w-full h-[45%] bg-gradient-neutral opacity-60" />

                <div className="relative flex flex-col justify-between h-full p-[7%]">
                  <div>
                    <div className="w-[18.7%] aspect-square rounded-xl bg-neutral-200/60" />
                  </div>

                  <div className="w-full flex justify-end">
                    <Button>도전하기</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
