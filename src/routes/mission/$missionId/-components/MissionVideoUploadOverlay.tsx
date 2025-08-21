export default function MissionVideoUploadOverlay({
  percentage,
}: {
  percentage: number;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="rounded-2xl p-6 max-w-sm w-full mx-4">
        <div className="text-center">
          <p className="text-neutral-100 t-p-16-m mb-4">
            영상을 업로드 중이에요.
            <br />
            화면 이동 시 영상이 저장되지 않아요.
          </p>
          <div className="space-y-4">
            <div className="w-full bg-neutral-700 rounded-full h-2 shadow-md">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-neutral-300 t-p-12-m">{percentage}% 완료</p>
          </div>
        </div>
      </div>
    </div>
  );
}
