interface MissionCapturingProps {
  onCapture: () => void;
}

export default function MissionCapturing({ onCapture }: MissionCapturingProps) {
  return (
    <>
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        <img
          src={`https://placehold.co/800x1000`}
          alt="미션 이미지"
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="p-4">
        <button
          type="button"
          onClick={onCapture}
          className="w-full py-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          촬영하기
        </button>
      </div>
    </>
  );
}
