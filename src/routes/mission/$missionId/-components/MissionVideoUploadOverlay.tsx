export default function MissionVideoUploadOverlay({
  progress,
  isAttemptSuccess,
}: {
  progress: { currentChunk: number; totalChunks: number; percentage: number };
  isAttemptSuccess: boolean;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="bg-neutral-900 rounded-2xl p-6 max-w-sm w-full mx-4">
        <div className="text-center">
          <h3 className="text-neutral-100 t-p-18-sb mb-4">
            {isAttemptSuccess
              ? "추천 문제를 준비 중이에요"
              : "해설 영상을 불러오고 있어요"}
          </h3>
          <div className="space-y-4">
            <div className="w-full bg-neutral-800 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            <p className="text-neutral-400 t-p-14-m">
              {progress.currentChunk} / {progress.totalChunks}
            </p>
            <p className="text-neutral-300 t-p-12-m">
              {progress.percentage}% 완료
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
