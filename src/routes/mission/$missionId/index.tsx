import { createFileRoute } from "@tanstack/react-router";
import MissionFailed from "./-components/MissionFailed";
import MissionNotTried from "./-components/MissionNotTried";
import MissionSuccess from "./-components/MissionSuccess";

interface MissionAttempt {
  missionAttemptId: number;
  success: boolean;
  videoUrl: string;
  createdAt: string;
}

const MOCK_DATA = {
  missionId: 1,
  attempts: [] as MissionAttempt[],
  gymId: 1,
  sector: {
    id: 1,
    name: "섹터 5·6",
    imageUrl: "https://placehold.co/600x400/png?text=Sector+1",
  },
  difficulty: "6A",
  score: 30,
  imageUrl: "https://placehold.co/800x600/png?text=Mission+1",
  videoUrl: "https://example.com/mission-video.mp4",
  removedAt: "2024-04-20T00:00:00Z",
  postedAt: "2024-03-20T00:00:00Z",
  recommendedOrder: 1,
};

export const Route = createFileRoute("/mission/$missionId/")({
  component: MissionDetail,
});

type MissionAttemptStatus = "NOT_TRIED" | "SUCCESS" | "FAILED";

const getMissionAttemptStatus = (
  attempts: MissionAttempt[]
): MissionAttemptStatus => {
  if (!attempts || attempts.length === 0) {
    return "NOT_TRIED";
  }

  return attempts.some((attempt) => attempt.success) ? "SUCCESS" : "FAILED";
};

function MissionDetail() {
  const missionStatus = getMissionAttemptStatus(MOCK_DATA.attempts);

  const handleRetry = () => {
    // TODO: 미션 재시도 로직 구현
    console.log("미션 재시도");
  };

  const renderContent = () => {
    switch (missionStatus) {
      case "SUCCESS":
        return <MissionSuccess />;
      case "FAILED":
        return <MissionFailed onRetry={handleRetry} />;
      case "NOT_TRIED":
        return (
          <MissionNotTried
            sectorName={MOCK_DATA.sector.name}
            missionImage={MOCK_DATA.imageUrl}
            score={MOCK_DATA.score}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-neutral-900">
      {renderContent()}
    </div>
  );
}
