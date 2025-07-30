import { useNavigate } from "@tanstack/react-router";
import answerVideo from "@/assets/video/mock-mission-answer-video.mp4";

export default function MissionFailed() {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative flex-1 flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center mb-4">
          <p className="text-lg font-medium mb-2">완등 답안 영상</p>
          <p className="text-sm text-gray-500">
            영상을 참고하여 다시 도전해보세요
          </p>
        </div>
        <video
          controls
          className="max-w-full max-h-[60vh] object-contain rounded-lg"
          src={answerVideo}
        >
          <track kind="captions" />
        </video>
      </div>
      <div className="p-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate({ to: "/mission" })}
            className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            닫기
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: "/mission" })}
            className="flex-1 py-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            재도전
          </button>
        </div>
      </div>
    </>
  );
}
