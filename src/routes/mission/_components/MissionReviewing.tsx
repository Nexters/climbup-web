interface MissionReviewingProps {
  videoUrl: string;
  onFailure: () => void;
  onRetry: () => void;
  onSuccess: () => void;
}

export default function MissionReviewing({
  videoUrl,
  onFailure,
  onRetry,
  onSuccess,
}: MissionReviewingProps) {
  return (
    <>
      <div className="relative flex-1 flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center mb-4">
          <p className="text-lg font-medium mb-2">결과를 입력해주세요</p>
          <p className="text-sm text-gray-500">
            영상을 확인하고 성공 여부를 선택해주세요
          </p>
        </div>
        <video
          src={videoUrl}
          controls
          className="max-w-full max-h-[60vh] object-contain rounded-lg"
        >
          <track kind="captions" />
        </video>
      </div>
      <div className="p-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onFailure}
            className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            실패
          </button>
          <button
            type="button"
            onClick={onRetry}
            className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            재촬영
          </button>
          <button
            type="button"
            onClick={onSuccess}
            className="flex-1 py-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            성공
          </button>
        </div>
      </div>
    </>
  );
}
