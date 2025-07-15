import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/challenge/complete')({
  component: ChallengeComplete,
})

function ChallengeComplete() {
  return (
    <div className="min-h-screen flex flex-col p-4">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-2">챌린지 완료!</h1>
        <p className="text-gray-600 text-center mb-8">
          오늘의 클라이밍을 성공적으로 마치셨습니다.
        </p>

        <div className="w-full space-y-4">
          <button className="w-full bg-blue-500 text-white py-4 rounded-2xl text-lg font-bold active:scale-95 transition-transform">
            결과 공유하기
          </button>
          <button className="w-full bg-gray-200 text-gray-800 py-4 rounded-2xl text-lg font-bold active:scale-95 transition-transform">
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  )
} 