import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/challenge/$challengeId')({
  component: Challenge,
})

function Challenge() {
  const { challengeId } = Route.useParams()

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">챌린지 #{challengeId}</h1>
        <div className="text-lg font-mono">05:00</div>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="bg-gray-800 rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-3">현재 과제</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
              <span>첫 번째 홀드 잡기</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-3"></div>
              <span>두 번째 홀드로 이동</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-500 mr-3"></div>
              <span>정상에 도달하기</span>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <button className="w-full bg-red-500 text-white py-4 rounded-2xl text-lg font-bold active:scale-95 transition-transform">
            챌린지 포기하기
          </button>
        </div>
      </div>
    </div>
  )
} 