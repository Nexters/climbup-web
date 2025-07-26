import { useNavigate } from "@tanstack/react-router";

export default function MissionSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <h3 className="text-2xl font-bold mb-2">🎉 축하해요!</h3>
        <p className="text-lg text-gray-600">다음 문제도 풀어보세요!</p>
      </div>
      <div className="p-4">
        <button
          type="button"
          onClick={() => navigate({ to: "/mission" })}
          className="w-full py-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          확인
        </button>
      </div>
    </>
  );
}
